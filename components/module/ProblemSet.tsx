"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CircleCheck, CircleX, GraduationCap, PencilLine, RotateCcw, Zap } from "lucide-react";
import type { ClientProblem } from "@/lib/content/types";
import { apiAttempt, apiTestOut, type UnitStateDTO } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle, UnitStatusPill } from "./ui";

type Result = { correct: boolean; explanation: string; answer: string };

const LETTERS = ["A", "B", "C", "D", "E", "F"];
const PASS_PCT = 80;

/**
 * Practice problems for a concept unit, graded on the server. Students who
 * already know the topic can switch to a test-out: answer everything at once,
 * and 80% or more marks the unit as tested out.
 */
export function ProblemSet({
  unitId,
  problems,
  solved,
  initialUnit,
  canSave,
}: {
  unitId: string;
  problems: ClientProblem[];
  /** Questions this student has already got right. */
  solved: string[];
  initialUnit: UnitStateDTO;
  canSave: boolean;
}) {
  const [mode, setMode] = useState<"practice" | "testout">("practice");
  const [unit, setUnit] = useState<UnitStateDTO>(initialUnit);
  const router = useRouter();

  const onUnit = (u: UnitStateDTO) => {
    if (!u) return;
    const changed = u.status !== unit?.status;
    setUnit(u);
    if (changed) router.refresh();
  };

  return (
    <section id="problems" className="mt-12 scroll-mt-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle icon={PencilLine}>{mode === "practice" ? "Solve it" : "Test out"}</SectionTitle>
        <div className="flex items-center gap-2">
          <UnitStatusPill status={unit?.status} />
          {unit && unit.status !== "started" && <span className="text-xs text-subtle-foreground tabular-nums">{unit.score}%</span>}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
        {mode === "practice" ? (
          <>
            <span>Work each one out on paper, then check your answer.</span>
            {unit?.status !== "completed" && unit?.status !== "tested_out" && (
              <Button variant="link" size="sm" className="h-auto p-0 text-sm" onClick={() => setMode("testout")}>
                <Zap aria-hidden /> Already know this? Test out
              </Button>
            )}
          </>
        ) : (
          <>
            <span>
              Answer all {problems.length} without help. Score {PASS_PCT}% or more and this unit is marked as known.
            </span>
            <Button variant="link" size="sm" className="h-auto p-0 text-sm" onClick={() => setMode("practice")}>
              Back to practice
            </Button>
          </>
        )}
      </div>
      {!canSave && (
        <p className="mt-2 text-xs text-subtle-foreground">You&apos;re not signed in, so your answers won&apos;t be saved.</p>
      )}

      {mode === "practice" ? (
        <ol className="mt-5 space-y-4">
          {problems.map((p, i) => (
            <PracticeItem key={p.id} unitId={unitId} problem={p} index={i} alreadySolved={solved.includes(p.id)} onUnit={onUnit} />
          ))}
        </ol>
      ) : (
        <TestOut unitId={unitId} problems={problems} onUnit={onUnit} onDone={() => setMode("practice")} />
      )}
    </section>
  );
}

function QuestionText({ index, q }: { index: number; q: string }) {
  return (
    <div className="flex gap-3">
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft font-heading text-sm font-extrabold text-primary-strong dark:text-primary">
        {index + 1}
      </span>
      <Markdown inline className="min-w-0 flex-1 pt-1 font-semibold leading-snug">
        {q}
      </Markdown>
    </div>
  );
}

