import type { MetadataRoute } from "next";
import { getConcepts, getModules } from "@/lib/content";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://hasesa.vercel.app";

// Prerendered at build time, which also validates every file in content/.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/modules`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
  const modules: MetadataRoute.Sitemap = getModules().map((m) => ({
    url: `${SITE}/modules/${m.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const samples: MetadataRoute.Sitemap = getConcepts()
    .filter((c) => c.public)
    .map((c) => ({ url: `${SITE}/concepts/${c.id}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 }));

  return [...staticPages, ...modules, ...samples];
}
