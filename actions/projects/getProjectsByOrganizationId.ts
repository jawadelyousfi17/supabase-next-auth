'use server';

import { Prisma } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { getUserId } from '../getUserId';
import { redirect } from 'next/navigation';
import { checkAutorisation } from '../checkAutorityOrg';

export type ProjectWithCreator = Prisma.ProjectGetPayload<{
  include: {
    creator: true;
    projectMemebers: true;
  };
}>;

export interface T_Project extends ProjectWithCreator {
  isManager: boolean;
}

export const getProjectsByOrganizationId = async (
  organizationId: string
): Promise<T_Project[] | null> => {
  const userId = await getUserId();

  if (!userId) redirect('/login');

  try {
    const { error } = await checkAutorisation(userId, organizationId);

    let projects: ProjectWithCreator[] | null;

    if (error) {
      // not owner
      projects = await prisma.project.findMany({
        where: {
          organizationId: organizationId,
          projectMemebers: {
            some: {
              userId: userId,
            },
          },
        },
        include: {
          creator: true,
          projectMemebers: {
            where: {
              userId: userId,
            },
          },
        },
      });
    } else {
      // owner
      projects = await prisma.project.findMany({
        where: {
          organizationId: organizationId,
        },
        include: {
          creator: true,
          projectMemebers: {
            where: {
              userId: userId,
            },
          },
        },
      });
    }

    if (!projects) return null;
    const projectsWithPermission: T_Project[] = projects.map((project) => {
      const member = project.projectMemebers[0];
      const isProjectManager = member?.role === 'MANAGER';
      return { ...project, isManager: !error || isProjectManager };
    });

    return projectsWithPermission;
  } catch (error) {
    return null;
  }
};
