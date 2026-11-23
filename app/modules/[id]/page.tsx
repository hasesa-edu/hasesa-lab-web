import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Lock } from "lucide-react";
import { getConcept, getModule, moduleUnits, summarize } from "@/lib/content";
import type { Module } from "@/lib/content/types";
import { getViewer } from "@/lib/viewer";
import { hasFullAccess } from "@/lib/access";
import { cardStates, isUnitDone, moduleProgress } from "@/lib/summary";
import { DISCIPLINES, LEVELS, STATUS_LABEL } from "@/lib/disciplines";
import { BRAND } from "@/lib/brand";
import { SITE_URL, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { type Viewer, catalogueItem } from "@/lib/catalogue";
import { ModuleAction } from "@/components/module/ModuleCard";
import { ModuleCover } from "@/components/module/ModuleCover";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";
import { SUBJECT_STYLES, SubjectLabel } from "@/components/Subject";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { ModuleIncludes, ModuleMobileBar } from "@/components/module/ModuleActions";
import { SectionTabs } from "@/components/module/SectionTabs";
import { moduleContext } from "@/lib/chat-context";
import { BackLink, KIND_LABEL, SectionTitle, UnitStatusPill, VideoEmbed } from "@/components/module/ui";

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
 * already working through it, it starts where they stopped. The banner holds
 * the one thing to do next (sign up, start, continue; for visitors on phones
 * it is pinned to the bottom too); tabs under it jump between the sections.
 */
export default async function ModulePage({ params }: Props) {
  const { id } = await params;
  const m = getModule(id);
  if (!m) notFound();
  const { access, state } = await getViewer();
  const full = hasFullAccess(access);
  const signedIn = !!access.userId;
  const summary = summarize(m);
  const item = catalogueItem(summary);
  const viewer: Viewer = !signedIn ? "visitor" : full ? "full" : "limited";
  const progress = state ? moduleProgress(m, state) : null;
  const unitIds = moduleUnits(m);
  const doneSteps = new Set(state?.steps.filter((s) => s.moduleId === m.id && s.done).map((s) => s.stepId));
  const unitStatus = new Map(state?.units.map((u) => [u.unitId, u.status]));
  const cardState = cardStates([m], state)[m.id];
  // Returning students (module started, not finished) see where they stopped first.
  const returning = full && progress?.status === "active";
  const completed = full && progress?.status === "completed";
  const nextStep = returning && progress?.nextStep ? m.steps.find((s) => s.id === progress.nextStep!.id) : undefined;
  const sample = summary.publicSample;

  // Returning students get the steps first and the story later; the tabs follow the page's order.
  const tabs = [
    ...(returning ? [] : [{ id: "overview", label: "Overview" }]),
    { id: "steps", label: "Steps" },
    { id: "theory", label: "Theory" },
    { id: "finish", label: "How you finish" },
    ...(returning ? [{ id: "overview", label: "About" }] : []),
    { id: "materials", label: "Materials & safety" },
  ];
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
          // Online material is free during the pilot; a place at the Academy (the hands-on sessions) is paid.
          isAccessibleForFree: false,
          offers: {
            "@type": "Offer",
            category: "Paid",
            price: 12000,
            priceCurrency: "ETB",
            description: "A year at Hasesa Academy, Addis Ababa. Online modules and concept units are free during the pilot.",
          },
          educationalLevel: `${LEVELS[m.level].label}, ages 13–18`,
          about: m.disciplines.map((d) => DISCIPLINES[d].label),
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "blended",
            courseWorkload: `PT${m.hours}H`,
            location: { "@type": "Place", name: "Partner schools", address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" } },
          },
        }}
      />
      <header className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-6 pb-10 sm:pt-8 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <BackLink href="/modules">← All modules</BackLink>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase" title={LEVELS[m.level].blurb}>
                {LEVELS[m.level].label}
              </span>
              {m.disciplines.map((d) => (
                <SubjectLabel key={d} subject={d} />
              ))}
            </div>
            <h1 className="mt-3 text-5xl leading-[1.02] font-semibold tracking-[-0.04em] sm:text-6xl">{m.title}</h1>
            <p className="mt-3 max-w-3xl text-xl font-medium text-foreground/80 sm:text-2xl">{m.tagline}</p>
            {/* Phones only: on desktop the side card has these facts. */}
            <p className="mt-4 font-mono text-xs text-muted-foreground lg:hidden">
              ~{m.hours} hours · {m.steps.length} steps · {unitIds.length} concept units · {STATUS_LABEL[m.status]}
            </p>
            {nextStep && (
              <p className="mt-6 text-sm">
                <span className="font-mono text-[11px] tracking-[0.08em] text-primary uppercase">Next</span>{" "}
                <span className="text-muted-foreground">
                  Step {m.steps.indexOf(nextStep) + 1} of {m.steps.length} ·{" "}
                </span>
                <span className="font-semibold">{nextStep.title}</span>
                <span className="text-muted-foreground"> · ~{nextStep.minutes} min</span>
              </p>
            )}
            {completed && <p className="mt-6 font-semibold">Module complete. Your guide signed you off.</p>}
            <ModuleAction item={item} state={cardState} viewer={viewer} size="lg" className={nextStep || completed ? "mt-3" : "mt-6"} />
          </div>
          <ModuleCover id={m.id} disciplines={m.disciplines} level={m.level} className="hidden rounded-xl border border-border sm:block" />
        </div>
        {/* What you'll achieve: the sign-off checks, which are what a student can do by the end. */}
        <div className="border-t border-border">
          <div id="outcomes" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-6">
            <h2 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">What you&apos;ll achieve</h2>
            <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {m.signoff.map((s) => (
                <li key={s.id} className="flex items-start gap-2 text-sm leading-relaxed">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-primary" />
                  {s.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <SectionTabs sections={tabs} />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        <div className="min-w-0">
          {!returning && story}

          {/* The steps, as a track. Everyone sees what each one holds; students open them. */}
          <section id="steps" className={cn("scroll-mt-32", returning ? "mt-12" : "mt-20")}>
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
                    <p className="mt-1.5 text-foreground/75">{s.summary ?? s.sections.join(" · ")}</p>
                    {s.units.length > 0 && (
                      <p className="mt-2 text-sm text-muted-foreground">Theory: {s.units.map((u) => getConcept(u)?.title).join(", ")}</p>
                    )}
                  </>
                );
                const free = !full && s.units.includes(sample.id);
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
                      <div>
                        {body}
                        {free && (
                          <Link
                            href={`/concepts/${sample.id}?from=${m.id}`}
                            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1 text-sm font-medium text-primary transition hover:bg-primary/10"
                          >
                            Free sample: {sample.title} <ArrowRight aria-hidden className="size-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>

          {/* The theory, with where each unit meets the school curriculum. */}
          <section id="theory" className="mt-20 scroll-mt-32">
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

          <section id="finish" className="mt-20 max-w-3xl scroll-mt-32">
            <SectionTitle>How you finish</SectionTitle>
            <ol className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                ["Work through the steps", `${m.steps.length} steps at the Academy, with the theory at home in between.`],
                ["Show your guide", `They check the ${m.signoff.length} things in What you'll achieve with you, and sign you off.`],
                ["Get your certificate", "A certificate for the module, to print and keep."],
              ].map(([title, body], n) => (
                <li key={title} className="border-t border-input pt-4">
                  <span className="font-mono text-sm text-primary tabular-nums">{String(n + 1).padStart(2, "0")}</span>
                  <p className="mt-1 font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
            <a href="#outcomes" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              See what your guide checks <ArrowRight aria-hidden className="size-4" />
            </a>
          </section>

          {returning && story}

          {/* Before you start: materials and safety, open for enrolled students. */}
          <section id="materials" className="mt-20 scroll-mt-32">
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

        {/* The facts at a glance; below the section tabs while scrolling on desktop, at the end on phones. */}
        <aside aria-label="About this module" className="mt-8 lg:mt-10">
          <div className="lg:sticky lg:top-32">
            <ModuleIncludes
              moduleId={m.id}
              hours={m.hours}
              steps={m.steps.length}
              units={unitIds.length}
              materials={m.materials.length}
              status={m.status}
              progress={full ? (progress?.status ?? null) : null}
              guide={access.level === "guide"}
            />
          </div>
        </aside>
      </div>

      {/* Phones, visitors: the banner's action stays in reach. (Students have the lab assistant's bar there instead.) */}
      {!full && <ModuleMobileBar item={item} viewer={viewer} />}

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
    <section id="overview" className={cn("scroll-mt-32", returning ? "mt-20" : "mt-10 sm:mt-14")}>
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
