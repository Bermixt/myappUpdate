---
name: Milestone 2 Implementation
overview: Implement the Convex schema and basic Task CRUD operations with permission checks as defined in Milestone 2 of the PRD.
todos: []
isProject: false
---

Implement Milestone 2 by updating the database schema and creating the core task management functions.

### 1. Update Schema

Update `convex/schema.ts` to include the following tables and indexes:

- `profiles`: Links authenticated users to app-specific data (name, email, default view).
- `tasks`: Core task data with ownership and metadata (status, criticity, due date).
- `taskShares`: Many-to-many relationship between tasks and users they are shared with.
- `notes`: Comments/notes attached to tasks.

### 2. Implement Task CRUD

Create a new file `convex/tasks.ts` with the following functions:

- `listMyTasks`: Returns tasks owned by or shared with the current user, including `notesCount` and `sharedCount` aggregates.
- `getTask`: Retrieves a single task with permission checks.
- `createTask`: Allows authenticated users to create new tasks.
- `updateTask`: Allows owners to update task details.
- `updateTaskStatus`: Allows owners to update task status (separate for Kanban drag-and-drop support).
- `updateSharing`: Allows owners to manage task sharing.
- `deleteTask`: Allows owners to delete tasks.

### 3. Permission Enforcement

- Use `getAuthUserId(ctx)` from `@convex-dev/auth/server` to identify the authenticated user.
- Ensure only owners can edit, share, or delete their tasks.
- Ensure only owners or shared users can view tasks.

### 4. Technical Details

- Use `v.id("users")` for user identifiers to align with `@convex-dev/auth`.
- Implement data aggregation (counts) within the `listMyTasks` query for UI efficiency.
- Follow `convex_rules.mdc` for function registration and validator usage.

