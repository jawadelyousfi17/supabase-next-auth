'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/actions/auth';
import { useActionState, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import toast from 'react-hot-toast';
import { KeyRound, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Page = () => {
  const [state, formAction, isPending] = useActionState(resetPassword, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Forgot password?
          </CardTitle>
          <CardDescription className="text-center">
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="space-y-2">
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="h-11"
              />
            </div>
            <Button
              role="submit"
              type="submit"
              disabled={isPending}
              className="w-full h-11"
            >
              {isPending ? (
                <>
                  <Spinner />
                  Sending reset link...
                </>
              ) : (
                <>Send reset link</>
              )}
            </Button>
            <Button variant="ghost" className="w-full" type="button" asChild>
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
