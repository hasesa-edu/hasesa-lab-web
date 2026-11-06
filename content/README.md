# Hasesa course content

Everything students and guides read lives here as Markdown files with a YAML header ("frontmatter"). Subject experts can edit these files directly. The app checks every file when it builds, so a typo in a header stops the build with a message naming the file and field.

```
content/
  concepts/<id>.md                 shared concept units (theory + problems)
  modules/<id>/module.md           the module: hook, goal, materials, safety, sign-off checklist
  modules/<id>/steps/NN-<id>.md    one file per step, in order (NN = 01, 02, …)
  modules/<id>/guide.md            the guide's version (only guides can see it)
```

File and folder names are the IDs, written as lowercase words joined by hyphens: `waves-and-vibrations.md`, `steps/03-antenna.md`. Don't rename a file once students have used it, because their progress is stored against the ID.

## The idea

A module starts from **doing**: a mystery to solve or a thing to build. Theory comes in when the project needs it. Each step lists the concept units it relies on. Concept units are **shared**: "Current & voltage" is written once and used by Radio and by Mind over Machine. Students can **test out** of a unit they already know by scoring at least 80%.

## `status`

Every module and concept has one:

- `ai-draft`: written with AI, not yet checked. Everything starts here.
- `expert-reviewed`: a subject expert has checked the science and safety.
- `classroom-tested`: used with real students at the Academy and revised.

## Concept unit: `concepts/<id>.md`

```yaml
---
title: Frequency and period
summary: How often something repeats, and how long one repeat takes.
status: ai-draft
public: false              # true = anyone can open it as a free sample
curriculum:                # where this shows up in the national curriculum
  - { subject: physics, grade: 10, unit: "Waves and sound" }
problems:
  - id: hz-meaning
    type: mcq
    q: "A swing goes back and forth 2 times every second. What is its frequency?"
    choices: ["0.5 Hz", "2 Hz", "4 Hz"]
    answerIndex: 1         # counts from 0, so this is "2 Hz"
    explanation: "Frequency is repeats per second: 2 per second = 2 Hz."
  - id: period-calc
    type: numeric
    q: "A station broadcasts at 1,000,000 Hz. What is the period in microseconds?"
    answer: 1
    tolerancePct: 2        # how far off (in %) still counts as right
    unit: "µs"
    explanation: "T = 1/f = 1/1,000,000 s = 0.000001 s = 1 µs."
---
The theory, in Markdown. Use $...$ for maths, e.g. $T = \frac{1}{f}$.
```

`subject` is one of `physics`, `chemistry`, `biology`, `mathematics`, `technology`. Students can type numeric answers as `1500`, `1,500`, `1.5e3` or `1.5 x 10^3`.

## Module: `modules/<id>/module.md`

```yaml
---
title: Radio
tagline: Build a radio that needs no battery
disciplines: [physics, mathematics]
hook: "The guide's radio is playing… but there's no battery. Where is the energy coming from?"
goal: "Build a working crystal radio, tune in a station, and explain every part."
whatYouBuild: "A crystal radio: coil, antenna, diode and earpiece on a wooden board."
hours: 10
trailer: { youtubeId: "abc123" }       # optional
status: ai-draft
publicSample: waves-and-vibrations     # a concept with public: true
materials:
  - { item: "Enamelled copper wire, 0.3–0.5 mm, 30 m", note: "Electronics shops in Merkato" }
safety:
  - "Never connect any part of the radio to mains power."
signoff:                                # what the guide checks before the certificate
  - { id: receives, text: "The radio receives at least one station clearly." }
---
Overview of the module in Markdown.
```

## Step: `modules/<id>/steps/NN-<id>.md`

```yaml
---
title: Make waves
kind: investigate          # hook | investigate | build | finish
minutes: 75
units: [waves-and-vibrations, frequency-and-period]
video: { youtubeId: "abc123" }   # optional
---
What students do, what to notice, and the question it leaves them with.
```

## Guide's version: `modules/<id>/guide.md`

Plain Markdown, no header. It covers preparation, timing, the answer key and expected results, where students get stuck, questions to ask, the safety briefing, and how to judge each sign-off item.
