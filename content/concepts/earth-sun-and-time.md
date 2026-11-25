---
title: Earth, Sun and time
summary: How Earth's spin and tilt move the sun across our sky, why days in Ethiopia are almost always 12 hours long, and how solar noon, latitude and Ethiopian time all follow from that.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 9, unit: "Physical quantities and measurement" }
  - { subject: physics, grade: 7, unit: "The Earth in space" }
  - { subject: mathematics, grade: 9, unit: "Trigonometry: right-angled triangles" }
  - { subject: mathematics, grade: 10, unit: "Trigonometric functions" }
problems:
  - id: ethiopian-to-international
    type: mcq
    q: "Your aunt says the shop opens at 3 o'clock in the morning, Ethiopian time (ጠዋት 3 ሰዓት). What time is that on an international clock?"
    choices: ["3:00 am", "6:00 am", "9:00 am", "3:00 pm"]
    answerIndex: 2
    explanation: "Ethiopian daytime hours are counted from about 6:00 am, so add 6 hours: 3 + 6 = 9:00 am. Ethiopian 12 o'clock at dawn is 6:00 am, 1 o'clock is 7:00 am, and 3 o'clock is 9:00 am."
  - id: minutes-per-degree
    type: numeric
    q: "Earth turns 360° relative to the sun in 24 hours. How many minutes does it take to turn through 1°?"
    answer: 4
    tolerancePct: 1
    unit: "min"
    explanation: "24 hours = 1440 minutes. 1440 ÷ 360 = 4 minutes per degree. So a town 1° further west sees solar noon 4 minutes later."
  - id: gondar-noon
    type: numeric
    q: "East Africa Time is set by the sun at longitude 45°E. Gondar is at 37.5°E. Ignoring the equation of time, how many minutes after 12:00 EAT is solar noon in Gondar?"
    answer: 30
    tolerancePct: 3
    unit: "min"
    explanation: "Gondar is 45 − 37.5 = 7.5° west of 45°E. At 4 minutes per degree, 7.5 × 4 = 30 minutes. Solar noon is about 12:30 EAT (6:30 Ethiopian time)."
  - id: equinox-elevation
    type: numeric
    q: "On the equinox (around 20 March) the sun's declination is 0°. Addis Ababa is at latitude 9°N. How high is the sun above the horizon at solar noon, in degrees?"
    answer: 81
    tolerancePct: 1
    unit: "°"
    explanation: "Noon elevation = 90° − (latitude − declination) = 90 − (9 − 0) = 81°. The sun is 9° south of straight overhead, so a stick's noon shadow points a little to the north."
  - id: latitude-from-shadow
    type: numeric
    q: "On 1 December the sun's declination is −21.7°. At solar noon a vertical 1.00 m stick casts a 0.60 m shadow pointing north. What is your latitude, in degrees north? (tan 31.0° ≈ 0.60)"
    answer: 9.3
    tolerancePct: 4
    unit: "°N"
    explanation: "The sun's angle from straight overhead is z, with tan z = shadow ÷ height = 0.60, so z ≈ 31.0°. The shadow points north, so the sun is south of overhead and latitude = declination + z = −21.7 + 31.0 = 9.3°N. That's Addis Ababa."
  - id: eratosthenes
    type: numeric
    q: "Two towns are 500 km apart, one due north of the other. At solar noon on the same day, the sun's angle from overhead differs by 4.5° between them. Estimate Earth's circumference in km."
    answer: 40000
    tolerancePct: 2
    unit: "km"
    explanation: "4.5° is 4.5/360 of a full circle, so 500 km is 4.5/360 of the circumference. Circumference = 500 × 360 ÷ 4.5 = 500 × 80 = 40,000 km."
  - id: why-twelve-hours
    type: mcq
    q: "Why is a day (sunrise to sunset) in Addis Ababa always close to 12 hours, while in London it ranges from about 8 to 16½ hours?"
    choices: ["Addis is closer to the sun", "Near the equator, the tilt changes how much of each day's circle of rotation is in sunlight only a little", "The sun moves faster over Africa", "Addis is high above sea level"]
    answerIndex: 1
    explanation: "As Earth spins, every place travels round a circle of latitude. The line between day and night always cuts the equator's circle exactly in half, and cuts circles near the equator almost in half. Far from the equator, the tilt makes much more or much less than half of the circle lie in daylight."
  - id: overhead-dates
    type: mcq
    q: "In Addis Ababa (9°N), the noon sun is straight overhead, and a vertical pole has no shadow, on about which dates?"
    choices: ["21 March and 23 September", "14 April and 30 August", "21 June only", "Never: Addis is not on the equator"]
    answerIndex: 1
    explanation: "The sun is overhead when its declination equals your latitude, 9°N. On its way north the declination passes 9° around 14 April; on its way back south it passes 9° again around 30 August. On the equinoxes it is overhead at the equator, and on 21 June it is overhead at the Tropic of Cancer (23.4°N)."
