"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { GRADES, SUBJECTS, type Grade, type Subject } from "@/lib/subjects";
import { safeNext } from "@/lib/safe-next";
import { apiPatchMe } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
        <Button size="lg" onClick={() => router.push("/dashboard")} className="mt-6 px-5">
          {tr("nav.dashboard")} →
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <Card className="rounded-2xl shadow-card [--card-spacing:--spacing(7)]">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{tr("onboard.welcome")}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="-mt-1">
          <h2 id="onboard-grade" className="font-medium text-foreground">{tr("onboard.pickGrade")}</h2>
          <ToggleGroup
            type="single"
            variant="outline"
            aria-labelledby="onboard-grade"
            value={grade ? String(grade) : ""}
            // Tapping the selected grade again keeps it selected (a grade is required).
            onValueChange={(v) => {
              if (v) setGrade(Number(v) as Grade);
            }}
            className="mt-3 grid w-full grid-cols-4 gap-2"
          >
            {GRADES.map((g) => (
              <ToggleGroupItem
                key={g}
                value={String(g)}
                className="h-11 w-full border-border bg-background text-foreground hover:border-primary/60 hover:bg-background data-[state=on]:border-primary data-[state=on]:bg-primary-soft/40"
              >
                {g}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <h2 className="mt-6 font-medium text-foreground">{tr("onboard.pickSubjects")}</h2>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {SUBJECTS.map((s) => {
              const checked = chosen.includes(s.id);
              const id = `subject-${s.id}`;
              return (
                <Label
                  key={s.id}
                  htmlFor={id}
                  className={cn(
                    "min-h-11 px-3 py-2.5 rounded-lg border cursor-pointer font-normal leading-normal transition",
                    checked
                      ? "border-primary bg-primary-soft/40 text-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/60"
                  )}
                >
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={() =>
                      setChosen((c) => (c.includes(s.id) ? c.filter((x) => x !== s.id) : [...c, s.id]))
                    }
                  />
                  <span>
                    {s.emoji} {s.label}
                  </span>
                </Label>
              );
            })}
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            size="lg"
            onClick={save}
            disabled={!grade || chosen.length === 0 || busy}
            className="mt-6 w-full disabled:opacity-40"
          >
            {busy ? "…" : tr("onboard.continue")}
          </Button>
          {!user.grade && (
            <p className="mt-4 text-xs text-subtle-foreground leading-relaxed text-center">
              By continuing you agree to our{" "}
              <Link href="/terms" className="underline hover:text-primary">Terms</Link> and{" "}
              <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
