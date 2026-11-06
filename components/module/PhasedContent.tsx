"use client";

import { useEffect, useRef, useState } from "react";
import type { Components } from "react-markdown";
import { Check } from "lucide-react";
import type { Section } from "@/lib/content/sections";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { openWorkbench } from "@/components/assistant/AssistantPanel";

/**
 * Long steps and concept units, one phase at a time. A sticky bar shows the
 * sequence (1 Do, 2 Notice, 3 Theory…); "Next" moves on. Instructions in "do"
 * phases become tick boxes, remembered on this device, so a student at the
 * bench can keep their place.
 */
export function PhasedContent({
  sections,
  storageKey,
  finish,
}: {
  sections: Section[];
  storageKey: string;
  /** Where the last phase leads: a link (the problems) or the notebook tab. */
  finish: { label: string; href: string } | { label: string; open: "notebook" };
}) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const top = useRef<HTMLDivElement>(null);

  // Restore the phase from the URL hash, and ticks from this device.
  useEffect(() => {
    const id = window.location.hash.replace(/^#phase-/, "");
    const i = sections.findIndex((s) => s.id === id);
    if (i > 0) {
      setActive(i);
      setSeen((s) => new Set(s).add(i));
    }
    try {
      setTicked(JSON.parse(localStorage.getItem(`ticks:${storageKey}`) || "{}"));
    } catch {
      /* private mode: ticks just won't persist */
    }
  }, [sections, storageKey]);

  function go(i: number) {
    setActive(i);
    setSeen((s) => new Set(s).add(i));
    history.replaceState(null, "", `#phase-${sections[i].id}`);
    const y = (top.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 70;
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" });
  }

  function toggle(key: string) {
    setTicked((t) => {
      const next = { ...t, [key]: !t[key] };
      try {
        localStorage.setItem(`ticks:${storageKey}`, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const checklist = (sectionId: string): Components => ({
    li: ({ node, children }) => {
      const key = `${sectionId}:${node?.position?.start.offset ?? 0}`;
      const on = !!ticked[key];
      return (
        <li className="list-none">
          <label className="-ml-6 flex cursor-pointer gap-3 rounded-lg py-1 pr-2">
            <input
              type="checkbox"
              checked={on}
              onChange={() => toggle(key)}
              className="mt-1.5 size-5 shrink-0 cursor-pointer accent-[var(--signal)]"
            />
            <span className={cn("min-w-0 flex-1 [&>p]:m-0", on && "text-ink/45 line-through decoration-ink/30")}>{children}</span>
          </label>
        </li>
      );
    },
  });

  const render = (s: Section) => (
    <section key={s.id} id={`phase-${s.id}`} className="scroll-mt-32">
      <h2 className="font-dial text-4xl leading-none font-bold sm:text-5xl">{s.title}</h2>
      <Markdown className="mt-5" components={s.kind === "do" ? checklist(s.id) : undefined}>
        {s.body}
      </Markdown>
    </section>
  );

  const current = sections[active];
  const last = active === sections.length - 1;

  return (
    <div ref={top}>
      {/* The phase bar: a real sequence, so it's numbered. */}
      <nav aria-label="Phases of this page" className="sticky top-[61px] z-10 -mx-4 border-b border-ink/10 bg-lab/95 backdrop-blur">
        <div className="flex items-center gap-2 px-4">
          <ol className="flex flex-1 gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
            {sections.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={on ? "step" : undefined}
                    className={cn(
                      "relative flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-bold whitespace-nowrap transition-colors",
                      on ? "bg-enamel text-white" : "text-ink/65 hover:text-ink"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-full font-dial text-sm",
                        on ? "bg-sun text-ink" : seen.has(i) ? "bg-signal text-white" : "bg-ink/10"
                      )}
                    >
                      {seen.has(i) && !on ? <Check className="size-3" strokeWidth={3} aria-hidden /> : i + 1}
                    </span>
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      <div className="pt-8">
        <>
            <p className="mb-3 text-sm text-ink/55">
              Part {active + 1} of {sections.length}
            </p>
            {render(current)}
            <div className="mt-10 flex flex-wrap items-center gap-4 border-t-2 border-ink pt-6">
              {last ? (
                "open" in finish ? (
                  <Button size="lg" onClick={() => openWorkbench({ tab: finish.open })} className="bg-ink font-bold text-white hover:bg-ink/90">
                    {finish.label}
                  </Button>
                ) : (
                  <Button asChild size="lg" className="bg-ink font-bold text-white hover:bg-ink/90">
                    <a href={finish.href}>{finish.label}</a>
                  </Button>
                )
              ) : (
                <Button size="lg" onClick={() => go(active + 1)} className="bg-ink font-bold text-white hover:bg-ink/90">
                  Next: {sections[active + 1].label}
                </Button>
              )}
              {active > 0 && (
                <button type="button" onClick={() => go(active - 1)} className="font-bold text-ink/65 hover:text-ink">
                  Back to {sections[active - 1].label}
                </button>
              )}
            </div>
        </>
      </div>
    </div>
  );
}
