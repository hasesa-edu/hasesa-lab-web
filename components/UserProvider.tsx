"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiMe, type UserDTO } from "@/lib/api";

type Ctx = {
  user: UserDTO | undefined;
  refresh: () => Promise<void>;
  ready: boolean;
};

const UserCtx = createContext<Ctx>({ user: undefined, refresh: async () => {}, ready: false });

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDTO | undefined>(undefined);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const u = await apiMe();
      setUser(u ?? undefined);
    } catch {
      setUser(undefined);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await refresh();
      setReady(true);
    })();
  }, [refresh]);

  return <UserCtx.Provider value={{ user, refresh, ready }}>{children}</UserCtx.Provider>;
}

export function useUser() {
  return useContext(UserCtx);
}
