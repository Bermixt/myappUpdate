import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

/**
 * Helper to check if a user has access to a task.
 */
async function checkTaskAccess(ctx: any, taskId: Id<"tasks">, userId: Id<"users">) {
  const task = await ctx.db.get(taskId);
  if (!task) throw new Error("Task not found");

  if (task.ownerUserId === userId) return true;

  const share = await ctx.db
    .query("taskShares")
    .withIndex("by_taskId_and_sharedUserId", (q: any) =>
      q.eq("taskId", taskId).eq("sharedUserId", userId),
    )
    .unique();

  if (!share) throw new Error("Permission denied");
  return true;
}

/**
 * Add a note to a task.
 */
export const addNote = mutation({
  args: {
    taskId: v.id("tasks"),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await checkTaskAccess(ctx, args.taskId, userId);

    const noteId = await ctx.db.insert("notes", {
      taskId: args.taskId,
      authorUserId: userId,
      body: args.body,
      updatedAt: Date.now(),
    });

    // Update task updatedAt
    await ctx.db.patch(args.taskId, { updatedAt: Date.now() });

    return noteId;
  },
});

/**
 * List all notes for a task, enriched with author info.
 */
export const listNotes = query({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await checkTaskAccess(ctx, args.taskId, userId);

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_taskId", (q) => q.eq("taskId", args.taskId))
      .order("asc")
      .collect();

    const notesWithAuthors = [];
    for (const note of notes) {
      const authorProfile = await ctx.db
        .query("profiles")
        .withIndex("by_userId", (q) => q.eq("userId", note.authorUserId))
        .unique();

      notesWithAuthors.push({
        ...note,
        authorName: authorProfile?.name || "Unknown User",
        authorAvatarUrl: authorProfile?.avatarUrl,
        isAuthor: note.authorUserId === userId,
      });
    }

    return notesWithAuthors;
  },
});

/**
 * Update a note (author only).
 */
export const updateNote = mutation({
  args: {
    noteId: v.id("notes"),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found");

    if (note.authorUserId !== userId) {
      throw new Error("Permission denied: Author only");
    }

    await ctx.db.patch(args.noteId, {
      body: args.body,
      updatedAt: Date.now(),
    });

    // Update task updatedAt
    await ctx.db.patch(note.taskId, { updatedAt: Date.now() });
  },
});

/**
 * Delete a note (author only).
 */
export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found");

    if (note.authorUserId !== userId) {
      throw new Error("Permission denied: Author only");
    }

    await ctx.db.delete(args.noteId);

    // Update task updatedAt
    await ctx.db.patch(note.taskId, { updatedAt: Date.now() });
  },
});
