"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { LogoMark } from "./Logo";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Footer() {
  const { tr } = useLocale();
  const pathname = usePathname();
  // Dewey quote belongs to the marketing story — keep it on the home page only.
  const showQuote = pathname === "/";
  // Sign-in (student and admin), onboarding and payment-return pages fill the screen with their own background; let the footer sit flush under them.
  const flush =
    pathname === "/login" || pathname === "/admin/login" || pathname.startsWith("/onboarding") || pathname.startsWith("/billing");
  // Padded so each legal link is a comfortable tap target on phones.
  const legalLinkClass =
    "inline-flex min-h-10 items-center rounded-full px-3 text-deep-foreground/75 transition-colors hover:bg-white/10 hover:text-deep-foreground";

  return (
    <footer
      className={cn(
        "relative isolate overflow-hidden bg-deep text-deep-foreground",
        flush ? "border-t border-white/10" : "mt-16"
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-40" />
      <div aria-hidden className="absolute -top-32 -right-24 -z-10 size-80 rounded-full bg-primary/40 blur-3xl" />
      {showQuote && (
        <div aria-hidden className="absolute -bottom-24 -left-24 -z-10 size-72 rounded-full bg-sun/15 blur-3xl" />
      )}

      {showQuote && (
        <figure className="mx-auto max-w-4xl px-4 pt-14 pb-10 sm:pt-20 sm:pb-14">
          <span aria-hidden className="block font-heading text-7xl leading-none font-extrabold text-sun sm:text-8xl">
            &ldquo;
          </span>
          <blockquote className="-mt-4 font-heading text-2xl leading-snug font-bold tracking-tight text-balance sm:-mt-6 sm:text-4xl">
            {tr("dewey.quote")}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 text-sm font-semibold text-deep-foreground/70">
            <span aria-hidden className="h-0.5 w-8 rounded-full bg-sun" />
            {tr("dewey.attribution")}
          </figcaption>
        </figure>
      )}

      <div className={cn("mx-auto max-w-5xl px-4", showQuote && "border-t border-white/10")}>
        <div className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/" className="inline-flex min-h-10 items-center gap-2.5">
              <LogoMark size={28} />
              <span className="font-heading text-lg font-bold tracking-tight">{BRAND}</span>
            </Link>
            <p className="max-w-sm text-sm text-deep-foreground/70">{tr("footer.motto")}</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-1 text-sm font-medium" aria-label="Legal">
            <Link href="/terms" className={legalLinkClass}>{tr("footer.terms")}</Link>
            <Link href="/privacy" className={legalLinkClass}>{tr("footer.privacy")}</Link>
            <Link href="/refund" className={legalLinkClass}>{tr("footer.refund")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
