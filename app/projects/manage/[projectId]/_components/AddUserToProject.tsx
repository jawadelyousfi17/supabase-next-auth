'use client';

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

import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import { getUserDataByEmail } from '@/actions/addUserToOrganization';
import toast from 'react-hot-toast';
import { useEffect, useState, useTransition } from 'react';
import { User } from '@/lib/generated/prisma';

import { addUserToProject } from '@/actions/projects/addUserToProject';
import { T_MemberWithUser } from '@/actions/projects/getProjectById';
import { Avatar } from '@/components/ui/avatar';
import {
  getOrganizationMembersInfo,
  T_OrganizationMemeberWithUser,
} from '@/actions/organization/getOrganizationMemebersInfo';

type T_Props = {
  organizationId: string;
  projectMembers: T_MemberWithUser[] | null;
};

interface T_Member_2 extends T_OrganizationMemeberWithUser {
  is_member: boolean;
}

const AddUserToProjectComp = ({ organizationId, projectMembers }: T_Props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const [members, setMembers] = useState<T_Member_2[] | null>(null);

  const params = useParams();
  const projectId = params.projectId as string;

  useEffect(() => {
    async function getOrganizationMemebers() {
      setLoading(true);
      const m = await getOrganizationMembersInfo(organizationId);
      const p: T_Member_2[] = [];

      m?.forEach((mb) => {
        const t = projectMembers?.find((pm) => pm.user.id === mb.user.id);
        if (!t) {
          p.push({ ...mb, is_member: false });
        }
      });

      setMembers(p);
      setLoading(false);
    }
    getOrganizationMemebers();
  }, [open]);


  const addUser = async (userId: string) => {
    setLoading2((prev) => ({ ...prev, [userId]: true }));
    const { error, message } = await addUserToProject(
      projectId,
      userId,
      organizationId
    );
    setMembers((prev) => {
      const t = prev?.find((m) => m.user.id === userId);
      if (t) t.is_member = true;
      return prev;
    });
    setLoading2((prev) => ({ ...prev, [userId]: false }));
    if (error) {
      toast.error(error);
      return;
    }
    if (message) toast.success(message);
  };

  const filtredUsers = members?.filter(
    (memeber) =>
      memeber.user.email.toLowerCase().includes(email) ||
      memeber.user.name.toLowerCase().includes(email)
  );


  return (
    <Dialog onOpenChange={(isOpen) => setOpen(isOpen)} open={open}>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <Plus /> Add memebr
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Add memebr to the project</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {/* <AnimatePresence mode="wait">
          {user && (
            <motion.div
              key="user-card"
              initial={{ opacity: 0.5, y: 0, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: easeInOut }}
            >
              <Card className="p-3 px-0">
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src={user?.avatar}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span>{user?.name}</span>
                        <span className=" text-xs"> {user?.email}</span>
                      </div>
                    </div>
                    <Button onClick={addUser} disabled={loading2}>
                      {loading2 ? (
                        <>
                          <Spinner />
                          Add to project
                        </>
                      ) : (
                        <>Add to project</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence> */}

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="bhj_op">Search for user</Label>
            <Input
              value={email}
              id="bhj_op"
              placeholder="Search"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {loading && (
            <div className="flex justify-center items-center">
              {' '}
              <Spinner />{' '}
            </div>
          )}
          {!loading &&
            filtredUsers?.map((member) => {
              return (
                <Card className="p-3 px-0" key={member.id}>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <img
                          src={member.user.avatar}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span>{member.user.name}</span>
                          <span className=" text-xs"> {member.user.email}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => addUser(member.user.id)}
                        disabled={loading2[member.user.id] || member.is_member}
                      >
                        {loading2[member.user.id] ? (
                          <>
                            <Spinner />
                            Add to project
                          </>
                        ) : (
                          <>Add to project</>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {/* <Button
            onClick={getUserdata}
            type="submit"
            disabled={loading || email.length == 0}
          >
            {loading ? (
              <>
                Find user <Spinner />
              </>
            ) : (
              <>Find user</>
            )}
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserToProjectComp;
