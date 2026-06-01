"use client";

import { useLocale } from "./LocaleProvider";
import { LogoMark } from "./Logo";

export function Footer() {
  const { tr } = useLocale();
  return (
    <footer className="border-t border-line mt-16">
      <div className="max-w-5xl mx-auto px-4 py-7 text-center">
        <blockquote className="text-sm italic text-ink-muted leading-relaxed max-w-2xl mx-auto">
          &ldquo;{tr("dewey.quote")}&rdquo;
        </blockquote>
        <p className="mt-2 text-xs text-ink-subtle">{tr("dewey.attribution")}</p>
      </div>
      <div className="border-t border-line/60">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-subtle">
          <div className="flex items-center gap-2">
            <LogoMark size={18} />
            <span className="font-medium text-ink-muted">Personal AI Tutor</span>
          </div>
          <p>{tr("footer.demo")}</p>
        </div>
      </div>
    </footer>
  );
}
