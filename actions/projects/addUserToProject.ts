'use server';

import { ProjectRole } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { T_ActionResponse } from '@/types/server';
import { revalidatePath } from 'next/cache';
import { isAutorisedToManageProject } from './checkAutorisationToManage';

export const addUserToProject = async (
  projectId: string,
  userId: string,
  organizationId: string,
  role: ProjectRole = 'EMPLOYEE'
): Promise<T_ActionResponse> => {
  const isAutorized = await isAutorisedToManageProject(projectId);
  if (!isAutorized) return { error: 'Not autorized to manage this project' };

  console.log('org id , user id ', organizationId, '  ', userId);

  try {
    const organizationMember = await prisma.organizationMember.findFirst({
      where: {
        organizationId: organizationId,
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!organizationMember)
      return {
        error:
          'This user dose not exist in the organization, try to invite him first',
      };

    await prisma.$transaction(async (tx) => {
      const projectMemeber = await tx.projectMember.create({
        data: {
          userId: userId,
          projectId: projectId,
          role: role,
        },
      });
      await tx.project.update({
        where: {
          id: projectId,
        },
        data: {
          membersCount: {
            increment: 1,
          },
        },
      });
    });

    revalidatePath('/');
    return { message: 'user added to the project' };
  } catch (error) {
    return { error: 'user did not added to the project try again later' };
  }
};
