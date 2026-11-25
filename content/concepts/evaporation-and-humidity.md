---
title: Evaporation and humidity
summary: Why evaporating water takes heat away, what makes it evaporate faster, and why dry air cools better than wet air.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 9, unit: "Heat and temperature" }
  - { subject: physics, grade: 10, unit: "Thermal energy and its transfer" }
  - { subject: physics, grade: 10, unit: "Heat and the atmosphere" }
problems:
  - id: why-it-cools
    type: mcq
    q: "Why does a wet cloth around a bottle make the water inside cooler than the air?"
    choices: ["The cloth blocks the sun's radiation", "The fastest water particles escape from the cloth as vapour, taking energy with them, so what is left gets colder", "Cold water from the tap soaks through the bottle", "Wet cloth is a good insulator, so it keeps cold in"]
    answerIndex: 1
    explanation: "Evaporation is the escape of the most energetic particles from the surface. They carry energy away, so the average energy (the temperature) of the water left behind drops. The cloth then takes heat from the bottle, which is warmer than it."
  - id: energy-to-evaporate
    type: numeric
    q: "Evaporating 1 g of water at everyday temperatures takes about 2,400 J. A zeer pot loses 10 g of water from its sand in a few minutes. How much energy did that water carry away, in joules?"
    answer: 24000
    tolerancePct: 2
    unit: "J"
    explanation: "Energy = mass × latent heat = 10 g × 2,400 J/g = 24,000 J."
  - id: cool-the-water
    type: numeric
    q: "If those 24,000 J were all taken from 2 kg (2,000 g) of water inside the pot, how much would its temperature fall? Warming or cooling 1 g of water by 1 °C takes 4.2 J. Give your answer in °C to 1 decimal place."
    answer: 2.9
    tolerancePct: 3
    unit: "°C"
    explanation: "Temperature change = energy ÷ (mass × 4.2) = 24,000 ÷ (2,000 × 4.2) = 24,000 ÷ 8,400 ≈ 2.9 °C. Evaporating just 10 g of water cools 2 kg by almost 3 °C: that is how powerful evaporation is."
  - id: best-place
    type: mcq
    q: "In which of these places would a clay pot fridge cool its contents the most below the air temperature?"
    choices: ["Addis Ababa in kiremt: 17 °C, very humid (80%)", "Semera in Afar on a dry afternoon: 38 °C, humidity 30%", "Inside a closed plastic bag on a table", "A steamy kitchen while wot is boiling"]
    answerIndex: 1
    explanation: "Cooling depends on how fast water can evaporate, and that depends on how dry the air is. Hot, dry air takes up water vapour fastest. In humid air, or air trapped in a bag or a steamy room, evaporation almost stops, and so does the cooling."
  - id: read-the-table
    type: numeric
    q: "Using the table in this unit, a wet-and-dry-bulb hygrometer in Addis Ababa reads 20 °C on the dry thermometer and 15 °C on the wet one. What is the relative humidity, in %?"
    answer: 62
    tolerancePct: 3
    unit: "%"
    explanation: "The difference is 20 − 15 = 5 °C. In the 20 °C row, under a difference of 5 °C, the table gives 62%."
  - id: fair-wind-test
    type: mcq
    q: "A team wants to test whether wind speeds up evaporation. Which plan is a fair test?"
    choices: ["Fan one wet cloth in the sun and leave another in the shade", "Fan one wet cloth and leave another still, both the same size, with the same mass of water, side by side, for the same time", "Fan a big wet towel and leave a small wet handkerchief still", "Fan one wet cloth for 5 minutes and leave the other for 30 minutes"]
    answerIndex: 1
    explanation: "Only the wind may change. Sun, cloth size, amount of water and time all affect evaporation too, so they must be kept the same, or you can't tell what caused the difference."
---
Hang wet washing on a line on a dry, windy day and it's dry in an hour. On a misty kiremt morning it can stay damp all day. Sweat cools you; the same sweat on a humid day just makes you sticky. All of this is **evaporation**.

## What evaporation is

Water is made of tiny particles that are always moving and bumping into each other. Some move fast, some slow. The **temperature** of the water measures their average energy.

