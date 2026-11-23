"use client";

import { cn } from "@/lib/utils";
import type { t as Dict } from "@/lib/i18n";
import { SectionLabel } from "./SectionLabel";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

/* ───────────────────────────  WHY  ─────────────────────────── */

/** The thesis in three beats, then / now / next, side by side. The last one carries the accent. */
export function Why({ tr, n = "01" }: { tr: TR; n?: string }) {
  const beats: { label: Key; line: Key; body: Key }[] = [
    { label: "why.then.label", line: "why.then.line", body: "why.then.body" },
    { label: "why.now.label", line: "why.now.line", body: "why.now.body" },
    { label: "why.next.label", line: "why.next.line", body: "why.next.body" },
  ];
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <SectionLabel n={n}>{tr("label.why")}</SectionLabel>
        <ol className="mt-10 grid gap-10 md:grid-cols-3">
          {beats.map((b, i) => {
            const last = i === beats.length - 1;
            return (
              <li key={b.label} className={cn("pt-5", last ? "border-t-2 border-primary" : "border-t border-input")}>
                <p className={cn("font-mono text-xs tracking-[0.08em] uppercase", last ? "text-primary" : "text-muted-foreground")}>
                  {tr(b.label)}
                </p>
                <h2 className={cn("mt-3 text-2xl leading-tight font-semibold sm:text-[1.7rem]", !last && "text-muted-foreground")}>
                  {tr(b.line)}
                </h2>
                <p className={cn("mt-3 leading-relaxed", last ? "text-foreground/80" : "text-muted-foreground")}>{tr(b.body)}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
