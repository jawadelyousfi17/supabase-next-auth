'use client';

import { updatePasswordPasswordless } from '@/actions/auth';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

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
        <div className="flex flex-col gap-2 mx-auto mt-20 max-w-80">
            <h2>Forgot password</h2>
            {state?.message && (
                <p className="text-green-500">{state.message}</p>
            )}
            {state?.error && <p className="text-red-500">{state.error}</p>}
            <form action={formAction} className="flex flex-col gap-2">
                <Input name="password" placeholder="New password"></Input>
                <Button role="submit" type="submit" disabled={isPending}>
                    {isPending ? <><Spinner/>Updating...</> : <>Update password</>}
                </Button>
            </form>
        </div>
    );
};

export default Page;
