---
title: Pressure
summary: Force spread over an area, why squeezed air can launch a rocket, and why the air around you pushes on everything.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 9, unit: "Pressure" }
  - { subject: physics, grade: 10, unit: "Pressure in fluids" }
problems:
  - id: pressure-from-force
    type: numeric
    q: "A force of 200 N presses on an area of 0.0005 m². What is the pressure, in kilopascals (kPa)?"
    answer: 400
    tolerancePct: 1
    unit: "kPa"
    explanation: "P = F ÷ A = 200 N ÷ 0.0005 m² = 400,000 Pa. Divide by 1000 to get kilopascals: 400 kPa."
  - id: bottle-mouth-force
    type: numeric
    q: "A bottle's mouth has an area of 4.9 cm² (0.00049 m²). The air inside is pumped to 300 kPa above the air outside. What force, in newtons, does it put on the stopper?"
    answer: 147
    tolerancePct: 2
    unit: "N"
    explanation: "F = P × A = 300,000 Pa × 0.00049 m² = 147 N. That is about the weight of a 15 kg bag, pushing on a cork the size of a coin."
  - id: psi-to-kpa
    type: numeric
    q: "A bicycle pump gauge reads 50 psi. Using 1 psi ≈ 6.9 kPa, what is that in kPa?"
    answer: 345
    tolerancePct: 1
    unit: "kPa"
    explanation: "50 × 6.9 = 345 kPa. Gauges usually show pressure above the outside air, called gauge pressure."
  - id: why-pressure-rises
    type: mcq
    q: "You keep pumping air into a sealed bottle. Why does the pressure inside go up?"
    choices: ["The air particles get bigger", "More particles hit each bit of wall every second", "The bottle gets heavier, which pushes on the air", "The air turns into water"]
    answerIndex: 1
    explanation: "Gas pressure comes from countless particles hitting the walls. Pump in more particles and the same wall gets hit more often, so the push on each square centimetre rises."
  - id: sharp-knife
    type: mcq
    q: "Why does a sharp knife cut injera more easily than a blunt one, with the same push?"
    choices: ["The sharp edge has a smaller area, so the pressure is bigger", "The sharp knife is heavier", "The blunt knife has more pressure", "Sharpness doesn't change anything; it's the metal"]
    answerIndex: 0
    explanation: "P = F ÷ A. The same force on a tiny area gives a huge pressure. Snowshoes and wide tractor tyres use the opposite trick: a big area for a small pressure."
---
Press your thumb gently on a pin's flat head, and nothing happens. Press the same on the sharp end, and it hurts. The force is the same; what changes is the **area** it is spread over. Force per area is called **pressure**.

## The formula

$$P = \frac{F}{A}$$

- $P$: pressure, in pascals (Pa). 1 Pa = 1 N/m².
- $F$: force, in newtons (N), pushing straight onto the surface.
- $A$: area, in square metres (m²).

A pascal is tiny, so we often use **kilopascals**: 1 kPa = 1000 Pa.

Remember to convert areas: 1 cm² = 0.0001 m² ($10^{-4}$ m²).

## Pressure in gases

Air is made of particles flying around and bumping into everything. Each bump gives a tiny push. Billions of bumps every second, on every square centimetre, add up to a steady pressure.

The pressure of a trapped gas goes **up** when:

- you put **more** gas in the same space (pumping a tyre),
- you squeeze the **same** gas into a **smaller** space (pushing in a syringe with your finger on the end),
- you make it **hotter** (the particles move faster and hit harder).

## Air pressure all around you

The air above us has weight, so it presses on everything. At sea level, air pressure is about **101 kPa**. In Addis Ababa, about 2,350 m up, there is less air above you, so the pressure is only about **77 kPa**. That's one reason water boils at about 92 °C in Addis instead of 100 °C.

## Gauge pressure

A bicycle pump gauge shows how much **more** pressure there is inside than outside. This is called **gauge pressure**. Many gauges use **psi** (pounds per square inch) or **bar**:

| Unit | In kPa |
|---|---|
| 1 psi | about 6.9 kPa |
| 1 bar | 100 kPa |

## Worked example: why a rocket needs a strong bottle

A water rocket is pumped to 4 bar (400 kPa) gauge pressure. A 2-litre bottle's walls have an area of about 1,000 cm² = 0.1 m². The total outward force on the walls is

$$F = P A = 400{,}000 \times 0.1 = 40{,}000\ \text{N}$$

That is the weight of about four tonnes, spread around the bottle. Bottles made for fizzy drinks are designed to hold pressure; still-water bottles are thinner and can burst. That's why the launch rules set a pressure limit and only allow fizzy-drink bottles.
