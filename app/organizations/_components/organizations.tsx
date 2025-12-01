'use client';

import { getOrganization } from '@/actions/getOrganizations';
import { useUser } from '@/context/UserProvider';
import { Organization } from '@/lib/generated/prisma';
import { useEffect, useState } from 'react';
import { Spinner } from '../../../components/ui/spinner';
import { Building2, Plus, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AppleAnimation } from '../../../components/customs/Animation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';

type T_Props = {
  organizations: Organization[] | null;
};

const Organizations = ({ organizations }: T_Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
            <p className="text-muted-foreground mt-1">
              Manage and collaborate with your teams
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/create-organization">Join Organization</Link>
            </Button>
            <Button asChild>
              <Link href="/create-organization">
                <Plus className="mr-2 h-4 w-4" />
                Create Organization
              </Link>
            </Button>
          </div>
        </div>

        {/* Organizations Table */}
        {organizations && organizations.length > 0 ? (
          <AppleAnimation delay={0}>
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/30">
                    <TableHead className="w-[350px] pl-6 py-4 font-semibold">
                      Organization
                    </TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Team Size</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="text-right pr-6 font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizations.map((o, index) => (
                    <TableRow
                      key={o.id}
                      className="group hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 rounded-xl border-2 shadow-sm group-hover:scale-105 transition-transform">
                            <AvatarImage
                              src={o.logo_url}
                              alt={o.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="rounded-xl bg-linear-to-br from-primary/20 to-primary/5">
                              <Building2 className="h-6 w-6 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-base group-hover:text-primary transition-colors">
                              {o.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {o.industry || 'General'}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-primary/5">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span className="text-sm font-medium">
                            {o.country || 'Not specified'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-primary/5">
                            <Users className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span className="text-sm font-medium">
                            {o.members_count}{' '}
                            {o.members_count === 1 ? 'member' : 'members'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={o.is_active ? 'default' : 'secondary'}
                          className={`font-medium ${
                            o.is_active
                              ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 hover:bg-green-500/20'
                              : 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              o.is_active ? 'bg-green-500' : 'bg-gray-500'
                            }`}
                          />
                          {o.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="hover:bg-primary/10 hover:text-primary font-medium"
                        >
                          <Link
                            href={`/organizations/dashboard/${o.id}`}
                            className="flex items-center gap-2"
                          >
                            View Dashboard
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AppleAnimation>
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
