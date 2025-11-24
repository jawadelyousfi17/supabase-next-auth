'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { logout, revalidateAfterLogout } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { getUserInfo, T_UserInfo } from '@/actions/profile';

export default function NavbarAuth() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<T_UserInfo | null>(null);
    const router = useRouter();

    const handleLogout = async () => {
        console.log('Log out called');
        await logout();
        // await revalidateAfterLogout();
        router.push('/login');
        router.refresh();
    };

    useEffect(() => {
        async function getUser() {
            try {
                const u = await getUserInfo();
                setUser(u);
            } catch (error) {
            } finally {
            }
        }
        getUser();
    }, []);

    return (
        <nav className="w-full bg-white/80 backdrop-blur-md border-b">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Brand */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-lg font-semibold">
                            TASKIFY
                        </Link>
                    </div>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/" className="text-sm hover:underline">
                            Home
                        </Link>
                        <Link
                            href={''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                            }}
                            className="text-sm hover:underline cursor-pointer"
                        >
                            Logout
                        </Link>
                        <Link href={'/profile'}>
                            <Avatar className=" bg-secondary rounded-full cursor-pointer">
                                <AvatarFallback>EG</AvatarFallback>
                                <AvatarImage
                                    src={
                                        user?.avatar
                                            ? user.avatar
                                            : '/icons/avatar.png'
                                    }
                                    className="w-8 rounded-full"
                                ></AvatarImage>
                            </Avatar>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            aria-label="Toggle menu"
                            onClick={() => setOpen((s) => !s)}
                            className="p-2 rounded-md hover:bg-slate-100 cursor-pointer"
                        >
                            {open ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>

                {/* Mobile panel */}
                {open && (
                    <div className="md:hidden mt-2 pb-4">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="px-2 py-2 rounded hover:bg-slate-50"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="px-2 py-2 rounded hover:bg-slate-50"
                            >
                                About
                            </Link>
                            <Link
                                href="/pricing"
                                className="px-2 py-2 rounded hover:bg-slate-50"
                            >
                                Pricing
                            </Link>
                            <div className="px-2 py-2">
                                <Button size="sm" className="w-full">
                                    Get started
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
