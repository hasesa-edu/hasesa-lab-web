---
title: Electromagnetic induction
summary: How moving a magnet near a coil makes electricity, why generators make alternating current, and why it gets harder to turn when you take power out.
status: ai-draft
public: true
curriculum:
  - { subject: physics, grade: 11, unit: "Electromagnetic induction" }
  - { subject: physics, grade: 12, unit: "Electromagnetic induction and AC" }
problems:
  - id: bigger-voltage
    type: mcq
    q: "Which change would make a hand-turned generator give a bigger voltage?"
    choices: ["Turning it more slowly", "Using fewer turns of wire in the coil", "Using a stronger magnet and turning it faster", "Using thicker plastic around the coil"]
    answerIndex: 2
    explanation: "The induced voltage depends on how fast the magnetic field through the coil changes. A stronger magnet, faster motion and more turns of wire all make it bigger."
  - id: generator-frequency
    type: numeric
    q: "A simple generator has one magnet with one north and one south pole (one pole pair). It spins at 600 revolutions per minute. What is the frequency of the alternating voltage, in Hz?"
    answer: 10
    tolerancePct: 1
    unit: "Hz"
    explanation: "600 revolutions per minute ÷ 60 = 10 revolutions per second. Each revolution gives one full cycle (one north and one south pole pass the coil), so f = 10 Hz."
  - id: grid-rpm
    type: numeric
    q: "Ethiopia's grid runs at 50 Hz. A power-station generator has 2 pole pairs, so it makes 2 cycles per revolution. How many revolutions per minute must it turn?"
    answer: 1500
    tolerancePct: 1
    unit: "rpm"
    explanation: "Revolutions per second = 50 ÷ 2 = 25. Per minute: 25 × 60 = 1500 rpm."
  - id: power-out
    type: numeric
    q: "A small wind turbine gives 6.0 V and pushes 0.25 A through a lamp. What power is it delivering?"
    answer: 1.5
    tolerancePct: 1
    unit: "W"
    explanation: "P = V × I = 6.0 × 0.25 = 1.5 W."
  - id: harder-to-turn
    type: mcq
    q: "A hand-cranked generator is easy to turn with nothing connected. When you connect a bulb, it suddenly becomes harder to turn. Why?"
    choices: ["The bulb is heavy", "The current in the coil makes its own magnetic field that pushes against the magnet: you must do work to make electrical energy", "Friction in the bulb", "The magnet gets weaker"]
    answerIndex: 1
    explanation: "Energy can't come from nowhere. When current flows, the coil becomes an electromagnet that opposes the motion (Lenz's law). The harder you have to push, the more energy you are turning into electricity."
---
In 1831, Michael Faraday pushed a magnet into a coil of wire connected to a meter, and the needle flicked. Pull it out, and the needle flicked the other way. Hold it still, and nothing. He had discovered how to turn motion into electricity, and almost all the electricity we use, from Gibe III to the Adama wind farms, is still made this way.

## The rule

A voltage is **induced** in a coil whenever the **magnetic field through it changes**. That can happen by:

- moving a magnet towards or away from the coil,
- moving the coil near a magnet,
- spinning a magnet next to a coil,
- switching an electromagnet on or off nearby.

A still magnet next to a still coil gives **nothing**. It's the **change** that matters.

## What makes the voltage bigger

The induced voltage is bigger when the field changes **faster**. So:

| Change | Effect |
|---|---|
| Move the magnet faster | bigger voltage |
| Use a stronger magnet | bigger voltage |
| Put more turns of wire in the coil | bigger voltage (each turn adds its share) |
| Put an iron core in the coil | concentrates the field: bigger voltage |

If the coil is part of a complete circuit, the voltage drives a **current**.

## Generators make alternating current

Spin a magnet next to a coil. As the north pole approaches, the voltage pushes one way; as it leaves and the south pole approaches, it pushes the other way. The result is **alternating current (AC)**: a voltage that swings positive and negative, over and over.

$$f = \text{pole pairs} \times \frac{\text{rpm}}{60}$$

Faster spinning gives a higher frequency **and** a higher voltage.

To charge a battery or light an LED properly, AC must be turned into direct current (DC), which flows one way. A **rectifier** made of diodes does this (see *Diodes and rectification*).

## Motors and generators are the same machine

A motor uses a current and a magnet to make motion. Turn the shaft of a motor by hand instead, and it becomes a generator. That's why old printer, toy and treadmill motors are popular in home-made wind turbines.

## Nothing for free

When current flows in a generator's coil, the coil becomes an electromagnet. Its field always **opposes** the motion that caused it (**Lenz's law**). So a generator becomes harder to turn the more current you take from it. This is energy conservation: the electrical energy out comes from the work you (or the wind) put in.

$$P_{\text{electrical}} = V \times I$$

## Transformers (a quick note)

A transformer uses induction too: an alternating current in one coil makes a changing field in an iron core, which induces a voltage in a second coil. More turns in the second coil give a higher voltage. Power stations step voltage up to hundreds of thousands of volts for long-distance lines, then step it down for homes. Transformers only work with AC, one reason the grid uses it.
