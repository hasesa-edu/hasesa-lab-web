import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Check, ChevronRight, Lock } from "lucide-react";
import { getConcept, getModule, getModules, moduleUnits, summarize } from "@/lib/content";
import type { Module } from "@/lib/content/types";
import { getViewer } from "@/lib/viewer";
import { hasFullAccess } from "@/lib/access";
import { isUnitDone, moduleProgress } from "@/lib/summary";
import { stationFor } from "@/lib/stations";
import { DISCIPLINES } from "@/lib/disciplines";
import { BRAND } from "@/lib/brand";
import { SITE_URL, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";
import { SUBJECT_STYLES, SubjectLabel } from "@/components/Subject";
import { Button } from "@/components/ui/button";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { ModuleActions, ModuleMobileBar } from "@/components/module/ModuleActions";
import { moduleContext } from "@/lib/chat-context";
import { BackLink, KIND_LABEL, ProgressBar, SectionTitle, UnitStatusPill, VideoEmbed } from "@/components/module/ui";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getModule((await params).id);
  if (!m) return { title: `Module not found · ${BRAND}` };
  return pageMeta({ title: `${m.title}: ${m.tagline} · ${BRAND}`, description: m.hook, path: `/modules/${m.id}` });
}

/*
 * A module page has two jobs. For visitors and new students it tells the
 * story: the mystery, what you'll build, the steps, the theory. For students
 * already working through it, it starts where they stopped. An action panel
 * (sign up, start, continue) stays beside the content on desktop.
 */
