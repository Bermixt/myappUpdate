# Technical Learnings
- **Convex Composite Indexes**: Using composite indexes like `by_taskId_and_sharedUserId` in `taskShares` table allows for extremely efficient ownership/sharing checks without using `.filter()`.
- **Convex Permissions**: Using `getAuthUserId(ctx)` from `@convex-dev/auth/server` provides a secure, token-backed way to identify users and enforce owner-only access rules in queries and mutations.
- **Aggregate Computation**: Computing `notesCount` and `sharedCount` within the query (e.g., `listMyTasks`) simplifies frontend logic and ensures consistent data presentation.
- **Schema Cleanup**: Proactively removing demo tables (`numbers`) and boilerplate functions keeps the codebase maintainable and focused on the PRD requirements.
