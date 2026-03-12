import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

/**
 * Upsert the current user's profile from their auth identity.
 * This is called on first app entry to sync Convex Auth identity fields.
 */
export const upsertMyProfileFromAuth = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User identity not found");
    }

    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    const profileData = {
      userId,
      email: identity.email,
      name: identity.name,
      avatarUrl: identity.pictureUrl,
      updatedAt: Date.now(),
    };

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, profileData);
      return existingProfile._id;
    } else {
      return await ctx.db.insert("profiles", {
        ...profileData,
        defaultView: "list",
      });
    }
  },
});

/**
 * Get the current user's profile.
 */
export const getMyProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    return await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
  },
});

/**
 * Update the current user's application preferences.
 */
export const updateMyPreferences = mutation({
  args: {
    defaultView: v.union(v.literal("list"), v.literal("kanban")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) {
      throw new Error("Profile not found");
    }

    await ctx.db.patch(profile._id, {
      defaultView: args.defaultView,
      updatedAt: Date.now(),
    });
  },
});
