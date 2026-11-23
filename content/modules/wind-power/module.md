---
title: Wind Power
tagline: Build a wind turbine that makes real electricity
disciplines: [physics, technology, mathematics]
level: advanced
hook: "Near Adama, rows of giant white turbines turn slowly in the wind and send electricity to homes hundreds of kilometres away. There's no fuel inside them, no battery and no fire. How does spinning a shaft in the wind make electricity?"
goal: "Discover electromagnetic induction, build a generator from magnets and wire, design and test turbine blades, measure the power in the wind and how much of it your turbine captures, and turn its output into steady DC that lights LEDs and charges a battery pack."
whatYouBuild: "A small horizontal-axis wind turbine with PVC blades and a salvaged stepper-motor generator, a rectifier circuit that turns its AC into DC, and a test log of voltage, current and power at different wind speeds. Along the way, a hand-spun coil-and-magnet generator that lights an LED."
hours: 14
status: ai-draft
publicSample: electromagnetic-induction
materials:
  - { item: "Enamelled copper wire, 0.2–0.3 mm, about 50 m per team", note: "Electronics and motor-rewinding shops in Merkato." }
  - { item: "Neodymium magnets, 6–10 per team, plus a few strong bar magnets", note: "Small strong discs; old hard drives also contain powerful ones." }
  - { item: "Digital multimeter, one per team", note: "Electronics shops. Basic models measure AC and DC volts and DC current." }
  - { item: "Red LEDs, 1N4007 or 1N5819 diodes (8 per team), 1000 µF 25 V capacitors, resistors (10 Ω, 47 Ω, 100 Ω, 1 kΩ), breadboard and jumper wires" }
  - { item: "Stepper motors salvaged from old printers or scanners, one per team", note: "Repair shops in Merkato and Piassa sell broken printers cheaply. Larger steppers give more power." }
  - { item: "A 5 V USB 'boost' or 'buck-boost' charging module and a cheap power bank, or 2–4 rechargeable AA NiMH cells with a holder", note: "Never charge a phone directly from the turbine." }
  - { item: "PVC pipe, 110 mm (sewer pipe), about 60 cm per team; a hub (a thick plastic lid, wooden disc or a coupler)", note: "Plumbing shops. The guide cuts blades with a hacksaw or jigsaw." }
  - { item: "Small bolts, nuts, a drill (guide only), sandpaper, cable ties, a short wooden or metal pole and a tail vane" }
  - { item: "A strong electric fan (or box fan) for indoor testing", note: "The guide plugs it in and controls it." }
  - { item: "Cardboard, a nail, a cork or bottle cap, and a shaft (a pencil or steel rod), for the hand generator" }
  - { item: "An anemometer (from the Weather Station module) or a phone wind app, a stopwatch and a phone for slow-motion video" }
  - { item: "Soldering iron and solder (guide only), electrical tape" }
  - { item: "Safety glasses for everyone, work gloves" }
safety:
  - "Spinning blades can cut. Never stand in the plane of the blades (in line with the circle they sweep), never put hands near them while they turn, and stop them with the brake or by turning the turbine out of the wind before touching."
  - "Safety glasses on whenever a turbine, fan or blade is running, being cut or being sanded."
  - "Only the guide uses saws, drills and the soldering iron. Cut PVC edges are sharp: sand them smooth."
  - "The fan runs on mains electricity. Only the guide plugs it in, moves it or adjusts it. Turbines are never connected to mains in any way."
  - "Electrolytic capacitors are polarised. Connected the wrong way round they can burst. Check the stripe (negative) before connecting, and keep your face away when first testing."
  - "Never connect the turbine directly to a phone, and never to a lithium battery without a proper charging module and the guide's check."
  - "Outdoor tests: the guide mounts the turbine on a short pole, in open ground away from power lines, people and paths. No climbing, no roofs, no testing in storms."
  - "Neodymium magnets snap together and pinch. Keep them away from phones, bank cards and pacemakers. Swallowing two magnets is a medical emergency."
signoff:
  - { id: induction, text: "Showed with a coil, a magnet and a meter that a moving magnet induces a voltage, and explains the three things that make the voltage bigger." }
  - { id: hand-generator, text: "Built a coil-and-magnet generator that lights an LED when spun, and explains why it's harder to turn when the LED is connected." }
  - { id: blades, text: "Tested at least two blade designs fairly (same wind, same generator) and chose the better one using measurements." }
  - { id: wind-power-calc, text: "Calculated the power in the wind for their turbine, the electrical power out (P = VI or V²/R), and the efficiency, with units." }
  - { id: rectifier, text: "Built a rectifier and smoothing capacitor, showed with a meter that it turns AC into steady DC, and explains how." }
  - { id: working-turbine, text: "The finished turbine lights LEDs or charges the battery pack through the charging module in real or fan-made wind." }
---
Ethiopia gets most of its electricity from water, and a growing share from wind. In fourteen hours you'll discover the physics that turns motion into electricity, build a generator with your own hands, and then build a wind turbine that makes real, usable power.

1. **No fuel, no fire** (45 min). See a generator light a bulb, and wonder how.
2. **Magnets make current** (90 min). Move magnets through coils and measure what happens.
3. **Build a generator** (150 min). Wind a coil, spin a magnet, light an LED.
4. **Blades** (120 min). Design, cut and test turbine blades.
5. **Power in the wind** (90 min). How much power is in the wind, and how much do you capture?
6. **From wobbly AC to useful DC** (150 min). Rectify, smooth and charge.
7. **Into the wind** (120 min). Put it together, test it outdoors, and explain it.

By the end you'll understand electromagnetic induction, generators, AC and DC, rectification, power, efficiency and the physics of wind, and you'll have a working turbine.
