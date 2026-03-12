"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Avatar from "@/components/ui/Avatar";

/**
 * Directory page displays all application users with search functionality.
 */
export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const allProfiles = useQuery(api.profiles.listAllProfiles);
  const searchResults = useQuery(
    api.profiles.searchProfiles,
    searchQuery ? { query: searchQuery } : "skip"
  );

  const profilesToDisplay = searchQuery ? searchResults : allProfiles;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          User Directory
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Find and connect with other users in the TaskApp community.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-600 transition-colors">
          🔍
        </div>
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profilesToDisplay === undefined ? (
          // Skeletons
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-4 animate-pulse"
            >
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : profilesToDisplay.length === 0 ? (
          <div className="col-span-full py-20 text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
            <div className="text-4xl">👥</div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                No users found
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                {searchQuery
                  ? `We couldn't find anyone matching "${searchQuery}"`
                  : "It looks like you're the first one here!"}
              </p>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-slate-600 dark:text-slate-400 font-semibold hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          profilesToDisplay.map((profile) => (
            <div
              key={profile._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
            >
              <Avatar
                src={profile.avatarUrl}
                name={profile.name}
                size="lg"
                className="group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate">
                  {profile.name || "Anonymous User"}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {profile.email}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
