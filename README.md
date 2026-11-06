# Hasesa — Reimagining Education for the AI Era

Hasesa Academy teaches science through hands-on **modules**. Each module starts with a mystery or something to build, and students learn the theory when the project needs it, not before. Builds happen at the Academy with a guide; at home, students read concept units and solve problems on their phone or computer.

The first three modules (all AI drafts awaiting expert review):

- **Radio:** build a radio that needs no battery (waves, circuits, electromagnetism, resonance).
- **Mind over Machine:** control a robot claw with your muscles (nerves, muscles, sensors, microcontrollers).
- **Market Detective:** fake or real? Catch the food fakers (density, chromatography, chemical tests, pH).

Each module has:

- **Steps** (about 10 hours in total): what to do, what to notice, and a lab notebook the guide can read.
- **Shared concept units**: theory plus practice problems graded on the server. Units are shared between modules (e.g. "Current and voltage" is used by Radio and Mind over Machine), carry national-curriculum tags, and can be tested out of with 80%.
- **A guide's version**: preparation, timing, answer keys and where students get stuck. Only guides see it.
- **A sign-off checklist**: the guide ticks it, and the student gets a printable certificate.

Content lives in `content/` as Markdown with YAML frontmatter. See `content/README.md` for the format.

## Who sees what

| | Browse modules, sample units | Full modules, all units, assistant | Guide tracker, guide's version |
|---|---|---|---|
| Signed out | ✓ | | |
| Signed up | ✓ (progress saved) | | |
| Enrolled (admin sets "enrolled until") | ✓ | ✓ | |
| Guide (admin sets the role) | ✓ | ✓ | ✓ |

## What's in the app

| Route | What it does |
|---|---|
| `/` | Landing page |
| `/modules` | Module catalogue (public) |
| `/modules/[id]` | Module preview, or the full module with progress when enrolled |
| `/modules/[id]/[step]` | A step: instructions, its concept units, lab notebook |
| `/modules/[id]/guide` | The guide's version (guides only) |
| `/concepts/[id]` | Concept unit: theory, practice problems, test-out |
| `/dashboard` | Student: where you stopped, guide feedback, assigned units, certificates |
| `/guide`, `/guide/students/[id]` | Guide: every student's progress, notes and answers; feedback, assignments, flags, sign-off |
| `/certificates/[code]` | Public printable certificate |
| `/chat` | Lab assistant, grounded in a step or concept unit (`?module=&step=` or `?concept=`) |
| `/admin` | Operator: enrol students, set the guide role, analytics (env-credential login) |

The old grade 9–12 routes (`/experiments`, `/onboarding`, `/lessons`) redirect to `/modules` or `/dashboard` (see `next.config.js`).

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v3
- Postgres on Neon, via Drizzle ORM (`lib/db/schema.ts`)
- iron-session cookies + bcrypt password hashing
- Any OpenAI-compatible LLM API for the lab assistant (Groq `openai/gpt-oss-120b` by default; set `AI_BASE_URL` / `AI_MODEL` to switch)

## Local development

```bash
npm install
cp .env.example .env.local   # fill in AI_API_KEY, DATABASE_URL, SESSION_SECRET, ADMIN_PASSWORD
npm run db:push              # create/update tables
npm run dev
npm test                     # content validation + unit tests
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

1. Import the repo on [vercel.com/new](https://vercel.com/new).
2. Set the env vars from `.env.example`.
3. Run `npm run db:push` against the production database whenever `lib/db/schema.ts` changes.

## Not built yet

- Expert review of all module content, safety notes and curriculum tags (everything is `ai-draft`).
- Our own module videos.
- Online payment (Chapa code is kept but unused; the admin enrols students by hand).
- Amharic and Afaan Oromo.
