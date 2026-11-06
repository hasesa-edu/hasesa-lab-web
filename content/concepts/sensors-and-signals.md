---
title: Sensors and signals
summary: How a sensor turns something in the world into a voltage, how tiny signals are amplified, and how a microcontroller turns a voltage into a number.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 11, unit: "Electronics: sensors and amplifiers" }
  - { subject: technology, grade: 11, unit: "Data acquisition and input devices" }
problems:
  - id: emg-measures
    type: mcq
    q: "What does an EMG muscle sensor actually measure?"
    choices: ["How hard the muscle is pressing on the skin", "Tiny voltages on the skin produced by muscle fibres firing", "Your thoughts, directly from the brain", "The temperature of the muscle"]
    answerIndex: 1
    explanation: "EMG = electromyography. Active muscle fibres produce electrical spikes, and a small part of that voltage (microvolts to a few millivolts) reaches the skin. The sensor amplifies it. It measures electrical activity, which goes up with effort — not force or thoughts directly."
  - id: amplifier-gain
    type: numeric
    q: "The voltage on your skin from a clench is 0.5 mV. The EMG module's amplifier has a gain of 2000. What is the output voltage, in volts?"
    answer: 1
    tolerancePct: 2
    unit: "V"
    explanation: "Output = gain × input = 2000 × 0.5 mV = 1000 mV = 1.0 V. Gain is just a multiplier: 'how many times bigger'."
  - id: adc-reading
    type: numeric
    q: "An Arduino Uno's analogRead() turns 0–5 V into a whole number from 0 to 1023. Roughly what number does it give for 2.0 V? (Give the nearest whole number.)"
    answer: 409
    tolerancePct: 1
    explanation: "Reading = (voltage ÷ 5 V) × 1023 = (2.0 ÷ 5) × 1023 = 0.4 × 1023 = 409.2, so the Arduino reports 409."
  - id: reading-to-volts
    type: numeric
    q: "The Serial Plotter shows a value of 614 while you clench. What voltage (in V) is on pin A0?"
    answer: 3.0
    tolerancePct: 2
    unit: "V"
    explanation: "Voltage = reading × 5 V ÷ 1023 = 614 × 5 ÷ 1023 ≈ 3.0 V. Turning a number back into volts helps you check your sensor never goes near the 5 V limit."
  - id: reference-electrode
    type: mcq
    q: "Why is the third (reference) electrode placed on a bony spot such as the elbow, away from the muscle?"
    choices: ["Bone conducts electricity better than muscle", "It gives a 'quiet' point to compare against, so the amplifier can cancel noise that appears everywhere on the body", "It powers the sensor", "It stops the muscle from moving"]
    answerIndex: 1
    explanation: "The two muscle electrodes are compared with each other (a differential measurement). The reference gives the amplifier a baseline. Noise picked up equally by the whole body — like hum from nearby mains wiring — gets cancelled; only the difference from the muscle is amplified."
  - id: samples-per-second
    type: numeric
    q: "A sketch reads the sensor and then waits with delay(10), over and over. Ignoring the tiny time analogRead takes, about how many readings does it make per second?"
    answer: 100
    tolerancePct: 5
    unit: "readings/s"
    explanation: "Each loop takes about 10 ms = 0.010 s. Readings per second = 1 ÷ 0.010 = 100. This is called the sampling rate: 100 samples per second, or 100 Hz."
---
## What is a sensor?

A **sensor** turns something in the world — light, temperature, pressure, muscle activity — into an **electrical signal**, usually a changing **voltage**. Your eyes and skin are sensors too: they turn light and touch into nerve signals. Electronic sensors do the same job for a machine.

A **signal** is any quantity that changes over time and carries information. Plot it against time and you get a graph — like the wiggly line in the Arduino Serial Plotter.

## The EMG sensor

When your forearm muscle fibres fire, each makes a small electrical spike. Thousands of them together make a tiny voltage on your skin: from about **50 microvolts to a few millivolts**. ($1\ \text{mV} = 0.001\ \text{V}$, and $1\ \mu\text{V} = 0.000001\ \text{V}$.) That is far too small for an Arduino to notice.

An **EMG module** does three jobs:

1. **Measure a difference.** Two electrodes sit on the muscle, a few centimetres apart. A third, the **reference**, sits on a bony area with little muscle. The amplifier measures the *difference* between the two muscle electrodes. Noise that hits the whole body equally (for example "hum" from mains wiring in the walls) cancels out.
2. **Amplify.** It multiplies the voltage by a **gain**, often thousands of times:
$$V_\text{out} = \text{gain} \times V_\text{in}$$
3. **Smooth.** The raw EMG wiggles up and down very fast. The module **rectifies** it (flips the negative parts to positive) and **smooths** it into an **envelope** — a single line that rises when you clench and falls when you relax.

### Worked example

Skin signal 0.8 mV, gain 3000:
$$V_\text{out} = 3000 \times 0.8\ \text{mV} = 2400\ \text{mV} = 2.4\ \text{V}$$

## From voltage to number: the ADC

A microcontroller only understands numbers. The Arduino Uno has an **analogue-to-digital converter (ADC)** on pins A0–A5. It is **10-bit**, meaning it has $2^{10} = 1024$ steps, numbered 0 to 1023, spread over 0 to 5 V:

$$\text{reading} \approx \frac{V}{5\ \text{V}} \times 1023 \qquad V \approx \text{reading} \times \frac{5\ \text{V}}{1023}$$

Each step is about $5 / 1023 \approx 0.0049$ V, roughly 5 mV.

**Warning:** an Arduino pin must never see more than 5 V or less than 0 V. If your EMG module runs from 9 V batteries, turn its gain down so the output stays below 5 V — check with a multimeter first.

## Sampling

The Arduino does not watch the voltage continuously. It takes a **sample** (one reading) each time `analogRead()` runs. If your loop runs every 10 ms, you get 100 samples per second (100 Hz). That is plenty for a smoothed envelope that changes over tenths of a second.

## Signal and noise

**Noise** is any unwanted wiggle mixed into your signal. Common causes for EMG:

- Electrodes not stuck firmly, or dry or oily skin (high contact resistance).
- Cables swinging — moving wires pick up interference.
- Mains hum from nearby chargers and sockets.
- Other muscles firing (talking, shrugging).

Good engineers think in terms of **signal-to-noise**: make the signal big (good placement, firm clench) and the noise small (clean skin, still cables, stay away from mains). Then a simple **threshold** can tell "relaxed" from "clenched".
