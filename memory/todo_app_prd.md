# PRD — Simple Multi-User To-Do List (with Sharing)

## 1) Summary
Build a simple but polished multi-user to-do app that supports sharing tasks with other users. The app includes a public landing page (login/signup) and a protected application with List + Kanban views, a user directory, and a profile view synced with **Convex Auth**.

Maintain an app-level **Profile** record in Convex (created on first signup/login) so we can store extra app fields (e.g., preferences) without relying on auth-provider metadata.

## 2) Goals
- **Functional core**: create/manage tasks, view them in list and kanban, share tasks with other users.
- **Multi-user + access control**: enforce ownership + sharing permissions across routes and backend.
- **Wow factor**: clean UI, smooth drag & drop, responsive layout, crisp empty states, subtle micro-interactions.
- **Developer showcase**: good architecture, reusable components, consistent styling, deployable on Vercel.

## 3) Non-Goals
- Complex workflow automation (recurrences, dependencies).
- Offline mode.
- Complex org/team RBAC beyond simple per-task sharing.
- Full collaborative editing.

## 4) Target Users
- Individuals managing personal tasks.
- Ad-hoc sharing with a small set of users.

## 5) Key User Stories
### Tasks
1. As a logged-in user, I can create a task with title, optional description, status, criticity, **due date**, and shared users.
2. As a logged-in user, I can see tasks I own and tasks shared with me.
3. As a task owner, I can edit any task field, change status, share/unshare, and delete the task.
4. As a task viewer (owner or shared user), I can open a task details popup from List or Kanban.
5. In List and Kanban, each task shows **notes count** and **shared count** aggregates.
6. Overdue tasks (past due date and not done) are clearly indicated in **red**.
7. As a logged-in user, I can **filter tasks** by status, criticity, and due date range in both List and Kanban.

### Notes
8. As the task owner or a shared user, I can add notes to a task.
9. As a note author, I can edit/delete my own notes.
10. As a task viewer, I can read notes in the task details popup.

### Directory & profile
11. As a logged-in user, I can browse/search a directory of **all app users**.
12. As a logged-in user, I can view my profile details synced from **Convex Auth identity**.
13. As a logged-in user, I can set a simple app preference (e.g., default view) stored in my Convex profile.

### Public landing
14. As a visitor, I can see a landing page with login/signup.

## 6) Tech Stack
- **Frontend**: Next.js **16+**, App Router
- **Auth**: **Convex Auth**
- **Backend/DB**: Convex (dev environment in the cloud)
- **Styling**: Tailwind CSS + shared global CSS at app level
- **Deployment**: Vercel

## 7) Information Architecture & Routes
### Public
- `/` — Landing page (public)
- `/sign-in` — Sign-in (Convex Auth)
- `/sign-up` — Sign-up (Convex Auth)

### Protected (gated)
- `/app` — App home (redirect to `/app/list`)
- `/app/list` — List view (protected)
- `/app/kanban` — Kanban view with drag & drop (protected)
- `/app/directory` — User directory (protected)
- `/app/profile` — Profile (protected)

## 8) UX / UI Requirements
### Visual style
- Clean, polished, minimal.
- Tailwind-first with **shared app-level CSS** (global styles + variables).
- Reusable components: buttons, inputs, cards, badges, modals/sheets, toasts, skeletons, empty states.

### Interaction requirements
- **Task details popup**: clicking a task row/card opens a popup (modal or sheet) with full task details and the notes timeline.
- **Kanban drag & drop**: smooth and responsive; status updates are **owner-only**.
- Inline status update controls in List are **owner-only**.
- Share picker: searchable multi-select for users.
- Consistent loading states (skeletons) and error states.

### Filtering UX (List + Kanban)
Keep it simple and consistent across views.
- A **single filter bar** above the main content.
- Filters apply to **owned + shared** tasks currently visible to the user.
- Filters are **client-side** by default (fast + simple). Optional server-side filtering can be added later if needed.

**Filter controls (MVP):**
- **Status**: multi-select (`todo`, `in_progress`, `done`) + quick preset “All”.
- **Criticity**: multi-select (`low`, `medium`, `high`) + quick preset “All”.
- **Due date**:
  - presets: `All`, `Overdue`, `Today`, `Next 7 days`, `No filter`
  - optional: simple **From / To** date range inputs (only if easy; otherwise presets only).
- **Reset**: “Clear filters” button.

**Behavior:**
- Filter state persists **per session** (URL query params or local state); no need for DB persistence.
- Empty state messaging reflects filters (e.g., “No tasks match these filters”).

### Color rules
- **Status colors**: each task status has a specific, consistent color (badge + kanban column header + subtle card accent).
- **Overdue**: if `dueDate` is in the past and status is not `done`, show a **red** indicator (e.g., red pill/border/dot) in both List and Kanban.

