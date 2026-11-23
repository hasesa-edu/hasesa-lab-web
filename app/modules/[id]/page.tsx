import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Check, ChevronRight, GraduationCap, Lock } from "lucide-react";
import { getConcept, getModule, getModules, moduleUnits, summarize } from "@/lib/content";
import { getViewer } from "@/lib/viewer";
import { hasFullAccess } from "@/lib/access";
import { isUnitDone, moduleProgress } from "@/lib/summary";
import { stationFor } from "@/lib/stations";
import { DISCIPLINES } from "@/lib/disciplines";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";
import { SUBJECT_STYLES, SubjectLabel } from "@/components/Subject";
import { Button } from "@/components/ui/button";
import { EnrollButton } from "@/components/module/EnrollButton";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { moduleContext } from "@/lib/chat-context";
import { BackLink, EnrolCard, KIND_LABEL, ProgressBar, SectionTitle, StatusBadge, UnitStatusPill, VideoEmbed } from "@/components/module/ui";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getModule((await params).id);
  if (!m) return { title: `Module not found · ${BRAND}` };
  return { title: `${m.title}: ${m.tagline} · ${BRAND}`, description: m.hook };
}

/*
 * A module page reads top to bottom like a story: the mystery, what you'll
 * build, the journey (a tuning track of steps), then the theory and the
 * practical details. Visitors get the story; materials and safety fold away.
 */
