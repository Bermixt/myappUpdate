"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import NoteComposer from "./NoteComposer";

interface NoteListProps {
  taskId: Id<"tasks">;
}

/**
 * Simple helper for relative time since we don't have date-fns.
 */
function getRelativeTimeString(date: number): string {
  const now = Date.now();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NoteList({ taskId }: NoteListProps) {
  const notes = useQuery(api.notes.listNotes, { taskId });
  const deleteNote = useMutation(api.notes.deleteNote);
  const updateNote = useMutation(api.notes.updateNote);

  const [editingNoteId, setEditingNoteId] = useState<Id<"notes"> | null>(null);
  const [editBody, setEditBody] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async (noteId: Id<"notes">) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    setIsProcessing(true);
    try {
      await deleteNote({ noteId });
    } catch (err) {
      console.error("Failed to delete note:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = (noteId: Id<"notes">, body: string) => {
    setEditingNoteId(noteId);
    setEditBody(body);
  };

  const handleSaveEdit = async () => {
    if (!editingNoteId || !editBody.trim() || isProcessing) return;
    setIsProcessing(true);
    try {
      await updateNote({ noteId: editingNoteId, body: editBody });
      setEditingNoteId(null);
    } catch (err) {
      console.error("Failed to update note:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (notes === undefined) return <div className="animate-pulse space-y-4 pt-4"><div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl" /></div>;

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Notes & Timeline</h3>
        <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-full">
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </span>
      </div>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-400">No notes yet. Start the conversation!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="group flex gap-3 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400 overflow-hidden">
                {note.authorAvatarUrl ? (
                  <img src={note.authorAvatarUrl} alt={note.authorName} className="w-full h-full object-cover" />
                ) : (
                  note.authorName.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{note.authorName}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{getRelativeTimeString(note._creationTime)}</span>
                  {note.isAuthor && !editingNoteId && (
                    <div className="hidden group-hover:flex items-center gap-2 ml-auto">
                      <button 
                        onClick={() => handleEdit(note._id, note.body)}
                        className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(note._id)}
                        className="text-[10px] text-rose-400 hover:text-rose-600 font-bold transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                
                {editingNoteId === note._id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-slate-400 outline-none transition-all resize-none"
                      rows={2}
                      disabled={isProcessing}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="text-[10px] font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                        disabled={isProcessing}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="text-[10px] font-bold text-slate-800 dark:text-slate-100 hover:underline cursor-pointer"
                        disabled={isProcessing || !editBody.trim()}
                      >
                        {isProcessing ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl rounded-tl-none">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {note.body}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <NoteComposer taskId={taskId} />
    </div>
  );
}
