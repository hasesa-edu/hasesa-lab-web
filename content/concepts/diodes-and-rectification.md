---
title: Diodes and rectification
summary: A diode is a one-way valve for current. Used on an alternating signal, it lets only one half through (rectification), turning a back-and-forth current into one that pushes one way.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 12, unit: "Electronics: semiconductors and diodes" }
  - { subject: technology, grade: 11, unit: "Basic electronics" }
problems:
  - id: diode-job
    type: mcq
    q: "What does a diode do in a circuit?"
    choices: ["Stores charge like a capacitor", "Lets current flow easily in one direction but blocks it in the other", "Makes the voltage bigger", "Lets current flow both ways equally"]
    answerIndex: 1
    explanation: "A diode is a one-way valve for current. It conducts in the forward direction (arrow in the symbol) and blocks in reverse."
  - id: led-reversed
    type: mcq
    q: "An LED, a resistor and a battery are in a loop and the LED lights. You turn only the LED round. What happens?"
    choices: ["It lights more brightly", "It lights the same", "It goes dark, because it is now reverse-biased", "The battery is short-circuited"]
    answerIndex: 2
    explanation: "An LED is a diode that gives off light. Reversed, it blocks current, so the whole loop stops and nothing lights."
  - id: ge-vs-si
    type: mcq
    q: "The signal from a crystal radio's tuned circuit only reaches about 0.2 V. Which diode will work best?"
    choices: ["A silicon diode, which needs about 0.6–0.7 V to start conducting", "A germanium diode, which needs only about 0.2–0.3 V", "Either, they are identical", "No diode is needed"]
    answerIndex: 1
    explanation: "A diode barely conducts until the forward voltage reaches its turn-on voltage. Germanium (like the 1N34A or 1N60) turns on at a much lower voltage than silicon, so it can detect weak signals."
  - id: rectified-peak
    type: numeric
    q: "An alternating voltage peaks at 5 V. It passes through a silicon diode that drops 0.7 V. What is the peak voltage after the diode, in volts?"
    answer: 4.3
    tolerancePct: 2
    unit: "V"
    explanation: "The diode takes its forward voltage from the peak: 5 − 0.7 = 4.3 V. The negative halves are blocked, so the output is 0 V during those."
  - id: led-current
    type: numeric
    q: "An LED (which drops 2 V) is in series with a 1 kΩ resistor across a 9 V battery. What current flows, in mA?"
    answer: 7
    tolerancePct: 2
    unit: "mA"
    explanation: "The resistor gets 9 − 2 = 7 V. I = V/R = 7 ÷ 1000 = 0.007 A = 7 mA."
  - id: average-ac
    type: mcq
    q: "Why does a pure, fast alternating current not move a speaker or earpiece on average?"
    choices: ["It is too weak", "It pushes one way then the other equally, so the average push is zero", "Alternating current has no energy", "Earpieces only work on batteries"]
    answerIndex: 1
    explanation: "Each push is cancelled by an equal pull half a cycle later. Rectifying removes one half, so the average is no longer zero and can follow the slower changes in the signal."
---
## A one-way valve

A **diode** lets current flow easily in **one direction** and blocks it in the other, like the valve in a bicycle tyre that lets air in but not out.

Its circuit symbol is a triangle pointing at a bar. Current flows in the direction the triangle points: from the **anode** to the **cathode**. On a real diode, the **cathode** end is marked with a **stripe**.

- Connected the easy way round, the diode is **forward-biased** and conducts.
- The other way, it is **reverse-biased** and (almost) no current flows.

## See it with an LED

An **LED** (light-emitting diode) is a diode that glows when current flows through it, so you can *see* the one-way rule. Wire an LED, a 1 kΩ resistor and a 9 V battery in a loop. It lights. Turn the LED round: dark. Turn it back: lit. The longer leg of a new LED is the anode (+).

## Turn-on voltage

A diode doesn't conduct at all until the forward voltage reaches about its **turn-on voltage** (or forward voltage):

| Diode | Turn-on voltage |
|---|---|
| Silicon (e.g. 1N4148, 1N4007) | about 0.6–0.7 V |
| Germanium (e.g. 1N34A, 1N60) | about 0.2–0.3 V |
| Red LED | about 1.8–2 V |

Once it's conducting, the diode "uses up" roughly that voltage, and the rest goes to the other parts.

**Worked example.** A red LED (2 V) with a 9 V battery and a 1 kΩ resistor: the resistor gets $9 - 2 = 7$ V, so $I = 7/1000 = 7$ mA.

The signal at a crystal radio's tuned circuit is often only a few tenths of a volt. A silicon diode would hardly turn on, but a **germanium** diode will. That's why we use the 1N34A or 1N60.

## Rectification

**Alternating current (AC)** pushes one way, then the other, over and over. Mains electricity does this 50 times a second; a radio signal, about a million times a second. **Direct current (DC)** pushes one way only, like a battery.

Put a diode in an AC circuit and it passes only the half-cycles that go its way. The output is a series of one-way bumps:

- input: up, down, up, down…
- output: up, zero, up, zero…

This is called **half-wave rectification**. The output now pushes **one way on average**.

**Worked example.** An AC voltage peaks at 6 V and goes through a silicon diode (0.7 V). Output peaks at $6 - 0.7 = 5.3$ V, and is zero for the negative halves.

## Why averaging matters

Something heavy or slow, like an earpiece, can't follow a million pushes a second. It feels only the **average** push. For pure AC, the average is zero: every push is cancelled by a pull. After rectification, the average is no longer zero. And if the size of those bumps slowly rises and falls in the pattern of a voice, the average rises and falls in the same pattern.

That's the whole trick of a crystal radio's **detector**, which you'll see in *Amplitude modulation*.

## Where else?

Every phone charger contains diodes that rectify the AC mains into DC, before the charger brings the voltage down to a safe 5 V. Solar panels, LED lights, and the Arduino board in a robot all depend on diodes too.

## Why "crystal"?

The first radio detectors were a lump of a mineral crystal (galena, lead sulfide) touched by a thin wire called a "cat's whisker". That point contact behaved as a crude diode. Your germanium diode is its modern descendant, but the name "crystal radio" stuck.
