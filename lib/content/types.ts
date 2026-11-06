// Client-safe content types. The loader (lib/content/index.ts) is server-only;
// anything that reaches the browser goes through the "public" shapes below,
// which never include problem answers.

export type ContentStatus = "ai-draft" | "expert-reviewed" | "classroom-tested";

export type Discipline = "physics" | "chemistry" | "biology" | "mathematics" | "technology";

export type CurriculumRef = {
  subject: Discipline;
  grade: number;
  unit: string;
  code?: string;
};

export type McqProblem = {
  id: string;
  type: "mcq";
  q: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type NumericProblem = {
  id: string;
  type: "numeric";
  q: string;
  answer: number;
  /** Allowed error, as a percentage of the answer. */
  tolerancePct: number;
  unit?: string;
  explanation: string;
};

export type Problem = McqProblem | NumericProblem;

/** A problem as the browser sees it: no answer, no explanation. */
export type ClientProblem =
  | { id: string; type: "mcq"; q: string; choices: string[] }
  | { id: string; type: "numeric"; q: string; unit?: string };

export type Concept = {
  id: string;
  title: string;
  summary: string;
  status: ContentStatus;
  /** Open to everyone as a sample of the course. */
  public: boolean;
  curriculum: CurriculumRef[];
  problems: Problem[];
  body: string;
};

export type StepKind = "hook" | "investigate" | "build" | "finish";

export type Video = { youtubeId?: string; src?: string; credit?: string };

export type Step = {
  id: string;
  title: string;
  kind: StepKind;
  minutes: number;
  /** Concept units this step relies on. */
  units: string[];
  video?: Video;
  body: string;
};

export type Material = { item: string; note?: string };
export type SignoffItem = { id: string; text: string };

export type Module = {
  id: string;
  title: string;
  tagline: string;
  disciplines: Discipline[];
  /** The opening mystery or challenge, in a few sentences. */
  hook: string;
  goal: string;
  whatYouBuild: string;
  hours: number;
  trailer?: Video;
  status: ContentStatus;
  materials: Material[];
  safety: string[];
  signoff: SignoffItem[];
  /** Concept unit anyone can open, to try the course. */
  publicSample: string;
  body: string;
  steps: Step[];
  /** The guide's version (guide.md). Only ever sent to guides. */
  guide: string;
};

/** What a module card or preview needs. Safe for anyone. */
export type ModuleSummary = {
  id: string;
  title: string;
  tagline: string;
  disciplines: Discipline[];
  hook: string;
  goal: string;
  whatYouBuild: string;
  hours: number;
  status: ContentStatus;
  trailer?: Video;
  stepCount: number;
  steps: { id: string; title: string; kind: StepKind; minutes: number }[];
  curriculum: CurriculumRef[];
  publicSample: { id: string; title: string };
};

export type ConceptSummary = { id: string; title: string; summary: string; problemCount: number };
