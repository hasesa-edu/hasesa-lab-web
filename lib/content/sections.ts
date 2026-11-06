// Splits a step or concept unit's Markdown into its "## " sections, so long
// content can be shown one phase at a time. Pure: used on the server and in tests.

export type SectionKind = "safety" | "do" | "notice" | "theory" | "other";

export type Section = {
  id: string;
  title: string;
  /** Short name for the phase bar: "Do: string up the antenna" → "Do". */
  label: string;
  kind: SectionKind;
  body: string;
};

function kindOf(title: string): SectionKind {
  const t = title.toLowerCase();
  if (/safety/.test(t)) return "safety";
  if (/theory/.test(t)) return "theory";
  if (/^(do|build|try|make|record)\b|do it better/.test(t)) return "do";
  if (/^(notice|predict|think|look|the question)/.test(t)) return "notice";
  return "other";
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
}

/**
 * Text before the first "## " heading becomes a section titled `introTitle`
 * (if there is any). Headings inside fenced code blocks are ignored.
 */
export function splitSections(md: string, introTitle = "Start"): Section[] {
  const lines = md.split("\n");
  const out: { title: string; lines: string[] }[] = [{ title: introTitle, lines: [] }];
  let fenced = false;
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    const h = !fenced && line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (h) out.push({ title: h[1], lines: [] });
    else out[out.length - 1].lines.push(line);
  }
  const used = new Set<string>();
  return out
    .map((s) => ({ ...s, body: s.lines.join("\n").trim() }))
    .filter((s) => s.body.length > 0)
    .map((s) => {
      let id = slug(s.title);
      for (let n = 2; used.has(id); n++) id = `${slug(s.title)}-${n}`;
      used.add(id);
      const short = s.title.split(":")[0].trim();
      return { id, title: s.title, label: short.length > 24 ? `${short.slice(0, 22)}…` : short, kind: kindOf(s.title), body: s.body };
    });
}
