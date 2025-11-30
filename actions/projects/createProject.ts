'use server';

import { ProjectStatus } from '@/lib/generated/prisma';
import { getUserId } from '../getUserId';
import { T_ActionResponse } from '@/types/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type T_ProjectData = {
  name: string;
  description: string;
  color: string;
  status: ProjectStatus;
  slug: string;
  startDate: string;
  dueDate: string;
};

export const createProject = async (
  projectData: T_ProjectData,
  organizationId: string
): Promise<T_ActionResponse> => {
  const userId = await getUserId();

  if (!userId) return redirect('/login');

  const member = await prisma.organizationMember.findFirst({
    where: {
      userId: userId,
      organizationId: organizationId,
    },
    select: {
      role: true,
    },
  });

  if (!member || member.role === 'EMPLOYEE')
    return { error: 'Unautorized to create a project' };

  try {
    await prisma.$transaction(async (tx) => {
      const project = await prisma.project.create({
        data: {
          name: projectData.name,
          description: projectData.description,
          slug: projectData.slug,
          color: projectData.color,
          startDate: projectData.startDate
            ? new Date(projectData.startDate)
            : null,
          dueDate: projectData.dueDate ? new Date(projectData.dueDate) : null,
          creatorId: userId,
          organizationId: organizationId,
          projectStatus: projectData.status,
        },
      });

      const meme = await prisma.projectMember.create({
        data: {
          userId: userId,
          projectId: project.id,
          role: 'MANAGER',
        },
      });
    });

    revalidatePath('/');
    return { message: 'Project created' };
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return {
        error: 'Project has not been created, Try again later' + error,
      };
    return { error: 'Project not created, Inkown reason' };
  }
};
