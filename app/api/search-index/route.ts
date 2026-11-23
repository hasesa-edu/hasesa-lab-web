import { getConcepts, getModules, summarize } from "@/lib/content";
import { catalogueItem } from "@/lib/catalogue";
import { searchIndex } from "@/lib/search-index";

// What the header search looks through: every module and concept unit, with
// only public fields (no guide's versions, no answers). Built at build time.
export const dynamic = "force-static";

export function GET() {
  return Response.json(searchIndex(getModules().map((m) => catalogueItem(summarize(m))), getConcepts()));
}
