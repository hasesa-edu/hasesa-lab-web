import type { MetadataRoute } from "next";
import { LESSONS } from "@/lib/lessons";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://personalaitutor.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/lessons`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/chat`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const lessonPages: MetadataRoute.Sitemap = LESSONS.map((lesson) => ({
    url: `${SITE}/lessons/${lesson.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...lessonPages];
}
