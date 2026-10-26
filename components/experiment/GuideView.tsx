"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleCheck,
  CirclePlay,
  CircleX,
  Clapperboard,
  Clock,
  Earth,
  Eye,
  Gauge,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Microscope,
  NotebookPen,
  Package,
  PencilLine,
  RotateCcw,
  Store,
  TriangleAlert,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ConceptCheckItem, Experiment } from "@/lib/experiments";
import type { CatalogItem } from "@/lib/subjects";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiGetProgress, apiSaveProgress, type ProgressDTO } from "@/lib/api";
import { cn } from "@/lib/utils";
import { SUBJECT_STYLES, SubjectIcon, SubjectLabel, SubjectTile } from "@/components/Subject";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

type Tr = (k: any) => string;
type TocItem = { id: string; icon: LucideIcon; label: string };

/** The full guide. Only rendered for students allowed to read it, so only this one guide reaches the browser. */
export function GuideView({ exp, prev, next }: { exp: Experiment; prev?: CatalogItem; next?: CatalogItem }) {
  const { tr } = useLocale();
  const [checked, setChecked] = useState<boolean[]>([]);
  const [gathered, setGathered] = useState<boolean[]>([]);

  useEffect(() => {
    setChecked(exp.steps.map(() => false));
    setGathered(exp.materials.map(() => false));
  }, [exp]);

  const st = SUBJECT_STYLES[exp.subject];
  const doneSteps = checked.filter(Boolean).length;
  const gatheredCount = gathered.filter(Boolean).length;
  const stepPct = exp.steps.length ? Math.round((doneSteps / exp.steps.length) * 100) : 0;

  const toc: TocItem[] = [];
  if (exp.whyItMatters) toc.push({ id: "why", icon: Earth, label: tr("toc.why") });
  toc.push(
    { id: "video", icon: CirclePlay, label: tr("toc.video") },
    { id: "concept", icon: BookOpen, label: tr("toc.concept") },
    { id: "materials", icon: Package, label: tr("toc.materials") },
    { id: "safety", icon: TriangleAlert, label: tr("toc.safety") },
    { id: "steps", icon: ListChecks, label: tr("toc.steps") },
    { id: "results", icon: Eye, label: tr("toc.results") },
    { id: "troubleshooting", icon: Wrench, label: tr("toc.troubleshooting") },
    { id: "check", icon: PencilLine, label: tr("toc.check") },
    { id: "notebook", icon: NotebookPen, label: tr("toc.notebook") }
  );
  const activeId = useActiveSection(toc.map((t) => t.id));

  return (
    <article>
      {/* ---------- Header ---------- */}
      <header className="relative overflow-hidden bg-deep text-deep-foreground">
        <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-60" />
        <div aria-hidden className="absolute -top-24 -right-24 size-80 rounded-full bg-primary/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 left-1/4 size-64 rounded-full bg-sun/20 blur-3xl" />
        <SubjectIcon
          subject={exp.subject}
          className="absolute top-1/2 right-[6%] hidden size-64 -translate-y-1/2 rotate-12 text-white/[0.06] lg:block"
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-6 pb-9 sm:pt-8 sm:pb-12">
          <Link
            href="/experiments"
            className="inline-flex h-10 items-center rounded-full text-sm font-medium text-deep-foreground/75 outline-none hover:text-deep-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {tr("experiments.back")}
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex h-7 items-center rounded-full bg-card px-3 shadow-soft">
              <SubjectLabel subject={exp.subject} />
            </span>
            <span className="text-xs font-semibold tracking-wide text-deep-foreground/70 uppercase">
              {tr("experiments.grade")} {exp.grade} · {exp.unit}
              {exp.curriculumCode ? ` · ${exp.curriculumCode}` : ""}
            </span>
          </div>

          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {exp.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-deep-foreground/80 sm:text-lg">{exp.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <HeaderChip icon={Clock}>
              {exp.estimatedMinutes} {tr("experiments.minutes")}
            </HeaderChip>
            <HeaderChip icon={Gauge}>{tr(exp.difficulty === "easy" ? "experiments.easy" : "experiments.medium")}</HeaderChip>
            <HeaderChip icon={Package}>
              {exp.materials.length} {tr("experiments.badge.materials")}
            </HeaderChip>
            {exp.reviewedBy && (
              <HeaderChip icon={Microscope} tone="sun">
                {tr("experiments.reviewedBy")} {exp.reviewedBy.name}, {exp.reviewedBy.title}
              </HeaderChip>
            )}
          </div>
        </div>
        <span aria-hidden className={cn("absolute inset-x-0 bottom-0 h-1.5", st.bg)} />
      </header>

      <div className="mx-auto max-w-5xl px-4 lg:grid lg:grid-cols-[11.5rem_minmax(0,1fr)] lg:gap-10">
        {/* ---------- Desktop: sticky contents ---------- */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 pt-10 pb-6">
            <TocDesktop items={toc} activeId={activeId} />
            <a
              href="#steps"
              className="mt-6 block rounded-2xl bg-card p-4 shadow-card ring-1 ring-border transition hover:ring-primary/40"
            >
              <span className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>{tr("exp.steps")}</span>
                <span className="tabular-nums">
                  {doneSteps}/{exp.steps.length}
                </span>
              </span>
              <ProgressBar pct={stepPct} className="mt-2" />
            </a>
          </div>
        </aside>

        <div className="min-w-0 max-w-3xl pb-16">
          {/* ---------- Phones / tablets: sticky pill bar ---------- */}
          <TocMobile items={toc} activeId={activeId} />

          {exp.whyItMatters && (
            <section id="why" className="mt-8 scroll-mt-32 lg:mt-10 lg:scroll-mt-24">
              <div className="relative overflow-hidden rounded-2xl bg-primary-soft/50 p-5 ring-1 ring-primary/20 sm:p-6">
                <div aria-hidden className="absolute inset-0 bg-dots text-primary opacity-40" />
                <div className="relative">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-card text-primary-strong shadow-soft dark:text-primary">
                      <Earth aria-hidden className="size-5" />
                    </span>
                    <p className="text-xs font-bold tracking-[0.16em] text-primary-strong uppercase dark:text-primary">
                      {tr("why.label")}
                    </p>
                  </div>
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-foreground">{exp.whyItMatters}</p>
                </div>
              </div>
            </section>
          )}

          <section id="video" className="mt-10 scroll-mt-32 lg:scroll-mt-24">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
              <SectionTitle icon={CirclePlay}>{tr("exp.video")}</SectionTitle>
              {exp.video && (
                <p className="text-xs text-subtle-foreground">
                  {tr("video.credit")} {exp.video.credit}
                </p>
              )}
            </div>
            <ExperimentVideo exp={exp} tr={tr} />
          </section>

          <section id="concept" className="mt-12 scroll-mt-32 lg:scroll-mt-24">
            <SectionTitle icon={BookOpen}>{tr("exp.concept")}</SectionTitle>
            <div className="prose-edu mt-4 rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6 [&>section:first-child>h3]:mt-0!">
              {exp.concept.map((c) => (
                <section key={c.heading}>
                  <h3>{c.heading}</h3>
                  {renderBody(c.body)}
                </section>
              ))}
            </div>
          </section>

          <section id="materials" className="mt-12 scroll-mt-32 lg:scroll-mt-24">
            <div className="flex items-end justify-between gap-3">
              <SectionTitle icon={Package}>{tr("exp.materials")}</SectionTitle>
              <span className="pb-1 text-xs text-subtle-foreground tabular-nums">
                {gatheredCount}/{exp.materials.length}
              </span>
            </div>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {exp.materials.map((m, i) => (
                <li key={i}>
                  <label
                    className={cn(
                      "flex h-full cursor-pointer gap-3 rounded-xl p-3.5 ring-1 transition",
                      gathered[i]
                        ? "bg-primary-soft/50 ring-primary/40"
                        : "bg-card shadow-soft ring-border hover:ring-primary/40"
                    )}
                  >
                    <Checkbox
                      checked={!!gathered[i]}
                      onCheckedChange={() => setGathered((g) => g.map((v, j) => (j === i ? !v : v)))}
                      className="mt-0.5 size-5 bg-card"
                    />
                    <span className="min-w-0 flex-1">
                      <span className={cn("block text-sm font-medium", gathered[i] ? "text-muted-foreground" : "text-foreground")}>
                        {m.item}
                      </span>
                      {m.localNote && (
                        <span className="mt-1 flex items-start gap-1.5 text-xs leading-snug text-subtle-foreground">
                          <Store aria-hidden className="mt-px size-3.5 shrink-0 text-sun" />
                          {m.localNote}
                        </span>
                      )}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <section id="safety" className="mt-10 scroll-mt-32 lg:scroll-mt-24">
            {/* role reset: a static safety box shouldn't be announced as a live alert on page load. */}
            <Alert
              variant="destructive"
              role={undefined}
              className="block rounded-2xl border-0 border-l-4 border-l-red-500 bg-red-50 p-5 ring-1 ring-red-200 sm:p-6 dark:bg-red-950/30 dark:ring-red-900"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white shadow-soft">
                  <TriangleAlert aria-hidden className="size-5" />
                </span>
                <h2 className="text-xl font-bold text-red-800 dark:text-red-300">{tr("exp.safety")}</h2>
              </div>
              <AlertDescription className="mt-4 text-pretty text-foreground">
                <ul className="space-y-2 text-sm text-foreground">
                  {exp.safety.map((s, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span aria-hidden className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-red-500" />
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </section>

          <section id="steps" className="mt-12 scroll-mt-32 lg:scroll-mt-24">
            <div className="flex items-end justify-between gap-3">
              <SectionTitle icon={ListChecks}>{tr("exp.steps")}</SectionTitle>
              <span className="pb-1 text-xs text-subtle-foreground tabular-nums">
                {doneSteps}/{exp.steps.length} {tr("exp.stepsDone")}
              </span>
            </div>
            <ProgressBar pct={stepPct} className="mt-3" />
            <ol className="mt-6">
              {exp.steps.map((s, i) => {
                const done = !!checked[i];
                const last = i === exp.steps.length - 1;
                return (
                  <li key={i} className="relative flex gap-3 pb-4 last:pb-0 sm:gap-4">
                    {!last && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute top-11 bottom-0 left-[1.125rem] w-0.5 -translate-x-1/2 rounded-full sm:top-12 sm:left-5",
                          done ? "bg-emerald-400" : "bg-border"
                        )}
                      />
                    )}
                    <span
                      aria-hidden
                      className={cn(
                        "relative flex size-9 shrink-0 items-center justify-center rounded-full font-heading text-base font-extrabold ring-4 ring-background transition sm:size-10 sm:text-lg",
                        done ? "bg-emerald-600 text-white" : cn(st.soft, st.text)
                      )}
                    >
                      {done ? <Check className="size-5" strokeWidth={3} /> : i + 1}
                    </span>
                    <label
                      className={cn(
                        "flex min-w-0 flex-1 cursor-pointer gap-3 rounded-2xl p-4 ring-1 transition",
                        done
                          ? "bg-emerald-50/70 ring-emerald-300 dark:bg-emerald-950/30 dark:ring-emerald-800"
                          : "bg-card shadow-card ring-border hover:ring-primary/50"
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="text-xs font-semibold tracking-wide text-subtle-foreground uppercase">
                          {tr("exp.step")} {i + 1}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block text-[0.95rem] leading-relaxed",
                            done ? "text-muted-foreground" : "text-foreground"
                          )}
                        >
                          {s.text}
                        </span>
                        {s.tip && (
                          <span className="mt-3 flex gap-2 rounded-xl bg-sun-soft px-3 py-2.5 text-sm leading-snug text-amber-900 dark:text-amber-100">
                            <Lightbulb aria-hidden className="mt-px size-4 shrink-0 text-amber-600 dark:text-sun" />
                            <span>{s.tip}</span>
                          </span>
                        )}
                      </span>
                      <Checkbox
                        checked={done}
                        onCheckedChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                        className="mt-0.5 size-5 bg-card data-checked:border-emerald-600 data-checked:bg-emerald-600 data-checked:text-white dark:data-checked:bg-emerald-600"
                      />
                    </label>
                  </li>
                );
              })}
            </ol>
          </section>

          <section id="results" className="mt-12 grid scroll-mt-32 gap-3 sm:grid-cols-2 lg:scroll-mt-24">
            <div className="relative overflow-hidden rounded-2xl bg-deep p-5 text-deep-foreground shadow-pop sm:p-6">
              <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-40" />
              <div aria-hidden className="absolute -top-16 -right-16 size-40 rounded-full bg-primary/40 blur-2xl" />
              <div className="relative">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-sun text-deep">
                  <Eye aria-hidden className="size-5" />
                </span>
                <h2 className="mt-3 text-lg font-bold">{tr("exp.observe")}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-deep-foreground/85">{exp.observe}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary-strong dark:text-primary">
                <Lightbulb aria-hidden className="size-5" />
              </span>
              <h2 className="mt-3 text-lg font-bold text-foreground">{tr("exp.explanation")}</h2>
              <div className="prose-edu mt-1.5 text-sm [&_p]:m-0! [&_p]:text-foreground!">
                <p>{renderInline(exp.explanation)}</p>
              </div>
            </div>
          </section>

          <section id="troubleshooting" className="mt-12 scroll-mt-32 lg:scroll-mt-24">
            <SectionTitle icon={Wrench}>{tr("exp.troubleshooting")}</SectionTitle>
            <div className="mt-4 space-y-2">
              {exp.troubleshooting.map((t, i) => (
                <details
                  key={i}
                  className="group rounded-xl bg-card shadow-soft ring-1 ring-border open:ring-primary/40"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                    <span>{t.problem}</span>
                    <ChevronRight
                      aria-hidden
                      className="size-4 shrink-0 text-subtle-foreground transition group-open:rotate-90 group-open:text-primary"
                    />
                  </summary>
                  <p className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">{t.fix}</p>
                </details>
              ))}
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
              <MessageCircle aria-hidden className="size-4 text-primary" />
              {tr("exp.stillStuck")}{" "}
              <Link href={`/chat?experiment=${exp.id}`} className="font-medium text-primary underline underline-offset-4">
                {tr("exp.askAssistant")}
              </Link>
            </p>
          </section>

          <section id="check" className="mt-12 scroll-mt-32 lg:scroll-mt-24">
            <SectionTitle icon={PencilLine}>{tr("quiz.check")}</SectionTitle>
            <ul className="mt-4 space-y-4">
              {exp.conceptCheck.map((q, i) => (
                <QuizItem key={i} question={q} index={i} tr={tr} />
              ))}
            </ul>
          </section>

          <NotebookCard exp={exp} tr={tr} />

          <div id="ask" className="mt-12 scroll-mt-32 lg:scroll-mt-24">
            <Link
              href={`/chat?experiment=${exp.id}`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-[1.5rem] bg-deep p-5 text-deep-foreground shadow-pop outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-6"
            >
              <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-40" />
              <div aria-hidden className="absolute -bottom-20 -left-10 size-48 rounded-full bg-sun/20 blur-3xl" />
              <span className="relative inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sun text-deep">
                <MessageCircle aria-hidden className="size-6" />
              </span>
              <span className="relative flex-1 font-heading text-lg leading-snug font-bold sm:text-xl">{tr("exp.askAbout")}</span>
              <ArrowRight aria-hidden className="relative size-5 shrink-0 text-sun transition group-hover:translate-x-1" />
            </Link>
          </div>

          {(prev || next) && (
            <nav aria-label={tr("experiments.nav.between")} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {prev ? <NavCard item={prev} dir="prev" tr={tr} /> : <div className="hidden sm:block" />}
              {next ? <NavCard item={next} dir="next" tr={tr} /> : <div className="hidden sm:block" />}
            </nav>
          )}
        </div>
      </div>
    </article>
  );
}

/** Which section the student is reading: the last one whose top has scrolled past the sticky bars. */
function useActiveSection(ids: string[]) {
  const key = ids.join(",");
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const list = key.split(",");
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);
  return active;
}

function TocDesktop({ items, activeId }: { items: TocItem[]; activeId: string }) {
  return (
    <nav aria-label="On this page">
      <ul className="space-y-0.5 border-l border-border">
        {items.map(({ id, icon: Icon, label }) => {
          const on = id === activeId;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px flex h-9 items-center gap-2.5 border-l-2 pl-3.5 text-sm transition",
                  on
                    ? "border-primary font-semibold text-primary-strong dark:text-primary"
                    : "border-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                <Icon aria-hidden className={cn("size-4", on ? "text-primary" : "text-subtle-foreground")} />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function TocMobile({ items, activeId }: { items: TocItem[]; activeId: string }) {
  const scroller = useRef<HTMLUListElement>(null);
  // Keep the current section's pill in view as the student scrolls.
  useEffect(() => {
    const ul = scroller.current;
    const el = ul?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!ul || !el) return;
    ul.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
  }, [activeId]);

  return (
    <nav aria-label="On this page" className="sticky top-[3.75rem] z-10 -mx-4 mt-0 lg:hidden">
      <div className="border-b border-border bg-background/90 backdrop-blur-sm">
        <ul ref={scroller} className="flex items-center gap-1 overflow-x-auto px-3 py-2 whitespace-nowrap [scrollbar-width:none]">
          {items.map(({ id, icon: Icon, label }) => {
            const on = id === activeId;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition",
                    on ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-primary-soft/60 hover:text-primary-strong"
                  )}
                >
                  <Icon aria-hidden className="size-3.5" />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function ProgressBar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div aria-hidden className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", pct === 100 ? "bg-emerald-500" : "bg-primary")}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function NavCard({ item, dir, tr }: { item: CatalogItem; dir: "prev" | "next"; tr: Tr }) {
  const st = SUBJECT_STYLES[item.subject];
  const isNext = dir === "next";
  return (
    <Link
      href={`/experiments/${item.id}`}
      className={cn(
        "group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl bg-card p-5 pt-6 shadow-card ring-1 ring-border transition outline-none hover:-translate-y-1 hover:shadow-pop focus-visible:ring-3 focus-visible:ring-ring/50",
        isNext && "sm:flex-row-reverse sm:text-right"
      )}
    >
      <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1.5", st.bg)} />
      <SubjectTile subject={item.subject} size="lg" />
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "flex items-center gap-1 text-[11px] font-semibold tracking-[0.14em] text-subtle-foreground uppercase",
            isNext && "sm:justify-end"
          )}
        >
          {!isNext && <ArrowLeft aria-hidden className={cn("size-3.5 transition group-hover:-translate-x-0.5", st.text)} />}
          {tr(isNext ? "experiments.nav.next" : "experiments.nav.previous")} · {tr("experiments.grade")} {item.grade}
          {isNext && <ArrowRight aria-hidden className={cn("size-3.5 transition group-hover:translate-x-0.5", st.text)} />}
        </span>
        <span className="mt-1 block leading-snug font-bold text-foreground transition group-hover:text-primary-strong">
          {item.title}
        </span>
      </span>
    </Link>
  );
}

function ExperimentVideo({ exp, tr }: { exp: Experiment; tr: Tr }) {
  const frame = "relative aspect-video overflow-hidden rounded-xl bg-black";
  let inner: React.ReactNode;
  if (exp.video?.src) {
    inner = (
      <div className={frame}>
        <video src={exp.video.src} controls preload="metadata" playsInline className="absolute inset-0 h-full w-full" />
      </div>
    );
  } else if (exp.video?.youtubeId) {
    inner = (
      <div className={frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${exp.video.youtubeId}?rel=0&modestbranding=1`}
          title={exp.title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  } else {
    inner = (
      <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl bg-deep px-6 text-center text-deep-foreground">
        <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-40" />
        <div aria-hidden className="absolute -top-20 left-1/2 size-56 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
        <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-sun text-deep sm:size-14">
          <Clapperboard aria-hidden className="size-6 sm:size-7" />
        </span>
        <p className="relative mt-3 font-heading text-lg font-bold">{tr("exp.videoSoon")}</p>
        <p className="relative mt-1 max-w-sm text-sm text-deep-foreground/75">{tr("exp.videoSoonBody")}</p>
      </div>
    );
  }
  return <div className="rounded-[1.25rem] bg-card p-1.5 shadow-pop ring-1 ring-border sm:p-2">{inner}</div>;
}

function NotebookCard({ exp, tr }: { exp: Experiment; tr: Tr }) {
  const { user, ready } = useUser();
  const [progress, setProgress] = useState<ProgressDTO | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setMessage(null);
    apiGetProgress()
      .then((rows) => {
        const row = rows.find((r) => r.experimentId === exp.id) ?? null;
        setProgress(row);
        setNotes(row?.observations ?? "");
      })
      .catch(() => {});
  }, [user, exp.id]);

  async function save(status?: "started" | "done") {
    setSaving(true);
    setMessage(null);
    try {
      const row = await apiSaveProgress({ experimentId: exp.id, status, observations: notes });
      setProgress(row);
      setMessage(tr(status === "done" ? "notebook.markedDone" : "notebook.saved"));
    } catch {
      setMessage(tr("notebook.saveError"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <section id="notebook" className="mt-12 scroll-mt-32 lg:scroll-mt-24">
      {/* A page from a lab notebook: grid paper, a red margin line, a teal binding. */}
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-pop ring-1 ring-border">
        <div aria-hidden className="h-2.5 bg-primary" />
        <div aria-hidden className="absolute inset-0 top-2.5 bg-grid text-primary opacity-50" />
        <div aria-hidden className="absolute inset-y-0 left-7 w-px bg-red-300/80 sm:left-11 dark:bg-red-800/80" />
        <div className="relative py-5 pr-5 pl-11 sm:py-6 sm:pr-6 sm:pl-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle icon={NotebookPen}>{tr("notebook.cardTitle")}</SectionTitle>
            {progress?.status === "done" && (
              <Badge variant="success" className="h-6 px-2.5 font-semibold">
                <Check aria-hidden /> {tr("experiments.badge.done")}
              </Badge>
            )}
          </div>
          {!ready ? (
            <div className="mt-4 space-y-2">
              <span className="sr-only">{tr("common.loading")}</span>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ) : !user ? (
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">{tr("notebook.signinPrompt")}</p>
              <Button asChild className="mt-4">
                <Link href="/login">{tr("common.signinCTA")}</Link>
              </Button>
            </div>
          ) : (
            <>
              <Label htmlFor="observations" className="mt-3 block leading-normal font-normal text-muted-foreground">
                {tr("notebook.prompt")}
              </Label>
              <Textarea
                id="observations"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={4000}
                rows={5}
                placeholder={tr("notebook.placeholder")}
                className="mt-3 min-h-32 bg-card/85 text-[0.95rem] leading-relaxed"
              />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {progress?.status !== "done" && (
                  <Button onClick={() => save("done")} disabled={saving}>
                    <Check aria-hidden /> {tr("notebook.markDone")}
                  </Button>
                )}
                <Button variant="soft" onClick={() => save(progress ? undefined : "started")} disabled={saving}>
                  {tr("notebook.saveNotes")}
                </Button>
                {progress?.status === "done" && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => save("started")}
                    disabled={saving}
                    className="h-10 text-xs text-subtle-foreground underline hover:text-foreground"
                  >
                    {tr("notebook.markNotDone")}
                  </Button>
                )}
                {message && (
                  <span className="text-xs text-muted-foreground" role="status">
                    {message}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-strong dark:text-primary">
        <Icon aria-hidden className="size-5" />
      </span>
      {children}
    </h2>
  );
}

function HeaderChip({ icon: Icon, tone, children }: { icon: LucideIcon; tone?: "sun"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 py-1 text-sm",
        tone === "sun" ? "bg-sun font-medium text-deep" : "bg-white/10 text-deep-foreground ring-1 ring-white/15"
      )}
    >
      <Icon aria-hidden className={cn("size-4 shrink-0", tone === "sun" ? "text-deep" : "text-sun")} />
      {children}
    </span>
  );
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function QuizItem({ question, index, tr }: { question: ConceptCheckItem; index: number; tr: Tr }) {
  const [picked, setPicked] = useState<number | null>(null);
  const right = picked !== null && picked === question.answerIndex;
  return (
    <li className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6">
      <p className="flex gap-3 font-semibold text-foreground">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft font-heading text-sm font-extrabold text-primary-strong dark:text-primary">
          {index + 1}
        </span>
        <span className="pt-1 leading-snug">{question.q}</span>
      </p>
      <div className="mt-4 grid gap-2">
        {question.choices.map((c, i) => {
          const isPicked = picked === i;
          const isAnswer = i === question.answerIndex;
          const show = picked !== null;
          const good = show && isAnswer;
          const bad = show && isPicked && !isAnswer;
          return (
            <Button
              key={i}
              variant="outline"
              onClick={() => picked === null && setPicked(i)}
              // Answered choices stay fully readable (no disabled fade) so the right/wrong colours show.
              className={cn(
                "h-auto min-h-11 justify-start gap-3 rounded-xl py-2 pl-2 text-left font-normal whitespace-normal text-foreground disabled:opacity-100",
                !show && "hover:border-primary/60 hover:bg-primary-soft/30",
                good && "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40",
                bad && "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/40",
                show && !good && !bad && "text-muted-foreground"
              )}
              disabled={picked !== null}
            >
              <span
                aria-hidden
                className={cn(
                  "inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                  good ? "bg-emerald-600 text-white" : bad ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"
                )}
              >
                {good ? <Check className="size-4" strokeWidth={3} /> : bad ? <CircleX className="size-4" /> : LETTERS[i] ?? i + 1}
              </span>
              <span className="flex-1">{c}</span>
            </Button>
          );
        })}
      </div>
      {picked !== null && (
        <div
          className={cn(
            "mt-4 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-start",
            right ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-red-50 dark:bg-red-950/40"
          )}
        >
          <p className="flex flex-1 gap-2.5 text-sm text-muted-foreground">
            {right ? (
              <CircleCheck aria-hidden className="mt-px size-5 shrink-0 text-emerald-600" />
            ) : (
              <CircleX aria-hidden className="mt-px size-5 shrink-0 text-red-500" />
            )}
            <span>
              <span
                className={
                  right ? "font-semibold text-emerald-700 dark:text-emerald-400" : "font-semibold text-red-700 dark:text-red-400"
                }
              >
                {right ? tr("quiz.correct") : tr("quiz.incorrect")}
              </span>{" "}
              {question.explanation}
            </span>
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPicked(null)}
            className="h-10 shrink-0 self-start bg-card text-xs text-muted-foreground hover:border-primary/60 hover:text-primary"
          >
            <RotateCcw aria-hidden /> {tr("quiz.tryAgain")}
          </Button>
        </div>
      )}
    </li>
  );
}

/**
 * Render a single line of body text: backticks → <code>, *text* → <em>.
 * Backticks are parsed first so asterisks inside code aren't mistaken for italics.
 */
function renderInline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const codeSplit = text.split(/(`[^`]+`)/g);
  let key = 0;
  for (const chunk of codeSplit) {
    if (chunk.startsWith("`") && chunk.endsWith("`")) {
      out.push(<code key={key++}>{chunk.slice(1, -1)}</code>);
      continue;
    }
    const italicSplit = chunk.split(/(\*[^*\n]+\*)/g);
    for (const piece of italicSplit) {
      if (!piece) continue;
      if (piece.startsWith("*") && piece.endsWith("*") && piece.length > 2) {
        out.push(<em key={key++}>{piece.slice(1, -1)}</em>);
      } else {
        out.push(<span key={key++}>{piece}</span>);
      }
    }
  }
  return out;
}

/**
 * Render a multi-line body. Lines starting with "- " become <ul><li>…</li></ul>;
 * everything else becomes a <p>. Inline `code` and *italic* are parsed inside each.
 */
function renderBody(text: string): React.ReactNode[] {
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    blocks.push(
      <ul key={key++}>
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  for (const line of lines) {
    if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else {
      flushList();
      blocks.push(<p key={key++}>{renderInline(line)}</p>);
    }
  }
  flushList();
  return blocks;
}
