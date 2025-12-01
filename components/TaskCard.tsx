'use client';

import { Calendar } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

import C_Badge from './customs/badge';
import { Badge } from './ui/badge';
import C_Status from './customs/status';

import { Progress } from '@/components/ui/progress';
import { calculateProgress } from '@/utils/basic/dateAndTime';

import { usePathname } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Priority, TaskStatus } from '@/lib/generated/prisma';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

import * as React from 'react';
import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import getTaskById, { T_TaskWithData } from '@/actions/tasks/getTaskById';

interface TaskCardProps {
  id: string;
  taskCreatorName: string;
  taskCreatorLabel: string;
  taskCreatorAvatar: string;
  taskName: string;
  priority: Priority;
  status: TaskStatus;
  isCompleted: boolean;
  dateCreated: Date;
  deadline: Date | null;
  onToggleComplete?: () => void;
}

export function TaskCard({
  id,
  taskName,
  priority,
  isCompleted,
  status,
  dateCreated,
  deadline,
  taskCreatorAvatar,
  taskCreatorLabel,
  taskCreatorName,
  onToggleComplete,
}: TaskCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const pathname = usePathname();
  const newPath = `${pathname}/${id}`;
  const [goal, setGoal] = React.useState(350);
  const [task, setTask] = React.useState<T_TaskWithData | null>(null);
  const [open, setOpen] = React.useState(false);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  React.useEffect(() => {
    async function getTaskData() {
      const task = await getTaskById(id);
      setTask(task.data);
    }

    if (open) getTaskData();
  }, [open]);

  return (
    <Drawer onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div
          // href={newPath}
          className="group flex flex-col gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
        >
          {/* Task Title */}
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {taskName}
          </h3>

          {/* Due Date */}
          {deadline && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(deadline)}</span>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <C_Badge variant={priority} />
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  Manager
                </span>
                <span className="text-xs text-foreground font-medium">
                  {taskCreatorName}
                </span>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src={taskCreatorAvatar} alt={taskCreatorName} />
                <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground text-xs font-semibold">
                  {taskCreatorName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>

          <></>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
