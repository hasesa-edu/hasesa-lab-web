"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

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

  const navLinkClass = (href: string) =>
    cn(
      "transition-colors text-sm font-medium",
      isActive(href) ? "text-primary" : "text-muted-foreground hover:text-primary"
    );

  const mobileLinkClass = (href: string) =>
    cn(
      buttonVariants({ variant: "ghost", size: "lg" }),
      "w-full justify-start px-3",
      isActive(href) ? "text-primary bg-primary-soft/40 hover:bg-primary-soft/60 hover:text-primary" : "text-foreground"
    );

  const signInClass = cn(
    buttonVariants({ variant: "outline" }),
    "bg-white text-[#1f1f1f] hover:bg-white hover:text-[#1f1f1f] hover:border-primary/60 shadow-soft dark:bg-white dark:hover:bg-white"
  );

  const initial = user ? user.displayName.slice(0, 1).toUpperCase() : "";

  const mobileLinks: { href: string; label: string }[] = [
    { href: "/", label: tr("nav.home") },
    { href: "/experiments", label: tr("nav.experiments") },
    { href: "/chat", label: tr("nav.assistant") },
    { href: "/dashboard", label: tr("nav.dashboard") },
    { href: "/account", label: tr("nav.account") },
    { href: "/onboarding", label: tr("nav.settings") },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4 sm:gap-6">
        <Logo />

        {user && (
          <nav className="hidden sm:flex items-center gap-5">
            <Link
              href="/"
              className={navLinkClass("/")}
              aria-current={isActive("/") ? "page" : undefined}
            >
              {tr("nav.home")}
            </Link>
            <Link
              href="/experiments"
              className={navLinkClass("/experiments")}
              aria-current={isActive("/experiments") ? "page" : undefined}
            >
              {tr("nav.experiments")}
            </Link>
            <Link
              href="/chat"
              className={navLinkClass("/chat")}
              aria-current={isActive("/chat") ? "page" : undefined}
            >
              {tr("nav.assistant")}
            </Link>
            <Link
              href="/dashboard"
              className={navLinkClass("/dashboard")}
              aria-current={isActive("/dashboard") ? "page" : undefined}
            >
              {tr("nav.dashboard")}
            </Link>
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
                  className="rounded-full bg-card pl-1 pr-3 hover:border-primary/60 hover:bg-card"
                >
                  <Avatar size="sm" className="size-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-foreground">{user.displayName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-auto min-w-[200px] shadow-pop">
                <DropdownMenuLabel className="font-normal text-subtle-foreground">
                  <div className="text-muted-foreground truncate">{user.email}</div>
                  {user.grade && (
                    <div className="mt-0.5">
                      {tr("experiments.grade")} {user.grade}
                    </div>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">{tr("nav.account")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/onboarding">{tr("nav.settings")}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => {
                    void handleSignOut();
                  }}
                >
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
                  className="bg-card hover:border-primary/60"
                >
                  {mobileOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="gap-0 bg-background">
                <SheetHeader className="flex-row items-center gap-3 pr-12">
                  <Avatar size="lg" className="size-9">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <SheetTitle className="text-sm truncate">{user.displayName}</SheetTitle>
                    <SheetDescription className="text-xs truncate">{user.email}</SheetDescription>
                  </div>
                </SheetHeader>
                <Separator />

                <nav className="flex flex-col gap-0.5 p-2">
                  {mobileLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={closeMobile}
                      className={mobileLinkClass(l.href)}
                      aria-current={isActive(l.href) ? "page" : undefined}
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto p-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleSignOut}
                    className="w-full text-destructive hover:text-destructive"
                  >
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
