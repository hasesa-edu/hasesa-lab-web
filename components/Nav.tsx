"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LOCALES } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";
import { useUser } from "./UserProvider";
import { apiSignout } from "@/lib/api";

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

  return (
    <header className="border-b border-black/5 bg-white/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 sm:gap-4 flex-wrap">
        <Link href="/" className="font-semibold text-brand-dark text-lg">
          AI-Edu <span className="text-sun">·</span> Ethiopia
        </Link>
        <nav className="flex items-center gap-3 sm:gap-4 text-sm">
          <Link href="/" className="hover:text-brand">{tr("nav.home")}</Link>
          <Link href="/lessons" className="hover:text-brand">{tr("nav.lessons")}</Link>
          <Link href="/chat" className="hover:text-brand">{tr("nav.tutor")}</Link>
          {user && user.role === "student" && (
            <Link href="/dashboard" className="hover:text-brand">{tr("nav.dashboard")}</Link>
          )}
          {user && user.role === "teacher" && (
            <Link href="/teacher" className="hover:text-brand">{tr("nav.teacher")}</Link>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-xs">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={
                  "px-2 py-1 rounded border transition " +
                  (locale === l.code
                    ? "bg-brand text-white border-brand"
                    : "bg-white text-stone-600 border-stone-200 hover:border-brand")
                }
                aria-pressed={locale === l.code}
                aria-label={l.label}
              >
                {l.native}
              </button>
            ))}
          </div>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-stone-200 hover:border-brand text-sm"
              >
                <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
                  {user.displayName.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden sm:inline">{user.displayName}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-stone-200 rounded shadow-lg py-1 text-sm min-w-[180px]">
                  <div className="px-3 py-1.5 text-xs text-stone-500 border-b border-stone-100">
                    {user.email} · {user.role === "teacher" ? tr("auth.role.teacher") : tr("auth.role.student")}
                  </div>
                  {user.role === "student" && (
                    <Link
                      href="/join"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-1.5 hover:bg-stone-50"
                    >
                      {tr("student.joinClass")}
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-1.5 hover:bg-stone-50 text-red-700"
                  >
                    {tr("nav.signout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm px-3 py-1.5 rounded border border-stone-200 hover:border-brand">
                {tr("nav.signin")}
              </Link>
              <Link href="/signup" className="text-sm px-3 py-1.5 rounded bg-brand text-white hover:bg-brand-dark">
                {tr("nav.signup")}
              </Link>
            </>
          )}
        </div>
        <div className="sm:hidden flex items-center gap-1 text-xs basis-full">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLocale(l.code)}
              className={
                "px-2 py-1 rounded border transition " +
                (locale === l.code
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-stone-600 border-stone-200")
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
