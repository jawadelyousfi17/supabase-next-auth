// handle user auth on the server
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const signUp = async (prevState: any, formData: FormData) => {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/auth/confirm?name=${name}&type=email}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { message: "check your email for confirmation" };
};

const login = async (prevState: any, formData: FormData) => {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message, email, password };

  revalidatePath("/", "layout");
  redirect("/");
};

const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

const revalidateAfterLogout = async () => {
  revalidatePath("/", "layout");
};

const googleLogIn = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  redirect("/");
};

async function signInWithEmail(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: false,
      emailRedirectTo: "http://localhost:3000/auth/otp-magic-link/callback",
    },
  });

  if (error) {
    console.log(error.message);
    return { error: error.message };
  }
  return { message: "Email has been sent!" };
}

export {
  login,
  signUp,
  logout,
  revalidateAfterLogout,
  googleLogIn,
  signInWithEmail,
};
