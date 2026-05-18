"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { SUBJECTS, type Subject } from "@/lib/lessons";
import { DIAGNOSTIC } from "@/lib/diagnostic";
import { apiPatchMe, apiSetMastery } from "@/lib/api";

type Step = "subjects" | "diag" | "done";

export default function OnboardingPage() {
  const { tr, locale } = useLocale();
  const { user, refresh, ready } = useUser();
  const router = useRouter();

  const [step, setStep] = useState<Step>("subjects");
  const [chosen, setChosen] = useState<Subject[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && !user) router.push("/login");
    if (ready && user) setChosen(user.subjects.length ? user.subjects : ["math", "physics", "chemistry", "biology"]);
  }, [ready, user, router]);

  const diagQs = useMemo(() => {
    const out: { subject: Subject; q: (typeof DIAGNOSTIC)[Subject][number]; key: string }[] = [];
    for (const s of chosen) {
      for (const [i, q] of DIAGNOSTIC[s].entries()) {
        out.push({ subject: s, q, key: `${s}-${i}` });
      }
    }
    return out;
  }, [chosen]);

  async function saveSubjects() {
    setBusy(true);
    try {
      await apiPatchMe({ subjects: chosen });
      await refresh();
      setStep(chosen.length ? "diag" : "done");
    } finally {
      setBusy(false);
    }
  }

  async function finishDiagnostic() {
    setBusy(true);
    try {
      for (const item of diagQs) {
        const picked = answers[item.key];
        if (picked === undefined) continue;
        const correct = picked === item.q.answerIndex;
        await apiSetMastery(item.subject, item.q.topic, correct ? 70 : 35);
      }
      await refresh();
      setStep("done");
    } finally {
      setBusy(false);
    }
  }

  if (!ready || !user) {
    return <div className="max-w-md mx-auto px-4 py-10 text-stone-500">{tr("common.loading")}</div>;
  }

  if (step === "subjects") {
    return (
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-stone-900">{tr("onboard.welcome")}</h1>
        <h2 className="mt-6 font-medium text-stone-800">{tr("onboard.pickSubjects")}</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SUBJECTS.map((s) => (
            <label
              key={s.id}
              className={
                "flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer text-sm " +
                (chosen.includes(s.id) ? "border-brand bg-brand/5" : "border-stone-300")
              }
            >
              <input
                type="checkbox"
                checked={chosen.includes(s.id)}
                onChange={() =>
                  setChosen((c) => (c.includes(s.id) ? c.filter((x) => x !== s.id) : [...c, s.id]))
                }
              />
              <span>{s.emoji} {s.label[locale]}</span>
            </label>
          ))}
        </div>
        <button
          onClick={saveSubjects}
          disabled={chosen.length === 0 || busy}
          className="mt-6 w-full px-4 py-2.5 bg-brand text-white rounded-md hover:bg-brand-dark font-medium disabled:opacity-40"
        >
          {tr("onboard.continue")}
        </button>
      </div>
    );
  }

  if (step === "diag") {
    const allAnswered = diagQs.every((q) => answers[q.key] !== undefined);
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-stone-900">{tr("onboard.diag.title")}</h1>
        <p className="text-sm text-stone-600 mt-2">{tr("onboard.diag.intro")}</p>

        <ol className="mt-6 space-y-5">
          {diagQs.map((item) => {
            const subject = SUBJECTS.find((s) => s.id === item.subject)!;
            return (
              <li key={item.key} className="rounded-lg border border-stone-200 bg-white p-4">
                <div className="text-xs text-brand font-medium uppercase tracking-wide">
                  {subject.emoji} {subject.label[locale]} · {item.q.topic}
                </div>
                <p className="mt-2 font-medium text-stone-900">{item.q.q}</p>
                <div className="mt-3 grid gap-2">
                  {item.q.choices.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setAnswers((a) => ({ ...a, [item.key]: i }))}
                      className={
                        "text-left text-sm px-3 py-2 rounded border " +
                        (answers[item.key] === i
                          ? "border-brand bg-brand/10"
                          : "border-stone-200 hover:border-brand")
                      }
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex gap-3">
          <button
            onClick={finishDiagnostic}
            disabled={!allAnswered || busy}
            className="flex-1 px-4 py-2.5 bg-brand text-white rounded-md hover:bg-brand-dark disabled:opacity-40 font-medium"
          >
            {busy ? "…" : tr("onboard.finish")}
          </button>
          <button
            onClick={() => setStep("done")}
            className="px-4 py-2.5 text-stone-600 hover:text-stone-900"
          >
            {tr("onboard.diag.skip")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14 text-center">
      <div className="text-5xl">🎉</div>
      <h1 className="mt-3 text-2xl font-bold text-stone-900">{tr("onboard.done.title")}</h1>
      <p className="mt-2 text-stone-600">{tr("onboard.done.body")}</p>
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 inline-block px-5 py-2.5 bg-brand text-white rounded-md hover:bg-brand-dark font-medium"
      >
        {tr("nav.dashboard")} →
      </button>
    </div>
  );
}
