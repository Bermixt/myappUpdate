"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

interface NoteComposerProps {
  taskId: Id<"tasks">;
}

export default function NoteComposer({ taskId }: NoteComposerProps) {
  const addNote = useMutation(api.notes.addNote);
  const [body, setBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!body.trim() || isPosting) return;

    setIsPosting(true);
    setError(null);

    try {
      await addNote({ taskId, body });
      setBody("");
    } catch (err) {
      setError("Failed to post note. Please try again.");
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Add a note..."
          className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-slate-400 outline-none transition-all placeholder:text-slate-400 resize-none pr-16"
          disabled={isPosting}
        />
        <button
          type="submit"
          disabled={!body.trim() || isPosting}
          className="absolute bottom-3 right-3 bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-slate-100 dark:text-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPosting ? "..." : "Post"}
        </button>
      </form>
      {error && (
        <p className="text-xs text-rose-500 px-1 font-medium">{error}</p>
      )}
    </div>
  );
}
