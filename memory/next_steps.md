| Milestone | Status | Description |
|---|---|---|
| 1. Scaffold | ✅ Completed | Next.js App Router, Tailwind, Convex Auth, protected layout. |
| 2. Convex Schema & Task CRUD | ✅ Completed | Define schema and implement basic task operations with permissions. |
| 3. Profile Flow & Prefs | ✅ Completed | Profile upsert on auth + Profile page view preference. |
| 4. List View & Task Details | ✅ Completed | List view with aggregates + task details popup. |
| 5. Notes & Timeline | ✅ Completed | Notes table + notes timeline in task popup. |
| 6. Directory & Sharing | ✅ Completed | User directory + searchable share picker flow. |
| 7. Kanban View | ✅ Completed | Kanban board with drag & drop (owner-only). |
| 8. Filter Bar | ⭕ Not started | Unified filtering across List and Kanban views. |
| 9. Deployment & Polish | ⭕ Not started | Vercel deployment, env validation, and UI polish. |

# Optimized Prompt for Milestone 8
To implement Milestone 8, use the following prompt:
```text
Implement the Filter Bar for both List and Kanban views as defined in Milestone 8 of @memory/todo_app_prd.md.

1.  **Shared Filter State**:
    *   Create a reusable hook `useTaskFilters` (using React state or URL search params) to manage:
        *   `statuses`: `todo` | `in_progress` | `done` (multi-select)
        *   `criticities`: `low` | `medium` | `high` (multi-select)
        *   `dueDatePreset`: `all` | `overdue` | `today` | `next_7_days`
2.  **FilterBar Component**:
    *   Create `components/tasks/FilterBar.tsx`:
        *   Implement multi-select dropdowns or pill-based toggles for Status and Criticity.
        *   Implement a dropdown or radio group for Due Date presets.
        *   Add a "Clear Filters" button to reset all fields.
3.  **Integration**:
    *   In `TaskListView.tsx` and `KanbanView.tsx`:
        *   Import and render the `FilterBar` at the top.
        *   Apply the filtering logic client-side to the `tasks` array fetched from Convex before rendering the list or columns.
    *   Ensure the "Overdue" filter correctly identifies tasks where `dueDate < now` and `status !== "done"`.
4.  **UI Polish**:
    *   Update empty states to reflect when no tasks match the active filters (e.g., "No tasks match these filters").
```

# Future Goals
- Milestone 8: Filter Bar
- Milestone 9: Deployment & Polish
