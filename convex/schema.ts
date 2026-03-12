import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  profiles: defineTable({
    userId: v.id("users"),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    defaultView: v.optional(v.union(v.literal("list"), v.literal("kanban"))),
    updatedAt: v.optional(v.number()),
  }).index("by_userId", ["userId"]),

  tasks: defineTable({
    ownerUserId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done")),
    criticity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_ownerUserId", ["ownerUserId"])
    .index("by_status", ["status"]),

  taskShares: defineTable({
    taskId: v.id("tasks"),
    sharedUserId: v.id("users"),
  })
    .index("by_sharedUserId", ["sharedUserId"])
    .index("by_taskId", ["taskId"])
    .index("by_taskId_and_sharedUserId", ["taskId", "sharedUserId"]),

  notes: defineTable({
    taskId: v.id("tasks"),
    authorUserId: v.id("users"),
    body: v.string(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_taskId", ["taskId"])
    .index("by_authorUserId", ["authorUserId"]),
});
