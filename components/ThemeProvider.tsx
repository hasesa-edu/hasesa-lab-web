"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ThemePref = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

type Ctx = {
  theme: ThemePref;
  resolved: ResolvedTheme;
  setTheme: (t: ThemePref) => void;
  toggle: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "ai-edu-theme";

function systemPref(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// TEMP: app is light-only for now — toggle is hidden in the Nav and we ignore
// whatever's stored / preferred and always apply light. Remove the override to re-enable.
const LIGHT_ONLY = true;

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  const effective: ResolvedTheme = LIGHT_ONLY ? "light" : resolved;
  root.classList.toggle("dark", effective === "dark");
  root.style.colorScheme = effective;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePref>("system");
  const [resolved, setResolved] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as ThemePref | null) ?? "system";
    setThemeState(stored);
    const next: ResolvedTheme = stored === "system" ? systemPref() : stored;
    setResolved(next);
    applyTheme(next);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const next: ResolvedTheme = e.matches ? "dark" : "light";
      setResolved(next);
      applyTheme(next);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: ThemePref) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    const next: ResolvedTheme = t === "system" ? systemPref() : t;
    setResolved(next);
    applyTheme(next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, setTheme]);

  return (
    <ThemeCtx.Provider value={{ theme, resolved, setTheme, toggle }}>{children}</ThemeCtx.Provider>
  );
}

export function useTheme() {
  const v = useContext(ThemeCtx);
  if (!v) throw new Error("useTheme must be used inside ThemeProvider");
  return v;
}

// Inline script string for <head> to avoid flash of incorrect theme.
// TEMP: light-only — always strips any dark class and sets color-scheme: light.
// To restore dark support, revert this alongside the LIGHT_ONLY override above.
export const themeBootstrapScript = `(() => {
  try {
    var root = document.documentElement;
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  } catch (e) {}
})();`;
