---
title: Scientific notation
summary: Writing very big and very small numbers as a number times a power of ten, and calculating with them without losing your place.
status: ai-draft
public: false
curriculum:
  - { subject: mathematics, grade: 9, unit: "The number system: exponents and standard form" }
  - { subject: physics, grade: 9, unit: "Physical quantities and measurement" }
problems:
  - id: light-speed-written
    type: mcq
    q: "The speed of light is 3.0 × 10^8 m/s. Which number is that?"
    choices: ["3,000,000 m/s", "30,000,000 m/s", "300,000,000 m/s", "3,000,000,000 m/s"]
    answerIndex: 2
    explanation: "10^8 means move the decimal point 8 places to the right: 3 followed by eight zeros = 300,000,000 m/s."
  - id: khz-to-hz
    type: numeric
    q: "A radio station broadcasts at 954 kHz. Write this in hertz. (You can type it as 954000 or 9.54e5.)"
    answer: 954000
    tolerancePct: 1
    unit: "Hz"
    explanation: "kilo means × 10^3, so 954 kHz = 954 × 10^3 Hz = 9.54 × 10^5 Hz = 954,000 Hz."
  - id: microhenry
    type: mcq
    q: "A coil has an inductance of 240 µH. Which is the same value in henries (H)?"
    choices: ["2.4 × 10^-2 H", "2.4 × 10^-4 H", "2.4 × 10^-6 H", "2.4 × 10^2 H"]
    answerIndex: 1
    explanation: "µ (micro) means × 10^-6. 240 µH = 240 × 10^-6 H = 2.4 × 10^2 × 10^-6 H = 2.4 × 10^-4 H. Add the powers: 2 + (−6) = −4."
  - id: divide-powers
    type: numeric
    q: "Work out (3 × 10^8) ÷ (1.5 × 10^6). (This is the wavelength in metres of a 1.5 MHz radio wave.)"
    answer: 200
    tolerancePct: 1
    unit: "m"
    explanation: "Divide the numbers: 3 ÷ 1.5 = 2. Subtract the powers: 10^(8−6) = 10^2. So 2 × 10^2 = 200 m."
  - id: picofarad
    type: numeric
    q: "A capacitor is 100 pF (p = pico = × 10^-12). What is this in farads? (Type it like 1e-10.)"
    answer: 1e-10
    tolerancePct: 1
    unit: "F"
    explanation: "100 pF = 100 × 10^-12 F = 1 × 10^2 × 10^-12 F = 1 × 10^-10 F."
  - id: multiply-powers
    type: numeric
    q: "Work out (2 × 10^3) × (4 × 10^-5). Give the answer as an ordinary decimal."
    answer: 0.08
    tolerancePct: 1
    explanation: "Multiply the numbers: 2 × 4 = 8. Add the powers: 3 + (−5) = −2. So 8 × 10^-2 = 0.08."
---
## Why we need it

Radio is full of numbers that are either huge or tiny:

- Speed of light: 300,000,000 m/s
- A station's frequency: 954,000 Hz
- A capacitor in your radio: 0.0000000001 F

Writing all those zeros is slow, and one missing zero makes your answer wrong by ten times. **Scientific notation** (also called **standard form**) fixes this.

## The rule

Write the number as

$$a \times 10^{n}$$

where $a$ is between 1 and 10 (like 3.0 or 9.54) and $n$ is a whole number (positive for big, negative for small).

- $300\,000\,000 = 3.0 \times 10^{8}$ (the decimal point moved 8 places left)
- $954\,000 = 9.54 \times 10^{5}$
- $0.0004 = 4 \times 10^{-4}$ (the point moved 4 places right, so the power is negative)

A quick check: $10^{n}$ with positive $n$ is "a 1 with $n$ zeros". $10^{-n}$ is "one divided by that".

## Prefixes are powers of ten

| Prefix | Symbol | Power |
|---|---|---|
| mega | M | $10^{6}$ |
| kilo | k | $10^{3}$ |
| milli | m | $10^{-3}$ |
| micro | µ | $10^{-6}$ |
| nano | n | $10^{-9}$ |
| pico | p | $10^{-12}$ |

So $240\ \mu\text{H} = 240 \times 10^{-6}\ \text{H} = 2.4 \times 10^{-4}\ \text{H}$, and $100\ \text{pF} = 1 \times 10^{-10}\ \text{F}$.

## Calculating

**Multiplying:** multiply the front numbers, **add** the powers.

$$(2 \times 10^{3}) \times (3 \times 10^{4}) = 6 \times 10^{7}$$

**Dividing:** divide the front numbers, **subtract** the powers.

$$\frac{3 \times 10^{8}}{6 \times 10^{5}} = 0.5 \times 10^{3} = 5 \times 10^{2} = 500$$

(If the front number ends up outside 1–10, tidy it: $0.5 \times 10^{3} = 5 \times 10^{2}$.)

**Square roots:** halve the power (make it even first).

$$\sqrt{4 \times 10^{-14}} = 2 \times 10^{-7}$$

## Worked example: a radio wavelength

A station broadcasts at 600 kHz. Find its wavelength using $\lambda = c / f$.

$$\lambda = \frac{3.0 \times 10^{8}}{6.0 \times 10^{5}} = 0.5 \times 10^{3} = 500\ \text{m}$$

## On your calculator

Most calculators have an **EXP**, **EE** or **×10ˣ** key. To type $3.0 \times 10^{8}$, press `3` `EXP` `8`. For $10^{-12}$ press `EXP` then `(−)` `12`. Don't type "× 10" and then EXP, or you'll get ten times the answer. On a phone, turn it sideways for the scientific keyboard, or type `3e8`.

## Sanity check

Before you trust an answer, estimate. Does a radio wavelength of 500 m sound reasonable? A 0.005 m one wouldn't be: that's half a centimetre. Thinking about size catches most power-of-ten slips.
