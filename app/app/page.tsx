"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

/**
 * The app root redirects to the user's preferred view.
 * If no preference is set, defaults to the list view.
 */
export default function AppRoot() {
  const router = useRouter();
  const profile = useQuery(api.profiles.getMyProfile);

  useEffect(() => {
    if (profile === undefined) return; // Loading

    if (profile && profile.defaultView === "kanban") {
      router.replace("/app/kanban");
    } else {
      router.replace("/app/list");
    }
  }, [profile, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading your app...</p>
      </div>
    </div>
  );
}
