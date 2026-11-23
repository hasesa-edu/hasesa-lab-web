---
title: Measuring heights with angles
summary: Use a right-angled triangle and the tangent ratio to measure things you can't reach, from a tree to a rocket's highest point.
status: ai-draft
public: false
curriculum:
  - { subject: mathematics, grade: 9, unit: "Trigonometry: right-angled triangles" }
  - { subject: mathematics, grade: 10, unit: "Trigonometric functions" }
problems:
  - id: tree-height
    type: numeric
    q: "You stand 20 m from a tree and look at its top. Your clinometer reads 35°, and your eye is 1.5 m above the ground. How tall is the tree, in metres? (tan 35° ≈ 0.700)"
    answer: 15.5
    tolerancePct: 2
    unit: "m"
    explanation: "Height above your eye = 20 × tan 35° = 20 × 0.700 = 14.0 m. Add your eye height: 14.0 + 1.5 = 15.5 m."
  - id: forty-five
    type: numeric
    q: "Ignoring eye height: a rocket's highest point is seen at an angle of 45° from 12 m away. How high did it go?"
    answer: 12
    tolerancePct: 1
    unit: "m"
    explanation: "tan 45° = 1, so the height equals the distance: 12 × 1 = 12 m. At 45°, the triangle's two short sides are equal."
  - id: sixty-degrees
    type: numeric
    q: "Ignoring eye height: an observer 10 m from the launcher sees the rocket's top at 60°. How high did it go? (tan 60° ≈ 1.73)"
    answer: 17.3
    tolerancePct: 2
    unit: "m"
    explanation: "h = 10 × tan 60° = 10 × 1.73 = 17.3 m."
  - id: why-stand-back
    type: mcq
    q: "Why is it better to stand further back for a very high rocket, so the angle is about 30–50° instead of 80°?"
    choices: ["Close to 90°, a 1° mistake in reading the angle makes a huge difference to the height", "The tangent of 80° doesn't exist", "Rockets go lower when you stand close", "It makes no difference to accuracy"]
    answerIndex: 0
    explanation: "tan rises very steeply near 90°. tan 80° ≈ 5.67 but tan 81° ≈ 6.31: one degree of error changes the answer by more than 10%. Around 45°, a one-degree error changes it by only about 3–4%."
  - id: find-the-angle
    type: mcq
    q: "In a right-angled triangle, the side opposite angle θ is 8 m and the side next to it (not the longest side) is 8 m. What is θ?"
    choices: ["30°", "45°", "60°", "90°"]
    answerIndex: 1
    explanation: "tan θ = opposite ÷ adjacent = 8 ÷ 8 = 1, and the angle whose tangent is 1 is 45°."
---
How tall is the school flagpole? You can't climb it with a tape measure. But you can stand on the ground, measure **one distance and one angle**, and work it out. Surveyors, builders and astronomers do the same.

## The right-angled triangle

Stand some distance $d$ from the base of a tall object. Look up at its top. Your line of sight, the ground and the object make a **right-angled triangle**:

- the side along the ground, $d$, is **adjacent** (next to) your angle,
- the height $h$ is **opposite** your angle,
- the angle $\theta$ (theta) is how far you tilt your eyes up from horizontal.

## The tangent ratio

For any right-angled triangle,

$$\tan\theta = \frac{\text{opposite}}{\text{adjacent}} = \frac{h}{d}$$

Rearranged to find the height:

$$h = d \times \tan\theta$$

Then add the height of your eye above the ground (or of the clinometer, if it's on a stand).

Your calculator has a **tan** button. Make sure it's in **degrees** mode (DEG), not radians. Some values to know:

| θ | 30° | 45° | 60° |
|---|---|---|---|
| tan θ | 0.577 | 1.000 | 1.732 |

## Making a clinometer

A **clinometer** measures the angle up to something.

1. Tape a drinking straw along the straight edge of a protractor.
2. Tie a thread to the small hole at the centre, with a washer or nut hanging on the end.
3. Look through the straw at the top of the object. Let the thread hang still, pinch it, and read where it crosses the scale.
4. The thread reads 90° when the straw is level. The angle you want is **90° minus the reading** (or the reading minus 90°, depending on which way round you hold it). Check with a level straw first.

## Worked example

From 15.0 m away, the top of the flagpole is at 40°. Your eye is 1.4 m above the ground. tan 40° ≈ 0.839.

$$h = 15.0 \times 0.839 + 1.4 = 12.6 + 1.4 = 14.0\ \text{m}$$

## Getting a good answer

- Measure $d$ along flat ground with a tape, not by pacing.
- Read the angle three times and take the **mean**.
- Choose $d$ so the angle is about 30–60°. Near 90°, tiny reading errors become huge height errors.
- For a rocket, the top lasts less than a second. Have two observers at different distances, and compare their heights. If they disagree a lot, the rocket probably drifted sideways.
