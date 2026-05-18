"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { currentUser, type User } from "@/lib/store";

type Ctx = {
  user: User | undefined;
  refresh: () => void;
  ready: boolean;
};

const UserCtx = createContext<Ctx>({ user: undefined, refresh: () => {}, ready: false });

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [ready, setReady] = useState(false);

  function refresh() {
    setUser(currentUser());
  }

  useEffect(() => {
    refresh();
    setReady(true);
    const handler = () => refresh();
    window.addEventListener("ai-edu-store-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ai-edu-store-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return <UserCtx.Provider value={{ user, refresh, ready }}>{children}</UserCtx.Provider>;
}

export function useUser() {
  return useContext(UserCtx);
}
