'use server';

import { getMembersData, T_Member } from '@/actions/getMembersData';
import { checkAutorisation } from '@/actions/checkAutorityOrg';
import AccessDenied from '@/components/acessDenied';
import MemebersTable from './_components/MemebersTable';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';
import { isOrganizationExist } from '@/actions/organization/getOrgById';
import NotFound from './_components/NotFound';

interface I_Props {
  params: {
    organizationId: string;
  };
}

const Page = async (props: I_Props) => {
  const { organizationId } = await props.params;
  const supabase = await createClient();
  let members: T_Member[] = [];
  let isAutorize = true;

  if (!(await isOrganizationExist(organizationId))) return <NotFound />;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  async function getOrgData() {
    const { error } = await checkAutorisation(
      user?.id as string,
      organizationId as string
    );
    if (error) {
      return (isAutorize = false);
    }
    try {
      members = await getMembersData(organizationId as string);
    } catch (error) {
    } finally {
    }
  }

  await getOrgData();

  if (!isAutorize) return <NotFound />;

  return <MemebersTable members={members} />;
};

export default Page;
