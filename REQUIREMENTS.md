# Hasesa — Hands-on Science Experiments for Ethiopian Students (Grades 9–12) — Requirements

**Version:** 0.3 (Draft)
**Date:** 2026-10-19
**Owner:** TBD

> **v0.3 change:** Hasesa has moved from Grade 11 exam prep to self-paced, hands-on experiments for grades 9–12. Each student uses it **individually, at any time, on their own device**. It is not a classroom or teacher-led product. These parts of v0.2 have been dropped: mathematics, the diagnostic, mastery tracking, AI-generated quizzes and grading, EUEE mock tests, and teacher class codes and dashboards.

---

## 1. Purpose

Hasesa helps Ethiopian students in grades 9–12 do real Biology, Chemistry and Physics experiments by themselves, using cheap, locally available materials. Each experiment comes with a step-by-step guide, a pre-recorded demo video and an AI lab assistant that is grounded in that guide. Together, these replace the live support a student would otherwise need from a teacher or lab technician. The product must work on low-end Android phones over unreliable, low-bandwidth networks.

### 1.1 Origin

The model was piloted in June 2026. Grade 11 students did a strawberry DNA extraction with live guidance from researchers at The Science Basement. Hasesa turns that live guidance into self-serve material: written guides, videos and the lab assistant. Any student can then do the experiment alone, wherever they are.

### 1.2 Competitive Landscape & Differentiation

