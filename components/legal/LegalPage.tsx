import { BRAND, CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/brand";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-ink">{title}</h1>
      <p className="mt-2 text-sm text-ink-subtle">
        {BRAND} · Last updated {LEGAL_UPDATED}
      </p>
      <div className="legal mt-8 space-y-6 text-ink leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-brand [&_a]:underline">
        {children}
      </div>
    </article>
  );
}

export function Contact() {
  return CONTACT_EMAIL ? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : <span>our support contact listed on this site</span>;
}
