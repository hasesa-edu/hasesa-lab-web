"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A long page's sections as tabs that stay under the site header: each jumps
 * to its section, and the one being read is highlighted as you scroll.
 */
export function SectionTabs({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    // The current section is the last one whose top has passed the line just under the tabs.
    const pick = () => {
      const line = 140;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      // At the very bottom, the last section counts even if it's short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = els[els.length - 1].id;
      setActive(current);
    };
    const io = new IntersectionObserver(pick, { rootMargin: "-120px 0px -40% 0px", threshold: [0, 1] });
    els.forEach((el) => io.observe(el));
    window.addEventListener("scroll", pick, { passive: true });
    pick();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", pick);
    };
  }, [sections]);

  return (
    <nav aria-label="Sections of this page" className="sticky top-[61px] z-10 border-b border-border bg-background/95 backdrop-blur">
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 [scrollbar-width:none]">
        {sections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "relative flex min-h-12 items-center px-3 text-sm font-medium whitespace-nowrap transition-colors",
                  "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors",
                  on ? "text-foreground after:bg-primary" : "text-muted-foreground after:bg-transparent hover:text-foreground"
                )}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
