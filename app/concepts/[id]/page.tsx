import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, BookOpen, GraduationCap, MessageCircle, Puzzle } from "lucide-react";
import { clientProblems, conceptUsage, getConcept, getModule } from "@/lib/content";
import { getViewer } from "@/lib/viewer";
import { hasFullAccess } from "@/lib/access";
import { getAttempts } from "@/lib/progress";
import { DISCIPLINES } from "@/lib/disciplines";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";
import { SUBJECT_STYLES } from "@/components/Subject";
import { ProblemSet } from "@/components/module/ProblemSet";
import { PhasedContent } from "@/components/module/PhasedContent";
import { splitSections } from "@/lib/content/sections";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { conceptContext } from "@/lib/chat-context";
import { BackLink, EnrolCard, SectionTitle, StatusBadge } from "@/components/module/ui";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ from?: string; step?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getConcept((await params).id);
  if (!c) return { title: `Not found · ${BRAND}` };
  return { title: `${c.title} · ${BRAND}`, description: c.summary, robots: c.public ? undefined : { index: false } };
}

export default async function ConceptPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const c = getConcept(id);
  if (!c) notFound();
  const { access, state } = await getViewer();
  const full = hasFullAccess(access);
  if (!c.public && !full) {
    if (!access.userId) redirect(`/login?next=${encodeURIComponent(`/concepts/${id}`)}`);
  }

  const usage = conceptUsage(c.id);
  // Back link: to the step or module the student came from, if it uses this unit.
  const from = sp.from ? getModule(sp.from) : undefined;
  const fromStep = from && sp.step ? from.steps.find((s) => s.id === sp.step && s.units.includes(c.id)) : undefined;
  const back = fromStep
    ? { href: `/modules/${from!.id}/${fromStep.id}`, label: `← ${fromStep.title}` }
    : from && usage.some((u) => u.module.id === from.id)
      ? { href: `/modules/${from.id}`, label: `← ${from.title}` }
      : { href: "/modules", label: "← All modules" };

  if (!c.public && !full) {
    return (
      <div>
        <header className="relative overflow-hidden bg-deep text-deep-foreground">
          <div className="relative mx-auto max-w-6xl px-4 [&>*]:max-w-3xl pt-6 pb-9 sm:pt-8">
            <BackLink href={back.href}>{back.label}</BackLink>
            <p className="mt-4 text-sm font-bold text-sun">Concept unit</p>
            <h1 className="font-dial mt-2 text-5xl font-extrabold sm:text-7xl leading-[0.95]">{c.title}</h1>
            <p className="mt-3 text-lg text-deep-foreground/80">{c.summary}</p>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-4 [&>*]:max-w-3xl py-10">
          <EnrolCard signedIn={!!access.userId} next={`/concepts/${c.id}`} />
        </div>
      </div>
    );
  }

  const attempts = access.userId ? await getAttempts(access.userId, [c.id]) : [];
  const solved = [...new Set(attempts.filter((a) => a.correct).map((a) => a.questionId))];
  const unit = state?.units.find((u) => u.unitId === c.id);

  return (
    <article data-ask-scope>
      <header className="relative overflow-hidden bg-deep text-deep-foreground">
        <div className="relative mx-auto max-w-6xl px-4 [&>*]:max-w-3xl pt-6 pb-9 sm:pt-8">
          <BackLink href={back.href}>{back.label}</BackLink>
          <p className="mt-4 text-sm font-bold text-sun">
            Concept unit{c.public && !full ? " · free sample" : ""}
          </p>
          <h1 className="font-dial mt-2 text-5xl leading-[0.95] font-extrabold text-balance sm:text-7xl">{c.title}</h1>
          <p className="mt-3 text-lg text-deep-foreground/80">{c.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <StatusBadge status={c.status} onDark />
            <a href="#problems" className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/15 hover:bg-white/15">
              <Puzzle aria-hidden className="size-4 text-sun" /> {c.problems.length} problems
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 [&>*]:max-w-3xl pb-16">
        <section className="mt-10">
          <PhasedContent
            sections={splitSections(c.body, "The idea")}
            storageKey={`concept/${c.id}`}
            finish={{ label: "Go to the problems", href: "#problems" }}
          />
        </section>

        <ProblemSet
          unitId={c.id}
          problems={clientProblems(c)}
          solved={solved}
          initialUnit={unit ? { status: unit.status, score: unit.score } : null}
          canSave={!!access.userId}
        />


        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {usage.length > 0 && (
            <section className="border-t-2 border-ink pt-4">
              <h2 className="text-sm font-bold text-subtle-foreground">Used in</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {usage.map(({ module, steps }) => (
                  <li key={module.id}>
                    <Link href={`/modules/${module.id}`} className="font-semibold text-primary-strong hover:underline dark:text-primary">
                      {module.title}
                    </Link>
                    <span className="text-muted-foreground"> · {steps.map((s) => s.title).join(", ")}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {c.curriculum.length > 0 && (
            <section className="border-t-2 border-ink pt-4">
              <h2 className="flex items-center gap-1.5 text-sm font-bold text-subtle-foreground">
                <GraduationCap aria-hidden className="size-4" /> In your school curriculum
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {c.curriculum.map((r) => (
                  <li key={`${r.subject}-${r.grade}-${r.unit}`}>
                    <span className={cn("font-semibold", SUBJECT_STYLES[r.subject].text)}>
                      {DISCIPLINES[r.subject].label} grade {r.grade}
                    </span>
                    <span className="text-muted-foreground"> · {r.unit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {!full && <EnrolCard signedIn={!!access.userId} next={`/concepts/${c.id}`} className="mt-10" />}
      </div>
      {full && (
        <AssistantPanel
          context={conceptContext(c.id)}
          about={`the unit ${c.title}`}
          suggestions={[
            `Explain ${c.title.toLowerCase()} with an everyday example.`,
            "I'm stuck on one of the problems. Give me a hint, not the answer.",
            "Where does this show up in my module?",
          ]}
        />
      )}
    </article>
  );
}
