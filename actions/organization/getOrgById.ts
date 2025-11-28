'use server';

import prisma from '@/lib/prisma';

export async function isOrganizationExist(id: string): Promise<boolean> {
  const org = await prisma.organization.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!org) return false;

  return true;
}
