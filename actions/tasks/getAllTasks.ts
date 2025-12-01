'use server';

import prisma from '@/lib/prisma';
import { getUserId } from '../getUserId';
import { checkProjectRole } from '../projects/checkAutorisationToManage';
import { Prisma, Task } from '@/lib/generated/prisma';

export type T_TaksWithCreator = Prisma.TaskGetPayload<{
  include: {
    creator: true;
  };
}>;

export const getAllTasksByProject = async (
  projectId: string
): Promise<T_TaksWithCreator[] | null> => {
  const userId = await getUserId();
  if (!userId) return null;

  // check if the current user is the project manager
  const isManager = await checkProjectRole(projectId, userId, 'MANAGER');
  if (!isManager) return null;

  // get all tasks
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        creator: true,
      },
    });
    return tasks;
  } catch (error) {
    return null;
  }
};
