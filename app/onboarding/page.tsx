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
import { ArrowRightIcon, PartyPopperIcon } from "lucide-react";
import { SUBJECT_STYLES, SubjectTile } from "@/components/Subject";

// Checkbox tint per subject (full class names so Tailwind picks them up).
const CHECK_STYLES: Record<Subject, string> = {
  physics: "data-checked:border-physics data-checked:bg-physics dark:data-checked:bg-physics",
  chemistry: "data-checked:border-chemistry data-checked:bg-chemistry dark:data-checked:bg-chemistry",
  biology: "data-checked:border-biology data-checked:bg-biology dark:data-checked:bg-biology",
};

/** Full-height deep-teal backdrop (lab grid + glows) with the content centered on top. */
function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate flex min-h-[calc(100svh-61px)] items-center justify-center overflow-hidden bg-deep px-4 py-12 text-deep-foreground sm:py-16">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-50" />
      <div aria-hidden className="absolute -top-40 -left-32 -z-10 size-[28rem] rounded-full bg-primary/50 blur-3xl" />
      <div aria-hidden className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-sun/25 blur-3xl" />
      <div className="w-full max-w-lg">{children}</div>
    </div>
  );
}

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
    return (
      <Backdrop>
        <p className="text-center text-deep-foreground/70">{tr("common.loading")}</p>
      </Backdrop>
    );
  }

  if (done) {
    return (
      <Backdrop>
        <Card className="relative overflow-hidden rounded-[1.75rem] bg-card text-center shadow-pop ring-1 ring-white/10 [--card-spacing:--spacing(8)]">
          <div aria-hidden className="absolute inset-0 bg-dots text-primary opacity-30" />
          <CardContent className="relative flex flex-col items-center">
            <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-sun-soft text-sun [&_svg]:size-8">
              <PartyPopperIcon aria-hidden />
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{tr("onboard.done.title")}</h1>
            <p className="mt-2 text-muted-foreground">{tr("onboard.done.body")}</p>
            <Button size="lg" onClick={() => router.push("/dashboard")} className="mt-6 px-5 font-semibold">
              {tr("nav.dashboard")}
              <ArrowRightIcon />
            </Button>
          </CardContent>
        </Card>
      </Backdrop>
    );
  }

  return (
    <Backdrop>
      <Card className="relative overflow-hidden rounded-[1.75rem] bg-card shadow-pop ring-1 ring-white/10 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
        {/* Notebook page: subject-colored binding along the top. */}
        <div aria-hidden className="absolute inset-x-0 top-0 flex h-1.5">
          <span className="flex-1 bg-physics" />
          <span className="flex-1 bg-chemistry" />
          <span className="flex-1 bg-biology" />
        </div>
        <CardHeader className="pt-3">
          <CardTitle>
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-foreground">{tr("onboard.welcome")}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 id="onboard-grade" className="text-lg font-bold text-foreground">{tr("onboard.pickGrade")}</h2>
          <ToggleGroup
            type="single"
            aria-labelledby="onboard-grade"
            value={grade ? String(grade) : ""}
            // Tapping the selected grade again keeps it selected (a grade is required).
            onValueChange={(v) => {
              if (v) setGrade(Number(v) as Grade);
            }}
            className="mt-3 grid w-full grid-cols-4 gap-2 sm:gap-3"
          >
            {GRADES.map((g) => (
              <ToggleGroupItem
                key={g}
                value={String(g)}
                className="flex h-20 w-full flex-col gap-0.5 rounded-2xl border-2 border-border bg-background text-foreground shadow-card transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary-soft/40 data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-pop"
              >
                <span className="text-[0.65rem] font-bold tracking-[0.14em] uppercase opacity-70">{tr("experiments.grade")}</span>
                <span className="font-heading text-3xl leading-none font-extrabold tabular-nums">{g}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <h2 className="mt-8 text-lg font-bold text-foreground">{tr("onboard.pickSubjects")}</h2>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
            {SUBJECTS.map((s) => {
              const checked = chosen.includes(s.id);
              const id = `subject-${s.id}`;
              const st = SUBJECT_STYLES[s.id];
              return (
                <Label
                  key={s.id}
                  htmlFor={id}
                  className={cn(
                    "relative flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 px-2 py-4 text-center font-semibold leading-tight transition hover:-translate-y-0.5",
                    checked
                      ? cn(st.border, st.soft, "text-foreground shadow-card")
                      : "border-border bg-background text-muted-foreground hover:border-primary/40"
                  )}
                >
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={() =>
                      setChosen((c) => (c.includes(s.id) ? c.filter((x) => x !== s.id) : [...c, s.id]))
                    }
                    className={cn("absolute top-2.5 right-2.5 size-5 bg-card", CHECK_STYLES[s.id])}
                  />
                  <SubjectTile
                    subject={s.id}
                    size="lg"
                    className={cn("transition", checked ? "bg-card shadow-card" : "opacity-70 grayscale-[40%]")}
                  />
                  <span className={cn("text-sm", checked && st.text)}>{s.label}</span>
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
            className="mt-8 w-full font-semibold shadow-pop disabled:opacity-40 disabled:shadow-none"
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
    </Backdrop>
  );
}
