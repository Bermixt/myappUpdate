"use client";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

/**
 * AppShell provides the main layout for the authenticated application,
 * including a sidebar and a top bar.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();
  const pathname = usePathname();
  const profile = useQuery(api.profiles.getMyProfile);

  const navigation = [
    { name: "List View", href: "/app/list", icon: "📋" },
    { name: "Kanban", href: "/app/kanban", icon: "🧱" },
    { name: "Directory", href: "/app/directory", icon: "👥" },
    { name: "Profile", href: "/app/profile", icon: "👤" },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Image src="/convex.svg" alt="Logo" width={32} height={32} />
          <span className="font-bold text-xl text-slate-800 dark:text-slate-100">
            TaskApp
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-all font-medium cursor-pointer"
          >
            <span className="text-xl">🚪</span>
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
          </h2>

          <div className="flex items-center gap-4">
            {profile && (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {profile.name || "Anonymous User"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {profile.email}
                  </p>
                </div>
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {profile.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.name || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-bold text-slate-400">
                      {profile.name?.charAt(0) || profile.email?.charAt(0) || "?"}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
