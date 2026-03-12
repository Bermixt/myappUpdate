| Milestone | Status | Description |
|---|---|---|
| 1. Scaffold | ✅ Completed | Next.js App Router, Tailwind, Convex Auth, protected layout. |
| 2. Convex Schema & Task CRUD | ✅ Completed | Define schema and implement basic task operations with permissions. |
| 3. Profile Flow & Prefs | ✅ Completed | Profile upsert on auth + Profile page view preference. |
| 4. List View & Task Details | ✅ Completed | List view with aggregates + task details popup. |
| 5. Notes & Timeline | ✅ Completed | Notes table + notes timeline in task popup. |
| 6. Directory & Sharing | ✅ Completed | User directory + searchable share picker flow. |
| 7. Kanban View | ⭕ Not started | Kanban board with drag & drop (owner-only). |
| 8. Filter Bar | ⭕ Not started | Unified filtering across List and Kanban views. |
| 9. Deployment & Polish | ⭕ Not started | Vercel deployment, env validation, and UI polish. |

# Optimized Prompt for Milestone 7
To implement Milestone 7, use the following prompt:
```text
Implement the Kanban View for tasks as defined in Milestone 7 of @memory/todo_app_prd.md.

Mind the @.cursor/rules/convex_rules.mdc for all Convex-related components and logic.

1.  **Frontend View**:
    *   Create `app/app/kanban/page.tsx`:
        *   Implement a board with three columns: "To Do", "In Progress", and "Done".
        *   Fetch tasks using `api.tasks.listMyTasks`.
        *   Implement Drag & Drop functionality to move tasks between columns.
        *   Each card should show title, criticity, due date, notes count, and shared count (use AvatarStack).
        *   Clicking a card opens the existing `TaskDetailsPopup`.
2.  **Permissions & Logic**:
    *   Ensure status updates via drag and drop are **owner-only**. Show a clear visual indicator if a user cannot move a task.
    *   When a task is dropped in a new column, call `api.tasks.updateTaskStatus`.
3.  **UI Polish**:
    *   Add empty state messaging for columns with no tasks.
    *   Ensure column headers use consistent colors as defined in the PRD.
```

# Future Goals
- Milestone 7: Kanban View
- Milestone 8: Filter Bar
- Milestone 9: Deployment & Polish
