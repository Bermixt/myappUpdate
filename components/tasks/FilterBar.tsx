"use client";

import React from "react";
import { StatusFilter, CriticityFilter, DueDatePreset, TaskFiltersState } from "@/hooks/useTaskFilters";

interface FilterBarProps {
  filters: TaskFiltersState;
  onSetStatuses: (statuses: StatusFilter[]) => void;
  onSetCriticities: (criticities: CriticityFilter[]) => void;
  onSetDueDatePreset: (preset: DueDatePreset) => void;
  onClear: () => void;
}

const STATUSES: { id: StatusFilter; label: string }[] = [
  { id: "todo", label: "To Do" },
  { id: "in_progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

const CRITICITIES: { id: CriticityFilter; label: string }[] = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
];

const DUE_DATE_PRESETS: { id: DueDatePreset; label: string }[] = [
  { id: "all", label: "All Dates" },
  { id: "overdue", label: "Overdue" },
  { id: "today", label: "Today" },
  { id: "next_7_days", label: "Next 7 Days" },
];

export default function FilterBar({
  filters,
  onSetStatuses,
  onSetCriticities,
  onSetDueDatePreset,
  onClear,
}: FilterBarProps) {
  const toggleStatus = (id: StatusFilter) => {
    const next = filters.statuses.includes(id)
      ? filters.statuses.filter((s) => s !== id)
      : [...filters.statuses, id];
    onSetStatuses(next);
  };

  const toggleCriticity = (id: CriticityFilter) => {
    const next = filters.criticities.includes(id)
      ? filters.criticities.filter((c) => c !== id)
      : [...filters.criticities, id];
    onSetCriticities(next);
  };

  const isFiltered = filters.statuses.length > 0 || filters.criticities.length > 0 || filters.dueDatePreset !== "all";

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Status Filter */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider ml-1">Status</span>
        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-xl">
          {STATUSES.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleStatus(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filters.statuses.includes(s.id)
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-px h-10 bg-slate-100 dark:bg-slate-800 hidden sm:block" />

      {/* Criticity Filter */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider ml-1">Criticity</span>
        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-xl">
          {CRITICITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => toggleCriticity(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filters.criticities.includes(c.id)
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-px h-10 bg-slate-100 dark:bg-slate-800 hidden sm:block" />

      {/* Due Date Filter */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider ml-1">Due Date</span>
        <div className="relative group">
          <select
            value={filters.dueDatePreset}
            onChange={(e) => onSetDueDatePreset(e.target.value as DueDatePreset)}
            className="appearance-none bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 outline-none cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {DUE_DATE_PRESETS.map((p) => (
              <option key={p.id} value={p.id} className="dark:bg-slate-900">
                {p.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-[10px] text-slate-400">
            ▼
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {isFiltered && (
        <div className="ml-auto">
          <button
            onClick={onClear}
            className="text-xs font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20"
          >
            <span>✕</span> Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
