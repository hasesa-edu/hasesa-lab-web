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
    <section className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <h2 className="font-mono text-xs font-normal tracking-[0.08em] text-muted-foreground uppercase">{tr("partners.eyebrow")}</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {partners.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-14 items-center gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-white">
                  <Image src={p.logo} alt={`${p.name} logo`} width={96} height={96} className="size-full object-contain" loading="lazy" />
                </span>
                <span>
                  <span className="block font-medium group-hover:text-primary">{p.name}</span>
                  <span className="block text-sm text-muted-foreground">{p.tag}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
