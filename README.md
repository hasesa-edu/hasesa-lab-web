# Hasesa — Demo

An AI tutor demo for Grade 11 Ethiopian students.

This is a **demo shell** of the MVP — most screens described in the requirements exist with working interactions, but content is sample-only and there is no real backend.

## What's in this demo

- **Landing** — mission, differentiation, value props
- **Lessons** — sample content for all 4 subjects (Math, Physics, Chemistry, Biology), filterable, with MoE codes and EUEE topic tags
- **Lesson detail** — sections, worked example, in-lesson quiz, AI-generated practice questions on demand
- **AI Tutor** — Groq (Llama 3.3 70B), grounded in lesson context with citation, refuses off-topic
- **Trilingual UI** — English, Amharic, Afaan Oromo for all UI strings; lesson bodies in English
- **Accounts** — sign up as student or teacher, username + password (demo: stored in browser only)
- **Onboarding** — pick subjects, optional under-18 privacy notice, short diagnostic quiz
- **Student dashboard** — recommended next lessons (weighted by mastery gap × EUEE weight), per-topic mastery bars
- **Mock test** — EUEE-style mock per subject, scored with per-topic breakdown
- **Teacher dashboard** — create class codes, see aggregate (never individual) mastery + weakest topics
- **Class codes** — students join via code, contribute to class aggregate
- **PWA** — installable manifest, service worker (network-first HTML, cache-first static)

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v3
- Groq API (Llama 3.3 70B) — free tier, OpenAI-compatible
- All state in localStorage — there is no server-side persistence

## Local development

```bash
npm install
cp .env.example .env.local
# add your GROQ_API_KEY to .env.local (free key at https://console.groq.com)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

1. Push to GitHub.
2. Import the repo on [vercel.com/new](https://vercel.com/new).
3. Add env var `GROQ_API_KEY` in project settings.
4. Deploy.

## What's intentionally NOT in this demo (still spec, not built)

These pieces from `REQUIREMENTS.md` would all be in a real MVP but are out of scope for a one-session build:

- **Real curriculum content** — every lesson here is a sample. A real MVP needs the Grade 11 MoE syllabus reviewed and authored by Ethiopian subject teachers.
- **Real translations** — lesson *bodies* are English-only. AM/OM only cover UI strings.
- **Real backend** — no Postgres, no server-side auth, no password hashing. Accounts live in `localStorage`.
- **Email / SMS auth** — only the username + password flow exists.
- **Voice (ASR/TTS)** — not built. Spec gates this on per-language quality (NFR-8).
- **True RAG** — the chatbot grounds in one in-memory lesson at a time, not a vector-store-backed corpus search.
- **Conversation persistence** with tiered retention (NFR-12).
- **Compliance** — no WCAG audit, no privacy/legal review, no AI cost caps enforced per user (NFR-14).
- **Performance gates** — no CI-throttled-network testing.
- **Item flagging** for AI-generated questions, full QA gate from FR-14.

See `REQUIREMENTS.md` for the full product spec.
