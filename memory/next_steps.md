| Milestone | Status | Description |
|---|---|---|
| 1. Scaffold | ✅ Completed | Next.js App Router, Tailwind, Convex Auth, protected layout. |
| 2. Convex Schema & Task CRUD | ✅ Completed | Define schema and implement basic task operations with permissions. |
| 3. Profile Flow & Prefs | ✅ Completed | Profile upsert on auth + Profile page view preference. |
| 4. List View & Task Details | ✅ Completed | List view with aggregates + task details popup. |
| 5. Notes & Timeline | ✅ Completed | Notes table + notes timeline in task popup. |
| 6. Directory & Sharing | ⭕ Not started | User directory + searchable share picker flow. |
| 7. Kanban View | ⭕ Not started | Kanban board with drag & drop (owner-only). |
| 8. Filter Bar | ⭕ Not started | Unified filtering across List and Kanban views. |
| 9. Deployment & Polish | ⭕ Not started | Vercel deployment, env validation, and UI polish. |

# Optimized Prompt for Milestone 6
To implement Milestone 6, use the following prompt:
```text
Implement the User Directory & Task Sharing feature as defined in Milestone 6 of @memory/todo_app_prd.md.

Mind the @.cursor/rules/convex_rules.mdc for all Convex-related components and logic.

1.  **Backend Extensions**:
    *   In `convex/profiles.ts`:
        *   `listAllProfiles()`: Query to get all profiles for the directory, excluding the current user.
        *   `searchProfiles({ query })`: Query to search profiles by name or email.
    *   In `convex/tasks.ts`:
        *   Ensure `updateSharing` mutation handles the logic correctly (owner only, validates shared user IDs).
2.  **Frontend Components**:
    *   Create `app/app/directory/page.tsx`:
        *   Display a list of all app users with search functionality.
    *   Update `components/tasks/TaskDetailsPopup.tsx`:
        *   Add a "Sharing" section (owner-only visibility for editing).
        *   Implement a searchable multi-select or popover to pick users from the directory.
        *   Use `updateSharing` mutation to persist changes.
3.  **UI Polish**:
    *   Use `Avatar` components for users in the directory and share picker.
    *   Show current shared users as an "Avatar Stack" in the popup.
```

# Future Goals
- Milestone 5: Notes & Timeline
- Milestone 6: Directory & Sharing
- Milestone 7: Kanban View
- Milestone 8: Filter Bar
- Milestone 9: Deployment & Polish
