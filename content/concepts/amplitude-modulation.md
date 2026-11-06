---
title: Amplitude modulation (AM)
summary: How a radio station hides sound inside a fast radio wave by changing its height, and how a diode and an earpiece get the sound back out.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 12, unit: "Electronics: communication systems" }
  - { subject: technology, grade: 12, unit: "Communication technology" }
problems:
  - id: am-meaning
    type: mcq
    q: "In an AM radio signal, how is the sound carried?"
    choices: ["By changing the frequency of the radio wave", "By changing the amplitude (height) of the radio wave", "By switching the wave on and off in Morse code", "By changing the speed of the wave"]
    answerIndex: 1
    explanation: "AM stands for amplitude modulation: the carrier keeps a fixed frequency, but its height rises and falls in the pattern of the sound. (FM changes the frequency instead.)"
  - id: cycles-per-audio
    type: numeric
    q: "A station's carrier is 1000 kHz and it is sending a steady 1 kHz whistle. How many carrier cycles fit inside one cycle of the whistle?"
    answer: 1000
    tolerancePct: 1
    explanation: "Carrier cycles per second ÷ audio cycles per second = 1,000,000 ÷ 1,000 = 1000. The sound changes very slowly compared with the carrier, which is why a slow earpiece can follow the sound but not the carrier."
  - id: upper-sideband
    type: numeric
    q: "A 900 kHz carrier is modulated with a 5 kHz tone. AM creates extra frequencies (sidebands) at the carrier ± the tone. What is the upper sideband frequency, in kHz?"
    answer: 905
    tolerancePct: 0.1
    unit: "kHz"
    explanation: "Upper sideband = carrier + audio = 900 + 5 = 905 kHz. The lower sideband is 900 − 5 = 895 kHz."
  - id: bandwidth
    type: numeric
    q: "A medium-wave station sends audio up to 4.5 kHz. What total bandwidth does its AM signal take up, in kHz?"
    answer: 9
    tolerancePct: 1
    unit: "kHz"
    explanation: "The signal spreads from carrier − 4.5 kHz to carrier + 4.5 kHz, which is 2 × 4.5 = 9 kHz wide. In Africa, Europe and Asia, medium-wave stations are placed 9 kHz apart for this reason."
  - id: why-diode
    type: mcq
    q: "Why does a crystal radio make no sound if you connect the earpiece straight across the tuned circuit with no diode?"
    choices: ["The voltage is too high and damages the earpiece", "The carrier pushes up and down equally, so the earpiece's average push is zero", "The earpiece only works with a battery", "The antenna stops working"]
    answerIndex: 1
    explanation: "Without the diode, every upward push is cancelled by an equal downward one, a million times a second, and the earpiece can't follow either. The diode removes one half, so the average follows the envelope: the sound."
  - id: envelope-detector
    type: mcq
    q: "After the diode, the signal is a series of fast one-way bumps whose heights follow the sound. What does the earpiece respond to?"
    choices: ["Each individual bump of the carrier", "The average of the bumps, which rises and falls with the sound", "Only the very highest bump", "Nothing; another diode is needed"]
    answerIndex: 1
    explanation: "The earpiece (helped by its own capacitance, or a small capacitor across it) smooths out the fast bumps and follows their average, the envelope, which is the original sound."
---
## The problem

Sound waves are slow: voices are roughly 100–4000 Hz. You can't broadcast them directly as radio waves: the antenna would need to be hundreds of kilometres long, and every station would be on the same frequencies, all jumbled together.

The solution: give each station its own fast radio wave, called a **carrier**, and **hide the sound inside it**.

## Modulation

To **modulate** means to change something in a pattern. In **amplitude modulation (AM)**:

- the carrier's **frequency stays fixed** (say 1000 kHz, the station's place on the dial);
- the carrier's **amplitude** (its height) rises and falls following the sound.

Picture it: a very fast wave squeezed inside an outline that slowly swells and shrinks. That outline is called the **envelope**, and the envelope **is the sound**.

**Worked example.** A 1000 kHz carrier modulated by a 1 kHz tone. In one cycle of the tone (1 ms), the carrier goes through $1\,000\,000 \div 1000 = 1000$ cycles. The envelope changes slowly; the carrier wiggles fast.

## Sidebands and bandwidth

Mixing a carrier $f_c$ with sound of frequency $f_a$ creates new frequencies:

$$f_c - f_a \qquad \text{and} \qquad f_c + f_a$$

called the **lower** and **upper sidebands**. If the station sends sound up to $f_{\max}$, its signal takes up a **bandwidth**

$$B = 2 f_{\max}$$

**Worked example.** Audio up to 4.5 kHz: $B = 9$ kHz. A station on 900 kHz really occupies 895.5 to 904.5 kHz. In our part of the world, medium-wave stations are spaced 9 kHz apart so they don't overlap. A crystal radio's tuning isn't very sharp, so strong nearby stations can bleed into each other.

## Getting the sound back: detection

At your radio, the tuned circuit picks out one carrier. But the earpiece can't use it directly:

1. **The carrier is far too fast.** Nothing mechanical can move a million times a second.
2. **It averages to zero.** It pushes up and down equally. Even the swelling envelope is mirrored above and below, so the average is still zero.

The **diode** fixes this. It lets through only one half of every cycle: just the tops. Now the signal is a train of one-way bumps, and **their average follows the envelope**.

The earpiece is slow and acts as a smoother, helped by its own small capacitance (sometimes we add a small capacitor across it). It can't follow each bump, but it follows their **average**, which rises and falls with the original sound. You hear the voice!

This circuit (diode + smoothing) is called an **envelope detector**.

## Where the energy comes from

Every bit of energy you hear came from the transmitter, through the air, into your antenna. That's why a crystal radio is quiet, why it needs a long antenna and a good ground, and why it needs a **high-impedance** earpiece: one that turns microwatts into sound without draining the circuit. A normal earbud (about 16–32 Ω) would "short out" the tiny signal.

## AM vs FM

FM (frequency modulation) keeps the amplitude constant and changes the carrier's **frequency** instead. It sounds clearer and is less affected by lightning crackle, but it needs more complex circuits to decode. AM's simplicity is why a radio with no battery is possible.
