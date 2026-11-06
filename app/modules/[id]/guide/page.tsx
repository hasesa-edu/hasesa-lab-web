import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getModule } from "@/lib/content";
import { getAccess } from "@/lib/access";
import { BRAND } from "@/lib/brand";
import { Markdown } from "@/components/Markdown";
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
      <header className="relative overflow-hidden bg-deep text-deep-foreground">
        <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-60" />
        <div className="relative mx-auto max-w-3xl px-4 pt-6 pb-9 sm:pt-8">
          <BackLink href={`/modules/${m.id}`}>← {m.title}</BackLink>
          <p className="mt-4 text-xs font-bold tracking-[0.16em] text-sun uppercase">Guide&apos;s version · not shown to students</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{m.title}</h1>
          <div className="mt-4">
            <StatusBadge status={m.status} onDark className="h-8 px-3 text-sm" />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-16">
        <Markdown>{m.guide}</Markdown>
      </div>
    </article>
  );
}
