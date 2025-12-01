import CBreadComp from '@/components/customs/CBreadComp';
import getTaskById from '@/actions/tasks/getTaskById';
import TaskDetails from './_components/TaskDetails';
import { notFound } from 'next/navigation';
import NotFound from '../../manage/[projectId]/_components/NotFound';

type PageProps = {
  params: Promise<{
    projectId: string;
    taskId: string;
  }>;
};

const TaksDetailsC = async ({ params }: PageProps) => {
  const { taskId, projectId } = await params;

  const { success, message, data } = await getTaskById(taskId);

  if (!success || !data) {
    return <NotFound></NotFound>;
  }

  // const breadcrumbItems = [
  //   { label: 'Projects', href: '/projects' },
  //   { label: response.data.project.name, href: `/projects/${projectId}` },
  //   { label: response.data.title, href: `/projects/${projectId}/${taskId}` },
  // ];


  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      {/* <CBreadComp items={breadcrumbItems} /> */}
      <div className="mt-6">
        <TaskDetails task={data} />
      </div>
    </div>
  );
};

export default TaksDetailsC;
