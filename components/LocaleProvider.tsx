"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";
import { tr as translate, t as dict } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  tr: (key: keyof typeof dict) => string;
};

const LocaleCtx = createContext<Ctx | null>(null);

// English-only at this stage. Re-introduce locale state + persistence when
// Amharic / Afaan Oromo content is ready.
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const value: Ctx = {
    locale: "en",
    setLocale: () => {},
    tr: (k) => translate(k, "en"),
  };
  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
