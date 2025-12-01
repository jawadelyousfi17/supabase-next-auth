import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const name = searchParams.get('name') as string;

  console.log('Name = ', name);

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      try {
        await prisma.user.create({
          data: {
            id: data.user.id,
            email: data.user.email as string,
            name: name,
            avatar: `${
              process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
            }/icons/avatar-1.png`,
          },
        });
      } catch (prismaError) {
        // Handle duplicate user error (user might already exist)
        console.error('Error creating user in database:', prismaError);
      }

      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(new URL('/auth/error', request.url));
}
