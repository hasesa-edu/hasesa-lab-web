---
title: Frequency and period
summary: How often something repeats (frequency) and how long one repeat takes (period). Each is one divided by the other.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 9, unit: "Waves and sound" }
  - { subject: physics, grade: 11, unit: "Oscillations and simple harmonic motion" }
problems:
  - id: hz-meaning
    type: mcq
    q: "A swing goes back and forth 2 times every second. What is its frequency?"
    choices: ["0.5 Hz", "2 Hz", "4 Hz", "120 Hz"]
    answerIndex: 1
    explanation: "Frequency is repeats per second: 2 per second = 2 Hz. (The period would be 0.5 s.)"
  - id: count-to-period
    type: numeric
    q: "You count 30 waves passing a mark in 10 seconds. What is the period of one wave, in seconds?"
    answer: 0.333
    tolerancePct: 2
    unit: "s"
    explanation: "Frequency f = 30 ÷ 10 = 3 Hz. Period T = 1 ÷ f = 1 ÷ 3 ≈ 0.333 s. Or directly: 10 s shared between 30 waves = 0.333 s each."
  - id: mains-50
    type: mcq
    q: "The mains electricity in Ethiopia changes direction in a cycle that repeats every 0.02 s. What is its frequency?"
    choices: ["0.02 Hz", "2 Hz", "50 Hz", "200 Hz"]
    answerIndex: 2
    explanation: "f = 1 ÷ T = 1 ÷ 0.02 s = 50 Hz. Ethiopia, like most of Africa and Europe, uses 50 Hz mains."
  - id: heartbeat
    type: numeric
    q: "A resting heart beats 72 times per minute. What is its frequency in hertz?"
    answer: 1.2
    tolerancePct: 2
    unit: "Hz"
    explanation: "Hertz means per second, so first change minutes to seconds: 72 beats ÷ 60 s = 1.2 Hz."
  - id: station-period
    type: numeric
    q: "A medium-wave radio station broadcasts at 954 kHz. What is the period of its wave, in microseconds (µs)?"
    answer: 1.048
    tolerancePct: 2
    unit: "µs"
    explanation: "954 kHz = 954,000 Hz. T = 1 ÷ 954,000 = 0.000001048 s = 1.048 µs (1 µs = one millionth of a second)."
---
## Things that repeat

A lot of nature repeats: a swing, a heartbeat, a guitar string, the up-and-down of a water ripple, the electrons sloshing in a radio antenna. Two numbers describe *how fast* something repeats.

- **Frequency** ($f$): how many complete repeats (called **cycles** or **oscillations**) happen **each second**. Unit: **hertz** (Hz). 1 Hz = 1 cycle per second.
- **Period** ($T$): how long **one** complete cycle takes. Unit: seconds (s).

## They are opposites

If a swing does 4 cycles every second, each cycle must take a quarter of a second. So:

$$T = \frac{1}{f} \qquad \text{and} \qquad f = \frac{1}{T}$$

High frequency means short period, and the other way round.

## Measuring them in the lab

Timing one cycle is hard: it is often too quick. Instead, **count many cycles and time them all**, then divide.

$$f = \frac{\text{number of cycles}}{\text{time taken}}$$

**Worked example.** A pendulum makes 20 swings (there and back) in 16 seconds.

- $f = 20 \div 16 = 1.25$ Hz
- $T = 16 \div 20 = 0.8$ s (check: $1 \div 1.25 = 0.8$ ✓)

Counting over a longer time makes the answer more accurate, because your reaction-time error (pressing the stopwatch a bit late) is shared over many cycles.

## Big frequencies and their prefixes

Radio uses huge frequencies, so we use prefixes:

| Prefix | Symbol | Means |
|---|---|---|
| kilo | k | $\times 1000$ |
| mega | M | $\times 1\,000\,000$ |
| milli | m | $\div 1000$ |
| micro | µ | $\div 1\,000\,000$ |

A medium-wave (AM) station might broadcast at 900 kHz = 900,000 Hz. Its electrons go back and forth nine hundred thousand times every second!

**Worked example.** Find the period of a 900 kHz station.

$$T = \frac{1}{900\,000\ \text{Hz}} = 0.00000111\ \text{s} \approx 1.11\ \mu\text{s}$$

## Watch the units

Hertz always means "per **second**". If you are given "per minute", divide by 60 first. If you are given kHz or MHz, change to Hz before using $T = 1/f$, or you'll be off by a factor of a thousand or a million.

## Sound and frequency

For sound, frequency is what your ear hears as **pitch**. Humans hear roughly 20 Hz (a deep rumble) to 20,000 Hz (a thin whistle). A radio station's frequency (hundreds of thousands of Hz) is far too high to hear, which is why a radio has to do some clever work to turn it back into sound.
