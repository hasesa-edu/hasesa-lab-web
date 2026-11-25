---
title: How high is the sun?
kind: investigate
minutes: 90
video: { youtubeId: "pmo6Ht8OxgU", credit: "Jason Kendall" }
units: [trigonometry-for-heights, rearranging-formulas, fair-tests]
summary: "Turn shadow lengths into the sun's angle with the tangent ratio, then use the noon shadow and the date to work out the latitude of Addis Ababa."
---
## Theory: angles from shadows (15 minutes)

Read **Measuring heights with angles** again, then **Rearranging formulas**. This time you know the height and want the **angle**.

The stick, its shadow and the sunbeam past the top make a right-angled triangle. If the stick has height $h$ and the shadow length $s$, then the sun's **elevation** $\alpha$ (alpha, the angle above the horizon) obeys

$$\tan\alpha = \frac{h}{s}, \qquad \text{so} \qquad \alpha = \tan^{-1}\!\left(\frac{h}{s}\right).$$

The sun's angle away from straight overhead is $z = 90° - \alpha$, and $\tan z = \dfrac{s}{h}$.

Use the **tan⁻¹** (or "shift tan") button, in **degrees** mode.

## Do: practice from your shadow plot (15 minutes)

Use the shadow lengths from step 2. For four times (two morning, solar noon, one afternoon), calculate the sun's elevation. Add a column to your table:

| Time (EAT) | $s$ (cm) | $h/s$ | Elevation $\alpha$ (°) |
|---|---|---|---|

How fast does the elevation change in the morning, in degrees per hour? Compare with Earth's spin of 15° per hour. Why is it a bit less?

## Do: a careful noon measurement (30 minutes)

You'll use today's noon shadow to find your latitude, so it has to be good. Plan it like a fair test:

- **What you measure:** the noon shadow length of a vertical stick.
- **What must stay the same:** the stick (same height, checked vertical with the plumb line), level ground, the same way of finding the tip.
- **Repeats:** three people each measure the shadow, without looking at each other's numbers. Take readings every 2 minutes for 10 minutes either side of solar noon. The shortest is the noon shadow.

| Reader | Shortest shadow (cm) |
|---|---|
| 1 | |
| 2 | |
| 3 | |
| **Mean** | |
| **Range** | |

The shadow's tip is fuzzy because the sun is a disc, not a point. Measure to the **middle** of the fuzzy edge.

Note which way the noon shadow points: **north** or **south**.

## Calculate: your latitude (20 minutes)

1. Work out $z$ from the mean noon shadow: $z = \tan^{-1}(s/h)$.
2. Look up the sun's **declination** $\delta$ for today (to the nearest day, between the table values):

| Month | 1st | 10th | 20th |
|---|---|---|---|
| January | −23.1° | −22.1° | −20.3° |
| February | −17.4° | −14.7° | −11.2° |
| March | −7.8° | −4.4° | −0.4° |
| April | +4.3° | +7.7° | +11.3° |
| May | +14.9° | +17.4° | +19.8° |
| June | +22.0° | +23.0° | +23.4° |
| July | +23.2° | +22.3° | +20.8° |
| August | +18.2° | +15.8° | +12.7° |
| September | +8.5° | +5.2° | +1.4° |
| October | −2.9° | −6.4° | −10.1° |
| November | −14.2° | −17.0° | −19.6° |
| December | −21.7° | −22.9° | −23.4° |

3. If the noon shadow pointed **north**: latitude $\varphi = \delta + z$. If it pointed **south**: $\varphi = \delta - z$.
4. The true latitude of Addis Ababa is about **9.0°N**. How close are you? What is your error in degrees, and in kilometres (1° ≈ 111 km)?

## Record (10 minutes)

1. Show your full working for the latitude.
2. Which mistake would matter most: a 1 cm error in the shadow, a stick leaning by 1°, or reading the declination for the wrong week? Test each by redoing the calculation with the changed number.
3. Without measuring, predict the length of a 1.00 m stick's noon shadow in Addis on 14 April. And on 21 December ($\delta = -23.4°$)?
