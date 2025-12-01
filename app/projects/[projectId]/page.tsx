import { Circle, Clock, CheckCircle2, Plus } from 'lucide-react';
import { TaskCard } from '@/components/TaskCard';

import CBreadComp from '@/components/customs/CBreadComp';
import CreateTask from './_components/Createtask';
import KanbanBoard from './_components/KanbanBoard';
import { getProjectById } from '@/actions/projects/getProjectById';
import { getAllTasksByProject } from '@/actions/tasks/getAllTasks';
import { getTasksWhereTheUserIsMemberByProjectId } from '@/actions/tasks/getTasksWhereTheUserIsMember';

const Dashboard = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const project = await getProjectById(projectId);
  // const tasks = await getAllTasksByProject(projectId);
  const tasks = await getTasksWhereTheUserIsMemberByProjectId(projectId);

  return (
    <div className="min-h-screen bg-background py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project?.name}</h1>
          <p className="text-muted-foreground mt-1">
            Manage your project tasks
          </p>
        </div>
        {project && <CreateTask projectId={projectId} project={project} />}
      </div>

      {/* Tasks */}
      <KanbanBoard tasks={tasks} />
    </div>
  );
};

export default Dashboard;
