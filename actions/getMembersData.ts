'use server';
import { OrganizationMember } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';

export interface T_Member extends OrganizationMember {
  name: string;
  email: string;
  avatar: string;
}

export async function getMembersData(orgId: string): Promise<T_Member[]> {
  try {
    const members = await prisma.organizationMember.findMany({
      where: {
        organizationId: orgId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
          },
        },
      }, 
    });

    const allMembers: T_Member[] = [];

    for (const member of members) {
      allMembers.push({
        ...member,
        name: member.user.name,
        email: member.user.email,
        avatar: member.user.avatar,
      });
    }

    return allMembers;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error('Error');
  }
}
