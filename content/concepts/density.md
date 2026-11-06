---
title: Density
summary: How much mass is packed into each millilitre, and why it gives fakers away.
status: ai-draft
public: true
curriculum:
  - { subject: physics, grade: 9, unit: "Physical quantities and measurement" }
  - { subject: chemistry, grade: 9, unit: "Measurements and scientific methods" }
problems:
  - id: honey-density
    type: numeric
    q: "A syringe holds 15.0 mL of honey. The honey has a mass of 21.0 g. What is its density?"
    answer: 1.40
    tolerancePct: 1
    unit: "g/mL"
    explanation: "ρ = m/V = 21.0 g ÷ 15.0 mL = 1.40 g/mL. That is inside the normal range for real honey (about 1.36–1.45 g/mL)."
  - id: bottle-method
    type: numeric
    q: "An empty bottle has a mass of 26.1 g. Filled to the brim with water it is 276.1 g. Filled to the brim with milk it is 283.6 g. What is the density of the milk? (Water is 1.00 g/mL.)"
    answer: 1.030
    tolerancePct: 0.3
    unit: "g/mL"
    explanation: "Water inside: 276.1 − 26.1 = 250.0 g, so the bottle holds 250.0 mL. Milk inside: 283.6 − 26.1 = 257.5 g. ρ = 257.5 g ÷ 250.0 mL = 1.030 g/mL, normal for whole milk."
  - id: volume-from-mass
    type: numeric
    q: "A trader sells you 70 g of honey with density 1.40 g/mL. What volume of honey is that?"
    answer: 50
    tolerancePct: 1
    unit: "mL"
    explanation: "Rearrange ρ = m/V to V = m/ρ. V = 70 g ÷ 1.40 g/mL = 50 mL."
  - id: watered-milk-mix
    type: numeric
    q: "50 mL of whole milk (density 1.032 g/mL) is mixed with 50 mL of water (1.000 g/mL). Assuming the volumes simply add, what is the density of the mixture?"
    answer: 1.016
    tolerancePct: 0.5
    unit: "g/mL"
    explanation: "Mass of milk = 50 × 1.032 = 51.6 g. Mass of water = 50 × 1.000 = 50.0 g. Total mass 101.6 g in 100 mL, so ρ = 1.016 g/mL. Watering milk always pulls its density towards 1.000."
  - id: how-much-water
    type: numeric
    q: "Genuine milk from a farm measures 1.030 g/mL. The market sample measures 1.020 g/mL. If the faker only added water (1.000 g/mL), roughly what percentage of the market sample, by volume, is added water?"
    answer: 33
    tolerancePct: 5
    unit: "%"
    explanation: "Let x be the water fraction. Then 1.030(1 − x) + 1.000x = 1.020, so 1.030 − 0.030x = 1.020, giving x = 0.010 ÷ 0.030 = 0.33. About 33% of the sample is added water: one glass of water for every two of milk."
  - id: lactometer
    type: mcq
    q: "A lactometer is a float that is placed in milk. In which milk will it float highest?"
    choices: ["Milk with lots of added water", "Genuine whole milk", "It floats at the same height in both"]
    answerIndex: 1
    explanation: "A float sinks until it pushes aside its own weight of liquid. Denser liquid gives more push per millilitre, so the float needs to sink less and rides higher. Genuine milk (≈1.030 g/mL) is denser than watered milk, so the lactometer floats higher in it."
---
Pick up a 250 mL glass of water and a 250 mL glass of honey. The honey feels heavier, even though the glasses are the same size. Honey packs more mass into each millilitre. That "packing" is called **density**.

## The formula

$$\rho = \frac{m}{V}$$

- $\rho$ (the Greek letter *rho*) is density.
- $m$ is mass, measured in grams (g) on a scale.
- $V$ is volume, measured in millilitres (mL). One millilitre is the same as one cubic centimetre (cm³), so g/mL and g/cm³ are the same unit.

Water has a density of about **1.00 g/mL**. Anything denser than water sinks in it, and anything less dense floats (if it does not dissolve).

## Why density catches fakers

Density does not depend on how much you have. A spoon of honey and a whole jar of the same honey have the same density. So a pure food has a "fingerprint" density:

| Substance | Density (g/mL) |
|---|---|
| Water | 1.00 |
| Whole milk | 1.028–1.034 |
| Real honey | 1.36–1.45 |
| Thin sugar syrup (1 sugar : 1 water) | about 1.23 |

Mix a fake into a food and the density moves towards the density of the fake. Watered milk drifts towards 1.00. Honey stretched with thin syrup drops below 1.36.

## Worked example 1: honey

You fill a syringe to 20.0 mL with honey. Its mass is 26.5 g.

$$\rho = \frac{26.5\ \text{g}}{20.0\ \text{mL}} \approx 1.33\ \text{g/mL}$$

That is below the range for real honey. Suspicious!

## Worked example 2: the bottle trick for milk

Milk is only a little denser than water, so a small error in reading the volume can hide the difference. A clever trick: use one bottle, filled to the brim each time.

1. Empty bottle: 26.1 g.
2. Full of water: 276.1 g, so it holds 250.0 g of water, which is **250.0 mL**.
3. Full of milk: 283.6 g, so the milk's mass is 257.5 g.

$$\rho = \frac{257.5}{250.0} = 1.030\ \text{g/mL}$$

Using water to measure the volume avoids reading a scale on a cylinder at all.

## Rearranging

The same formula can find mass or volume:

$$m = \rho V \qquad V = \frac{m}{\rho}$$

For example, 50 mL of honey at 1.40 g/mL has mass $1.40 \times 50 = 70$ g.

## Be a careful measurer

- A scale reading to 0.1 g is uncertain by about 0.1 g. On 2.0 g that is 5%; on 20 g it is only 0.5%. **Measure bigger amounts** for better accuracy.
- Warm liquids expand, so their density drops a little. Compare samples at the **same temperature**.
- Density alone is not proof. A faker can add flour to watered milk to push its density back up. That is why detectives use several tests.
