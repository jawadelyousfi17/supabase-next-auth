"use client";

import React from "react";
import { useActionState } from "react";

import { signUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleSignInButton from "@/components/GoogleSignIn";

const SignUp = () => {
  const [state, formAction, isPending] = useActionState(signUp, null);

  return (
    <div className="flex flex-col gap-2 mx-auto mt-20 max-w-80">
      <h1>Create an account</h1>
      <form action={formAction} className="flex flex-col gap-2">
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Input type="text" name="name" placeholder="your name" required/>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating account..." : "Sign up"}
        </Button>
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state?.message && (
          <p className="text-green-500 text-sm">{state.message}</p>
        )}
      </form>
      <center>OR</center>
      <hr></hr>
      <GoogleSignInButton></GoogleSignInButton>
    </div>
  );
};

export default SignUp;
