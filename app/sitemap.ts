import type { MetadataRoute } from "next";
import { getConcepts, getModules } from "@/lib/content";

import { SITE_URL as SITE } from "@/lib/seo";

// Prerendered at build time, which also validates every file in content/.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/academy`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/modules`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
  const modules: MetadataRoute.Sitemap = getModules().map((m) => ({
    url: `${SITE}/modules/${m.id}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const samples: MetadataRoute.Sitemap = getConcepts()
    .filter((c) => c.public)
    .map((c) => ({ url: `${SITE}/concepts/${c.id}`, changeFrequency: "monthly", priority: 0.6 }));

  return [...staticPages, ...modules, ...samples];
}
