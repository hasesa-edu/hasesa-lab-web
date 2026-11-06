import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Check, CirclePlay, Clock, MessageCircle, MessageSquareQuote } from "lucide-react";
import { getConcept, getStep } from "@/lib/content";
import { getViewer } from "@/lib/viewer";
import { hasFullAccess } from "@/lib/access";
import { isUnitDone } from "@/lib/summary";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";
import { SUBJECT_STYLES } from "@/components/Subject";
import { StepNotebook } from "@/components/module/StepNotebook";
import { BackLink, HeaderChip, KIND_LABEL, SectionTitle, StatusBadge, UnitStatusPill, VideoEmbed } from "@/components/module/ui";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string; step: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, step } = await params;
  const found = getStep(id, step);
  if (!found) return { title: `Step not found · ${BRAND}` };
  return { title: `${found.step.title} · ${found.module.title} · ${BRAND}`, robots: { index: false } };
}

const NOTEBOOK_PROMPT: Record<string, string> = {
  hook: "Write down your predictions and every question you have.",
  investigate: "Record what you did, your measurements and what you noticed.",
  build: "Record what you built, what went wrong and how you fixed it.",
  finish: "Explain how the whole thing works, in your own words.",
};

export default async function StepPage({ params }: Props) {
  const { id, step: stepId } = await params;
  const found = getStep(id, stepId);
  if (!found) notFound();
  const { module: m, step, index } = found;
  const { access, state } = await getViewer();
  if (!access.userId) redirect(`/login?next=${encodeURIComponent(`/modules/${id}/${stepId}`)}`);
  if (!hasFullAccess(access)) redirect(`/modules/${id}`);

  const saved = state?.steps.find((s) => s.moduleId === m.id && s.stepId === step.id);
  const unitStatus = new Map(state?.units.map((u) => [u.unitId, u.status]));
  const feedback = state?.feedback.filter((f) => f.moduleId === m.id && f.stepId === step.id) ?? [];
  const prev = m.steps[index - 1];
  const next = m.steps[index + 1];
  const lead = m.disciplines[0];
  const ready = step.units.filter((u) => isUnitDone(unitStatus.get(u))).length;

  return (
    <article>
      <header className="relative overflow-hidden bg-deep text-deep-foreground">
        <div className="relative mx-auto max-w-3xl px-4 pt-6 pb-9 sm:pt-8">
          <BackLink href={`/modules/${m.id}`}>← {m.title}</BackLink>
          <p className="mt-4 text-sm font-bold text-sun">
            Step {index + 1} of {m.steps.length} · {KIND_LABEL[step.kind]}
          </p>
          <h1 className="font-dial mt-2 text-4xl leading-[0.95] font-extrabold text-balance sm:text-7xl">{step.title}</h1>
          <div className="mt-5 flex flex-wrap gap-2">
            <HeaderChip icon={Clock}>{step.minutes} min</HeaderChip>
            {saved?.done && <HeaderChip icon={Check}>Done</HeaderChip>}
            <StatusBadge status={m.status} onDark className="h-8 px-3 text-sm" />
          </div>
        </div>
        <span aria-hidden className={cn("absolute inset-x-0 bottom-0 h-1.5", SUBJECT_STYLES[lead].bg)} />
      </header>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        {feedback.length > 0 && (
          <section className="mt-8 space-y-2">
            {feedback.map((f) => (
              <div key={f.id} className="flex gap-3 rounded-2xl bg-sun-soft p-4 ring-1 ring-sun/30">
                <MessageSquareQuote aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-sun" />
                <div>
                  <p className="text-xs font-bold tracking-wide text-amber-800 uppercase dark:text-sun">Your guide</p>
                  <p className="mt-1 whitespace-pre-wrap text-foreground">{f.body}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {step.video && (
          <section className="mt-8">
            <SectionTitle icon={CirclePlay} className="mb-4">
              Watch
            </SectionTitle>
            <VideoEmbed video={step.video} title={step.title} />
          </section>
        )}

        <section className="mt-8">
          <Markdown>{step.body}</Markdown>
        </section>

        {step.units.length > 0 && (
          <section className="mt-12 rounded-2xl bg-primary-soft/40 p-5 ring-1 ring-primary/20 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <SectionTitle icon={BookOpen} className="text-lg sm:text-xl">
                The science behind this step
              </SectionTitle>
              <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                {ready}/{step.units.length} done
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Read these at home after you&apos;ve tried the step, then solve their problems. They&apos;ll help you do it better next time.
            </p>
            <ul className="mt-4 space-y-2">
              {step.units.map((u) => {
                const c = getConcept(u)!;
                return (
                  <li key={u}>
                    <Link
                      href={`/concepts/${u}?from=${m.id}&step=${step.id}`}
                      className="flex items-center gap-3 rounded-xl bg-card p-3.5 shadow-soft ring-1 ring-border transition hover:ring-primary/50"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-foreground">{c.title}</span>
                        <span className="line-clamp-1 text-sm text-muted-foreground">{c.summary}</span>
                      </span>
                      <UnitStatusPill status={unitStatus.get(u)} />
                      <ArrowRight aria-hidden className="size-4 shrink-0 text-subtle-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <StepNotebook
          moduleId={m.id}
          stepId={step.id}
          initial={{ done: saved?.done ?? false, notes: saved?.notes ?? null }}
          prompt={NOTEBOOK_PROMPT[step.kind]}
        />

        <Link
          href={`/chat?module=${m.id}&step=${step.id}`}
          className="group relative mt-10 flex items-center gap-4 overflow-hidden rounded-[1.5rem] bg-deep p-5 text-deep-foreground shadow-pop outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-6"
        >
          <span className="relative inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sun text-deep">
            <MessageCircle aria-hidden className="size-6" />
          </span>
          <span className="relative flex-1 font-heading text-lg leading-snug font-bold sm:text-xl">Stuck? Ask the lab assistant about this step</span>
          <ArrowRight aria-hidden className="relative size-5 shrink-0 text-sun transition group-hover:translate-x-1" />
        </Link>

        <nav aria-label="Between steps" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {prev ? <StepNav href={`/modules/${m.id}/${prev.id}`} label={`Step ${index}`} title={prev.title} dir="prev" /> : <div className="hidden sm:block" />}
          {next ? (
            <StepNav href={`/modules/${m.id}/${next.id}`} label={`Step ${index + 2}`} title={next.title} dir="next" />
          ) : (
            <StepNav href={`/modules/${m.id}`} label="Done with the steps?" title="Back to the module" dir="next" />
          )}
        </nav>
      </div>
    </article>
  );
}

function StepNav({ href, label, title, dir }: { href: string; label: string; title: string; dir: "prev" | "next" }) {
  const isNext = dir === "next";
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col gap-1 rounded-2xl bg-card p-5 shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-pop",
        isNext && "sm:items-end sm:text-right"
      )}
    >
      <span className="flex items-center gap-1 text-xs font-semibold text-subtle-foreground">
        {!isNext && <ArrowLeft aria-hidden className="size-3.5" />}
        {label}
        {isNext && <ArrowRight aria-hidden className="size-3.5" />}
      </span>
      <span className="font-bold text-foreground group-hover:text-primary-strong">{title}</span>
    </Link>
  );
}
