# AI Tutorial Website for Grade 11 Ethiopian Students — Requirements

**Version:** 0.2 (Draft)
**Date:** 2026-05-18
**Owner:** TBD

---

## 1. Purpose

Build an AI-powered tutorial website that helps Grade 11 Ethiopian students master the core science curriculum (Mathematics, Physics, Chemistry, Biology) and prepare for the Ethiopian University Entrance Examination (EUEE). The product must work reliably on low-end Android phones over unreliable, low-bandwidth networks, and be accessible in English, Amharic, and Afaan Oromo.

### 1.1 Competitive Landscape & Differentiation

Existing options Ethiopian Grade 11 students use today include Khan Academy and YouTube (global, English-only, no MoE/EUEE alignment, online-only), the MoE's own digital resources (curriculum-aligned but limited interactivity, patchy availability), and regional edtech (e.g., AfroLearn, private tutoring apps — often paid, urban, English-only). This product's differentiation is the combination of: (a) MoE syllabus and EUEE blueprint alignment, (b) trilingual UX in English, Amharic, and Afaan Oromo, (c) genuine offline-first behavior on low-end Android, and (d) an AI tutor grounded in the platform's own curriculum, not generic web content.

## 2. Goals & Success Metrics

> All Year-1 targets below are **aspirational** and to be validated during M0 discovery (teacher interviews, pilot data, comparable benchmarks). Numbers should be re-baselined before M1 commitment.

| Goal | Metric | Target (Year 1) |
|---|---|---|
| Improve EUEE readiness | Avg. mock-exam score improvement per student | +15% over 3 months |
| Reach underserved learners | Monthly active students | 50,000 |
| Sustain engagement on poor networks | Median session completion rate on 2G/3G | ≥ 70% |
| Offline usability | % of sessions with ≥1 offline lesson view | ≥ 40% |
| Language inclusivity | % of users on non-English UI | ≥ 35% |
| Chatbot answer quality | Correctness on weekly subject eval set (per language) | ≥ 85% EN, ≥ 75% AM/OM |
| Chatbot grounding | Citation accuracy (cited source supports the answer) | ≥ 90% |
| Chatbot safety | Refusal rate on unsafe/off-topic prompt eval set | ≥ 98% |
| AI-generated quiz quality | Sample-audit pass rate against rubric | ≥ 90% |

## 3. Target Users

- **Primary:** Grade 11 students (ages 16–18) in Ethiopian secondary schools, public and private, urban and rural.
- **Secondary:** Subject teachers who assign practice and monitor progress; parents/guardians who track usage.
- **Device profile:** Low-end Android phones (1–2 GB RAM, Android 8+), occasionally shared within families. Some access via shared school computers.
- **Network profile:** Intermittent 2G/3G, occasional Wi-Fi; data is a meaningful cost.

## 4. Scope

### 4.1 In Scope (MVP)
- Grade 11 curriculum aligned to the Ethiopian Ministry of Education (MoE) syllabus for **Mathematics, Physics, Chemistry, Biology**.
- AI chatbot tutor for Q&A in English, Amharic, Afaan Oromo (text + voice).
- Personalized learning paths based on diagnostic + ongoing performance.
- Auto-generated quizzes with instant feedback and explanations.
- Offline-first lesson packs (downloadable, syncable).
- Mobile-first responsive web app (PWA) targeting Android.
- Lightweight teacher class codes with aggregate class dashboards (FR-24/FR-25).
- Free tier for all students.

### 4.2 Out of Scope (MVP)
- Grades other than 11 (Grade 12 is a phase-2 candidate).
- Live human tutoring / video classes.
- Native iOS/Android apps (PWA only at launch).
- Social sciences, languages, and non-core subjects.
- Paid premium tier (deferred to post-MVP).

## 5. Functional Requirements

### 5.1 Curriculum & Content
- **FR-1** Content shall be organized by Subject → Unit → Lesson → Activity, mapped to MoE Grade 11 syllabus codes.
- **FR-2** Each lesson shall include: concept explanation, worked examples, interactive practice, and a short quiz.
- **FR-3** All content shall be tagged with EUEE blueprint topic codes to enable exam-focused study.
- **FR-4** Content shall be available in English, Amharic, and Afaan Oromo. English is the canonical source; translations may be human-reviewed AI translations.

