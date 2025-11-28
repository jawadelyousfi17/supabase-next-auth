'use server';

import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

interface T_message {
  message?: string;
  error?: string;
}

export async function checkAutorisation(
  userId: string,
  organizationId: string
): Promise<T_message> {
  try {
    const member = await prisma.organizationMember.findFirst({
      where: {
        userId: userId,
        organizationId: organizationId,
      },
    });

    if (!member || member.role === 'EMPLOYEE') {
      return {
        error: 'You are not autorized to do this action',
      };
    }

    return { message: 'AUtorized' };
  } catch (error) {
    if (error instanceof Error)
      return {
        error: error.message,
      };
    return { error: 'Error: Unautorized' };
  }
}

export async function isOwner(organizationId: string): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) return false;

  try {
    const member = await prisma.organizationMember.findFirst({
      where: {
        userId: user.id,
        organizationId: organizationId,
      },
    });

    if (!member || member.role !== 'OWNER') {
      return false;
    }
  } catch (error) {
    return false;
  }
  return true;
}
