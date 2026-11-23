---
title: Air and weather
summary: The ocean of air above us, how to measure rain, wind, pressure and humidity, and what the numbers say about tomorrow.
status: ai-draft
public: true
curriculum:
  - { subject: physics, grade: 9, unit: "Pressure" }
  - { subject: physics, grade: 10, unit: "Heat and the atmosphere" }
  - { subject: mathematics, grade: 9, unit: "Statistics: collecting and presenting data" }
problems:
  - id: rain-depth
    type: numeric
    q: "A rain gauge funnel is 10 cm across, so its opening has an area of about 78.5 cm². After a storm, the bottle holds 157 mL (157 cm³) of water. How many millimetres of rain fell?"
    answer: 20
    tolerancePct: 2
    unit: "mm"
    explanation: "Depth = volume ÷ area = 157 cm³ ÷ 78.5 cm² = 2.0 cm = 20 mm. Rain is always reported as a depth, so gauges of any size give the same answer."
  - id: roof-water
    type: numeric
    q: "1 mm of rain falling on 1 m² gives 1 litre of water. How many litres could a 100 m² tin roof collect from a 15 mm shower?"
    answer: 1500
    tolerancePct: 1
    unit: "L"
    explanation: "Each square metre collects 15 L, so 100 m² collects 100 × 15 = 1500 L, enough to fill seven 200 L barrels."
  - id: cup-speed
    type: numeric
    q: "The cups of an anemometer go round a circle of radius 0.10 m. They make 3 complete turns per second. How fast are the cups moving, in m/s? (Circumference = 2πr)"
    answer: 1.88
    tolerancePct: 2
    unit: "m/s"
    explanation: "One turn = 2π × 0.10 = 0.628 m. Three turns per second = 3 × 0.628 = 1.88 m/s. The wind is faster than the cups (usually 2–3 times), so the anemometer must be calibrated."
  - id: falling-pressure
    type: mcq
    q: "Over a day, the air pressure at your weather station falls steadily. What is that usually a sign of?"
    choices: ["Clear, dry weather on the way", "Clouds and rain becoming more likely", "An earthquake", "Nothing: pressure never changes"]
    answerIndex: 1
    explanation: "Falling pressure often means rising air nearby. Rising air cools, its water vapour condenses into clouds, and rain becomes more likely. Rising pressure usually means sinking air and clearer skies."
  - id: wet-bulb
    type: mcq
    q: "In a wet-and-dry-bulb hygrometer, the wet thermometer reads 6 °C lower than the dry one. What does a big difference like that mean?"
    choices: ["The air is very humid", "The air is dry: water evaporates fast from the wet cloth and cools it", "The thermometers are broken", "It is about to rain"]
    answerIndex: 1
    explanation: "Evaporation takes heat away. In dry air, water evaporates quickly from the wet cloth, cooling the wet bulb a lot. In very humid air, little evaporates and the two readings are almost the same."
---
We live at the bottom of an ocean of air about 100 km deep. Its movements, warming and cooling are the **weather**. Meteorologists measure a few key quantities, many times a day, in thousands of places, and use the patterns to forecast.

## What's in the air

Dry air is about 78% nitrogen, 21% oxygen, and 1% argon, carbon dioxide and other gases. It also carries **water vapour**, an invisible gas, anywhere from almost 0% to about 4%. Water vapour is what makes clouds and rain.

## Air pressure

The weight of the air above pushes down on everything: this is **air pressure**. It's measured with a **barometer**, in hectopascals (hPa): 1 hPa = 100 Pa.

- At sea level: about 1013 hPa.
- In Addis Ababa (about 2,350 m): about 770 hPa, because there's less air above.

The pressure at one place changes a little from day to day, by a few hPa, as air rises and sinks. What matters for forecasting is the **change**:

| Pressure trend | Usual meaning |
|---|---|
| Falling | air rising nearby; clouds and rain more likely |
| Steady | little change |
| Rising | air sinking; clearer, drier weather |

## Rain

Rain is measured as a **depth** in millimetres: how deep the water would be if none ran off or soaked in.

$$\text{depth} = \frac{\text{volume collected}}{\text{area of the opening}}$$

Keep units consistent: cm³ ÷ cm² gives cm. Multiply by 10 for mm. A handy fact: **1 mm of rain on 1 m² is 1 litre**.

## Wind

Wind is air moving from higher to lower pressure. We measure:

- **Direction**: where it comes **from** (a "north wind" blows from the north), with a wind vane.
- **Speed**, with an anemometer. A cup anemometer spins faster in stronger wind. The cups move at $2\pi r \times$ (turns per second), and the wind speed is roughly 2–3 times that. A home-made one must be **calibrated** against a known speed.

## Humidity

**Relative humidity** (RH) compares how much water vapour the air holds with the most it could hold at that temperature. 100% means saturated: clouds, fog or dew form.

A **wet-and-dry-bulb hygrometer** uses two thermometers, one with its bulb wrapped in a wet cloth. Evaporation cools the wet bulb. The drier the air, the faster the evaporation and the **bigger the difference**. A table converts the dry reading and the difference into RH.

## Ethiopia's seasons

| Season | Months (roughly) | Weather in the highlands |
|---|---|---|
| **Bega** | October–January | dry, sunny days, cold nights |
| **Belg** | February–May | short, irregular rains |
| **Kiremt** | June–September | the main rains, cloudy and cool |

Most farming in the highlands depends on kiremt. A late or weak kiremt can mean a poor harvest, which is why good forecasts matter so much.

## From data to forecast

The simplest forecast is **persistence**: "tomorrow will be like today". It's right surprisingly often. A forecast is only useful if it does **better** than persistence. To test yours, keep score: record each forecast, then what actually happened, and count how often each method was right.
