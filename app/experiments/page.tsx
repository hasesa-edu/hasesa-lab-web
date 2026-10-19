import type { Metadata } from "next";
import { getCatalog } from "@/lib/experiments";
import { BRAND } from "@/lib/brand";
import { ExperimentsClient } from "./ExperimentsClient";

export const metadata: Metadata = { title: `Experiments · ${BRAND}` };

export default function ExperimentsPage() {
  return <ExperimentsClient catalog={getCatalog()} />;
}
