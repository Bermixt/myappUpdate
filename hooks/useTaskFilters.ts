"use client";

import { useState, useMemo } from "react";
import { Doc } from "@/convex/_generated/dataModel";

export type StatusFilter = Doc<"tasks">["status"];
export type CriticityFilter = Doc<"tasks">["criticity"];
export type DueDatePreset = "all" | "overdue" | "today" | "next_7_days";

export interface TaskFiltersState {
  statuses: StatusFilter[];
  criticities: CriticityFilter[];
  dueDatePreset: DueDatePreset;
}

export function useTaskFilters() {
  const [filters, setFilters] = useState<TaskFiltersState>({
    statuses: [],
    criticities: [],
    dueDatePreset: "all",
  });

  const setStatuses = (statuses: StatusFilter[]) => {
    setFilters((prev) => ({ ...prev, statuses }));
  };

  const setCriticities = (criticities: CriticityFilter[]) => {
    setFilters((prev) => ({ ...prev, criticities }));
  };

  const setDueDatePreset = (dueDatePreset: DueDatePreset) => {
    setFilters((prev) => ({ ...prev, dueDatePreset }));
  };

  const clearFilters = () => {
    setFilters({
      statuses: [],
      criticities: [],
      dueDatePreset: "all",
    });
  };

  const filterTasks = useMemo(() => {
    return (tasks: any[]) => {
      if (!tasks) return [];

      return tasks.filter((task) => {
        // Status filter
        if (filters.statuses.length > 0 && !filters.statuses.includes(task.status)) {
          return false;
        }

        // Criticity filter
        if (filters.criticities.length > 0 && !filters.criticities.includes(task.criticity)) {
          return false;
        }

        // Due date filter
        if (filters.dueDatePreset !== "all") {
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);

          if (filters.dueDatePreset === "overdue") {
            // Overdue: dueDate < now (today at 00:00) and not done
            // The task already has isOverdue derived from Convex, but let's be safe.
            // Actually, the PRD says: isOverdue = dueDate < now AND status != done.
            if (!(task.dueDate < Date.now() && task.status !== "done")) {
              return false;
            }
          } else if (filters.dueDatePreset === "today") {
            if (taskDate.getTime() !== now.getTime()) {
              return false;
            }
          } else if (filters.dueDatePreset === "next_7_days") {
            const nextWeek = new Date(now);
            nextWeek.setDate(now.getDate() + 7);
            if (taskDate < now || taskDate > nextWeek) {
              return false;
            }
          }
        }

        return true;
      });
    };
  }, [filters]);

  return {
    filters,
    setStatuses,
    setCriticities,
    setDueDatePreset,
    clearFilters,
    filterTasks,
  };
}
