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
        <h2 className="text-4xl leading-tight font-semibold sm:text-5xl">{labels.title}</h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          {labels.eyebrow}{" "}
          <Link href={`/modules/${challenge.moduleId}`} className="font-medium text-primary underline underline-offset-4">
            {challenge.moduleTitle}
          </Link>
          , from the free unit{" "}
          <Link href={`/concepts/${challenge.unitId}`} className="font-medium text-primary underline underline-offset-4">
            {challenge.unitTitle}
          </Link>
          .
        </p>
      </div>

      {/* The instrument: question on top, a big readout to type into. */}
      <div className="relative rounded-lg border border-border bg-card p-6 sm:p-8">
        {solved && (
          <span
            aria-hidden
            className="absolute top-6 right-6 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] tracking-[0.08em] text-accent-foreground uppercase"
          >
            {labels.solved}
          </span>
        )}
        <p className="pr-20 font-legible text-xl leading-snug font-bold">{problem.q}</p>

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
                  "h-auto min-h-11 justify-start rounded-lg py-2 text-left font-normal whitespace-normal disabled:opacity-100",
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
            <label className="flex items-baseline gap-2 rounded-lg border border-input bg-background px-4 py-2 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
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
                className="h-12 w-28 border-0 bg-transparent p-0 font-mono text-3xl text-foreground shadow-none placeholder:text-subtle-foreground focus-visible:ring-0 md:text-3xl dark:bg-transparent"
              />
              {problem.unit && <span className="font-mono text-lg text-muted-foreground">{problem.unit}</span>}
            </label>
            {!solved && (
              <Button type="submit" size="lg" variant="ink" disabled={busy || !value.trim()} className="h-auto min-h-14 px-6">
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
            <div className="mt-5 border-t border-border pt-5">
              <p className="font-legible leading-relaxed">{result!.explanation}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild variant="ink">
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
