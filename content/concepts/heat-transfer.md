---
title: Heat transfer
summary: Conduction, convection and radiation - the three ways heat moves - and how to trap it or keep it out.
status: ai-draft
public: true
curriculum:
  - { subject: physics, grade: 9, unit: "Heat and temperature" }
  - { subject: physics, grade: 10, unit: "Thermal energy and its transfer" }
problems:
  - id: black-can
    type: mcq
    q: "A black can and a shiny foil-covered can of water sit in the sun for 30 minutes. Which gets hotter, and why?"
    choices: ["The shiny can, because metal conducts heat", "The black can, because black surfaces absorb more of the sun's radiation", "They stay the same: the sun heats everything equally", "The shiny can, because it reflects heat inwards"]
    answerIndex: 1
    explanation: "Dark, dull surfaces absorb most of the light that falls on them and turn it into heat. Shiny surfaces reflect most of it away. That's why a solar cooker's pot is black but its reflectors are shiny."
  - id: lid-on
    type: mcq
    q: "Why does a clear plastic or glass lid help a solar oven get hotter?"
    choices: ["It focuses sunlight like a magnifying glass", "It lets sunlight in but stops warm air escaping, cutting heat loss by convection", "It makes the oven heavier", "It cools the pot so it can absorb more"]
    answerIndex: 1
    explanation: "Sunlight passes through the clear lid and is absorbed inside. The warmed air can't rise out and be replaced by cold air, so the heat stays in. Glass also blocks much of the infrared given off by the hot pot, a small extra effect."
  - id: wooden-spoon
    type: mcq
    q: "Why do people stir a hot pot of wot with a wooden spoon rather than a metal one?"
    choices: ["Wood is a poor conductor, so heat doesn't travel up it to your hand", "Wood is a good conductor", "Metal makes the wot taste bad", "Wood absorbs radiation"]
    answerIndex: 0
    explanation: "Metals are good conductors: their particles and free electrons pass energy along quickly. Wood is an insulator, so the handle stays cool."
  - id: rate-of-loss
    type: numeric
    q: "A pot of water cools from 80 °C to 62 °C in 6 minutes with no lid, and from 80 °C to 74 °C in 6 minutes with an insulated lid. How many times faster did it cool without the lid?"
    answer: 3
    tolerancePct: 2
    explanation: "Without the lid it lost 18 °C; with the lid, 6 °C, in the same time. 18 ÷ 6 = 3 times faster."
  - id: convection-direction
    type: mcq
    q: "In a room heated by a charcoal stove on the floor, where is the air warmest?"
    choices: ["Near the floor", "Near the ceiling", "It is the same everywhere", "Near the walls"]
    answerIndex: 1
    explanation: "Air heated by the stove expands, becomes less dense and rises. Cooler, denser air sinks to replace it. This loop is a convection current, and it leaves the warmest air at the top."
---
Heat always flows from **hotter** places to **colder** ones, until they reach the same temperature. It travels in three ways.

## Conduction: passing it along

When one end of a metal spoon is in hot tea, its particles vibrate faster and bump their neighbours, passing the energy along the spoon to your fingers. This is **conduction**. It happens mostly in solids.

- **Good conductors**: metals (copper, aluminium, iron).
- **Poor conductors (insulators)**: wood, plastic, cloth, paper, and especially **still air**. Wool, feathers and crumpled newspaper insulate well because they trap lots of air.

## Convection: hot fluids rise

When air or water is heated, it expands and becomes **less dense**, so it rises. Cooler, denser fluid sinks to take its place. This circulation is a **convection current**.

- Smoke from a fire rises.
- Water in a pot on a stove circulates from the bottom to the top.
- An open box in the sun loses heat as warm air rises out and cool air flows in.

Stopping the air from moving (a lid, a closed box) stops convection.

## Radiation: heat you can feel from far away

The sun's energy crosses 150 million km of empty space to reach us. Nothing carries it; it travels as **electromagnetic radiation** (visible light and infrared). Everything warm also gives off infrared: you can feel it from a charcoal fire across the room.

| Surface | Absorbs radiation | Gives off radiation | Reflects radiation |
|---|---|---|---|
| Black, dull | very well | very well | poorly |
| White | poorly | poorly | well |
| Shiny metal (foil) | very poorly | very poorly | very well |

## Putting it together: a solar oven

A good solar oven uses all three ideas:

1. **Shiny reflectors** bounce extra sunlight into the box (radiation).
2. A **black pot** absorbs it and turns it into heat (radiation).
3. A **clear lid** lets light in but keeps warm air from escaping (stops convection).
4. **Insulation** (crumpled paper, cloth, straw) around the box slows heat leaking through the walls (stops conduction).

## Measuring heat transfer

You can compare designs by how **fast** the temperature changes. Measure the temperature every few minutes, then plot it. The steeper the line, the faster the heat is flowing in (or out). Always compare at the same starting temperature, because heat flows faster when the temperature difference is bigger.
