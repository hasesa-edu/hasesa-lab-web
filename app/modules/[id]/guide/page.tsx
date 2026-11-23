import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getModule } from "@/lib/content";
import { getAccess } from "@/lib/access";
import { BRAND } from "@/lib/brand";
import { PhasedContent } from "@/components/module/PhasedContent";
import { splitSections } from "@/lib/content/sections";
import { BackLink, StatusBadge } from "@/components/module/ui";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getModule((await params).id);
  return { title: `${m ? `${m.title}: guide's version` : "Not found"} · ${BRAND}`, robots: { index: false } };
}

/** The guide's version of a module: preparation, timing, answer keys. Guides only. */
export default async function GuideVersionPage({ params }: Props) {
  const { id } = await params;
  const m = getModule(id);
  if (!m) notFound();
  const access = await getAccess();
  if (access.level !== "guide") redirect(`/modules/${id}`);

  return (
    <article>
      <header className="border-b border-border bg-card">
        <div className="relative mx-auto max-w-6xl px-4 [&>*]:max-w-3xl pt-6 pb-9 sm:pt-8">
          <BackLink href={`/modules/${m.id}`}>← {m.title}</BackLink>
          <p className="mt-4 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">Guide&apos;s version · not shown to students</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-6xl leading-[1.02] tracking-[-0.04em]">{m.title}</h1>
          <div className="mt-4">
            <StatusBadge status={m.status} />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 [&>*]:max-w-3xl pt-8 pb-16">
        <PhasedContent
          sections={splitSections(m.guide, "Overview")}
          storageKey={`guide/${m.id}`}
          finish={{ label: "Back to the module", href: `/modules/${m.id}` }}
        />
      </div>
    </article>
  );
}
