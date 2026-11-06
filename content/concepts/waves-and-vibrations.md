---
title: Waves and vibrations
summary: A wave carries energy from place to place without carrying the stuff it travels through. One formula, v = fλ, ties its speed, frequency and wavelength together.
status: ai-draft
public: true
curriculum:
  - { subject: physics, grade: 9, unit: "Waves and sound" }
  - { subject: physics, grade: 11, unit: "Mechanical waves" }
problems:
  - id: wave-carries
    type: mcq
    q: "A leaf floats on a pond. Ripples pass under it. What happens to the leaf?"
    choices: ["It is carried along to the edge of the pond with the ripples", "It bobs up and down but stays in roughly the same place", "It does not move at all", "It sinks"]
    answerIndex: 1
    explanation: "A wave moves energy, not the water itself. Each bit of water (and the leaf on it) only moves up and down as the wave passes, then returns to where it was."
  - id: longitudinal
    type: mcq
    q: "You push and pull one end of a stretched slinky along its length, so the coils bunch up and spread out. What kind of wave is this?"
    choices: ["Transverse", "Longitudinal", "Electromagnetic", "Standing still"]
    answerIndex: 1
    explanation: "In a longitudinal wave the coils move back and forth in the same direction the wave travels. Sound in air is the same kind of wave. Shaking the slinky side to side would make a transverse wave."
  - id: ripple-speed
    type: numeric
    q: "In a water tray, 12 ripples pass a mark in 10 seconds. The distance from one crest to the next is 5 cm. What is the speed of the ripples, in cm/s?"
    answer: 6
    tolerancePct: 2
    unit: "cm/s"
    explanation: "First the frequency: f = 12 ÷ 10 s = 1.2 Hz. Then v = fλ = 1.2 Hz × 5 cm = 6 cm/s."
  - id: slinky-wavelength
    type: numeric
    q: "A wave on a slinky travels at 2.4 m/s. You shake the end 3 times per second. What is the wavelength, in metres?"
    answer: 0.8
    tolerancePct: 2
    unit: "m"
    explanation: "Rearrange v = fλ to λ = v ÷ f = 2.4 ÷ 3 = 0.8 m."
  - id: sound-wavelength
    type: numeric
    q: "Sound travels through air at about 340 m/s. A kebero (drum) note has a frequency of 170 Hz. How long is one wavelength, in metres?"
    answer: 2
    tolerancePct: 2
    unit: "m"
    explanation: "λ = v ÷ f = 340 ÷ 170 = 2 m. Low notes have long wavelengths."
  - id: same-rate-harder
    type: mcq
    q: "You keep shaking a rope at the same rate, but you swing your hand further each time. What changes?"
    choices: ["The frequency", "The wavelength", "The amplitude", "The speed of the wave"]
    answerIndex: 2
    explanation: "A bigger swing makes taller waves: a larger amplitude, which carries more energy. The rate (frequency) is the same, and the speed depends on the rope, so the wavelength stays the same too."
---
## What is a wave?

Drop a stone into a bucket of water. Rings spread out to the edge. But the water itself doesn't travel to the edge: put a bottle cap on the surface and it just bobs up and down. What travels is **energy** and a **pattern**.

That is what a wave is: **a disturbance that carries energy from one place to another without carrying the material along.**

Every wave starts with a **vibration**, something moving back and forth: your hand on a rope, a drum skin, a guitar string, or (as we'll see later) electrons rushing up and down a radio antenna.

## Two kinds of wave

- **Transverse:** the material moves at right angles to the direction the wave travels. Shake a rope side to side on the floor: the wave runs along the rope, but each bit of rope moves sideways. Water ripples are roughly like this.
- **Longitudinal:** the material moves back and forth along the direction of travel. Push and pull a slinky and you see bunched-up parts (compressions) and spread-out parts (rarefactions) run along it. Sound in air works this way.

## Describing a wave

- **Amplitude** ($A$): how far the material moves from its resting position. Bigger amplitude = more energy (a louder sound, a taller ripple).
- **Wavelength** ($\lambda$, the Greek letter "lambda"): the distance from one crest to the next crest. Measured in metres.
- **Frequency** ($f$): how many waves pass a point each second. Measured in hertz (Hz); 1 Hz = 1 wave per second.
- **Speed** ($v$): how fast the pattern moves, in m/s.

## The wave equation

Imagine standing next to a rope while waves pass you. Each second, $f$ waves go by, and each one is $\lambda$ metres long. So in one second the wave pattern has moved $f \times \lambda$ metres. That *is* the speed:

$$v = f\lambda$$

**Worked example.** You count 15 ripples passing a pencil mark in 10 seconds, and the crests are 4 cm apart.

- Frequency: $f = 15 \div 10\ \text{s} = 1.5\ \text{Hz}$
- Speed: $v = f\lambda = 1.5 \times 4\ \text{cm} = 6\ \text{cm/s}$

**Worked example.** A wave on a rope moves at 3 m/s and you shake it twice a second. How long is each wave?

$$\lambda = \frac{v}{f} = \frac{3}{2} = 1.5\ \text{m}$$

## What sets the speed?

The speed depends on **what the wave travels through**, not on how fast you shake. A tighter rope carries waves faster; sound is faster in water than in air. So if you shake faster (higher $f$) on the same rope, $v$ stays the same and the waves get **shorter** ($\lambda$ goes down). This trade-off is the key to radio: every radio station has its own frequency, and so its own wavelength.

## Why this matters for radio

Radio waves are waves too, but they don't need any material at all: they can cross empty space, and they travel at the speed of light, $3.0 \times 10^8$ m/s. The same equation, $v = f\lambda$, tells you how long a radio wave is, and that tells you how to build your antenna.
