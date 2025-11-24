"use server";

import { createClient } from "@/utils/supabase/server";

const resetPassword = async (prevState: any, formData: FormData) => {
  const supabase = await createClient();

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const retypedPassword = formData.get("retypedPassword") as string;

  // Validate passwords match
  if (newPassword !== retypedPassword) {
    return { error: "New passwords do not match" };
  }

  // Validate password length
  if (newPassword.length < 6) {
    return { error: "New password must be at least 6 characters" };
  }

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Not authenticated" };
  }

  // Verify current password by attempting to sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  });

  if (signInError) {
    return { error: "Current password is incorrect" };
  }

  // Update password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: updateError.message };
  }

  return { message: "Password changed successfully" };
};

export { resetPassword };
