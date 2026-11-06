---
title: Free fall and square roots
summary: How far a dropped object falls in a given time, and how to turn a fall distance back into a time.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 9, unit: "Motion in one dimension" }
  - { subject: mathematics, grade: 9, unit: "Real numbers: radicals and square roots" }
problems:
  - id: ruler-20cm
    type: numeric
    q: "Your partner drops a ruler and you catch it after it has fallen 20 cm. Using g = 9.8 m/s², what is your reaction time in seconds?"
    answer: 0.202
    tolerancePct: 3
    unit: "s"
    explanation: "First change to metres: d = 0.20 m. Then t = √(2d/g) = √(2 × 0.20 / 9.8) = √(0.0408) ≈ 0.20 s. That is one fifth of a second."
  - id: distance-from-time
    type: numeric
    q: "A friend's reaction time is 0.25 s. How far (in cm) will the ruler fall before they catch it? Use g = 9.8 m/s²."
    answer: 30.6
    tolerancePct: 3
    unit: "cm"
    explanation: "Use d = ½gt² = 0.5 × 9.8 × 0.25² = 0.5 × 9.8 × 0.0625 = 0.306 m ≈ 30.6 cm. Notice: that is longer than a 30 cm ruler, so this friend would miss it completely!"
  - id: four-times-distance
    type: mcq
    q: "Ruler A falls 5 cm before it is caught. Ruler B falls 20 cm (four times as far). How do the reaction times compare?"
    choices: ["B's time is 4 times A's", "B's time is 2 times A's", "B's time is 16 times A's", "They are the same"]
    answerIndex: 1
    explanation: "t = √(2d/g), so time grows with the square root of distance. Four times the distance gives √4 = 2 times the time. Check: 5 cm → 0.10 s, 20 cm → 0.20 s."
  - id: ruler-limit
    type: numeric
    q: "A 30 cm ruler is held so its zero mark is between the catcher's fingers. What is the longest reaction time (in seconds) this ruler can measure? Use g = 9.8 m/s²."
    answer: 0.247
    tolerancePct: 3
    unit: "s"
    explanation: "The ruler can fall at most 0.30 m before it leaves the hand. t = √(2 × 0.30 / 9.8) = √(0.0612) ≈ 0.25 s. Anyone slower than about a quarter of a second misses the ruler, so for slow (distracted) trials you need a longer ruler, such as a metre stick."
  - id: catch-speed
    type: numeric
    q: "How fast (in m/s) is the ruler moving at the moment it is caught after falling 20 cm? Use v = gt with the time from the first problem (t ≈ 0.202 s), and g = 9.8 m/s²."
    answer: 1.98
    tolerancePct: 3
    unit: "m/s"
    explanation: "v = gt = 9.8 × 0.202 ≈ 1.98 m/s. You can also use v = √(2gd) = √(2 × 9.8 × 0.20) ≈ 1.98 m/s. Both give the same answer, which is a good check."
---
## The falling ruler

Drop anything — a ruler, a mango, a pen — and it does not fall at a steady speed. It starts from rest and goes **faster and faster**. Near the Earth's surface its speed grows by about 9.8 metres per second, every second. We call this number the **acceleration due to gravity**, written $g$:

$$g \approx 9.8\ \text{m/s}^2$$

(Air resistance matters for feathers and paper, but for a short ruler drop we can ignore it.)

## Distance grows with time squared

Because the speed keeps growing, the distance fallen grows faster than time. Starting from rest:

$$d = \tfrac{1}{2} g t^2$$

- $d$ = distance fallen (metres)
- $t$ = time falling (seconds)

After 0.1 s an object has fallen $\tfrac12 \times 9.8 \times 0.01 = 0.049$ m, about 5 cm. After 0.2 s it has fallen about 20 cm — **four** times as far for **twice** the time. That is what "squared" does.

## Turning it around: the square root

In the ruler test we measure $d$ (where you caught it) and want $t$. So we rearrange the formula:

1. Multiply both sides by 2: $2d = g t^2$
2. Divide both sides by $g$: $t^2 = \dfrac{2d}{g}$
3. Take the square root of both sides:

$$t = \sqrt{\frac{2d}{g}}$$

A **square root** undoes squaring: $\sqrt{9} = 3$ because $3^2 = 9$. On a phone calculator, type the number, then press √.

### Worked example

Selam catches the ruler at the 15 cm mark.

- Change to metres: $d = 0.15$ m
- $2d/g = 0.30 / 9.8 = 0.0306$
- $t = \sqrt{0.0306} \approx 0.175$ s

Selam's reaction time is about 0.17 s.

## The square-root pattern

Because of the square root, the ruler scale is **not even**:

| Caught at | Reaction time |
|---|---|
| 5 cm | 0.10 s |
| 10 cm | 0.14 s |
| 20 cm | 0.20 s |
| 30 cm | 0.25 s |

Going from 5 cm to 20 cm only doubles the time. A useful rule: **multiply the distance by 4, the time doubles; multiply by 9, the time triples.**

## Common mistakes

- **Forgetting to convert cm to m.** $g$ is in m/s², so $d$ must be in metres. Using 20 instead of 0.20 gives an answer 10 times too big ($\sqrt{100} = 10$).
- **Forgetting the 2.** $t = \sqrt{d/g}$ is wrong — it gives 0.14 s instead of 0.20 s for 20 cm.
- **Starting the ruler with a gap.** The catcher's fingers must start level with the zero mark, or you measure extra distance.

## Speed at the catch

The speed after falling for time $t$ is $v = g t$. A ruler caught at 20 cm is moving at about 2 m/s — that is why it stings your fingers a little.
