import { ProjectCard } from '@/components/Projectcard';
import MainProjectsDashboard from './_components/dashboard';
import { getProjectsByUser } from '@/actions/projects/getProjectsWhereUserIsMemeber';

const Page = async () => {
  const projects = await getProjectsByUser();

  return <MainProjectsDashboard projects={projects} />;
};

export default Page;