## 9) Data Model (single source of truth)
> Keep the model small and explicit. Derived/UI fields are computed, not stored.

### A) Profiles (Convex)
App-owned user record to store extra fields beyond Convex Auth identity.
- `id` (Convex)
- `userId` (string, **Convex Auth user id / subject**, unique)
- `email` (string, optional)
- `name` (string, optional)
- `avatarUrl` (string, optional)
- `defaultView` (enum): `list` | `kanban` (optional; default `list`)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Creation rule (simple, no webhook requirement):** on first authenticated app entry (including the post-signup redirect), call a server-side action/handler that upserts this record from the current **Convex Auth identity**.

### B) Tasks
- `id` (Convex)
- `ownerUserId` (string, Convex Auth user id / subject)
- `title` (string, required)
- `description` (string, optional)
- `status` (enum): `todo` | `in_progress` | `done`
- `criticity` (enum): `low` | `medium` | `high`
- `dueDate` (timestamp/date, **required**)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### C) Sharing
- `taskShares`
  - `id` (Convex)
  - `taskId` (task id)
  - `sharedUserId` (string, Convex Auth user id / subject)

### D) Notes
- `id` (Convex)
- `taskId` (task id)
- `authorUserId` (string, Convex Auth user id / subject)
- `body` (string, required)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### E) Derived fields (UI only)
- `isOwner`
- `canEditTask` (owner only)
- `canViewTask` (owner or shared)
- `canWriteNotes` (owner or shared)
- `canEditDeleteOwnNotes` (note.authorUserId == viewer)
- `isOverdue` (dueDate < now AND status != done)
- `notesCount` (aggregate number of notes)
- `sharedCount` (aggregate number of shared users)

## 10) Permissions & Security
### Access rules
**Tasks**
- View: owner OR viewer is shared.
- Edit/update/delete task (including **status** and **sharing**): **owner only**.

**Notes**
- View notes: anyone who can view the task.
- Create note: owner OR shared user.
- Edit/delete note: **note author only**.

**Profiles**
- Read: current user only.
- Update: current user only (preferences) + server-side upsert from **Convex Auth identity snapshot**.

### Route gating
- All `/app/*` routes are protected.
- Use `proxy.ts` (or equivalent middleware/gate) to enforce auth and redirect unauthenticated users to `/sign-in`.

### Server-side enforcement
- All Convex functions must validate permissions (never rely solely on client gating).

## 11) Backend (Convex)
### Collections (tables)
- `profiles`
  - Indexes: by `userId`
- `tasks`
  - Indexes: by `ownerUserId`, by `status`
- `taskShares`
  - Indexes: by `sharedUserId`, by `taskId`
- `notes`
  - Indexes: by `taskId`, by `authorUserId`

### Functions
**Profiles**
- Queries:
  - `getMyProfile()` → returns my profile
- Mutations:
  - `upsertMyProfileFromAuth({ userId, email?, name?, avatarUrl? })` → upsert profile for current user
  - `updateMyPreferences({ defaultView })` → current user only

**Tasks**
- Queries:
  - `listMyTasks()` → owned tasks + tasks shared with me (include aggregates)
  - `getTask(id)` → permission-checked
- Mutations:
  - `createTask(payload)`
  - `updateTask(id, patch)` → owner only
  - `updateTaskStatus(id, status)` → owner only
  - `updateSharing(id, sharedWith[])` → owner only
  - `deleteTask(id)` → owner only

**Notes**
- Queries:
  - `listNotes(taskId)` → permission-checked
- Mutations:
  - `createNote(taskId, body)` → owner or shared
  - `updateNote(noteId, body)` → author only
  - `deleteNote(noteId)` → author only

### Directory data
- Use the `profiles` table as the source of truth for directory/search (i.e., all users who have ever authenticated into the app).
- Include pagination/limits.

## 12) Frontend (Next.js 16+ App Router)
### Layout
- Public layout: landing page with clear CTA.
- App layout: sidebar nav (List, Kanban, Directory, Profile), top bar with user menu.

### Views
#### A) List View (Protected)
- **Filter bar (MVP)**:
  - Status multi-select + “All” preset.
  - Criticity multi-select + “All” preset.
  - Due date filter (presets: All / Overdue / Today / Next 7 days; optional From/To range if simple).
  - “Clear filters”.
- Each task row shows: title, status, criticity badge, due date, overdue indicator, notes count, shared count.
- Clicking the row opens the **Task Details popup**.
- Status controls available to owner only.

#### B) Kanban View (Protected)
- Columns: To do / In progress / Done.
- **Filter bar (same as List)** placed above the columns.
- Each card shows: title, criticity badge, due date, overdue indicator, notes count, shared count.
- Drag & drop between columns updates status (**owner only**).
- Clicking a card opens the **Task Details popup**.

