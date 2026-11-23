import type { Metadata } from "next";
import { getModules, summarize } from "@/lib/content";
import { type Viewer, catalogueItem, catalogueQuery, parseFilters, parseSort } from "@/lib/catalogue";
import { getViewer } from "@/lib/viewer";
import { cardStates } from "@/lib/summary";
import { hasFullAccess } from "@/lib/access";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Catalogue } from "@/components/module/Catalogue";
import { EnrolCard } from "@/components/module/ui";

export const metadata: Metadata = pageMeta({
  title: `Modules · Hasesa Academy`,
  description: "Hands-on Academy modules from beginner to advanced: launch a water rocket, clean muddy water, build a radio, make a wind generator, extract DNA. Theory comes when the project needs it.",
  path: "/modules",
});
export const dynamic = "force-dynamic";

export default async function ModulesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { access, state } = await getViewer();
  const modules = getModules();
  const items = modules.map((m) => catalogueItem(summarize(m)));
  const params = await searchParams;
  const initial = parseFilters(params);
  const sort = parseSort(params);
  const viewer: Viewer = !access.userId ? "visitor" : hasFullAccess(access) ? "full" : "limited";

  return (
    <div>
      <PageHeader
        title={initial.q ? `Results for “${initial.q}”` : "Explore modules"}
        description={
          initial.q
            ? undefined
            : "Each module is a mystery to solve or something to build, from beginner to advanced. Start anywhere: a beginner module is a good first step. Search from the bar at the top of any page."
        }
      />
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16">
        {/* Remount when the URL's filters change (e.g. a new search from the header). */}
        <Catalogue key={catalogueQuery(initial, sort)} items={items} states={cardStates(modules, state)} viewer={viewer} initial={initial} initialSort={sort} />
        {!hasFullAccess(access) && <EnrolCard signedIn={!!access.userId} next="/modules" className="mt-14" />}
      </div>
    </div>
  );
}
