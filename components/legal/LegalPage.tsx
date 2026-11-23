import { BRAND, CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={title}
        description={
          <>
            {BRAND} · Last updated {LEGAL_UPDATED}
          </>
        }
      />
      <article className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="max-w-[68ch] font-legible space-y-5 text-[1.0625rem] leading-[1.75] text-foreground/90 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-2 hover:[&_a]:decoration-primary [&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-border [&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-muted-foreground">
          {children}
        </div>
      </article>
    </>
  );
}

export function Contact() {
  return CONTACT_EMAIL ? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : <span>our support contact listed on this site</span>;
}
