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

interface TaskCardProps {
  taskCreatorName: string;
  taskCreatorLabel: string;
  taskCreatorAvatar: string;
  taskName: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not_started' | 'in_progress' | 'finished';
  isCompleted: boolean;
  dateCreated: Date;
  deadline: Date;
  category: string;
  onToggleComplete?: () => void;
}

export function TaskCard({
  taskName,
  priority,
  isCompleted,
  status,
  dateCreated,
  deadline,
  taskCreatorAvatar,
  taskCreatorLabel,
  taskCreatorName,
  category,
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
  const newPath = `${pathname}/${'tasky8yy'}`;

  const isOverdue = !isCompleted && new Date() > deadline;
  const progress = calculateProgress(dateCreated, deadline);

  return (
    <Link
      href={newPath}
      className="flex flex-col gap-3 p-4 bg-card max-w-sm border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    >
      {/* TOP OF CARD */}
      <div className="flex flex-row justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
            {taskCreatorName.slice(0, 2)}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-sm leading-tight text-foreground">
              {taskCreatorName}
            </p>
            <p className="text-xs leading-tight text-muted-foreground">
              {taskCreatorLabel}
            </p>
          </div>
        </div>
        <div>
          <C_Status variant={status}></C_Status>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {taskName}
        </h3>

        <div className="flex flex-col gap-2.5 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <Calendar size={15} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Start</span>
              <span className="font-medium text-foreground">
                {formatDate(dateCreated)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Calendar size={15} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Due</span>
              <span className="font-medium text-foreground">
                {formatDate(deadline)}
              </span>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-foreground">
                {category}
              </span>
            </div>
            <C_Badge variant={priority} />
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          <Badge variant="outline">react</Badge>
          <Badge variant="outline">DEV</Badge>
          <Badge variant="outline">DevOps</Badge>
        </div>
      </div>

      {/* <Progress
        value={progress}
        className="absolute top-0 left-0 rounded-none h-1"
      /> */}
    </Link>
  );
}
