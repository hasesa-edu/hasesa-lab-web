import type { Metadata } from "next";
import Link from "next/link";
import { adjacentExperiments, getExperiment, toCatalogItem } from "@/lib/experiments";
import { requireSession } from "@/lib/auth/session";
import { canReadGuide, getEntitlement } from "@/lib/billing/entitlement";
import { GuideView } from "@/components/experiment/GuideView";
import { LockedGuide } from "@/components/experiment/LockedGuide";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exp = getExperiment((await params).id);
  if (!exp) return { title: `Experiment not found · ${BRAND}` };
  return { title: `${exp.title} · ${BRAND}`, description: exp.summary };
}

export default async function ExperimentPage({ params }: Props) {
  const exp = getExperiment((await params).id);
  if (!exp) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-ink-muted">Experiment not found.</p>
        <Link href="/experiments" className="text-brand mt-3 inline-block">
          ← All experiments
        </Link>
      </div>
    );
  }

  const sess = await requireSession();
  const ent = await getEntitlement(sess?.userId);
  if (!canReadGuide(exp.id, ent)) return <LockedGuide item={toCatalogItem(exp)} signedIn={!!sess} />;

  const { prev, next } = adjacentExperiments(exp.id);
  return <GuideView exp={exp} prev={prev && toCatalogItem(prev)} next={next && toCatalogItem(next)} />;
}
