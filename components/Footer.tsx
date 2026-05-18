"use client";

import { useLocale } from "./LocaleProvider";

export function Footer() {
  const { tr } = useLocale();
  return (
    <footer className="border-t border-black/5 mt-16 py-6 text-center text-xs text-stone-500">
      {tr("footer.demo")}
    </footer>
  );
}
