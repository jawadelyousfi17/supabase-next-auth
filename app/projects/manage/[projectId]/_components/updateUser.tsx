'use client';

import { T_Member } from '@/actions/getMembersData';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';

import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Pen, Shield, Trash2, User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { deleteMemeber, updateMemeberPref } from '@/actions/updateMemebr';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';

import { OptimisticAction } from './MemebersTable';
import { T_MemberWithUser } from '@/actions/projects/getProjectById';
import {
  deleteProjectMemeber,
  updateProjectMember,
} from '@/actions/projects/updateDeleteUserFromProject';

interface T_Props {
  member: T_MemberWithUser;
}

export const UpdateMemberPreference = ({ member }: T_Props) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(member?.role.toLowerCase() || 'employee');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const projectId = useParams().projectId as string;

  useEffect(() => {
    setHasChanged(role !== member?.role.toLocaleLowerCase());
  }, [role]);

  const handleSave = async () => {
    setLoading(true);
    const { error, message } = await updateProjectMember(
      member?.id as string,
      projectId,
      role
    );
    if (error) toast.error(error);
    if (message) toast.success(message);
    setLoading(false);
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoading2(true);
    const { error, message } = await deleteProjectMemeber(member.id, projectId);

    if (error) toast.error(error);
    if (message) toast.success(message);
    setOpen(false);
    setLoading2(false);
  };

  return (
    <Dialog onOpenChange={(isOpen) => setOpen(isOpen)} open={open}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Member</DialogTitle>
          <DialogDescription>
            Update member role or remove them from the organization.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="space-y-6"
          >
            {/* Member Info */}
            <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
              <Avatar className="h-16 w-16">
                <AvatarImage src={member.user.avatar} alt={member.user.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-base truncate">
                  {member.user.name}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {member.user.email}
                </p>
                <Badge variant="secondary" className="mt-2">
                  <Shield className="h-3 w-3 mr-1" />
                  {member?.role}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Role Selection */}
            <div className="space-y-3">
              <Label htmlFor="role" className="text-sm font-medium">
                Member Role
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="w-full bg-amber-700">
                  <span className="capitalize">{role}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="employee">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Employee</p>
                          <p className="text-xs text-muted-foreground">
                            Basic access to projects
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Manager</p>
                          <p className="text-xs text-muted-foreground">
                            Can manage projects and teams
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="analysist">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Analysist</p>
                          <p className="text-xs text-muted-foreground">
                            See project analytics
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Danger Zone */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-destructive">
                Danger Zone
              </Label>
              <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Remove member</p>
                    <p className="text-xs text-muted-foreground">
                      This will permanently remove this member from the
                      organization.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                  >
                    {loading2 ? <Spinner /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={loading || !hasChanged}>
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
