---
name: "Milestone 6: Directory & Sharing"
overview: Implement User Directory and Task Sharing features, including backend queries for profiles and a frontend sharing interface.
todos:
  - id: profiles-backend-queries
    content: Add listAllProfiles and searchProfiles to convex/profiles.ts
    status: completed
  - id: tasks-backend-get-task-update
    content: Update getTask in convex/tasks.ts to include shared profiles info
    status: completed
  - id: ui-avatar-components
    content: Create components/ui/Avatar.tsx and components/ui/AvatarStack.tsx
    status: completed
  - id: directory-page-creation
    content: Create app/app/directory/page.tsx with search functionality
    status: completed
  - id: task-details-sharing-section
    content: Update components/tasks/TaskDetailsPopup.tsx with sharing section and user picker
    status: completed
isProject: false
---

Implement the User Directory & Task Sharing feature as defined in Milestone 6.

### Backend Extensions

1. **Profiles (`convex/profiles.ts`)**:
  - Add `listAllProfiles()` query to fetch all user profiles (excluding the current user).
  - Add `searchProfiles({ query })` query to search profiles by name or email.
2. **Tasks (`convex/tasks.ts`)**:
  - Verify `updateSharing` mutation (already exists, but ensure it meets requirements).
  - Update `getTask` to include the list of shared users (profiles).

### Frontend Components

1. **Reusable UI Components**:
  - Create `components/ui/Avatar.tsx` for consistent user display.
  - Create `components/ui/AvatarStack.tsx` for displaying multiple shared users.
2. **Directory Page (`app/app/directory/page.tsx`)**:
  - Implement a searchable list of all users.
3. **Task Details Popup (`components/tasks/TaskDetailsPopup.tsx`)**:
  - Add a "Sharing" section visible to owners.
  - Implement a user selection interface (searchable multi-select or popover).
  - Integrate with `updateSharing` mutation.
  - Show an avatar stack of currently shared users.

### UI Polish

- Ensure consistent use of avatars.
- Implement smooth transitions for the sharing interface.

