import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight, Flag, GraduationCap, Users } from "lucide-react";
import { getAccess } from "@/lib/access";
import { getModules } from "@/lib/content";
import { loadRoster } from "@/lib/tracker";
import { formatDate } from "@/lib/format";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ProgressBar, SectionTitle } from "@/components/module/ui";

export const metadata: Metadata = { title: `Student tracker · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function GuidePage() {
  const access = await getAccess();
  if (!access.userId) redirect("/login?next=/guide");
  if (access.level !== "guide") redirect("/dashboard");
  const roster = await loadRoster();
  const flagged = roster.filter((s) => s.flags.length).length;

  return (
    <div>
      <PageHeader
        eyebrow="Guide"
        title="Student tracker"
        description={`${roster.length} student${roster.length === 1 ? "" : "s"}${flagged ? ` · ${flagged} need${flagged === 1 ? "s" : ""} attention` : ""}. Students who need attention are listed first.`}
      >
        <div className="flex flex-wrap gap-2">
          {getModules().map((m) => (
            <Button key={m.id} asChild size="sm" variant="ghost" className="bg-white/10 text-deep-foreground ring-1 ring-white/15 hover:bg-white/20 hover:text-deep-foreground">
              <Link href={`/modules/${m.id}/guide`}>
                <GraduationCap aria-hidden /> {m.title}: guide&apos;s version
              </Link>
            </Button>
          ))}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16">
        <SectionTitle icon={Users}>Students</SectionTitle>
        {roster.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-card p-6 text-muted-foreground shadow-soft ring-1 ring-border">
            No students yet. Students appear here once the admin enrols them.
          </p>
        ) : (
          <ul className="mt-5 space-y-3">
            {roster.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/guide/students/${s.id}`}
                  className={cn(
                    "block rounded-2xl bg-card p-5 shadow-card ring-1 transition hover:ring-primary/50",
                    s.flags.length ? "ring-amber-300 dark:ring-amber-800" : "ring-border"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div className="min-w-0">
                      <p className="text-lg font-bold text-foreground">{s.displayName}</p>
                      <p className="truncate text-sm text-muted-foreground">{s.email}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        <span className="font-semibold text-foreground tabular-nums">{s.unitsDone}</span> units
                      </span>
                      <span>
                        <span className="font-semibold text-foreground tabular-nums">{s.avgScore ?? "–"}{s.avgScore !== null ? "%" : ""}</span> avg
                      </span>
                      <span>{s.lastActivity ? `Active ${formatDate(s.lastActivity)}` : "Not started"}</span>
                      <ChevronRight aria-hidden className="size-5 text-subtle-foreground" />
                    </div>
                  </div>
                  {s.flags.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {s.flags.map((f) => (
                        <li key={f} className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-sun-soft px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:text-sun">
                          <Flag aria-hidden className="size-3.5" /> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.modules.length > 0 && (
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {s.modules.map((p) => (
                        <li key={p.moduleId} className="rounded-xl bg-muted/50 p-3">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-foreground">{p.title}</span>
                            <span className="text-muted-foreground capitalize">{p.status === "completed" ? "Signed off" : p.status}</span>
                          </div>
                          <ProgressBar pct={p.stepsTotal ? Math.round((p.stepsDone / p.stepsTotal) * 100) : 0} className="mt-2" />
                          <p className="mt-1.5 text-xs text-muted-foreground">
                            {p.stepsDone}/{p.stepsTotal} steps · {p.unitsDone}/{p.unitsTotal} units
                            {p.nextStep && p.status === "active" ? ` · next: ${p.nextStep.title}` : ""}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
