import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCatalog } from "@/lib/experiments";
import { requireSession } from "@/lib/auth/session";
import { BRAND } from "@/lib/brand";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = { title: `My lab notebook · ${BRAND}` };

export default async function DashboardPage() {
  if (!(await requireSession())) redirect("/login?next=/dashboard");
  return <DashboardClient catalog={getCatalog()} />;
}