export default async function ModulePage({ params }: Props) {
  const { id } = await params;
  const m = getModule(id);
  if (!m) notFound();
  const { access, state } = await getViewer();
  const full = hasFullAccess(access);
  const signedIn = !!access.userId;
  const summary = summarize(m);
  const khz = stationFor(m.id, getModules().map((x) => x.id));
  const progress = state ? moduleProgress(m, state) : null;
  const unitIds = moduleUnits(m);
  const doneSteps = new Set(state?.steps.filter((s) => s.moduleId === m.id && s.done).map((s) => s.stepId));
  const unitStatus = new Map(state?.units.map((u) => [u.unitId, u.status]));
  // Returning students (module started, not finished) see where they stopped first.
  const returning = full && progress?.status === "active";
  const nextStep = returning && progress?.nextStep ? m.steps.find((s) => s.id === progress.nextStep!.id) : undefined;
  const pct = progress && progress.stepsTotal ? Math.round((progress.stepsDone / progress.stepsTotal) * 100) : 0;

  const story = <Story m={m} returning={returning} />;

  return (
    <article data-ask-scope className={cn(!full && "pb-20 lg:pb-0")}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: m.title,
          description: `${m.tagline}. ${m.hook}`,
          url: `${SITE_URL}/modules/${m.id}`,
          provider: { "@type": "EducationalOrganization", "@id": `${SITE_URL}/#org`, name: BRAND, url: `${SITE_URL}/` },
          inLanguage: "en",
          timeRequired: `PT${m.hours}H`,
          isAccessibleForFree: true,
          educationalLevel: "Ages 13–18",
          about: m.disciplines.map((d) => DISCIPLINES[d].label),
          hasCourseInstance: { "@type": "CourseInstance", courseMode: "blended", courseWorkload: `PT${m.hours}H` },
        }}
      />
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-10 sm:pt-8 sm:pb-12">
          <BackLink href="/modules">← All modules</BackLink>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
            {m.disciplines.map((d) => (
              <SubjectLabel key={d} subject={d} />
            ))}
          </div>
          <h1 className="mt-3 text-5xl leading-[1.02] font-semibold tracking-[-0.04em] sm:text-7xl">{m.title}</h1>
          <p className="mt-3 max-w-3xl text-xl font-medium text-foreground/80 sm:text-2xl">{m.tagline}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        <div className="min-w-0">
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

          {/* Returning students: pick up where you left off. */}
          {returning && nextStep && (
            <section className="mt-10 rounded-lg border border-border bg-accent p-5 sm:p-6">
              <p className="font-mono text-xs tracking-[0.08em] text-accent-foreground uppercase">Pick up where you left off</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Step {m.steps.indexOf(nextStep) + 1}, {KIND_LABEL[nextStep.kind].toLowerCase()}, about {nextStep.minutes} min
              </p>
              <p className="mt-1 text-2xl leading-snug font-semibold">{nextStep.title}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button asChild size="lg" variant="ink">
                  <Link href={`/modules/${m.id}/${nextStep.id}`}>{progress!.stepsDone ? "Continue" : "Begin"}</Link>
                </Button>
                <div className="min-w-48 flex-1">
                  <p className="text-sm text-muted-foreground">
                    {progress!.stepsDone} of {progress!.stepsTotal} steps · {progress!.unitsDone} of {progress!.unitsTotal} units
                  </p>
                  <ProgressBar pct={pct} className="mt-2" />
                </div>
              </div>
            </section>
          )}

          {!returning && story}

          {/* The steps, as a tuning track. */}
          <section className={returning ? "mt-14" : "mt-20"}>
            <SectionTitle>The steps</SectionTitle>
            <ol className="relative mt-8 max-w-3xl border-l-2 border-primary/30 pl-8 sm:pl-12">
              {m.steps.map((s, i) => {
                const done = doneSteps.has(s.id);
                const current = returning && s.id === nextStep?.id;
                const body = (
                  <>
                    <p className="text-sm text-muted-foreground">
                      {KIND_LABEL[s.kind]}, {s.minutes} min
                      {current && <span className="ml-2 font-mono text-[11px] tracking-[0.08em] text-primary uppercase">You&apos;re here</span>}
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
                        done
                          ? "bg-primary text-primary-foreground"
                          : current
                            ? "border-2 border-primary bg-card text-primary"
                            : "border border-input bg-card text-foreground"
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

          {/* The theory, with where each unit meets the school curriculum. */}
          <section className="mt-20">
            <SectionTitle>The theory</SectionTitle>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Concept units you read and practise at home. They&apos;re shared between modules, and you can test out of any you
              already know. The curriculum tags are a draft until subject teachers check them.
            </p>
            <ul className="mt-8 border-t border-border">
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
                      {c.curriculum.length > 0 && (
                        <span className="mt-2 flex flex-wrap gap-1.5">
                          {c.curriculum.map((r) => (
                            <span
                              key={`${r.subject}-${r.grade}-${r.unit}`}
                              className="rounded-full border border-border px-2 py-0.5 text-xs"
                            >
                              <span className={cn("font-bold", SUBJECT_STYLES[r.subject].text)}>
                                {DISCIPLINES[r.subject].label} {r.grade}
                              </span>{" "}
                              <span className="text-muted-foreground">{r.unit}</span>
                            </span>
                          ))}
                        </span>
                      )}
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

          {returning && story}

          {/* Before you start: materials and safety, open for enrolled students. */}
          <section className="mt-20">
            <SectionTitle>Before you start</SectionTitle>
            <div className="mt-6 grid gap-10 sm:grid-cols-2">
              <details open={full} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xl font-semibold [&::-webkit-details-marker]:hidden">
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
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xl font-semibold text-red-700 [&::-webkit-details-marker]:hidden">
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
            </div>
            {m.body && (
              <details className="group mt-10 max-w-3xl">
                <summary className="flex cursor-pointer list-none items-center gap-2 font-bold text-primary [&::-webkit-details-marker]:hidden">
                  <ChevronRight aria-hidden className="size-4 transition group-open:rotate-90" />
                  Read the full module overview
                </summary>
                <div className="mt-4">
                  <Markdown>{m.body}</Markdown>
                </div>
              </details>
            )}
          </section>
        </div>

        {/* Phones: the panel goes first only when it holds the main action (Start); visitors have the
            bottom bar and returning students the pick-up card, so for them it sits at the end. */}
        <aside aria-label="Module actions" className={cn("mt-8 lg:order-none lg:mt-10", full && !returning && "order-first")}>
          <div className="lg:sticky lg:top-24">
            <ModuleActions
              moduleId={m.id}
              hours={m.hours}
              steps={m.steps.length}
              units={unitIds.length}
              khz={khz}
              status={m.status}
              full={full}
              signedIn={signedIn}
              guide={access.level === "guide"}
              progress={progress}
              sample={summary.publicSample}
            />
          </div>
        </aside>
      </div>

      {!full && <ModuleMobileBar moduleId={m.id} signedIn={signedIn} sample={summary.publicSample} />}

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

/** The mystery, the goal, what you'll build and the trailer. First for newcomers; "About this module" for returning students. */
function Story({ m, returning }: { m: Module; returning: boolean }) {
  return (
    <section className={returning ? "mt-20" : "mt-10 sm:mt-14"}>
      {returning ? (
        <SectionTitle>About this module</SectionTitle>
      ) : (
        <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">The mystery</p>
      )}
      <p
        className={cn(
          "max-w-4xl font-semibold tracking-[-0.03em]",
          returning ? "mt-6 text-2xl leading-snug" : "mt-3 font-display text-3xl leading-[1.1] sm:text-4xl"
        )}
      >
        {m.hook}
      </p>
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
      {m.trailer && (
        <div className="mt-10 max-w-3xl">
          <VideoEmbed video={m.trailer} title={`${m.title} trailer`} />
        </div>
      )}
    </section>
  );
}
