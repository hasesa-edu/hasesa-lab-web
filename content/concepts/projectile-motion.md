---
title: Projectile motion
summary: Why a thrown ball follows a curve, how long it stays in the air, and how speed, time and launch angle decide where it lands.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 9, unit: "Motion in one dimension" }
  - { subject: physics, grade: 11, unit: "Two-dimensional motion: projectiles" }
problems:
  - id: horizontal-speed
    type: numeric
    q: "A bean bag from a catapult stays in the air for 0.80 s and lands 4.0 m away. What was its horizontal (sideways) speed, in m/s?"
    answer: 5
    tolerancePct: 2
    unit: "m/s"
    explanation: "Horizontal distance = horizontal speed × time, so horizontal speed = distance ÷ time = 4.0 m ÷ 0.80 s = 5.0 m/s."
  - id: vertical-speed
    type: numeric
    q: "A paper ball is launched from the ground and lands on level ground 1.0 s later. How fast was it moving upwards at the start, in m/s? (Use g = 9.8 m/s².)"
    answer: 4.9
    tolerancePct: 2
    unit: "m/s"
    explanation: "On level ground the trip up takes half the time: 0.50 s. Gravity takes away 9.8 m/s of upward speed every second, so the starting upward speed was 9.8 × 0.50 = 4.9 m/s."
  - id: drop-vs-push
    type: mcq
    q: "Two identical coins are on the edge of a table. At the same moment, one is just dropped and the other is flicked sideways, fast. Which reaches the floor first?"
    choices: ["The dropped coin", "The flicked coin", "They land at the same time", "It depends on how hard the flick is"]
    answerIndex: 2
    explanation: "Sideways motion and up-and-down motion don't affect each other. Both coins start with no downward speed and both are pulled down by the same gravity, so both fall the same height in the same time. The flicked coin just lands further away."
  - id: table-launch
    type: numeric
    q: "A ball rolls off a table 0.80 m high at a horizontal speed of 3.0 m/s. How far from the table's edge does it land, in metres? (Use g = 9.8 m/s². Hint: first find the fall time with t = √(2h/g).)"
    answer: 1.21
    tolerancePct: 3
    unit: "m"
    explanation: "Fall time: t = √(2 × 0.80 ÷ 9.8) = √0.163 ≈ 0.40 s. Horizontal distance = 3.0 m/s × 0.40 s ≈ 1.21 m."
  - id: best-angle
    type: mcq
    q: "Ignoring air resistance, at which launch angle does a catapult throw furthest on level ground, if the launch speed stays the same?"
    choices: ["15°", "30°", "45°", "60°", "75°"]
    answerIndex: 2
    explanation: "At 45° the ball gets the best share of upward speed (which gives it time in the air) and sideways speed (which carries it forward). Lower angles land too soon; higher angles go up but not along. With light, draggy balls the real best angle is often a little lower, around 35–40°."
  - id: partner-angles
    type: mcq
    q: "A catapult launches the same bean bag at the same speed, once at 30° and once at 60°. Ignoring air resistance, how do the ranges compare?"
    choices: ["30° goes twice as far", "60° goes twice as far", "They land at about the same distance", "60° goes much further because it stays up longer"]
    answerIndex: 2
    explanation: "30° and 60° add up to 90°, and angles that add up to 90° give the same range. The 60° shot stays up longer but moves sideways more slowly; the 30° shot is the other way round. It balances out."
  - id: double-speed
    type: mcq
    q: "You stretch your catapult further, and the bean bag leaves twice as fast, at the same angle. Ignoring air resistance, roughly how much further does it go?"
    choices: ["The same distance", "2 times as far", "4 times as far", "8 times as far"]
    answerIndex: 2
    explanation: "Twice the speed gives twice the sideways speed AND twice the time in the air (the upward speed is doubled too). Distance = speed × time, so 2 × 2 = 4 times as far."
  - id: launch-angle-tan
    type: numeric
    q: "Extension (needs the tangent ratio). A bean bag leaves the catapult with a horizontal speed of 5.6 m/s and an upward speed of 4.4 m/s. What is its launch angle, in degrees?"
    answer: 38.2
    tolerancePct: 3
    unit: "°"
    explanation: "Draw the speeds as a right-angled triangle: 5.6 along, 4.4 up. tan θ = opposite ÷ adjacent = 4.4 ÷ 5.6 = 0.786. θ = tan⁻¹(0.786) ≈ 38°."
---
A **projectile** is anything that is thrown, kicked or launched and then left to fly on its own: a football, a stone from a shepherd's *wenchif* (ወንጭፍ, sling), a basketball, a bean bag from a catapult. Once it leaves the hand or the machine, nothing pushes it forward any more. Only gravity (and a little air resistance) acts on it.

