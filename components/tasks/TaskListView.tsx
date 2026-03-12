"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import TaskDetailsPopup from "./TaskDetailsPopup";
import { Doc, Id } from "@/convex/_generated/dataModel";

/**
 * TaskListView displays all tasks in a responsive list/table format.
 */
export default function TaskListView() {
  const tasks = useQuery(api.tasks.listMyTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<Id<"tasks"> | "new" | null>(null);

  if (tasks === undefined) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">My Tasks</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and track your project tasks.</p>
        </div>
        <button
          onClick={() => setSelectedTaskId("new")}
          className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-slate-100 dark:text-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>➕</span> New Task
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {tasks.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">No tasks found</h3>
            <p className="text-slate-500 dark:text-slate-400">Get started by creating your first task.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Task</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Criticity</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4 text-center">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    onClick={() => setSelectedTaskId(task._id)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          {task.title}
                        </span>
                        {task.description && (
                          <span className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                            {task.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4">
                      <CriticityBadge criticity={task.criticity} />
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-medium ${task.isOverdue ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-slate-300"}`}>
                        {new Date(task.dueDate).toLocaleDateString()}
                        {task.isOverdue && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-rose-600 animate-pulse" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4 text-slate-400">
                        <div className="flex items-center gap-1.5" title="Notes">
                          <span>📝</span>
                          <span className="text-xs font-bold">{task.notesCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Shared with">
                          <span>👥</span>
                          <span className="text-xs font-bold">{task.sharedCount}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedTaskId && (
        <TaskDetailsPopup
          taskId={selectedTaskId === "new" ? null : selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Doc<"tasks">["status"] }) {
  const styles = {
    todo: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    in_progress: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    done: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  };
  const labels = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function CriticityBadge({ criticity }: { criticity: Doc<"tasks">["criticity"] }) {
  const styles = {
    low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    medium: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    high: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${styles[criticity]}`}>
      {criticity}
    </span>
  );
}
