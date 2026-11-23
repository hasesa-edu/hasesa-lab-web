---
title: From wobbly AC to useful DC
kind: build
minutes: 150
units: [diodes-and-rectification, simple-circuits]
---
## The problem

Your turbine makes **AC** that rises and falls with the wind and the spin. LEDs flicker on it, and batteries can't be charged by it. You need steady **DC**.

## Theory

Read **Diodes and rectification** (a diode is a one-way valve for current) and **Simple circuits** (series, parallel, Ohm's law and power). You'll use both today.

## Build: a bridge rectifier (45 minutes)

A stepper motor has two separate coils, each with its own pair of wires (find the pairs with the multimeter: wires from the same coil show a low resistance between them).

On the breadboard, for **each** coil, build a **bridge rectifier** from four diodes (your guide shows the diagram). Connect both bridges' outputs together, positive to positive and negative to negative.

Test: spin the turbine by hand or in the fan. Measure the output on **DC volts**. Does it stay positive?

## Build: smoothing (30 minutes)

Connect a 1000 µF capacitor across the output. **Check the polarity:** the stripe marks the negative leg. Glasses on for the first test.

Spin again. Compare the DC voltage with and without the capacitor, with an LED and a 1 kΩ resistor as the load. Does the LED still flicker?

## Notice something puzzling

The DC voltage after the rectifier is a bit lower than the AC voltage you measured before. Where did the missing volts go? (Hint: look up the **turn-on voltage** of a diode.) Why do some designs use Schottky diodes (1N5819) instead of 1N4007?

## Build: charging (45 minutes)

A phone or power bank needs a steady 5 V. Your turbine's voltage goes up and down with the wind. A **charging module** (a small circuit board the guide provides) takes a varying voltage and turns it into a steady 5 V.

1. With the guide, connect the smoothed output to the module's input, checking polarity.
2. Connect the module's USB output to a power bank, or connect NiMH cells through the guide's charging circuit.
3. Run the turbine in the fan. Does the power bank's charging light come on? At what wind speed does it start?

**Never connect a phone directly.**

## Record (30 minutes)

A circuit diagram of your full system: generator → rectifiers → capacitor → charging module → load. Your voltage readings at each point. Explain in your own words what each part does.