**Kanban filtering behavior:**
- Filters apply first; then cards are grouped into columns by status.
- If the Status filter excludes a column, either:
  - keep the column visible but empty with a light “Filtered out” hint, OR
  - hide the column (pick one behavior and keep it consistent).

#### C) Task Details Popup (Modal/Sheet)
- Shows: title, description, status, criticity, due date, sharedWith.
- Edit rules:
  - Owner can edit task fields, sharing, and status.
  - Shared users can view task fields but cannot edit the task.
- Notes timeline:
  - Owner + shared users can add notes.
  - Users can edit/delete only their own notes.

#### D) Create Task
- “New task” button opens the same popup in create mode.
- Fields: title (required), description, criticity, status, **due date (required)**, sharedWith.

#### E) Directory View (Protected)
- Lists **all app users**.
- Search by name/email.
- Used to select users in the share picker.

#### F) Profile View (Protected)
- Displays **Convex Auth identity** info (name, email, avatar).
- Displays app preference from Convex profile (e.g., default view list/kanban).

## 13) Reusable Component Inventory
- `AppShell` (sidebar + header)
- `Button`, `IconButton`
- `Input`, `Textarea`, `Select`
- `Modal/Sheet`
- `Card`
- `Badge` (status + criticity)
- `Avatar`, `AvatarStack`
- `Toast` notifications
- `Skeleton` loaders
- `EmptyState`
- `NoteList` / `NoteComposer`
- `FilterBar` (shared between List + Kanban)
- `MultiSelect` (or popover + checkboxes)

## 14) Acceptance Criteria (MVP)
### Auth & routing
- Landing page is public.
- All `/app/*` routes require auth.

### Profiles
- On first authenticated app entry after signup/sign-in, a `profiles` row exists for the user (upserted from **Convex Auth identity**).
- User can update `defaultView` preference; it persists.

### Tasks
- Create, edit, delete tasks (**owner only**).
- View owned + shared tasks.
- **Filtering works in both List and Kanban**:
  - by status
  - by criticity
  - by due date (presets; optional range)
- Status change works in list + kanban drag & drop (**owner only**).
- Due date is required and visible.
- Overdue tasks show a red indicator; status uses consistent colors.
- Task rows/cards show **notes count** and **shared count** aggregates.
- Clicking a task opens the **Task Details popup**.

### Notes
- Notes are visible in the Task Details popup.
- Owner + shared users can add notes.
- Users can edit/delete only their own notes.

### Sharing
- Owner can share/unshare a task with users from directory.
- Shared user can view the task but cannot edit/delete the task.

### Directory & profile
- Directory lists all app users with search.
- Profile shows **Convex Auth identity** info plus app preference from Convex profile.

### Deployment
- Deploys on Vercel with required env vars configured.
- Convex dev environment runs in the cloud.

## 15) Edge Cases
- Filtering + overdue: overdue is always computed from due date + status; the “Overdue” filter must align with the red indicator logic.
- Sharing with a user who later deletes account: show “Unknown user” gracefully.
- User removed from shared list: loses access immediately.
- Optimistic UI for updates with rollback on failure.
- Overdue logic respects timezone; avoid flicker around midnight.

## 16) Milestones
1. Scaffold: Next.js App Router + Tailwind + shared CSS + **Convex Auth** + protected layout.
2. Convex schema + CRUD tasks + permission checks.
3. Profile upsert flow + Profile page preference.
4. List view with aggregates + task details popup.
5. Notes table + notes timeline in popup.
6. Directory + sharing flow.
7. Kanban view + drag & drop (owner-only status changes).
8. Filtering bar shared across List + Kanban.
9. Polish + Vercel deploy + env validation.

## 17) PRD Consistency Checklist (to track inconsistencies)
Use this list when implementing/reviewing PR changes:
- **Sharing model chosen once**: either `tasks.sharedWith[]` OR `taskShares` table; endpoints + UI must match.
- **Permission rules** aligned everywhere: owner-only updates for task + status + sharing; note author-only edits.
- **Due date**: treated as required in create flow, schema validation, and UI.
- **Filtering definitions** match across views: status/criticity enums + overdue definition + date presets.
- **Directory source**: directory/search uses `profiles`; profile preferences use Convex.
- **Aggregates**: `notesCount` and `sharedCount` displayed in both List and Kanban.
- **Overdue**: computed consistently across List/Kanban/popup with timezone-safe logic.

## 18) Technical Notes & Guardrails
- Keep modules small; separate `ui/`, `features/tasks/`, `features/users/`.
- Validate inputs on server (Convex) and client.
- Prefer server actions/route handlers for any non-Convex external calls.
- Use `proxy.ts` for route gating; never rely only on client-side checks.