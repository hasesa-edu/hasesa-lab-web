# Hasesa — Reimagining Education for the AI Era

Hasesa (Amharic for "exploration") is building an education system for the AI era. AI is changing work, economies and society, and perhaps what it means to be human; we can't keep educating students for the world of yesterday. Hasesa tries new ways of learning with real students, keeps what works and brings it to schools, in Ethiopia and beyond. The home page sets out this thesis and the open questions we're exploring.

**Hasesa Academy is our first program**, and it is what this app runs. The Academy teaches science through hands-on **modules**. Each module starts with a mystery or something to build, and students learn the theory when the project needs it, not before. Builds happen at the Academy with a guide; at home, students read concept units and solve problems on their phone or computer.

Fourteen modules, organised by level (all AI drafts awaiting expert review). Levels reflect skill (maths, tools, independent work), not age; beginner modules are a suggested first step, not a requirement.

- **Beginner:** **Bottle Rocket** (water rockets, Newton's laws, pressure, measuring heights), **Clean Water** (settle, filter and disinfect river water), **Market Detective** (catch food fakers with density, chromatography and pH), **Seed Lab** (a two-week fair-test growing experiment), **Sun Oven** (cook with a cardboard solar oven; heat transfer, energy and efficiency).
- **Intermediate:** **Bean to Cup** (the chemistry of roasting and brewing coffee), **Injera Lab** (fermentation, enzymes and pH in teff batter), **Radio** (a radio that needs no battery), **Rift Valley Shake** (earthquakes, resonance and towers on a shake table), **Weather Station** (build instruments, log a week of data, score forecasts).
- **Advanced:** **DNA Detective** (DNA extraction, inheritance, gel electrophoresis), **Mind over Machine** (a robot claw controlled by muscle signals), **Soap & Bioplastic** (saponification, polymers and reacting quantities), **Wind Power** (a generator, turbine blades and rectified DC).

Each module has:

- **A level, a trailer and steps** (8–14 hours in total, depending on the module): what to do, what to notice, and a lab notebook the guide can read. Some steps have a demo video, and long steps are shown one phase at a time.
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

**Pricing:** a place at the Academy (the hands-on sessions at partner schools in Addis Ababa) costs 12,000 ETB a year; families get in touch to enrol, and payment happens outside the app. Online access is free during the pilot.

**Pilot:** every new account is enrolled until the end of 2027 (Addis Ababa time). See `PILOT_ENROLLED_UNTIL` in `lib/access-rules.ts`. The admin can still change anyone's enrolment date by hand.

## What's in the app

| Route | What it does |
|---|---|
| `/` | Hasesa home: the thesis, why now, what we're exploring (each question marked *testing* or *open*), how we work, our first program |
| `/academy` | Academy page: a finder (search and a tile for each level), a short preview of each level's modules, a sample problem to solve, how a module works (with the Dewey quote), for parents, pilot partners, sign-up |
| `/login`, `/signup` | Google sign-in (the first sign-in creates the account) |
| `/modules` | Module catalogue (public): search and filters for level, subject and length, kept in the URL |
| `/modules/[id]` | Module page: the story (mystery, goal, build, trailer), steps, theory with curriculum tags, how you finish, materials and safety. An action panel beside it (sign up, start, continue, certificate) stays in view on desktop; visitors get a sign-up bar on phones. Returning students open on "Pick up where you left off" |
| `/modules/[id]/[step]` | A step: instructions, its concept units, and the workbench panel (lab notebook + assistant) |
| `/modules/[id]/guide` | The guide's version (guides only) |
| `/guide/modules` | Every guide's version, searchable (guides only) |
| `/concepts/[id]` | Concept unit: theory, practice problems, test-out |
| `/dashboard` | Student: where you stopped, guide feedback, assigned units, certificates, suggested modules |
| `/account` | Google profile and enrolment status |
| `/guide`, `/guide/students/[id]` | Guide: every student's progress, notes and answers; feedback, assignments, flags, sign-off |
| `/certificates/[code]` | Public printable certificate |
| `/admin` | Operator: set enrolment dates and the guide role, analytics (env-credential login) |

The **lab assistant** has no page of its own. Enrolled students and guides open it from any module, step or concept unit page: it docks on the right (a bottom sheet on phones), already knows which page they're on, and sees what they've done there (their notebook notes for a step, the problems they're stuck on in a unit, where they stopped in a module). There's one conversation per page, and selecting text offers "Ask about this". It allows 30 messages per student per day, reset at midnight Addis Ababa time.

Retired routes redirect (see `next.config.js`): `/experiments`, `/lessons` → `/modules`; `/chat`, `/onboarding`, `/teacher`, `/join`, `/mock/*` → `/dashboard`.

## The site

- **Navigation:** visitors see **Academy**; signed-in students see **Modules** and **My dashboard**, and guides also see **Student tracker**.
- **Footer:** on `/` and `/academy`, a full footer on one grid: the logo with a short contact note, an **Explore** column (Hasesa, The Academy, Modules, FAQ) and a **Get in touch** column (the email from `NEXT_PUBLIC_CONTACT_EMAIL` and any social links in `SOCIAL_LINKS` in `lib/brand.ts`), above a thin bar with ©, the motto, Terms and Privacy. Other pages get only that bar, with the logo.
- **Search and AI visibility:** every public page sets its own title, description, canonical URL and link preview through `pageMeta()` in `lib/seo.ts`. Structured data (JSON-LD): the organisation on every page, a `Course` on each module page and an `FAQPage` for the Academy FAQ. `/llms.txt` gives AI tools a plain summary with links, `sitemap.xml` lists the public pages, and the `*.vercel.app` hosts redirect to www.hasesa.com. The site is verified in Google Search Console and Bing Webmaster Tools (keep `public/BingSiteAuth.xml` and the `msvalidate.01` tag in `app/layout.tsx`).
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