function AnswerInput({
  problem,
  value,
  onChange,
  disabled,
  result,
  onSubmit,
}: {
  problem: ClientProblem;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  result?: Result | null;
  onSubmit?: () => void;
}) {
  if (problem.type === "mcq") {
    return (
      <div className="mt-4 grid gap-2">
        {problem.choices.map((c, i) => {
          const picked = value === String(i);
          const good = !!result && picked && result.correct;
          const bad = !!result && picked && !result.correct;
          return (
            <Button
              key={i}
              type="button"
              variant="outline"
              disabled={disabled}
              onClick={() => {
                onChange(String(i));
                onSubmit?.();
              }}
              aria-pressed={picked}
              className={cn(
                "h-auto min-h-11 justify-start gap-3 rounded-xl py-2 pl-2 text-left font-normal whitespace-normal text-foreground disabled:opacity-100",
                !result && "hover:border-primary/60 hover:bg-primary-soft/30",
                picked && !result && "border-primary bg-primary-soft/40",
                good && "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40",
                bad && "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/40"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                  good ? "bg-emerald-600 text-white" : bad ? "bg-red-500 text-white" : picked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {good ? <Check className="size-4" strokeWidth={3} /> : bad ? <CircleX className="size-4" /> : LETTERS[i] ?? i + 1}
              </span>
              <Markdown inline className="flex-1 text-[0.95rem]">
                {c}
              </Markdown>
            </Button>
          );
        })}
      </div>
    );
  }
  return (
    <form
      className="mt-4 flex flex-wrap items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <Input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Your answer"
        aria-label="Your answer"
        maxLength={40}
        className="h-11 w-40 text-base"
      />
      {problem.unit && <span className="text-sm font-medium text-muted-foreground">{problem.unit}</span>}
      {onSubmit && (
        <Button type="submit" disabled={disabled || !value.trim()}>
          Check
        </Button>
      )}
      <span className="w-full text-xs text-subtle-foreground">Powers of ten: type 3e8 or 3 x 10^8.</span>
    </form>
  );
}

function Feedback({ result, onRetry }: { result: Result; onRetry?: () => void }) {
  return (
    <div className={cn("mt-4 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-start", result.correct ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-red-50 dark:bg-red-950/40")}>
      <div className="flex flex-1 gap-2.5 text-sm">
        {result.correct ? (
          <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-emerald-600" />
        ) : (
          <CircleX aria-hidden className="mt-0.5 size-5 shrink-0 text-red-500" />
        )}
        <div className="min-w-0">
          <p className={cn("font-semibold", result.correct ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400")}>
            {result.correct ? "Correct." : "Not quite."}
          </p>
          {!result.correct && onRetry ? (
            <p className="mt-1 text-muted-foreground">Have another go, or ask the lab assistant for a hint.</p>
          ) : (
            <>
              {!result.correct && <p className="mt-1 text-muted-foreground">Answer: {result.answer}</p>}
              <Markdown className="mt-1 text-sm [&_p]:text-muted-foreground">{result.explanation}</Markdown>
            </>
          )}
        </div>
      </div>
      {onRetry && !result.correct && (
        <Button type="button" variant="outline" size="sm" onClick={onRetry} className="h-10 shrink-0 self-start bg-card text-xs">
          <RotateCcw aria-hidden /> Try again
        </Button>
      )}
    </div>
  );
}

function PracticeItem({
  unitId,
  problem,
  index,
  alreadySolved,
  onUnit,
}: {
  unitId: string;
  problem: ClientProblem;
  index: number;
  alreadySolved: boolean;
  onUnit: (u: UnitStateDTO) => void;
}) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [tries, setTries] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  async function check(answer: string) {
    if (!answer.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const r = await apiAttempt({ unitId, questionId: problem.id, answer });
      setResult(r);
      setTries((t) => t + 1);
      onUnit(r.unit);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't check. Try again.");
    } finally {
      setBusy(false);
    }
  }

  // After two wrong tries the explanation is shown, so nobody stays stuck.
  const revealed = !!result && (result.correct || tries >= 2 || showSolution);

  return (
    <li className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <QuestionText index={index} q={problem.q} />
        {alreadySolved && !result && (
          <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Check aria-hidden className="size-3.5" /> Solved
          </span>
        )}
      </div>
      <AnswerInput
        problem={problem}
        value={value}
        onChange={(v) => {
          setValue(v);
          if (problem.type === "mcq") void check(v);
        }}
        disabled={busy || !!result}
        result={result}
        onSubmit={problem.type === "numeric" ? () => check(value) : undefined}
      />
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      {result && (
        <Feedback
          result={result}
          onRetry={
            revealed
              ? undefined
              : () => {
                  setResult(null);
                  setValue("");
                }
          }
        />
      )}
      {result && !result.correct && !revealed && (
        <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs text-subtle-foreground" onClick={() => setShowSolution(true)}>
          Show the solution
        </Button>
      )}
      {result && revealed && !result.correct && (
        <Button
          variant="link"
          size="sm"
          className="mt-1 h-auto p-0 text-xs"
          onClick={() => {
            setResult(null);
            setValue("");
            setShowSolution(false);
          }}
        >
          <RotateCcw aria-hidden /> Try it again
        </Button>
      )}
    </li>
  );
}

function TestOut({ unitId, problems, onUnit, onDone }: { unitId: string; problems: ClientProblem[]; onUnit: (u: UnitStateDTO) => void; onDone: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<{ score: number; passed: boolean; results: Record<string, Result> } | null>(null);
  const answered = problems.filter((p) => answers[p.id]?.trim()).length;

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const r = await apiTestOut({ unitId, answers });
      setOutcome({ score: r.score, passed: r.passed, results: Object.fromEntries(r.results.map((x) => [x.id, x])) });
      onUnit(r.unit);
      window.scrollTo({ top: (document.getElementById("problems")?.offsetTop ?? 0) - 80, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't submit. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-5">
      {outcome && (
        <div
          role="status"
          className={cn(
            "mb-5 flex items-start gap-3 rounded-2xl p-5 ring-1",
            outcome.passed ? "bg-emerald-50 ring-emerald-300 dark:bg-emerald-950/40 dark:ring-emerald-800" : "bg-sun-soft ring-sun/40"
          )}
        >
          <GraduationCap aria-hidden className={cn("mt-0.5 size-6 shrink-0", outcome.passed ? "text-emerald-600" : "text-amber-600")} />
          <div>
            <p className="font-bold text-foreground">
              {outcome.score}%: {outcome.passed ? "you've tested out of this unit." : `not quite ${PASS_PCT}% yet.`}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {outcome.passed
                ? "It's marked as known. Skim the explanations below for anything you missed."
                : "No problem: read the theory above and work through the practice problems."}
            </p>
            {!outcome.passed && (
              <Button size="sm" variant="soft" className="mt-3" onClick={onDone}>
                Go to practice
              </Button>
            )}
          </div>
        </div>
      )}
      <ol className="space-y-4">
        {problems.map((p, i) => (
          <li key={p.id} className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6">
            <QuestionText index={i} q={p.q} />
            <AnswerInput
              problem={p}
              value={answers[p.id] ?? ""}
              onChange={(v) => setAnswers((a) => ({ ...a, [p.id]: v }))}
              disabled={busy || !!outcome}
              result={outcome?.results[p.id]}
            />
            {outcome?.results[p.id] && <Feedback result={outcome.results[p.id]} />}
          </li>
        ))}
      </ol>
      {!outcome && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={submit} disabled={busy || answered === 0}>
            {busy ? "Marking…" : `Submit ${answered}/${problems.length} answers`}
          </Button>
          {answered < problems.length && <span className="text-sm text-subtle-foreground">Unanswered questions count as wrong.</span>}
          {error && <span className="text-sm text-destructive">{error}</span>}
        </div>
      )}
    </div>
  );
}