At the surface, the **fastest** particles can break free of their neighbours and fly off into the air as an invisible gas: **water vapour**. This is evaporation. It happens at any temperature, not just at boiling point, but only at the **surface**.

## Why evaporation cools

The particles that escape are the fastest ones. They take their energy with them. The particles left behind are, on average, slower, so the water gets **colder**. It then takes heat from whatever it touches (your skin, a cloth, a clay pot) because heat always flows from hotter to colder.

The energy needed to turn liquid water into vapour, without changing its temperature, is called the **latent heat of vaporisation**. For water at everyday temperatures it is about

$$L \approx 2400 \text{ J per gram}$$

That's a lot. Compare it with warming water: it takes only about 4.2 J to warm 1 g of water by 1 °C. So:

$$\text{energy carried away} = m_{\text{evaporated}} \times L$$

$$\text{temperature drop of the contents} = \frac{\text{energy carried away}}{m_{\text{contents}} \times 4.2}$$

with masses in grams. Evaporating 1 g of water takes as much energy as cooling about 570 g of water by 1 °C.

## What makes water evaporate faster

| Factor | Faster evaporation when… | Why |
|---|---|---|
| **Humidity** | the air is dry | Dry air has room for more vapour. In saturated air, as many particles come back into the water as leave. |
| **Wind (air movement)** | air is moving | Moving air carries the damp layer away from the surface and brings drier air. |
| **Surface area** | the water is spread out | More surface means more places for particles to escape from. |
| **Temperature** | the water is warmer | More particles are fast enough to escape. |

Faster evaporation means faster cooling. A cooler made of wet clay works best in **hot, dry, breezy** air, and hardly works at all in still, humid air.

## Humidity and how to measure it

**Relative humidity** (RH) compares how much water vapour the air holds with the most it could hold at that temperature. At 100% the air is saturated: nothing more can evaporate, and dew or fog forms.

A **wet-and-dry-bulb hygrometer** has two thermometers. One measures the air (the **dry bulb**). The other has its bulb wrapped in a wet cloth (the **wet bulb**). Fan both for a minute: water evaporates from the wet cloth and cools that thermometer. The drier the air, the bigger the difference.

Relative humidity (%) from the dry-bulb reading and the difference, calculated for Addis Ababa's air pressure (about 770 hPa):

| Dry bulb | 1 °C | 2 °C | 3 °C | 4 °C | 5 °C | 6 °C | 7 °C | 8 °C | 10 °C |
|---|---|---|---|---|---|---|---|---|---|
| 15 °C | 91 | 82 | 73 | 65 | 57 | 49 | 42 | 35 | 21 |
| 20 °C | 92 | 84 | 76 | 69 | 62 | 55 | 49 | 43 | 31 |
| 25 °C | 93 | 85 | 79 | 72 | 66 | 60 | 54 | 48 | 38 |
| 30 °C | 93 | 87 | 80 | 74 | 69 | 63 | 58 | 53 | 43 |

The wet-bulb temperature is also the **lowest** temperature evaporation can cool anything to in that air. A clay pot fridge never quite reaches it, because heat leaks in from outside, but it gets closer the better it is made.

## Ethiopia: same pot, different places

| Place and season | Air | Humidity | Wet bulb (lowest possible) |
|---|---|---|---|
| Addis Ababa, bega afternoon | 23 °C | 35% | about 13 °C |
| Addis Ababa, kiremt | 17 °C | 80% | about 15 °C |
| Dire Dawa, dry season | 33 °C | 35% | about 21 °C |
| Semera (Afar), dry afternoon | 38 °C | 30% | about 24 °C |

In kiremt, a zeer in Addis can only cool by a couple of degrees. In the hot, dry lowlands it can cool by more than 10 °C, and that is exactly where food spoils fastest and electricity is scarcest.

## Doing it in real life

- **Sweating** cools your body; a breeze or a fan helps because it speeds up evaporation.
- A clay **ensira** (water jar) keeps drinking water cool: water seeps through the clay and evaporates from the outside.
- A **zeer** (pot-in-pot cooler) does the same for food: wet sand between two clay pots evaporates through the outer pot and draws heat out of the inner one.
