---
title: Chemical tests
summary: Reactions that reveal a hidden substance, and how to run them so the result is trustworthy.
status: ai-draft
public: false
curriculum:
  - { subject: chemistry, grade: 9, unit: "Measurements and scientific methods" }
  - { subject: biology, grade: 10, unit: "Food and nutrition: food tests" }
problems:
  - id: what-is-control
    type: mcq
    q: "You test four milk samples for starch with iodine. Why also test a cup of milk you KNOW is genuine?"
    choices: ["To use up the iodine", "It is a negative control: it shows what 'no starch' looks like with this milk and this iodine", "Genuine milk always turns blue-black", "It makes the test faster"]
    answerIndex: 1
    explanation: "A negative control is a sample known NOT to contain the substance. Treated in exactly the same way, it shows the colour you get when the answer is 'no', so you can compare fairly."
  - id: known-positive
    type: mcq
    q: "Before testing the butter samples, the guide asks you to test a pinch of cornstarch in water. What is this for?"
    choices: ["It is a positive control: it proves the iodine is working and shows what 'yes' looks like", "It is a negative control", "It removes starch from the iodine", "It is not needed"]
    answerIndex: 0
    explanation: "If old or over-diluted iodine fails to colour pure starch, then a 'no' from your samples means nothing. A positive control shows the test can say 'yes'."
  - id: iodine-dilution
    type: numeric
    q: "Pharmacy iodine is 2% strength. You want 0.5% for testing. You start with 2 mL of the 2% iodine. How many mL of water must you add?"
    answer: 6
    tolerancePct: 1
    unit: "mL"
    explanation: "Use C₁V₁ = C₂V₂: 2% × 2 mL = 0.5% × V₂, so V₂ = 8 mL in total. You already have 2 mL, so add 8 − 2 = 6 mL of water."
  - id: false-positive-rate
    type: numeric
    q: "A class runs the starch test 40 times on milk known to be genuine. Twice it turns blue-black, because someone used a spoon that had touched flour. What percentage of these tests were false positives?"
    answer: 5
    tolerancePct: 1
    unit: "%"
    explanation: "2 ÷ 40 × 100 = 5%. A false positive says 'yes' when the truth is 'no'. Clean, separate spoons and labelled cups prevent contamination."
  - id: reading-result
    type: mcq
    q: "A drop of dilute iodine on a butter sample stays yellow-orange. The cornstarch positive control turned blue-black. What do you conclude?"
    choices: ["The butter contains lots of starch", "No starch detected in this butter sample", "The iodine has gone off", "The test failed"]
    answerIndex: 1
    explanation: "The positive control proves the iodine works. Iodine stays yellow-brown (it dissolves in the fat and looks orange) when there is no starch. So this sample shows no detectable starch."
  - id: one-variable
    type: mcq
    q: "Which change makes the comparison between milk samples A–D UNFAIR?"
    choices: ["Using the same 10 mL of each sample", "Adding 3 drops of iodine to every cup", "Adding 3 drops to A and B, but 10 drops to C and D", "Using cups of the same colour"]
    answerIndex: 2
    explanation: "In a fair test only one thing changes: which sample is in the cup. Different amounts of iodine could change the colour on their own, so you could not tell whether a difference came from the sample or from the iodine."
---
A **chemical test** uses a reaction that gives an easy-to-see sign, usually a colour change, a gas or a precipitate, when a certain substance is present. It lets you "see" something your eyes cannot.

## The starch–iodine test

Starch is the energy store in plants: wheat flour, maize, teff, potato and cornstarch are full of it. Starch is made of long chains of glucose. One part, called **amylose**, coils up into a spiral like a spring.

Iodine on its own is yellow-brown in water. When it meets starch, iodine particles slide inside the amylose spirals. This new combination absorbs light differently and looks **deep blue-black**.

- Blue-black: **starch present**.
- Stays yellow, brown or orange: **no starch detected**.

Milk and butter contain no starch naturally, so any blue-black is a big clue that flour, cornstarch or potato has been added.

Dilute the pharmacy iodine first (about 1 part iodine to 4–10 parts water). Too strong, and it is so dark brown that it is hard to tell from blue-black.

## Other tests in this case

- **Indicators** (like red cabbage juice) change colour with acid or base.
- **Fizz test**: acids make baking soda fizz, releasing carbon dioxide.
- **Sedimentation** and **chromatography** are physical tests, not chemical ones, but the same rules for fairness apply.

## Making a test trustworthy

A test result is only evidence if you can trust it. Detectives use four habits.

**1. Negative control.** Test a sample you *know* does not contain the substance (for example, genuine milk, or plain water). It shows what "no" looks like.

**2. Positive control.** Test a sample you *know* does contain it (a pinch of cornstarch in water). It proves the test is working and shows what "yes" looks like. If your iodine is old and the positive control does not turn blue-black, every "no" is meaningless.

**3. Fair test.** Change only one thing: which sample is in the cup. Keep the same volume of sample, the same number of drops, the same cup, the same waiting time.

**4. No contamination.** A clean spoon for every sample, every cup labelled. One flour-covered spoon can make genuine milk look fake: a **false positive**. A test that misses a real fake is a **false negative**.

## Worked example: diluting iodine

You have 2% iodine and want 0.5%. Use

$$C_1 V_1 = C_2 V_2$$

With 2 mL of 2% iodine: $2 \times 2 = 0.5 \times V_2$, so $V_2 = 8$ mL. Add water until the total is 8 mL, which means adding 6 mL.

## Repeat

Run each test at least twice. If the two results disagree, find out why before you write anything in the evidence table.
