import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCatalog } from "@/lib/experiments";
import { requireSession } from "@/lib/auth/session";
import { BRAND } from "@/lib/brand";
import { ExperimentsClient } from "./ExperimentsClient";

export const metadata: Metadata = { title: `Experiments · ${BRAND}` };

export const dynamic = "force-dynamic";

export default async function ExperimentsPage() {
  if (!(await requireSession())) redirect("/login?next=/experiments");
  return <ExperimentsClient catalog={getCatalog()} />;
}