export default async function ModulePage({ params }: Props) {
  const { id } = await params;
  const m = getModule(id);
  if (!m) notFound();
  const { access, state } = await getViewer();
  const full = hasFullAccess(access);
  const summary = summarize(m);
  const khz = stationFor(m.id, getModules().map((x) => x.id));
  const progress = state ? moduleProgress(m, state) : null;
  const pct = progress && progress.stepsTotal ? Math.round((progress.stepsDone / progress.stepsTotal) * 100) : 0;
  const unitIds = moduleUnits(m);
  const doneSteps = new Set(state?.steps.filter((s) => s.moduleId === m.id && s.done).map((s) => s.stepId));
  const unitStatus = new Map(state?.units.map((u) => [u.unitId, u.status]));
  const started = !!progress && progress.status !== "not-started";

  return (
    <article data-ask-scope>
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-10 sm:pt-8 sm:pb-14">
          <BackLink href="/modules">← All modules</BackLink>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {m.disciplines.map((d) => (
                  <SubjectLabel key={d} subject={d} />
                ))}
              </div>
              <h1 className="mt-3 text-5xl leading-[1.02] font-semibold tracking-[-0.04em] sm:text-7xl">{m.title}</h1>
              <p className="mt-3 text-xl font-medium text-foreground/80 sm:text-2xl">{m.tagline}</p>
              <p className="mt-4 font-mono text-xs tracking-[0.06em] text-muted-foreground uppercase">
                About {m.hours} hours, {m.steps.length} steps and {unitIds.length} concept units.
              </p>
              <StatusBadge status={m.status} className="mt-3" />
            </div>
            {khz && (
              <p className="font-mono text-4xl leading-none tracking-[-0.02em] text-foreground tabular-nums lg:text-6xl" aria-label={`Station ${khz} kilohertz`}>
                {khz}
                <span className="ml-1.5 text-lg text-muted-foreground">kHz</span>
              </p>
            )}
          </div>

          {full && progress && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {progress.status === "active" && progress.nextStep && (
                <Button asChild size="lg">
                  <Link href={`/modules/${m.id}/${progress.nextStep.id}`}>
                    {progress.stepsDone ? "Continue" : "Begin"}: {progress.nextStep.title}
                  </Link>
                </Button>
              )}
              <EnrollButton moduleId={m.id} status={progress.status} />
              {access.level === "guide" && (
                <Button asChild variant="outline">
                  <Link href={`/modules/${m.id}/guide`}>
                    <GraduationCap aria-hidden /> Guide&apos;s version
                  </Link>
                </Button>
              )}
            </div>
          )}
          {full && started && (
            <div className="mt-6 max-w-md">
              <p className="text-sm text-muted-foreground">
                Your progress: {progress!.stepsDone} of {progress!.stepsTotal} steps, {progress!.unitsDone} of {progress!.unitsTotal} concept units
              </p>
              <ProgressBar pct={pct} className="mt-2" />
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        {progress?.certificateCode && (
          <Link
            href={`/certificates/${progress.certificateCode}`}
            className="mt-10 flex items-center gap-4 border-y border-border py-5 transition hover:bg-muted"
          >
            <Award aria-hidden className="size-8 shrink-0 text-primary" />
            <span className="flex-1">
              <span className="block font-bold">Module complete. Your guide signed you off.</span>
              <span className="text-sm text-muted-foreground">View and print your certificate</span>
            </span>
            <ChevronRight aria-hidden className="size-5 text-primary" />
          </Link>
        )}

        {/* The mystery leads. */}
        <section className="mt-14 sm:mt-20">
          <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">The mystery</p>
          <p className="mt-3 max-w-4xl font-display text-3xl leading-[1.1] font-semibold sm:text-4xl tracking-[-0.03em]">{m.hook}</p>
          <div className="mt-10 grid max-w-4xl gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs tracking-[0.08em] text-primary uppercase">Your goal</p>
              <p className="mt-2 text-lg leading-relaxed">{m.goal}</p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.08em] text-primary uppercase">What you&apos;ll build</p>
              <p className="mt-2 text-lg leading-relaxed">{m.whatYouBuild}</p>
            </div>
          </div>
        </section>

        {/* The journey: a tuning track with a stop for every step. */}
        <section className="mt-20">
          <SectionTitle>The journey</SectionTitle>
          <ol className="relative mt-8 max-w-3xl border-l-2 border-primary/30 pl-8 sm:pl-12">
            {m.steps.map((s, i) => {
              const done = doneSteps.has(s.id);
              const body = (
                <>
                  <p className="text-sm text-muted-foreground">
                    {KIND_LABEL[s.kind]}, {s.minutes} min
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xl leading-snug font-semibold transition-colors group-hover:text-primary">
                    {s.title}
                    {!full && <Lock aria-hidden className="size-4 shrink-0 text-muted-foreground" />}
                  </p>
                  {s.units.length > 0 && (
                    <p className="mt-2 text-sm text-muted-foreground">Theory: {s.units.map((u) => getConcept(u)?.title).join(", ")}</p>
                  )}
                </>
              );
              return (
                <li key={s.id} className="relative pb-9 last:pb-0">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-0 -left-[calc(2rem+1.15rem)] flex size-8 items-center justify-center rounded-full font-mono text-sm ring-4 ring-background sm:-left-[calc(3rem+1.15rem)]",
                      done ? "bg-primary text-primary-foreground" : "border border-input bg-card text-foreground"
                    )}
                  >
                    {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                  </span>
                  {full ? (
                    <Link href={`/modules/${m.id}/${s.id}`} className="group block outline-none focus-visible:ring-3 focus-visible:ring-ring/40">
                      {body}
                    </Link>
                  ) : (
                    <div>{body}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        {m.trailer && (
          <section className="mt-20 max-w-3xl">
            <SectionTitle>See it built</SectionTitle>
            <div className="mt-6">
              <VideoEmbed video={m.trailer} title={`${m.title} trailer`} />
            </div>
          </section>
        )}

        {/* Concept units as rows */}
        <section className="mt-20">
          <SectionTitle>The theory</SectionTitle>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Concept units you read and practise at home. They&apos;re shared between modules, and you can test out of any you already know.
          </p>
          <ul className="mt-8 max-w-4xl border-t border-border">
            {unitIds.map((u) => {
              const c = getConcept(u)!;
              const open = full || c.public;
              const done = isUnitDone(unitStatus.get(u));
              const row = (
                <>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-bold group-hover:text-primary">
                      {done && <Check aria-hidden className="size-4 text-primary" />}
                      {c.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{c.summary}</span>
                  </span>
                  {c.public && !full ? (
                    <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-primary uppercase">Free sample</span>
                  ) : full ? (
                    <UnitStatusPill status={unitStatus.get(u)} />
                  ) : (
                    <Lock aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </>
              );
              const cls = "flex items-start gap-4 border-b border-border py-4";
              return (
                <li key={u}>
                  {open ? (
                    <Link href={`/concepts/${u}?from=${m.id}`} className={cn(cls, "group outline-none focus-visible:bg-muted")}>
                      {row}
                    </Link>
                  ) : (
                    <div className={cls}>{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {summary.curriculum.length > 0 && (
          <section className="mt-20">
            <SectionTitle>Where this meets your school curriculum</SectionTitle>
            <p className="mt-3 max-w-2xl text-muted-foreground">The topics from the national curriculum you&apos;ll use for real. A draft until subject teachers check it.</p>
            <ul className="mt-6 flex max-w-4xl flex-wrap gap-2">
              {summary.curriculum.slice(0, 6).map((c) => (
                <li key={`${c.subject}-${c.grade}-${c.unit}`} className="rounded-full border border-border px-3 py-1 text-sm">
                  <span className={cn("font-bold", SUBJECT_STYLES[c.subject].text)}>
                    {DISCIPLINES[c.subject].label} {c.grade}
                  </span>{" "}
                  <span className="text-muted-foreground">{c.unit}</span>
                </li>
              ))}
            </ul>
            {summary.curriculum.length > 6 && (
              <details className="group mt-3 max-w-4xl">
                <summary className="cursor-pointer list-none font-bold text-primary [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">Show all {summary.curriculum.length} topics</span>
                  <span className="hidden group-open:inline">Show fewer</span>
                </summary>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {summary.curriculum.slice(6).map((c) => (
                    <li key={`${c.subject}-${c.grade}-${c.unit}`} className="rounded-full border border-border px-3 py-1 text-sm">
                  <span className={cn("font-bold", SUBJECT_STYLES[c.subject].text)}>
                    {DISCIPLINES[c.subject].label} {c.grade}
                  </span>{" "}
                  <span className="text-muted-foreground">{c.unit}</span>
                </li>
                  ))}
                </ul>
              </details>
            )}
          </section>
        )}

        <section className="mt-20 max-w-3xl">
          <SectionTitle>How you finish</SectionTitle>
          <p className="mt-3 text-muted-foreground">When you&apos;re ready, your guide checks these with you and signs you off. Then you get a certificate.</p>
          <ul className="mt-6 border-t border-border">
            {m.signoff.map((s) => (
              <li key={s.id} className="flex gap-3 border-b border-border py-3.5">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-primary" />
                <span>{s.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Practical details: open for enrolled students, folded away for visitors. */}
        <section className="mt-20 grid max-w-5xl gap-10 lg:grid-cols-2">
          <details open={full} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-2xl font-semibold [&::-webkit-details-marker]:hidden">
              Materials
              <ChevronRight aria-hidden className="size-5 text-muted-foreground transition group-open:rotate-90" />
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">The Academy provides these.</p>
            <ul className="mt-4 space-y-2.5">
              {m.materials.map((x, i) => (
                <li key={i} className="border-b border-border pb-2.5">
                  {x.item}
                  {x.note && <span className="block text-sm text-muted-foreground">{x.note}</span>}
                </li>
              ))}
            </ul>
          </details>
          <details open={full} className="group border-l-2 border-red-500 pl-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-2xl font-semibold text-red-700 [&::-webkit-details-marker]:hidden">
              Safety first
              <ChevronRight aria-hidden className="size-5 text-red-400 transition group-open:rotate-90" />
            </summary>
            <ul className="mt-4 space-y-2.5">
              {m.safety.map((s, i) => (
                <li key={i} className="leading-relaxed">
                  {s}
                </li>
              ))}
            </ul>
          </details>
        </section>

        {m.body && (
          <details className="group mt-16 max-w-3xl">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-bold text-primary [&::-webkit-details-marker]:hidden">
              <ChevronRight aria-hidden className="size-4 transition group-open:rotate-90" />
              Read the full module overview
            </summary>
            <div className="mt-4">
              <Markdown>{m.body}</Markdown>
            </div>
          </details>
        )}

        {!full && (
          <>
            <Link
              href={`/concepts/${summary.publicSample.id}?from=${m.id}`}
              className="group mt-20 flex max-w-3xl items-center gap-4 border-y-2 border-border py-6"
            >
              <span className="flex-1">
                <span className="block font-mono text-[11px] tracking-[0.08em] text-primary uppercase">Try it free</span>
                <span className="block text-2xl font-semibold group-hover:text-primary">{summary.publicSample.title}</span>
                <span className="text-muted-foreground">Read a concept unit from this module and solve its problems.</span>
              </span>
              <ChevronRight aria-hidden className="size-6 text-primary transition group-hover:translate-x-0.5" />
            </Link>
            <EnrolCard signedIn={!!access.userId} next={`/modules/${m.id}`} className="mt-10" />
          </>
        )}
      </div>
      {full && (
        <AssistantPanel
          context={moduleContext(m.id)}
          about={`the ${m.title} module`}
          suggestions={[
            `What will I actually learn in ${m.title}?`,
            "Where did I stop, and what should I do next?",
            "How does this connect to what I'm learning at school?",
          ]}
        />
      )}
    </article>
  );
}
