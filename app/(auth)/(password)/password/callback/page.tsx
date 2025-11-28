'use client';

import { updatePasswordPasswordless } from '@/actions/auth';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Page = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') as string;

  const updateUser = updatePasswordPasswordless.bind(null, code);

  const [state, formAction, isPending] = useActionState(updateUser, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.message) {
      toast.success(state.message + ' - Redirecting to Login page');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [state]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4"></div>
          <CardTitle className="text-2xl font-bold text-center">
            Set new password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password below. Make sure it's strong and secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Input
                name="password"
                type="password"
                placeholder="New password"
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
                  Updating password...
                </>
              ) : (
                <>Update password</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
