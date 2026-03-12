"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Id, Doc } from "@/convex/_generated/dataModel";
import NoteList from "./NoteList";
import Avatar from "../ui/Avatar";
import AvatarStack from "../ui/AvatarStack";
import SharePicker from "./SharePicker";

interface TaskDetailsPopupProps {
  taskId: Id<"tasks"> | null;
  onClose: () => void;
}

/**
 * TaskDetailsPopup displays task details and provides editing/creation capabilities.
 * If taskId is null, it operates in "Create" mode.
 */
export default function TaskDetailsPopup({ taskId, onClose }: TaskDetailsPopupProps) {
  const task = useQuery(api.tasks.getTask, taskId ? { taskId } : "skip");
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const updateSharing = useMutation(api.tasks.updateSharing);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as Doc<"tasks">["status"],
    criticity: "medium" as Doc<"tasks">["criticity"],
    dueDate: new Date().toISOString().split("T")[0],
  });

  const [sharedUserIds, setSharedUserIds] = useState<Id<"users">[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        status: task.status,
        criticity: task.criticity,
        dueDate: new Date(task.dueDate).toISOString().split("T")[0],
      });
      setSharedUserIds(task.sharedProfiles?.map(p => p.userId) || []);
    }
  }, [task]);

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        title: formData.title,
        description: formData.description || undefined,
        status: formData.status,
        criticity: formData.criticity,
        dueDate: new Date(formData.dueDate).getTime(),
      };

      if (taskId) {
        await updateTask({ taskId, ...payload });
        if (task?.isOwner) {
          await updateSharing({ taskId, sharedUserIds });
        }
      } else {
        const newTaskId = await createTask(payload);
        if (sharedUserIds.length > 0) {
          await updateSharing({ taskId: newTaskId, sharedUserIds });
        }
      }
      onClose();
    } catch (err) {
      setError("Failed to save task. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!taskId || !confirm("Are you sure you want to delete this task?")) return;
    setSaving(true);
    try {
      await deleteTask({ taskId });
      onClose();
    } catch (err) {
      setError("Failed to delete task.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (taskId && task === undefined) return null; // Loading

  const isOwner = taskId ? task?.isOwner : true;
  const canEdit = taskId ? task?.canEdit : true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {taskId ? "Task Details" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer text-slate-500"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Title</label>
            <input
              required
              disabled={!canEdit || saving}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-slate-400 outline-none transition-all placeholder:text-slate-400"
              placeholder="What needs to be done?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Description</label>
            <textarea
              disabled={!canEdit || saving}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-slate-400 outline-none transition-all placeholder:text-slate-400 resize-none"
              placeholder="Optional details..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Status</label>
              <select
                disabled={!canEdit || saving}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-slate-400 outline-none appearance-none cursor-pointer"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Criticity</label>
              <select
                disabled={!canEdit || saving}
                value={formData.criticity}
                onChange={(e) => setFormData({ ...formData, criticity: e.target.value as any })}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-slate-400 outline-none appearance-none cursor-pointer"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Due Date</label>
              <input
                required
                type="date"
                disabled={!canEdit || saving}
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-slate-400 outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Sharing Section */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Sharing</h3>
              {task?.sharedProfiles && task.sharedProfiles.length > 0 && (
                <AvatarStack users={task.sharedProfiles} size="sm" />
              )}
            </div>
            
            {isOwner ? (
              <SharePicker
                selectedUserIds={sharedUserIds}
                onChange={setSharedUserIds}
                disabled={saving}
              />
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-sm text-slate-500 flex items-center gap-3 italic">
                <span>🔒 Only the owner can manage sharing</span>
              </div>
            )}
          </div>

          {taskId && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Metadata</h3>
                <span className="text-xs text-slate-400">Created {new Date(task!._creationTime).toLocaleString()}</span>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Notes: {task?.notesCount || 0}
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Shared: {task?.sharedCount || 0}
                </div>
              </div>
            </div>
          )}

          {taskId && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <NoteList taskId={taskId} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex flex-row-reverse gap-4">
          {canEdit && (
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-slate-100 dark:text-slate-900 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving..." : taskId ? "Update Task" : "Create Task"}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all font-semibold cursor-pointer"
          >
            Cancel
          </button>
          {isOwner && taskId && (
            <button
              onClick={handleDelete}
              disabled={saving}
              className="mr-auto px-6 py-3 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all font-semibold cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
