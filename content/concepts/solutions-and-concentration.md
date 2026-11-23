---
title: Solutions and concentration
summary: What happens when something dissolves, how strong a solution is, and how to dilute one exactly.
status: ai-draft
public: true
curriculum:
  - { subject: chemistry, grade: 9, unit: "Solutions" }
  - { subject: chemistry, grade: 10, unit: "Solutions and concentration" }
problems:
  - id: sugar-gpl
    type: numeric
    q: "You dissolve 5 g of sugar in water to make 250 mL of solution. What is its concentration in g/L?"
    answer: 20
    tolerancePct: 1
    unit: "g/L"
    explanation: "250 mL = 0.250 L. Concentration = mass ÷ volume = 5 g ÷ 0.250 L = 20 g/L."
  - id: dilute
    type: numeric
    q: "You take 10 mL of a 40 g/L solution and add water until you have 200 mL. What is the new concentration?"
    answer: 2
    tolerancePct: 1
    unit: "g/L"
    explanation: "C₁V₁ = C₂V₂, so C₂ = (40 × 10) ÷ 200 = 2 g/L. The amount of solute (0.4 g) stays the same; it's just spread through 20 times more liquid."
  - id: coffee-tds
    type: numeric
    q: "A cup holds 200 g of brewed coffee, and 1.3% of its mass is dissolved coffee solids. How many grams of coffee solids are dissolved in it?"
    answer: 2.6
    tolerancePct: 2
    unit: "g"
    explanation: "1.3% of 200 g = 0.013 × 200 = 2.6 g. Everything else in the cup, about 197 g, is water."
  - id: hot-dissolves
    type: mcq
    q: "Why does sugar dissolve faster in hot tea than in cold water?"
    choices: ["Hot water particles move faster, so they pull sugar particles away more quickly", "Sugar melts in hot water", "Hot water has more water particles in it", "It doesn't: it's the same speed"]
    answerIndex: 0
    explanation: "Dissolving happens when water particles surround and carry away sugar particles. Faster-moving particles do this more quickly. Hot water also holds more dissolved sugar before it becomes saturated."
  - id: ppm
    type: mcq
    q: "In water, 1 mg/L is the same as 1 part per million (ppm). A chlorine level of 0.5 mg/L is therefore:"
    choices: ["0.5 ppm", "5 ppm", "500 ppm", "0.5%"]
    answerIndex: 0
    explanation: "One litre of water has a mass of about 1,000,000 mg, so 1 mg in a litre is one part in a million. 0.5 mg/L = 0.5 ppm."
---
Stir a spoon of sugar into tea, and it vanishes. It hasn't gone: it has **dissolved**, spreading out as particles far too small to see between the water particles.

## The words

- **Solute**: the thing that dissolves (sugar, salt, coffee flavours).
- **Solvent**: the liquid it dissolves in (usually water).
- **Solution**: the mixture you get. It is clear (though it may be coloured) and never settles out.
- **Soluble / insoluble**: dissolves / doesn't dissolve. Sand is insoluble in water.
- **Saturated**: holding as much solute as it can at that temperature. Add more and it just sits at the bottom.

## Concentration

Concentration tells you how much solute is in a certain amount of solution.

$$\text{concentration (g/L)} = \frac{\text{mass of solute (g)}}{\text{volume of solution (L)}}$$

Other ways to say it:

| Unit | Meaning | Used for |
|---|---|---|
| g/L | grams per litre | lab solutions |
| mg/L or ppm | milligrams per litre; for water, the same as parts per million | chlorine, minerals in drinking water |
| % by mass | grams per 100 g of solution | coffee strength, sugar syrups |

## Dilution

Adding water makes a solution weaker, but the amount of solute doesn't change. So:

$$C_1 V_1 = C_2 V_2$$

$C_1, V_1$ are the concentration and volume before; $C_2, V_2$ after.

**Example.** How do you make 500 mL of 2 g/L salt solution from a 50 g/L stock? $V_1 = (2 \times 500) \div 50 = 20$ mL. Measure 20 mL of stock and add water to 500 mL.

## A dilution series

Make a solution, then dilute half of it with an equal amount of water, then half of that, and so on. You get 100%, 50%, 25%, 12.5%… Put them side by side and you have a **colour scale**: compare an unknown sample against it to estimate its concentration. Chemists use the same idea in a colorimeter.

## Faster dissolving

A solute dissolves faster when:

- the solvent is **hotter** (particles move faster),
- it is **stirred** (fresh solvent keeps reaching the solid),
- the solid is in **smaller pieces** (more surface for the solvent to attack).

That's why finely ground coffee gives a strong brew quickly, and why a sugar cube dissolves more slowly than loose sugar.

## Extraction

Brewing coffee or tea is an **extraction**: water dissolves *some* substances out of a solid and leaves the rest. Different substances dissolve at different speeds. In coffee, sour-tasting acids dissolve first and bitter compounds later, so brewing time and grind size change the taste.
