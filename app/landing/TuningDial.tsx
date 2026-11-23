"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { mysteryOf, type Station } from "@/lib/stations";

// The medium-wave band, the one the Radio module's crystal radio receives.
export const MIN_KHZ = 530;
export const MAX_KHZ = 1700;
const STEP = 10;
// How close (kHz) the needle must be to hear a station, and to snap onto it.
const CAPTURE = 45;
const SNAP = 30;
const pct = (khz: number) => ((khz - MIN_KHZ) / (MAX_KHZ - MIN_KHZ)) * 100;
const clamp = (khz: number) => Math.min(MAX_KHZ, Math.max(MIN_KHZ, khz));

/** Longer mysteries get a smaller size, so the whole panel fits on one screen. */
function questionSize(q: string) {
  if (q.length > 55) return "text-2xl sm:text-3xl";
  if (q.length > 38) return "text-[1.7rem] sm:text-4xl";
  return "text-3xl sm:text-[2.6rem]";
}

/**
 * The hero: a radio dial, drawn as a light, precise instrument panel. Between
 * stations the screen is quiet; tune onto one and you hear a module's mystery. Drag the needle, use the arrow keys, or pick a
 * station. On load the needle sweeps up the band to the first station.
 */
export function TuningDial({ stations }: { stations: Station[] }) {
  const [khz, setKhz] = useState(MIN_KHZ);
  // The latest frequency, for animations that start from wherever the needle is.
  const current = useRef(MIN_KHZ);
  current.current = khz;
  const scale = useRef<HTMLDivElement>(null);
  const anim = useRef(0);
  const dragging = useRef(false);

  const nearest = useMemo(() => {
    let best: { station: Station; dist: number } | null = null;
    for (const s of stations) {
      const dist = Math.abs(s.khz - khz);
      if (!best || dist < best.dist) best = { station: s, dist };
    }
    return best;
  }, [khz, stations]);
  const strength = nearest ? Math.max(0, 1 - nearest.dist / CAPTURE) : 0;
  const tuned = strength > 0 ? nearest!.station : null;

  const stop = () => cancelAnimationFrame(anim.current);

  const tuneTo = useCallback((target: number, ms = 600) => {
    stop();
    if (ms <= 0 || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      setKhz(target);
      return;
    }
    const from = current.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      setKhz(Math.round(from + (target - from) * eased));
      if (t < 1) anim.current = requestAnimationFrame(tick);
    };
    anim.current = requestAnimationFrame(tick);
  }, []);

  // The one orchestrated moment: sweep up the band to the first station.
  useEffect(() => {
    if (!stations.length) return;
    const t = setTimeout(() => tuneTo(stations[0].khz, 1700), 350);
    return () => {
      clearTimeout(t);
      stop();
    };
  }, [stations, tuneTo]);

  function khzAt(clientX: number) {
    const r = scale.current!.getBoundingClientRect();
    const raw = MIN_KHZ + ((clientX - r.left) / r.width) * (MAX_KHZ - MIN_KHZ);
    return clamp(Math.round(raw / STEP) * STEP);
  }

  function snap(from: number) {
    const near = stations.find((s) => Math.abs(s.khz - from) <= SNAP);
    if (near) tuneTo(near.khz, 250);
  }

  function onKey(e: React.KeyboardEvent) {
    const sorted = [...stations].sort((a, b) => a.khz - b.khz);
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = clamp(khz + STEP);
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = clamp(khz - STEP);
    if (e.key === "Home") next = MIN_KHZ;
    if (e.key === "End") next = MAX_KHZ;
    if (e.key === "PageUp") next = (sorted.find((s) => s.khz > khz) ?? sorted[0]).khz;
    if (e.key === "PageDown") next = ([...sorted].reverse().find((s) => s.khz < khz) ?? sorted[sorted.length - 1]).khz;
    if (next === null) return;
    e.preventDefault();
    if (e.key.startsWith("Page")) tuneTo(next, 450);
    else {
      stop();
      setKhz(next);
    }
  }

  const majors: number[] = [];
  for (let f = 600; f <= 1600; f += 100) majors.push(f);
  const minors: number[] = [];
  for (let f = 540; f <= 1700; f += 20) if (f % 100) minors.push(f);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* The display: a mystery when tuned, a hint between stations. */}
      <div data-screen className="relative p-5 sm:p-8">
        <p className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
            {tuned ? `Station found · ${tuned.module.title}` : "Between stations"}
          </span>
          <span className="min-w-[4.5ch] text-right font-mono text-3xl tracking-[-0.02em] text-foreground tabular-nums sm:text-5xl" aria-hidden>
            {khz}
            <span className="text-base text-muted-foreground sm:text-lg"> kHz</span>
          </span>
        </p>

        {/*
          Every station's content and the "between stations" message share one
          grid cell, so the screen is always as tall as the longest of them and
          never changes size while tuning. Only the visible layer changes.
        */}
        <div className="mt-4 grid">
          {stations.map((s) => {
            const on = tuned?.khz === s.khz;
            return (
              <div
                key={s.khz}
                aria-hidden={!on}
                className={cn("[grid-area:1/1]", !on && "invisible")}
                style={{ opacity: on ? 0.25 + strength * 0.75 : 0 }}
              >
                <p className={cn("max-w-3xl font-display leading-[1.08] font-semibold tracking-[-0.03em] text-foreground", questionSize(mysteryOf(s.module)))}>
                  “{mysteryOf(s.module)}”
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href={`/modules/${s.module.id}`} className={buttonVariants({ size: "lg" })}>
                    Open {s.module.title}
                  </Link>
                  <p className="hidden text-muted-foreground sm:block">
                    {s.module.tagline}. {s.module.stepCount} steps, about {s.module.hours} hours.
                  </p>
                </div>
              </div>
            );
          })}
          <p
            aria-hidden={!!tuned}
            className={cn(
              "max-w-md self-center font-display text-2xl leading-snug tracking-[-0.02em] text-muted-foreground [grid-area:1/1] sm:text-3xl",
              tuned && "invisible"
            )}
          >
            Keep turning. Each station is a mystery you&apos;ll solve with your hands.
          </p>
        </div>
      </div>

      {/* Announce stations, not every frequency step. */}
      <p className="sr-only" aria-live="polite">
        {tuned && strength === 1 ? `Tuned to ${tuned.module.title}: ${mysteryOf(tuned.module)}` : ""}
      </p>

      {/* The dial */}
      <div className="border-t border-border px-5 pt-4 pb-5 select-none sm:px-8">
        <div
          ref={scale}
          role="slider"
          tabIndex={0}
          aria-label="Tuning dial"
          aria-valuemin={MIN_KHZ}
          aria-valuemax={MAX_KHZ}
          aria-valuenow={khz}
          aria-valuetext={`${khz} kHz${tuned ? `, ${tuned.module.title}` : ""}`}
          onKeyDown={onKey}
          onPointerDown={(e) => {
            stop();
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            setKhz(khzAt(e.clientX));
          }}
          onPointerMove={(e) => dragging.current && setKhz(khzAt(e.clientX))}
          onPointerUp={(e) => {
            dragging.current = false;
            snap(khzAt(e.clientX));
          }}
          onPointerCancel={() => (dragging.current = false)}
          className="relative h-20 cursor-ew-resize touch-none rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          {/* baseline */}
          <div aria-hidden className="absolute inset-x-0 bottom-7 h-px bg-foreground/20" />
          {minors.map((f) => (
            <span key={f} aria-hidden className="absolute bottom-7 h-2 w-px bg-foreground/20" style={{ left: `${pct(f)}%` }} />
          ))}
          {majors.map((f) => (
            <span key={f} aria-hidden className="absolute bottom-7 flex -translate-x-1/2 flex-col items-center" style={{ left: `${pct(f)}%` }}>
              <span
                className={cn(
                  "absolute top-full mt-1.5 font-mono text-[11px] text-muted-foreground tabular-nums",
                  f % 200 && "hidden sm:inline"
                )}
              >
                {f}
              </span>
              <span className="h-4 w-px bg-foreground/45" />
            </span>
          ))}

          {/* station marks */}
          {stations.map((s) => (
            <span
              key={s.khz}
              aria-hidden
              className={cn("absolute bottom-[2.6rem] size-2 -translate-x-1/2 rounded-full", tuned?.khz === s.khz ? "bg-sun" : "bg-foreground/60")}
              style={{ left: `${pct(s.khz)}%` }}
            />
          ))}

          {/* the needle: the Hasesa "peek" riding on a teal line */}
          <div aria-hidden className="pointer-events-none absolute top-0 bottom-5 -translate-x-1/2" style={{ left: `${pct(khz)}%` }}>
            <LogoMark size={36} className="-translate-y-1" />
            <span className="absolute top-4 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-primary" />
          </div>
        </div>

        {/* station buttons, for tapping */}
        <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {[...stations]
            .sort((a, b) => a.khz - b.khz)
            .map((s) => {
              const on = tuned?.khz === s.khz && strength === 1;
              return (
                <button
                  key={s.khz}
                  type="button"
                  onClick={() => tuneTo(s.khz, 700)}
                  aria-pressed={on}
                  className={cn(
                    "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md border px-3.5 text-sm whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
                    on ? "border-foreground bg-foreground text-background" : "border-input bg-card text-foreground hover:bg-muted"
                  )}
                >
                  <span className="font-mono tabular-nums">{s.khz}</span>
                  <span className="font-medium">{s.module.title}</span>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
