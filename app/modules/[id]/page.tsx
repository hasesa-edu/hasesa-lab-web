import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Hammer,
  Lock,
  Map as MapIcon,
  Package,
  Target,
  TriangleAlert,
} from "lucide-react";
import { getConcept, getModule, moduleUnits, summarize } from "@/lib/content";
import { getViewer } from "@/lib/viewer";
import { hasFullAccess } from "@/lib/access";
import { isUnitDone, moduleProgress } from "@/lib/summary";
import { DISCIPLINES } from "@/lib/disciplines";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";
import { SUBJECT_STYLES, SubjectIcon, SubjectLabel } from "@/components/Subject";
import { Button } from "@/components/ui/button";
import { EnrollButton } from "@/components/module/EnrollButton";
import {
  BackLink,
  EnrolCard,
  HeaderChip,
  KIND_LABEL,
  ProgressBar,
  SectionTitle,
  StatusBadge,
  UnitStatusPill,
  VideoEmbed,
} from "@/components/module/ui";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getModule((await params).id);
  if (!m) return { title: `Module not found · ${BRAND}` };
  return { title: `${m.title}: ${m.tagline} · ${BRAND}`, description: m.hook };
}

export default async function ModulePage({ params }: Props) {
  const { id } = await params;
  const m = getModule(id);
  if (!m) notFound();
  const { access, state } = await getViewer();
  const full = hasFullAccess(access);
  const summary = summarize(m);
  const progress = state ? moduleProgress(m, state) : null;
  const pct = progress && progress.stepsTotal ? Math.round((progress.stepsDone / progress.stepsTotal) * 100) : 0;
  const lead = m.disciplines[0];
  const unitIds = moduleUnits(m);
  const doneSteps = new Set(state?.steps.filter((s) => s.moduleId === m.id && s.done).map((s) => s.stepId));
  const unitStatus = new Map(state?.units.map((u) => [u.unitId, u.status]));

  return (
    <article>
      <header className="relative overflow-hidden bg-deep text-deep-foreground">
        <SubjectIcon subject={lead} className="absolute top-1/2 right-[6%] hidden size-64 -translate-y-1/2 rotate-12 text-white/[0.06] lg:block" />
        <div className="relative mx-auto max-w-5xl px-4 pt-6 pb-9 sm:pt-8 sm:pb-12">
          <BackLink href="/modules">← All modules</BackLink>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {m.disciplines.map((d) => (
              <span key={d} className="inline-flex h-7 items-center rounded-full bg-card px-3 shadow-soft">
                <SubjectLabel subject={d} />
              </span>
            ))}
          </div>
          <h1 className="font-dial mt-3 text-5xl leading-[0.95] font-extrabold text-balance sm:text-7xl lg:text-8xl">{m.title}</h1>
          <p className="mt-2 text-xl font-semibold text-sun sm:text-2xl">{m.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <HeaderChip icon={Clock}>About {m.hours} hours</HeaderChip>
            <HeaderChip icon={Hammer}>{m.steps.length} steps</HeaderChip>
            <HeaderChip icon={BookOpen}>{unitIds.length} concept units</HeaderChip>
            <StatusBadge status={m.status} onDark className="h-8 px-3 text-sm" />
          </div>
          {full && progress && (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {progress.status === "active" && progress.nextStep && (
                <Button asChild size="lg" className="bg-sun font-semibold text-deep shadow-pop hover:bg-sun/90">
                  <Link href={`/modules/${m.id}/${progress.nextStep.id}`}>
                    {progress.stepsDone ? "Continue" : "Begin"}: {progress.nextStep.title} <ChevronRight aria-hidden />
                  </Link>
                </Button>
              )}
              <EnrollButton moduleId={m.id} status={progress.status} />
              {access.level === "guide" && (
                <Button asChild variant="ghost" className="bg-white/10 text-deep-foreground ring-1 ring-white/15 hover:bg-white/20 hover:text-deep-foreground">
                  <Link href={`/modules/${m.id}/guide`}>
                    <GraduationCap aria-hidden /> Guide&apos;s version
                  </Link>
                </Button>
              )}
            </div>
          )}
          {full && progress && progress.status !== "not-started" && (
            <div className="mt-6 max-w-md">
              <div className="flex justify-between text-xs font-semibold text-deep-foreground/75">
                <span>Your progress</span>
                <span className="tabular-nums">
                  {progress.stepsDone}/{progress.stepsTotal} steps · {progress.unitsDone}/{progress.unitsTotal} units
                </span>
              </div>
              <ProgressBar pct={pct} className="mt-2 bg-white/15" />
            </div>
          )}
        </div>
        <span aria-hidden className={cn("absolute inset-x-0 bottom-0 h-1.5", SUBJECT_STYLES[lead].bg)} />
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-16">
        {progress?.certificateCode && (
          <Link
            href={`/certificates/${progress.certificateCode}`}
            className="mt-8 flex items-center gap-4 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-300 transition hover:ring-emerald-500 dark:bg-emerald-950/40 dark:ring-emerald-800"
          >
            <Award aria-hidden className="size-8 shrink-0 text-emerald-600" />
            <span className="flex-1">
              <span className="block font-bold text-foreground">Module complete. Your guide signed you off.</span>
              <span className="text-sm text-muted-foreground">View and print your certificate</span>
            </span>
            <ChevronRight aria-hidden className="size-5 text-emerald-600" />
          </Link>
        )}

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl bg-sun-soft p-6 ring-1 ring-sun/30">
            <p className="text-sm font-bold text-amber-800 dark:text-sun">The mystery</p>
            <p className="mt-2 text-lg leading-relaxed font-medium text-foreground">{m.hook}</p>
          </div>
          <div className="space-y-4">
            <InfoBox icon={Target} label="Your goal">
              {m.goal}
            </InfoBox>
            <InfoBox icon={Hammer} label="What you'll build">
              {m.whatYouBuild}
            </InfoBox>
          </div>
        </div>

        {(m.trailer || !full) && (
          <section className="mt-10">
            <VideoEmbed video={m.trailer} title={`${m.title} trailer`} />
          </section>
        )}

        {m.body && (
          <section className="mt-10 max-w-3xl">
            <Markdown>{m.body}</Markdown>
          </section>
        )}

        <section className="mt-12">
          <SectionTitle icon={MapIcon}>The journey</SectionTitle>
          <ol className="mt-5 space-y-3">
            {m.steps.map((s, i) => {
              const done = doneSteps.has(s.id);
              const inner = (
                <>
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full font-heading text-lg font-extrabold",
                      done ? "bg-emerald-600 text-white" : cn(SUBJECT_STYLES[lead].soft, SUBJECT_STYLES[lead].text)
                    )}
                  >
                    {done ? <Check aria-hidden className="size-5" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-xs font-semibold tracking-wide text-subtle-foreground uppercase">
                      {KIND_LABEL[s.kind]} · {s.minutes} min
                    </span>
                    <span className="mt-0.5 block font-bold text-foreground">{s.title}</span>
                    {s.units.length > 0 && (
                      <span className="mt-1.5 flex flex-wrap gap-1.5">
                        {s.units.map((u) => (
                          <span key={u} className="inline-flex h-6 items-center rounded-full bg-muted px-2 text-xs text-muted-foreground">
                            {getConcept(u)?.title}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                  {full ? (
                    <ChevronRight aria-hidden className="size-5 shrink-0 text-subtle-foreground" />
                  ) : (
                    <Lock aria-hidden className="size-4 shrink-0 text-subtle-foreground" />
                  )}
                </>
              );
              const cls = "flex items-center gap-4 rounded-2xl bg-card p-4 shadow-card ring-1 ring-border";
              return (
                <li key={s.id}>
                  {full ? (
                    <Link href={`/modules/${m.id}/${s.id}`} className={cn(cls, "transition hover:ring-primary/50")}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-12">
          <SectionTitle icon={BookOpen}>Concept units</SectionTitle>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            The theory you pick up along the way. Read and practise at home; test out of any you already know.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {unitIds.map((u) => {
              const c = getConcept(u)!;
              const open = full || c.public;
              const done = isUnitDone(unitStatus.get(u));
              const body = (
                <>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                      {done && <Check aria-hidden className="size-4 text-emerald-600" />}
                      {c.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{c.summary}</span>
                  </span>
                  {c.public && !full ? (
                    <span className="inline-flex h-6 shrink-0 items-center rounded-full bg-sun px-2.5 text-xs font-bold text-deep">Free sample</span>
                  ) : full ? (
                    <UnitStatusPill status={unitStatus.get(u)} />
                  ) : (
                    <Lock aria-hidden className="size-4 shrink-0 text-subtle-foreground" />
                  )}
                </>
              );
              const cls = "flex h-full items-start gap-3 rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border";
              return (
                <li key={u}>
                  {open ? (
                    <Link href={`/concepts/${u}?from=${m.id}`} className={cn(cls, "transition hover:ring-primary/50")}>
                      {body}
                    </Link>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {summary.curriculum.length > 0 && (
          <section className="mt-12">
            <SectionTitle icon={GraduationCap}>Where this meets your school curriculum</SectionTitle>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              You&apos;ll use these topics from the national curriculum for real, in a project. Mapping is a draft until checked by
              subject teachers.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {summary.curriculum.map((c) => (
                <li key={`${c.subject}-${c.grade}-${c.unit}`} className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-card px-3 py-1 text-sm shadow-soft ring-1 ring-border">
                  <span className={cn("font-semibold", SUBJECT_STYLES[c.subject].text)}>
                    {DISCIPLINES[c.subject].label} {c.grade}
                  </span>
                  <span className="text-muted-foreground">{c.unit}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6">
            <SectionTitle icon={Package} className="text-lg sm:text-xl">
              Materials
            </SectionTitle>
            <p className="mt-2 text-sm text-muted-foreground">The Academy provides these.</p>
            <ul className="mt-4 space-y-2 text-sm">
              {m.materials.map((x, i) => (
                <li key={i} className="flex gap-2.5">
                  <span aria-hidden className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <span className="text-foreground">{x.item}</span>
                    {x.note && <span className="block text-xs text-subtle-foreground">{x.note}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl bg-red-50 p-5 ring-1 ring-red-200 sm:p-6 dark:bg-red-950/30 dark:ring-red-900">
            <h2 className="flex items-center gap-2.5 text-lg font-bold text-red-800 sm:text-xl dark:text-red-300">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-red-500 text-white">
                <TriangleAlert aria-hidden className="size-5" />
              </span>
              Safety first
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {m.safety.map((s, i) => (
                <li key={i} className="flex gap-2.5">
                  <span aria-hidden className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-red-500" />
                  <span className="leading-relaxed text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12">
          <SectionTitle icon={ClipboardCheck}>How you finish</SectionTitle>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            When you&apos;re ready, your guide checks these with you and signs you off. You then get a certificate.
          </p>
          <ul className="mt-4 space-y-2">
            {m.signoff.map((s) => (
              <li key={s.id} className="flex gap-3 rounded-xl bg-card p-3.5 text-sm shadow-soft ring-1 ring-border">
                <ClipboardCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-foreground">{s.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {!full && (
          <>
            <section className="mt-12">
              <Link
                href={`/concepts/${summary.publicSample.id}?from=${m.id}`}
                className="group flex items-center gap-4 rounded-2xl bg-primary-soft/60 p-5 ring-1 ring-primary/30 transition hover:ring-primary/60"
              >
                <BookOpen aria-hidden className="size-8 shrink-0 text-primary" />
                <span className="flex-1">
                  <span className="block text-sm font-bold text-primary-strong dark:text-primary">Try it free</span>
                  <span className="block font-bold text-foreground">{summary.publicSample.title}</span>
                  <span className="text-sm text-muted-foreground">Read a concept unit from this module and solve its problems.</span>
                </span>
                <ChevronRight aria-hidden className="size-5 text-primary transition group-hover:translate-x-0.5" />
              </Link>
            </section>
            <EnrolCard signedIn={!!access.userId} next={`/modules/${m.id}`} className="mt-8" />
          </>
        )}
      </div>
    </article>
  );
}

function InfoBox({ icon: Icon, label, children }: { icon: typeof Target; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-card p-5 shadow-card ring-1 ring-border">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-strong dark:text-primary">
        <Icon aria-hidden className="size-5" />
      </span>
      <div>
        <p className="text-sm font-bold text-subtle-foreground">{label}</p>
        <p className="mt-1 leading-relaxed text-foreground">{children}</p>
      </div>
    </div>
  );
}
