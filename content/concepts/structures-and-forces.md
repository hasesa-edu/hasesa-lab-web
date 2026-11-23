---
title: Structures and forces
summary: Tension and compression, why triangles are strong, and the tricks engineers use to keep buildings standing when the ground shakes.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 9, unit: "Force and Newton's laws of motion" }
  - { subject: physics, grade: 11, unit: "Equilibrium and elasticity" }
problems:
  - id: triangle
    type: mcq
    q: "A square frame of four sticks pinned at the corners folds flat when pushed sideways. A triangle of three sticks doesn't. Why?"
    choices: ["Triangles use less material", "A triangle's shape is fixed by the lengths of its sides; it can't change shape without a stick changing length", "Squares are heavier", "Triangles are always made of stronger material"]
    answerIndex: 1
    explanation: "Three side lengths allow only one triangle shape, so the corners can't swing unless a member stretches or squashes. A square can lean into a rhombus with every side staying the same length. Adding one diagonal turns a square into two triangles."
  - id: column
    type: mcq
    q: "A pillar holding up a roof is being:"
    choices: ["Stretched (in tension)", "Squashed (in compression)", "Twisted", "Nothing: it carries no force"]
    answerIndex: 1
    explanation: "The roof's weight pushes down and the ground pushes up, squashing the pillar. A rope holding a hanging lamp is the opposite: it is stretched, in tension."
  - id: building-frequency
    type: numeric
    q: "A rough rule says a building's natural period is about 0.1 s per storey. What is the natural frequency of a 10-storey building, in Hz?"
    answer: 1
    tolerancePct: 1
    unit: "Hz"
    explanation: "Period ≈ 0.1 × 10 = 1.0 s. Frequency = 1 ÷ period = 1 ÷ 1.0 = 1 Hz. It sways back and forth about once a second."
  - id: tall-building
    type: numeric
    q: "Using the same rule (0.1 s per storey), what is the natural frequency of a 20-storey building, in Hz?"
    answer: 0.5
    tolerancePct: 1
    unit: "Hz"
    explanation: "Period ≈ 0.1 × 20 = 2.0 s, so frequency = 1 ÷ 2.0 = 0.5 Hz. Taller buildings sway more slowly."
  - id: base-isolation
    type: mcq
    q: "Some buildings stand on thick rubber pads (base isolators). What do the pads do in an earthquake?"
    choices: ["Make the building heavier", "Let the ground move sideways under the building while the building above moves much less", "Glue the building to the ground more firmly", "Make the building vibrate faster"]
    answerIndex: 1
    explanation: "The soft pads make the building's natural frequency very low, far below the frequency of most shaking. Much of the ground's movement is soaked up by the pads, so the building above sways gently instead of being jolted."
---
Every structure, from a mud-and-wood tukul to a tower in Bole, must carry forces safely down into the ground. Engineers think about **what each part is doing**.

## Tension and compression

- **Compression**: a part is being **squashed**. Pillars, walls and legs are in compression.
- **Tension**: a part is being **stretched**. Ropes, cables and the bottom of a loaded beam are in tension.

Materials are good at different things. Stone, brick and concrete are strong in compression but crack easily in tension. Steel and rope are strong in tension. **Reinforced concrete** puts steel bars inside concrete so it can handle both.

Thin parts in compression can **buckle**: bend sideways and collapse, like a long spaghetti strand pushed from both ends. Short, thick parts resist buckling far better.

## Triangles

A frame with four sides pinned at the corners can lean over into a squashed shape, even though no side changes length. A triangle can't: once its three side lengths are fixed, its shape is fixed. That's why bridges, cranes, roof trusses and electricity pylons are built from triangles.

To stiffen a square frame, add a **diagonal brace**. One diagonal makes two triangles. Cross-bracing (an X) works whether the frame is pushed left or right.

## Stability

A structure tips over when its **centre of mass** moves outside its **base**. To make it more stable:

- make the **base wider**,
- put heavy parts **low down** (a lower centre of mass),
- fix it firmly to the ground.

## Earthquake forces

Buildings are designed mostly to hold up their own weight (vertical forces). An earthquake shakes the ground **sideways**. The ground moves; the building's mass tends to stay where it was (Newton's first law); so the frame bends.

Every building has a **natural frequency**: the rate it sways back and forth when pushed and let go. A rough rule is a period of about 0.1 s per storey. If the ground shakes near that frequency, the swaying builds up: **resonance**. This is why, in some earthquakes, medium-height buildings collapse while shorter and taller ones nearby survive.

## How engineers fight back

| Idea | How it helps |
|---|---|
| **Bracing** (diagonals, shear walls) | stops the frame leaning and folding |
| **Strong connections** | joints are where structures usually fail |
| **Light roofs, heavy parts low** | less mass high up to swing around |
| **Symmetry** | avoids twisting |
| **Base isolation** (rubber or sliding pads) | lowers the natural frequency far below the shaking, so less motion reaches the building |
| **Damping** (dampers, tuned masses) | soaks up the energy of swaying |
| **Avoiding resonance** | design the building's natural frequency away from the expected shaking |
