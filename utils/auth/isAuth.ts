import { createClient } from "../supabase/server";

export default async function isAuthenticated():Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user) return false;
  return true;
}