Students today rely on YouTube demos (generic, often needing lab equipment they don't have), the MoE's digital resources (curriculum-aligned, but little hands-on support) and school labs (often missing or under-equipped). Hasesa's differentiation is:

- (a) experiments designed around **local, low-cost materials**, with substitutes listed;
- (b) alignment with the MoE grade 9–12 science curriculum;
- (c) an AI lab assistant that helps the student understand and troubleshoot **their own** attempt, grounded in the guide they are following;
- (d) a personal lab notebook, so each student's progress and observations are theirs.

## 2. Goals & Success Metrics

> All Year-1 targets are **aspirational** and must be re-baselined after the next pilot.

| Goal | Metric | Target (Year 1) |
|---|---|---|
| Students complete experiments on their own | % of started experiments marked done | ≥ 50% |
| Understanding, not just following steps | Concept-check correctness after an experiment | ≥ 70% |
| Sustained individual use | Students completing ≥ 3 experiments in 30 days | ≥ 30% of actives |
| Reach | Daily active students | 100 at launch; scale with funding |
| Usable on poor networks | Median guide page completion on 2G/3G | ≥ 70% |
| Lab assistant answer quality | Correctness on a weekly experiment eval set | ≥ 85% |
| Lab assistant grounding | Citation accuracy (cited step or section supports the answer) | ≥ 90% |
| Lab assistant safety | Refusal / safe-redirect rate on the unsafe and off-topic eval set | ≥ 98% |

## 3. Target Users

- **Primary:** Ethiopian students in grades 9–12 (roughly ages 14–18), public and private schools, urban and rural. They use Hasesa **independently** after school, at home and at their own pace. **Most users are minors.**
- **Secondary:** parents and guardians, who may supervise experiments that need an adult present.
- **Not a target user:** teachers or schools as account holders. Teachers take part only as **content reviewers** (§7).
- **Device profile:** low-end Android phones (1–2 GB RAM, Android 8+), sometimes shared within a family.
- **Network profile:** intermittent 2G/3G, occasional Wi-Fi; data is a meaningful cost.

## 4. Scope

### 4.1 In Scope (MVP)
- Experiment catalogue for **Biology, Chemistry and Physics**, grades 9–12, filterable by grade and subject.
- For each experiment: concept background, materials with local substitutes, safety notes, a tickable procedure, expected observations, the explanation, troubleshooting, a demo video and a short concept check.
- An AI lab assistant (text) grounded in the experiment the student is working on.
- A personal lab notebook: start an experiment, save observations, mark it done, see suggested next experiments.
- Onboarding that captures grade and subjects of interest, to personalise suggestions.
- Email + password accounts.
- Mobile-first responsive web app (PWA) targeting Android.
- Free for students.

### 4.2 Out of Scope (MVP)
- Teacher accounts, class codes, class dashboards or any classroom management.
- Mathematics and non-science subjects.
- Exam prep: EUEE mock tests, the diagnostic, mastery scores.
- AI-generated quizzes and AI grading of open answers.
- Live human tutoring or video classes.
- Native iOS/Android apps (PWA first; Play Store TWA later).
- Paid premium tier.

## 5. Functional Requirements

### 5.1 Experiment Content
- **FR-1** Experiments are organised by Subject → Grade → Unit, with an MoE curriculum code where known.
- **FR-2** Each experiment shall include: why it matters (tied to everyday Ethiopian life), background concepts, materials with local substitutes, safety notes, numbered steps with optional tips, what to observe, why it happens, troubleshooting, an estimated time and a difficulty level.
- **FR-3** Materials shall be cheap and locally available. Anything that needs lab-only equipment is excluded or given a local substitute.
- **FR-4** Each experiment shall have a pre-recorded demo video (YouTube embed or self-hosted) credited to whoever recorded it.
- **FR-5** Each experiment shall end with a short concept check (multiple choice, with an explanation for each answer). Concept checks are authored and reviewed, not generated by AI.
- **FR-6** Content still awaiting expert review shall be clearly labelled as a sample.

### 5.2 AI Lab Assistant
- **FR-7** Students can ask the assistant questions in text and get streamed answers.
- **FR-8** When opened from an experiment, the assistant is grounded in that experiment's full guide. It cites the step or section it relied on, and says when the guide doesn't cover a question.
- **FR-9** The assistant helps the student troubleshoot their own attempt. It asks what they did or saw when that's unclear, suggests the most likely cause and gives one concrete thing to try next.
- **FR-10** The assistant guides the student with questions (Socratic style) rather than handing over answers, and explains *why*, not just *what*.
- **FR-11** **Safety:** the assistant never suggests stronger chemicals, higher voltages, open flames or larger quantities than the guide uses. It reminds the student to have an adult present for heat, sharp tools, mains electricity or chemicals. If a student describes an injury, it tells them to stop and get an adult or medical help.
- **FR-12** The assistant refuses off-topic or unsafe prompts (anything outside grade 9–12 Biology, Chemistry and Physics) in one sentence and steers back to the science.
- **FR-13** Each student keeps one conversation per session, and conversation history can be resumed. Retention follows NFR-12.

### 5.3 Personal Lab Notebook
- **FR-14** A signed-in student can mark an experiment as started or done, and save free-text observations against it.
- **FR-15** The dashboard shows the student's experiments in progress, completed experiments with their notes, and suggested next experiments based on their grade, subjects and what they've already done.
- **FR-16** Students can open any experiment at any time; suggestions are never a gate.
- **FR-17** Progress is private to the student.

### 5.4 Accounts & Onboarding
- **FR-18** Sign-up and sign-in via Google only. The first Google sign-in creates the account.
- **FR-19** Onboarding captures grade (9–12) and subjects of interest. School and region are optional.
- **FR-20** Students under 18 see a simplified privacy notice, plus a guardian consent flow where the law requires one.
- **FR-21** The experiment catalogue, guides and lab assistant require sign-in. Signed-in students can read the free sample guides. Every other guide and the lab assistant require an active Hasesa pass.

### 5.4a Pricing & Billing
- **FR-21a** One plan: a prepaid 30-day pass for 300 ETB, paid through Chapa (Telebirr, CBE Birr, M-Pesa, card). No auto-renewal; each payment stacks 30 days on any remaining time.
- **FR-21b** A payment only unlocks access after the server verifies it with Chapa. The webhook and the return page both verify, idempotently.
- **FR-21c** Pass holders get up to 30 lab-assistant messages a day (reset at midnight, Addis Ababa time).
- **FR-21d** Students see their pass status, payment history and a renew button on their account page, plus an in-app banner when the pass is about to end.

### 5.5 Offline Access (post-MVP)
- **FR-22** Students can save an experiment guide (text and images) for offline use. Videos are optional downloads.
- **FR-23** Progress and observations made offline sync automatically on the next connection.
- **FR-24** The lab assistant needs a connection. When offline, the guide's troubleshooting section is the fallback.

## 6. Non-Functional Requirements

### 6.1 Performance & Bandwidth

Network baselines: **2G** = 400 Kbps / 400 ms RTT, **3G** = 1.6 Mbps / 300 ms RTT.

- **NFR-1** First meaningful paint ≤ 3s on 3G and ≤ 6s on 2G for an experiment guide (p50, cold cache).
- **NFR-2** Median guide page payload ≤ 200 KB, excluding video. Videos load only when the student plays them.
- **NFR-3** Lab assistant first-token latency ≤ 4s on 3G (p50), with streamed responses.

### 6.2 Reliability
- **NFR-4** PWA installable on Android Chrome, with an offline shell available after the first visit.
- **NFR-5** Traffic is individual and spread across the day, not in classroom bursts. Capacity planning assumes about 3 assistant turns per active student per day.

### 6.3 Accessibility & Localisation
- **NFR-6** WCAG 2.1 AA for colour contrast, keyboard navigation and screen-reader labels.
- **NFR-7** English at launch. Amharic and Afaan Oromo follow, rendering correctly in Ge'ez and Qubee scripts on Android 8+ system fonts.
- **NFR-8** Plain-text formulas in assistant answers (no LaTeX), for low-end devices.

### 6.4 Security & Privacy
- **NFR-9** All traffic over HTTPS. Session cookies are signed, httpOnly and secure in production. Passwords are hashed with bcrypt.
- **NFR-10** Rate limits and body-size caps on every API route; input validation on all user-supplied fields.
- **NFR-11** Compliance with Ethiopia's data protection guidelines and child-safety norms. **Because most users are minors, any third-party AI provider must allow use in services for under-18s and must not train on student prompts.**
- **NFR-12** **Chat retention:** transcripts kept ≤ 90 days, then purged. Students may opt in to extended retention (up to 12 months) and may delete transcripts at any time.

### 6.5 Scalability & Cost
- **NFR-13** Launch target is about 100 daily active students on free or near-free AI inference. The architecture must scale beyond that without re-platforming.
- **NFR-14** Per-student monthly cap on lab assistant turns (currently 50 per month), tunable as cost data accrues. Per-IP throttling protects the AI quota from abuse.
- **NFR-15** The AI provider is configurable (any OpenAI-compatible API, set by `AI_BASE_URL`, `AI_API_KEY` and `AI_MODEL`), so the provider or model can change without code changes.

### 6.6 Maintainability
- **NFR-16** Experiment content is structured data under version control, reviewable by subject experts before publication.

## 7. Content Strategy

- Source of truth: the MoE grades 9–12 Biology, Chemistry and Physics curriculum.
- Each experiment is reviewed by at least one Ethiopian subject teacher for scientific accuracy, curriculum fit and **safety for unsupervised home use** before the sample label is removed.
- Each experiment is tested with the listed local materials before publication.
- Demo videos are recorded with the same local materials the guide lists.

## 8. AI / Model Strategy

- **Hosted LLM** behind an OpenAI-compatible interface. Groq is the default; the provider is selected on quality, cost, latency from East Africa, and whether its terms allow use by minors.
- **Grounding:** the full guide for the current experiment goes into the system prompt. At this content size, no vector store is needed.
- **Guardrails:** system-role injection from the client is stripped, history length is capped, the topic is restricted, safety rules are built into the prompt, and the tone is age-appropriate.
- **Evaluation:** a weekly eval set per subject (correctness, citation accuracy, safety), with regression gates before changing model or provider.

## 9. Tech Stack (Current)

- **Frontend/backend:** Next.js (App Router), React, TypeScript, Tailwind CSS.
- **Data:** Postgres on Neon via Drizzle ORM.
- **Auth:** iron-session cookies + bcrypt.
- **AI:** any OpenAI-compatible chat completions API (Groq by default).
- **Analytics:** first-party page-view analytics in `/admin`; no third-party ad trackers.

## 10. Risks & Open Questions

| # | Risk / Question | Mitigation / Next Step |
|---|---|---|
| R1 | Students doing experiments unsupervised could get hurt | Only low-hazard experiments; adult-present reminders in the guide and the assistant; teacher safety review before publishing |
| R2 | Free AI tiers are rate-limited and models get withdrawn (e.g. Groq's Llama 3.3 70B) | Configurable provider and model; usage caps; trim prompt size; plan a paid fallback |
| R3 | AI provider terms may forbid services used by minors (e.g. the Gemini API) | Check terms before adopting any provider (NFR-11) |
| R4 | Local materials vary by region | List substitutes per material; collect student feedback on what was available |
| R5 | Video bandwidth cost for students | Load on demand; plan low-resolution and downloadable versions |
| R6 | Data privacy expectations for minors | Legal review before public launch; clear consent UX |
| Q1 | ~~Funding model~~ Decided: 300 ETB/month prepaid pass with 2 free sample guides | Revisit pricing after launch data |
| Q2 | Partnership with the MoE or regional bureaus? | Would unlock curriculum sign-off and distribution |

## 11. Milestones (Indicative)

| Phase | Scope | Exit gate |
|---|---|---|
| Pilot (done, June 2026) | Strawberry DNA extraction with Grade 11 students, guided live | Showed demand for hands-on, low-cost experiments |
| M1 — Alpha | 18 sample experiments, guides, videos, lab assistant, lab notebook; English | Internal testers complete ≥ 3 experiments each on their own; no P0 bugs |
| M2 — Beta | Teacher-reviewed content, about 100 daily students, PWA install | ≥ 50% of started experiments completed; assistant meets the §2 quality and safety targets |
| M3 — Public MVP | Amharic UI, offline guides, more experiments per grade | Privacy and legal sign-off; AI cost within budget at target scale |

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
| **MoE** | Ethiopian Ministry of Education, owner of the national curriculum framework |
| **Lab assistant** | The AI chat helper, grounded in the experiment guide the student is following |
| **Lab notebook** | A student's personal record of started and completed experiments and their observations |
| **Concept check** | Short, authored multiple-choice questions at the end of an experiment |
| **PWA** | Progressive Web App: a web app installable to the home screen, with offline support via a service worker |
| **TWA** | Trusted Web Activity: a way to publish a PWA on the Google Play Store |
| **LLM** | Large Language Model, the AI model behind the lab assistant |
| **WCAG** | Web Content Accessibility Guidelines; this product targets level AA |
| **Ge'ez script** | Writing system used for Amharic |
| **Qubee** | Latin-based alphabet used to write Afaan Oromo |
