"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useMemo } from "react";
import Badge from "../ui/Badge";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import FilterBar from "./FilterBar";
import TaskDetailsPopup from "./TaskDetailsPopup";

/**
 * TaskListView displays all tasks in a responsive list/table format.
 */
export default function TaskListView() {
  const tasks = useQuery(api.tasks.listMyTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<Id<"tasks"> | "new" | null>(null);
  
  const { filters, setStatuses, setCriticities, setDueDatePreset, clearFilters, filterTasks } = useTaskFilters();

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks || []);
  }, [tasks, filterTasks]);

  if (tasks === undefined) {
    return (
      <div className="space-y-4">
        <div className="h-16 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl mb-6" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  const statusLabels = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
  };

  const isFiltered = filters.statuses.length > 0 || filters.criticities.length > 0 || filters.dueDatePreset !== "all";

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

      <FilterBar
        filters={filters}
        onSetStatuses={setStatuses}
        onSetCriticities={setCriticities}
        onSetDueDatePreset={setDueDatePreset}
        onClear={clearFilters}
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {tasks.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">No tasks found</h3>
            <p className="text-slate-500 dark:text-slate-400">Get started by creating your first task.</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">No matches found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters to find what you're looking for.</p>
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm font-bold text-slate-800 dark:text-slate-200 underline underline-offset-4"
              >
                Reset all filters
              </button>
            )}
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
                {filteredTasks.map((task) => (
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
                      <Badge variant={task.status}>{statusLabels[task.status]}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={task.criticity}>{task.criticity}</Badge>
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
