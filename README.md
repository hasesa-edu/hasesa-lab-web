# Hasesa — Reimagining Education for the AI Era

Hasesa (Amharic for "exploration") is building an education system for the AI era. AI is changing work, economies and society, and perhaps what it means to be human; we can't keep educating students for the world of yesterday. Hasesa tries new ways of learning with real students, keeps what works and brings it to schools, in Ethiopia and beyond. The home page sets out this thesis and the open questions we're exploring.

**Hasesa Academy is our first program**, and it is what this app runs. The Academy teaches science through hands-on **modules**. Each module starts with a mystery or something to build, and students learn the theory when the project needs it, not before. Builds happen at the Academy with a guide; at home, students read concept units and solve problems on their phone or computer.

The first three modules (all AI drafts awaiting expert review):

- **Radio:** build a radio that needs no battery (waves, circuits, electromagnetism, resonance).
- **Mind over Machine:** control a robot claw with your muscles (nerves, muscles, sensors, microcontrollers).
- **Market Detective:** fake or real? Catch the food fakers (density, chromatography, chemical tests, pH).

Each module has:

- **A trailer and steps** (about 10 hours in total): what to do, what to notice, and a lab notebook the guide can read. Some steps have a demo video, and long steps are shown one phase at a time.
- **Shared concept units**: theory plus practice problems graded on the server. Units are shared between modules (e.g. "Current and voltage" is used by Radio and Mind over Machine), carry national-curriculum tags, and can be tested out of with 80%. One unit per module is a free public sample.
- **A guide's version**: preparation, timing, answer keys and where students get stuck. Only guides see it.
- **A sign-off checklist**: the guide ticks it, and the student gets a printable certificate.

Content lives in `content/` as Markdown with YAML frontmatter. See `content/README.md` for the format.

## Who sees what

| | Browse modules, sample units | Full modules, all units, assistant | Guide tracker, guide's version |
|---|---|---|---|
| Signed out | ✓ | | |
| Signed in, not enrolled | ✓ (progress saved) | | |
| Enrolled (`paid_until` in the future) | ✓ | ✓ | |
| Guide (admin sets the role) | ✓ | ✓ | ✓ |

**Pilot:** every new account is enrolled until the end of 2027 (Addis Ababa time). See `PILOT_ENROLLED_UNTIL` in `lib/access-rules.ts`. The admin can still change anyone's enrolment date by hand.

## What's in the app

| Route | What it does |
|---|---|
| `/` | Hasesa home: the thesis, why now, what we're exploring (each question marked *testing* or *open*), how we work, our first program |
| `/academy` | Academy page: the tuning dial, the modules, a sample problem to solve, how a module works (with the Dewey quote), for parents, pilot partners, sign-up |
| `/login`, `/signup` | Google sign-in (the first sign-in creates the account) |
| `/modules` | Module catalogue (public) |
| `/modules/[id]` | Module preview, or the full module with progress when enrolled |
| `/modules/[id]/[step]` | A step: instructions, its concept units, and the workbench panel (lab notebook + assistant) |
| `/modules/[id]/guide` | The guide's version (guides only) |
| `/concepts/[id]` | Concept unit: theory, practice problems, test-out |
| `/dashboard` | Student: where you stopped, guide feedback, assigned units, certificates |
| `/account` | Google profile and enrolment status |
| `/guide`, `/guide/students/[id]` | Guide: every student's progress, notes and answers; feedback, assignments, flags, sign-off |
| `/certificates/[code]` | Public printable certificate |
| `/admin` | Operator: set enrolment dates and the guide role, analytics (env-credential login) |

The **lab assistant** has no page of its own. Enrolled students and guides open it from any module, step or concept unit page: it docks on the right (a bottom sheet on phones), already knows which page they're on, and sees what they've done there (their notebook notes for a step, the problems they're stuck on in a unit, where they stopped in a module). There's one conversation per page, and selecting text offers "Ask about this". It allows 30 messages per student per day, reset at midnight Addis Ababa time.

Retired routes redirect (see `next.config.js`): `/experiments`, `/lessons` → `/modules`; `/chat`, `/onboarding`, `/teacher`, `/join`, `/mock/*` → `/dashboard`.

## The site

- **Navigation:** visitors see **Academy**; signed-in students see **Modules** and **My dashboard**, and guides also see **Student tracker**.
- **Footer:** on `/` and `/academy` it carries the contact note ("Across Ethiopia and beyond.") with a Get in touch button, shown only when `NEXT_PUBLIC_CONTACT_EMAIL` is set. Other pages get the plain footer bar.
- **Copy:** all marketing and navigation text is in `lib/i18n.ts` (English only for now).
- **Look:** clean and modern. Paper background, ink text, hairline borders and teal as the one accent; amber only for the logo's eyes and "open" tags. Geist for headings and UI, Geist Mono for labels and numbers, Atkinson Hyperlegible for lessons and the assistant, Noto Sans Ethiopic for Amharic. The tokens are in `app/globals.css`. Dark mode is off (`LIGHT_ONLY` in `components/ThemeProvider.tsx`).

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/Radix UI components
- Postgres on Neon, via Drizzle ORM (`lib/db/schema.ts`)
- Google sign-in (OAuth via `arctic`) with iron-session cookies; no passwords
- Markdown content rendered with `react-markdown`, GFM tables and KaTeX maths
- Any OpenAI-compatible LLM API for the lab assistant (Groq `openai/gpt-oss-120b` by default; set `AI_BASE_URL` / `AI_MODEL` to switch)
- Installable PWA (`public/sw.js`, `public/manifest.json`); only public pages are cached offline
- Vercel Cron runs `/api/cron/cleanup` daily to purge chat messages past retention

## Local development

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL, SESSION_SECRET, GOOGLE_CLIENT_ID/SECRET, AI_API_KEY, ADMIN_PASSWORD
npm run db:push              # create/update tables
npm run dev
npm test                     # content validation + unit tests
```

Open [http://localhost:3000](http://localhost:3000). For Google sign-in, register `http://localhost:3000/api/auth/google/callback` as a redirect URI on your OAuth client.

## Deploying to Vercel

1. Import the repo on [vercel.com/new](https://vercel.com/new).
2. Set the env vars from `.env.example` (including `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_EMAIL`), and add `<site>/api/auth/google/callback` to the Google OAuth client.
3. Run `npm run db:push` against the production database whenever `lib/db/schema.ts` changes.

## Not built yet

- Expert review of all module content, safety notes and curriculum tags (everything is `ai-draft`).
- Our own module videos.
- Online payment (Chapa code in `lib/billing/` is kept but unused; enrolment is set by the pilot default or by the admin).
- Amharic and Afaan Oromo.
