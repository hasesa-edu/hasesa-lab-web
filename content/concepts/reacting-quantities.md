---
title: Reacting quantities
summary: How chemists work out exactly how much of each ingredient a reaction needs, using ratios, and why a soap-maker leaves a little oil spare.
status: ai-draft
public: false
curriculum:
  - { subject: chemistry, grade: 10, unit: "Chemical reactions and stoichiometry" }
  - { subject: mathematics, grade: 9, unit: "Ratio, proportion and percentage" }
problems:
  - id: olive-lye
    type: numeric
    q: "Olive oil has a saponification value of 0.135: each gram needs 0.135 g of sodium hydroxide to turn completely into soap. How much sodium hydroxide reacts with 500 g of olive oil?"
    answer: 67.5
    tolerancePct: 1
    unit: "g"
    explanation: "500 g × 0.135 = 67.5 g of NaOH."
  - id: superfat
    type: numeric
    q: "A soap-maker uses 5% less sodium hydroxide than the full amount, so some oil is left over (a 5% superfat). How much NaOH should they use for 500 g of olive oil (full amount 67.5 g)?"
    answer: 64.1
    tolerancePct: 1
    unit: "g"
    explanation: "95% of 67.5 g = 0.95 × 67.5 = 64.1 g. The small excess of oil makes sure no unreacted lye is left in the soap."
  - id: blend
    type: numeric
    q: "A recipe uses 200 g of coconut oil (SAP 0.183) and 300 g of olive oil (SAP 0.135). How much NaOH is needed for complete saponification, with no superfat?"
    answer: 77.1
    tolerancePct: 1
    unit: "g"
    explanation: "Coconut: 200 × 0.183 = 36.6 g. Olive: 300 × 0.135 = 40.5 g. Total: 36.6 + 40.5 = 77.1 g. Each oil needs its own amount; add them up."
  - id: scale-down
    type: numeric
    q: "A recipe for 1000 g of oil needs 135 g of NaOH. How much NaOH is needed for 300 g of the same oil?"
    answer: 40.5
    tolerancePct: 1
    unit: "g"
    explanation: "The ratio stays the same: 135 ÷ 1000 = 0.135 g per gram of oil. 300 × 0.135 = 40.5 g. Or: 300 g is 0.3 of the recipe, so 0.3 × 135 = 40.5 g."
  - id: limiting
    type: mcq
    q: "In a soap mixture, there is more oil than the sodium hydroxide can react with. Which one is the limiting reactant (the one that runs out first)?"
    choices: ["The oil", "The sodium hydroxide", "The water", "Neither: they always run out together"]
    answerIndex: 1
    explanation: "The reactant that gets used up first limits how much product forms. Here the sodium hydroxide runs out, and some oil is left over. That's exactly what the soap-maker wants."
---
Baking injera, mixing concrete or making soap: get the proportions wrong and the result fails. In chemistry, getting proportions right is called **stoichiometry**. It decides whether a reaction uses everything up or leaves some behind.

## Reactions happen in fixed ratios

A chemical equation tells you how many particles react with how many. In soap-making, every fat molecule needs **exactly three** NaOH units:

$$\text{fat} + 3\,\text{NaOH} \rightarrow 3\ \text{soap} + \text{glycerol}$$

Because particles have fixed masses, the reaction also needs a **fixed mass ratio**. So a given mass of oil always needs the same mass of sodium hydroxide.

## Saponification (SAP) values

Soap-makers use a **SAP value** for each oil: the grams of NaOH needed to saponify 1 g of that oil completely.

| Oil | SAP value (g NaOH per g oil, approximate) |
|---|---|
| Coconut oil | 0.183 |
| Palm oil | 0.142 |
| Olive oil | 0.135 |
| Sunflower oil | 0.134 |
| Shea butter | 0.128 |

Oils with shorter fatty-acid chains (like coconut) have more molecules per gram, so they need more NaOH.

$$\text{mass of NaOH} = \text{mass of oil} \times \text{SAP value}$$

For a blend, work out each oil separately and add them up.

## Limiting and excess reactants

If you mix reactants in exactly the right ratio, both are used up. If not, one runs out first: the **limiting reactant**. The other is **in excess** and some is left over.

In soap, an excess of lye would leave the bar caustic and harmful. So soap-makers deliberately make the **oil** slightly in excess. This is called **superfatting**:

$$\text{NaOH to use} = \text{full amount} \times \left(1 - \frac{\text{superfat \%}}{100}\right)$$

A 5% superfat means using 95% of the full amount of NaOH.

## Worked example

Recipe: 300 g sunflower oil + 200 g coconut oil, 5% superfat.

1. Sunflower: 300 × 0.134 = 40.2 g
2. Coconut: 200 × 0.183 = 36.6 g
3. Full amount: 40.2 + 36.6 = 76.8 g
4. With superfat: 76.8 × 0.95 = 73.0 g of NaOH

The water used to dissolve the lye is usually about 2–3 times the mass of the lye (here, about 150–220 g).

## Scaling recipes

Ratios stay the same at any scale. To scale a recipe, multiply **every** amount by the same factor. A recipe for 1000 g of oil scaled to 300 g uses a factor of 0.3 for the oil, the lye and the water.

## Check your answer

- Does the NaOH come out at roughly 12–19% of the oil's mass? If not, check your working.
- Have you applied the superfat **after** adding up all the oils?
- Are all masses in grams?
