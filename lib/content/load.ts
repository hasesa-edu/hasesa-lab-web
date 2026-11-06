// Reads and validates everything under content/. Kept free of "server-only"
// so tests can load the real content; app code imports lib/content instead.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Concept, CurriculumRef, Module, Step } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

const status = z.enum(["ai-draft", "expert-reviewed", "classroom-tested"]);
const discipline = z.enum(["physics", "chemistry", "biology", "mathematics", "technology"]);
const video = z.object({ youtubeId: z.string().optional(), src: z.string().optional(), credit: z.string().optional() });

const curriculum = z.object({
  subject: discipline,
  grade: z.number().int().min(7).max(12),
  unit: z.string().min(1),
  code: z.string().optional(),
});

const problem = z.discriminatedUnion("type", [
  z
    .object({
      id: z.string().min(1),
      type: z.literal("mcq"),
      q: z.string().min(1),
      choices: z.array(z.string().min(1)).min(2).max(6),
      answerIndex: z.number().int().min(0),
      explanation: z.string().min(1),
    })
    .refine((p) => p.answerIndex < p.choices.length, { message: "answerIndex is past the last choice" }),
  z.object({
    id: z.string().min(1),
    type: z.literal("numeric"),
    q: z.string().min(1),
    answer: z.number(),
    tolerancePct: z.number().min(0).max(50).default(2),
    unit: z.string().optional(),
    explanation: z.string().min(1),
  }),
]);

const conceptFm = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  status,
  public: z.boolean().default(false),
  curriculum: z.array(curriculum).default([]),
  problems: z.array(problem).min(1),
});

const stepFm = z.object({
  title: z.string().min(1),
  kind: z.enum(["hook", "investigate", "build", "finish"]),
  minutes: z.number().int().min(5).max(300),
  units: z.array(z.string()).default([]),
  video: video.optional(),
});

const moduleFm = z.object({
  title: z.string().min(1),
  tagline: z.string().min(1),
  disciplines: z.array(discipline).min(1),
  hook: z.string().min(1),
  goal: z.string().min(1),
  whatYouBuild: z.string().min(1),
  hours: z.number().min(1).max(40),
  trailer: video.optional(),
  status,
  materials: z.array(z.object({ item: z.string().min(1), note: z.string().optional() })).min(1),
  safety: z.array(z.string().min(1)).min(1),
  signoff: z.array(z.object({ id: z.string().min(1), text: z.string().min(1) })).min(1),
  publicSample: z.string().min(1),
});

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export type Content = {
  modules: Module[];
  concepts: Map<string, Concept>;
};

function read(file: string) {
  return matter(fs.readFileSync(file, "utf8"));
}

function parseOrThrow<T>(schema: z.ZodType<T>, data: unknown, file: string): T {
  const r = schema.safeParse(data);
  if (!r.success) {
    const issues = r.error.issues.map((i) => `  ${i.path.join(".") || "(root)"}: ${i.message}`).join("\n");
    throw new Error(`Invalid content in ${path.relative(process.cwd(), file)}:\n${issues}`);
  }
  return r.data;
}

function mdFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();
}

function loadConcepts(dir: string): Map<string, Concept> {
  const out = new Map<string, Concept>();
  for (const f of mdFiles(dir)) {
    const id = f.replace(/\.md$/, "");
    const file = path.join(dir, f);
    if (!SLUG.test(id)) throw new Error(`Concept file name must be a lowercase slug: ${f}`);
    const { data, content } = read(file);
    const fm = parseOrThrow(conceptFm, data, file);
    const ids = new Set<string>();
    for (const p of fm.problems) {
      if (ids.has(p.id)) throw new Error(`Duplicate problem id "${p.id}" in ${f}`);
      ids.add(p.id);
    }
    out.set(id, { id, ...fm, body: content.trim() });
  }
  return out;
}

function loadModule(dir: string, id: string, concepts: Map<string, Concept>): Module {
  const file = path.join(dir, "module.md");
  const { data, content } = read(file);
  const fm = parseOrThrow(moduleFm, data, file);

  const stepsDir = path.join(dir, "steps");
  const steps: Step[] = mdFiles(stepsDir).map((f) => {
    // "03-antenna.md" → step id "antenna"; the number only orders the steps.
    const m = f.match(/^\d+-(.+)\.md$/);
    if (!m || !SLUG.test(m[1])) throw new Error(`Step file must be named NN-slug.md: ${id}/steps/${f}`);
    // "guide" is the URL of the guide's version, so no step can use it.
    if (m[1] === "guide") throw new Error(`Step id "guide" is reserved: ${id}/steps/${f}`);
    const stepFile = path.join(stepsDir, f);
    const s = read(stepFile);
    const sfm = parseOrThrow(stepFm, s.data, stepFile);
    for (const u of sfm.units) {
      if (!concepts.has(u)) throw new Error(`Step ${id}/${m[1]} uses unknown concept "${u}"`);
    }
    return { id: m[1], ...sfm, body: s.content.trim() };
  });
  if (!steps.length) throw new Error(`Module ${id} has no steps`);
  if (new Set(steps.map((s) => s.id)).size !== steps.length) throw new Error(`Module ${id} has duplicate step ids`);
  if (!concepts.has(fm.publicSample)) throw new Error(`Module ${id} publicSample "${fm.publicSample}" is not a concept`);

  const guideFile = path.join(dir, "guide.md");
  const guide = fs.existsSync(guideFile) ? read(guideFile).content.trim() : "";
  if (!guide) throw new Error(`Module ${id} is missing guide.md`);

  return { id, ...fm, body: content.trim(), steps, guide };
}

export function loadContent(root = CONTENT_DIR): Content {
  const concepts = loadConcepts(path.join(root, "concepts"));
  const modulesDir = path.join(root, "modules");
  const ids = fs.existsSync(modulesDir)
    ? fs
        .readdirSync(modulesDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort()
    : [];
  const modules = ids.map((id) => {
    if (!SLUG.test(id)) throw new Error(`Module folder must be a lowercase slug: ${id}`);
    return loadModule(path.join(modulesDir, id), id, concepts);
  });
  // A public sample concept must actually be open to the public.
  for (const m of modules) {
    if (!concepts.get(m.publicSample)!.public) {
      throw new Error(`Module ${m.id}: publicSample "${m.publicSample}" must have public: true`);
    }
  }
  return { modules, concepts };
}

/** Curriculum topics a module covers, de-duplicated across its concept units. */
export function moduleCurriculum(m: Module, concepts: Map<string, Concept>): CurriculumRef[] {
  const seen = new Map<string, CurriculumRef>();
  for (const s of m.steps) {
    for (const u of s.units) {
      for (const c of concepts.get(u)?.curriculum ?? []) {
        seen.set(`${c.subject}|${c.grade}|${c.unit}`, c);
      }
    }
  }
  return [...seen.values()].sort((a, b) => a.grade - b.grade || a.subject.localeCompare(b.subject));
}

/** Every concept unit a module uses, in the order its steps first need them. */
export function moduleUnits(m: Module): string[] {
  const out: string[] = [];
  for (const s of m.steps) for (const u of s.units) if (!out.includes(u)) out.push(u);
  return out;
}
