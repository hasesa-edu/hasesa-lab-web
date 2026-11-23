"use client";

import Image from "next/image";
import type { t as Dict } from "@/lib/i18n";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

/* ───────────────────────────  PARTNERS  ─────────────────────────── */

export function Partners({ tr }: { tr: TR }) {
  const partners = [
    { href: "https://www.thesciencebasement.org/", logo: "/partners/science-basement.png", name: "The Science Basement", tag: tr("partners.sb.tag") },
    { href: "https://bekurguide.com/organization/magic-carpet-schools", logo: "/partners/magic-carpet.jpg", name: "Magic Carpet Schools", tag: tr("partners.mcs.tag") },
  ];
  return (
    <section className="border-t-2 border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <h2 className="font-bold text-ink/60">{tr("partners.eyebrow")}</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {partners.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-14 items-center gap-3 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-signal/50"
              >
                <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-ink/10">
                  <Image src={p.logo} alt={`${p.name} logo`} width={96} height={96} className="size-full object-contain" loading="lazy" />
                </span>
                <span>
                  <span className="block font-bold group-hover:text-primary">{p.name}</span>
                  <span className="block text-sm text-ink/65">{p.tag}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
