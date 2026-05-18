"use client";

import Link from "next/link";
import { LOCALES } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

export function Nav() {
  const { locale, setLocale, tr } = useLocale();

  return (
    <header className="border-b border-black/5 bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-semibold text-brand-dark text-lg">
          AI-Edu <span className="text-sun">·</span> Ethiopia
        </Link>
        <nav className="flex items-center gap-4 text-sm ml-2">
          <Link href="/" className="hover:text-brand">{tr("nav.home")}</Link>
          <Link href="/lessons" className="hover:text-brand">{tr("nav.lessons")}</Link>
          <Link href="/chat" className="hover:text-brand">{tr("nav.tutor")}</Link>
        </nav>
        <div className="ml-auto flex items-center gap-1 text-xs">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLocale(l.code)}
              className={
                "px-2 py-1 rounded border transition " +
                (locale === l.code
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-stone-600 border-stone-200 hover:border-brand")
              }
              aria-pressed={locale === l.code}
              aria-label={l.label}
            >
              {l.native}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
