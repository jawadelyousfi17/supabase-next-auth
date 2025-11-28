'use server';

import prisma from '@/lib/prisma';

export async function getOrganization(userId: string) {
  try {
    const organizations = await prisma.organization.findMany({
      where: {
        userId: userId,
      },
    });
    return organizations;
  } catch (error) {
    throw new Error('error');
  }
}
