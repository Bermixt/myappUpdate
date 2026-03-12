import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Doc, Id } from "./_generated/dataModel";

/**
 * List all tasks owned by or shared with the current user.
 * Includes derived aggregates: notesCount, sharedCount, isOwner, canEdit, isOverdue.
 */
export const listMyTasks = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    // 1. Get owned tasks
    const ownedTasks = await ctx.db
      .query("tasks")
      .withIndex("by_ownerUserId", (q) => q.eq("ownerUserId", userId))
      .collect();

    // 2. Get shared tasks
    const sharedWithMe = await ctx.db
      .query("taskShares")
      .withIndex("by_sharedUserId", (q) => q.eq("sharedUserId", userId))
      .collect();

    const sharedTasks: Doc<"tasks">[] = [];
    for (const share of sharedWithMe) {
      const task = await ctx.db.get(share.taskId);
      if (task) sharedTasks.push(task);
    }

    // Combine and deduplicate if necessary (though owner and shared should be distinct by logic)
    const allTasks = [...ownedTasks, ...sharedTasks];

    // 3. Enrich with aggregates and permissions
    const now = Date.now();
    const result = [];

    for (const task of allTasks) {
      const notes = await ctx.db
        .query("notes")
        .withIndex("by_taskId", (q) => q.eq("taskId", task._id))
        .collect();
      
      const shares = await ctx.db
        .query("taskShares")
        .withIndex("by_taskId", (q) => q.eq("taskId", task._id))
        .collect();

      result.push({
        ...task,
        notesCount: notes.length,
        sharedCount: shares.length,
        isOwner: task.ownerUserId === userId,
        canEdit: task.ownerUserId === userId,
        isOverdue: task.dueDate < now && task.status !== "done",
      });
    }

    // Sort by creation time descending by default
    return result.sort((a, b) => b._creationTime - a._creationTime);
  },
});

/**
 * Get a single task with permission checks.
 */
export const getTask = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const task = await ctx.db.get(args.taskId);
    if (!task) return null;

    // Permission check: owner or shared
    const isOwner = task.ownerUserId === userId;
    let isShared = false;
    if (!isOwner) {
      const share = await ctx.db
        .query("taskShares")
        .withIndex("by_taskId_and_sharedUserId", (q) =>
          q.eq("taskId", args.taskId).eq("sharedUserId", userId),
        )
        .unique();
      isShared = !!share;
    }

    if (!isOwner && !isShared) {
      throw new Error("Permission denied");
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_taskId", (q) => q.eq("taskId", task._id))
      .collect();
    
    const shares = await ctx.db
      .query("taskShares")
      .withIndex("by_taskId", (q) => q.eq("taskId", task._id))
      .collect();

    return {
      ...task,
      notesCount: notes.length,
      sharedCount: shares.length,
      isOwner,
      canEdit: isOwner,
      isOverdue: task.dueDate < Date.now() && task.status !== "done",
    };
  },
});

/**
 * Create a new task.
 */
export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done")),
    criticity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const taskId = await ctx.db.insert("tasks", {
      ownerUserId: userId,
      title: args.title,
      description: args.description,
      status: args.status,
      criticity: args.criticity,
      dueDate: args.dueDate,
      updatedAt: Date.now(),
    });

    return taskId;
  },
});

/**
 * Update task details (owner only).
 */
export const updateTask = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done"))),
    criticity: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");

    if (task.ownerUserId !== userId) {
      throw new Error("Permission denied: Owner only");
    }

    const { taskId: _, ...patch } = args;
    await ctx.db.patch(args.taskId, {
      ...patch,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Update task status (owner only).
 */
export const updateTaskStatus = mutation({
  args: {
    taskId: v.id("tasks"),
    status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");

    if (task.ownerUserId !== userId) {
      throw new Error("Permission denied: Owner only");
    }

    await ctx.db.patch(args.taskId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Update sharing for a task (owner only).
 * Replaces current shared users with the provided list.
 */
export const updateSharing = mutation({
  args: {
    taskId: v.id("tasks"),
    sharedUserIds: v.array(v.id("users")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");

    if (task.ownerUserId !== userId) {
      throw new Error("Permission denied: Owner only");
    }

    // 1. Get current shares
    const currentShares = await ctx.db
      .query("taskShares")
      .withIndex("by_taskId", (q) => q.eq("taskId", args.taskId))
      .collect();

    // 2. Remove all current shares
    for (const share of currentShares) {
      await ctx.db.delete(share._id);
    }

    // 3. Add new shares
    for (const sharedUserId of args.sharedUserIds) {
      // Don't share with owner
      if (sharedUserId === userId) continue;
      
      await ctx.db.insert("taskShares", {
        taskId: args.taskId,
        sharedUserId,
      });
    }

    await ctx.db.patch(args.taskId, { updatedAt: Date.now() });
  },
});

/**
 * Delete a task (owner only).
 * Also deletes associated notes and shares.
 */
export const deleteTask = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");

    if (task.ownerUserId !== userId) {
      throw new Error("Permission denied: Owner only");
    }

    // Delete associated notes
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_taskId", (q) => q.eq("taskId", args.taskId))
      .collect();
    for (const note of notes) {
      await ctx.db.delete(note._id);
    }

    // Delete associated shares
    const shares = await ctx.db
      .query("taskShares")
      .withIndex("by_taskId", (q) => q.eq("taskId", args.taskId))
      .collect();
    for (const share of shares) {
      await ctx.db.delete(share._id);
    }

    // Delete the task
    await ctx.db.delete(args.taskId);
  },
});
