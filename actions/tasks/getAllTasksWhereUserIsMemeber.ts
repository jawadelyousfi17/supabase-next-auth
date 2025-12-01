'use server';

import prisma from '@/lib/prisma';
import { getUserId } from '../getUserId';
import { Prisma } from '@/lib/generated/prisma';

export type T_TaskWithAllData = Prisma.TaskGetPayload<{
  include: {
    creator: true;
    assignees: {
      include: {
        user: true;
      };
    };
    project: true;
  };
}>;

export const getAllTasksWhereUserIsMemeber = async ():Promise<T_TaskWithAllData[] | null> => {
  const userId = await getUserId();
  if (!userId) return null;

  // get all tasks where the user is memeber
  try {
    const tasks = await prisma.task.findMany({
      where: {
        assignees: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        creator: true,
        assignees: {
          include: {
            user: true,
          },
        },
        project: true,
      },
    });
    return tasks;
  } catch (error) {
    return null;
  }
};
