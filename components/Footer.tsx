"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { LogoMark } from "./Logo";
import { BRAND } from "@/lib/brand";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const { tr } = useLocale();
  const pathname = usePathname();
  // Dewey quote belongs to the marketing story — keep it on the home page only.
  const showQuote = pathname === "/";
  // Padded so each legal link is a comfortable tap target on phones.
  const legalLinkClass = "inline-flex min-h-10 items-center px-2 rounded-md hover:text-primary";

  return (
    <footer className="border-t border-border mt-16">
      {showQuote && (
        <div className="max-w-5xl mx-auto px-4 py-7 text-center">
          <blockquote className="text-sm italic text-muted-foreground leading-relaxed max-w-xl mx-auto">
            &ldquo;{tr("dewey.quote")}&rdquo;
          </blockquote>
          <p className="mt-2 text-xs text-subtle-foreground">{tr("dewey.attribution")}</p>
        </div>
      )}
      {showQuote && <Separator className="bg-border/60" />}
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-subtle-foreground">
        <div className="flex items-center gap-2">
          <LogoMark size={18} />
          <span className="font-medium text-muted-foreground">{BRAND}</span>
        </div>
        <p className="text-center">{tr("footer.motto")}</p>
        <nav className="flex items-center gap-1" aria-label="Legal">
          <Link href="/terms" className={legalLinkClass}>{tr("footer.terms")}</Link>
          <Link href="/privacy" className={legalLinkClass}>{tr("footer.privacy")}</Link>
          <Link href="/refund" className={legalLinkClass}>{tr("footer.refund")}</Link>
        </nav>
      </div>
    </footer>
  );
}
