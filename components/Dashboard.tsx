import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

const Dashboard = async () => {

    const supabase = await createClient();

    const {data:{user}, error} = await supabase.auth.getUser();
    if (!user)
        redirect('/login');

  return (
    <div>
        WELCOM 😎
        USER ID : {user.id}
        USER EMAIL : {user.email}
    </div>
  )
}

export default Dashboard