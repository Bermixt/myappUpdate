| Milestone | Status | Description |
|---|---|---|
| 1. Scaffold | ✅ Completed | Next.js App Router, Tailwind, Convex Auth, protected layout. |
| 2. Convex Schema & Task CRUD | ✅ Completed | Define schema and implement basic task operations with permissions. |
| 3. Profile Flow & Prefs | ✅ Completed | Profile upsert on auth + Profile page view preference. |
| 4. List View & Task Details | ✅ Completed | List view with aggregates + task details popup. |
| 5. Notes & Timeline | ⏳ Pending | Notes table + notes timeline in task popup. |
| 6. Directory & Sharing | ⭕ Not started | User directory + searchable share picker flow. |
| 7. Kanban View | ⭕ Not started | Kanban board with drag & drop (owner-only). |
| 8. Filter Bar | ⭕ Not started | Unified filtering across List and Kanban views. |
| 9. Deployment & Polish | ⭕ Not started | Vercel deployment, env validation, and UI polish. |

# Optimized Prompt for Milestone 5
To implement Milestone 5, use the following prompt:
```text
Implement the Notes & Timeline feature as defined in Milestone 5 of @memory/todo_app_prd.md.

1.  **Backend Extensions**:
    *   In `convex/schema.ts`, ensure the `notes` table exists (taskId, authorUserId, body, updatedAt).
    *   Create `convex/notes.ts`:
        *   `addNote({ taskId, body })`: Mutation to add a note to a task (owner or shared users only).
        *   `listNotes({ taskId })`: Query to get all notes for a task, ordered by creation time.
2.  **Frontend Components**:
    *   Update `components/tasks/TaskDetailsPopup.tsx`:
        *   Add a "Notes" section.
        *   Display a timeline of existing notes with author name and relative timestamp.
        *   Add a simple form (textarea + button) to post new notes.
3.  **UI Polish**:
    *   Ensure the notes scroll independently if the list gets long.
```

# Future Goals
- Milestone 5: Notes & Timeline
- Milestone 6: Directory & Sharing
- Milestone 7: Kanban View
- Milestone 8: Filter Bar
- Milestone 9: Deployment & Polish
