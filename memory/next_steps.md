| Milestone | Status | Description |
|---|---|---|
| 1. Scaffold | ✅ Completed | Next.js App Router, Tailwind, Convex Auth, protected layout. |
| 2. Convex Schema & Task CRUD | ✅ Completed | Define schema and implement basic task operations with permissions. |
| 3. Profile Flow & Prefs | ⏳ Pending | Profile upsert on auth + Profile page view preference. |
| 4. List View & Task Details | ⭕ Not started | List view with aggregates + task details popup. |
| 5. Notes & Timeline | ⭕ Not started | Notes table + notes timeline in task popup. |
| 6. Directory & Sharing | ⭕ Not started | User directory + searchable share picker flow. |
| 7. Kanban View | ⭕ Not started | Kanban board with drag & drop (owner-only). |
| 8. Filter Bar | ⭕ Not started | Unified filtering across List and Kanban views. |
| 9. Deployment & Polish | ⭕ Not started | Vercel deployment, env validation, and UI polish. |

# Optimized Prompt for Milestone 3
To implement Milestone 3, use the following prompt:
```text
Implement user profile management as defined in Milestone 3 and Section 11 of @memory/todo_app_prd.md.

1.  **Convex Functions**:
    *   Implement `upsertMyProfileFromAuth` in `convex/profiles.ts`. This mutation should be called on first app entry to sync Convex Auth identity (name, email, avatarUrl) to the `profiles` table.
    *   Implement `getMyProfile` query to return the current user's profile.
    *   Implement `updateMyPreferences` mutation to update the `defaultView` preference.
2.  **Frontend Integration**:
    *   Create a profile page or hook that ensures the profile is upserted upon login.
    *   Expose these functions to the UI for user profile management.
```

# Future Goals
