---
title: Energy and power
summary: How much energy it takes to heat things, how fast energy flows (power), and how much of it ends up where you wanted (efficiency).
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 9, unit: "Work, energy and power" }
  - { subject: physics, grade: 10, unit: "Thermal energy and its transfer" }
problems:
  - id: heat-water
    type: numeric
    q: "How much energy, in joules, does it take to heat 0.5 kg of water from 20 °C to 60 °C? (The specific heat capacity of water is 4200 J/kg°C.)"
    answer: 84000
    tolerancePct: 1
    unit: "J"
    explanation: "Q = m c ΔT = 0.5 × 4200 × (60 − 20) = 0.5 × 4200 × 40 = 84,000 J (84 kJ)."
  - id: oven-power
    type: numeric
    q: "A solar oven puts 84,000 J into a pot of water in 20 minutes. What is the oven's useful power, in watts?"
    answer: 70
    tolerancePct: 1
    unit: "W"
    explanation: "20 minutes = 1200 s. P = E ÷ t = 84,000 J ÷ 1200 s = 70 W."
  - id: sunlight-in
    type: numeric
    q: "Sunlight delivers about 1000 W on each square metre facing the sun. A solar oven's opening (including reflectors) catches sunlight over 0.25 m². How many watts of sunlight go in?"
    answer: 250
    tolerancePct: 1
    unit: "W"
    explanation: "1000 W/m² × 0.25 m² = 250 W."
  - id: efficiency
    type: numeric
    q: "250 W of sunlight goes into an oven, and 70 W ends up heating the water. What is the efficiency, as a percentage?"
    answer: 28
    tolerancePct: 1
    unit: "%"
    explanation: "Efficiency = useful power out ÷ power in × 100 = 70 ÷ 250 × 100 = 28%. The rest is reflected away or leaks out as heat."
  - id: wind-cube
    type: mcq
    q: "The power in the wind is proportional to the wind speed cubed (v³). If the wind speed doubles, the power available goes up by:"
    choices: ["2 times", "4 times", "8 times", "It stays the same"]
    answerIndex: 2
    explanation: "2³ = 2 × 2 × 2 = 8. That's why wind turbines are put on tall towers and windy hills: a little more wind speed gives a lot more power."
---
**Energy** is what it takes to make something happen: to heat it, move it, light it. It is measured in **joules (J)**. Energy is never used up; it's **transferred** from one store to another, and usually some ends up as heat that spreads into the surroundings.

## Heating things up

The energy needed to warm something depends on its mass, what it's made of, and how much hotter it gets:

$$Q = m\,c\,\Delta T$$

- $Q$: energy, in joules (J)
- $m$: mass, in kilograms (kg)
- $c$: **specific heat capacity**, the energy to warm 1 kg by 1 °C, in J/kg°C
- $\Delta T$: temperature change, in °C

| Material | c (J/kg°C) |
|---|---|
| Water | 4200 |
| Cooking oil | about 2000 |
| Aluminium | 900 |
| Iron | 450 |

Water has a very high specific heat capacity. It takes a lot of energy to warm up, and it gives a lot back as it cools.

## Power: how fast

**Power** is how fast energy is transferred:

$$P = \frac{E}{t}$$

measured in **watts (W)**, where 1 W = 1 J per second. A 1000 W electric kettle transfers 1000 J every second.

**Example.** Heating 1 kg of water from 20 °C to 92 °C (boiling in Addis) needs $Q = 1 \times 4200 \times 72 \approx 302{,}000$ J. A 1000 W kettle would take at least $302{,}000 \div 1000 \approx 300$ s, about 5 minutes. A solar oven giving 80 W would take more than an hour.

## Sunlight as a power source

On a clear day, sunlight delivers about **1000 W for every square metre** facing it. That's the most you can collect; the actual value depends on clouds, time of day and season.

$$P_{\text{in}} \approx 1000 \times A$$

where $A$ is the area catching sunlight, in m².

## Efficiency

No device turns all the energy that goes in into the energy you want:

$$\text{efficiency} = \frac{\text{useful energy (or power) out}}{\text{energy (or power) in}} \times 100\%$$

A box solar cooker is typically 20–40% efficient. The rest is reflected away, or leaks out through the walls and lid as heat.

## Power from moving air

Moving air has kinetic energy. The power flowing through a turbine's circle of blades is

$$P = \tfrac{1}{2}\,\rho\,A\,v^3$$

where $\rho$ is the density of air (about 1.0 kg/m³ in Addis, 1.2 kg/m³ at sea level), $A$ the area swept by the blades and $v$ the wind speed. Because of the $v^3$, doubling the wind speed gives **eight times** the power. No turbine can capture more than about 59% of this (the **Betz limit**); small home-built ones capture far less.
