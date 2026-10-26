"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronDownIcon,
  FlaskConicalIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MessageCircleIcon,
  NotebookPenIcon,
  ReceiptIcon,
  SlidersHorizontalIcon,
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

  // Active link = teal-tinted pill; others are quiet until hovered.
  const navLinkClass = (href: string) =>
    cn(
      "inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-semibold transition-colors",
      isActive(href)
        ? "bg-primary-soft text-primary-strong dark:text-primary"
        : "text-muted-foreground hover:bg-primary-soft/50 hover:text-primary-strong"
    );

  const mobileLinkClass = (href: string) =>
    cn(
      "flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-base font-semibold transition-colors",
      isActive(href)
        ? "bg-primary-soft text-primary-strong dark:text-primary"
        : "text-foreground hover:bg-primary-soft/50 hover:text-primary-strong"
    );

  const signInClass = cn(
    buttonVariants({ variant: "outline" }),
    "rounded-full bg-white text-[#1f1f1f] hover:bg-white hover:text-[#1f1f1f] hover:border-primary/60 shadow-soft dark:bg-white dark:hover:bg-white"
  );

  const initial = user ? user.displayName.slice(0, 1).toUpperCase() : "";

  const desktopLinks: { href: string; label: string }[] = [
    { href: "/", label: tr("nav.home") },
    { href: "/experiments", label: tr("nav.experiments") },
    { href: "/chat", label: tr("nav.assistant") },
    { href: "/dashboard", label: tr("nav.dashboard") },
  ];

  const mobileLinks: { href: string; label: string; icon: LucideIcon }[] = [
    { href: "/", label: tr("nav.home"), icon: HomeIcon },
    { href: "/experiments", label: tr("nav.experiments"), icon: FlaskConicalIcon },
    { href: "/chat", label: tr("nav.assistant"), icon: MessageCircleIcon },
    { href: "/dashboard", label: tr("nav.dashboard"), icon: NotebookPenIcon },
    { href: "/account", label: tr("nav.account"), icon: ReceiptIcon },
    { href: "/onboarding", label: tr("nav.settings"), icon: SlidersHorizontalIcon },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center gap-3 sm:gap-5">
        <Logo />

        {user && (
          <nav className="hidden sm:flex items-center gap-1">
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
        )}

        <div className="ml-auto hidden sm:flex items-center gap-2">
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
                  {user.grade && (
                    <span className="mt-1.5 inline-flex rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary-strong dark:text-primary">
                      {tr("experiments.grade")} {user.grade}
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="min-h-9">
                  <Link href="/account">
                    <ReceiptIcon />
                    {tr("nav.account")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="min-h-9">
                  <Link href="/onboarding">
                    <SlidersHorizontalIcon />
                    {tr("nav.settings")}
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

        <div className="ml-auto flex sm:hidden items-center gap-1.5">
          {/* TEMP: theme toggle hidden — light-only for now */}
          <ThemeToggle className="hidden" />
          {!user && (
            <a href={signInHref} className={cn(signInClass, "px-3")}>
              <GoogleIcon size={16} />
              {tr("nav.signin")}
            </a>
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
                  {user.grade && (
                    <span className="relative mt-4 inline-flex w-fit rounded-full bg-sun px-2.5 py-0.5 text-xs font-bold text-deep">
                      {tr("experiments.grade")} {user.grade}
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
