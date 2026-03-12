# Multi-User To-Do List (with Sharing)

A simple but polished multi-user to-do app built with Next.js 16+, Convex, and Convex Auth. Supports List and Kanban views, user sharing, and notes.

## 🚀 Project Summary

Build a polished to-do app with the following features:
- **Tasks**: Create, edit, and manage tasks with title, description, criticity, and due dates.
- **Views**: Toggle between a list view and a Kanban board with drag-and-drop support.
- **Sharing**: Share tasks with other users from the app's directory.
- **Notes**: Add and manage notes on individual tasks.
- **Profiles**: Sync user profiles and preferences via Convex Auth.
- **Permissions**: Secure backend with owner-only editing and shared-user viewing access.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16+](https://nextjs.org/) (App Router)
- **Backend/Database**: [Convex](https://convex.dev/)
- **Auth**: [Convex Auth](https://labs.convex.dev/auth)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🏗️ Architecture

- `/app`: Next.js frontend routes (protected and public).
- `/convex`: Convex backend functions (queries, mutations, actions, and schema).
- `/memory`: AI-driven project context and milestones tracking.

## 🚦 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd my-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Convex**:
    Run the Convex dev server to initialize your environment:
    ```bash
    npx convex dev
    ```

4.  **Run the app**:
    ```bash
    npm run dev
    ```

## 📅 Milestones

1.  **Scaffold**: Next.js App Router + Tailwind + Convex Auth + Protected layout. (✅ Completed)
2.  **Convex Schema & Task CRUD**: Define schema and implement basic task operations. (✅ Completed)
3.  **Profile Flow & Prefs**: Profile upsert on auth + user preferences. (✅ Completed)
4.  **List View & Task Details**: List view with aggregates and details popup. (✅ Completed)
5.  **Notes & Timeline**: Notes table and timeline integration. (⏳ In Progress)
6.  **Directory & Sharing**: User directory and sharing functionality.
7.  **Kanban View**: Kanban board with drag & drop.
8.  **Filter Bar**: Unified filtering across views.
9.  **Deployment & Polish**: Vercel deployment and UI polish.

---

Built with ❤️ using Next.js and Convex.
