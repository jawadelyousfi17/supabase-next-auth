'use server';

import { Organization } from '@/lib/generated/prisma';
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

export async function getOrganizationInfo(
  id: string
): Promise<Organization | null> {
  try {
    const org = await prisma.organization.findUnique({
      where: { id },
    });
    if (org) return org;
  } catch (error) {
    return null;
  }
  return null;
}
