---
title: Inheritance
summary: How traits pass from parents to children, dominant and recessive alleles, Punnett squares and the chance in every birth.
status: ai-draft
public: false
curriculum:
  - { subject: biology, grade: 10, unit: "Genetics" }
  - { subject: biology, grade: 12, unit: "Genetics" }
  - { subject: mathematics, grade: 10, unit: "Probability" }
problems:
  - id: hybrid-cross
    type: numeric
    q: "Two pea plants are both Tt (T = tall, dominant; t = short, recessive). What percentage of their offspring would you expect to be short (tt)?"
    answer: 25
    tolerancePct: 1
    unit: "%"
    explanation: "The Punnett square gives TT, Tt, tT and tt: one out of four is tt. So 25% short, 75% tall."
  - id: test-cross
    type: numeric
    q: "A Tt plant is crossed with a tt plant. What percentage of the offspring would you expect to be tall?"
    answer: 50
    tolerancePct: 1
    unit: "%"
    explanation: "The Tt parent gives T or t; the tt parent can only give t. Offspring: Tt, Tt, tt, tt. Half are Tt (tall), half tt (short)."
  - id: expected-count
    type: numeric
    q: "A cross is expected to give a 3 : 1 ratio of purple to white flowers. Out of 400 seedlings, how many would you expect to be purple?"
    answer: 300
    tolerancePct: 1
    explanation: "3 : 1 means 3 out of every 4 are purple. 400 × 3/4 = 300 purple and 100 white. Real results will be close to this, but rarely exactly it."
  - id: genotype-phenotype
    type: mcq
    q: "A plant has the alleles Tt. Which describes it correctly?"
    choices: ["Its phenotype is Tt and its genotype is tall", "Its genotype is Tt (heterozygous) and its phenotype is tall", "It is homozygous recessive", "It must be short, because it has a t"]
    answerIndex: 1
    explanation: "The genotype is the pair of alleles (Tt, heterozygous: two different alleles). The phenotype is what you see. The dominant T hides the t, so the plant is tall."
  - id: independent-births
    type: mcq
    q: "A couple has three daughters. What is the chance that their next baby is a boy?"
    choices: ["Almost certain, after three girls", "About 50%", "About 25%", "Less than 10%"]
    answerIndex: 1
    explanation: "Each birth is independent: the egg and sperm don't 'remember' earlier babies. The chance is about 50% every time, just as a coin doesn't remember its last throws."
---
Children often look like their parents, but not exactly, and brothers and sisters can be very different. Why? Because every child gets a **random half** of each parent's genes.

## Genes come in versions

You have two copies of almost every gene: one from your mother, one from your father. Different versions of the same gene are called **alleles**. For example, a gene affecting pea-plant height has a "tall" allele (**T**) and a "short" allele (**t**).

| Word | Meaning | Example |
|---|---|---|
| **Genotype** | the pair of alleles | TT, Tt or tt |
| **Phenotype** | what you can observe | tall or short |
| **Homozygous** | two identical alleles | TT or tt |
| **Heterozygous** | two different alleles | Tt |
| **Dominant** | shows even with one copy | T |
| **Recessive** | shows only with two copies | t |

A Tt plant is tall: the dominant allele hides the recessive one. Only tt plants are short.

## Passing alleles on

Each parent passes on **one** of its two alleles, chosen at random, like a coin toss. A Tt parent gives T half the time and t half the time.

## Punnett squares

A **Punnett square** shows all the possible combinations. Put one parent's alleles along the top, the other's down the side, and fill in the boxes:

|   | **T** | **t** |
|---|---|---|
| **T** | TT | Tt |
| **t** | Tt | tt |

This is a cross between two Tt parents. Each box is equally likely (25%):

- TT: 25%, Tt: 50%, tt: 25%
- Phenotypes: tall 75%, short 25%, a **3 : 1** ratio.

## Probability, not certainty

A Punnett square gives **chances**, not guarantees. Two Tt parents with four children won't necessarily have exactly three tall and one short, just as four coin tosses don't always give two heads. With large numbers, the results get closer to the predicted ratios. That's why Gregor Mendel, who discovered these rules in the 1860s, counted thousands of pea plants.

## Real human traits are often more complicated

Many school books use tongue rolling or attached earlobes as examples of single genes. Studies show these are **not** simple one-gene traits; families don't follow the neat ratios. Most human features (height, skin colour, intelligence) depend on **many** genes plus the environment. Some conditions do follow simple rules, such as sickle-cell disease (recessive) and the ability to taste a bitter chemical called PTC (mostly dominant).

## Boy or girl?

Sex is decided by the X and Y chromosomes. Mothers give an X; fathers give either an X or a Y, at random. So each baby has about a 50% chance of being a boy (XY) or a girl (XX), whatever happened before.
