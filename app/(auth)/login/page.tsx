'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login, googleLogIn } from '@/actions/auth';
import { useActionState, useEffect } from 'react';
import GoogleSignInButton from '@/components/GoogleSignIn';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const LoginComp = () => {
  const [state, formAction, isPending] = useActionState(login, null);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className=" w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
       
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
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
                type="email"
                name="email"
                placeholder="Email address"
                required
                defaultValue={state?.email || ''}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                defaultValue={state?.password || ''}
                className="h-11"
              />
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/password/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" disabled={isPending} className="w-full h-11">
              {isPending ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginComp;
