'use server';

import { ProjectStatus } from '@/lib/generated/prisma';
import { getUserId } from '../getUserId';
import { T_ActionResponse } from '@/types/server';
import { checkProjectRole } from './checkAutorisationToManage';
import prisma from '@/lib/prisma';

export const updateProjectStatus = async (
  projectId: string,
  newStatus: ProjectStatus
): Promise<T_ActionResponse> => {
  const userId = await getUserId();
  if (!userId) return { error: 'Error' };

  // check if the user is a manager
  const isManager = await checkProjectRole(projectId, userId, 'MANAGER');
  if (!isManager) return { error: 'Unautorized' };

  // change the project status
  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        projectStatus: newStatus,
      },
    });
    return { message: 'Project status changed' };
  } catch (error) {
    return { error: 'an error was accured' };
  }
};
