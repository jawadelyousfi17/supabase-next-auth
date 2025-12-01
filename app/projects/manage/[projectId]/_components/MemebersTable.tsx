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
import { UpdateMemberPreference } from './updateUser';
import { useEffect, useOptimistic, useState, useDeferredValue } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Organization, Project, ProjectStatus } from '@/lib/generated/prisma';
import { T_MemberWithUser } from '@/actions/projects/getProjectById';
import AddUserToProjectComp from './AddUserToProject';
import { projectStatusConfig } from '@/utils/basic/project';
import { Spinner } from '@/components/ui/spinner';
import { updateProjectStatus } from '@/actions/projects/updateProjectPref';
import toast from 'react-hot-toast';

interface T_Props {
  members: T_MemberWithUser[] | null;
  project: Project;
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

const ProjectMemebersTable = ({ members, project }: T_Props) => {
  const [sortVal, setSortVal] = useState('az');
  const [searchTerm, setSearchTerm] = useState('');
  const [projectStat, setProjectStat] = useState<ProjectStatus>(
    project.projectStatus
  );
  const [changeIsPending, setChangeIsPending] = useState(false);
  const currentStatus = projectStatusConfig[project.projectStatus];

  const handleChange = async (e: string) => {
    setChangeIsPending(true);
    const { error, message } = await updateProjectStatus(
      project.id,
      e as ProjectStatus
    );
    setChangeIsPending(false);
    if (message) setProjectStat(e as ProjectStatus);
    if (error) toast.error(error);
  };

  return (
    <div className="py-20 max-w-3xl mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-sm text-muted-foreground">Manage your project</p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={projectStat}
            onValueChange={(e: string) => handleChange(e)}
          >
            <SelectTrigger className="w-[180px] border-0">
              {changeIsPending && <Spinner />}

              <SelectValue placeholder="change project status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Prject status</SelectLabel>
                <SelectItem value="PLANNING">
                  <Badge
                    className={`${projectStatusConfig['PLANNING'].badge} border-0 gap-2`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${projectStatusConfig['PLANNING'].dot}`}
                    ></span>
                    {projectStatusConfig['PLANNING'].label}
                  </Badge>
                </SelectItem>
                <SelectItem value="ACTIVE">
                  <Badge
                    className={`${projectStatusConfig['ACTIVE'].badge} border-0 gap-2`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${projectStatusConfig['ACTIVE'].dot}`}
                    ></span>
                    {projectStatusConfig['ACTIVE'].label}
                  </Badge>{' '}
                </SelectItem>
                <SelectItem value="ON_HOLD">
                  <Badge
                    className={`${projectStatusConfig['ON_HOLD'].badge} border-0 gap-2`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${projectStatusConfig['ON_HOLD'].dot}`}
                    ></span>
                    {projectStatusConfig['ON_HOLD'].label}
                  </Badge>
                </SelectItem>
                <SelectItem value="COMPLETED">
                  <Badge
                    className={`${projectStatusConfig['COMPLETED'].badge} border-0 gap-2`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${projectStatusConfig['COMPLETED'].dot}`}
                    ></span>
                    {projectStatusConfig['COMPLETED'].label}
                  </Badge>{' '}
                </SelectItem>
                <SelectItem value="ARCHIVED">
                  <Badge
                    className={`${projectStatusConfig['ARCHIVED'].badge} border-0 gap-2`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${projectStatusConfig['ARCHIVED'].dot}`}
                    ></span>
                    {projectStatusConfig['ARCHIVED'].label}
                  </Badge>{' '}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
          <AddUserToProjectComp
            organizationId={project.organizationId}
            projectMembers={members}
          />
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
                {members?.length === 0 ? (
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
                  members?.map((member) => {
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
                                src={member.user.avatar}
                                alt={member.user.name}
                              />
                              <AvatarFallback>
                                {member.user.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">
                                {member.user.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {member.user.email}
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
                          <UpdateMemberPreference member={member} />
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

export default ProjectMemebersTable;
