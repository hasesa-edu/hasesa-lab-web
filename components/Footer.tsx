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
  // Dewey quote belongs to the marketing story — keep it on the home and Academy pages only.
  const showQuote = pathname === "/" || pathname === "/academy";
  // Sign-in (student and admin) and payment-return pages fill the screen with their own background; let the footer sit flush under them.
  const flush =
    pathname === "/login" || pathname === "/admin/login" || pathname.startsWith("/billing");
  // Padded so each legal link is a comfortable tap target on phones.
  const legalLinkClass =
    "inline-flex min-h-10 items-center rounded-md px-3 text-white/75 transition-colors hover:bg-white/10 hover:text-white";

  // The one dark surface on the site: ink, quiet, with the Dewey quote on the marketing pages.
  return (
    <footer className={cn("bg-ink text-white/75", !flush && "mt-16")}>
      {showQuote && (
        <figure className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:pt-20 sm:pb-14">
          <blockquote className="max-w-4xl font-display text-2xl leading-snug font-medium tracking-[-0.015em] text-balance text-white sm:text-3xl">
            &ldquo;{tr("dewey.quote")}&rdquo;
          </blockquote>
          <figcaption className="mt-4 font-mono text-xs tracking-[0.08em] text-white/60 uppercase">
            — {tr("dewey.attribution")}
          </figcaption>
        </figure>
      )}

      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left",
            showQuote && "border-t border-white/10"
          )}
        >
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
            <Link href="/" className="inline-flex min-h-10 items-center gap-2.5 text-white">
              <LogoMark size={36} tone="light" />
              <span className="font-display text-base font-semibold tracking-[-0.02em]">{BRAND}</span>
            </Link>
            <p className="text-sm text-white/60">{tr("footer.motto")}</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-1 text-sm" aria-label="Legal">
            <Link href="/terms" className={legalLinkClass}>{tr("footer.terms")}</Link>
            <Link href="/privacy" className={legalLinkClass}>{tr("footer.privacy")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
