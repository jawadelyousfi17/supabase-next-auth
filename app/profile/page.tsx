'use client';

import { getUserInfo, T_UserInfo } from '@/actions/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { use, useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { updateName } from '@/actions/changeName';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import { uploadAvatar } from '@/actions/uploadAvatar';
import ResetPassword from '@/components/changePassword';
import { Upload } from 'lucide-react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import toast from 'react-hot-toast';

const Page = () => {
  const [user, setUser] = useState<T_UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [avatarUrl, setAvatarurl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const hasChange = useMemo(() => {
    const nameChanged = name !== user?.name;
    const fileChanged = file !== null;
    return !(nameChanged || fileChanged);
  }, [file, name, user?.name]);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const userData = await getUserInfo();
        setUser(userData);
        setName(userData.name);
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  const handleClick = async () => {
    async function update() {
      setIsPending(true);
      try {
        if (name != user?.name) {
          await updateName(user?.id as string, name as string);
        }
        if (file !== null) {
          const r = await uploadAvatar(file as File);
          if (r.error) {
            throw new Error(r.error);
          }
        }
      } finally {
        setIsPending(false);
      }
    }
    toast.promise(update(), {
      loading: 'Saving...',
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files?.[0] as File;
    if (!file) return;
    if (!file.type.startsWith('image'))
      return toast.error('Only images are allowed');
    if (file.size > 1024 * 1024) return toast.error('Max size per image : 2MB');

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarurl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFile(file);
  };

  if (loading)
    return (
      <div className="flex flex-col max-w-lg mx-auto py-10 gap-4">
        <Skeleton className=" rounded-2xl w-full h-5"></Skeleton>
        <Skeleton className=" rounded-2xl w-full h-[30px]"></Skeleton>
        <Skeleton className=" rounded-2xl w-full h-[30px]"></Skeleton>
        <Skeleton className=" rounded-2xl w-full h-5"></Skeleton>
        <Skeleton className=" rounded-2xl w-full h-5"></Skeleton>
      </div>
    );

  return (
    <Tabs defaultValue="account" className="w-[400px] mx-auto py-20">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Update account info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col max-w-lg mx-auto gap-2">
              <div className="flex gap-2 items-center">
                <img
                  src={avatarUrl ? avatarUrl : (user?.avatar as string)}
                  alt="avatr"
                  className="rounded-full"
                  width={40}
                  height={40}
                />

                <div className="relative">
                  <input
                    id="ii"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="ii"
                    className="flex items-center justify-center gap-3 px-6 py-3 
    rounded-lg cursor-pointer transition-all duration-200 
    shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="font-medium">Upload Image</span>
                  </label>
                </div>
              </div>
              <h3>Email</h3>
              <Input value={user?.email} disabled={true}></Input>
              <h3>Name</h3>
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              ></Input>

                  ROLE : {user?.role}

            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleClick}
              className="cursor-pointer flex flex-row gap-4"
              disabled={hasChange || isPending}
            >


              {isPending ? (
                <>
                  Saving
                  <Spinner />
                </>
              ) : (
                'Save'
              )}
            </Button>{' '}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Update your password</CardTitle>
          </CardHeader>
          <CardContent>
            <ResetPassword></ResetPassword>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Page;
