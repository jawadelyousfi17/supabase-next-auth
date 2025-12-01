'use server';

import prisma from '@/lib/prisma';
import { getUserId } from '../getUserId';
import { checkAutorisation } from '../checkAutorityOrg';
import { ProjectRole } from '@/lib/generated/prisma';

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

export const checkProjectRole = async (
  projectId: string,
  userId: string,
  role: ProjectRole
): Promise<boolean> => {
  try {
    const memeber = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: userId,
        },
      },
      select: {
        role: true,
      },
    });
    return memeber?.role === role;
  } catch (error) {
    return false;
  }
};
