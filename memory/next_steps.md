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
| 9. Deployment & Polish | ✅ Completed | Vercel deployment, env validation, and UI polish. |

# Next Phase: Production Deployment
- **Deployment Platform**: [Vercel](https://vercel.com/)
- **Method**: [Vercel CLI](https://vercel.com/docs/cli) (installed and ready).
- **Tasks**:
  - Run `vercel` to initialize project.
  - Link Convex production environment.
  - Configure production environment variables on Vercel.
  - Final production build and smoke test.

# Future Goals
- Real-time collaboration indicators (who else is viewing this task).
- Mobile-first responsive optimizations for Kanban.
- Advanced search with full-text indexing in Convex.
- Dark mode toggle persistence.
