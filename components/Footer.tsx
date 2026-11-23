"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { LogoMark } from "./Logo";
import { BRAND, CONTACT_EMAIL } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Footer() {
  const { tr } = useLocale();
  const pathname = usePathname();
  // The two marketing pages end with the invitation to get in touch; app pages keep the plain bar.
  const showContact = pathname === "/" || pathname === "/academy";
  // Sign-in (student and admin) and payment-return pages fill the screen with their own background; let the footer sit flush under them.
  const flush =
    pathname === "/login" || pathname === "/admin/login" || pathname.startsWith("/billing");
  // Padded so each legal link is a comfortable tap target on phones.
  const legalLinkClass =
    "inline-flex min-h-10 items-center rounded-md px-3 text-white/75 transition-colors hover:bg-white/10 hover:text-white";

  // The one dark surface on the site: ink, quiet, with the contact note on the marketing pages.
  return (
    <footer className={cn("bg-ink text-white/75", !flush && "mt-16")}>
      {showContact && (
        <section className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8 px-4 pt-14 pb-10 sm:pt-20 sm:pb-14">
          <div className="max-w-2xl flex-[999_1_26rem]">
            <h2 className="text-3xl leading-tight font-semibold text-white sm:text-5xl">{tr("footer.contact.title")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{tr("footer.contact.body")}</p>
          </div>
          {CONTACT_EMAIL && (
            <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-xl font-semibold break-all text-white underline-offset-4 hover:underline sm:text-2xl"
              >
                {CONTACT_EMAIL}
              </a>
              <CopyEmail email={CONTACT_EMAIL} />
            </p>
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

/** Copies the contact address; hidden where the clipboard API isn't available. */
function CopyEmail({ email }: { email: string }) {
  const [canCopy, setCanCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => setCanCopy(typeof navigator !== "undefined" && !!navigator.clipboard), []);
  if (!canCopy) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* ignore: the address is still visible to copy by hand */
        }
      }}
      className="inline-flex min-h-9 items-center rounded-md border border-white/25 px-3 font-mono text-xs tracking-[0.08em] text-white/80 uppercase transition-colors hover:bg-white/10 hover:text-white"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
