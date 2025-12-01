'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CalendarIcon,
  UserIcon,
  FlagIcon,
  CheckCircle2Icon,
  ClockIcon,
} from 'lucide-react';
import { Priority, TaskStatus } from '@/lib/generated/prisma';
import PriorityBadge from '@/components/customs/badge';
import StatusBadge from '@/components/customs/status';
import { T_TaskWithData } from '@/actions/tasks/getTaskById';


export default function TaskDetails({ task }: { task: T_TaskWithData }) {
  const formatDate = (date: Date | null) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              {/* <StatusBadge status={task.taskStatus} />
              <PriorityBadge priority={task.priority} /> */}
              {task.completed && (
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-600 border-green-500/20"
                >
                  <CheckCircle2Icon className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
            Description
          </h3>
          <p className="text-sm leading-relaxed">{task.description}</p>
        </div>

        <Separator />

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Created By */}
          <div className="col-span-2">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-1">
              <UserIcon className="w-3 h-3" />
              Created By
            </h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={task.creator.avatar}
                  alt={task.creator.name}
                />
                <AvatarFallback className="text-xs">
                  {getInitials(task.creator.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{task.creator.name}</p>
                <p className="text-xs text-muted-foreground">
                  {task.creator.email}
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              Created
            </h3>
            <p className="text-sm">{formatDate(task.createdAt)}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              Due Date
            </h3>
            <p className="text-sm">{formatDate(task.dueDate)}</p>
          </div>
        </div>

        <Separator />

        {/* Assignees */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-1">
            <UserIcon className="w-3 h-3" />
            Assigned ({task.assignees.length})
          </h3>
          {task.assignees.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {task.assignees.map((assignee) => (
                <div
                  key={assignee.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md border bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={assignee.user.avatar}
                      alt={assignee.user.name}
                    />
                    <AvatarFallback className="text-xs">
                      {getInitials(assignee.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {assignee.user.name}
                  </span>
                  <Badge variant="outline" className="text-xs h-5">
                    {assignee.role}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No team members assigned yet
            </p>
          )}
        </div>

        <Separator />

        {/* Project */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
            Project
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{task.project.name}</p>
            <span className="text-xs text-muted-foreground">
              /{task.project.slug}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
