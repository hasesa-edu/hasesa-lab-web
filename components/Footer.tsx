"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { LogoMark } from "./Logo";
import { ArrowUpRightIcon, MailIcon } from "lucide-react";
import { BRAND, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Footer() {
  const { tr } = useLocale();
  const pathname = usePathname();
  // The two marketing pages end with the invitation to get in touch; app pages keep the plain bar.
  const showContact = pathname === "/" || pathname === "/academy";
  // Sign-in (student and admin) and payment-return pages fill the screen with their own background; let the footer sit flush under them.
  const flush =
    pathname === "/login" || pathname === "/admin/login" || pathname.startsWith("/billing");
  const contactLinkClass = "inline-flex min-h-10 items-center gap-2 text-base break-all text-white/90 transition-colors hover:text-white";
  // Padded so each legal link is a comfortable tap target on phones.
  const legalLinkClass =
    "inline-flex min-h-10 items-center rounded-md px-3 text-white/75 transition-colors hover:bg-white/10 hover:text-white";

  // The one dark surface on the site: ink, quiet, with the contact note on the marketing pages.
  return (
    <footer className={cn("bg-ink text-white/75", !flush && "mt-16")}>
      {showContact && (
        <section className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-16 gap-y-10 px-4 pt-14 pb-10 sm:pt-20 sm:pb-14">
          <div className="max-w-2xl flex-[999_1_26rem]">
            <p className="text-xl leading-relaxed text-pretty text-white sm:text-2xl sm:leading-snug">{tr("footer.contact.body")}</p>
          </div>
          {(CONTACT_EMAIL || SOCIAL_LINKS.length > 0) && (
            <div className="min-w-56 flex-1 sm:pt-2">
              <p className="font-mono text-xs tracking-[0.08em] text-white/60 uppercase">{tr("footer.contact.label")}</p>
              <ul className="mt-4 space-y-1">
                {CONTACT_EMAIL && (
                  <li>
                    <a href={`mailto:${CONTACT_EMAIL}`} className={contactLinkClass}>
                      <MailIcon aria-hidden className="size-4 shrink-0 text-white/60" />
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                )}
                {SOCIAL_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                      {l.label}
                      <ArrowUpRightIcon aria-hidden className="size-4 shrink-0 text-white/60" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left",
            showContact && "border-t border-white/10"
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

