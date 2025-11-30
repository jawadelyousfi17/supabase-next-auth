'use server';

import { Prisma } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';

export type T_ProjectWithMemebersAndCreators = Prisma.ProjectGetPayload<{
  include: {
    creator: true;
    projectMemebers: {
      include: {
        user: true;
      };
    };
  };
}>;

export type T_MemberWithUser = Prisma.ProjectMemberGetPayload<{
  include: {
    user: true;
  };
}>;

export const getProjectById = async (
  projectId: string
): Promise<T_ProjectWithMemebersAndCreators | null> => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        creator: true,
        projectMemebers: {
          include: {
            user: true,
          },
        },
      },
    });

    return project;
  } catch (error) {
    return null;
  }
};
