import type { Metadata } from "next";
import { getModules, summarize } from "@/lib/content";
import { getViewer } from "@/lib/viewer";
import { moduleProgress } from "@/lib/summary";
import { hasFullAccess } from "@/lib/access";
import { assignStations } from "@/lib/stations";
import { BRAND } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";
import { StationRows, type RowProgress } from "@/components/module/StationRows";
import { EnrolCard } from "@/components/module/ui";

export const metadata: Metadata = {
  title: `Modules · ${BRAND}`,
  description: "Hands-on Academy modules: build a radio, control a robot claw with your muscles, catch food fakers. Theory comes when the project needs it.",
};
export const dynamic = "force-dynamic";

const STATUS: Record<string, string> = { active: "In progress", completed: "Signed off", dropped: "Dropped" };

export default async function ModulesPage() {
  const { access, state } = await getViewer();
  const modules = getModules();
  const stations = assignStations(modules.map(summarize));

  // Where a signed-in student is in each module they've touched.
  const progress: Record<string, RowProgress> = {};
  if (state) {
    for (const m of modules) {
      const p = moduleProgress(m, state);
      if (p.status === "not-started") continue;
      progress[m.id] = {
        label: `${STATUS[p.status]}: ${p.stepsDone} of ${p.stepsTotal} steps`,
        pct: p.stepsTotal ? Math.round((p.stepsDone / p.stepsTotal) * 100) : 0,
      };
    }
  }

  return (
    <div>
      <PageHeader
        title="Modules"
        description="Each module is a station on the dial: a mystery or something to build. You learn the science and maths when the project needs it, and finish with something that works."
      />
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-16">
        <StationRows stations={stations} progress={progress} />
        {!hasFullAccess(access) && <EnrolCard signedIn={!!access.userId} next="/modules" className="mt-14" />}
      </div>
    </div>
  );
}
