---
title: Enzymes
summary: The proteins that speed up the chemistry of life, why each one does only one job, and why heat and acid can stop them.
status: ai-draft
public: false
curriculum:
  - { subject: biology, grade: 10, unit: "Food and nutrition: enzymes" }
  - { subject: biology, grade: 11, unit: "Biochemical molecules" }
problems:
  - id: amylase-job
    type: mcq
    q: "What does the enzyme amylase, found in saliva and germinating grains, do?"
    choices: ["Turns sugar into starch", "Breaks starch down into sugar", "Breaks fat into soap", "Makes protein from sugar"]
    answerIndex: 1
    explanation: "Amylase breaks the long chains of starch into small sugar molecules (maltose). Chew a piece of plain bread for a minute and it starts to taste sweet: that's your amylase at work."
  - id: boiled-enzyme
    type: mcq
    q: "Saliva that has been boiled no longer breaks down starch. Why?"
    choices: ["Boiling removes the water from the saliva", "Heat changed the enzyme's shape permanently, so its active site no longer fits starch", "Boiling turns amylase into starch", "The enzyme was used up"]
    answerIndex: 1
    explanation: "Enzymes are proteins with a precise 3D shape. High temperatures shake the shape apart (denaturing it). The active site no longer fits the starch molecule, and cooling it again doesn't bring the shape back."
  - id: rate-from-time
    type: numeric
    q: "At 37 °C, saliva digests all the starch in a tube in 2.5 minutes. At 20 °C it takes 10 minutes. How many times faster is the reaction at 37 °C?"
    answer: 4
    tolerancePct: 1
    explanation: "Rate is proportional to 1 ÷ time. 10 ÷ 2.5 = 4, so the reaction is 4 times faster at 37 °C."
  - id: rate-value
    type: numeric
    q: "If the starch disappears in 4 minutes, what is the rate of reaction, measured as 1 ÷ time?"
    answer: 0.25
    tolerancePct: 1
    unit: "per min"
    explanation: "Rate = 1 ÷ 4 min = 0.25 per minute. Using 1/time lets you plot rate against temperature: faster reactions give bigger numbers."
  - id: protease-in-pineapple
    type: mcq
    q: "Fresh pineapple juice contains bromelain, an enzyme that breaks down proteins. What kind of enzyme is it?"
    choices: ["An amylase", "A protease", "A lipase", "It isn't an enzyme"]
    answerIndex: 1
    explanation: "Enzymes that break down proteins are proteases. Bromelain (pineapple) and papain (papaya) are used as meat tenderisers, and in DNA extraction to break down the proteins wrapped around DNA."
---
A slice of bread left in your mouth slowly turns sweet. Starch, a long chain molecule, is being cut into sugar. Without help, this reaction would take years. In your mouth it takes a minute, because of an **enzyme**.

## What enzymes are

Enzymes are **biological catalysts**: they speed up chemical reactions in living things without being used up. Every enzyme is a **protein**, a long chain folded into a precise 3D shape.

Some important enzymes:

| Enzyme | Breaks down | Into | Found in |
|---|---|---|---|
| Amylase | starch | sugars (maltose) | saliva, germinating teff and barley (malt), some microbes |
| Protease | proteins | amino acids | stomach, pineapple (bromelain), papaya (papain), meat tenderiser |
| Lipase | fats and oils | fatty acids and glycerol | small intestine, some washing powders |

## Lock and key

Each enzyme has a pocket called the **active site**. Only a molecule of the right shape, the **substrate**, fits in it, like a key in a lock. The enzyme holds the substrate in a way that makes it easy to break (or join), releases the products, and is ready for the next one.

That's why each enzyme does only **one** job: amylase can't digest protein.

## Temperature

- **Cold:** molecules move slowly and meet less often. The reaction is slow, but the enzyme isn't harmed.
- **Warmer:** faster collisions, faster reaction, up to the **optimum** temperature (about 37 °C for human enzymes).
- **Too hot:** the protein's shape shakes apart. The active site no longer fits. The enzyme is **denatured**, and the damage is permanent.

A graph of rate against temperature rises to a peak, then falls steeply.

## pH

Each enzyme also has an **optimum pH**. Amylase in saliva works best near neutral (pH 7); the protease in your stomach works best in strong acid (pH 2). Far from its optimum pH, an enzyme's shape changes and it stops working.

## Measuring an enzyme reaction

For amylase, use the iodine test:

1. Mix starch solution and enzyme (diluted saliva or malt water) at a chosen temperature.
2. Every 30 seconds, put a drop of the mixture into a drop of iodine on a white tile.
3. At first: **blue-black** (starch is there). When the iodine stays **brown**, the starch is gone.
4. Record the time. The rate is

$$\text{rate} = \frac{1}{\text{time}}$$

A shorter time means a faster rate.

## Enzymes in food and cooking

- In **injera** batter, amylases from teff and from microbes turn starch into sugars that the yeast and bacteria then ferment.
- **Malt** (bikil): barley is germinated so its amylase switches on, then dried. It's used in tella to turn starch into sugar for the yeast.
- Cooking denatures enzymes. That's one reason blanching vegetables stops them going brown.
