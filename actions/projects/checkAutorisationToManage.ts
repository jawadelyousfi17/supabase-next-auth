'use server';

import prisma from '@/lib/prisma';
import { getUserId } from '../getUserId';
import { checkAutorisation } from '../checkAutorityOrg';

export const isAutorisedToManageProject = async (projectId: string) => {
  const userId = await getUserId();

  try {
    const org = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        organizationId: true,
      },
    });

    const { error } = await checkAutorisation(
      userId as string,
      org?.organizationId as string
    );

    if (!error) return true;

    const member = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          userId: userId as string,
          projectId: projectId,
        },
      },
    });

    if (!member) return false;
    return member.role !== 'EMPLOYEE';
  } catch (error) {
    return false;
  }
};
