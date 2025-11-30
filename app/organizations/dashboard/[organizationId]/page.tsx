import { getOrganizationInfo } from '@/actions/organization/getOrgById';
import DashboardOrg from '../_components/dashboard';
import { getUserId } from '@/actions/getUserId';
import prisma from '@/lib/prisma';
import NotFound from '../../manage/[organizationId]/_components/NotFound';
import { getProjectsByOrganizationId } from '@/actions/projects/getProjectsByOrganizationId';

interface I_Props {
  params: Promise<{
    organizationId: string;
  }>;
}

const page = async (props: I_Props) => {
  const { organizationId } = await props.params;

  const organization = await getOrganizationInfo(organizationId);

  if (!organization) return <NotFound />;

  const userId = await getUserId();
  if (!userId) return <NotFound />;

  // check if the user is an admin or not
  const member = await prisma.organizationMember.findFirst({
    where: {
      userId: userId,
      organizationId: organization?.id,
    },
    select: {
      role: true,
    },
  });

  if (!member) return <NotFound />;

  // get organization Projects
  const projects = await getProjectsByOrganizationId(organization.id);

  return (
    <div>
      <DashboardOrg
        organization={organization}
        projects={projects}
        isAdmin={member?.role === 'OWNER' || member?.role === 'MANAGER'}
      />
    </div>
  );
};

export default page;
