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

    // Fetch the user document directly from the users table to get the email
    // if it's not present in the identity.
    const user = await ctx.db.get(userId);
    const email = identity.email || user?.email;

    const profileData = {
      userId,
      email: email,
      name: identity.name || (email ? email.split("@")[0] : "Anonymous User"),
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

/**
 * List all profiles except the current user.
 */
export const listAllProfiles = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const profiles = await ctx.db
      .query("profiles")
      .order("desc")
      .take(100);

    return profiles.filter((p) => p.userId !== userId);
  },
});

/**
 * Search profiles by name or email, excluding the current user.
 */
export const searchProfiles = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const searchTerm = args.query.toLowerCase();

    // Convex doesn't have native text search on these fields yet without an index,
    // so we'll do a simple filter for now as per PRD "client-side by default" (though this is server-side filtering).
    // For a real app, we'd use search indexes.
    const allProfiles = await ctx.db.query("profiles").collect();

    return allProfiles
      .filter((p) => p.userId !== userId)
      .filter((p) => {
        const nameMatch = p.name?.toLowerCase().includes(searchTerm);
        const emailMatch = p.email?.toLowerCase().includes(searchTerm);
        return nameMatch || emailMatch;
      })
      .slice(0, 10);
  },
});
