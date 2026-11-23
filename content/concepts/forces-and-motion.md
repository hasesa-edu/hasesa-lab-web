---
title: Forces and motion
summary: Pushes, pulls and Newton's three laws, the rules behind every launch, crash and step you take.
status: ai-draft
public: true
curriculum:
  - { subject: physics, grade: 9, unit: "Motion in one dimension" }
  - { subject: physics, grade: 9, unit: "Force and Newton's laws of motion" }
problems:
  - id: rocket-third-law
    type: mcq
    q: "A water rocket squirts water downwards and shoots upwards. Which idea explains this best?"
    choices: ["The water pushes on the air below, and the air pushes the rocket up", "The rocket pushes the water down, so the water pushes the rocket up", "The rocket is lighter than air, so it floats up", "Gravity switches off while the water comes out"]
    answerIndex: 1
    explanation: "Newton's third law: forces come in pairs. The squeezed air in the bottle pushes the water out downwards, and the water pushes the bottle upwards just as hard. It works even in space, where there is no air to push on."
  - id: trolley-acceleration
    type: numeric
    q: "A 2.0 kg trolley is pulled with an unbalanced force of 6.0 N. What is its acceleration?"
    answer: 3
    tolerancePct: 2
    unit: "m/s²"
    explanation: "Newton's second law: a = F ÷ m = 6.0 N ÷ 2.0 kg = 3.0 m/s². Every second, its speed goes up by 3 m/s."
  - id: rocket-weight
    type: numeric
    q: "A water rocket with its water has a mass of 0.30 kg. What is its weight? (Use g = 9.8 N/kg.)"
    answer: 2.94
    tolerancePct: 2
    unit: "N"
    explanation: "Weight = mass × g = 0.30 kg × 9.8 N/kg = 2.94 N. Weight is a force, so it is measured in newtons, not kilograms."
  - id: net-force
    type: numeric
    q: "At lift-off, the water pushes a rocket up with a thrust of 50 N. The rocket's weight is 3 N. What is the net (unbalanced) force on it, in newtons, upwards?"
    answer: 47
    tolerancePct: 1
    unit: "N"
    explanation: "The forces point in opposite directions, so subtract: 50 N up − 3 N down = 47 N up. (Air resistance is tiny at the very start, when the rocket is barely moving.)"
  - id: too-much-water
    type: mcq
    q: "A rocket filled almost to the top with water goes much lower than one filled one-third full. Why?"
    choices: ["Water is too heavy to push out at all", "There is little room for squeezed air, so the push stops early, and the rocket is heavy", "Full rockets have more air resistance", "The water freezes as it comes out"]
    answerIndex: 1
    explanation: "The squeezed air is the 'spring' that does the pushing. With almost no air, the push dies away quickly, while the extra water makes the rocket heavier (bigger m means smaller a). Too little water is also bad: there's little mass to throw out. There is a best amount in between."
---
A **force** is a push or a pull. It is measured in **newtons (N)**. Holding a 100 g bag of sugar in your hand, you feel a force of about 1 N.

Forces can make things start moving, stop, speed up, slow down or change direction. Isaac Newton summed up how in three laws.

## Law 1: nothing changes without an unbalanced force

An object keeps doing what it is doing (sitting still, or moving in a straight line at a steady speed) unless an **unbalanced force** acts on it.

A rocket sitting on its launcher has two forces on it: its **weight** pulling down and the launcher pushing up. They are **balanced**, so nothing happens.

## Law 2: F = ma

When the forces are unbalanced, the object **accelerates** (its velocity changes). How much depends on the **net force** and the **mass**:

$$F = m a \qquad \text{or} \qquad a = \frac{F}{m}$$

- $F$: net (unbalanced) force, in newtons (N)
- $m$: mass, in kilograms (kg)
- $a$: acceleration, in metres per second per second (m/s²)

A bigger force gives more acceleration. A bigger mass gives less.

**Example.** A rocket of mass 0.25 kg has a net upward force of 40 N. Its acceleration is $a = 40 \div 0.25 = 160\ \text{m/s}^2$, about 16 times the acceleration of a falling stone.

## Law 3: forces come in pairs

If object A pushes on object B, then B pushes back on A **just as hard, in the opposite direction**.

- You push back on the ground with your foot; the ground pushes you forward.
- A rocket pushes water down out of its nozzle; the water pushes the rocket up.

The two forces in a pair act on **different** objects, so they don't cancel out.

## Weight

**Weight** is the pull of gravity on a mass:

$$W = m g$$

Near the Earth's surface, $g \approx 9.8\ \text{N/kg}$. A 1 kg bag of teff weighs about 9.8 N. Mass is how much stuff there is (kg); weight is a force (N).

## Net force: add up the arrows

Draw each force as an arrow. Forces in the same direction add; forces in opposite directions subtract.

| Force | Direction | Size |
|---|---|---|
| Thrust from the water | up | 60 N |
| Weight | down | 3 N |
| Air resistance (when moving fast) | down | 2 N |
| **Net force** | **up** | **55 N** |

## Why a rocket stops going up

Once the water runs out, the thrust stops. Now weight and air resistance both point down, so the net force is downward. The rocket slows, stops at the top of its flight, and falls back. Its **highest point** depends on how fast it was going when the push ended.
