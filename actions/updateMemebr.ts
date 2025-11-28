'use server';

import { OrgRole } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { isOwner } from './checkAutorityOrg';
import { revalidatePath } from 'next/cache';

interface T_UpdateMem {
  error?: string;
  message?: string;
}

const checkValidReAssign = (
  numberOfOwners: number,
  oldRole: OrgRole
): boolean => {
  if (oldRole !== 'OWNER') return true;
  if (numberOfOwners == 1) return false;
  return true;
};

export async function updateMemeberPref(
  memberId: string,
  organizationId: string,
  newRole: string
): Promise<T_UpdateMem> {
  if (!(await isOwner(organizationId))) return { error: 'Unauthorized' };
  newRole = newRole.toUpperCase();

  const ownerCounts = await prisma.organizationMember.count({
    where: {
      organizationId: organizationId,
      role: 'OWNER',
    },
  });

  const member = await prisma.organizationMember.findUnique({
    where: {
      id: memberId,
    },
    select: {
      role: true,
    },
  });

  const validReassign = checkValidReAssign(
    ownerCounts,
    member?.role as OrgRole
  );
  if (!validReassign)
    return {
      error:
        "Can't change the role of the owner, You need to add more owners first",
    };

  try {
    const r = await prisma.organizationMember.update({
      where: {
        id: memberId,
      },
      data: {
        role: newRole as OrgRole,
      },
    });

    revalidatePath('/');
    return { message: 'Role updated successfully' }; // Fixed typo
  } catch (error) {
    return { error: 'Role not updated: Unknown error, try later' }; // Fixed typos
  }
}

export async function deleteMemeber({
  memberId,
  organizationId,
}: {
  memberId: string;
  organizationId: string;
}): Promise<T_UpdateMem> {
  if (!(await isOwner(organizationId))) return { error: 'Unauthorized' };
  const member = await prisma.organizationMember.findUnique({
    where: {
      id: memberId,
    },
    select: {
      role: true,
    },
  });

  const ownersCount = await prisma.organizationMember.count({
    where: {
      organizationId: organizationId,
      role: 'OWNER',
    },
  });

  if (ownersCount == 1 && member?.role === 'OWNER')
    return { error: 'You can not delete the only owner of the Organization' };

  try {
    await prisma.$transaction([
      prisma.organizationMember.delete({
        where: {
          id: memberId,
        },
      }),
      prisma.organization.update({
        where: {
          id: organizationId,
        },
        data: {
          members_count: {
            decrement: 1,
          },
        },
      }),
    ]);
    revalidatePath('/organizations/manage/[organizationId]');

    return { message: 'Member deleted' };
  } catch (error) {
    return { error: 'member not deleted' };
  }
}
