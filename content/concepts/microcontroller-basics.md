---
title: Microcontroller basics
summary: How an Arduino runs a program, reads inputs, makes decisions with if, and drives a servo motor.
status: ai-draft
public: false
curriculum:
  - { subject: technology, grade: 11, unit: "Fundamentals of programming" }
  - { subject: technology, grade: 12, unit: "Embedded systems and control" }
problems:
  - id: setup-loop
    type: mcq
    q: "In an Arduino sketch, what is the difference between setup() and loop()?"
    choices: ["setup() runs once at power-on; loop() then repeats forever", "loop() runs once; setup() repeats", "Both run once", "setup() only runs when you press a button"]
    answerIndex: 0
    explanation: "When the board powers up or resets, setup() runs one time — good for attaching the servo and calibrating. Then loop() runs again and again, many times per second, for as long as the board has power."
  - id: threshold-midpoint
    type: numeric
    q: "During calibration your relaxed arm gives an average reading of 120 and your clenched fist gives 480. If you put the threshold exactly halfway, what is it?"
    answer: 300
    tolerancePct: 1
    explanation: "Midpoint = (120 + 480) ÷ 2 = 600 ÷ 2 = 300. Halfway gives the most room for noise on both sides: 180 units above 'relaxed' and 180 below 'clenched'."
  - id: servo-write
    type: mcq
    q: "What does claw.write(90); do to a standard SG90 hobby servo?"
    choices: ["Spins it at 90 revolutions per minute", "Turns the output arm to the 90° position and holds it there", "Spins it for 90 milliseconds", "Sets the power to 90%"]
    answerIndex: 1
    explanation: "A positional servo like the SG90 moves to an angle between about 0° and 180° and holds it. write(90) means 'go to the middle'. The servo has its own small circuit that keeps checking its angle and correcting."
  - id: map-value
    type: numeric
    q: "The Arduino line angle = map(value, 0, 1023, 0, 180); turns a reading into an angle. Arduino map() uses whole-number maths and drops any fraction. What angle does it give when value = 512?"
    answer: 90
    tolerancePct: 0
    unit: "°"
    explanation: "map scales proportionally: 512 × 180 ÷ 1023 = 92160 ÷ 1023 = 90.09…, and whole-number maths drops the .09, giving 90°."
  - id: shared-ground
    type: mcq
    q: "The servo is powered from a separate battery pack. Why must the battery pack's negative (GND) be connected to the Arduino's GND?"
    choices: ["To make the servo spin faster", "Voltage is always measured between two points; without a shared ground the servo cannot read the Arduino's control signal correctly", "To charge the batteries", "It is not needed"]
    answerIndex: 1
    explanation: "The signal on pin 9 is 'high' or 'low' compared to the Arduino's ground. The servo judges it compared to its own ground. If the two grounds are not joined, the servo has no common reference, so it jitters or ignores the signal."
  - id: loop-rate
    type: numeric
    q: "Your loop() reads the sensor, decides, writes the servo, then calls delay(20). Ignoring the small time the other lines take, how many times per second does the claw get updated?"
    answer: 50
    tolerancePct: 5
    unit: "times/s"
    explanation: "One loop ≈ 20 ms = 0.020 s. Updates per second = 1 ÷ 0.020 = 50. Fast enough to feel instant — your own reaction time is about 200 ms."
---
## A tiny computer with pins

A **microcontroller** is a whole small computer on one chip: processor, memory and **input/output pins**. The Arduino Uno is a board built around one (the ATmega328P). Unlike a laptop, it runs one program, starts in a fraction of a second, and talks directly to sensors and motors through its pins.

- **Analogue input pins (A0–A5)** measure a voltage from 0 to 5 V and give a number 0–1023.
- **Digital pins (0–13)** are either HIGH (5 V) or LOW (0 V). Some can make the special pulses a servo needs.
- **5V, 3.3V and GND pins** supply power. **GND** (ground) is the 0 V reference everything is measured from.

## The shape of every sketch

An Arduino program is called a **sketch**. It always has two parts:

```cpp
void setup() {
  // runs ONCE when the board powers on
}

void loop() {
  // runs AGAIN AND AGAIN, forever
}
```

You upload the sketch from a laptop over USB. After that the Arduino remembers it, even when unplugged.

## Variables and decisions

A **variable** is a named box holding a value: `int value = analogRead(A0);` reads pin A0 and stores the number in `value`. (`int` means a whole number.)

An **if** statement makes a decision:

```cpp
if (value > threshold) {
  claw.write(120);   // closed
} else {
  claw.write(0);     // open
}
```

This is the heart of our robot claw: **sense → decide → act**, repeated about 50 times a second.

## The servo motor

An **SG90 micro servo** is a small motor with gears and its own control circuit. You tell it an **angle** from about 0° to 180°, and it turns there and holds. The Arduino's `Servo` library does the hard part:

```cpp
#include <Servo.h>
Servo claw;
claw.attach(9);    // signal wire on pin 9
claw.write(90);    // go to 90 degrees
```

A servo has three wires: **brown/black = GND**, **red = power (about 5 V)**, **orange/yellow = signal**. A servo can draw a big gulp of current when it starts moving, so it is best powered from its own supply (4 AA cells or a USB power bank), with its **ground joined to the Arduino's ground**.

## Calibration and thresholds

Every arm is different. Instead of guessing a threshold, **measure**:

1. Average the readings while relaxed, e.g. 120.
2. Average the readings while clenching, e.g. 480.
3. Set the threshold between them: $\text{threshold} = \dfrac{120 + 480}{2} = 300$.

### Hysteresis: stopping the flicker

If the signal hovers near 300, the claw would flicker open-closed-open. The fix is **two** thresholds: close when the reading goes above $300 + 30 = 330$; open only when it falls below $300 - 30 = 270$. In between, keep doing whatever you were doing. This "dead band" is called **hysteresis**. A house thermostat or a water-tank float switch works the same way.

## Timing

`delay(20)` pauses for 20 milliseconds. With it, the loop runs about $1 / 0.020 = 50$ times per second. `millis()` gives the time since power-on in milliseconds, useful for timing calibration without freezing everything.
