'use server';

import { Prisma } from '@/lib/generated/prisma';
import { checkAutorisation } from '../checkAutorityOrg';
import { getUserId } from '../getUserId';
import prisma from '@/lib/prisma';

export type T_OrganizationMemeberWithUser =
  Prisma.OrganizationMemberGetPayload<{
    include: {
      user: true;
    };
  }>;

export const getOrganizationMembersInfo = async (
  organizationId: string
): Promise<T_OrganizationMemeberWithUser[] | null> => {
  try {
    const members = await prisma.organizationMember.findMany({
      where: {
        organizationId: organizationId,
      },
      include: {
        user: true,
      },
    });

    return members;
  } catch (error) {
    return null;
  }
};
