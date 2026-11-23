---
title: Power in the wind
kind: investigate
minutes: 90
units: [energy-and-power, rearranging-formulas]
---
## The question

How much power is in the wind hitting your turbine, and what fraction of it do you turn into electricity?

## Measure the wind (15 minutes)

At three fan settings (or three distances from the fan), measure the wind speed $v$ where the turbine will stand, using the anemometer from the weather station module or a phone wind meter. Take the mean of three readings each time.

## Measure the electrical power (35 minutes)

Electricity only does useful work when current flows, so put a **load** on the generator.

1. Connect a 47 Ω resistor across one pair of motor wires (the guide checks the connections).
2. Measure the voltage across the resistor (AC volts) at each wind speed.
3. Calculate the electrical power: $P = \dfrac{V^2}{R}$.

Repeat with 10 Ω and 100 Ω. Which resistor takes the most power at the same wind speed?

## Theory

Read **Rearranging formulas**. You'll need to rearrange $P = V^2 / R$ and $P = \tfrac{1}{2}\rho A v^3$ to answer questions like "what wind speed would I need for 1 W?"

## Calculate (30 minutes)

1. **Swept area:** $A = \pi r^2$, where $r$ is your blade length from the centre of the hub to the tip.
2. **Power in the wind:** $P_{\text{wind}} = \tfrac{1}{2}\rho A v^3$, with $\rho \approx 1.0$ kg/m³ in Addis.
3. **Efficiency:** $P_{\text{electrical}} \div P_{\text{wind}} \times 100\%$.

Do this for each wind speed. Plot electrical power (y) against wind speed (x).

## Notice something puzzling

Double the wind speed and the power in the wind goes up **eight** times. Did your electrical power go up by that much? If not, where did the rest go? (Think: friction, the generator's own resistance, blade shape, and the Betz limit.)

## Scale it up

An Adama turbine has blades about 40 m long. Calculate the power in a 10 m/s wind passing through its swept area. Real turbines capture roughly 40% of it. How much electrical power is that? How many of your turbines would you need to match it?

## Record

All measurements and calculations with units. Your graph. Two sentences comparing your turbine's efficiency with a big one, and why they differ.
