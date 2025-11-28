'use server';

import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';

export type T_UserInfo = {
    name: string;
    email: string;
    id: string;
    avatar: string;
    role: any;
};

export const getUserInfo = async () => {
    const supabase = await createClient();
    const userAuth = await supabase.auth.getUser();
    if (!userAuth) throw new Error('Not Found');
    const user = await prisma.user.findUnique({
        where: {
            id: userAuth.data.user?.id,
        },
    });
    if (!user) throw new Error('Not Found');
    return user;
};
