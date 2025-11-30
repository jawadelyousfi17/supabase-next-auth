'use client';

import { AppleAnimation } from '@/components/customs/Animation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { T_Member } from '@/actions/getMembersData';
import { Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings2 } from 'lucide-react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { motion, AnimatePresence } from 'framer-motion';

import { ArrowDown } from 'lucide-react';
import { ArrowUp } from 'lucide-react';
import CreateUser from './createUser';
import { UpdateMemberPreference } from './updateUser';
import { useEffect, useOptimistic, useState, useDeferredValue } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Organization } from '@/lib/generated/prisma';

interface T_Props {
  members: T_Member[] | null;
  organization: Organization | null;
}

export type OptimisticAction =
  | {
      action: 'delete';
      id: string;
    }
  | {
      action: 'add';
      member: T_Member;
    };

const MemebersTable = ({ members, organization }: T_Props) => {
  const [sortVal, setSortVal] = useState('az');
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearch = useDeferredValue(searchTerm);

  const [optimisticMembers, addOptimisticMember] = useOptimistic(
    members,
    (
      state: T_Member[] | null,
      newMember: OptimisticAction
    ): T_Member[] | null => {
      if (newMember.action === 'delete') {
        if (state !== null)
          return state?.filter((member) => member.id !== newMember.id);
        return null;
      } else if (newMember.action === 'add') {
        if (state !== null) return [newMember.member, ...state];
        return null;
      }
      return state;
    }
  );
  const filtred = optimisticMembers?.filter(
    (member) =>
      member.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  let sortedMembers = [...(filtred || [])].sort((a, b) => {
    switch (sortVal) {
      case 'az':
        return a.name.localeCompare(b.name);
      case 'za':
        return b.name.localeCompare(a.name);
      case 'dup':
        return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
      case 'ddown':
        return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
      case 'role':
        const roles: Record<string, number> = {
          OWNER: 0,
          MANAGER: 1,
          EMPLOYEE: 2,
        };
        return (roles[a.role] || 2) - (roles[b.role] || 2);
      default:
        return 0;
    }
  });
  return (
    <div className="py-20 max-w-3xl mx-auto flex flex-col gap-4">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-16 w-16 rounded-lg border">
          <AvatarImage src={organization?.logo_url} alt={organization?.name} />
          <AvatarFallback className="rounded-lg">OR</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {organization?.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex item-center gap-4">
          <div className="flex items-center  w-fit rounded-md">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-sm border-0 bg-none"
            />
            {/* <Button
              // onClick={handleSearch}
              variant={'ghost'}
              className="rounder-none"
            >
              <Search></Search>
            </Button> */}
          </div>

          <Select onValueChange={setSortVal} value={sortVal}>
            <SelectTrigger className="w-fit border-0">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value="az">
                  <ArrowDown />
                  By name A-Z
                </SelectItem>
                <SelectItem value="za">
                  <ArrowUp />
                  By name Z-A
                </SelectItem>
                <SelectItem value="dup">
                  <ArrowDown />
                  By Date joined
                </SelectItem>

                <SelectItem value="ddown">
                  <ArrowUp />
                  By Date joined
                </SelectItem>

                <SelectItem value="role">By role</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=" space-x-2">
          <CreateUser addOptimisticAction={addOptimisticMember} />
          <Button variant={'ghost'}>
            <Settings2 />
          </Button>
        </div>
      </div>

      <AppleAnimation delay={0}>
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] pl-6">Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {sortedMembers?.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <TableCell colSpan={4} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </motion.tr>
                ) : (
                  sortedMembers?.map((member) => {
                    return (
                      <motion.tr
                        key={member.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group"
                      >
                        <TableCell className="py-3 pl-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border">
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">
                                {member.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {member.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={'default'} className="capitalize">
                            {member.role.toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(member.joinedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <UpdateMemberPreference
                            member={member}
                            addOptimisticAtion={addOptimisticMember}
                          />
                        </TableCell>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </AppleAnimation>
    </div>
  );
};

export default MemebersTable;
