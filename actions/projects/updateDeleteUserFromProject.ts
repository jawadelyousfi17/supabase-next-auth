'use server';

import { OrgRole, ProjectRole } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { isAutorisedToManageProject } from './checkAutorisationToManage';
import { T_ActionResponse } from '@/types/server';

const checkValidReAssign = (
  numberOfOwners: number,
  oldRole: ProjectRole
): boolean => {
  if (oldRole !== 'MANAGER') return true;
  if (numberOfOwners == 1) return false;
  return true;
};

export async function updateProjectMember(
  memberId: string,
  projectId: string,
  newRole: string
): Promise<T_ActionResponse> {
  if (!(await isAutorisedToManageProject(projectId)))
    return { error: 'Unauthorized' };

  newRole = newRole.toUpperCase();

  const ownerCounts = await prisma.projectMember.count({
    where: {
      projectId: projectId,
      role: 'MANAGER',
    },
  });

  const member = await prisma.projectMember.findUnique({
    where: {
      id: memberId,
    },
    select: {
      role: true,
    },
  });

  const validReassign = checkValidReAssign(
    ownerCounts,
    member?.role as ProjectRole
  );

  if (!validReassign)
    return {
      error:
        "Can't change the role of the Manager, You need to add more Managers first",
    };

  try {
    const r = await prisma.projectMember.update({
      where: {
        id: memberId,
      },
      data: {
        role: newRole as ProjectRole,
      },
    });

    revalidatePath('/');
    return { message: 'Role updated successfully' }; // Fixed typo
  } catch (error) {
    return { error: 'Role not updated: Unknown error, try later' }; // Fixed typos
  }
}

export async function deleteProjectMemeber(
  memberId: string,
  projectId: string
): Promise<T_ActionResponse> {
  if (!(await isAutorisedToManageProject(projectId)))
    return { error: 'Unauthorized' };
  const member = await prisma.projectMember.findUnique({
    where: {
      id: memberId,
    },
    select: {
      role: true,
    },
  });

  const managersCount = await prisma.projectMember.count({
    where: {
      projectId: projectId,
      role: 'MANAGER',
    },
  });

  if (managersCount == 1 && member?.role === 'MANAGER')
    return { error: 'You can not delete the only manager of the project' };

  try {
    await prisma.$transaction([
      prisma.projectMember.delete({
        where: {
          id: memberId,
        },
      }),
      prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          membersCount: {
            decrement: 1,
          },
        },
      }),
    ]);
    revalidatePath('/');

    return { message: 'Member deleted' };
  } catch (error) {
    return { error: 'member not deleted' };
  }
}
