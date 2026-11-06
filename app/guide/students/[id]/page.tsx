import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Award, BookOpen, Check, CircleCheck, CircleX, ClipboardList, Flag, Hammer, MessageSquareQuote, NotebookPen, Trash2 } from "lucide-react";
import { getAccess } from "@/lib/access";
import { getConcept, getConcepts, getModules, moduleUnits } from "@/lib/content";
import { getStudentState } from "@/lib/progress";
import { loadStudentAttempts } from "@/lib/tracker";
import { getUserDTO } from "@/lib/auth/users";
import { isUnitDone, moduleProgress } from "@/lib/summary";
import { formatDate } from "@/lib/format";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ProgressBar, SectionTitle, UnitStatusPill } from "@/components/module/ui";
import type { Problem } from "@/lib/content/types";
import { AssignForm, FeedbackForm, FlagForm, SignoffForm } from "../../forms";
import { removeAssignmentAction, undoSignOffAction } from "../../actions";

export const metadata: Metadata = { title: `Student · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

function shownAnswer(p: Problem | undefined, answer: string): string {
  if (p?.type === "mcq") return p.choices[Number(answer)] ?? answer;
  return p?.type === "numeric" && p.unit ? `${answer} ${p.unit}` : answer;
}

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await getAccess();
  if (!access.userId) redirect(`/login?next=/guide/students/${id}`);
  if (access.level !== "guide") redirect("/dashboard");
  const [user, state, attempts] = await Promise.all([getUserDTO(id), getStudentState(id), loadStudentAttempts(id)]);
  if (!user) notFound();

  const modules = getModules();
  const touched = modules
    .map((m) => ({ m, p: moduleProgress(m, state) }))
    .filter(({ p }) => p.status !== "not-started" || p.stepsDone > 0);
  const unitStatus = new Map(state.units.map((u) => [u.unitId, u]));
  const triedUnits = [...new Set([...state.units.map((u) => u.unitId), ...attempts.map((a) => a.unitId)])].filter((u) => getConcept(u));
  const places = modules.flatMap((m) => [{ value: m.id, label: m.title }, ...m.steps.map((s, i) => ({ value: `${m.id}/${s.id}`, label: `${m.title} · ${i + 1}. ${s.title}` }))]);

  return (
    <div>
      <PageHeader
        eyebrow={<Link href="/guide" className="hover:underline">← Student tracker</Link>}
        title={user.displayName}
        description={`${user.email} · ${user.paidUntil && new Date(user.paidUntil) > new Date() ? `enrolled until ${formatDate(user.paidUntil)}` : "not currently enrolled"}`}
      />

      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16">
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6">
            <SectionTitle icon={MessageSquareQuote} className="text-lg sm:text-xl">
              Give feedback
            </SectionTitle>
            <div className="mt-4">
              <FeedbackForm studentId={user.id} places={places} />
            </div>
          </section>
          <section className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6">
            <SectionTitle icon={ClipboardList} className="text-lg sm:text-xl">
              Assign a concept unit
            </SectionTitle>
            <div className="mt-4">
              <AssignForm studentId={user.id} units={getConcepts().map((c) => ({ id: c.id, title: c.title })).sort((a, b) => a.title.localeCompare(b.title))} />
            </div>
            {state.assignments.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {state.assignments.map((a) => {
                  const c = getConcept(a.unitId);
                  if (!c) return null;
                  const st = unitStatus.get(a.unitId)?.status;
                  return (
                    <li key={a.id} className="flex items-center gap-2 text-sm">
                      <span className="min-w-0 flex-1">
                        <span className="font-medium text-foreground">{c.title}</span>
                        <span className="text-xs text-subtle-foreground"> · {formatDate(a.createdAt)}</span>
                      </span>
                      {isUnitDone(st) ? <UnitStatusPill status={st} /> : <span className="text-xs text-muted-foreground">Not done</span>}
                      <form action={removeAssignmentAction}>
                        <input type="hidden" name="id" value={a.id} />
                        <input type="hidden" name="studentId" value={user.id} />
                        <Button type="submit" size="icon-sm" variant="ghost" aria-label={`Remove ${c.title}`}>
                          <Trash2 aria-hidden />
                        </Button>
                      </form>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        {touched.length === 0 && (
          <p className="mt-10 rounded-2xl bg-card p-6 text-muted-foreground shadow-soft ring-1 ring-border">This student hasn&apos;t started a module yet.</p>
        )}

        {touched.map(({ m, p }) => {
          const units = moduleUnits(m);
          const signoff = state.signoffs.find((s) => s.moduleId === m.id);
          return (
            <section key={m.id} className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <SectionTitle icon={Hammer}>{m.title}</SectionTitle>
                <span className="text-sm font-semibold text-muted-foreground capitalize">{p.status === "completed" ? "Signed off" : p.status}</span>
              </div>
              <ProgressBar pct={p.stepsTotal ? Math.round((p.stepsDone / p.stepsTotal) * 100) : 0} className="mt-4" />
              <p className="mt-2 text-sm text-muted-foreground">
                {p.stepsDone}/{p.stepsTotal} steps · {p.unitsDone}/{p.unitsTotal} concept units
                {p.lastActivity ? ` · last active ${formatDate(p.lastActivity)}` : ""}
                {p.nextStep && p.status === "active" ? ` · stopped at: ${p.nextStep.title}` : ""}
              </p>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border">
                  <h3 className="flex items-center gap-2 font-bold text-foreground">
                    <NotebookPen aria-hidden className="size-4 text-primary" /> Steps and notebook
                  </h3>
                  <ol className="mt-3 space-y-3">
                    {m.steps.map((s, i) => {
                      const row = state.steps.find((x) => x.moduleId === m.id && x.stepId === s.id);
                      return (
                        <li key={s.id} className="text-sm">
                          <p className="flex items-center gap-2">
                            <span
                              className={cn(
                                "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                                row?.done ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
                              )}
                            >
                              {row?.done ? <Check aria-hidden className="size-3.5" strokeWidth={3} /> : i + 1}
                            </span>
                            <span className="font-medium text-foreground">{s.title}</span>
                          </p>
                          {row?.notes && (
                            <p className="mt-1.5 ml-8 rounded-lg bg-muted/60 p-2.5 whitespace-pre-wrap text-muted-foreground">{row.notes}</p>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border">
                    <h3 className="flex items-center gap-2 font-bold text-foreground">
                      <BookOpen aria-hidden className="size-4 text-primary" /> Concept units
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm">
                      {units.map((u) => {
                        const row = unitStatus.get(u);
                        return (
                          <li key={u} className="flex items-center gap-2">
                            <a href={`#unit-${u}`} className="min-w-0 flex-1 text-foreground hover:underline">
                              {getConcept(u)!.title}
                            </a>
                            {row && <span className="text-xs text-muted-foreground tabular-nums">{row.score}%</span>}
                            {row ? <UnitStatusPill status={row.status} /> : <span className="text-xs text-subtle-foreground">Not started</span>}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {p.status !== "completed" && p.status !== "not-started" && (
                    <div className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border">
                      <h3 className="flex items-center gap-2 font-bold text-foreground">
                        <Flag aria-hidden className="size-4 text-amber-600" /> {p.flagged ? "Flagged" : "Needs attention?"}
                      </h3>
                      {p.flagged && p.flagNote && <p className="mt-1 text-sm text-muted-foreground">{p.flagNote}</p>}
                      <div className="mt-3">
                        <FlagForm studentId={user.id} moduleId={m.id} flagged={p.flagged} note={p.flagNote} />
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border">
                    <h3 className="flex items-center gap-2 font-bold text-foreground">
                      <Award aria-hidden className="size-4 text-emerald-600" /> Sign-off
                    </h3>
                    {signoff ? (
                      <div className="mt-2 space-y-2 text-sm">
                        <p className="text-foreground">Signed off on {formatDate(signoff.signedAt)}.</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Button asChild size="sm" variant="soft">
                            <Link href={`/certificates/${signoff.certificateCode}`}>View certificate</Link>
                          </Button>
                          <form action={undoSignOffAction}>
                            <input type="hidden" name="studentId" value={user.id} />
                            <input type="hidden" name="moduleId" value={m.id} />
                            <Button type="submit" size="sm" variant="ghost" className="text-destructive">
                              Undo sign-off
                            </Button>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <SignoffForm studentId={user.id} moduleId={m.id} items={m.signoff} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {triedUnits.length > 0 && (
          <section className="mt-12">
            <SectionTitle icon={ClipboardList}>Answers</SectionTitle>
            <p className="mt-2 text-sm text-muted-foreground">Every answer this student submitted, newest first.</p>
            <div className="mt-5 space-y-4">
              {triedUnits.map((u) => {
                const c = getConcept(u)!;
                const mine = attempts.filter((a) => a.unitId === u);
                const row = unitStatus.get(u);
                return (
                  <details key={u} id={`unit-${u}`} className="group scroll-mt-24 rounded-2xl bg-card shadow-card ring-1 ring-border open:ring-primary/40">
                    <summary className="flex min-h-14 cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3 [&::-webkit-details-marker]:hidden">
                      <span className="flex-1 font-semibold text-foreground">{c.title}</span>
                      <span className="text-xs text-muted-foreground">{mine.length} answers</span>
                      {row && <span className="text-xs text-muted-foreground tabular-nums">{row.score}%</span>}
                      <UnitStatusPill status={row?.status} />
                    </summary>
                    <ul className="divide-y divide-border border-t border-border">
                      {mine.map((a) => {
                        const p = c.problems.find((x) => x.id === a.questionId);
                        return (
                          <li key={a.id} className="flex gap-3 px-5 py-3 text-sm">
                            {a.correct ? (
                              <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                            ) : (
                              <CircleX aria-hidden className="mt-0.5 size-4 shrink-0 text-red-500" />
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="line-clamp-2 text-muted-foreground">{p?.q ?? a.questionId}</span>
                              <span className="mt-0.5 block font-medium text-foreground">Answered: {shownAnswer(p, a.answer)}</span>
                            </span>
                            <span className="shrink-0 text-right text-xs text-subtle-foreground">
                              {a.mode === "testout" ? "Test-out · " : ""}
                              {formatDate(a.createdAt)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
