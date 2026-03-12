---
name: Milestone 4 - List View & Task Details Popup
overview: Implement the core task management interface, including the List view with aggregate counts, a detailed task popup for viewing and editing, and a shared application layout with a sidebar.
todos:
  - id: backend-tasks-update
    content: Update listMyTasks in convex/tasks.ts with limit and confirm fields.
    status: completed
  - id: frontend-appshell-create
    content: Implement AppShell component with sidebar navigation.
    status: completed
  - id: frontend-applayout-create
    content: Create app/app/layout.tsx for protected routes.
    status: completed
  - id: frontend-tasklistview-create
    content: Implement TaskListView component with badges and aggregates.
    status: completed
  - id: frontend-taskdetails-create
    content: Implement TaskDetailsPopup component for viewing/editing tasks.
    status: completed
  - id: frontend-app-list-page-create
    content: Create app/app/list/page.tsx and set up redirects.
    status: completed
isProject: false
---

1. **Backend Extensions** (`convex/tasks.ts`):
  - Review `listMyTasks` and `getTask` to ensure all fields required for Milestone 4 (title, status, criticity, dueDate, notesCount, sharedCount, isOwner, canEdit, isOverdue) are present and correctly calculated.
  - Add a `.take(100)` to `listMyTasks` for basic performance hygiene.
2. **Shared Layout** (`components/layout/AppShell.tsx` and `app/app/layout.tsx`):
  - Create `[components/layout/AppShell.tsx](components/layout/AppShell.tsx)`: A sidebar with navigation links (`/app/list`, `/app/kanban`, `/app/directory`, `/app/profile`) and a top bar with user info/sign-out.
  - Create `[app/app/layout.tsx](app/app/layout.tsx)`: Wraps all protected routes in `AppShell`.
3. **Task UI Components** (`components/tasks/`):
  - Create `[components/tasks/TaskListView.tsx](components/tasks/TaskListView.tsx)`: Fetches tasks and displays them in a table-like list. Includes:
    - Badges for status (`todo`, `in_progress`, `done`) and criticity (`low`, `medium`, `high`).
    - Red overdue indicators for past-due tasks.
    - Aggregate counts for notes and shares.
    - "New Task" button.
  - Create `[components/tasks/TaskDetailsPopup.tsx](components/tasks/TaskDetailsPopup.tsx)`: A modal for creating and editing tasks.
    - Owner-only edit fields (title, description, status, criticity, dueDate).
    - Display-only mode for shared users.
4. **Route Integration**:
  - Create `[app/app/list/page.tsx](app/app/list/page.tsx)`: The main entry point for the task list.
  - Create `[app/app/page.tsx](app/app/page.tsx)`: Simple redirect to `/app/list`.
  - Update `[app/page.tsx](app/page.tsx)`: Public landing page logic or redirect for authenticated users.

