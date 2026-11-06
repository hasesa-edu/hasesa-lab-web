import type { Metadata } from "next";
import { getModules, summarize } from "@/lib/content";
import { getViewer } from "@/lib/viewer";
import { moduleProgress } from "@/lib/summary";
import { hasFullAccess } from "@/lib/access";
import { BRAND } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";
import { ModuleCard } from "@/components/module/ModuleCard";
import { EnrolCard } from "@/components/module/ui";

export const metadata: Metadata = {
  title: `Modules · ${BRAND}`,
  description: "Hands-on Academy modules: build a radio, control a robot claw with your muscles, catch food fakers. Theory comes when the project needs it.",
};
export const dynamic = "force-dynamic";

export default async function ModulesPage() {
  const { access, state } = await getViewer();
  const modules = getModules();
  return (
    <div>
      <PageHeader
        eyebrow="Hasesa Academy"
        title="Modules"
        description="Each module starts with a mystery or something to build. You learn the science and maths when the project needs it, and finish with something that works."
      />
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <ModuleCard key={m.id} m={summarize(m)} progress={state ? moduleProgress(m, state) : undefined} />
          ))}
        </div>
        {!hasFullAccess(access) && <EnrolCard signedIn={!!access.userId} next="/modules" className="mt-12" />}
      </div>
    </div>
  );
}
