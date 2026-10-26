import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
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
      <div className="relative">
        <div aria-hidden className="absolute inset-x-0 top-0 h-72 bg-dots text-primary opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto max-w-md px-4 py-16 text-center sm:py-24">
          <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-strong">
            <FlaskConical aria-hidden className="size-7" />
          </span>
          <p className="mt-4 text-lg font-semibold text-foreground">Experiment not found.</p>
          <Button asChild variant="soft" className="mt-5">
            <Link href="/experiments">← All experiments</Link>
          </Button>
        </div>
      </div>
    );
  }

  const ent = await getEntitlement(sess.userId);
  if (!canReadGuide(exp.id, ent)) return <LockedGuide item={toCatalogItem(exp)} signedIn />;

  const { prev, next } = adjacentExperiments(exp.id);
  return <GuideView exp={exp} prev={prev && toCatalogItem(prev)} next={next && toCatalogItem(next)} />;
}
