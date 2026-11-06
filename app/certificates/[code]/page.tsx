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
      <div className="print-sheet relative mx-auto max-w-3xl overflow-hidden rounded-[1.5rem] bg-white p-8 text-center text-[#12303A] shadow-pop ring-1 ring-black/5 sm:p-14">
        <div aria-hidden className="absolute inset-3 rounded-[1.1rem] border-2 border-[#14A098]/40 sm:inset-5" />
        <div className="relative">
          <LogoMark size={110} className="mx-auto" />
          <p className="mt-4 text-sm font-bold tracking-[0.24em] text-[#0B7A73] uppercase">{BRAND} Academy</p>
          <h1 className="mt-6 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Certificate of completion</h1>
          <p className="mt-8 text-base text-[#12303A]/70">This certifies that</p>
          <p className="mt-2 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">{cert.student}</p>
          <p className="mt-6 text-base text-[#12303A]/70">built, investigated and explained</p>
          <p className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
            {m.title}: {m.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#12303A]/70">{m.whatYouBuild}</p>
          {cert.note && <p className="mx-auto mt-4 max-w-lg text-sm italic text-[#12303A]/80">&ldquo;{cert.note}&rdquo;</p>}
          <div className="mt-10 grid gap-6 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold">{cert.guide}</p>
              <p className="text-[#12303A]/60">Guide</p>
            </div>
            <div>
              <p className="font-semibold">{formatDate(cert.signedAt)}</p>
              <p className="text-[#12303A]/60">Date</p>
            </div>
            <div>
              <p className="font-mono font-semibold">{cert.code}</p>
              <p className="text-[#12303A]/60">Certificate code</p>
            </div>
          </div>
          <p className="mt-10 text-xs tracking-wide text-[#12303A]/50">{MOTTO}</p>
        </div>
      </div>
    </div>
  );
}
