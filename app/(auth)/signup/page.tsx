'use client';

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { signUp } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GoogleSignInButton from '@/components/GoogleSignIn';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const SignUp = () => {
  const [state, formAction, isPending] = useActionState(signUp, null);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.message) toast.success(state.message);
  }, [state]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoogleSignInButton />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="name"
                placeholder="Full name"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="h-11"
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full h-11">
              {isPending ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
