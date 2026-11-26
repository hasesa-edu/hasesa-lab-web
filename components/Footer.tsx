"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRightIcon, MailIcon } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { LogoMark } from "./Logo";
import { BRAND, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/brand";
import { cn } from "@/lib/utils";

const labelClass = "font-mono text-xs tracking-[0.08em] text-white/50 uppercase";
const linkClass = "inline-flex min-h-9 items-center gap-2 text-sm text-white/80 transition-colors hover:text-white";
const legalLinkClass = "inline-flex min-h-9 items-center text-white/60 transition-colors hover:text-white";

/*
 * The one dark surface on the site. Marketing pages get the full footer on a
 * single 12-column grid: brand and note, Explore, Get in touch, then a thin
 * legal bar. App pages get the legal bar only. Left-aligned at every width.
 */
export function Footer() {
  const { tr } = useLocale();
  const pathname = usePathname();
  const full = pathname === "/" || pathname === "/academy";
  // Sign-in (student and admin) and payment-return pages fill the screen with their own background; let the footer sit flush under them.
  const flush = pathname === "/login" || pathname.startsWith("/billing");
  const hasContact = !!CONTACT_EMAIL || SOCIAL_LINKS.length > 0;
  const year = new Date().getFullYear();

  return (
    <footer className={cn("bg-ink text-white/70", !flush && "mt-16")}>
      <div className="mx-auto max-w-6xl px-4">
        {full && (
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-14 pb-12 sm:pt-16 lg:grid-cols-12">
            <div className="col-span-2 lg:col-span-6">
              <Link href="/" className="inline-flex items-center gap-3 text-white">
                <LogoMark size={44} tone="light" />
                <span className="font-display text-lg font-semibold tracking-[-0.02em]">{BRAND}</span>
              </Link>
              <p className="mt-5 max-w-md text-base leading-relaxed text-pretty sm:text-lg">{tr("footer.contact.body")}</p>
            </div>

            <nav aria-label={tr("footer.explore.label")} className="lg:col-span-3">
              <p className={labelClass}>{tr("footer.explore.label")}</p>
              <ul className="mt-4">
                <li><Link href="/" className={linkClass}>{tr("footer.explore.home")}</Link></li>
                <li><Link href="/academy" className={linkClass}>{tr("footer.explore.academy")}</Link></li>
                <li><Link href="/modules" className={linkClass}>{tr("footer.explore.modules")}</Link></li>
                <li><Link href="/academy#faq" className={linkClass}>{tr("footer.explore.faq")}</Link></li>
              </ul>
            </nav>

            {hasContact && (
              <div className="min-w-0 lg:col-span-3">
                <p className={labelClass}>{tr("footer.contact.label")}</p>
                <ul className="mt-4">
                  {CONTACT_EMAIL && (
                    <li>
                      <a href={`mailto:${CONTACT_EMAIL}`} className={cn(linkClass, "break-all")}>
                        <MailIcon aria-hidden className="size-4 shrink-0 text-white/50" />
                        {CONTACT_EMAIL}
                      </a>
                    </li>
                  )}
                  {SOCIAL_LINKS.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {l.label}
                        <ArrowUpRightIcon aria-hidden className="size-3.5 shrink-0 text-white/50" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 text-xs text-white/50",
            full && "border-t border-white/10"
          )}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {!full && (
              <Link href="/" aria-label={BRAND} className="mr-1 inline-flex min-h-9 items-center">
                <LogoMark size={32} tone="light" />
              </Link>
            )}
            <span>
              © {year} {BRAND}
            </span>
            <span aria-hidden>·</span>
            <span>{tr("footer.motto")}</span>
          </div>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link href="/terms" className={legalLinkClass}>{tr("footer.terms")}</Link>
            <Link href="/privacy" className={legalLinkClass}>{tr("footer.privacy")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
