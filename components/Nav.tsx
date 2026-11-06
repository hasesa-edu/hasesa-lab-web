"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronDownIcon,
  BoxesIcon,
  GraduationCapIcon,
  LogOutIcon,
  MenuIcon,
  MessageCircleIcon,
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
  const signInHref = googleSignInHref(pathname === "/" ? null : pathname);

  const isActive = (href: string) =>
    href.includes("#") ? false : href === "/" ? pathname === "/" : pathname.startsWith(href);

  // On the home page the bar is part of the radio: same enamel as the hero.
  const onHero = pathname === "/";

  // Active link = a teal signal line under it; others are quiet until hovered.
  const navLinkClass = (href: string) =>
    cn(
      "relative inline-flex min-h-10 items-center px-3 font-legible text-[0.95rem] font-bold transition-colors",
      "after:absolute after:inset-x-3 after:bottom-1 after:h-[3px] after:rounded-full after:bg-signal after:transition-transform",
      isActive(href) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-50",
      onHero
        ? isActive(href)
          ? "text-white"
          : "text-enamel-foreground/75 hover:text-white"
        : isActive(href)
          ? "text-ink"
          : "text-ink/60 hover:text-ink"
    );

  const mobileLinkClass = (href: string) =>
    cn(
      "flex min-h-12 w-full items-center gap-3 rounded-xl border-l-4 px-3 font-legible text-base font-bold transition-colors",
      isActive(href) ? "border-signal bg-signal/10 text-ink" : "border-transparent text-ink hover:bg-ink/5"
    );

  const signInClass = cn(
    buttonVariants({ variant: "outline" }),
    "rounded-full bg-white text-[#1f1f1f] hover:bg-white hover:text-[#1f1f1f] hover:border-primary/60 shadow-soft dark:bg-white dark:hover:bg-white"
  );

  const initial = user ? user.displayName.slice(0, 1).toUpperCase() : "";

  const full = user?.access === "enrolled" || user?.access === "guide";
  const links: { href: string; label: string; icon: LucideIcon; show: boolean }[] = [
    { href: "/modules", label: tr("nav.experiments"), icon: BoxesIcon, show: true },
    { href: "/chat", label: tr("nav.assistant"), icon: MessageCircleIcon, show: full },
    { href: "/dashboard", label: tr("nav.dashboard"), icon: NotebookPenIcon, show: !!user },
    { href: "/guide", label: tr("nav.guide"), icon: GraduationCapIcon, show: user?.access === "guide" },
  ];
  const desktopLinks = links.filter((l) => l.show);
  const mobileLinks = [...desktopLinks, { href: "/account", label: tr("nav.account"), icon: UserRoundIcon, show: true }];

  return (
    <header
      className={cn(
        "sticky top-0 z-20 border-b",
        onHero
          ? "border-white/10 bg-enamel text-enamel-foreground"
          : "border-ink/10 bg-lab/90 backdrop-blur supports-[backdrop-filter]:bg-lab/80"
      )}
    >
      <div className={cn("mx-auto flex items-center gap-3 px-4 py-2.5 sm:gap-5", onHero ? "max-w-6xl" : "max-w-5xl")}>
        <Logo tone={onHero ? "light" : "brand"} />

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
                  className="h-10 rounded-full bg-card pl-1 pr-3 hover:border-primary/60 hover:bg-primary-soft/40 data-[state=open]:border-primary/60 data-[state=open]:bg-primary-soft/40"
                >
                  <Avatar className="size-8 after:border-primary/30">
                    <AvatarFallback className="bg-primary text-primary-foreground font-heading text-sm font-bold">
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
              <Link href="/modules" className={cn(navLinkClass("/modules"), "px-3")}>
                {tr("nav.experiments")}
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
                  className="rounded-full bg-card hover:border-primary/60 hover:bg-primary-soft/40"
                >
                  {mobileOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="gap-0 overflow-y-auto bg-background p-0 [&>[data-slot=sheet-close]]:top-3 [&>[data-slot=sheet-close]]:right-3 [&>[data-slot=sheet-close]]:text-deep-foreground [&>[data-slot=sheet-close]:hover]:bg-white/10 [&>[data-slot=sheet-close]:hover]:text-deep-foreground"
              >
                <SheetHeader className="relative overflow-hidden bg-deep px-5 pt-14 pb-6 text-deep-foreground">
                  <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-50" />
                  <div aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/50 blur-3xl" />
                  <div aria-hidden className="absolute -bottom-20 -left-10 size-40 rounded-full bg-sun/20 blur-3xl" />
                  <div className="relative flex items-center gap-3">
                    <Avatar className="size-12 after:border-white/20">
                      <AvatarFallback className="bg-primary text-primary-foreground font-heading text-lg font-bold ring-2 ring-sun/70">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <SheetTitle className="truncate font-heading text-lg font-bold text-deep-foreground">
                        {user.displayName}
                      </SheetTitle>
                      <SheetDescription className="truncate text-sm text-deep-foreground/70">{user.email}</SheetDescription>
                    </div>
                  </div>
                  {user.access !== "signed-in" && (
                    <span className="relative mt-4 inline-flex w-fit rounded-full bg-sun px-2.5 py-0.5 text-xs font-bold text-deep">
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
                            active ? "bg-signal text-white" : "bg-muted text-muted-foreground"
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
