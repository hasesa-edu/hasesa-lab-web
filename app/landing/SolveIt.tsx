"use client";

import Link from "next/link";
import { useState } from "react";
import type { ClientProblem } from "@/lib/content/types";
import { apiAttempt } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type Challenge = {
  unitId: string;
  unitTitle: string;
  problem: ClientProblem;
  moduleId: string;
  moduleTitle: string;
  /** Shown after a wrong answer, e.g. the formula to use. */
  hint?: string;
};

type Result = { correct: boolean; explanation: string; answer: string };

/**
 * A real problem from a free concept unit, right on the landing page. Graded
 * by /api/attempts like any practice problem, so the answer never reaches the
 * browser first. Learning by doing, from the first screen.
 */
export function SolveIt({ challenge, labels }: { challenge: Challenge; labels: Record<"eyebrow" | "title" | "check" | "solved" | "wrong" | "open" | "more" | "tryAgain", string> }) {
  const { problem } = challenge;
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Bumped on every wrong answer so the shake animation replays.
  const [wrongs, setWrongs] = useState(0);

  async function check(answer: string) {
    if (!answer.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const r = await apiAttempt({ unitId: challenge.unitId, questionId: problem.id, answer });
      setResult(r);
      if (!r.correct) setWrongs((n) => n + 1);
    } catch {
      setError("Couldn't check that. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const solved = !!result?.correct;

  return (
    <div
      key={wrongs}
      className={cn("relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14", wrongs > 0 && !solved && "shake")}
    >
      <div>
        <h2 className="font-dial text-5xl leading-none font-bold text-ink sm:text-6xl">{labels.title}</h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/75">
          {labels.eyebrow}{" "}
          <Link href={`/modules/${challenge.moduleId}`} className="font-bold text-primary underline underline-offset-4">
            {challenge.moduleTitle}
          </Link>
          , from the free unit{" "}
          <Link href={`/concepts/${challenge.unitId}`} className="font-bold text-primary underline underline-offset-4">
            {challenge.unitTitle}
          </Link>
          .
        </p>
      </div>

      {/* The instrument: question on top, a big readout to type into. */}
      <div className="relative rounded-2xl border-2 border-ink bg-white p-6 shadow-[6px_6px_0_0_var(--ink)] sm:p-8 dark:bg-card">
        {solved && (
          <span
            aria-hidden
            className="absolute -top-5 right-6 rotate-[-6deg] rounded-md bg-sun px-3 py-1 font-dial text-2xl font-extrabold text-ink shadow-pop"
          >
            {labels.solved}
          </span>
        )}
        <p className="text-xl leading-snug font-bold text-ink">{problem.q}</p>

        {problem.type === "mcq" ? (
          <div className="mt-5 grid gap-2">
            {problem.choices.map((c, i) => (
              <Button
                key={i}
                type="button"
                variant="outline"
                disabled={busy || solved}
                onClick={() => {
                  setValue(String(i));
                  void check(String(i));
                }}
                className={cn(
                  "h-auto min-h-11 justify-start rounded-xl py-2 text-left font-normal whitespace-normal disabled:opacity-100",
                  value === String(i) && result && (result.correct ? "border-emerald-500 bg-emerald-50" : "border-red-400 bg-red-50")
                )}
              >
                {c}
              </Button>
            ))}
          </div>
        ) : (
          <form
            className="mt-5 flex flex-wrap items-stretch gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              void check(value);
            }}
          >
            <label className="flex items-baseline gap-2 rounded-xl bg-enamel px-4 py-2 text-sun focus-within:ring-3 focus-within:ring-sun/50">
              <span className="sr-only">Your answer</span>
              <Input
                inputMode="decimal"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (result && !result.correct) setResult(null);
                }}
                disabled={busy || solved}
                placeholder="0.00"
                aria-label="Your answer"
                maxLength={40}
                className="h-12 w-28 border-0 bg-transparent p-0 font-dial text-4xl font-bold text-sun shadow-none placeholder:text-sun/30 focus-visible:ring-0 dark:bg-transparent"
              />
              {problem.unit && <span className="font-dial text-xl text-sun/80">{problem.unit}</span>}
            </label>
            {!solved && (
              <Button type="submit" size="lg" disabled={busy || !value.trim()} className="h-auto min-h-14 bg-ink px-6 text-base font-bold text-white hover:bg-ink/90">
                {busy ? "Checking" : labels.check}
              </Button>
            )}
          </form>
        )}

        <div aria-live="polite">
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          {result && !result.correct && (
            <p className="mt-4 text-red-700 dark:text-red-400">
              <span className="font-bold">{labels.wrong}</span> {challenge.hint ?? labels.tryAgain}
            </p>
          )}
          {solved && (
            <div className="mt-5 border-t-2 border-dashed border-ink/20 pt-5 text-ink/85">
              <p className="leading-relaxed">{result!.explanation}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild className="bg-ink font-bold text-white hover:bg-ink/90">
                  <Link href={`/modules/${challenge.moduleId}`}>{labels.open}</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/concepts/${challenge.unitId}`}>{labels.more}</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
