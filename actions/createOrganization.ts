'use server';

import prisma from '@/lib/prisma';
import slugify from 'slugify';

type CompanySize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTRPRISE';

interface Organization {
  organizationName: string;
  orgDescription: string;
  orgUrl: string;
  address: string;
  companySize: CompanySize;
  industry: string;
  timeZone: string;
  country: string;
  logo?: string | null; // Optional if you're handling file uploads
  owner_id: string;
}

type T_createOrgStatus = {
  message?: string;
  error?: string;
};

export const createOrg = async (
  props: Organization
): Promise<T_createOrgStatus> => {
  try {
    const org = await prisma.organization.create({
      data: {
        name: props.organizationName,
        is_active: true,
        description: props.orgDescription,
        userId: props.owner_id,
        website: props.orgUrl,
        industry: props.industry,
        company_size: props.companySize,
        adress: props.address,
        country: props.country,
        timzone: props.timeZone,
        slug: slugify(props.organizationName),
        logo_url:
          props.logo ||
          `${
            process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
          }/icons/avatar.png`,
      },
    });

    const orgMember = await prisma.organizationMember.create({
      data: {
        organizationId: org.id,
        userId: props.owner_id,
        role: 'OWNER',
      },
    });

    if (org) return { message: 'created' };
    return { error: 'Not created' };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'not created' };
  }
};
