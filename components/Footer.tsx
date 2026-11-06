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
  // Sign-in (student and admin) and payment-return pages fill the screen with their own background; let the footer sit flush under them.
  const flush =
    pathname === "/login" || pathname === "/admin/login" || pathname.startsWith("/billing");
  // Padded so each legal link is a comfortable tap target on phones.
  const legalLinkClass =
    "inline-flex min-h-10 items-center rounded-full px-3 text-enamel-foreground/75 transition-colors hover:bg-white/10 hover:text-enamel-foreground";

  return (
    <footer
      className={cn(
        "relative isolate overflow-hidden bg-enamel text-enamel-foreground",
        flush ? "border-t border-white/10" : "mt-16"
      )}
    >
      <div aria-hidden className="absolute -top-32 -right-24 -z-10 size-80 rounded-full bg-signal/25 blur-3xl" />
      {showQuote && (
        <figure className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:pt-20 sm:pb-14 [&>*]:max-w-4xl">
          <span aria-hidden className="block font-dial text-8xl leading-none font-extrabold text-sun">
            &ldquo;
          </span>
          <blockquote className="-mt-4 font-dial text-3xl leading-tight font-bold text-balance sm:-mt-6 sm:text-5xl">
            {tr("dewey.quote")}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 text-sm font-semibold text-enamel-foreground/70">
            <span aria-hidden className="h-0.5 w-8 rounded-full bg-sun" />
            {tr("dewey.attribution")}
          </figcaption>
        </figure>
      )}

      <div className={cn("mx-auto max-w-6xl px-4", showQuote && "border-t border-white/10")}>
        <div className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/" className="inline-flex min-h-10 items-center gap-2.5">
              <LogoMark size={40} tone="light" />
              <span className="font-heading text-lg font-bold tracking-tight">{BRAND}</span>
            </Link>
            <p className="max-w-sm text-sm text-enamel-foreground/70">{tr("footer.motto")}</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-1 text-sm font-medium" aria-label="Legal">
            <Link href="/terms" className={legalLinkClass}>{tr("footer.terms")}</Link>
            <Link href="/privacy" className={legalLinkClass}>{tr("footer.privacy")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
