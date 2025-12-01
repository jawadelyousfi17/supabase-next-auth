'use server';

import { Prisma } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';

export type T_TaskWithData = Prisma.TaskGetPayload<{
  include: {
    creator: {
      select: {
        id: true;
        name: true;
        email: true;
        avatar: true;
      };
    };
    project: {
      select: {
        id: true;
        name: true;
        slug: true;
        organizationId: true;
      };
    };
    assignees: {
      include: {
        user: {
          select: {
            id: true;
            name: true;
            email: true;
            avatar: true;
          };
        };
      };
    };
  };
}>;

export type T_FetchTaskResponse = {
  success: boolean;
  message: string;
  data: T_TaskWithData | null;
};

export default async function getTaskById(
  taskId: string
): Promise<T_FetchTaskResponse> {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
            organizationId: true,
          },
        },
        assignees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!task) {
      return {
        success: false,
        message: 'Task not found',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Task fetched successfully',
      data: task,
    };
  } catch (error) {
    console.error('Error fetching task:', error);
    return {
      success: false,
      message: 'Failed to fetch task',
      data: null,
    };
  }
}
