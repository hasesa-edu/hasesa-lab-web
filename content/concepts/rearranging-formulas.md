---
title: Rearranging formulas
summary: Making any letter the subject of a formula by doing the same thing to both sides, so one formula answers many questions.
status: ai-draft
public: false
curriculum:
  - { subject: mathematics, grade: 9, unit: "Solving equations" }
  - { subject: mathematics, grade: 10, unit: "Algebraic expressions and formulas" }
problems:
  - id: lambda-subject
    type: mcq
    q: "The wave equation is v = fλ. Which of these makes λ the subject?"
    choices: ["λ = v × f", "λ = v ÷ f", "λ = f ÷ v", "λ = v − f"]
    answerIndex: 1
    explanation: "λ is being multiplied by f. Undo that by dividing both sides by f: v ÷ f = λ."
  - id: oil-volume
    type: numeric
    q: "Cooking oil has a density of 0.92 g/cm³. A sample has a mass of 46 g. Using ρ = m/V, what is its volume, in cm³?"
    answer: 50
    tolerancePct: 2
    unit: "cm³"
    explanation: "Multiply both sides of ρ = m/V by V: ρV = m. Divide by ρ: V = m/ρ = 46 ÷ 0.92 = 50 cm³."
  - id: drop-height
    type: numeric
    q: "The time for a ball to fall from rest is t = √(2d/g). A ball takes 0.5 s to fall. Taking g = 9.8 m/s², how far did it fall, in metres?"
    answer: 1.225
    tolerancePct: 2
    unit: "m"
    explanation: "Square both sides: t² = 2d/g. Multiply by g: g t² = 2d. Divide by 2: d = g t²/2 = 9.8 × 0.25 ÷ 2 = 1.225 m."
  - id: ohm-current
    type: numeric
    q: "Ohm's law is V = IR. A 5 V supply is connected across a 220 Ω resistor. What current flows, in milliamps (mA)?"
    answer: 22.7
    tolerancePct: 2
    unit: "mA"
    explanation: "Divide both sides by R: I = V/R = 5 ÷ 220 = 0.0227 A. Multiply by 1000 to get mA: 22.7 mA."
  - id: lc-for-c
    type: mcq
    q: "A radio tunes to f = 1/(2π√(LC)). Which formula gives C?"
    choices: ["C = 2π f L", "C = 1/(2π f L)", "C = 1/(4π² f² L)", "C = 4π² f² L"]
    answerIndex: 2
    explanation: "Multiply both sides by √(LC) and divide by f: √(LC) = 1/(2πf). Square both sides: LC = 1/(4π²f²). Divide by L: C = 1/(4π²f²L)."
  - id: milk-mass
    type: numeric
    q: "Pure milk has a density of about 1.03 g/cm³. What mass should 200 cm³ of pure milk have, in grams?"
    answer: 206
    tolerancePct: 1
    unit: "g"
    explanation: "From ρ = m/V, multiply both sides by V: m = ρV = 1.03 × 200 = 206 g. If a sample is noticeably lighter, someone may have added water."
---
## One formula, many questions

A formula like $v = f\lambda$ is written to give you $v$. But in a lab you often know $v$ and $f$ and need $\lambda$. You don't need a new formula: you **rearrange** the one you have.

The letter on its own on one side is called the **subject**. Rearranging means changing which letter is the subject.

## The golden rule

An equation is a balance. **Whatever you do to one side, do to the other**, and it stays true. To get a letter alone, undo whatever is being done to it, using the opposite operation:

| If the letter is… | undo it by… |
|---|---|
| added to | subtracting |
| multiplied by | dividing |
| divided by | multiplying |
| squared | square-rooting |
| square-rooted | squaring |

Undo in **reverse order**: the last thing done to the letter is the first thing you undo, like taking off shoes before socks.

## Example 1: waves, $v = f\lambda$

Find $\lambda$. It is multiplied by $f$, so divide both sides by $f$:

$$\frac{v}{f} = \lambda \quad\Rightarrow\quad \lambda = \frac{v}{f}$$

## Example 2: density, $\rho = \dfrac{m}{V}$

Find $V$. $V$ is on the bottom, so first multiply both sides by $V$:

$$\rho V = m$$

Now divide both sides by $\rho$:

$$V = \frac{m}{\rho}$$

**Check with numbers.** Honey has $\rho = 1.4$ g/cm³. A jar holds 700 g. Then $V = 700 \div 1.4 = 500$ cm³.

## Example 3: a falling object, $t = \sqrt{\dfrac{2d}{g}}$

Find $d$. The last thing done was the square root, so undo it first by squaring:

$$t^2 = \frac{2d}{g}$$

Multiply by $g$, then divide by 2:

$$d = \frac{g t^2}{2}$$

## Example 4: Ohm's law, $V = IR$

Find $I$: divide by $R$, so $I = \dfrac{V}{R}$. Find $R$: divide by $I$, so $R = \dfrac{V}{I}$.

## The triangle trick (and its limits)

For formulas of the form $A = B \times C$, some people draw a triangle with $A$ on top and $B$, $C$ below. Cover the one you want and read off the rest. It works for $v = f\lambda$, $\rho = m/V$ and $V = IR$, but **not** for formulas with squares, roots or $2\pi$. Learn the golden rule; it always works.

## Rearrange first, then put numbers in

It's tempting to put numbers in straight away. Rearranging with letters first is cleaner: you can check the result makes sense ("bigger mass should give bigger volume? yes, $V = m/\rho$ ✓"), and you can reuse it for every measurement in your table.

## Check your answer

Put your answer back into the **original** formula. If $\lambda = 0.8$ m and $f = 3$ Hz, then $f\lambda = 2.4$ m/s. If that matches the $v$ you started with, you're right.
