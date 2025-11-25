'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { CircleCheck } from 'lucide-react';
import { CircleX } from 'lucide-react';

import { resetPassword } from '@/actions/resetPassword';
import { useActionState, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import toast from 'react-hot-toast';

const ResetPassword = () => {
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
        <div className="">
            <form action={formAction} className="flex flex-col gap-3">
                {state?.error && (
                    <p className="text-red-500">
                        {' '}
                        <CircleX></CircleX> Error updating password :{' '}
                        {state.error}
                    </p>
                )}
                {state?.message && (
                    <p className="text-green-500">
                        <CircleCheck></CircleCheck> {state.message}
                    </p>
                )}
                <Input
                    name="currentPassword"
                    type="password"
                    placeholder="currnent password"
                ></Input>
                <Input
                    name="newPassword"
                    type="text"
                    placeholder="new password"
                ></Input>
                <Input
                    name="retypedPassword"
                    type="text"
                    placeholder="retype password"
                ></Input>
                <Button type="submit" role="submit" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Spinner /> Updating password
                        </>
                    ) : (
                        <>Update your password</>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ResetPassword;
