"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import TaskDetailsPopup from "./TaskDetailsPopup";

/**
 * KanbanView displays all tasks in a 3-column board.
 * Supports drag and drop to change task status (owner only).
 */
export default function KanbanView() {
  const tasksData = useQuery(api.tasks.listMyTasks);
  const updateTaskStatus = useMutation(api.tasks.updateTaskStatus);
  const [selectedTaskId, setSelectedTaskId] = useState<Id<"tasks"> | "new" | null>(null);
  const [activeId, setActiveId] = useState<Id<"tasks"> | null>(null);
  
  // Sensors for better UX
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Avoid accidental drags when clicking
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group tasks by status
  const columnsData = useMemo(() => {
    const columns: Record<string, any[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };

    if (tasksData) {
      tasksData.forEach((task) => {
        if (columns[task.status]) {
          columns[task.status].push(task);
        }
      });
    }
    return columns;
  }, [tasksData]);

  // Loading state
  if (tasksData === undefined) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[600px] bg-slate-100 dark:bg-slate-800 rounded-3xl" />
        ))}
      </div>
    );
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as Id<"tasks">);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // For now, we don't need complex local state updates for DragOver
    // because we trigger the update on DragEnd.
    // If we want a more fluid UX between columns, we would update local state here.
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasksData.find((t) => t._id === active.id);
    if (!activeTask || !activeTask.isOwner) return; // Only owner can move

    const overId = over.id as string;
    
    // Check if it's a column ID (todo, in_progress, done)
    const validStatuses = ["todo", "in_progress", "done"];
    if (validStatuses.includes(overId) && activeTask.status !== overId) {
      try {
        await updateTaskStatus({
          taskId: activeTask._id,
          status: overId as Doc<"tasks">["status"],
        });
      } catch (err) {
        console.error("Failed to update status", err);
      }
      return;
    }

    // Check if it's another task ID
    const overTask = tasksData.find((t) => t._id === overId);
    if (overTask && activeTask.status !== overTask.status) {
      try {
        await updateTaskStatus({
          taskId: activeTask._id,
          status: overTask.status,
        });
      } catch (err) {
        console.error("Failed to update status", err);
      }
    }
  };

  const activeTask = activeId ? tasksData.find((t) => t._id === activeId) : null;

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Task Board</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage workflow by dragging tasks between columns.</p>
        </div>
        <button
          onClick={() => setSelectedTaskId("new")}
          className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-slate-100 dark:text-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>➕</span> New Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0 overflow-x-auto pb-4">
          <KanbanColumn
            id="todo"
            title="To Do"
            tasks={columnsData.todo}
            onCardClick={setSelectedTaskId}
          />
          <KanbanColumn
            id="in_progress"
            title="In Progress"
            tasks={columnsData.in_progress}
            onCardClick={setSelectedTaskId}
          />
          <KanbanColumn
            id="done"
            title="Done"
            tasks={columnsData.done}
            onCardClick={setSelectedTaskId}
          />
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="w-[300px] cursor-grabbing rotate-2 scale-105 shadow-2xl ring-2 ring-slate-400/50 rounded-xl">
              <KanbanCard task={activeTask} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {selectedTaskId && (
        <TaskDetailsPopup
          taskId={selectedTaskId === "new" ? null : selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