### 5.2 AI Chatbot Tutor
- **FR-5** Students can ask questions in **text** in any of the three supported languages and receive a response in the same language. **Voice** input/output is offered where ASR/TTS quality for the language meets the quality bar in NFR-8; otherwise the UI falls back to text without exposing a broken voice control.
- **FR-6** The tutor shall ground answers in the platform's curriculum content (RAG) and cite the lesson/section used.
- **FR-7** The tutor shall refuse to answer non-academic or unsafe prompts and steer students back to study topics.
- **FR-8** The tutor shall support step-by-step problem solving (Socratic mode) for Math/Physics, not just final answers.
- **FR-9** Conversation history is resumable across sessions per the tiered retention policy in NFR-12: full transcripts visible to the student for ≤ 90 days, derived mastery/skill signals retained indefinitely, optional opt-in for extended transcript retention.

### 5.3 Personalized Learning Paths
- **FR-10** New students complete a short diagnostic per subject (≤ 15 minutes) to seed a baseline skill profile.
- **FR-11** The system shall recommend the next best lesson/quiz based on mastery gaps and EUEE blueprint weight.
- **FR-12** Mastery shall be tracked per topic on a 0–100 scale and visualized to the student.
- **FR-13** Students may override recommendations and freely navigate any unit.

### 5.4 Quizzes & Assessment
- **FR-14** The system shall auto-generate practice questions (MCQ, short answer, numeric) from lesson content using AI. **QA gate:** (a) every generated batch passes automated checks (answerability, no duplicates, distractor plausibility, syllabus-topic match); (b) ≥ 10% of published items are sample-audited by a subject teacher each week against the rubric in §7, with audit pass-rate ≥ 90% as a release gate; (c) any student or teacher may flag an item, which removes it from circulation pending review and feeds back into the rubric.
- **FR-15** Every question shall include an explanation shown after the student answers.
- **FR-16** A weekly "EUEE-style" mock test shall be available per subject.
- **FR-17** Open-ended/short-answer responses shall receive AI-graded feedback with rubric scoring.

### 5.5 Offline-First Access
- **FR-18** Students may download a unit pack (lessons + offline quiz bank) for offline use; default pack size ≤ 10 MB per unit.
- **FR-19** Quiz attempts and progress made offline shall sync automatically on next connection.
- **FR-20** The chatbot may operate in a degraded "cached FAQ + offline hints" mode when offline; full LLM responses require connectivity.

### 5.6 Accounts & Onboarding
- **FR-21** Sign-up via **email + password** (default; works without SMS reach) or **phone number + SMS OTP** (where SMS delivery is reliable). Username + password is acceptable for shared-device contexts where email is unavailable. No payment required.
- **FR-22** Onboarding shall capture: language preference, region, school (optional), and subjects of interest.
- **FR-23** Students under 18 shall see a simplified privacy notice; guardian consent flow where legally required.

### 5.7 Teacher / Guardian (Lightweight)
- **FR-24** A **verified teacher** may create a class code; students join via the code to share progress dashboards. Teacher verification options: school-domain email, MoE/regional bureau invite code, or manual review for individuals. Unverified accounts are rate-limited (max 1 class, max 25 students) until verified.
- **FR-25** Teachers see **aggregate** mastery and weak topics for their class. They never see individual chat transcripts, individual quiz answers, or PII beyond first name + class join date.

## 6. Non-Functional Requirements

### 6.1 Performance & Bandwidth

Network baselines used in this section: **2G** = 400 Kbps / 400 ms RTT, **3G** = 1.6 Mbps / 300 ms RTT. Both must be tested in CI via throttled-network simulation.

- **NFR-1** First meaningful paint ≤ 3s on 3G and ≤ 6s on 2G for the lesson page (p50, cold cache).
- **NFR-2** Median lesson page payload ≤ 200 KB (text + compressed images); images served as WebP/AVIF with lazy loading.
- **NFR-3** Chatbot first-token latency ≤ 4s on 3G and ≤ 8s on 2G (p50); streaming response so partial output is visible early.

### 6.2 Offline & Reliability
- **NFR-4** PWA installable on Android Chrome with offline shell available after first visit.
- **NFR-5** Sync conflicts (e.g., quiz attempted offline on two devices) resolved with last-write-wins per attempt, never losing the higher score.

