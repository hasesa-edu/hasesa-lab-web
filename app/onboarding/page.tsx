"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { GRADES, SUBJECTS, type Grade, type Subject } from "@/lib/subjects";
import { safeNext } from "@/lib/safe-next";
import { apiPatchMe } from "@/lib/api";

const ALL_SUBJECTS: Subject[] = SUBJECTS.map((s) => s.id);

export default function OnboardingPage() {
  const { tr } = useLocale();
  const { user, refresh, ready } = useUser();
  const router = useRouter();

  const [done, setDone] = useState(false);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [chosen, setChosen] = useState<Subject[]>(ALL_SUBJECTS);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !user) router.push("/login");
    if (ready && user) {
      setGrade(user.grade);
      setChosen(user.subjects.length ? user.subjects : ALL_SUBJECTS);
    }
  }, [ready, user, router]);

  async function save() {
    setBusy(true);
    setError(null);
    try {
      await apiPatchMe({ subjects: chosen, grade });
      await refresh();
      // Coming from "Get Hasesa" (or a guide): carry on to where they were going.
      const next = safeNext(new URLSearchParams(window.location.search).get("next"));
      if (next) {
        router.push(next);
        return;
      }
      setDone(true);
    } catch {
      setError(tr("common.tryAgain"));
    } finally {
      setBusy(false);
    }
  }

  if (!ready || !user) {
    return <div className="max-w-md mx-auto px-4 py-10 text-subtle-foreground">{tr("common.loading")}</div>;
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-5xl">🎉</div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">{tr("onboard.done.title")}</h1>
        <p className="mt-2 text-muted-foreground">{tr("onboard.done.body")}</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 inline-block px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium shadow-soft transition"
        >
          {tr("nav.dashboard")} →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{tr("onboard.welcome")}</h1>

        <h2 className="mt-6 font-medium text-foreground">{tr("onboard.pickGrade")}</h2>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGrade(g)}
              aria-pressed={grade === g}
              className={
                "px-3 py-2.5 rounded-lg border text-sm font-medium transition " +
                (grade === g ? "border-primary bg-primary-soft/40 text-foreground" : "border-border bg-background text-foreground hover:border-primary/60")
              }
            >
              {g}
            </button>
          ))}
        </div>

        <h2 className="mt-6 font-medium text-foreground">{tr("onboard.pickSubjects")}</h2>
        <div className="mt-3 grid grid-cols-1 gap-2">
          {SUBJECTS.map((s) => (
            <label
              key={s.id}
              className={
                "flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer text-sm transition " +
                (chosen.includes(s.id)
                  ? "border-primary bg-primary-soft/40 text-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/60")
              }
            >
              <input
                type="checkbox"
                checked={chosen.includes(s.id)}
                onChange={() => setChosen((c) => (c.includes(s.id) ? c.filter((x) => x !== s.id) : [...c, s.id]))}
                className="accent-primary"
              />
              <span>
                {s.emoji} {s.label}
              </span>
            </label>
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-red-700 dark:text-red-300">{error}</p>}

        <button
          onClick={save}
          disabled={!grade || chosen.length === 0 || busy}
          className="mt-6 w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium disabled:opacity-40 shadow-soft transition"
        >
          {busy ? "…" : tr("onboard.continue")}
        </button>
        {!user.grade && (
          <p className="mt-4 text-xs text-subtle-foreground leading-relaxed text-center">
            By continuing you agree to our{" "}
            <Link href="/terms" className="underline hover:text-primary">Terms</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
