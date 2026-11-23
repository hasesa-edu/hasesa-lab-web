import type { Metadata } from "next";
import { BRAND, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/brand";

/** The one public address of the site. Every canonical URL and structured-data URL uses it. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.hasesa.com").replace(/\/$/, "");

export const ORG_DESCRIPTION =
  'Hasesa (Amharic for "exploration") is building an education system for the AI era, tested with real students before it goes to schools across Ethiopia and beyond. Hasesa Academy, hands-on science for teenagers aged 13 to 18, is its first program.';

/**
 * Metadata for a public page: its own title and description, a canonical URL,
 * and link-preview tags. Next replaces (rather than merges) openGraph/twitter
 * objects from the layout, so each page sets them in full here.
 */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: BRAND };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: BRAND, locale: "en_US", title, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** Hasesa as an organisation, plus the website: on every page. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#org`,
        name: BRAND,
        alternateName: "ሐሰሳ",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon.svg`,
        description: ORG_DESCRIPTION,
        areaServed: "Ethiopia",
        address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
        ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
        ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS.map((l) => l.href) } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: BRAND,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
    ],
  };
}
