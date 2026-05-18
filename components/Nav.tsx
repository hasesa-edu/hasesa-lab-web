"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LOCALES } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";
import { useUser } from "./UserProvider";
import { apiSignout } from "@/lib/api";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const { locale, setLocale, tr } = useLocale();
  const { user, refresh } = useUser();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await apiSignout();
    await refresh();
    setMenuOpen(false);
    router.push("/");
  }

  const navLink =
    "text-ink-muted hover:text-brand transition-colors text-sm font-medium";

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-canvas/80 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4 sm:gap-6 flex-wrap">
        <Logo />

        <nav className="flex items-center gap-4 sm:gap-5">
          <Link href="/" className={navLink}>{tr("nav.home")}</Link>
          <Link href="/lessons" className={navLink}>{tr("nav.lessons")}</Link>
          <Link href="/chat" className={navLink}>{tr("nav.tutor")}</Link>
          {user && user.role === "student" && (
            <Link href="/dashboard" className={navLink}>{tr("nav.dashboard")}</Link>
          )}
          {user && user.role === "teacher" && (
            <Link href="/teacher" className={navLink}>{tr("nav.teacher")}</Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-full border border-line bg-surface p-0.5 text-xs">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={
                  "px-2.5 py-1 rounded-full transition font-medium " +
                  (locale === l.code
                    ? "bg-brand text-brand-on shadow-soft"
                    : "text-ink-muted hover:text-ink")
                }
                aria-pressed={locale === l.code}
                aria-label={l.label}
              >
                {l.native}
              </button>
            ))}
          </div>

          <ThemeToggle />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-line bg-surface hover:border-brand/60 text-sm transition"
              >
                <span className="w-7 h-7 rounded-full bg-brand text-brand-on text-xs font-bold flex items-center justify-center">
                  {user.displayName.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden sm:inline text-ink">{user.displayName}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-surface border border-line rounded-lg shadow-pop py-1 text-sm min-w-[200px] overflow-hidden">
                  <div className="px-3 py-2 text-xs text-ink-subtle border-b border-line">
                    <div className="text-ink-muted truncate">{user.email}</div>
                    <div className="mt-0.5">
                      {user.role === "teacher" ? tr("auth.role.teacher") : tr("auth.role.student")}
                    </div>
                  </div>
                  {user.role === "student" && (
                    <Link
                      href="/join"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 hover:bg-surface-2 text-ink"
                    >
                      {tr("student.joinClass")}
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 hover:bg-surface-2 text-red-600 dark:text-red-400"
                  >
                    {tr("nav.signout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm px-3 py-1.5 rounded-md text-ink-muted hover:text-ink transition"
              >
                {tr("nav.signin")}
              </Link>
              <Link
                href="/signup"
                className="text-sm px-3.5 py-1.5 rounded-md bg-brand text-brand-on hover:bg-brand-hover font-medium shadow-soft transition"
              >
                {tr("nav.signup")}
              </Link>
            </>
          )}
        </div>

        <div className="sm:hidden flex items-center rounded-full border border-line bg-surface p-0.5 text-xs basis-full">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLocale(l.code)}
              className={
                "flex-1 px-2 py-1 rounded-full transition font-medium " +
                (locale === l.code
                  ? "bg-brand text-brand-on"
                  : "text-ink-muted")
              }
            >
              {l.native}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
