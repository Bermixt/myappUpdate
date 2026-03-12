---
name: "Milestone 9: Deployment & Polish"
overview: Complete Milestone 9 by polishing the UI/UX, validating the environment, and preparing for deployment on Vercel.
todos: []
isProject: false
---

### 1. UI/UX Polish

#### Global Styles & Animations

- Update `[app/globals.css](app/globals.css)` to include custom animations for fade-in and slide-up if not already available by default in Tailwind v4.
- Apply these animations to:
  - `[components/tasks/KanbanCard.tsx](components/tasks/KanbanCard.tsx)`
  - `[components/tasks/TaskListView.tsx](components/tasks/TaskListView.tsx)` (table rows)
  - `[app/app/directory/page.tsx](app/app/directory/page.tsx)` (already has some, will refine)
  - `[app/app/profile/page.tsx](app/app/profile/page.tsx)`

#### Landing Page (`[app/page.tsx](app/page.tsx)`)

- Redesign the landing page to be a polished "TaskFlow" product page.
- Include a hero section with a clear CTA ("Get Started" / "Sign In").
- Add a "Features" section highlighting List/Kanban views, Sharing, and Notes.
- Improve dark mode support and transitions.

#### Sign-In Page (`[app/signin/page.tsx](app/signin/page.tsx)`)

- Refine the sign-in/sign-up form for a more professional look.
- Ensure consistent button styles with the rest of the app (`active:scale-95`).

#### Component Polish

- **Buttons**: Ensure all buttons use consistent hover/active states and transitions.
- **FilterBar**: Update the `select` for due date to a more polished custom dropdown if time permits, or at least style it better for dark mode.
- **Kanban**: Add a subtle border highlight on card hover.

### 2. Environment Validation

- Create a `.env.example` file documenting:
  - `NEXT_PUBLIC_CONVEX_URL`
  - `CONVEX_DEPLOYMENT`
- Ensure no hardcoded dev values exist in the codebase.

### 3. Deployment Prep

- Verify `package.json` scripts (`build`, `start`).
- Ensure the landing page correctly redirects authenticated users to `/app`.

### 4. Final Cleanup

- Remove any remaining debug logs (double-check).
- Update `[README.md](README.md)` with:
  - Final project features.
  - Deployment instructions for Vercel.
  - Updated milestone status (all ✅).
- Update `[memory/next_steps.md](memory/next_steps.md)` and `[memory/historylog.md](memory/historylog.md)`.

