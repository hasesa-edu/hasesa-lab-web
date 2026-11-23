import type { Metadata } from "next";
import { getModules } from "@/lib/content";
import { BRAND, MOTTO } from "@/lib/brand";
import { ORG_DESCRIPTION, pageMeta } from "@/lib/seo";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = pageMeta({ title: `${BRAND} · ${MOTTO}`, description: ORG_DESCRIPTION, path: "/" });

// Hasesa's home page. The Academy's landing page lives at /academy.
export default function Home() {
  return <HomeClient moduleCount={getModules().length} />;
}
