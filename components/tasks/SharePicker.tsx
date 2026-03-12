"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import Avatar from "../ui/Avatar";

interface SharePickerProps {
  selectedUserIds: Id<"users">[];
  onChange: (userIds: Id<"users">[]) => void;
  disabled?: boolean;
}

export default function SharePicker({ selectedUserIds, onChange, disabled }: SharePickerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchResults = useQuery(
    api.profiles.searchProfiles,
    searchQuery ? { query: searchQuery } : "skip"
  );
  const allProfiles = useQuery(api.profiles.listAllProfiles);

  const profiles = searchQuery ? searchResults : allProfiles;

  const toggleUser = (userId: Id<"users">) => {
    if (selectedUserIds.includes(userId)) {
      onChange(selectedUserIds.filter((id) => id !== userId));
    } else {
      onChange([...selectedUserIds, userId]);
    }
  };

  return (
    <div className="relative">
      <div 
        className={`w-full bg-slate-100 dark:bg-slate-800 rounded-xl p-4 flex flex-wrap gap-2 min-h-[56px] cursor-pointer border-2 border-transparent focus-within:border-slate-400 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedUserIds.length === 0 && !isOpen && (
          <span className="text-slate-400">Select users to share with...</span>
        )}
        
        {selectedUserIds.map((userId) => {
          const profile = allProfiles?.find(p => p.userId === userId);
          return (
            <div 
              key={userId}
              className="bg-white dark:bg-slate-700 px-2 py-1 rounded-lg flex items-center gap-2 border border-slate-200 dark:border-slate-600 text-sm shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) toggleUser(userId);
              }}
            >
              <Avatar src={profile?.avatarUrl} name={profile?.name} size="xs" />
              <span className="max-w-[100px] truncate">{profile?.name || 'User'}</span>
              <span className="text-slate-400 hover:text-rose-500 transition-colors">✕</span>
            </div>
          );
        })}
        
        {isOpen && (
          <input
            autoFocus
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-[60] overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 space-y-1">
            {profiles === undefined ? (
              <div className="p-4 text-center text-slate-400 text-sm animate-pulse">Loading users...</div>
            ) : profiles.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-sm">No users found</div>
            ) : (
              profiles.map((profile) => (
                <button
                  key={profile._id}
                  onClick={() => toggleUser(profile.userId)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    selectedUserIds.includes(profile.userId) ? 'bg-slate-100 dark:bg-slate-800/50' : ''
                  }`}
                >
                  <Avatar src={profile.avatarUrl} name={profile.name} size="sm" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-slate-800 dark:text-slate-100 truncate text-sm">
                      {profile.name || 'Anonymous User'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {profile.email}
                    </p>
                  </div>
                  {selectedUserIds.includes(profile.userId) && (
                    <span className="text-emerald-500">✓</span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-50" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
