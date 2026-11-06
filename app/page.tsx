import { getModules, summarize } from "@/lib/content";
import { LandingClient } from "./LandingClient";

// Server wrapper: passes module summaries (never step or answer content) to the landing page.
export default function Home() {
  return <LandingClient modules={getModules().map(summarize)} />;
}
