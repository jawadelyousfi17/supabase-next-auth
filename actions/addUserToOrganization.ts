'use server';

import { OrgRole, Role, User } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { isOwner } from './checkAutorityOrg';
import { revalidatePath } from 'next/cache';

export interface T_Adduser {
  error?: string;
  message?: string;
  userData?: User;
}
export interface T_AdduserStatus {
  error?: string;
  message?: string;
}

export async function getUserDataByEmail(email: string): Promise<T_Adduser> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log('email = ', email);

    if (!user) {
      return { error: 'User not found' };
    }

    return { message: 'user found', userData: user };
  } catch (error) {
    return { error: 'Unkown error was accured' };
  }
}

export async function addUserToOrganization(
  userId: string,
  organizationId: string,
  role: OrgRole
): Promise<T_AdduserStatus> {
  if (!(await isOwner(organizationId))) return { error: 'Unautorized' };
  try {
    let mem = await prisma.organizationMember.findFirst({
      where: {
        userId: userId,
        organizationId: organizationId,
      },
    });

    if (mem) return { error: 'User already a member' };

    await prisma.$transaction([
      prisma.organizationMember.create({
        data: {
          userId: userId,
          organizationId: organizationId,
          role: role,
        },
      }),
      prisma.organization.update({
        where: {
          id: organizationId,
        },
        data: {
          members_count: {
            increment: 1,
          },
        },
      }),
    ]);

    revalidatePath('/');
    return { message: 'User added to the Organization' };
  } catch (error) {
    return { error: 'User not added to the Organization, try later' };
  }
}
