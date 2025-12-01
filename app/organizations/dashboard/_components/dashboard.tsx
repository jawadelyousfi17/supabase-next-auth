'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Building2,
  MoreVertical,
  Settings,
  Users,
  Plus,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/Projectcard';
import { Organization, Project } from '@/lib/generated/prisma';
import NotFound from '../../manage/[organizationId]/_components/NotFound';
import CreateProject from './CreateProject';
import {
  ProjectWithCreator,
  T_Project,
} from '@/actions/projects/getProjectsByOrganizationId';
import NoProjectFound from './NoProjectFound';
import { projectStatusConfig } from '@/utils/basic/project';

type T_Props = {
  organization: Organization | null;
  projects: T_Project[] | null;
  isAdmin: boolean;
};

const DashboardOrg = ({ organization, projects, isAdmin }: T_Props) => {
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  if (!organization) return <NotFound />;

  const hasProjects = projects && projects.length > 0;

 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 rounded-xl border-2 shadow-sm">
              <AvatarImage
                src={organization.logo_url}
                alt={organization.name}
              />
              <AvatarFallback className="rounded-xl">
                <Building2 className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {organization.name}
              </h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Users className="h-4 w-4" />
                {organization.members_count} members
              </p>
            </div>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href={`/organizations/manage/${organization.id}`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Team
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Organization Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analytics
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Leave Organization
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {hasProjects && (
                <CreateProject organizationId={organization.id} />
              )}
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          {!hasProjects ? (
            <NoProjectFound
              isManager={isAdmin}
              onCreateClick={() => setIsCreateOpen(true)}
            />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Projects
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {projects.length} active projects
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    projectId={project.id}
                    projectName={project.name}
                    projectManager={{
                      name: project.creator.name,
                      avatar: project.creator.avatar,
                    }}
                    taskCount={project.taskCount}
                    memberCount={project.membersCount}
                    status={project.projectStatus}
                    createdAt={project.createdAt}
                    isManager={project.isManager}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <CreateProject
        organizationId={organization.id}
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
};

export default DashboardOrg;
