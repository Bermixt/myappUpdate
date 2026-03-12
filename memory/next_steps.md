| Milestone | Status | Description |
|---|---|---|
| 1. Scaffold | ✅ Completed | Next.js App Router, Tailwind, Convex Auth, protected layout. |
| 2. Convex Schema & Task CRUD | ⏳ Pending | Define schema and implement basic task operations with permissions. |
| 3. Profile Flow & Prefs | ⭕ Not started | Profile upsert on auth + Profile page view preference. |
| 4. List View & Task Details | ⭕ Not started | List view with aggregates + task details popup. |
| 5. Notes & Timeline | ⭕ Not started | Notes table + notes timeline in task popup. |
| 6. Directory & Sharing | ⭕ Not started | User directory + searchable share picker flow. |
| 7. Kanban View | ⭕ Not started | Kanban board with drag & drop (owner-only). |
| 8. Filter Bar | ⭕ Not started | Unified filtering across List and Kanban views. |
| 9. Deployment & Polish | ⭕ Not started | Vercel deployment, env validation, and UI polish. |

# Optimized Prompt for Milestone 2
To implement Milestone 2, use the following prompt:
```text
Implement the database schema and basic Task CRUD operations according to the PRD in @memory/todo_app_prd.md.

1.  **Update `convex/schema.ts`**:
    *   Add `profiles`, `tasks`, `taskShares`, and `notes` tables as defined in Section 9 of the PRD.
    *   Define necessary indexes for each table (Section 11).
2.  **Implement Convex Functions**:
    *   Create `convex/tasks.ts` for task queries and mutations (`listMyTasks`, `getTask`, `createTask`, `updateTask`, `updateTaskStatus`, `updateSharing`, `deleteTask`).
    *   Ensure all functions validate permissions server-side (Section 10). Use `ctx.auth.getUserIdentity()` to identify the user and enforce owner-only rules where required.
3.  **Basic Testing**: Ensure the schema is pushed and the functions are reachable via the Convex dashboard/API.
```

# Future Goals
