'use server';

import { Prisma } from '@/lib/generated/prisma';
import { getUserId } from '../getUserId';
import prisma from '@/lib/prisma';

export type T_TaksWithCreator = Prisma.TaskGetPayload<{
  include: {
    creator: true;
  };
}>;

export const getTasksWhereTheUserIsMemberByProjectId = async (
  projectId: string
): Promise<T_TaksWithCreator[] | null> => {
  const userId = await getUserId();
  if (!userId) return null;

  // get all the tasks where the user is memeber
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
        assignees: {
          some: {
            userId: userId,
          },
        },
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
