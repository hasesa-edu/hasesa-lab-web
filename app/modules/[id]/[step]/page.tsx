import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Check, CirclePlay } from "lucide-react";
import { getConcept, getStep } from "@/lib/content";
import { getViewer } from "@/lib/viewer";
import { hasFullAccess } from "@/lib/access";
import { BRAND } from "@/lib/brand";
import { Markdown } from "@/components/Markdown";
import { PhasedContent } from "@/components/module/PhasedContent";
import { splitSections } from "@/lib/content/sections";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { stepContext } from "@/lib/chat-context";
import { BackLink, KIND_LABEL, StatusBadge, UnitStatusPill, VideoEmbed } from "@/components/module/ui";

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

/*
 * A step page is for doing: the step's phases one at a time, with the
 * notebook and the lab assistant in the workbench panel beside it. Everything
 * else is quiet: a compact header, the safety note, the demo video folded
 * away, the theory as a short list, and plain links to the next step.
 */
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
  // The step's own sections become phases; its safety section goes to the top.
  const sections = splitSections(step.body);
  const safety = sections.filter((x) => x.kind === "safety");
  const phases = sections.filter((x) => x.kind !== "safety");
  const prev = m.steps[index - 1];
  const next = m.steps[index + 1];

  return (
    <article data-ask-scope>
      <header className="bg-enamel text-enamel-foreground">
        <div className="mx-auto max-w-6xl px-4 pt-5 pb-8 [&>*]:max-w-3xl">
          <BackLink href={`/modules/${m.id}`}>← {m.title}</BackLink>
          <p className="mt-3 text-sm text-enamel-foreground/75">
            Step {index + 1} of {m.steps.length}, {KIND_LABEL[step.kind].toLowerCase()}, about {step.minutes} min
            {saved?.done && (
              <span className="ml-2 inline-flex items-center gap-1 font-bold text-sun">
                <Check aria-hidden className="size-4" strokeWidth={3} /> Done
              </span>
            )}
          </p>
          <h1 className="mt-1 font-dial text-5xl leading-[0.95] font-extrabold text-white sm:text-6xl">{step.title}</h1>
          <StatusBadge status={m.status} onDark className="mt-3" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 [&>*]:max-w-3xl">
        {feedback.map((f) => (
          <p key={f.id} className="mt-6 border-l-4 border-sun py-1 pl-4 whitespace-pre-wrap">
            <span className="block text-sm font-bold text-chemistry">Your guide says</span>
            {f.body}
          </p>
        ))}

        {safety.length > 0 && (
          <section className="mt-6 border-l-4 border-red-500 bg-red-50 py-3 pr-4 pl-4 dark:bg-red-950/30">
            <p className="text-sm font-bold text-red-800 dark:text-red-300">Safety</p>
            <Markdown className="[&_p]:m-0 [&_p]:text-ink">{safety.map((x) => x.body).join("\n\n")}</Markdown>
          </section>
        )}

        {step.video && (
          <details className="group mt-4">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-bold text-primary [&::-webkit-details-marker]:hidden">
              <CirclePlay aria-hidden className="size-5" />
              <span className="group-open:hidden">Watch the demo</span>
              <span className="hidden group-open:inline">Hide the demo</span>
            </summary>
            <div className="mt-3">
              <VideoEmbed video={step.video} title={step.title} />
            </div>
          </details>
        )}

        <section className="mt-6">
          {phases.length > 1 ? (
            <PhasedContent
              sections={phases}
              storageKey={`${m.id}/${step.id}`}
              finish={{ label: "Write it up in your notebook", open: "notebook" }}
            />
          ) : (
            <Markdown>{phases.map((x) => `## ${x.title}\n\n${x.body}`).join("\n\n")}</Markdown>
          )}
        </section>

        {step.units.length > 0 && (
          <section className="mt-16">
            <h2 className="font-dial text-3xl font-bold">The theory behind this step</h2>
            <p className="mt-1 text-ink/65">Read these at home after you&apos;ve tried the step.</p>
            <ul className="mt-4 border-t-2 border-ink">
              {step.units.map((u) => {
                const c = getConcept(u)!;
                return (
                  <li key={u}>
                    <Link
                      href={`/concepts/${u}?from=${m.id}&step=${step.id}`}
                      className="group flex items-center gap-4 border-b border-ink/15 py-3.5"
                    >
                      <span className="min-w-0 flex-1 font-bold group-hover:text-primary">{c.title}</span>
                      <UnitStatusPill status={unitStatus.get(u)} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <nav aria-label="Between steps" className="mt-14 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/15 pt-6">
          {prev ? (
            <Link href={`/modules/${m.id}/${prev.id}`} className="group">
              <span className="block text-sm text-ink/55">Previous step</span>
              <span className="font-bold group-hover:text-primary">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          <Link href={next ? `/modules/${m.id}/${next.id}` : `/modules/${m.id}`} className="group text-right">
            <span className="block text-sm text-ink/55">{next ? "Next step" : "All steps done?"}</span>
            <span className="font-bold group-hover:text-primary">{next ? next.title : `Back to ${m.title}`}</span>
          </Link>
        </nav>
      </div>

      <AssistantPanel
        context={stepContext(m.id, step.id)}
        about={`step ${index + 1}, ${step.title}`}
        suggestions={[
          `Explain the science behind "${step.title}" simply.`,
          "My build isn't working the way the step says. Help me find out why.",
          "What should I write in my notebook for this step?",
        ]}
        notebook={{
          moduleId: m.id,
          stepId: step.id,
          initial: { done: saved?.done ?? false, notes: saved?.notes ?? null },
          prompt: NOTEBOOK_PROMPT[step.kind],
        }}
      />
    </article>
  );
}
