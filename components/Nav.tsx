"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "./LocaleProvider";
import { useUser } from "./UserProvider";
import { apiSignout } from "@/lib/api";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const { tr } = useLocale();
  const { user, refresh } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  // Close menus on outside-click and on Escape.
  useEffect(() => {
    if (!menuOpen && !mobileOpen) return;
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
      if (
        mobileOpen &&
        mobilePanelRef.current &&
        !mobilePanelRef.current.contains(target) &&
        hamburgerBtnRef.current &&
        !hamburgerBtnRef.current.contains(target)
      ) {
        setMobileOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, mobileOpen]);

  async function handleSignOut() {
    await apiSignout();
    await refresh();
    setMenuOpen(false);
    setMobileOpen(false);
    router.push("/");
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinkClass = (href: string) =>
    "transition-colors text-sm font-medium " +
    (isActive(href) ? "text-brand" : "text-ink-muted hover:text-brand");

  const mobileLinkClass = (href: string) =>
    "block px-3 py-3 rounded-md text-base font-medium " +
    (isActive(href)
      ? "text-brand bg-brand-soft/40"
      : "text-ink hover:bg-surface-2");

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4 sm:gap-6">
        <Logo />

        <nav className="hidden sm:flex items-center gap-5">
          <Link
            href="/"
            className={navLinkClass("/")}
            aria-current={isActive("/") ? "page" : undefined}
          >
            {tr("nav.home")}
          </Link>
          <Link
            href="/lessons"
            className={navLinkClass("/lessons")}
            aria-current={isActive("/lessons") ? "page" : undefined}
          >
            {tr("nav.lessons")}
          </Link>
          <Link
            href="/chat"
            className={navLinkClass("/chat")}
            aria-current={isActive("/chat") ? "page" : undefined}
          >
            {tr("nav.tutor")}
          </Link>
          {user && user.role === "student" && (
            <Link
              href="/dashboard"
              className={navLinkClass("/dashboard")}
              aria-current={isActive("/dashboard") ? "page" : undefined}
            >
              {tr("nav.dashboard")}
            </Link>
          )}
          {user && user.role === "teacher" && (
            <Link
              href="/teacher"
              className={navLinkClass("/teacher")}
              aria-current={isActive("/teacher") ? "page" : undefined}
            >
              {tr("nav.teacher")}
            </Link>
          )}
        </nav>

        <div className="ml-auto hidden sm:flex items-center gap-2">
          {/* TEMP: theme toggle hidden — light-only for now */}
          <ThemeToggle className="hidden" />

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-line bg-surface hover:border-brand/60 text-sm transition"
              >
                <span className="w-7 h-7 rounded-full bg-brand text-brand-on text-xs font-bold flex items-center justify-center">
                  {user.displayName.slice(0, 1).toUpperCase()}
                </span>
                <span className="text-ink">{user.displayName}</span>
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

        <div className="ml-auto flex sm:hidden items-center gap-1.5">
          {/* TEMP: theme toggle hidden — light-only for now */}
          <ThemeToggle className="hidden" />
          {!user && (
            <Link
              href="/signup"
              className="text-sm px-3 py-1.5 rounded-md bg-brand text-brand-on hover:bg-brand-hover font-semibold shadow-soft transition"
            >
              {tr("nav.signup")}
            </Link>
          )}
          <button
            ref={hamburgerBtnRef}
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            className="w-11 h-11 inline-flex items-center justify-center rounded-md border border-line bg-surface text-ink hover:border-brand/60 transition"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          ref={mobilePanelRef}
          className="sm:hidden border-t border-line bg-canvas"
        >
          <div className="max-w-5xl mx-auto px-4 py-3 space-y-3">
            {user && (
              <div className="flex items-center gap-3 px-1 pb-2 border-b border-line">
                <span className="w-9 h-9 rounded-full bg-brand text-brand-on text-sm font-bold flex items-center justify-center">
                  {user.displayName.slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-ink truncate">{user.displayName}</div>
                  <div className="text-xs text-ink-muted truncate">{user.email}</div>
                </div>
              </div>
            )}

            <nav className="flex flex-col">
              <Link href="/" onClick={closeMobile} className={mobileLinkClass("/")} aria-current={isActive("/") ? "page" : undefined}>{tr("nav.home")}</Link>
              <Link href="/lessons" onClick={closeMobile} className={mobileLinkClass("/lessons")} aria-current={isActive("/lessons") ? "page" : undefined}>{tr("nav.lessons")}</Link>
              <Link href="/chat" onClick={closeMobile} className={mobileLinkClass("/chat")} aria-current={isActive("/chat") ? "page" : undefined}>{tr("nav.tutor")}</Link>
              {user && user.role === "student" && (
                <>
                  <Link href="/dashboard" onClick={closeMobile} className={mobileLinkClass("/dashboard")} aria-current={isActive("/dashboard") ? "page" : undefined}>{tr("nav.dashboard")}</Link>
                  <Link href="/join" onClick={closeMobile} className={mobileLinkClass("/join")} aria-current={isActive("/join") ? "page" : undefined}>{tr("student.joinClass")}</Link>
                </>
              )}
              {user && user.role === "teacher" && (
                <Link href="/teacher" onClick={closeMobile} className={mobileLinkClass("/teacher")} aria-current={isActive("/teacher") ? "page" : undefined}>{tr("nav.teacher")}</Link>
              )}
            </nav>

            <div className="pt-1">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="block w-full text-center px-3 py-2.5 rounded-md border border-line text-red-600 dark:text-red-400 font-medium hover:bg-surface-2 transition"
                >
                  {tr("nav.signout")}
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={closeMobile}
                    className="text-center px-3 py-2.5 rounded-md border border-line text-ink font-medium hover:bg-surface-2 transition"
                  >
                    {tr("nav.signin")}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMobile}
                    className="text-center px-3 py-2.5 rounded-md bg-brand text-brand-on hover:bg-brand-hover font-medium shadow-soft transition"
                  >
                    {tr("nav.signup")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
