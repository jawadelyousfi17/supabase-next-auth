'use server';

import prisma from '@/lib/prisma';
import { getUserId } from '../getUserId';
import { Prisma } from '@/lib/generated/prisma';

export type T_ProjectsWithMember = Prisma.ProjectGetPayload<{
  include: {
    creator: true;
    organization: true;
    projectMemebers: true;
  };
}>;

export const getProjectsByUser = async (): Promise<
  T_ProjectsWithMember[] | null
> => {
  const userId = await getUserId();
  if (!userId) return null;

  // TODO find all the projects where the user is A:memeber OR  The project that this user manage :::
  // first find the project where the user is member

  try {
    const projects = await prisma.project.findMany({
      where: {
        projectMemebers: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        creator: true,
        organization: true,
        projectMemebers: {
          where: {
            userId: userId,
          },
        },
      },
    });

    return projects;
  } catch (error) {
    return null;
  }
};
