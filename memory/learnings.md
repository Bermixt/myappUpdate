# Technical Learnings
- **Convex Composite Indexes**: Using composite indexes like `by_taskId_and_sharedUserId` in `taskShares` table allows for extremely efficient ownership/sharing checks without using `.filter()`.
- **Convex Permissions**: Using `getAuthUserId(ctx)` from `@convex-dev/auth/server` provides a secure, token-backed way to identify users and enforce owner-only access rules in queries and mutations.
- **Aggregate Computation**: Computing `notesCount` and `sharedCount` within the query (e.g., `listMyTasks`) simplifies frontend logic and ensures consistent data presentation.
- **Schema Cleanup**: Proactively removing demo tables (`numbers`) and boilerplate functions keeps the codebase maintainable and focused on the PRD requirements.
- **Automatic Profile Sync**: Using a client-side side-effect component (`ProfileSync.tsx`) is a clean way to ensure a database record exists for a user immediately after they authenticate via Convex Auth, without needing complex webhooks.
- **Convex Auth Identity & Data Retrieval**: When using the `Password` provider, `ctx.auth.getUserIdentity()` may not contain all user fields (like `email` or `name`) in the JWT identity. It's safer to fetch the user document directly from the `users` table via `ctx.db.get(userId)` using the `getAuthUserId(ctx)` as a key, especially when initializing or syncing user profiles.

# Bug Root Cause Analysis
- **Nested Form Submission**: In React, nesting a `<form>` inside another `<form>` is invalid HTML and causes the `submit` event of the inner form to bubble up to the outer form. This can lead to unexpected behavior, such as a modal closing or multiple mutations firing simultaneously.
  - **Resolution**: Avoid nesting forms by using `div` wrappers for layout and only using `<form>` for actual submission units. Use `e.stopPropagation()` in the inner submit handler as a secondary safeguard.
