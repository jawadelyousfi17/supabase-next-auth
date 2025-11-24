import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';

type UserMetadata = {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    phone_verified: boolean;
    picture: string;
    provider_id: string;
    sub: string;
};

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    let next = searchParams.get('next') ?? '/';
    if (!next.startsWith('/')) {
        next = '/';
    }

    if (code) {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
        );
        if (!error) {
            const userMetaData: UserMetadata = data.user
                .user_metadata as UserMetadata;
            try {
                let user = await prisma.user.findUnique({
                    where: {
                        id: data.user.id,
                    },
                });
                if (user) return NextResponse.redirect(`${origin}`);
                user = await prisma.user.create({
                    data: {
                        email: userMetaData.email,
                        name: userMetaData.name,
                        id: data.user.id,
                        avatar: userMetaData.avatar_url,
                    },
                });
                if (!user) return NextResponse.redirect(`${origin}/auth/error`);
            } catch (error) {
                return NextResponse.redirect(`${origin}/auth/error`);
            }
            return NextResponse.redirect(`${origin}`);
        }
    }

    return NextResponse.redirect(`${origin}/auth/error`);
}
