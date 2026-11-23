---
title: Graphs and relationships
summary: Turn a table of results into a graph, draw a line of best fit, and read off patterns, rates and predictions.
status: ai-draft
public: false
curriculum:
  - { subject: mathematics, grade: 9, unit: "Linear equations and graphs" }
  - { subject: mathematics, grade: 10, unit: "Relations and functions" }
  - { subject: physics, grade: 9, unit: "Physics and measurement" }
problems:
  - id: which-axis
    type: mcq
    q: "You measure a seedling's height every day for two weeks. Which goes on the horizontal (x) axis?"
    choices: ["Height", "Day", "Either, it doesn't matter", "Neither: use a pie chart"]
    answerIndex: 1
    explanation: "The independent variable (the one you choose or that just ticks along, like time) goes on the x-axis. The dependent variable (height) goes on the y-axis."
  - id: heating-gradient
    type: numeric
    q: "A pot of water in a solar oven is at 20 °C at 0 minutes and 45 °C at 10 minutes, rising in a straight line. What is the gradient (the heating rate)?"
    answer: 2.5
    tolerancePct: 1
    unit: "°C/min"
    explanation: "Gradient = rise ÷ run = (45 − 20) ÷ (10 − 0) = 25 ÷ 10 = 2.5 °C per minute."
  - id: proportional-predict
    type: numeric
    q: "A straight-line graph passes through the origin, and y = 3 when x = 2. What is y when x = 5?"
    answer: 7.5
    tolerancePct: 1
    explanation: "Through the origin means y is proportional to x: y = kx. k = 3 ÷ 2 = 1.5, so y = 1.5 × 5 = 7.5."
  - id: levels-off
    type: mcq
    q: "A graph of plant height against amount of fertiliser rises at first, then becomes flat. What does that tell you?"
    choices: ["Fertiliser always helps more and more", "After a certain amount, extra fertiliser makes no more difference", "The measurements must be wrong", "Height and fertiliser are proportional"]
    answerIndex: 1
    explanation: "Where the curve flattens, adding more of the independent variable no longer changes the dependent one. Something else has become the limit (light, water, space)."
  - id: rain-per-day
    type: numeric
    q: "A rain gauge reading rises in a straight line from 4 mm on day 2 to 16 mm on day 6. On average, how many millimetres of rain fell per day?"
    answer: 3
    tolerancePct: 1
    unit: "mm/day"
    explanation: "Gradient = (16 − 4) ÷ (6 − 2) = 12 ÷ 4 = 3 mm per day."
---
A table of numbers hides its story. A graph shows it at a glance: is it going up, down, levelling off, or not changing at all?

## Drawing a good graph

1. **Axes.** Put the **independent** variable (the one you chose, or time) along the bottom (x-axis). Put the **dependent** variable (what you measured) up the side (y-axis).
2. **Labels and units.** "Time (min)", "Temperature (°C)". A graph without units is a puzzle, not a result.
3. **Scale.** Choose even steps (1, 2, 5, 10…) so your points fill at least half of the paper. The axes don't have to start at zero, but say so if they don't.
4. **Plot** each point with a small, neat × .
5. **Line of best fit.** Don't join the dots. Draw **one** smooth straight line or curve that follows the trend, with about as many points above it as below. Points far away from the line are possible outliers: check them.

## Reading the shape

| Shape | What it means | Example |
|---|---|---|
| Straight line going up | y grows by the same amount for each step in x | water heating steadily |
| Straight line through (0, 0) | y is **proportional** to x: double x, double y | rain collected vs funnel area |
| Curve that flattens | y grows, then stops growing: something else is limiting it | seedling height over many weeks |
| Flat line | changing x makes no difference | |

## Gradient: the rate

The steepness of a straight line is its **gradient**:

$$\text{gradient} = \frac{\text{rise}}{\text{run}} = \frac{y_2 - y_1}{x_2 - x_1}$$

Pick two points **on your line** (not data points), far apart. The gradient has units: °C per minute, mm per day, cm per week. It's the **rate** of change.

**Example.** A pot goes from 24 °C at 5 min to 54 °C at 20 min. Gradient = $(54 - 24) \div (20 - 5) = 30 \div 15 = 2$ °C/min.

## Predicting

- **Interpolation**: reading a value between your measured points. Usually safe.
- **Extrapolation**: extending the line beyond your data. Risky: water heating at 2 °C/min won't keep going past boiling!

## Equation of a straight line

Any straight line can be written

$$y = mx + c$$

where $m$ is the gradient and $c$ is where the line crosses the y-axis. If the line passes through the origin, $c = 0$ and $y = mx$: y is proportional to x.
