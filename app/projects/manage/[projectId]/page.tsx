'use server';

import { getMembersData, T_Member } from '@/actions/getMembersData';
import { checkAutorisation } from '@/actions/checkAutorityOrg';
import AccessDenied from '@/components/acessDenied';
import ProjectMemebersTable from './_components/MemebersTable';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';
import {
  getOrganizationInfo,
  isOrganizationExist,
} from '@/actions/organization/getOrgById';
import NotFound from './_components/NotFound';
import { getOrganization } from '@/actions/getOrganizations';
import { Organization } from '@/lib/generated/prisma';
import { getUserId } from '@/actions/getUserId';
import { isAutorisedToManageProject } from '@/actions/projects/checkAutorisationToManage';
import { getProjectById } from '@/actions/projects/getProjectById';

interface I_Props {
  params: {
    projectId: string;
  };
}

// TODO  Show the users in the project
// TODO check if I am autorized to be here or not based on the Role of the user

const Page = async (props: I_Props) => {
  const { projectId } = await props.params;

  const userid = await getUserId();

  if (!(await isAutorisedToManageProject(projectId))) return <NotFound />;

  const project = await getProjectById(projectId);


  if (!project?.projectMemebers) return <NotFound />;

  return (
    <ProjectMemebersTable members={project.projectMemebers} project={project} />
  );
};

export default Page;
