'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/actions/auth';
import { useActionState, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import toast from 'react-hot-toast';

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
        <div className="flex flex-col gap-2 mx-auto mt-20 max-w-80">
            <h2>Forgot password</h2>
            {state?.message && (
                <p className="text-green-500">{state.message}</p>
            )}
            {state?.error && <p className="text-red-500">{state.error}</p>}
            <form action={formAction} className="flex flex-col gap-2">
                <Input name="email" placeholder="Email"></Input>
                <Button role="submit" type="submit">
                    {isPending ? (
                        <>
                            <Spinner />
                            Updating...
                        </>
                    ) : (
                        <>Update password</>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default Page;
