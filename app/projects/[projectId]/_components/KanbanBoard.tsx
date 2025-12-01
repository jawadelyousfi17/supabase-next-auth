'use client';

import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '@/lib/generated/prisma';

import { Circle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Plus } from 'lucide-react';
import NotFound from '../../manage/[projectId]/_components/NotFound';
import { T_TaksWithCreator } from '@/actions/tasks/getAllTasks';
import { sortTasks } from '@/utils/basic/tasks';
import { DrawerDemo } from './TaskDrawer';
import { useState, useTransition } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { updateTaskStatus } from '@/actions/tasks/updateTaskStatus';
import { toast } from 'react-hot-toast';

const KanbanBoard = ({ tasks }: { tasks: T_TaksWithCreator[] | null }) => {
  const [allTasks, setAllTasks] = useState<T_TaksWithCreator[]>(tasks || []);
  const [activeTask, setActiveTask] = useState<T_TaksWithCreator | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (!tasks) return <NotFound />;

  let notStartedTasks: T_TaksWithCreator[] | null = allTasks.filter(
    (task) => task.taskStatus === 'NOT_STARTED'
  );
  notStartedTasks = sortTasks(notStartedTasks, 'date', 'down');

  let inProgressTasks: T_TaksWithCreator[] | null = allTasks.filter(
    (task) => task.taskStatus === 'IN_PROGRESS'
  );

  inProgressTasks = sortTasks(inProgressTasks, 'date', 'down');

  let completedTasks: T_TaksWithCreator[] | null = allTasks.filter(
    (task) => task.taskStatus === 'COMPLETED'
  );
  completedTasks = sortTasks(completedTasks, 'date', 'down');

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = allTasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    const task = allTasks.find((t) => t.id === taskId);
    if (!task || task.taskStatus === newStatus) return;

    // Optimistic update
    setAllTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, taskStatus: newStatus } : t))
    );

    // Server update
    startTransition(async () => {
      const result = await updateTaskStatus(taskId, newStatus);
      if (!result.success) {
        toast.error('Failed to update task status');
        // Revert on error
        setAllTasks((prev) =>
          prev.map((t) =>
            t.id === taskId ? { ...t, taskStatus: task.taskStatus } : t
          )
        );
      } else {
        toast.success('Task status updated');
      }
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>
        {/* Kanban Board */}
        <div className="grid grid-cols-3 gap-6">
          {/* Not Started Column */}
          <DroppableColumn id="NOT_STARTED">
            <div className="flex flex-col gap-4 h-[calc(100vh-160px)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-muted">
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="font-semibold text-foreground">
                    Not Started
                  </span>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-muted text-muted-foreground rounded-full">
                    {notStartedTasks?.length}
                  </span>
                </div>
                <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-3 pb-4">
                {notStartedTasks?.map((task) => {
                  return (
                    <DraggableTask key={task.id} task={task}>
                      <DrawerDemo
                        trigger={
                          <TaskCard
                            id={task.id}
                            taskName={task.title}
                            priority={task.priority}
                            isCompleted={task.completed}
                            dateCreated={task.createdAt}
                            deadline={
                              task.dueDate ? task.dueDate : task.createdAt
                            }
                            taskCreatorName={task.creator.name}
                            taskCreatorAvatar={task.creator.avatar}
                            taskCreatorLabel="Project manager"
                            status={task.taskStatus}
                          />
                        }
                      >
                        <div>HELLO</div>
                      </DrawerDemo>
                    </DraggableTask>
                  );
                })}
              </div>
            </div>
          </DroppableColumn>

          {/* In Progress Column */}
          <DroppableColumn id="IN_PROGRESS">
            <div className="flex flex-col gap-4 h-[calc(100vh-160px)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">
                    In Progress
                  </span>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                    {inProgressTasks?.length}
                  </span>
                </div>
                <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-3 pb-4">
                {inProgressTasks?.map((task) => {
                  return (
                    <DraggableTask key={task.id} task={task}>
                      <TaskCard
                        id={task.id}
                        taskName={task.title}
                        priority={task.priority}
                        isCompleted={task.completed}
                        dateCreated={task.createdAt}
                        deadline={task.dueDate ? task.dueDate : task.createdAt}
                        taskCreatorName={task.creator.name}
                        taskCreatorAvatar={task.creator.avatar}
                        taskCreatorLabel="Project manager"
                        status={task.taskStatus}
                      />
                    </DraggableTask>
                  );
                })}
              </div>
            </div>
          </DroppableColumn>

          {/* Finished Column */}
          <DroppableColumn id="COMPLETED">
            <div className="flex flex-col gap-4 h-[calc(100vh-160px)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-950">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-semibold text-foreground">
                    Completed
                  </span>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-full">
                    {completedTasks?.length}
                  </span>
                </div>
                <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-3 pb-4">
                {completedTasks?.map((task) => {
                  return (
                    <DraggableTask key={task.id} task={task}>
                      <TaskCard
                        id={task.id}
                        taskName={task.title}
                        priority={task.priority}
                        isCompleted={task.completed}
                        dateCreated={task.createdAt}
                        deadline={task.dueDate ? task.dueDate : task.createdAt}
                        taskCreatorName={task.creator.name}
                        taskCreatorAvatar={task.creator.avatar}
                        taskCreatorLabel="Project manager"
                        status={task.taskStatus}
                      />
                    </DraggableTask>
                  );
                })}
              </div>
            </div>
          </DroppableColumn>
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="opacity-80">
            <TaskCard
              id={activeTask.id}
              taskName={activeTask.title}
              priority={activeTask.priority}
              isCompleted={activeTask.completed}
              dateCreated={activeTask.createdAt}
              deadline={
                activeTask.dueDate ? activeTask.dueDate : activeTask.createdAt
              }
              taskCreatorName={activeTask.creator.name}
              taskCreatorAvatar={activeTask.creator.avatar}
              taskCreatorLabel="Project manager"
              status={activeTask.taskStatus}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

// Droppable Column Component
function DroppableColumn({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`transition-colors ${isOver ? 'bg-accent/50 rounded-lg' : ''}`}
    >
      {children}
    </div>
  );
}

// Draggable Task Component
function DraggableTask({
  task,
  children,
}: {
  task: T_TaksWithCreator;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? 'opacity-50' : ''}
    >
      {children}
    </div>
  );
}

export default KanbanBoard;
