'use client';

import { getOrganization } from '@/actions/getOrganizations';
import { useUser } from '@/context/UserProvider';
import { Organization } from '@/lib/generated/prisma';
import { useEffect, useState } from 'react';
import { Spinner } from './ui/spinner';
import { OrganizationCard } from './OrganizationCard';
import { Building2, Plus } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AppleAnimation } from './customs/Animation';

const Organizations = () => {
  const user = useUser();

  const [organizations, setOrganizations] = useState<Organization[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const orgs = await getOrganization(user?.id as string);
      setOrganizations(orgs);
      return orgs;
    },
  });

  // useEffect(() => {
  //   async function f() {
  //     setLoading(true);
  //     try {
  //       const o = await getOrganization(user?.id as string);
  //       setOrganizations(o);
  //     } catch (error) {
  //       console.error('Error fetching organizations:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (user?.id) {
  //     f();
  //   }
  // }, [user?.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3"></div>
          <Button asChild>
            <Link href="/create-organization">
              <Plus className="mr-2 h-4 w-4" />
              Create Organization
            </Link>
          </Button>
        </div>

        {/* Organizations Grid */}
        {organizations && organizations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizations.map((o) => (
              <AppleAnimation key={o.id}>
                <OrganizationCard
                  name={o.name}
                  country={o.country}
                  size={o.members_count}
                  id={o.id}
                  status={o.is_active}
                  logo={o.logo_url}
                />
              </AppleAnimation>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Building2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              No organizations yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Get started by creating your first organization to collaborate
              with your team.
            </p>
            <Button asChild size="lg">
              <Link href="/create-organization">
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Organization
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Organizations;
