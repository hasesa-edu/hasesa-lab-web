import { describe, expect, it } from "vitest";
import { splitSections } from "./sections";
import { loadContent } from "./load";

describe("splitSections", () => {
  it("splits on ## headings with short labels and kinds", () => {
    const s = splitSections("Intro text\n\n## Safety first\nCareful.\n\n## Do: string up the antenna\n1. One\n\n## Notice\nHmm\n\n## Theory: just enough\nMaths");
    expect(s.map((x) => [x.label, x.kind])).toEqual([
      ["Start", "other"],
      ["Safety first", "safety"],
      ["Do", "do"],
      ["Notice", "notice"],
      ["Theory", "theory"],
    ]);
    expect(s[2].title).toBe("Do: string up the antenna");
    expect(s[2].body).toBe("1. One");
  });

  it("ignores headings inside code blocks and drops empty sections", () => {
    const s = splitSections("## Code\n```\n## not a heading\n```\n## Empty\n\n## Last\nx");
    expect(s.map((x) => x.title)).toEqual(["Code", "Last"]);
  });

  it("gives duplicate titles unique ids", () => {
    const s = splitSections("## Do\na\n## Do\nb");
    expect(s.map((x) => x.id)).toEqual(["do", "do-2"]);
  });

  it("splits every real step into at least two sections", () => {
    for (const m of loadContent().modules) for (const st of m.steps) {
      expect(splitSections(st.body).length, `${m.id}/${st.id}`).toBeGreaterThanOrEqual(2);
    }
  });
});
