"use client";

import React from "react";

type BadgeVariant = "todo" | "in_progress" | "done" | "low" | "medium" | "high" | "error";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  todo: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  in_progress: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  done: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  medium: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  high: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  error: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
};

/**
 * Reusable Badge component for statuses and criticality levels.
 */
export default function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
