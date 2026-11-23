# Hasesa Academy — Hands-on Science Modules for Ethiopian Students — Requirements

**Version:** 0.6 (Draft)
**Date:** 2026-11-23
**Owner:** TBD

> **v0.6 change:** The module page was reorganised around what the viewer needs next (§5.8, FR-39): an action panel, a "pick up where you left off" view for returning students, and fewer sections. The footer has a "Get in touch" column with the email and, later, social links (FR-36).
>
> **v0.5 change:** The website now presents **Hasesa** first, an organisation building an education system for the AI era, with the Academy as its first program. `/` is Hasesa's home page and the Academy has its own page at `/academy` (§5.8). The whole site moved to a clean, modern look (paper, ink, hairlines, one teal accent; Geist type). Marketing copy was reviewed for accuracy against the pilot (free sign-up, draft content and curriculum tags).
>
> **v0.4 change:** Hasesa has moved from a self-serve catalogue of grade 9–12 experiments to **Hasesa Academy**: project-based **modules** where students build at the Academy with a **guide** and study **shared concept units** at home. These parts of v0.3 have been dropped or replaced: the per-experiment catalogue and its routes (`/experiments`, `/onboarding`), the onboarding questions on grade and subjects, end-of-experiment concept checks (replaced by graded practice problems in concept units), the standalone `/chat` page (the assistant now lives on each course page), and the "no teachers" rule (guides are now a core role). Billing remains paused; during the pilot every new sign-up is enrolled until the end of 2027.

---

## 1. Purpose

**Hasesa and the Academy.** Hasesa (Amharic for "exploration") is building an education system for the AI era. The goal is a system that schools across Ethiopia and beyond can use. Hasesa develops new ways of learning, tests them with real students, keeps what works and brings it to schools. **Hasesa Academy is its first program** and the place where the model is tested. The website's home page (`/`) presents Hasesa: its thesis, the questions it is exploring (each marked *testing* or *open*), how it works and its programs. The Academy has its own page at `/academy` (see §5.8). The rest of this document specifies the Academy.

Hasesa Academy teaches high-school science through hands-on modules. Each module starts with a mystery or something to build. Students learn the theory when the project needs it, not before. Builds happen at the Academy with a guide. At home, students read concept units and solve practice problems on their phone or computer. An AI lab assistant, available on every course page, helps them understand the material and troubleshoot their own work.

The product must work on low-end Android phones over unreliable, low-bandwidth networks.

### 1.1 Origin

The model was piloted in June 2026. Grade 11 students did a strawberry DNA extraction with live guidance from researchers at The Science Basement. That pilot showed demand for hands-on, low-cost science. Hasesa first tried to turn the live guidance into self-serve experiment guides (v0.3). It then moved to a guided Academy model (v0.4). Hands-on builds work best with a guide present, while theory and practice suit self-paced study at home.

### 1.2 Competitive Landscape & Differentiation

