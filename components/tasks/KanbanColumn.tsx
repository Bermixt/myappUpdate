"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanCard from "./KanbanCard";
import { Id } from "@/convex/_generated/dataModel";

interface KanbanColumnProps {
  id: string; // The status (todo, in_progress, done)
  title: string;
  tasks: any[];
  onCardClick: (id: Id<"tasks">) => void;
}

/**
 * KanbanColumn is a droppable container for Kanban cards of a specific status.
 */
export default function KanbanColumn({ id, title, tasks, onCardClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const columnStyles: Record<string, string> = {
    todo: "border-slate-200 dark:border-slate-800",
    in_progress: "border-blue-200 dark:border-blue-900/30 bg-blue-50/10 dark:bg-blue-900/5",
    done: "border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/10 dark:bg-emerald-900/5",
  };

  const headerColors: Record<string, string> = {
    todo: "text-slate-500",
    in_progress: "text-blue-600 dark:text-blue-400",
    done: "text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div className={`flex flex-col w-full min-w-[300px] h-full rounded-2xl border-2 p-2 transition-all ${columnStyles[id] || columnStyles.todo} ${isOver ? "ring-2 ring-slate-400/50 scale-[1.01]" : ""}`}>
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 mb-2">
        <h3 className={`font-bold uppercase tracking-widest text-xs ${headerColors[id] || headerColors.todo}`}>
          {title}
        </h3>
        <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Task List (Droppable area) */}
      <div 
        ref={setNodeRef}
        className="flex-1 space-y-3 overflow-y-auto min-h-[200px] px-1 pb-4 scrollbar-hide"
      >
        <SortableContext 
          id={id}
          items={tasks.map(t => t._id)} 
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 italic">
              <span className="text-sm">No tasks here</span>
            </div>
          ) : (
            tasks.map((task) => (
              <KanbanCard 
                key={task._id} 
                task={task} 
                onClick={() => onCardClick(task._id)}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
