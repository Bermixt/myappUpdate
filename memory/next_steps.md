| Milestone | Status | Description |
|---|---|---|
| 1. Scaffold | ✅ Completed | Next.js App Router, Tailwind, Convex Auth, protected layout. |
| 2. Convex Schema & Task CRUD | ✅ Completed | Define schema and implement basic task operations with permissions. |
| 3. Profile Flow & Prefs | ✅ Completed | Profile upsert on auth + Profile page view preference. |
| 4. List View & Task Details | ✅ Completed | List view with aggregates + task details popup. |
| 5. Notes & Timeline | ✅ Completed | Notes table + notes timeline in task popup. |
| 6. Directory & Sharing | ✅ Completed | User directory + searchable share picker flow. |
| 7. Kanban View | ✅ Completed | Kanban board with drag & drop (owner-only). |
| 8. Filter Bar | ✅ Completed | Unified filtering across List and Kanban views. |
| 9. Deployment & Polish | ⭕ Not started | Vercel deployment, env validation, and UI polish. |

# Optimized Prompt for Milestone 9
To implement Milestone 9, use the following prompt:
```text
Complete Milestone 9: Deployment & Polish for @memory/todo_app_prd.md.

1.  **UI/UX Polish**:
    *   Review all views (List, Kanban, Directory, Profile) for visual consistency.
    *   Ensure all buttons have proper hover/active states and transitions.
    *   Check dark mode compatibility for all new components (FilterBar, Kanban).
    *   Add subtle entrance animations (e.g., simple fade-in) for task cards and list rows.
2.  **Environment Validation**:
    *   Ensure `NEXT_PUBLIC_CONVEX_URL` and other required variables are clearly documented.
    *   Check for any hardcoded dev values that should be environment-controlled.
3.  **Deployment Prep**:
    *   Verify `package.json` scripts and dependencies.
    *   Ensure the landing page (public route `/`) is polished and has a clear CTA to Sign In/Up.
4.  **Final Cleanup**:
    *   Remove any remaining console logs or debug code.
    *   Update `README.md` with final project features and screenshots if possible.
```

# Future Goals
- Milestone 9: Deployment & Polish
