| Milestone | Status | Description |
|---|---|---|
| 1. Scaffold | ✅ Completed | Next.js App Router, Tailwind, Convex Auth, protected layout. |
| 2. Convex Schema & Task CRUD | ✅ Completed | Define schema and implement basic task operations with permissions. |
| 3. Profile Flow & Prefs | ✅ Completed | Profile upsert on auth + Profile page view preference. |
| 4. List View & Task Details | ⏳ Pending | List view with aggregates + task details popup. |
| 5. Notes & Timeline | ⭕ Not started | Notes table + notes timeline in task popup. |
| 6. Directory & Sharing | ⭕ Not started | User directory + searchable share picker flow. |
| 7. Kanban View | ⭕ Not started | Kanban board with drag & drop (owner-only). |
| 8. Filter Bar | ⭕ Not started | Unified filtering across List and Kanban views. |
| 9. Deployment & Polish | ⭕ Not started | Vercel deployment, env validation, and UI polish. |

# Optimized Prompt for Milestone 4
To implement Milestone 4, use the following prompt:
```text
Implement the List View and Task Details Popup as defined in Milestone 4 and Section 12 of @memory/todo_app_prd.md.

1.  **Backend Extensions**:
    *   Ensure `listMyTasks` in `convex/tasks.ts` returns all necessary fields: `title`, `status`, `criticity`, `dueDate`, `notesCount`, `sharedCount`, `isOwner`, `canEdit`, and `isOverdue`.
2.  **Frontend Components**:
    *   Create `components/tasks/TaskListView.tsx`:
        *   Displays tasks in a responsive table or list.
        *   Shows status, criticity badges, due dates, and overdue indicators (in red).
        *   Displays aggregate counts for notes and shares.
        *   Implements status change controls (owner-only).
    *   Create `components/tasks/TaskDetailsPopup.tsx`:
        *   A Modal or Sheet that opens when a task is clicked.
        *   Displays full details (description, full timestamps).
        *   Provides edit forms for owners.
3.  **App Integration**:
    *   Update `app/app/list/page.tsx` to use `TaskListView`.
    *   Add a "New Task" button that opens the popup in creation mode.
```

# Future Goals
