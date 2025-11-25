'use client';

import { getUserInfo, T_UserInfo } from '@/actions/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { updateName } from '@/actions/changeName';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import ResetPassword from '@/components/changePassword';

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
    const [changed, setChanged] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            setLoading(true);
            try {
                const u = await getUserInfo();
                setUser(u);
                setName(u.name);
            } catch (error) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, []);

    const handleClick = async () => {
        async function update() {
            setIsPending(true);
            try {
                await updateName(user?.id as string, name as string);
            } catch (error) {
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
                        {/* <CardDescription>Card Description</CardDescription> */}
                        {/* <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col max-w-lg mx-auto gap-2">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={user?.avatar as string}
                                    alt="avatr"
                                    className="rounded-full"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <h3>Email</h3>
                            <Input value={user?.email} disabled={true}></Input>
                            <h3>Name</h3>
                            <Input
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setChanged(true);
                                }}
                                value={name}
                            ></Input>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={handleClick}
                            className="cursor-pointer flex flex-row gap-4"
                            disabled={!changed || isPending}
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
