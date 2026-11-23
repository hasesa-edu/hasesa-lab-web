import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCertificate } from "@/lib/certificates";
import { getModule } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { BRAND, MOTTO } from "@/lib/brand";
import { LogoMark } from "@/components/Logo";
import { PrintButton } from "./PrintButton";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cert = await getCertificate((await params).code);
  const m = cert && getModule(cert.moduleId);
  return { title: cert && m ? `${cert.student}: ${m.title} certificate · ${BRAND}` : `Certificate · ${BRAND}`, robots: { index: false } };
}

/** Public, printable certificate. Anyone with the code can check it's genuine. */
export default async function CertificatePage({ params }: Props) {
  const { code } = await params;
  const cert = await getCertificate(code);
  const m = cert && getModule(cert.moduleId);
  if (!cert || !m) notFound();

  return (
    <div className="bg-muted/40 px-4 py-10 sm:py-16">
      <div className="no-print mx-auto mb-6 flex max-w-3xl justify-end">
        <PrintButton />
      </div>
      <div className="print-sheet relative mx-auto max-w-3xl overflow-hidden rounded-lg border border-border bg-white p-8 text-center text-foreground sm:p-14">
        <div aria-hidden className="absolute inset-3 rounded-md border border-foreground/15 sm:inset-5" />
        <div className="relative">
          <LogoMark size={110} className="mx-auto" />
          <p className="mt-5 font-mono text-xs tracking-[0.16em] text-primary uppercase">{BRAND} Academy</p>
          <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Certificate of completion</h1>
          <p className="mt-8 text-base text-muted-foreground">This certifies that</p>
          <p className="mt-2 font-heading text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{cert.student}</p>
          <p className="mt-6 text-base text-muted-foreground">built, investigated and explained</p>
          <p className="mt-2 font-heading text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
            {m.title}: {m.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">{m.whatYouBuild}</p>
          {cert.note && <p className="mx-auto mt-4 max-w-lg text-sm italic text-foreground/80">&ldquo;{cert.note}&rdquo;</p>}
          <div className="mt-10 grid gap-6 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold">{cert.guide}</p>
              <p className="text-muted-foreground">Guide</p>
            </div>
            <div>
              <p className="font-semibold">{formatDate(cert.signedAt)}</p>
              <p className="text-muted-foreground">Date</p>
            </div>
            <div>
              <p className="font-mono font-semibold">{cert.code}</p>
              <p className="text-muted-foreground">Certificate code</p>
            </div>
          </div>
          <p className="mt-10 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">{MOTTO}</p>
        </div>
      </div>
    </div>
  );
}
