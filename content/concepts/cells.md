---
title: Cells
summary: The tiny units every living thing is built from, what's inside them, and how to work out their real size under a microscope.
status: ai-draft
public: false
curriculum:
  - { subject: biology, grade: 9, unit: "Cell biology" }
  - { subject: biology, grade: 11, unit: "Cell biology" }
problems:
  - id: magnification
    type: numeric
    q: "A drawing of a cell is 30 mm long. The real cell is 0.1 mm long. What is the magnification of the drawing?"
    answer: 300
    tolerancePct: 1
    unit: "×"
    explanation: "Magnification = image size ÷ real size = 30 mm ÷ 0.1 mm = 300. Both sizes must be in the same unit."
  - id: real-size
    type: numeric
    q: "In a photo taken at ×400, a cheek cell measures 24 mm across. What is its real size in micrometres (µm)? (1 mm = 1000 µm)"
    answer: 60
    tolerancePct: 2
    unit: "µm"
    explanation: "Real size = image size ÷ magnification = 24 mm ÷ 400 = 0.06 mm = 60 µm."
  - id: plant-only
    type: mcq
    q: "Which part is found in plant cells but not in animal cells?"
    choices: ["Nucleus", "Cell membrane", "Cell wall", "Cytoplasm"]
    answerIndex: 2
    explanation: "Plant cells have a stiff cell wall made of cellulose outside the membrane. They also have chloroplasts (in green parts) and a large vacuole. Animal cells have a membrane but no wall."
  - id: membrane-job
    type: mcq
    q: "What is the main job of the cell membrane?"
    choices: ["To make food from sunlight", "To control what goes into and out of the cell", "To store the cell's DNA", "To make the cell stiff"]
    answerIndex: 1
    explanation: "The membrane is a thin, oily layer around every cell that lets some substances through and keeps others out. Because it's oily, soap and detergent can break it apart: the first step in extracting DNA."
  - id: field-of-view
    type: numeric
    q: "The circle you see through a microscope is 0.4 mm across. Exactly 8 onion cells fit end to end across it. About how long is one cell, in µm?"
    answer: 50
    tolerancePct: 2
    unit: "µm"
    explanation: "0.4 mm = 400 µm. 400 ÷ 8 = 50 µm per cell."
---
Every living thing, from a yeast cell to a eucalyptus tree to you, is built from **cells**. Some living things are a single cell. You are about 30 trillion of them.

## What's inside

| Part | Job | In animal cells? | In plant cells? |
|---|---|---|---|
| **Cell membrane** | A thin, oily skin that controls what goes in and out | ✓ | ✓ |
| **Cytoplasm** | Jelly where most of the cell's chemical reactions happen | ✓ | ✓ |
| **Nucleus** | Holds the DNA, the cell's instructions | ✓ | ✓ |
| **Mitochondria** | Release energy from food (respiration) | ✓ | ✓ |
| **Cell wall** | A stiff box of cellulose that supports the cell | ✗ | ✓ |
| **Chloroplasts** | Contain green chlorophyll; make food by photosynthesis | ✗ | ✓ (green parts only) |
| **Vacuole** | A large sac of watery sap that keeps the cell firm | small, if any | ✓ (large) |

Bacteria are cells too, but simpler: they have no nucleus, and their DNA floats loose in the cytoplasm.

## How big?

Cells are measured in **micrometres** (µm): 1 µm = 0.001 mm.

| Cell | Typical size |
|---|---|
| Bacterium | 1–5 µm |
| Red blood cell | about 8 µm |
| Human cheek cell | about 50–60 µm |
| Onion skin cell | about 100–300 µm long |

## Magnification

A microscope or a photo makes cells look bigger. The **magnification** says how many times bigger:

$$\text{magnification} = \frac{\text{image size}}{\text{real size}}$$

Rearranged to find the real size:

$$\text{real size} = \frac{\text{image size}}{\text{magnification}}$$

Use the same units for both sizes. Convert mm to µm by multiplying by 1000.

**Example.** In a photo at ×100, an onion cell is 20 mm long. Real size = 20 ÷ 100 = 0.2 mm = 200 µm.

## Estimating with the field of view

If you know how wide the circle you see through the microscope is (measure it with a clear ruler at low power), count how many cells fit across it:

$$\text{size of one cell} \approx \frac{\text{width of field of view}}{\text{number of cells across}}$$

## Seeing cells

Most cells are almost clear. A **stain** makes parts visible: iodine turns starch in plant cells dark and makes the nucleus show up; methylene blue stains the nucleus of cheek cells. You need a thin sample, only one cell thick, so light can pass through it, which is why onion skin is perfect.
