"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronDownIcon,
  BoxesIcon,
  FlaskConicalIcon,
  GraduationCapIcon,
  LogOutIcon,
  MenuIcon,
  NotebookPenIcon,
  UserRoundIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { useUser } from "./UserProvider";
import { apiSignout } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { GoogleIcon, googleSignInHref } from "./GoogleButton";
import { ThemeToggle } from "./ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Nav() {
  const { tr } = useLocale();
  const { user, refresh } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await apiSignout();
    // Older versions of the service worker cached signed-in pages; drop them.
    if (typeof caches !== "undefined") {
      const keys = await caches.keys().catch(() => [] as string[]);
      await Promise.all(keys.filter((k) => k.includes("-pages-")).map((k) => caches.delete(k)));
    }
    await refresh();
    setMenuOpen(false);
    setMobileOpen(false);
    router.push("/");
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  // Signing in from the header returns the visitor to the page they were on.
  // From the two marketing pages it goes to the default destination instead.
  const signInHref = googleSignInHref(pathname === "/" || pathname === "/academy" ? null : pathname);

  const isActive = (href: string) =>
    href.includes("#") ? false : href === "/" ? pathname === "/" : pathname.startsWith(href);

  // A white bar with a hairline under it on every page.
  // Active link = ink with a thin teal line under it; others are muted until hovered.
  const navLinkClass = (href: string) =>
    cn(
      "relative inline-flex min-h-10 items-center px-3 text-[0.95rem] font-medium transition-colors",
      "after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:bg-primary after:transition-transform",
      isActive(href) ? "after:scale-x-100" : "after:scale-x-0",
      isActive(href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    );

  const mobileLinkClass = (href: string) =>
    cn(
      "flex min-h-12 w-full items-center gap-3 rounded-lg border-l-2 px-3 text-base font-medium transition-colors",
      isActive(href) ? "border-primary bg-accent text-foreground" : "border-transparent text-foreground hover:bg-muted"
    );

  const signInClass = cn(
    buttonVariants({ variant: "outline" }),
    "rounded-lg border-input bg-card text-foreground hover:bg-muted hover:text-foreground"
  );

  const initial = user ? user.displayName.slice(0, 1).toUpperCase() : "";

  const full = user?.access === "enrolled" || user?.access === "guide";
  const links: { href: string; label: string; icon: LucideIcon; show: boolean }[] = [
    { href: "/academy", label: tr("nav.academy"), icon: FlaskConicalIcon, show: true },
    { href: "/modules", label: tr("nav.experiments"), icon: BoxesIcon, show: true },
    { href: "/dashboard", label: tr("nav.dashboard"), icon: NotebookPenIcon, show: !!user },
    { href: "/guide", label: tr("nav.guide"), icon: GraduationCapIcon, show: user?.access === "guide" },
  ];
  const desktopLinks = links.filter((l) => l.show);
  const mobileLinks = [...desktopLinks, { href: "/account", label: tr("nav.account"), icon: UserRoundIcon, show: true }];

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card text-foreground">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:gap-5">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {desktopLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={navLinkClass(l.href)}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-2">
          {/* TEMP: theme toggle hidden — light-only for now */}
          <ThemeToggle className="hidden" />

          {user ? (
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 rounded-lg bg-card pl-1 pr-3 hover:bg-muted data-[state=open]:bg-muted"
                >
                  <Avatar className="size-8 after:border-primary/30">
                    <AvatarFallback className="bg-foreground text-background font-display text-sm font-semibold">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[10rem] truncate font-semibold text-foreground">{user.displayName}</span>
                  <ChevronDownIcon className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-auto min-w-[240px] shadow-pop">
                <DropdownMenuLabel className="font-normal">
                  <div className="truncate font-semibold text-foreground">{user.displayName}</div>
                  <div className="truncate text-muted-foreground">{user.email}</div>
                  {user.access !== "signed-in" && (
                    <span className="mt-1.5 inline-flex rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary-strong dark:text-primary">
                      {user.access === "guide" ? "Guide" : "Enrolled"}
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="min-h-9">
                  <Link href="/account">
                    <UserRoundIcon />
                    {tr("nav.account")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  className="min-h-9"
                  onSelect={() => {
                    void handleSignOut();
                  }}
                >
                  <LogOutIcon />
                  {tr("nav.signout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a href={signInHref} className={signInClass}>
              <GoogleIcon size={16} />
              {tr("nav.signin")}
            </a>
          )}
        </div>

        <div className="ml-auto flex md:hidden items-center gap-1.5">
          {/* TEMP: theme toggle hidden — light-only for now */}
          <ThemeToggle className="hidden" />
          {!user && (
            <>
              {/* Only room for one link next to Sign in on phones; the Academy page leads on to the modules. */}
              <Link href="/academy" className={cn(navLinkClass("/academy"), "px-3")}>
                {tr("nav.academy")}
              </Link>
              <a href={signInHref} className={cn(signInClass, "px-3")} aria-label={tr("nav.signin")}>
                <GoogleIcon size={16} />
                Sign in
              </a>
            </>
          )}
          {user && (
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-lg"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  className="rounded-lg bg-card hover:bg-muted"
                >
                  {mobileOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="gap-0 overflow-y-auto bg-background p-0 [&>[data-slot=sheet-close]]:top-3 [&>[data-slot=sheet-close]]:right-3"
              >
                <SheetHeader className="border-b border-border bg-card px-5 pt-14 pb-6">
                  <div className="relative flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-foreground text-background font-display text-lg font-semibold">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <SheetTitle className="truncate font-display text-lg font-semibold">
                        {user.displayName}
                      </SheetTitle>
                      <SheetDescription className="truncate text-sm text-muted-foreground">{user.email}</SheetDescription>
                    </div>
                  </div>
                  {user.access !== "signed-in" && (
                    <span className="mt-4 inline-flex w-fit rounded-full bg-foreground px-2.5 py-0.5 font-mono text-[11px] tracking-[0.08em] text-background uppercase">
                      {user.access === "guide" ? "Guide" : "Enrolled"}
                    </span>
                  )}
                </SheetHeader>

                <nav className="flex flex-col gap-1 p-3">
                  {mobileLinks.map((l) => {
                    const Icon = l.icon;
                    const active = isActive(l.href);
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={closeMobile}
                        className={mobileLinkClass(l.href)}
                        aria-current={active ? "page" : undefined}
                      >
                        <span
                          className={cn(
                            "inline-flex size-8 shrink-0 items-center justify-center rounded-lg [&_svg]:size-4",
                            active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}
                        >
                          <Icon aria-hidden />
                        </span>
                        {l.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto border-t border-border p-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleSignOut}
                    className="w-full text-destructive hover:text-destructive"
                  >
                    <LogOutIcon />
                    {tr("nav.signout")}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
