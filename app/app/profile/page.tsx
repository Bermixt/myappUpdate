"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * The Profile page displays the user's information synced from auth
 * and allows them to update their application preferences.
 */
export default function ProfilePage() {
  const profile = useQuery(api.profiles.getMyProfile);
  const updatePreferences = useMutation(api.profiles.updateMyPreferences);
  const [updating, setUpdating] = useState(false);

  const handlePreferenceChange = async (view: "list" | "kanban") => {
    setUpdating(true);
    try {
      await updatePreferences({ defaultView: view });
    } catch (error) {
      console.error("Failed to update preferences:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (profile === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="w-48 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (profile === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-slate-600 dark:text-slate-400">Profile not found.</p>
        <Link
          href="/"
          className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 animate-fade-in">
      <div className="mb-8 flex items-center gap-4 animate-slide-up">
        <Link
          href="/"
          className="text-sm text-slate-600 dark:text-slate-400 hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-700 flex flex-col items-center sm:flex-row sm:items-start gap-8">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-700 shadow-lg bg-slate-100 dark:bg-slate-900 flex-shrink-0">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400">
                {profile.name?.charAt(0) || profile.email?.charAt(0) || "?"}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {profile.name || "Anonymous User"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">{profile.email}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium">
              Convex Auth ID: {profile.userId.substring(0, 12)}...
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Application Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Default View
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => handlePreferenceChange("list")}
                    disabled={updating}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      profile.defaultView === "list"
                        ? "border-slate-700 dark:border-slate-400 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 shadow-md"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <span className="font-semibold text-lg">List</span>
                    <span className="text-xs opacity-70">
                      View tasks in a traditional list
                    </span>
                  </button>
                  <button
                    onClick={() => handlePreferenceChange("kanban")}
                    disabled={updating}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      profile.defaultView === "kanban"
                        ? "border-slate-700 dark:border-slate-400 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 shadow-md"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <span className="font-semibold text-lg">Kanban</span>
                    <span className="text-xs opacity-70">
                      Organize tasks on a visual board
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm text-slate-500 dark:text-slate-500">
            <span>Profile last updated:</span>
            <span>
              {profile.updatedAt
                ? new Date(profile.updatedAt).toLocaleString()
                : "Never"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
