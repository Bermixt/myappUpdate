"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * The app root redirects to the list view by default.
 */
export default function AppRoot() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/app/list");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading your app...</p>
      </div>
    </div>
  );
}
