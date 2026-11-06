---
title: Resonance and tuning
summary: Everything that can vibrate has a natural frequency, and small pushes at that frequency build a big response. A coil and a capacitor together resonate at f = 1/(2π√(LC)), which is how a radio picks one station.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 11, unit: "Oscillations and simple harmonic motion" }
  - { subject: physics, grade: 12, unit: "Alternating current circuits" }
problems:
  - id: swing-push
    type: mcq
    q: "You push a child on a swing. When do small pushes make the swing go highest?"
    choices: ["When you push as fast as you can", "When you push at the swing's own natural rate, once per swing", "When you push at random times", "Only when you push very hard"]
    answerIndex: 1
    explanation: "Pushing in time with the natural frequency adds energy on every swing, so the amplitude builds up. That is resonance. Push at the wrong rate and your pushes work against the swing half the time."
  - id: lc-basic
    type: numeric
    q: "A tuning coil of L = 240 µH is connected to a capacitor set to C = 100 pF. What frequency does the circuit resonate at, in kHz?"
    answer: 1027
    tolerancePct: 2
    unit: "kHz"
    explanation: "LC = 240 × 10^-6 × 100 × 10^-12 = 2.4 × 10^-14. √(LC) = 1.549 × 10^-7. f = 1 ÷ (2π × 1.549 × 10^-7) = 1.027 × 10^6 Hz ≈ 1027 kHz."
  - id: lc-max-c
    type: numeric
    q: "The same 240 µH coil is used, and the variable capacitor is turned to its maximum, 365 pF. What is the resonant frequency now, in kHz?"
    answer: 538
    tolerancePct: 2
    unit: "kHz"
    explanation: "LC = 240 × 10^-6 × 365 × 10^-12 = 8.76 × 10^-14. √(LC) = 2.960 × 10^-7. f = 1 ÷ (2π × 2.960 × 10^-7) ≈ 538 kHz, near the bottom of the medium-wave band."
  - id: more-c
    type: mcq
    q: "You turn the variable capacitor so its plates overlap more (more capacitance). What happens to the station you are tuned to?"
    choices: ["You tune to a higher frequency", "You tune to a lower frequency", "Nothing changes, only the coil matters", "The station gets louder but stays the same"]
    answerIndex: 1
    explanation: "f = 1/(2π√(LC)): C is on the bottom, so bigger C gives smaller f. More turns of coil (bigger L) also lowers the frequency."
  - id: choose-c
    type: numeric
    q: "You want to tune to a station on 1000 kHz with a 250 µH coil. What capacitance do you need, in pF?"
    answer: 101
    tolerancePct: 2
    unit: "pF"
    explanation: "Rearranged: C = 1/(4π² f² L) = 1 ÷ (39.48 × (1.0 × 10^6)² × 250 × 10^-6) = 1.013 × 10^-10 F ≈ 101 pF."
  - id: c-range-ratio
    type: numeric
    q: "A variable capacitor goes from 30 pF to 365 pF. With a fixed coil, the highest frequency it can tune is how many times the lowest? (Hint: f depends on 1/√C.)"
    answer: 3.49
    tolerancePct: 2
    explanation: "f_high ÷ f_low = √(C_max ÷ C_min) = √(365 ÷ 30) = √12.17 ≈ 3.49. That's enough to cover 530–1700 kHz (a ratio of about 3.2) if the coil is chosen well."
---
## Everything has a natural frequency

Pluck a krar string, tap a glass, push a swing: each vibrates at its own **natural frequency**. Now push it with a small force **in time** with that frequency. Every push adds a little energy at just the right moment, and the vibration grows bigger and bigger. This is **resonance**.

Push at the wrong frequency and some of your pushes fight the motion, so little builds up. A resonating system **responds hugely to one frequency and hardly at all to others**. That's exactly what a radio needs: dozens of stations hit your antenna at once, and you want to hear only one.

## The electric swing: coil + capacitor

- A **capacitor** is two metal plates separated by an insulator (air, in a variable capacitor). It stores energy as **charge**, in an electric field. Its size is the **capacitance** $C$, measured in farads (F). Radio capacitors are tiny: tens to hundreds of **picofarads** (1 pF = $10^{-12}$ F).
- A **coil** (inductor) stores energy in a **magnetic field** when current flows through it, and it resists sudden changes in current. Its size is the **inductance** $L$, measured in henries (H). Radio coils are hundreds of **microhenries** (1 µH = $10^{-6}$ H).

Connect them together and charge sloshes back and forth: the capacitor empties through the coil, the coil's magnetic field keeps the current going and charges the capacitor the other way, and so on. Energy swaps between electric and magnetic, like a swing swapping height for speed. The natural frequency is

$$f = \frac{1}{2\pi\sqrt{LC}}$$

## Worked example

$L = 240\ \mu\text{H}$ and $C = 100\ \text{pF}$:

$$LC = (2.4\times10^{-4})(1.0\times10^{-10}) = 2.4\times10^{-14}$$

$$\sqrt{LC} = 1.55\times10^{-7}\ \text{s}$$

$$f = \frac{1}{2\pi \times 1.55\times10^{-7}} \approx 1.03\times10^{6}\ \text{Hz} = 1030\ \text{kHz}$$

Right in the middle of the medium-wave band.

**Tip:** do it in stages (multiply, square-root, times $2\pi$, then 1 divided by) and write each stage down. Calculator slips with powers of ten are the most common error.

## How tuning works

The formula shows two ways to change the station:

- **Bigger $C$ or bigger $L$ → lower frequency.**
- **Smaller $C$ or smaller $L$ → higher frequency.**

Turning a variable capacitor changes how much its plates overlap, so it changes $C$. Moving a slider (or a clip on a tap) along your coil changes how many turns are used, so it changes $L$.

Since $f$ depends on $\sqrt{C}$, making $C$ **four** times bigger only **halves** $f$.

## Designing your coil

A useful formula for a single-layer coil (Wheeler's formula) gives the inductance in µH, with diameter $d$ and length $l$ in centimetres and $N$ turns:

$$L \approx \frac{d^2 N^2}{45.7\,d + 101.6\,l}$$

**Example:** 80 turns of 0.4 mm wire on a 5 cm tube make a coil about 3.6 cm long:

$$L \approx \frac{25 \times 6400}{228.5 + 365.8} \approx 270\ \mu\text{H}$$

With a 30–365 pF capacitor, this tunes from about 510 kHz to 1770 kHz: the whole band. (In practice the antenna adds some capacitance, so the real numbers are a bit lower.)

## Why the radio gets louder at the right spot

At resonance, the tuned circuit lets the station's signal build up into a strong oscillation while signals at other frequencies are mostly passed to ground. Turn slowly through the band and stations rise out of the silence, peak, and fade as you pass them.
