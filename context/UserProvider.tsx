'use client';

import { createContext, useContext, useState, useEffect } from 'react';

import { User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';

const UserContext = createContext<User | null>(null);

export function UserProvider({
  initilUser,
  children,
}: {
  initilUser: User;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(initilUser);
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
