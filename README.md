# TaskFlow — Simple Multi-User To-Do List

A polished multi-user to-do app built with **Next.js 16+**, **Convex**, and **Convex Auth**. Supports List and Kanban views, user sharing, and notes.

## 🚀 Key Features

- **Dual Views**: Seamlessly switch between a structured List view and a visual Kanban board with drag-and-drop.
- **Unified Filtering**: Filter tasks by status, criticity, and due date across both views.
- **Smart Sharing**: Share tasks with other users from the directory with real-time updates.
- **Notes & Timeline**: Add notes to tasks and track changes in a beautiful timeline.
- **User Directory**: Search and find other users in the community.
- **Profiles & Prefs**: Personalized profiles with synced auth and app preferences.
- **Permissions**: Secure-by-default backend with owner-only editing and shared-user viewing.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16+](https://nextjs.org/) (App Router, Tailwind CSS v4)
- **Backend/Database**: [Convex](https://convex.dev/) (Real-time DB + Serverless Functions)
- **Auth**: [Convex Auth](https://labs.convex.dev/auth) (Password-based + Identity Sync)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚦 Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd taskflow
npm install
```

### 2. Set up Convex
Initialize your Convex project and environment:
```bash
npx convex dev
```
This will create your `.env.local` file with the required `NEXT_PUBLIC_CONVEX_URL` and `CONVEX_DEPLOYMENT`.

### 3. Run the App
```bash
npm run dev
```

## 🚢 Deployment (Vercel)

1. **Push to GitHub**: Push your repository to a GitHub account.
2. **Import to Vercel**: Connect your repository to Vercel.
3. **Configure Environment Variables**:
   Add the following variables to your Vercel project:
   - `NEXT_PUBLIC_CONVEX_URL` (from your `.env.local`)
   - `CONVEX_DEPLOYMENT` (from your `.env.local`)
4. **Deploy**: Vercel will automatically build and deploy your app.

## 📅 Completed Milestones

1. ✅ **Scaffold**: Next.js App Router + Tailwind + Convex Auth + Protected layout.
2. ✅ **Convex Schema & Task CRUD**: Defined schema and implemented core task operations.
3. ✅ **Profile Flow & Prefs**: Profile upsert on auth + user preferences.
4. ✅ **List View & Task Details**: List view with aggregates and details popup.
5. ✅ **Notes & Timeline**: Notes table and timeline integration.
6. ✅ **Directory & Sharing**: User directory and sharing functionality.
7. ✅ **Kanban View**: Kanban board with drag & drop.
8. ✅ **Filter Bar**: Unified filtering across views.
9. ✅ **Deployment & Polish**: Final UI/UX polish and deployment preparation.

---

Built with ❤️ by the TaskFlow team.
