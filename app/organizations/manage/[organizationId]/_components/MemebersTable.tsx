'use client';

import { AppleAnimation } from '@/components/customs/Animation';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { T_Member } from '@/actions/getMembersData';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
import { useOptimistic, useState } from 'react';

interface T_Props {
  members: T_Member[] | null;
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

const MemebersTable = ({ members }: T_Props) => {
  const [_members, setMembers] = useState(members);

  const [sortVal, setSortVal] = useState('az')

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



  return (
    <div className="py-20 max-w-3xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex item-center gap-4">
          <div className="flex items-center border-1 w-fit rounded-md">
            <Input placeholder="Search" className="w-fit border-0 bg-none" />
            <Button variant={'ghost'} className="rounder-none">
              <Search></Search>
            </Button>
          </div>

          <Select onValueChange={setSortVal} value={sortVal}>
            <SelectTrigger className="w-fit">
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
        <CreateUser addOptimisticAction={addOptimisticMember} />
      </div>

      <AppleAnimation delay={0}>
        <div className="rounded-md border">
          <Table>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {optimisticMembers?.map((member) => {
                  return (
                    <motion.tr
                      key={member.id}
                      layout // This animates other rows moving when one is deleted!
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted [&>td]:py-4 [&>td]:px-6 group"
                    >
                      <TableCell>
                        <div className="flex flex-row items-center gap-6">
                          <img
                            src={member.avatar}
                            className="w-12 h-12 bg-accent rounded-full p-1"
                          />
                          {member.name} <Separator orientation="vertical" />{' '}
                          <Badge className="-ml-10">
                            {member.role.toLocaleLowerCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <UpdateMemberPreference
                          member={member}
                          addOptimisticAtion={addOptimisticMember}
                        />
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </AppleAnimation>
    </div>
  );
};

export default MemebersTable;
