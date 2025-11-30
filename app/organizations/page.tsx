import Organizations from '@/app/organizations/_components/organizations';
import { getUserId } from '@/actions/getUserId';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

const page = async () => {
  // get all organiztion where the user is member / also get his role

  const userId = await getUserId();
  if (!userId) redirect('/login');

  const memeberT = await prisma.organizationMember.findMany({
    where: {
      userId: userId,
    },
    select: {
      organizationId: true,
    },
  });

  const m = memeberT.map((mbr) => mbr.organizationId);

  const orgs = await prisma.organization.findMany({
    where: {
      id: {
        in: m,
      },
    },
  });

  console.log(orgs);

  return (
    <div>
      <Organizations organizations={orgs} />
      {/* <MyOrganizations></MyOrganizations> */}
    </div>
  );
};

export default page;
