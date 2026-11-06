---
title: Charge, current and voltage
summary: What actually moves in a wire (charge), how fast it flows (current) and what pushes it (voltage), with the formulas Q = It and E = QV.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 10, unit: "Current electricity" }
  - { subject: physics, grade: 9, unit: "Electrostatics" }
problems:
  - id: current-is
    type: mcq
    q: "What is electric current?"
    choices: ["The energy stored in a battery", "The rate at which electric charge flows past a point", "The push that drives charge round a circuit", "The amount of wire in a circuit"]
    answerIndex: 1
    explanation: "Current is how much charge passes a point each second, measured in amperes (1 A = 1 coulomb per second). The push is the voltage."
  - id: charge-minute
    type: numeric
    q: "A current of 0.5 A flows for 1 minute. How much charge passes, in coulombs?"
    answer: 30
    tolerancePct: 1
    unit: "C"
    explanation: "Q = It. Change the time to seconds first: 1 min = 60 s. Q = 0.5 × 60 = 30 C."
  - id: servo-charge
    type: numeric
    q: "A small motor draws 20 mA for 10 minutes. How much charge flows through it, in coulombs?"
    answer: 12
    tolerancePct: 1
    unit: "C"
    explanation: "Change units first: 20 mA = 0.020 A and 10 min = 600 s. Q = It = 0.020 × 600 = 12 C."
  - id: volt-meaning
    type: mcq
    q: "A 9 V battery is connected to a circuit. What does the 9 V tell you?"
    choices: ["9 coulombs flow every second", "Each coulomb of charge gets 9 joules of energy", "The battery lasts 9 hours", "The wires have 9 ohms of resistance"]
    answerIndex: 1
    explanation: "Voltage is energy per unit charge: 1 volt = 1 joule per coulomb. So every coulomb passing through a 9 V battery picks up 9 J."
  - id: energy-qv
    type: numeric
    q: "2 C of charge flows through a 5 V phone charger output. How much energy is delivered, in joules?"
    answer: 10
    tolerancePct: 1
    unit: "J"
    explanation: "E = QV = 2 × 5 = 10 J. Each coulomb carries 5 J, and there are 2 coulombs."
---
## What moves in a wire?

Everything is made of atoms, and atoms contain tiny particles called **electrons**, which carry negative **electric charge**. In a metal like copper, some electrons are loose: they can wander from atom to atom. A copper wire is like a pipe already full of water. It's packed with free electrons, ready to move.

Charge is measured in **coulombs** (C). One electron's charge is tiny: about $1.6 \times 10^{-19}$ C. It takes about $6.25 \times 10^{18}$ electrons to make one coulomb.

## Current: how fast charge flows

**Current** ($I$) is the amount of charge passing a point each second. It's measured in **amperes** (amps, A).

$$I = \frac{Q}{t} \qquad \text{or} \qquad Q = It$$

1 A means 1 coulomb passes every second. Small currents use milliamps: $1\ \text{mA} = 0.001\ \text{A}$. An LED needs about 10–20 mA; a crystal radio earpiece works on a few **micro**amps.

**Worked example.** An LED draws 15 mA for 2 minutes. How much charge flows?

$$Q = It = 0.015\ \text{A} \times 120\ \text{s} = 1.8\ \text{C}$$

Always change mA to A and minutes to seconds first.

## Voltage: the push

Charges don't move by themselves: something must push them. A battery, solar panel, or (as you'll see in Radio) a radio wave arriving at an antenna, gives energy to the charges. **Voltage** ($V$), also called **potential difference**, measures how much energy each coulomb gets or gives up:

$$V = \frac{E}{Q} \qquad \text{or} \qquad E = QV$$

1 volt = 1 joule per coulomb. A 9 V battery gives each coulomb 9 J; a phone charger's USB output gives 5 J per coulomb.

**Worked example.** How much energy does a 1.5 V cell give to 40 C of charge?

$$E = QV = 40 \times 1.5 = 60\ \text{J}$$

## A water picture

Imagine water pipes on a hill:

- **Charge** is the water.
- **Current** is how many litres flow past per second.
- **Voltage** is the height of the hill: how hard the water is pushed.

A tall hill with a narrow pipe can give the same flow as a short hill with a wide pipe. That "narrowness" is resistance, which you meet in *Simple circuits*.

## Direction

By an old agreement, **conventional current** is drawn flowing from the battery's + terminal round to the − terminal. The electrons actually drift the other way. Circuit diagrams always use conventional current, so you can mostly forget the electrons when drawing.

## Measuring

- An **ammeter** measures current. Put it **in** the circuit, so the current flows through it.
- A **voltmeter** measures voltage. Connect it **across** a part, one probe on each side.

A multimeter does both; just move the dial and the red lead to the right socket.

## Where you'll use this

In Radio, a few microamps from the antenna drive your earpiece with no battery at all. In a robot arm, an Arduino pin sends a few milliamps, while the motor needs much more, so it gets its own supply. In every case: current is the flow, voltage is the push.
