---
title: Acids, bases and pH
summary: What sour and soapy have in common, how the pH scale works, and how indicators read it.
status: ai-draft
public: false
curriculum:
  - { subject: chemistry, grade: 10, unit: "Acids, bases and salts" }
  - { subject: chemistry, grade: 11, unit: "Acid–base equilibrium" }
problems:
  - id: more-basic
    type: mcq
    q: "Fresh milk has pH 6.7. A suspect milk has pH 8.3. Which statement is correct?"
    choices: ["The suspect milk is more acidic", "The suspect milk is more basic (alkaline)", "Both are neutral", "pH cannot be used for milk"]
    answerIndex: 1
    explanation: "Higher pH means more basic. pH 8.3 is above neutral (7), while fresh milk is slightly acidic. Baking soda solution is about pH 8.3, a strong hint about what was added."
  - id: times-more-acidic
    type: numeric
    q: "How many times more hydrogen ions (H⁺) are there in a solution of pH 5 than in one of pH 7?"
    answer: 100
    tolerancePct: 1
    explanation: "Each step of 1 on the pH scale is a factor of 10. From pH 7 to pH 5 is two steps: 10 × 10 = 100 times more H⁺."
  - id: h-concentration
    type: numeric
    q: "Lemon juice has pH 3. What is its hydrogen ion concentration in mol/L?"
    answer: 0.001
    tolerancePct: 2
    unit: "mol/L"
    explanation: "[H⁺] = 10^(−pH) = 10^(−3) = 0.001 mol/L (you can type 1e-3)."
  - id: milk-ratio
    type: numeric
    q: "Fresh milk is pH 6.7; a suspect milk is pH 8.2. How many times LOWER is the H⁺ concentration in the suspect milk? (Give your answer to the nearest whole number.)"
    answer: 32
    tolerancePct: 3
    explanation: "The pH difference is 8.2 − 6.7 = 1.5, so the ratio is 10^1.5 ≈ 31.6, about 32 times fewer H⁺ ions. Even a small-looking pH change is a big chemical change."
  - id: cabbage-colour
    type: mcq
    q: "Red cabbage indicator is purple in water. You add a few drops to a weak baking soda solution. What colour do you expect?"
    choices: ["Bright red", "Pink", "Blue to blue-green", "Colourless"]
    answerIndex: 2
    explanation: "Red cabbage turns red-pink in acid, purple near neutral, and blue to green in bases. Baking soda solution is weakly basic (about pH 8–8.5), so it turns blue or blue-green."
  - id: why-soda
    type: mcq
    q: "Why might a dishonest milk seller add baking soda to old milk?"
    choices: ["To make it sweeter", "To neutralise the lactic acid from souring, so the milk does not taste sour or curdle when boiled", "To add protein", "To make it whiter"]
    answerIndex: 1
    explanation: "Souring milk makes lactic acid. Baking soda (sodium hydrogen carbonate, a base) neutralises acid, hiding the sourness. But if too much is added, the milk becomes basic, which an indicator can catch."
---
Lemon juice and sour milk taste sour. Soap and baking soda solution feel slippery. These are the two "families" of chemistry: **acids** and **bases**.

## Acids and bases

- An **acid** releases **hydrogen ions**, H⁺, in water. Examples: lemon juice (citric acid), vinegar (acetic acid), sour milk and ergo (lactic acid).
- A **base** removes H⁺, often by providing hydroxide ions, OH⁻, which join with H⁺ to make water. Examples: baking soda, soap, wood ash in water.
- When an acid meets a base they cancel each other out: this is **neutralisation**.

Baking soda (sodium hydrogen carbonate) neutralises lactic acid and makes carbon dioxide gas:

$$\text{NaHCO}_3 + \text{acid} \rightarrow \text{salt} + \text{H}_2\text{O} + \text{CO}_2$$

## The pH scale

pH tells you how acidic or basic a liquid is, usually on a scale from 0 to 14.

| pH | Meaning | Example |
|---|---|---|
| 0–3 | strongly acidic | lemon juice ≈ 2–3 |
| 4–6 | weakly acidic | sour milk ≈ 4.5; fresh milk ≈ 6.6–6.8 |
| 7 | neutral | pure water |
| 8–9 | weakly basic | baking soda solution ≈ 8.3 |
| 10–14 | strongly basic | soap, bleach (never handle without the guide) |

**The key idea:** pH is a **power-of-ten** scale.

$$[\text{H}^+] = 10^{-\text{pH}}\ \text{mol/L}$$

The square brackets mean "concentration of". At pH 3, $[\text{H}^+] = 10^{-3} = 0.001$ mol/L. At pH 7 it is $10^{-7}$ mol/L.

Each step of 1 in pH is a factor of **10**. So pH 5 has $10 \times 10 = 100$ times more H⁺ than pH 7.

**Worked example.** Fresh milk is pH 6.7. A suspect is pH 8.2. The difference is 1.5, so the suspect has $10^{1.5} \approx 32$ times fewer H⁺ ions. A big change, even though the numbers look close.

## Indicators

An **indicator** is a dye whose colour depends on pH. Red cabbage contains purple pigments called **anthocyanins**, which change shape, and colour, as H⁺ is added or removed.

| Red cabbage colour | Approximate pH |
|---|---|
| red | 1–3 |
| pink | 4–5 |
| purple / violet | 6–7 |
| blue | 8 |
| blue-green / green | 9–11 |
| yellow | 12+ |

Milk is white, so it makes every colour paler. That is why you must compare against a **control**: genuine milk with the same amount of indicator, side by side. A suspect that is clearly bluer than the genuine milk is more basic.

## Back to the case

Fresh milk is slightly acidic (about 6.7). Milk that has started to sour has a lower pH. A faker who adds baking soda to hide the sourness often overdoes it, pushing the pH above 7, and the cabbage indicator turns blue instead of purple.
