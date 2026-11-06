"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import type { ModuleSummary } from "@/lib/content/types";
import { SUBJECT_STYLES, SubjectLabel } from "@/components/Subject";
import { cn } from "@/lib/utils";
import { BeakerDoodle, ClawDoodle, RadioDoodle } from "./Doodles";

// Where each case card sits on the bench: depth, tilt and offset.
const LAYOUT = [
  { z: 60, tilt: -3, x: "lg:-ml-2" },
  { z: 20, tilt: 2.5, x: "sm:ml-10" },
  { z: 90, tilt: -1.5, x: "sm:ml-4" },
];

/** The last sentence of a hook is the mystery itself. */
function mysteryOf(m: ModuleSummary) {
  return m.hook.match(/[^.!?…—]*\?\s*$/)?.[0].trim() || m.tagline;
}

/**
 * A 3D workbench: the module mysteries as taped case cards at different depths,
 * with doodles around them. The bench tilts toward the pointer on desktop and
 * sways gently on its own otherwise. Reduced motion keeps it still and flat.
 */
export function Workbench({ modules, hoursLabel }: { modules: ModuleSummary[]; hoursLabel: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!motionOk || !finePointer) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      el.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // -1…1 across a generous area around the bench.
      x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 1.2)));
      y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 1.2)));
      setTracking(true);
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-md [perspective:1200px] lg:max-w-lg">
      {/* Doodles pinned around the bench (desktop gets all three, phones one). */}
      <RadioDoodle className="absolute -top-28 left-2 hidden w-32 lg:block" />
      <BeakerDoodle className="absolute -bottom-24 left-6 hidden w-16 lg:block" />
      <ClawDoodle className="absolute right-0 -bottom-24 hidden w-28 lg:block" />

      <div
        ref={stage}
        className={cn("relative transition-transform duration-300 ease-out [transform-style:preserve-3d]", !tracking && "sway")}
      >
        <ul className="relative flex flex-col gap-4 [transform-style:preserve-3d]">
          {modules.slice(0, 3).map((m, i) => {
            const lead = m.disciplines[0];
            const st = SUBJECT_STYLES[lead];
            const pos = LAYOUT[i % LAYOUT.length];
            return (
              <li
                key={m.id}
                className={cn("relative", pos.x)}
                style={{ transform: `translateZ(${pos.z}px) rotate(${pos.tilt}deg)` }}
              >
                <Link
                  href={`/modules/${m.id}`}
                  className="group relative block rounded-xl bg-card p-4 pt-5 text-card-foreground shadow-pop ring-1 ring-ink/10 transition hover:-translate-y-1 hover:ring-sun focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:p-5 sm:pt-6"
                >
                  {/* masking tape holding the card down */}
                  <span aria-hidden className="tape absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2" />
                  {/* index-card ruling */}
                  <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1 rounded-t-xl", st.bg)} />
                  <div className="flex items-center justify-between gap-3">
                    <SubjectLabel subject={lead} />
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="size-3" /> ~{m.hours} {hoursLabel}
                    </span>
                  </div>
                  <p className="mt-2 font-heading text-lg leading-snug font-extrabold text-ink sm:text-xl dark:text-foreground">
                    &ldquo;{mysteryOf(m)}&rdquo;
                  </p>
                  <p className="mt-1.5 flex items-center gap-1 text-sm font-semibold text-primary-strong dark:text-primary">
                    {m.title}: {m.tagline}
                    <ArrowRight className="size-3.5 shrink-0 transition group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
