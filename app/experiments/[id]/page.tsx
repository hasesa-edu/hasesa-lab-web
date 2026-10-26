import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { adjacentExperiments, getExperiment, toCatalogItem } from "@/lib/experiments";
import { requireSession } from "@/lib/auth/session";
import { canReadGuide, getEntitlement } from "@/lib/billing/entitlement";
import { GuideView } from "@/components/experiment/GuideView";
import { LockedGuide } from "@/components/experiment/LockedGuide";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exp = getExperiment((await params).id);
  if (!exp) return { title: `Experiment not found · ${BRAND}` };
  return { title: `${exp.title} · ${BRAND}`, description: exp.summary };
}

export default async function ExperimentPage({ params }: Props) {
  const { id } = await params;
  const sess = await requireSession();
  if (!sess) redirect(`/login?next=${encodeURIComponent(`/experiments/${id}`)}`);

  const exp = getExperiment(id);
  if (!exp) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-muted-foreground">Experiment not found.</p>
        <Button asChild variant="link" className="mt-1 px-0 text-base">
          <Link href="/experiments">← All experiments</Link>
        </Button>
      </div>
    );
  }

  const ent = await getEntitlement(sess.userId);
  if (!canReadGuide(exp.id, ent)) return <LockedGuide item={toCatalogItem(exp)} signedIn />;

  const { prev, next } = adjacentExperiments(exp.id);
  return <GuideView exp={exp} prev={prev && toCatalogItem(prev)} next={next && toCatalogItem(next)} />;
}