---
Ask an older relative what time it is, and they may say *"ሦስት ሰዓት"* (three o'clock) when your phone says 9:00. Both are right. Ethiopian time counts the hours from **dawn**. That only works because, in Ethiopia, dawn comes at almost the same time every day of the year. This unit explains why.

## Earth spins: day, night and the sun's path

Earth spins once a day around its **axis**, the line through the North and South Poles. It turns towards the **east**, so the sun seems to rise in the east, cross the sky and set in the west. The sun isn't moving across the sky: you are being carried round under it.

One full turn relative to the sun takes 24 hours, so Earth turns

$$\frac{360°}{24\ \text{h}} = 15° \text{ per hour} = 1° \text{ every 4 minutes.}$$

The sun's shadow sweeps round a stick at about the same rate. That is what makes a sundial work.

**Solar noon** is the moment the sun is highest in your sky, exactly due south or due north of you. At solar noon:

- a vertical stick's shadow is **shortest**,
- the shadow lies exactly along the **north–south** line,
- the morning and afternoon are mirror images of each other: a shadow at 10:00 solar time is the same length as at 14:00 solar time.

## Latitude and longitude

**Latitude** is how far north or south of the equator you are, as an angle measured from Earth's centre. The equator is 0°, the North Pole 90°N. Addis Ababa is at about **9.0°N**, Hawassa 7.1°N, Bahir Dar 11.6°N, Mekelle 13.5°N.

One degree of latitude is about **111 km** along the ground, because Earth's circumference is about 40,000 km and $40\,000 \div 360 \approx 111$.

**Longitude** is how far east or west you are. Addis is at about 38.7°E. Places further west see the sun rise, reach noon and set later.

## Clock time is not sun time

If every town set its clocks by its own sun, Jijiga (42.8°E) would be about 16 minutes ahead of Addis (38.7°E). Instead, a whole region shares one **time zone**. **East Africa Time (EAT)** is set by the sun at longitude **45°E** (that line runs through the Somali Region of eastern Ethiopia, near Warder).

Addis is $45 - 38.7 = 6.3°$ west of that line, so the sun there reaches noon about

$$6.3 \times 4 \approx 25 \text{ minutes later than } 12{:}00 \text{ EAT.}$$

There is a second, smaller correction called the **equation of time**. Earth's orbit is an ellipse, and its axis is tilted, so the sun runs up to 16 minutes "fast" (early November) or 14 minutes "slow" (mid-February) compared with a steady clock. Putting both corrections together, solar noon in Addis falls between about **12:09 EAT** (early November) and **12:39 EAT** (mid-February).

## Earth is tilted

Earth's axis is tilted by **23.4°** compared with its path around the sun, and it always points the same way in space (towards the Pole Star). So as Earth goes round the sun during the year:

- around **21 June** the northern half leans towards the sun; the noon sun is overhead at the **Tropic of Cancer**, 23.4°N,
- around **20 March** and **23 September** (the **equinoxes**) neither half leans towards the sun; the noon sun is overhead at the **equator**,
- around **21 December** the southern half leans towards the sun; the noon sun is overhead at the **Tropic of Capricorn**, 23.4°S.

The latitude where the noon sun is overhead on a given day is called the sun's **declination**, written $\delta$ (delta). It moves smoothly between +23.4° and −23.4° and back each year.

Seasons are caused by this tilt, **not** by Earth's distance from the sun. Earth is actually closest to the sun in early January.

## The sun overhead in Ethiopia

All of Ethiopia lies between the equator and the Tropic of Cancer, so twice a year the noon sun is **straight overhead** and upright poles have no shadow at noon. That happens when the declination equals your latitude. For Addis (9°N), the declination passes 9° on its way north around **14 April** and on its way back south around **30 August**.

- From about 14 April to 30 August, the noon sun is **north** of overhead in Addis, and noon shadows point **south**.
- For the rest of the year, the noon sun is **south** of overhead, and noon shadows point **north**.

## How high is the noon sun?

If your latitude is $\varphi$ (phi) and the sun's declination is $\delta$, the sun's angle away from straight overhead at noon is

$$z = |\varphi - \delta|$$

and its **elevation** (angle above the horizon) is $90° - z$.

A vertical stick of height $h$ casts a noon shadow of length $s$, and

$$\tan z = \frac{s}{h}, \qquad \tan(\text{elevation}) = \frac{h}{s}.$$

Turned round, a noon shadow tells you your **latitude**:

- if the noon shadow points **north**, $\varphi = \delta + z$,
- if it points **south**, $\varphi = \delta - z$.

**Example.** On 1 December, $\delta = -21.7°$. A 1.00 m stick in Addis casts a 0.594 m noon shadow pointing north. $z = \tan^{-1}(0.594) = 30.7°$, so $\varphi = -21.7 + 30.7 = 9.0°$N.

## Why days in Ethiopia are always about 12 hours

As Earth spins, you travel round a circle of latitude once a day. Half of Earth is always lit. The edge between day and night is a great circle that always cuts the **equator** exactly in half: on the equator, day and night are 12 hours each, all year.

Away from the equator, the tilt makes the edge cut circles of latitude unevenly. In June, more than half of a northern circle is lit (long days); in December, less than half (short days). The further from the equator, the bigger the effect.

| Place | Latitude | Shortest day | Longest day |
|---|---|---|---|
| Quito, Ecuador | 0° | 12 h 7 min | 12 h 7 min |
| Addis Ababa | 9°N | 11 h 36 min | 12 h 39 min |
| London | 51.5°N | 7 h 50 min | 16 h 38 min |
| Oslo | 60°N | 5 h 54 min | 18 h 50 min |

(Day lengths are a few minutes longer than 12 h even on the equator because the air bends sunlight over the horizon, and because sunrise is counted from the sun's top edge.)

In Addis, sunrise moves only between about **6:04 am** (early June) and **6:46 am** (early February) on the EAT clock.

## Ethiopian time

Because sunrise is so steady, it makes a natural start to the day. Ethiopian time counts **12 hours of day from about 6 am** and **12 hours of night from about 6 pm**:

| International (EAT) | Ethiopian | Amharic |
|---|---|---|
| 6:00 am (dawn) | 12 o'clock | ንጋት 12 ሰዓት (*nigat*, dawn) |
| 7:00 am | 1 o'clock | ጠዋት 1 ሰዓት (*t'ewat*, morning) |
| 12:00 noon | 6 o'clock | ቀን 6 ሰዓት (*ken*, day) |
| 3:00 pm | 9 o'clock | ከሰዓት በኋላ 9 ሰዓት (*kese'at behwala*, afternoon) |
| 6:00 pm (dusk) | 12 o'clock | ማታ 12 ሰዓት (*mata*, evening) |
| 9:00 pm | 3 o'clock | ምሽት 3 ሰዓት (*mishit*, night-time) |

To convert, **add or take away 6 hours**. The words around the number (morning, afternoon, night) tell you which half of the day it is.

Ethiopian time is tied to the same EAT clock, so it isn't exactly sun time either. In Addis, sunrise is really between Ethiopian 12:04 and 12:46.

In London, a "dawn clock" would be useless: sunrise there moves by more than four hours across the year.
