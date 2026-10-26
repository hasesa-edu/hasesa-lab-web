"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { LogoMark } from "./Logo";
import { BRAND } from "@/lib/brand";

export function Footer() {
  const { tr } = useLocale();
  const pathname = usePathname();
  // Dewey quote belongs to the marketing story — keep it on the home page only.
  const showQuote = pathname === "/";

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
      <div className={showQuote ? "border-t border-border/60" : ""}>
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-subtle-foreground">
          <div className="flex items-center gap-2">
            <LogoMark size={18} />
            <span className="font-medium text-muted-foreground">{BRAND}</span>
          </div>
          <p className="text-center">{tr("footer.motto")}</p>
          <nav className="flex items-center gap-4" aria-label="Legal">
            <Link href="/terms" className="hover:text-primary">{tr("footer.terms")}</Link>
            <Link href="/privacy" className="hover:text-primary">{tr("footer.privacy")}</Link>
            <Link href="/refund" className="hover:text-primary">{tr("footer.refund")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
