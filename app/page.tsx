import { getCatalog } from "@/lib/experiments";
import { LandingClient } from "./LandingClient";

// Server wrapper: reads the catalogue once so the landing page can show real
// experiments without shipping full guide content to the browser.
export default function Home() {
  return <LandingClient catalog={getCatalog()} />;
}