Students today rely on YouTube demos (generic, often needing lab equipment they don't have), the MoE's digital resources (curriculum-aligned, but little hands-on support) and school labs (often missing or under-equipped). Hasesa's differentiation is:

- (a) **doing first**: each module is a real build or investigation, and the theory serves the project;
- (b) builds designed around **local, low-cost materials**;
- (c) **shared concept units** tagged to the national curriculum, so project work also covers exam topics;
- (d) a **guide** who sees each student's notebook, answers and progress, gives feedback and signs off the build;
- (e) an AI lab assistant that knows which page the student is on and what they have done there.

## 2. Goals & Success Metrics

> All Year-1 targets are **aspirational** and must be re-baselined after the Academy pilot.

| Goal | Metric | Target (Year 1) |
|---|---|---|
| Students finish modules | % of enrolled students who start a module and earn its certificate | ≥ 50% |
| Understanding, not just following steps | First-attempt correctness on concept-unit practice problems | ≥ 70% |
| Home study between sessions | Enrolled students completing ≥ 1 concept unit per week | ≥ 50% |
| Reach | Students enrolled at the Academy | Pilot cohort; scale with funding |
| Usable on poor networks | Median step/unit page completion on 2G/3G | ≥ 70% |
| Lab assistant answer quality | Correctness on a weekly module eval set | ≥ 85% |
| Lab assistant grounding | Citation accuracy (cited page supports the answer) | ≥ 90% |
| Lab assistant safety | Refusal / safe-redirect rate on the unsafe and off-topic eval set | ≥ 98% |

## 3. Target Users

- **Primary: students.** Ethiopian high-school students (roughly ages 14–18) who attend the Academy. They build at the Academy and study concept units at home. **Most users are minors.**
- **Guides.** Academy staff who run the builds. They track every student's progress, read notebooks and answers, give feedback, assign units, flag students who need help and sign off builds.
- **Operator (admin).** Sets enrolment dates and the guide role, and reads analytics.
- **Public visitors.** Parents and prospective students who browse the module catalogue, sample units and certificates.
- **Device profile:** low-end Android phones (1–2 GB RAM, Android 8+), sometimes shared within a family.
- **Network profile:** intermittent 2G/3G, occasional Wi-Fi; data is a meaningful cost.

## 4. Scope

### 4.1 In Scope (MVP)
- Three modules: **Radio** (a radio that needs no battery), **Mind over Machine** (a robot claw controlled by muscle signals) and **Market Detective** (catching food adulteration).
- For each module: a hook, a goal, what you build, materials, safety notes, a trailer, about 10 hours of steps and a sign-off checklist.
- Shared concept units with theory, maths and server-graded practice problems, tagged to the national curriculum, with a test-out option.
- A per-step lab notebook that the guide can read.
- A guide's version of each module and a guide tracker.
- Printable certificates with a public verification page.
- An AI lab assistant (text) embedded in module, step and concept pages.
- Google sign-in.
- Mobile-first responsive web app (PWA) targeting Android.
- Free during the pilot (every new sign-up is enrolled until the end of 2027).

### 4.2 Out of Scope (MVP)
- The v0.3 self-serve experiment catalogue and onboarding.
- Online payment (the Chapa integration is kept but unused).
- Classroom management for schools, class codes or teacher accounts outside the Academy.
- Exam prep: EUEE mock tests, the diagnostic, mastery scores.
- AI-generated quizzes and AI grading of open answers.
- Live video classes.
- Native iOS/Android apps (PWA first; Play Store TWA later).

## 5. Functional Requirements

### 5.1 Module Content
- **FR-1** Content is Markdown with YAML frontmatter under `content/` (format in `content/README.md`). It is validated at build and test time, and an invalid header names the file and field.
- **FR-2** A module defines its title, tagline, disciplines, hook, goal, what you build, hours, optional trailer, status, one public sample unit, materials (with local sources), safety notes and a sign-off checklist.
- **FR-3** A module has ordered steps. Each step has a kind (hook, investigate, build or finish), an estimated time, the concept units it relies on and an optional demo video. Long steps are shown one phase at a time.
- **FR-4** Each module has a guide's version (preparation, timing, answer keys, expected results, common sticking points, safety briefing, how to judge each sign-off item). Only guides can see it.
- **FR-5** Every module and concept unit has a status: `ai-draft`, `expert-reviewed` or `classroom-tested`. Content that has not been expert-reviewed is clearly labelled.
- **FR-6** Materials are cheap and locally available. Anything that needs lab-only equipment is excluded or given a local substitute.

### 5.2 Concept Units
- **FR-7** A concept unit has a title, summary, theory (Markdown with KaTeX maths), curriculum tags (subject, grade, unit) and practice problems.
- **FR-8** Units are shared between modules: a unit is written once and every step that needs it links to it.
- **FR-9** Practice problems are multiple-choice or numeric (with a percentage tolerance and a unit). They are graded on the server, never by AI. Numeric answers accept forms such as `1500`, `1,500`, `1.5e3` and `1.5 x 10^3`.
- **FR-10** A student can test out of a unit by scoring at least 80%.
- **FR-11** Problems and explanations are authored and reviewed, not generated at runtime.

### 5.3 Lab Notebook & Student Dashboard
- **FR-12** On each step, an enrolled student can mark progress and write notebook notes. The notebook and the assistant share one workbench panel.
- **FR-13** The dashboard shows where the student stopped, feedback from their guide, units the guide assigned, and earned certificates.
- **FR-14** A student's progress, notes and answers are visible to them and to guides only.

### 5.4 Guide Tools
- **FR-15** The guide tracker lists every student's progress across modules.
- **FR-16** For each student, a guide can read step notes and problem answers, give feedback, assign or remove concept units, set a flag, and sign off a module against its checklist (and undo a sign-off).
- **FR-17** A sign-off issues a certificate with a unique code. `/certificates/[code]` is a public, printable page.

### 5.5 AI Lab Assistant
- **FR-18** The assistant has no page of its own. Enrolled students and guides open it from any module, step or concept page. It docks on the right on desktop and opens as a bottom sheet on phones. Answers are streamed.
- **FR-19** The page decides the context; the student never picks it. The assistant is grounded in that page's content (module, step and its units, or concept unit), cites it, and says when the material doesn't cover a question.
- **FR-20** The assistant sees what the student has done on that page (notebook notes for a step, problems they're stuck on in a unit, where they stopped in a module) and refers to it naturally.
- **FR-21** There is one conversation per page. Selecting text on the page offers "Ask about this".
- **FR-22** The assistant guides with questions rather than handing over answers. For practice problems, it gives one hint at a time and never states the final answer.
- **FR-23** **Safety:** the assistant never suggests stronger chemicals, higher voltages, open flames or larger quantities than the material uses. It never helps connect anything to mains electricity, and electrodes on the body are battery-only. It sends heat, sharp tools, electricity and chemicals back to the Academy with the guide or an adult present. If a student describes an injury, it tells them to stop and get an adult or medical help.
- **FR-24** The assistant refuses off-topic or unsafe prompts (anything outside high-school science, maths and technology) in one sentence and steers back to the module.
- **FR-25** Up to 30 messages per student per day, reset at midnight Addis Ababa time.

### 5.6 Accounts & Access
- **FR-26** Sign-up and sign-in via Google only. The first Google sign-in creates the account. An email match links only an account with no Google ID yet, so a second Google account cannot take over an existing one.
- **FR-27** Access levels:

| Level | Gets |
|---|---|
| Public (signed out) | Home and Academy pages, module catalogue and previews, each module's public sample unit, certificates |
| Signed in, not enrolled | The same, with progress saved |
| Enrolled (`paid_until` in the future) | Full modules, all concept units, the lab assistant |
| Guide (role set by the admin) | Everything enrolled students get, plus the guide tracker and guide's versions |

- **FR-28** **Pilot:** every new account is enrolled until 2028-01-01 00:00 Addis Ababa time. The admin can set any student's enrolment date and the guide role by hand.
- **FR-29** Students under 18 see a simplified privacy notice, plus a guardian consent flow where the law requires one.

### 5.6a Pricing & Billing (paused)
_The billing backend (Chapa, `payments`, `paid_until`) is still in the code but unused, and no pricing appears in the UI. The previous plan was a prepaid 30-day pass for 300 ETB through Chapa, with stacking days and server-side verification. Pricing will be revisited after the pilot._

### 5.8 Website & Brand
- **FR-33** **Home page (`/`)** presents Hasesa, in this order: the thesis (with the ሐሰሳ "exploration" eyebrow), *Why now* (then / now / next), *What we're exploring* (six open questions, each tagged *Testing* when the Academy is trying an answer or *Open*), *How we work* (try it with real students, keep what works, bring it to schools) and *Our first program* (a card linking to the Academy).
- **FR-34** **Academy page (`/academy`)**, in this order: the hero with the **tuning dial** (each station is a module; drag, arrow keys, Page Up/Down or station buttons; announced to screen readers), the module list, a public sample problem the visitor can solve, *How a module works* (with the Dewey quote), *For parents* (curriculum mapping, the guide, certificates), *Questions parents ask* (an FAQ: who it's for (ages 13–18), where sessions happen, cost, module length, what to bring, certificates), the pilot partners ("Piloted with"), and a sign-up call to action.
- **FR-35** **Navigation** depends on sign-in: visitors see **Academy**; signed-in students see **Modules** and **My dashboard**; guides also see **Student tracker**.
- **FR-36** **Footer:** on `/` and `/academy`, a full footer on one 12-column grid, left-aligned at every width: the logo with a short contact note (the goal of reaching schools in Ethiopia and beyond, and an invitation to get in touch); an **Explore** column (Hasesa, The Academy, Modules); and a **Get in touch** column with the `NEXT_PUBLIC_CONTACT_EMAIL` address and the social links in `SOCIAL_LINKS` (`lib/brand.ts`), hidden when both are empty. Below it, a thin bar with ©, the motto and the legal links. Other pages show only that bar, with the logo.
- **FR-37** **Copy** lives in `lib/i18n.ts` and must match the facts: sign-up is free and opens everything during the pilot; content and curriculum tags are described as drafts until reviewed; partners are named only for what they actually did.
- **FR-38** **Visual identity:** paper background, ink text, hairline borders and teal as the single accent; amber only for the logo's eyes and *Open* tags. Geist for headings and UI, Geist Mono for labels and numbers, Atkinson Hyperlegible for lessons and the assistant, Noto Sans Ethiopic for Amharic. Tokens are defined once in `app/globals.css`; pages don't hard-code colours.
- **FR-39** **Module page (`/modules/[id]`):**
  - An action panel shows the viewer's next action: sign up and a free sample unit (visitors), Start or Restart (signed in), Continue with progress (started), or the certificate (finished). It also shows a Guide's version link for guides, plus hours, steps, units and the draft status. On desktop it sits beside the content and stays in view; on phones, visitors get a sign-up bar at the bottom, and enrolled students keep only the assistant's bar.
  - Visitors and new students see the story first: the mystery, goal, what you'll build and the trailer, then the steps.
  - Returning students (module started, not finished) open on "Pick up where you left off" and the steps, with their current step marked; the story moves to "About this module".
  - Then the theory (each unit with its curriculum tags), how you finish (sign-off checklist), and "Before you start" (materials, safety and the full overview).

- **FR-40** **Search and AI visibility:**
  - Every public page has its own title, description, canonical URL on www.hasesa.com and link-preview tags (`pageMeta()` in `lib/seo.ts`).
  - Structured data: `EducationalOrganization` + `WebSite` on every page, `Course` on each module page, and `FAQPage` for the Academy FAQ.
  - `/llms.txt` summarises Hasesa and links its public pages; `sitemap.xml` lists the public pages; `robots.txt` allows all crawlers, including AI crawlers, except in private areas.
  - The Vercel production hosts redirect permanently to www.hasesa.com.
  - The site is submitted to Google Search Console and Bing Webmaster Tools (pending).
### 5.7 Offline Access (post-MVP)
- **FR-30** Students can save steps and concept units (text and images) for offline use. Videos are optional downloads.
- **FR-31** Progress, notes and answers made offline sync automatically on the next connection.
- **FR-32** The lab assistant needs a connection.

_Today the service worker caches only the app shell and public pages. Signed-in pages are never cached, so personal data doesn't stay on a shared phone._

## 6. Non-Functional Requirements

### 6.1 Performance & Bandwidth

Network baselines: **2G** = 400 Kbps / 400 ms RTT, **3G** = 1.6 Mbps / 300 ms RTT.

- **NFR-1** First meaningful paint ≤ 3s on 3G and ≤ 6s on 2G for a step or concept page (p50, cold cache).
- **NFR-2** Median step/unit page payload ≤ 200 KB, excluding video. Videos (YouTube, no-cookie embed) load only when played.
- **NFR-3** Lab assistant first-token latency ≤ 4s on 3G (p50), with streamed responses.

### 6.2 Reliability
- **NFR-4** PWA installable on Android Chrome, with an offline shell available after the first visit.
- **NFR-5** Capacity planning assumes about 3 assistant turns per active student per day, with peaks around Academy sessions.

### 6.3 Accessibility & Localisation
- **NFR-6** WCAG 2.1 AA for colour contrast, keyboard navigation and screen-reader labels. Light theme only for now; dark tokens exist but are switched off (`LIGHT_ONLY` in `components/ThemeProvider.tsx`).
- **NFR-7** English at launch. Amharic and Afaan Oromo follow, rendering correctly in Ge'ez and Qubee scripts on Android 8+ system fonts.
- **NFR-8** Course content renders maths with KaTeX. Assistant answers use plain-text formulas (no LaTeX), for low-end devices; tables are allowed.

### 6.4 Security & Privacy
- **NFR-9** All traffic over HTTPS, with HSTS, a strict Content-Security-Policy and frame denial. Session cookies are signed, httpOnly and secure in production. There are no student passwords (Google sign-in only). Admin sign-in uses env credentials and fails closed when unset in production.
- **NFR-10** Rate limits and body-size caps on API routes; input validation on all user-supplied fields; client-supplied system messages are stripped from chat history.
- **NFR-11** Compliance with Ethiopia's data protection guidelines and child-safety norms. **Because most users are minors, any third-party AI provider must allow use in services for under-18s and must not train on student prompts.**
- **NFR-12** **Chat retention:** messages are kept ≤ 90 days, then purged by a daily cron job. Users with extended retention keep them up to 12 months, and students can delete a conversation at any time. Progress, notebook notes and answers are kept for the guide and are not purged.

### 6.5 Scalability & Cost
- **NFR-13** Launch target is the Academy pilot cohort on free or near-free AI inference. The architecture must scale beyond that without re-platforming.
- **NFR-14** Per-student daily cap on assistant messages (FR-25), tunable as cost data accrues. Per-IP throttling protects the AI quota from abuse.
- **NFR-15** The AI provider is configurable (any OpenAI-compatible API, set by `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL` and optionally `AI_REASONING_EFFORT`), so the provider or model can change without code changes.

### 6.6 Maintainability
- **NFR-16** Course content is structured data under version control, editable by subject experts and validated by tests before publication.
- **NFR-17** Once students have used a content ID (file name), it is never renamed, because progress is stored against it.

## 7. Content Strategy

- Source of truth: the MoE high-school Biology, Chemistry, Physics and Mathematics curriculum. Concept units carry curriculum tags.
- Every module and unit starts as `ai-draft`. A subject expert checks the science and safety (`expert-reviewed`), and the module is then used with real students and revised (`classroom-tested`).
- Each build is tested with the listed local materials before it is used at the Academy.
- Module videos are to be recorded by Hasesa with the same local materials. The current videos are placeholders.

## 8. AI / Model Strategy

- **Hosted LLM** behind an OpenAI-compatible interface. Groq (`openai/gpt-oss-120b`) is the default. The provider is selected on quality, cost, latency from East Africa, and whether its terms allow use by minors.
- **Grounding:** the current page's content (module, step and its concept units, or concept unit) and a summary of the student's own work on that page go into the system prompt. At this content size, no vector store is needed.
- **Guardrails:** system-role injection from the client is stripped, message and history length are capped, the topic is restricted, safety rules are built into the prompt, practice-problem answers are withheld, and the tone is age-appropriate.
- **Evaluation:** a weekly eval set per module (correctness, citation accuracy, safety), with regression gates before changing model or provider.

## 9. Tech Stack (Current)

- **Frontend/backend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/Radix UI.
- **Data:** Postgres on Neon via Drizzle ORM.
- **Auth:** Google OAuth (`arctic`) + iron-session cookies.
- **Content:** Markdown + YAML frontmatter (`gray-matter`), rendered with `react-markdown`, GFM and KaTeX.
- **AI:** any OpenAI-compatible chat completions API (Groq by default).
- **Hosting:** Vercel, with Vercel Cron for chat retention cleanup.
- **Analytics:** first-party page-view analytics in `/admin`; no third-party ad trackers.

## 10. Risks & Open Questions

| # | Risk / Question | Mitigation / Next Step |
|---|---|---|
| R1 | Students get hurt during builds or home investigations | Hazardous work happens at the Academy with a guide; safety notes per module; battery-only electronics on the body; assistant safety rules; expert safety review before `expert-reviewed` |
| R2 | All content is still AI-drafted | Expert review of science, safety and curriculum tags before scaling the pilot |
| R3 | Free AI tiers are rate-limited and models get withdrawn | Configurable provider and model; daily caps; trim prompt size; plan a paid fallback |
| R4 | AI provider terms may forbid services used by minors (e.g. the Gemini API) | Check terms before adopting any provider (NFR-11) |
| R5 | Local materials vary in availability and price | List local sources per material; guides report what was available |
| R6 | Video bandwidth cost for students | Load on demand; plan low-resolution and downloadable versions |
| R7 | Data privacy expectations for minors | Legal review before public launch; clear consent UX |
| R8 | A single guide becomes a bottleneck as the cohort grows | Tracker flags and assignments to focus guide time; plan more guides |
| Q1 | Funding model after the pilot (enrolment ends 2027-12-31) | Revisit pricing (the Chapa pass is ready) with pilot data |
| Q2 | Partnership with the MoE or regional bureaus? | Would unlock curriculum sign-off and distribution |

## 11. Milestones (Indicative)

| Phase | Scope | Exit gate |
|---|---|---|
| Pilot (done, June 2026) | Strawberry DNA extraction with Grade 11 students, guided live | Showed demand for hands-on, low-cost science |
| v0.3 experiment catalogue (retired, 2026-10/11) | Self-serve experiment guides, lab assistant, notebook | Replaced by the Academy model |
| Academy pilot (current, to end of 2027) | Three AI-drafted modules, shared units, guide tools, certificates, embedded assistant; English; free enrolment | Students earn certificates; ≥ 50% of starters finish a module; no P0 bugs |
| Expert-reviewed release | All three modules `expert-reviewed`, then `classroom-tested`; own videos | Assistant meets the §2 quality and safety targets |
| Public launch | Amharic UI, offline steps and units, more modules, pricing decision | Privacy and legal sign-off; AI cost within budget at target scale |

## 12. Approval

| Role | Name | Status |
|---|---|---|
| Product owner | TBD | ☐ |
| Curriculum and safety lead | TBD | ☐ |
| Engineering lead | TBD | ☐ |
| Privacy / legal | TBD | ☐ |

## 13. Glossary

| Term | Meaning |
|---|---|
| **Module** | A project-based course built around one build or mystery, made of ordered steps (about 10 hours) |
| **Step** | One session of a module: what to do, what to notice, the concept units it needs |
| **Concept unit** | Shared theory plus server-graded practice problems, tagged to the curriculum |
| **Test-out** | Skipping a unit by scoring at least 80% on its problems |
| **Guide** | Academy staff member who runs builds, tracks students and signs off modules |
| **Guide's version** | The guide-only companion to a module: preparation, answer keys, sticking points |
| **Sign-off** | The guide's check of a module's checklist, which issues a certificate |
| **Enrolled** | A student whose `paid_until` date is in the future; gets full content and the assistant |
| **MoE** | Ethiopian Ministry of Education, owner of the national curriculum framework |
| **Lab assistant** | The AI chat helper embedded in course pages, grounded in the current page |
| **Lab notebook** | A student's notes on each step, readable by the guide |
| **PWA** | Progressive Web App: a web app installable to the home screen, with offline support via a service worker |
| **TWA** | Trusted Web Activity: a way to publish a PWA on the Google Play Store |
| **LLM** | Large Language Model, the AI model behind the lab assistant |
| **WCAG** | Web Content Accessibility Guidelines; this product targets level AA |
| **Ge'ez script** | Writing system used for Amharic |
| **Qubee** | Latin-based alphabet used to write Afaan Oromo |
