---
title: Chromatography
summary: Racing colours up a strip of paper to see which dyes are hiding in a sample.
status: ai-draft
public: false
curriculum:
  - { subject: chemistry, grade: 9, unit: "Classification of matter: mixtures and separation techniques" }
  - { subject: chemistry, grade: 12, unit: "Analytical techniques" }
problems:
  - id: rf-calc
    type: numeric
    q: "A red spot moves 4.2 cm from the start line. The solvent front moves 6.0 cm from the start line. What is the Rf value?"
    answer: 0.70
    tolerancePct: 1
    explanation: "Rf = distance moved by spot ÷ distance moved by solvent = 4.2 ÷ 6.0 = 0.70. Rf has no unit, and it is always between 0 and 1."
  - id: spot-distance
    type: numeric
    q: "A food dye has Rf = 0.40 in salty water. If the solvent front travels 7.5 cm, how far from the start line should the dye spot be?"
    answer: 3.0
    tolerancePct: 2
    unit: "cm"
    explanation: "Rearrange Rf = d_spot ÷ d_solvent to get d_spot = Rf × d_solvent = 0.40 × 7.5 cm = 3.0 cm."
  - id: spot-gap
    type: numeric
    q: "A dye splits into two spots with Rf values 0.25 and 0.65. The solvent front travelled 8.0 cm. How far apart are the two spots?"
    answer: 3.2
    tolerancePct: 2
    unit: "cm"
    explanation: "Spot 1: 0.25 × 8.0 = 2.0 cm. Spot 2: 0.65 × 8.0 = 5.2 cm. Gap = 5.2 − 2.0 = 3.2 cm. Or in one step: (0.65 − 0.25) × 8.0 = 3.2 cm."
  - id: pencil-line
    type: mcq
    q: "Why do we draw the start line in pencil and not in pen?"
    choices: ["Pencil is easier to see", "Pen ink is itself a mixture of dyes and would run up the paper, mixing with our results", "Pencil makes the paper absorb faster", "It does not matter"]
    answerIndex: 1
    explanation: "Pencil 'lead' is graphite, which does not dissolve in water, so it stays put. Pen ink would dissolve and create its own coloured streaks."
  - id: above-solvent
    type: mcq
    q: "A student puts the paper in a cup with the water level ABOVE the start line. What happens?"
    choices: ["The spots run faster and separate better", "The spots dissolve straight into the water in the cup instead of travelling up the paper", "Nothing changes", "The Rf values double"]
    answerIndex: 1
    explanation: "The dye washes off into the solvent pool and the result is lost. The start line must always sit above the solvent level."
  - id: chilli-stays
    type: mcq
    q: "A water extract of genuine berbere gives only a faint orange smudge that barely leaves the start line. A suspect berbere gives a bright red spot at Rf 0.6, matching a shop red food colour. What is the best conclusion?"
    choices: ["Both are genuine", "The suspect probably contains an added water-soluble dye", "The genuine sample is the fake", "Chromatography cannot test spices"]
    answerIndex: 1
    explanation: "Chilli's natural red pigments (carotenoids like capsanthin) dissolve in oil, not water, so they barely move in a water solvent. A bright water-soluble red that runs and matches a known dye is strong evidence of added colour."
---
Many colours are secretly mixtures. A green food colour might be a blue dye plus a yellow dye. **Chromatography** ("colour writing") pulls them apart so you can see them.

## How it works

1. Draw a **start line** in pencil about 2 cm from the bottom of a strip of filter paper.
2. Put a small, concentrated **spot** of the coloured extract on the line. Let it dry, then spot again on top, three or four times.
3. Stand the strip in a cup with a little **solvent** (here: water with a pinch of salt). The solvent level must be **below** the start line.
4. The solvent creeps up the paper. When it is near the top, take the strip out and mark the **solvent front** in pencil straight away, before it dries and disappears.

## Why colours separate

Two things pull on each dye molecule:

- The moving **solvent** carries it upwards (the more soluble the dye is in the solvent, the stronger this pull).
- The **paper** holds it back (the more the dye sticks to the paper fibres, the stronger this hold).

Each dye has its own balance of these two, so each travels its own distance. A single substance gives one spot; a mixture of dyes splits into several.

A substance that does **not dissolve** in the solvent at all does not move. Chilli's natural red colours (carotenoids, mainly capsanthin) dissolve in oil, not water. So in a water solvent, genuine berbere leaves only a faint smudge near the start. Synthetic food dyes are made to dissolve in water, so they run up the paper as bright spots.

## The Rf value

Distances depend on how long you ran the paper, so we compare a ratio instead:

$$R_f = \frac{\text{distance moved by the spot}}{\text{distance moved by the solvent}}$$

Both are measured from the **start line**: to the centre of the spot, and to the solvent front.

**Worked example.** The solvent front is 6.0 cm above the start line. A red spot's centre is 4.2 cm above it.

$$R_f = \frac{4.2}{6.0} = 0.70$$

Rf has no unit and is always between 0 (did not move) and 1 (moved with the solvent). With the same paper and solvent, the same dye gives the same Rf. That lets you **match** an unknown spot to a known dye run on the same strip.

## Rearranging

If you know the Rf, you can predict where a spot will land: $d_{\text{spot}} = R_f \times d_{\text{solvent}}$. A dye with $R_f = 0.40$ and a solvent front of 7.5 cm sits at $0.40 \times 7.5 = 3.0$ cm.

## Good habits

- Run a **known dye** on the same strip as your unknowns.
- Keep spots small and the start line above the solvent.
- Faint spots? Make the extract stronger and spot more times, drying in between.
