"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { tr as translate, t as dict } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  tr: (key: keyof typeof dict) => string;
};

const LocaleCtx = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem("locale") as Locale | null)) || null;
    if (stored && (stored === "en" || stored === "am" || stored === "om")) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("locale", l);
    } catch {}
    document.documentElement.lang = l === "en" ? "en" : l === "am" ? "am" : "om";
  };

  return (
    <LocaleCtx.Provider value={{ locale, setLocale, tr: (k) => translate(k, locale) }}>
      {children}
    </LocaleCtx.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
