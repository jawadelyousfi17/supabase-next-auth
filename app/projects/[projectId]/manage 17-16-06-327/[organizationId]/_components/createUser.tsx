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

import { motion, AnimatePresence, easeInOut } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import {
  addUserToOrganization,
  getUserDataByEmail,
} from '@/actions/addUserToOrganization';
import toast from 'react-hot-toast';
import { useEffect, useState, useTransition } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { User } from '@/lib/generated/prisma';

import { OptimisticAction } from './MemebersTable';
import { T_Member } from '@/actions/getMembersData';

type T_Props = {
  addOptimisticAction: (action: OptimisticAction) => void;
};

const CreateUser = ({ addOptimisticAction }: T_Props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const params = useParams();
  const id = params.organizationId as string;

  useEffect(() => {
    if (loading) setUser(null);
  }, [loading]);

  useEffect(() => {
    setUser(null);
    setEmail('');
  }, [open]);

  const getUserdata = async () => {
    setLoading(true);
    const { error, userData, message } = await getUserDataByEmail(email);
    if (error) {
      if (error.includes('not found'))
        toast.error('This user not found \n Invite them to use Taskify 💁‍♂️');
      toast.error('Can not process your request for now');
    }
    if (userData) setUser(userData);
    setLoading(false);
  };

  const addUser = async () => {
    const member: T_Member = {
      name: user?.name as string,
      email: user?.email as string,
      avatar: user?.avatar as string,
      id: Date.now().toString(),
      role: 'EMPLOYEE',
      organizationId: Date.now().toString(),
      userId: user?.id as string,
      joinedAt: new Date(),
    };
    startTransition(async () => {
      addOptimisticAction({ action: 'add', member: member });

      setLoading2(true);
      const { error, message } = await addUserToOrganization(
        user?.id as string,
        id,
        'EMPLOYEE'
      );

      setLoading2(false);
      if (error) {
        toast.error(error);
        addOptimisticAction({ action: 'delete', id: member.id });
        return;
      }
      if (message) toast.success(message);

      setOpen(false);
    });
  };

  return (
    <Dialog onOpenChange={(isOpen) => setOpen(isOpen)} open={open}>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <Plus /> Add user
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] space-y-2">
        <DialogHeader>
          <DialogTitle>Add user to the organization</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
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
                    <Button onClick={addUser} disabled={isPending}>
                      {isPending ? (
                        <>
                          <Spinner />
                          Send invite
                        </>
                      ) : (
                        <>Send invite</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">User email</Label>
            <Input
              value={email}
              id="email"
              name="name"
              placeholder="User email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
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
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
