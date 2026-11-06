---
title: Simple circuits
summary: Closed loops, resistance and Ohm's law (V = IR), series and parallel connections, and electrical power (P = VI).
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 10, unit: "Current electricity" }
  - { subject: technology, grade: 10, unit: "Basic electronics" }
problems:
  - id: open-switch
    type: mcq
    q: "A torch has a battery, a switch and a bulb in one loop. When the switch is open, what happens?"
    choices: ["The bulb is dimmer", "No current flows anywhere in the loop", "Current flows but only up to the switch", "The battery is short-circuited"]
    answerIndex: 1
    explanation: "Current needs a complete, unbroken loop. Open the switch anywhere and the current stops everywhere, at once."
  - id: led-resistor
    type: numeric
    q: "An LED needs 2 V across it and 15 mA through it. You power it from a 5 V supply with a resistor in series. What resistance do you need, in ohms?"
    answer: 200
    tolerancePct: 2
    unit: "Ω"
    explanation: "The resistor must take the rest of the voltage: 5 − 2 = 3 V. The same 15 mA (0.015 A) flows through it. R = V/I = 3 ÷ 0.015 = 200 Ω."
  - id: series-current
    type: numeric
    q: "A 100 Ω and a 220 Ω resistor are in series with a 9 V battery. What current flows, in mA?"
    answer: 28.1
    tolerancePct: 2
    unit: "mA"
    explanation: "In series, resistances add: 100 + 220 = 320 Ω. I = V/R = 9 ÷ 320 = 0.0281 A = 28.1 mA."
  - id: parallel-equal
    type: numeric
    q: "Two 100 Ω resistors are connected in parallel. What is their combined resistance, in ohms?"
    answer: 50
    tolerancePct: 1
    unit: "Ω"
    explanation: "1/R = 1/100 + 1/100 = 2/100, so R = 50 Ω. Two equal paths side by side let twice as much current through, so the resistance halves."
  - id: power-usb
    type: numeric
    q: "A USB device takes 0.5 A from a 5 V supply. What power does it use, in watts?"
    answer: 2.5
    tolerancePct: 1
    unit: "W"
    explanation: "P = VI = 5 × 0.5 = 2.5 W, meaning 2.5 joules of energy every second."
  - id: series-same
    type: mcq
    q: "In a series circuit with a battery, a resistor and an LED, where is the current largest?"
    choices: ["Next to the battery's + terminal", "After the resistor", "After the LED", "It is the same everywhere in the loop"]
    answerIndex: 3
    explanation: "In a single loop there is only one path, so the same current passes every point. Charge isn't used up; energy is."
---
## A circuit is a loop

Electric current only flows when there is a **complete loop** from one terminal of the supply, through the parts, and back to the other terminal. Break the loop anywhere (open a switch, a loose clip, a wire with its insulation still on the end) and the current stops **everywhere**.

That's why the first question when "it doesn't work" is always: *is the loop complete?*

## Circuit symbols

Engineers draw circuits with standard symbols: a cell (long line +, short line −), a resistor (a rectangle), a lamp (a circle with a cross), a switch (a gap with a lever), a diode (a triangle pointing at a bar). A drawing made with symbols is a **circuit diagram**. It shows how things connect, not where they sit on the table.

## Resistance and Ohm's law

Every part resists the flow a little. **Resistance** ($R$) is measured in **ohms** ($\Omega$). For many parts (resistors, wires at steady temperature), the current is proportional to the voltage:

$$V = IR$$

This is **Ohm's law**. Rearranged: $I = \dfrac{V}{R}$ and $R = \dfrac{V}{I}$.

**Worked example.** A 12 V supply across a 48 Ω heater element: $I = 12 \div 48 = 0.25$ A.

## Series: one after another

Parts in **series** sit in one loop, so:

- the **same current** flows through each;
- the **voltages add up** to the supply voltage;
- **resistances add**: $R = R_1 + R_2 + \dots$

**Worked example: protecting an LED.** An LED needs about 2 V and 20 mA. From a 9 V battery, the resistor must drop $9 - 2 = 7$ V at 0.020 A:

$$R = \frac{7}{0.020} = 350\ \Omega$$

Use the next standard value up (390 Ω) to be safe. Without a resistor, the LED takes far too much current and burns out.

## Parallel: side by side

Parts in **parallel** each connect directly across the supply, like houses on one street, each with its own connection:

- each gets the **full voltage**;
- the **currents add up**;
- the combined resistance is **less** than either one:

$$\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}$$

The lights in your home are in parallel: switching one off doesn't switch off the others.

## Power

How fast a part uses energy is its **power** ($P$), in **watts** (W):

$$P = VI$$

**Worked example.** A small motor runs on 6 V and takes 0.3 A: $P = 6 \times 0.3 = 1.8$ W. A crystal radio earpiece, by comparison, works on well under a millionth of a watt.

## Short circuits

If a thick wire connects + straight to − with no resistance in between, $I = V/R$ becomes enormous. Wires get hot, batteries swell, and things can catch fire. Always have something with resistance in the loop, and **never** experiment with mains sockets: 220 V can kill.

## Fault-finding checklist

1. Is the loop complete? Follow it with your finger.
2. Are the ends of the wire bare and clean (enamel or plastic removed)?
3. Are one-way parts (diodes, LEDs, batteries) the right way round?
4. Measure: voltage across each part tells you where the energy is going.
