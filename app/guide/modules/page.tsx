import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAccess } from "@/lib/access";
import { getModules, summarize } from "@/lib/content";
import { catalogueItem } from "@/lib/catalogue";
import { BRAND } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";
import { GuideIndex } from "./GuideIndex";

export const metadata: Metadata = { title: `Guide's versions · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

// Every module's guide's version in one searchable list, so the tracker
// doesn't need a button per module.
export default async function GuideModulesPage() {
  const access = await getAccess();
  if (!access.userId) redirect("/login?next=/guide/modules");
  if (access.level !== "guide") redirect("/dashboard");
  const items = getModules().map((m) => catalogueItem(summarize(m)));

  return (
    <div>
      <PageHeader
        eyebrow="Guide"
        title="Guide's versions"
        description="Preparation, timing, expected results, safety briefings and how to judge each sign-off item, for every module."
      />
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16">
        <GuideIndex items={items} />
      </div>
    </div>
  );
}
