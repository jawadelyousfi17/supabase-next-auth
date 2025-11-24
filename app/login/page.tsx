'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { login, googleLogIn } from '@/actions/auth';
import { useActionState, useEffect } from 'react';
import GoogleSignInButton from '@/components/GoogleSignIn';
import toast, { Toaster } from 'react-hot-toast';

const LoginComp = () => {
    const [state, formAction, isPending] = useActionState(login, null);

    useEffect(() => {
        if (state?.error) toast.error(state.error);
    }, [state]);

    return (
        <div className="flex flex-col gap-2 mx-auto mt-20 max-w-80">
            <h1>Login</h1>
            <form action={formAction} className="flex flex-col gap-2">
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    defaultValue={state?.email || ''}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    defaultValue={state?.password || ''}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Logging in...' : 'Log in'}
                </Button>
                {/* {state?.error && toast.error('error')} */}
            </form>
            <GoogleSignInButton />
        </div>
    );
};

export default LoginComp;
