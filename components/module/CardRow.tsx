"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A titled row of cards that scrolls sideways: swipe on phones, arrow
 * buttons on larger screens. CSS scroll-snap does the work.
 */
export function CardRow({
  title,
  sub,
  seeAll,
  children,
  className,
}: {
  title: string;
  sub?: string;
  /** "See all" link, e.g. the catalogue filtered to this row. */
  seeAll?: { href: string; label?: string };
  children: React.ReactNode;
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.9, behavior: "smooth" });

  return (
    <section className={className}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{title}</h2>
          {sub && <p className="mt-1 text-muted-foreground">{sub}</p>}
        </div>
        <div className="flex items-center gap-2">
          {seeAll && (
            <Link href={seeAll.href} className="mr-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              {seeAll.label ?? "See all"} <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scroll(d as 1 | -1)}
              aria-label={d < 0 ? "Scroll back" : "Scroll forward"}
              className="hidden size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted sm:inline-flex"
            >
              {d < 0 ? <ChevronLeft aria-hidden className="size-4" /> : <ChevronRight aria-hidden className="size-4" />}
            </button>
          ))}
        </div>
      </div>
      <ul
        ref={track}
        className={cn(
          "-mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none]",
          "[&>li]:w-[78%] [&>li]:shrink-0 [&>li]:snap-start sm:[&>li]:w-[calc((100%-1rem)/2)] lg:[&>li]:w-[calc((100%-2rem)/3)]"
        )}
      >
        {children}
      </ul>
    </section>
  );
}
