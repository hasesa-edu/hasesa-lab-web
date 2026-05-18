# AI-Edu Ethiopia — Demo

An AI tutor demo for Grade 11 Ethiopian students. Built from `REQUIREMENTS.md` v0.2.

This is a **slice demo**, not the full MVP. It ships:

- Landing page with mission & differentiation
- Lesson browser with 4 sample Grade 11 Physics lessons (Mechanics unit)
- AI chat tutor grounded in lesson content, with citation
- Trilingual UI shell (English, Amharic, Afaan Oromo)

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS v3
- Groq API (Llama 3.3 70B) — free tier, OpenAI-compatible

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

## What's intentionally out of scope for this demo

- The other three subjects (Math/Chemistry/Biology) — only Physics has sample content.
- Offline PWA service worker, mastery tracking, quiz auto-generation, teacher dashboards, voice I/O, accounts.
- Full Amharic/Afaan Oromo lesson body translations (top-level strings are translated; lesson body kept English-only).
- Production RAG over a curriculum corpus — the chatbot only grounds in the in-memory lesson it's viewing.

See `REQUIREMENTS.md` for the full product spec.
