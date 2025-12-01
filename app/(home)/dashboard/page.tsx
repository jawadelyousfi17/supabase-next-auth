import CBreadComp from '@/components/customs/CBreadComp';
import getTaskById from '@/actions/tasks/getTaskById';
import TaskDetails from './_components/TaskDetails';
import { notFound } from 'next/navigation';
import NotFound from '@/app/organizations/manage/[organizationId]/_components/NotFound';
import { getAllTasksWhereUserIsMemeber } from '@/actions/tasks/getAllTasksWhereUserIsMemeber';
import KanbanBoard from './_components/KanbanBoard';



type PageProps = {
  params: Promise<{
    projectId: string;
    taskId: string;
  }>;
};

const TaksDetailsC = async ({ params }: PageProps) => {
  const { taskId, projectId } = await params;

  const tasks = await getAllTasksWhereUserIsMemeber();

  if (!tasks) {
    return <NotFound></NotFound>;
  }



  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      {/* <CBreadComp items={breadcrumbItems} /> */}
     <KanbanBoard  tasks={tasks}/>
    </div>
  );
};

export default TaksDetailsC;
