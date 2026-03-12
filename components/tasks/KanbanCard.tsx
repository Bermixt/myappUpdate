"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Badge from "../ui/Badge";

interface KanbanCardProps {
  task: any; // Using any for simplicity as it's the enriched task from listMyTasks
  onClick: () => void;
}

/**
 * KanbanCard is a draggable task card for the Kanban board.
 */
export default function KanbanCard({ task, onClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    disabled: !task.isOwner, // Only owner can drag
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: task.isOwner ? "grab" : "default",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        // Prevent click if we were dragging
        if (transform && (Math.abs(transform.x) > 5 || Math.abs(transform.y) > 5)) {
          return;
        }
        onClick();
      }}
      className={`bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group relative ${
        isDragging ? "z-50 shadow-xl ring-2 ring-slate-400/50" : ""
      }`}
    >
      <div className="space-y-3">
        {/* Header: Title and Overdue Indicator */}
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {task.title}
          </h4>
          {task.isOverdue && (
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5 animate-pulse" title="Overdue" />
          )}
        </div>

        {/* Description Snippet */}
        {task.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant={task.criticity}>{task.criticity}</Badge>
          <div className={`text-[10px] font-bold uppercase tracking-wider ${task.isOverdue ? "text-rose-600 dark:text-rose-400" : "text-slate-400 dark:text-slate-500"}`}>
            {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Footer: Aggregates */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-slate-700/50">
          <div className="flex items-center gap-3 text-slate-400">
            <div className="flex items-center gap-1" title="Notes">
              <span className="text-xs">📝</span>
              <span className="text-[10px] font-bold">{task.notesCount}</span>
            </div>
            <div className="flex items-center gap-1" title="Shared with">
              <span className="text-xs">👥</span>
              <span className="text-[10px] font-bold">{task.sharedCount}</span>
            </div>
          </div>
          
          {!task.isOwner && (
            <span className="text-[10px] text-slate-400 italic">Shared</span>
          )}
        </div>
      </div>
    </div>
  );
}
