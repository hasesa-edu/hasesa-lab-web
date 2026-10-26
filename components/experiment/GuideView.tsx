"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ConceptCheckItem, Experiment } from "@/lib/experiments";
import { subjectMeta, type CatalogItem } from "@/lib/subjects";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiGetProgress, apiSaveProgress, type ProgressDTO } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

type Tr = (k: any) => string;

/** The full guide. Only rendered for students allowed to read it, so only this one guide reaches the browser. */
export function GuideView({ exp, prev, next }: { exp: Experiment; prev?: CatalogItem; next?: CatalogItem }) {
  const { tr } = useLocale();
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    setChecked(exp.steps.map(() => false));
  }, [exp]);

  const subject = subjectMeta(exp.subject);
  const doneSteps = checked.filter(Boolean).length;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Button asChild variant="link" className="px-0">
        <Link href="/experiments">{tr("experiments.back")}</Link>
      </Button>

      <header className="mt-1">
        <p className="text-xs uppercase tracking-wider text-primary font-semibold">
          {tr("experiments.grade")} {exp.grade} · {subject.emoji} {subject.label} · {exp.unit}
          {exp.curriculumCode ? ` · ${exp.curriculumCode}` : ""}
        </p>
        <h1 className="mt-1.5 text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">{exp.title}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">{exp.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
          <Chip>⏱ {exp.estimatedMinutes} {tr("experiments.minutes")}</Chip>
          <Chip>
            {exp.difficulty === "easy" ? "🟢" : "🟠"}{" "}
            {tr(exp.difficulty === "easy" ? "experiments.easy" : "experiments.medium")}
          </Chip>
          {exp.reviewedBy && (
            <Chip tone="sun">
              🔬 {tr("experiments.reviewedBy")} {exp.reviewedBy.name}, {exp.reviewedBy.title}
            </Chip>
          )}
        </div>
      </header>

      <ExperimentTOC exp={exp} tr={tr} />

      {exp.whyItMatters && (
        <section id="why" className="mt-8 scroll-mt-32">
          <Card className="rounded-2xl bg-primary-soft/30 ring-primary/25">
            <CardContent className="sm:px-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary-strong dark:text-primary text-lg">
                  🌍
                </span>
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-primary-strong dark:text-primary">
                  {tr("why.label")}
                </p>
              </div>
              <p className="mt-3 text-foreground leading-relaxed">{exp.whyItMatters}</p>
            </CardContent>
          </Card>
        </section>
      )}

      <section id="video" className="mt-8 scroll-mt-32">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-primary">{tr("exp.video")}</p>
          {exp.video && (
            <p className="text-xs text-subtle-foreground">
              {tr("video.credit")} {exp.video.credit}
            </p>
          )}
        </div>
        <ExperimentVideo exp={exp} tr={tr} />
      </section>

      <section id="concept" className="mt-10 scroll-mt-32">
        <SectionTitle icon="📖">{tr("exp.concept")}</SectionTitle>
        <div className="prose-edu mt-2">
          {exp.concept.map((c) => (
            <section key={c.heading}>
              <h3>{c.heading}</h3>
              {renderBody(c.body)}
            </section>
          ))}
        </div>
      </section>

      <section id="materials" className="mt-10 scroll-mt-32">
        <SectionTitle icon="🧰">{tr("exp.materials")}</SectionTitle>
        <ul className="mt-3 grid gap-2">
          {exp.materials.map((m, i) => (
            <li key={i}>
              <Card size="sm" className="rounded-lg shadow-soft">
                <CardContent className="px-4">
                  <span className="text-foreground">{m.item}</span>
                  {m.localNote && <span className="block text-xs text-subtle-foreground mt-0.5">↳ {m.localNote}</span>}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section id="safety" className="mt-8 scroll-mt-32">
        {/* role reset: a static safety box shouldn't be announced as a live alert on page load. */}
        <Alert
          variant="destructive"
          role={undefined}
          className="rounded-xl border-red-200 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/30"
        >
          <h2 className="font-semibold text-red-800 dark:text-red-300 flex items-center gap-2">
            <span aria-hidden>⚠️</span> {tr("exp.safety")}
          </h2>
          <AlertDescription className="mt-2 text-foreground text-pretty">
            <ul className="space-y-1.5 text-sm text-foreground">
              {exp.safety.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 rounded-full bg-red-500 shrink-0" />
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </section>

      <section id="steps" className="mt-10 scroll-mt-32">
        <div className="flex items-baseline justify-between gap-3">
          <SectionTitle icon="🧪">{tr("exp.steps")}</SectionTitle>
          <span className="text-xs text-subtle-foreground tabular-nums">
            {doneSteps}/{exp.steps.length} {tr("exp.stepsDone")}
          </span>
        </div>
        <ol className="mt-3 space-y-2.5">
          {exp.steps.map((s, i) => (
            <li key={i}>
              <label
                className={cn(
                  "flex gap-3 rounded-xl border p-4 cursor-pointer transition shadow-soft",
                  checked[i]
                    ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <Checkbox
                  checked={!!checked[i]}
                  onCheckedChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                  className="mt-0.5 bg-card data-checked:border-emerald-600 data-checked:bg-emerald-600 data-checked:text-white dark:data-checked:bg-emerald-600"
                />
                <span className="flex-1">
                  <span className="text-xs font-semibold text-subtle-foreground">
                    {tr("exp.step")} {i + 1}
                  </span>
                  <span className={cn("block text-sm leading-relaxed", checked[i] ? "text-muted-foreground" : "text-foreground")}>
                    {s.text}
                  </span>
                  {s.tip && <span className="block mt-1 text-xs text-amber-800 dark:text-amber-300">💡 {s.tip}</span>}
                </span>
              </label>
            </li>
          ))}
        </ol>
      </section>

      <section id="results" className="mt-10 scroll-mt-32">
        <Card className="rounded-2xl shadow-soft [--card-spacing:--spacing(6)]">
          <CardContent>
            <h2 className="text-xs uppercase tracking-wider font-semibold text-subtle-foreground">{tr("exp.observe")}</h2>
            <p className="mt-1.5 text-sm text-foreground leading-relaxed">{exp.observe}</p>
            <h2 className="mt-5 text-xs uppercase tracking-wider font-semibold text-subtle-foreground">{tr("exp.explanation")}</h2>
            <p className="mt-1.5 text-sm text-foreground leading-relaxed">{renderInline(exp.explanation)}</p>
          </CardContent>
        </Card>
      </section>

      <section id="troubleshooting" className="mt-10 scroll-mt-32">
        <SectionTitle icon="🛠️">{tr("exp.troubleshooting")}</SectionTitle>
        <div className="mt-3 space-y-2">
          {exp.troubleshooting.map((t, i) => (
            <details key={i} className="group rounded-xl border border-border bg-card px-4 py-3 shadow-soft">
              <summary className="cursor-pointer text-sm font-medium text-foreground list-none flex items-center justify-between gap-3">
                <span>{t.problem}</span>
                <span className="text-subtle-foreground transition group-open:rotate-90" aria-hidden>›</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.fix}</p>
            </details>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {tr("exp.stillStuck")}{" "}
          <Link href={`/chat?experiment=${exp.id}`} className="text-primary underline">
            {tr("exp.askAssistant")}
          </Link>
        </p>
      </section>

      <section id="check" className="mt-10 scroll-mt-32">
        <SectionTitle icon="✏️">{tr("quiz.check")}</SectionTitle>
        <ul className="mt-3 space-y-5">
          {exp.conceptCheck.map((q, i) => (
            <QuizItem key={i} question={q} index={i} tr={tr} />
          ))}
        </ul>
      </section>

      <NotebookCard exp={exp} tr={tr} />

      <div id="ask" className="mt-10 scroll-mt-32">
        <Separator />
        <Button asChild className="mt-6">
          <Link href={`/chat?experiment=${exp.id}`}>{tr("exp.askAbout")} →</Link>
        </Button>
      </div>

      {(prev || next) && (
        <nav aria-label={tr("experiments.nav.between")} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prev ? (
            <Link href={`/experiments/${prev.id}`} className={navCardLink}>
              <Card className={navCard}>
                <CardContent>
                  <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-subtle-foreground">
                    ← {tr("experiments.nav.previous")} · {tr("experiments.grade")} {prev.grade}
                  </div>
                  <div className="mt-1 font-semibold text-foreground group-hover:text-primary transition leading-snug">{prev.title}</div>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {next ? (
            <Link href={`/experiments/${next.id}`} className={cn(navCardLink, "sm:text-right")}>
              <Card className={navCard}>
                <CardContent>
                  <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-subtle-foreground">
                    {tr("experiments.nav.next")} · {tr("experiments.grade")} {next.grade} →
                  </div>
                  <div className="mt-1 font-semibold text-foreground group-hover:text-primary transition leading-snug">{next.title}</div>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </nav>
      )}
    </article>
  );
}

const navCardLink = "group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50";
const navCard = "h-full transition group-hover:shadow-card group-hover:ring-primary/60";

function ExperimentVideo({ exp, tr }: { exp: Experiment; tr: Tr }) {
  const frame = "relative overflow-hidden rounded-2xl border border-border bg-background shadow-card aspect-video";
  if (exp.video?.src) {
    return (
      <div className={frame}>
        <video src={exp.video.src} controls preload="metadata" playsInline className="absolute inset-0 h-full w-full" />
      </div>
    );
  }
  if (exp.video?.youtubeId) {
    return (
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
  }
  return (
    <div className={frame + " flex flex-col items-center justify-center text-center px-6"}>
      <span className="text-3xl" aria-hidden>🎬</span>
      <p className="mt-2 font-semibold text-foreground">{tr("exp.videoSoon")}</p>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">{tr("exp.videoSoonBody")}</p>
    </div>
  );
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
    <section id="notebook" className="mt-10 scroll-mt-32">
      <Card className="rounded-2xl bg-primary-soft/20 ring-primary/30 [--card-spacing:--spacing(6)]">
        <CardContent>
          <div className="flex items-center justify-between gap-3">
            <SectionTitle icon="📓">{tr("notebook.cardTitle")}</SectionTitle>
            {progress?.status === "done" && (
              <Badge variant="success" className="font-semibold">✓ {tr("experiments.badge.done")}</Badge>
            )}
          </div>
          {!ready ? (
            <div className="mt-2 space-y-2">
              <span className="sr-only">{tr("common.loading")}</span>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ) : !user ? (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">{tr("notebook.signinPrompt")}</p>
              <Button asChild className="mt-3">
                <Link href="/login">{tr("common.signinCTA")}</Link>
              </Button>
            </div>
          ) : (
            <>
              <Label htmlFor="observations" className="mt-3 block font-normal leading-normal text-muted-foreground">
                {tr("notebook.prompt")}
              </Label>
              <Textarea
                id="observations"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={4000}
                rows={4}
                placeholder={tr("notebook.placeholder")}
                className="mt-2 min-h-24"
              />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {progress?.status !== "done" && (
                  <Button onClick={() => save("done")} disabled={saving}>
                    ✓ {tr("notebook.markDone")}
                  </Button>
                )}
                <Button variant="outline" onClick={() => save(progress ? undefined : "started")} disabled={saving}>
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
                {message && <span className="text-xs text-muted-foreground" role="status">{message}</span>}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <h2 className="font-semibold text-foreground text-lg tracking-tight flex items-center gap-2">
      <span aria-hidden>{icon}</span>
      {children}
    </h2>
  );
}

function Chip({ children, tone }: { children: React.ReactNode; tone?: "sun" }) {
  return (
    <Badge
      variant="outline"
      // h-auto + whitespace-normal: long chips (e.g. the reviewer credit) wrap on narrow phones.
      className={cn(
        "h-auto min-h-5 whitespace-normal text-left",
        tone === "sun" ? "bg-sun-soft text-amber-800 dark:text-amber-200" : "bg-muted text-muted-foreground"
      )}
    >
      {children}
    </Badge>
  );
}

function QuizItem({ question, index, tr }: { question: ConceptCheckItem; index: number; tr: Tr }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <li>
      <Card className="shadow-soft">
        <CardContent>
          <p className="font-medium text-foreground">
            {index + 1}. {question.q}
          </p>
          <div className="mt-3 grid gap-2">
            {question.choices.map((c, i) => {
              const isPicked = picked === i;
              const isAnswer = i === question.answerIndex;
              const show = picked !== null;
              let cls = "hover:border-primary/60";
              if (show && isAnswer) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-700 text-foreground";
              else if (show && isPicked && !isAnswer) cls = "border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-800 text-foreground";
              return (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => picked === null && setPicked(i)}
                  // Answered choices stay fully readable (no disabled fade) so the right/wrong colours show.
                  className={cn("h-auto min-h-10 justify-start whitespace-normal py-2 text-left font-normal text-foreground disabled:opacity-100", cls)}
                  disabled={picked !== null}
                >
                  {c}
                </Button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="mt-3 flex items-start justify-between gap-3">
              <p className="text-sm text-muted-foreground flex-1">
                <span
                  className={
                    picked === question.answerIndex
                      ? "text-emerald-700 dark:text-emerald-400 font-medium"
                      : "text-red-700 dark:text-red-400 font-medium"
                  }
                >
                  {picked === question.answerIndex ? tr("quiz.correct") : tr("quiz.incorrect")}
                </span>{" "}
                {question.explanation}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPicked(null)}
                className="h-10 shrink-0 text-xs text-muted-foreground hover:border-primary/60 hover:text-primary"
              >
                {tr("quiz.tryAgain")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </li>
  );
}

function ExperimentTOC({ exp, tr }: { exp: Experiment; tr: Tr }) {
  const items: { href: string; icon: string; label: string }[] = [];
  if (exp.whyItMatters) items.push({ href: "#why", icon: "🌍", label: tr("toc.why") });
  items.push(
    { href: "#video", icon: "🎥", label: tr("toc.video") },
    { href: "#concept", icon: "📖", label: tr("toc.concept") },
    { href: "#materials", icon: "🧰", label: tr("toc.materials") },
    { href: "#safety", icon: "⚠️", label: tr("toc.safety") },
    { href: "#steps", icon: "🧪", label: tr("toc.steps") },
    { href: "#results", icon: "🔍", label: tr("toc.results") },
    { href: "#troubleshooting", icon: "🛠️", label: tr("toc.troubleshooting") },
    { href: "#check", icon: "✏️", label: tr("toc.check") },
    { href: "#notebook", icon: "📓", label: tr("toc.notebook") }
  );

  return (
    <nav aria-label="On this page" className="sticky top-16 z-10 mt-6 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="overflow-x-auto rounded-full border border-border bg-card/80 backdrop-blur-sm shadow-soft">
        <ul className="flex items-center gap-0.5 px-1 py-0.5 whitespace-nowrap">
          {items.map((it) => (
            <li key={it.href}>
              <Button
                asChild
                variant="ghost"
                className="gap-1.5 rounded-full px-3 text-xs text-muted-foreground hover:bg-primary-soft/40 hover:text-primary"
              >
                <a href={it.href}>
                  <span aria-hidden>{it.icon}</span>
                  <span>{it.label}</span>
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
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
