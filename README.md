# Hasesa — Hands-on science for Ethiopian high school students

Hasesa helps students in grades 9–12 do real biology, chemistry and physics experiments on their own, using cheap, locally available materials. Each experiment has:

- **A step-by-step guide**: concept background, materials (with local substitutes), safety notes, a tickable procedure, expected results and why they happen, and troubleshooting.
- **A pre-recorded demo video**: YouTube embeds for now. Self-hosted recordings are supported through `video.src`.
- **An AI lab assistant** grounded in that guide. It explains the concepts, helps troubleshoot experiments that didn't work, and cites the step it relied on.

The model was piloted in June 2026: a strawberry DNA extraction with Grade 11 students at Magic Carpet School, guided live by researchers from The Science Basement. Hasesa replaces that live support with guides, videos and the lab assistant so any student can do the experiments on their own, wherever they are.

## What's in the app

| Route | What it does |
|---|---|
| `/` | Landing page |
| `/experiments` | Catalogue, filterable by grade (9–12) and subject |
| `/experiments/[id]` | The experiment guide, a short concept check, and a lab-notebook card to save observations and mark it done |
| `/chat` | Lab assistant. `?experiment=<id>` grounds it in that guide; a picker on the page does the same. |
| `/dashboard` | My lab notebook: in progress, suggested next, and completed experiments with notes |
| `/onboarding` | Pick grade and subjects |
| `/signup`, `/login` | Email + password accounts (students) |
| `/admin` | Analytics for the operator (env-credential login) |

Old exam-prep routes (`/lessons`, `/teacher`, `/join`, `/mock/*`) redirect to their replacements (see `next.config.js`).

Experiment content lives in `lib/experiments.ts`. All 18 experiments are **samples pending review** by Ethiopian subject teachers.

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
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

1. Import the repo on [vercel.com/new](https://vercel.com/new).
2. Set the env vars from `.env.example`.
3. Run `npm run db:push` against the production database whenever `lib/db/schema.ts` changes.

## Not built yet

- Reviewed curriculum content, and coverage of the full grade 9–12 syllabus.
- Our own pre-recorded experiment videos.
- Amharic and Afaan Oromo.
- Offline experiment packs.
- Full-corpus retrieval for the assistant. Today it is grounded in one experiment at a time.

`REQUIREMENTS.md` is the earlier exam-prep spec and is kept for reference.
