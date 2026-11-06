"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
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
      className={cn(
        "relative rounded-2xl bg-card p-5 text-card-foreground shadow-pop ring-1 ring-ink/10 sm:p-7",
        wrongs > 0 && !solved && "shake"
      )}
    >
      <span aria-hidden className="tape absolute -top-2.5 left-8 h-5 w-24 -rotate-3" />
      <span aria-hidden className="tape absolute -top-2.5 right-10 h-5 w-16 rotate-2" />

      {solved && (
        <span
          aria-hidden
          className="stamp pointer-events-none absolute top-4 right-4 rounded-md border-4 border-sun px-3 py-1 font-heading text-2xl font-extrabold tracking-widest text-sun uppercase sm:top-6 sm:right-6 sm:text-3xl"
        >
          {labels.solved}
        </span>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-chemistry uppercase">
            <Search aria-hidden className="size-4" /> {challenge.moduleTitle} · {labels.eyebrow}
          </p>
          <h2 className="mt-2 font-hand text-4xl leading-none text-ink sm:text-5xl dark:text-foreground">{labels.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From the free concept unit{" "}
            <Link href={`/concepts/${challenge.unitId}`} className="font-semibold text-primary-strong underline underline-offset-4 dark:text-primary">
              {challenge.unitTitle}
            </Link>
            .
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-lg leading-snug font-semibold text-foreground">{problem.q}</p>

          {problem.type === "mcq" ? (
            <div className="mt-4 grid gap-2">
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
                    value === String(i) && result && (result.correct ? "border-emerald-400 bg-emerald-50" : "border-red-300 bg-red-50")
                  )}
                >
                  {c}
                </Button>
              ))}
            </div>
          ) : (
            <form
              className="mt-4 flex flex-wrap items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void check(value);
              }}
            >
              <Input
                inputMode="decimal"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (result && !result.correct) setResult(null);
                }}
                disabled={busy || solved}
                placeholder="Your answer"
                aria-label="Your answer"
                maxLength={40}
                className="h-12 w-36 bg-paper text-lg"
              />
              {problem.unit && <span className="text-base font-semibold text-muted-foreground">{problem.unit}</span>}
              {!solved && (
                <Button type="submit" size="lg" disabled={busy || !value.trim()} className="bg-ink font-semibold text-ink-foreground hover:bg-ink/90">
                  {busy ? "…" : labels.check}
                </Button>
              )}
            </form>
          )}

          <div aria-live="polite">
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            {result && !result.correct && (
              <p className="mt-3 text-sm text-red-700 dark:text-red-400">
                <span className="font-semibold">{labels.wrong}</span> {challenge.hint ?? labels.tryAgain}
              </p>
            )}
            {solved && (
              <div className="mt-4 rounded-xl bg-sun-soft p-4 text-sm leading-relaxed text-foreground">
                <p>{result!.explanation}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild className="bg-ink font-semibold text-ink-foreground hover:bg-ink/90">
                    <Link href={`/modules/${challenge.moduleId}`}>
                      {labels.open} <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="bg-card">
                    <Link href={`/concepts/${challenge.unitId}`}>{labels.more}</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