### 6.3 Accessibility & Localization
- **NFR-6** WCAG 2.1 AA compliance for color contrast, keyboard navigation, and screen-reader labels.
- **NFR-7** Full UI string coverage for English, Amharic, Afaan Oromo. Fonts and rendering tested for **Ge'ez** script (Amharic — complex shaping, larger glyphs, line-height tuning) and **Qubee** Latin script (Afaan Oromo — gemination/long vowels via double letters, diacritic edge cases). Both must render correctly on Android 8+ default system fonts and on the bundled web font fallback.
- **NFR-8** Voice input/output shall support Amharic and Afaan Oromo where ASR word-error-rate ≤ 25% and TTS MOS ≥ 3.5 on internal eval sets; otherwise the voice control is hidden and the UI falls back to text gracefully.
- **NFR-8a** **Inclusive accessibility (beyond WCAG):** low-literacy onboarding (icon-led, voice-narrated first run); large-tap-target mode for shared-device use; captioned audio for hearing-impaired learners; voice-first navigation path for low-vision learners where voice support is available.

### 6.4 Security & Privacy
- **NFR-9** All traffic over HTTPS; auth tokens stored in secure storage.
- **NFR-10** Student PII (name, phone, school) encrypted at rest; access restricted by role.
- **NFR-11** Compliance with Ethiopia's data protection guidelines and applicable child-safety norms; data residency preference for African region.
- **NFR-12** **Tiered chat retention:** (a) full prompt/response transcripts retained ≤ 90 days for the student and for quality review, then purged; (b) derived signals (topic mastery, error patterns, language preference) retained for the life of the account to power personalization; (c) students may opt in to extended transcript retention (up to 12 months) and may delete transcripts at any time.

### 6.5 Scalability & Cost
- **NFR-13** Architecture shall scale to 200,000 MAU within 12 months without re-platforming.
- **NFR-14** AI inference cost target ≤ USD 0.05 per active student per month, enforced by the following per-student **monthly usage caps** on the free tier:
  - Chatbot: ≤ 50 turns/month (soft cap with friendly throttle, not a hard block).
  - AI-graded short-answer responses: ≤ 30/month.
  - Auto-generated practice question batches: ≤ 20/month (cached generations shared across students do not count).
  - Voice ASR minutes: ≤ 15 min/month where available.
  Caching, small-model routing, and shared RAG retrieval are required to hit the target; caps are tunable per region as cost data accrues.

### 6.6 Maintainability
- **NFR-15** Curriculum content authored in Markdown + structured metadata, version-controlled, reviewable by subject experts before publish.
- **NFR-16** Feature flags for staged rollout per region/language.

## 7. Content & Curriculum Strategy

- Source-of-truth syllabus: latest MoE Grade 11 curriculum framework for Mathematics, Physics, Chemistry, Biology.
- EUEE blueprint mapping reviewed annually after exam release.
- Each lesson reviewed by at least one Ethiopian subject teacher before publication.
- Translation workflow: AI draft → human review by native-speaker reviewer → publish.

## 8. AI / Model Strategy

- **Hosted LLMs** for chatbot and content generation; selection based on quality, cost, and latency from East Africa.
- **Retrieval-Augmented Generation (RAG)** over the platform's own curriculum corpus to keep answers grounded and on-syllabus.
- **Guardrails:** prompt-injection defenses, profanity/abuse filters, refusal patterns for non-academic and unsafe topics, age-appropriate tone.
- **Evaluation:** weekly offline eval set per subject (correctness, citation accuracy, language quality) with regression gates before model upgrades.

## 9. Tech Stack (Non-Binding Proposal, Subject to Architecture Review)

> The choices below are starting points for discussion in M0, not commitments. They will be revisited and confirmed (or replaced) during the architecture review at the end of discovery. Vendor- or framework-specific decisions should not be propagated into other planning docs until that review concludes.


- **Frontend:** Progressive Web App (React or SvelteKit), service worker for offline caching, IndexedDB for local data.
- **Backend:** API in Node.js or Python (FastAPI); Postgres for relational data; object storage for media.
- **AI layer:** Vector store for RAG; LLM provider abstraction so model choice can change without app changes.
- **Hosting:** Cloud region nearest to Ethiopia (e.g., Europe or Middle East) with CDN edge in Africa.
- **Analytics:** Privacy-respecting product analytics; no third-party ad trackers.

## 10. Risks & Open Questions

