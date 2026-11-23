"use client";

import { cn } from "@/lib/utils";
import type { t as Dict } from "@/lib/i18n";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

/* ───────────────────────────  WHY  ─────────────────────────── */

export function Why({ tr }: { tr: TR }) {
  // The story from the deck, told in three beats: then, now, next. It is a
  // real sequence in time, so it gets a line running through it.
  const beats: { label: Key; line: Key; body: Key }[] = [
    { label: "why.then.label", line: "why.then.line", body: "why.then.body" },
    { label: "why.now.label", line: "why.now.line", body: "why.now.body" },
    { label: "why.next.label", line: "why.next.line", body: "why.next.body" },
  ];
  return (
    <section className="border-t-2 border-ink/10">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <ol className="relative space-y-14 border-l-4 border-signal/30 pl-6 sm:space-y-20 sm:pl-12">
          {beats.map((b, i) => {
            const last = i === beats.length - 1;
            return (
              <li key={b.label} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-3 -left-[calc(1.5rem+0.6rem)] size-4 rounded-full ring-4 ring-lab sm:-left-[calc(3rem+0.6rem)]",
                    last ? "bg-sun" : "bg-signal"
                  )}
                />
                <p className={cn("text-sm font-bold", last ? "text-chemistry" : "text-primary")}>{tr(b.label)}</p>
                <h2
                  className={cn(
                    "mt-1 max-w-4xl font-dial leading-[0.95] font-bold",
                    last ? "text-5xl text-ink sm:text-7xl lg:text-8xl" : "text-4xl text-ink/70 sm:text-6xl"
                  )}
                >
                  {tr(b.line)}
                </h2>
                <p className={cn("mt-4 max-w-2xl text-lg leading-relaxed", last ? "text-ink/85" : "text-ink/60")}>{tr(b.body)}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