## Two motions at once

Watch a ball thrown across a field. Its path is a smooth curve, called a **parabola**. The trick to understanding it is to split the motion into two parts that happen at the same time but **don't affect each other**:

| Direction | What acts on it | What happens |
|---|---|---|
| Sideways (horizontal) | nothing (ignoring air) | the ball moves at a **steady speed** |
| Up and down (vertical) | gravity, pulling down | the ball slows on the way up, stops at the top, and speeds up on the way down, exactly like something thrown straight up |

This is Newton's first law at work: there is no sideways force, so the sideways speed doesn't change.

A test you can do: push one coin off a table and drop another at the same moment. They hit the floor together. Moving sideways doesn't make you fall faster or slower.

## Time in the air

How long a projectile stays up depends **only on the up-and-down part**: how fast it was going upwards at the start, and how high it started.

On **level ground**, the trip up and the trip down take the same time. Gravity removes $9.8$ m/s of upward speed every second, so if the whole flight takes $T$ seconds:

$$\text{starting upward speed} = g \times \frac{T}{2}$$

**Example.** A bean bag is in the air for 0.90 s. Upward speed at launch $= 9.8 \times 0.45 \approx 4.4$ m/s.

If something is launched **sideways** from a height $h$ (off a table, say), it falls just like a dropped object, so you can use the free-fall formula: $t = \sqrt{2h/g}$.

## How far it goes

Because the sideways speed is steady:

$$\text{horizontal distance} = \text{horizontal speed} \times \text{time in the air}$$

This works both ways. If you measure the **range** $R$ (how far it landed) and the **flight time** $T$, you can find the sideways speed:

$$\text{horizontal speed} = \frac{R}{T}$$

**Example.** The same bean bag lands 5.0 m away after 0.90 s. Horizontal speed $= 5.0 \div 0.90 \approx 5.6$ m/s.

To make something go further you can give it **more sideways speed**, or **more time in the air**, or both.

## Launch angle: a trade-off

The **launch angle** is the angle between the ground and the direction the projectile starts moving.

- **Low angle** (say 15°): lots of sideways speed, but little upward speed, so it lands almost at once.
- **High angle** (say 75°): lots of time in the air, but it hardly moves forward. It goes up and comes down nearby.
- **In between**: the best balance. With no air resistance and level ground, the furthest range is at **45°**.

Two angles that add up to 90° (like 30° and 60°) give the same range, as long as the launch speed is the same. Real light objects, like paper balls and ping-pong balls, are slowed by air, so their best angle is usually a bit lower, often 35–40°. That's something you can test.

## Where the speed comes from: energy

A catapult doesn't make energy; it moves it from one **store** to another.

1. You pull the arm back. Your muscles do work stretching the rubber. Energy is now in the **elastic store** of the rubber.
2. You let go. The rubber pulls the arm forward. Energy moves to the **kinetic store** (movement) of the arm and the bean bag.
3. The bean bag flies up, slowing down. Some kinetic energy moves to the **gravitational store**. On the way down it moves back.
4. It lands with a thud. The energy ends up as a little heat and sound.

More stretch stores more elastic energy, so the bean bag leaves faster and lands further away. But not all the energy goes into the bean bag: some goes into moving the heavy arm, some into the bang when the arm hits the stop bar, and some warms the rubber.

Movement energy depends on speed squared: $E_k = \tfrac12 m v^2$. And range depends on speed in two ways (more sideways speed **and** more time up). So, with no air resistance, **doubling the launch speed makes the range four times bigger**.

## Extension: the launch angle from the speeds

If you know the upward speed $v_{\text{up}}$ and the sideways speed $v_{\text{side}}$ at launch, you can draw them as two sides of a right-angled triangle. The tangent ratio gives the launch angle:

$$\tan\theta = \frac{v_{\text{up}}}{v_{\text{side}}}$$

With 4.4 m/s up and 5.6 m/s sideways, $\tan\theta = 0.786$, so $\theta \approx 38°$. The long side of the triangle is the actual launch speed: $\sqrt{5.6^2 + 4.4^2} \approx 7.1$ m/s.

## Common mistakes

- **Thinking a forward force keeps pushing the ball.** Once it has left the cup, nothing pushes it forward. It keeps going because nothing stops it (Newton's first law).
- **Thinking the ball stops completely at the top.** Only the upward speed is zero at the top. It is still moving sideways.
- **Forgetting the half.** On level ground, the time to the top is **half** the flight time.
- **Measuring range to where the ball rolled.** Range is where it **first** touches the ground. That is why bean bags, which don't roll, are good for experiments.