| # | Risk / Question | Mitigation / Next Step |
|---|---|---|
| R1 | LLM quality in Amharic / Afaan Oromo may be uneven | Benchmark candidate models; build language-specific eval sets |
| R2 | EUEE blueprint changes year to year | Annual content review cycle owned by curriculum lead |
| R3 | Offline storage limits on low-end devices | Tunable pack size; eviction policy for old units |
| R4 | AI cost overruns at scale | Aggressive caching, small-model routing, usage caps per free user |
| R5 | Data privacy expectations for minors | Legal review before launch; clear consent UX |
| R6 | Regional connectivity disruptions / internet shutdowns in parts of Ethiopia | Offline-first design is partial mitigation; monitor regional availability; cache larger content windows for at-risk regions; avoid hard dependencies on real-time chatbot for core study flows |
| R7 | Geographic content access constraints (e.g., region-specific MoE syllabus variations) | Curriculum lead maintains regional variant mapping; content tagged by region where divergence exists |
| Q1 | Funding model (grant, school license, freemium)? | **Decide before M1 commitment** — determines whether free-only MVP is sustainable. Owner: product/exec |
| Q2 | Partnership with MoE or regional bureaus? | Explore early; would unlock distribution |
| Q3 | Hardware partnerships (preloaded tablets)? | Out of MVP, revisit in phase 2 |

## 11. Milestones (Indicative)

| Phase | Scope | Target | Exit gate |
|---|---|---|---|
| M0 — Discovery | Curriculum mapping, teacher interviews, model benchmarks per language, **funding-model decision (Q1)** | Month 1–2 | Signed-off curriculum map; chatbot eval baselines per language meeting §2 quality targets within 10 pts; funding model chosen |
| M1 — Alpha | Math only, English UI, online-only chatbot, internal testers | Month 3–4 | ≥ 20 internal testers complete ≥ 3 lessons each; chatbot correctness ≥ 80% on Math eval; no P0 bugs |
| M2 — Beta | All 4 sciences, English + Amharic, offline packs, 500-student pilot | Month 5–7 | ≥ 60% 4-week retention in pilot; +10% mock-exam score lift in pilot cohort; offline sync conflict rate < 1%; pilot teacher NPS ≥ 30 |
| M3 — Public MVP | + Afaan Oromo, teacher class codes, EUEE mock tests | Month 8–9 | Quality + safety metrics in §2 met for all 3 languages; AI cost ≤ USD 0.05/MAU on beta data; privacy/legal sign-off |
| M4 — Scale | Performance + cost hardening, partnerships, growth | Month 10–12 | 50K MAU; p50 page load ≤ 3s on 3G in production; unit economics within target |

## 12. Approval

| Role | Name | Status |
|---|---|---|
| Product owner | TBD | ☐ |
| Curriculum lead | TBD | ☐ |
| Engineering lead | TBD | ☐ |
| Privacy / legal | TBD | ☐ |

## 13. Glossary

| Term | Meaning |
|---|---|
| **MoE** | Ethiopian Ministry of Education — owner of the national Grade 11 curriculum framework |
| **EUEE** | Ethiopian University Entrance Examination — national exam Grade 12 students take for university placement; Grade 11 students study toward it |
| **PWA** | Progressive Web App — a web app installable to the device home screen with offline support via a service worker |
| **RAG** | Retrieval-Augmented Generation — pattern of grounding LLM answers in retrieved documents (here, the platform's own curriculum) instead of pure model knowledge |
| **LLM** | Large Language Model — the AI model powering the chatbot and content generation |
| **ASR** | Automatic Speech Recognition — converting spoken audio to text (for voice input) |
| **TTS** | Text-to-Speech — synthesizing spoken audio from text (for voice output) |
| **MOS** | Mean Opinion Score — 1–5 human-rated quality score for TTS audio |
| **WER** | Word Error Rate — % of words ASR transcribes incorrectly |
| **OTP** | One-Time Password — short code sent via SMS/email for authentication |
| **WCAG** | Web Content Accessibility Guidelines — international accessibility standard; this product targets level AA |
| **MAU** | Monthly Active Users |
| **Ge'ez script** | Writing system used for Amharic (and several other Ethiopian languages) |
| **Qubee** | Latin-based alphabet used to write Afaan Oromo |
| **Afaan Oromo** | Oromo language — most widely spoken first language in Ethiopia |
| **Class code** | Short alphanumeric code a verified teacher generates so students can join a class for aggregate progress visibility |
