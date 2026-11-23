---
title: DNA and genes
summary: The molecule that carries the instructions for every living thing, how its four letters pair up, and how we pull it out of cells.
status: ai-draft
public: true
curriculum:
  - { subject: biology, grade: 10, unit: "Genetics" }
  - { subject: biology, grade: 12, unit: "Molecular genetics" }
problems:
  - id: base-pairs
    type: mcq
    q: "One strand of DNA reads A-T-G-C-C-A. What does the matching strand read?"
    choices: ["A-T-G-C-C-A", "T-A-C-G-G-T", "G-C-A-T-T-G", "C-G-T-A-A-C"]
    answerIndex: 1
    explanation: "A always pairs with T, and G with C. So A→T, T→A, G→C, C→G, C→G, A→T: T-A-C-G-G-T."
  - id: chargaff
    type: numeric
    q: "In a sample of double-stranded DNA, 30% of the bases are A. What percentage are G?"
    answer: 20
    tolerancePct: 1
    unit: "%"
    explanation: "A pairs with T, so T is also 30%. A + T = 60%, leaving 40% for G + C. G and C pair, so they're equal: 20% each."
  - id: reading-time
    type: numeric
    q: "The human genome has about 3.2 billion (3.2 × 10⁹) base pairs. If you read one letter every second, non-stop, about how many years would it take? (1 year ≈ 3.15 × 10⁷ s)"
    answer: 102
    tolerancePct: 3
    unit: "years"
    explanation: "3.2 × 10⁹ ÷ 3.15 × 10⁷ ≈ 102 years. And that's just one copy: most of your cells hold two."
  - id: dna-length
    type: numeric
    q: "Each base pair adds about 0.34 nm (0.34 × 10⁻⁹ m) to the length of a DNA molecule. How long, in metres, would 3.2 × 10⁹ base pairs be if stretched out?"
    answer: 1.09
    tolerancePct: 3
    unit: "m"
    explanation: "3.2 × 10⁹ × 0.34 × 10⁻⁹ m = 1.09 m. A cell nucleus holds two copies (about 2 m of DNA) packed into a space about 6 µm across, wound tightly around proteins."
  - id: why-detergent
    type: mcq
    q: "In DNA extraction, why do you add washing-up liquid (detergent) to the mashed fruit?"
    choices: ["To make the DNA visible", "To break open the oily cell and nuclear membranes", "To kill bacteria", "To make the mixture cold"]
    answerIndex: 1
    explanation: "Membranes are made of fat-like molecules. Detergent breaks up fats (like it breaks up grease on plates), so the cells and their nuclei burst and release their DNA."
---
Every cell in a banana, a teff plant, a cow or you carries a complete set of instructions for building and running that living thing. The instructions are written in a molecule called **DNA** (deoxyribonucleic acid).

## The shape: a twisted ladder

DNA is two long strands wound around each other in a **double helix**, like a twisted ladder.

- The sides of the ladder are a backbone of sugar and phosphate.
- The rungs are pairs of **bases**. There are four bases: **A** (adenine), **T** (thymine), **G** (guanine) and **C** (cytosine).
- The bases always pair the same way: **A with T**, **G with C**.

Because of this pairing, if you know one strand, you know the other. When a cell divides, the two strands unzip and each one is used as a template to build a new partner, so each new cell gets an exact copy.

## Genes

The order of the bases is the code. A **gene** is a stretch of DNA that carries the instructions for making one protein (or part of one). Proteins do most of the work in a cell: enzymes, muscle fibres, the haemoglobin that carries oxygen in blood.

- Humans have about 20,000 genes.
- The whole set of DNA in a cell is the **genome**: about 3.2 billion base pairs in humans.
- DNA is packed into **chromosomes**. Human body cells have 46 (23 pairs), one set from each parent.

## Small differences, big effects

Any two people's DNA is about 99.9% the same. The tiny differences, a letter changed here and there, are part of why we look different, and they're what forensic scientists use to tell people apart.

## How big?

| Thing | Size |
|---|---|
| Width of the double helix | 2 nm (2 × 10⁻⁹ m) |
| Length per base pair | 0.34 nm |
| DNA in one human cell, stretched out | about 2 m |
| A cell nucleus | about 6 µm across |

One DNA molecule is far too thin to see with any light microscope. But millions of strands clumped together make a white, stringy mass you can pick up on a stick.

## Getting DNA out of cells

1. **Mash** the tissue (banana, strawberry, onion) to separate the cells.
2. Add **detergent**: it dissolves the oily membranes around the cell and nucleus, releasing the DNA.
3. Add **salt**: DNA's backbone is negatively charged; salt's positive ions shield those charges so the strands can clump together.
4. Optional: add a **protease** (pineapple juice or meat tenderiser) to break down the proteins the DNA is wrapped around.
5. Filter, then gently pour **ice-cold alcohol** on top. DNA doesn't dissolve in alcohol, so it comes out of solution at the boundary as white threads.

## Reading DNA: fingerprinting

Forensic scientists cut DNA into pieces with enzymes and separate the pieces by size using **gel electrophoresis**: an electric field pulls the negatively charged DNA through a jelly-like gel towards the positive end. Small pieces move faster and further than big ones. Each person's pattern of bands is different (except identical twins), like a fingerprint.
