'use client';

import React from 'react';
import { T_ProjectsWithMember } from '@/actions/projects/getProjectsWhereUserIsMemeber';
import { ProjectCard } from '@/components/Projectcard';
import { projectStatusConfig } from '@/utils/basic/project';

type T_Props = {
  projects: T_ProjectsWithMember[] | null;
};

const MainProjectsDashboard = ({ projects }: T_Props) => {
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  const hasProjects = projects && projects.length > 0;

  const getStatus = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'completed';
      case 'ON_HOLD':
        return 'on-hold';
      default:
        return 'active';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Projects
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {projects?.length} active projects
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map((project) => (
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
                  isManager={false}
                />
              ))}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default MainProjectsDashboard;
