---
title: Fair tests and averages
summary: How to design an experiment that really answers your question, and how repeats and averages tame messy results.
status: ai-draft
public: true
curriculum:
  - { subject: biology, grade: 9, unit: "Biology and the scientific method" }
  - { subject: physics, grade: 9, unit: "Physics and measurement" }
  - { subject: mathematics, grade: 9, unit: "Statistics: mean and range" }
problems:
  - id: dependent-variable
    type: mcq
    q: "A team asks: 'Does the amount of water in a rocket change how high it flies?' What is the dependent variable (the one they measure)?"
    choices: ["The amount of water", "The height the rocket reaches", "The air pressure", "The size of the bottle"]
    answerIndex: 1
    explanation: "The dependent variable is what you measure to see the effect: the height. The amount of water is the independent variable, the one you deliberately change."
  - id: control-variable
    type: mcq
    q: "In the same experiment, which of these must be kept the same for a fair test?"
    choices: ["The amount of water", "The launch pressure", "The height reached", "None of them"]
    answerIndex: 1
    explanation: "Launch pressure would also change the height, so it must be a controlled variable. If you changed water and pressure together, you couldn't tell which one caused the difference."
  - id: mean-height
    type: numeric
    q: "Three launches with the same settings reach 22 m, 25 m and 19 m. What is the mean height?"
    answer: 22
    tolerancePct: 1
    unit: "m"
    explanation: "Add them and divide by how many: (22 + 25 + 19) ÷ 3 = 66 ÷ 3 = 22 m."
  - id: range
    type: numeric
    q: "For the same three launches (22 m, 25 m, 19 m), what is the range?"
    answer: 6
    tolerancePct: 1
    unit: "m"
    explanation: "Range = largest − smallest = 25 − 19 = 6 m. It tells you how spread out the repeats are."
  - id: outlier
    type: numeric
    q: "Four repeats give 30 m, 31 m, 12 m and 29 m. During the 12 m launch, a fin fell off. Leaving out that launch, what is the mean?"
    answer: 30
    tolerancePct: 1
    unit: "m"
    explanation: "The 12 m launch is an outlier with a known cause, so it's fair to leave it out (and say so in your notes). (30 + 31 + 29) ÷ 3 = 30 m."
---
Two students argue: "Black seeds grow faster." "No, it's the soil!" An experiment can settle it, but only if it's a **fair test**.

## Three kinds of variable

A **variable** is anything that can change.

- **Independent variable**: the one thing you change on purpose. (*The amount of water in the rocket.*)
- **Dependent variable**: what you measure to see the effect. (*How high it flies.*)
- **Controlled variables**: everything else that could affect the result, which you keep the same. (*Pressure, bottle, fins, nose weight, launch angle.*)

A fair test changes **one** independent variable at a time. If you change two things together, you can't say which one caused the difference.

## Controls

A **control** is a run where you leave out the thing you're testing, to compare against. If you want to know whether fertiliser helps seeds, you need some seeds **without** fertiliser, grown in exactly the same way.

## Why repeat?

Real measurements wobble. A gust of wind, a stopwatch pressed late, a seed that was a bit smaller. One result might be a fluke. Doing each setting **three or more times** shows how much the results wobble, and lets you take an average.

## The mean

$$\text{mean} = \frac{\text{sum of the values}}{\text{number of values}}$$

Launches of 22, 25 and 19 m have a mean of $66 \div 3 = 22$ m.

## The range

$$\text{range} = \text{largest} - \text{smallest}$$

The range shows how spread out your repeats are. A small range means your method is reliable.

**Comparing two settings.** If 300 mL of water gives a mean of 22 m (range 6 m) and 500 mL gives 24 m (range 7 m), the means differ by less than the spread of each set. You **can't** claim 500 mL is better. You'd need more repeats, or a bigger difference.

## Outliers

An **outlier** is a result far from the others. If you know the cause (a fin fell off, a seed was eaten by an ant), you may leave it out of the mean, but you must **record it and say why**. Never leave out a result just because you don't like it.

## A fair-test plan, in five lines

1. **Question:** Does ___ affect ___?
2. **I will change:** ___ (and use these values: ___)
3. **I will measure:** ___ (with: ___)
4. **I will keep the same:** ___, ___, ___
5. **Repeats:** ___ times each. **Control:** ___
