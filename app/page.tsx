"use client";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md p-4 border-b border-slate-200 dark:border-slate-700 flex flex-row justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Image src="/convex.svg" alt="Convex Logo" width={32} height={32} />
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
            <Image
              src="/nextjs-icon-light-background.svg"
              alt="Next.js Logo"
              width={32}
              height={32}
              className="dark:hidden"
            />
            <Image
              src="/nextjs-icon-dark-background.svg"
              alt="Next.js Logo"
              width={32}
              height={32}
              className="hidden dark:block"
            />
          </div>
          <h1 className="font-semibold text-slate-800 dark:text-slate-200">
            Convex + Next.js + Convex Auth
          </h1>
        </div>
        <SignOutButton />
      </header>
      <main className="p-8 flex flex-col gap-8">
        <Content />
      </main>
    </>
  );
}

function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();
  return (
    <>
      {isAuthenticated && (
        <button
          className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          onClick={() =>
            void signOut().then(() => {
              router.push("/signin");
            })
          }
        >
          Sign out
        </button>
      )}
    </>
  );
}

function Content() {
  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      <div>
        <h2 className="font-bold text-xl text-slate-800 dark:text-slate-200 text-center">
          Welcome to your Multi-User To-Do App!
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-center">
          You are signed in and ready to start building your task list.
        </p>
      </div>

      <div className="h-px bg-slate-200 dark:bg-slate-700"></div>

      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl text-slate-800 dark:text-slate-200">
          Next Steps
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Follow the milestones in the <code className="px-1 bg-slate-100 dark:bg-slate-800 rounded">README.md</code> to implement the core features:
        </p>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 flex flex-col gap-2">
          <li>Define the Task schema</li>
          <li>Implement Task CRUD operations</li>
          <li>Create the List and Kanban views</li>
          <li>Add task sharing and notes</li>
        </ul>
      </div>

      <div className="h-px bg-slate-200 dark:bg-slate-700"></div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Useful resources
        </h2>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 w-1/2">
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Stack articles"
              description="Learn about best practices, use cases, and more from a growing collection of articles, videos, and walkthroughs."
              href="https://stack.convex.dev"
            />
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions, trade tips & tricks, and show off your projects."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-5 rounded-xl h-40 overflow-auto border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] group cursor-pointer"
      target="_blank"
    >
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
        {title} →
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </a>
  );
}
