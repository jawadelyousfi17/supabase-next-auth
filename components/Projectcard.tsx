'use client';

import {
  Folder,
  Users,
  Calendar,
  MoreVertical,
  CheckCircle2,
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface ProjectCardProps {
  projectName: string;
  projectId: string;
  projectManager: {
    name: string;
    avatar?: string;
  };
  taskCount?: number;
  memberCount?: number;
  status?: 'active' | 'completed' | 'on-hold';
  createdAt?: Date;
  onClick?: () => void;
}

export function ProjectCard({
  projectName,
  projectId,
  projectManager,
  taskCount = 0,
  memberCount = 0,
  status = 'active',
  createdAt,
  onClick,
}: ProjectCardProps) {
  const statusConfig = {
    active: {
      variant: 'default' as const,
      label: 'Active',
    },
    completed: {
      variant: 'secondary' as const,
      label: 'Completed',
    },
    'on-hold': {
      variant: 'outline' as const,
      label: 'On Hold',
    },
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

  const currentConfig = statusConfig[status];

  return (
    <Link href={`/projects/${projectId}`} onClick={onClick}>
      <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 rounded-lg bg-primary/10">
                <Folder className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate mb-1">
                  {projectName}
                </h3>
                <p className="text-xs text-muted-foreground">ID: {projectId}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className=" hover:bg-accent rounded-lg transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <Badge variant={currentConfig.variant}>
            {status === 'active' && (
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
            )}
            {status === 'completed' && (
              <CheckCircle2 className="w-3 h-3 mr-1" />
            )}
            {currentConfig.label}
          </Badge>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">Created</span>
              </div>
              <p className="text-sm font-medium">
                {createdAt ? formatDate(createdAt) : 'N/A'}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-3 h-3" />
                <span className="text-xs">Members</span>
              </div>
              <p className="text-sm font-medium">{memberCount}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-xs">Tasks</span>
              </div>
              <p className="text-sm font-medium">{taskCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t">
            <Avatar className="h-8 w-8">
              {projectManager.avatar ? (
                <img
                  src={projectManager.avatar}
                  alt={projectManager.name}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getInitials(projectManager.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Manager</p>
              <p className="text-sm font-medium truncate">
                {projectManager.name}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
