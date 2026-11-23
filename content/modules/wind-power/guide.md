# Wind Power: guide's notes

For the guide only. About 14 hours, best as six or seven sessions of about two hours, for up to 12 students in teams of three (electronics and blades need close supervision). This is an advanced module: you do every cut, drill and solder, handle the mains fan, and check every circuit before it's powered.

If you haven't built a stepper-motor turbine before, build one completely at home first. Most of the problems students will hit, you'll have hit too.

---

## Before the module

### 1. Shopping and salvage (3–4 weeks ahead)

| Item | Notes |
|---|---|
| Stepper motors | From old inkjet/laser printers and scanners. Bigger and older is better: a NEMA-17-size motor gives several volts when spun fast by hand. Bring screwdrivers to the repair shop; they'll often let you take motors from scrap. Get spares. |
| Multimeters | One per team; check each has an AC-volts range. |
| Diodes | 1N5819 Schottky diodes have a lower turn-on voltage (about 0.3–0.4 V) than 1N4007 (about 0.7 V) and work better at low speeds. Get both, to compare. |
| Capacitors | 1000 µF, 25 V or higher. |
| Charging module | A small "DC–DC boost/buck-boost with USB output" board, input range about 1–5 V or wider, plus a cheap power bank. Test the combination at home: some power banks won't start charging from a weak, varying source. |
| PVC pipe | 110 mm sewer pipe, plus a hub: a thick lid, a plywood disc, or a pipe end cap. |
| Fan | A strong floor or box fan. Check the cable and plug. |

### 2. Prepare blades

Cutting curved blades from PVC pipe takes time. Cut a set of blade blanks for every team before step 4: quarter the pipe lengthways, then cut each quarter into a tapered blade about 30 cm long (7 cm wide at the root, 2 cm at the tip). Students sand and mount them. Keep a template.

### 3. Build the demo for step 1

A hand-crank torch or a bicycle hub dynamo with a small bulb. An old small DC motor opened up is useful for showing magnets and coils.

---

## Safety briefing (step 1; again at steps 4, 6 and 7)

- Glasses on whenever anything spins, or is cut, sanded or soldered.
- **Never stand in the plane of the blades.** A blade that comes loose flies outward along that plane.
- Stop the rotor before touching anything. Teach the brake.
- You alone plug in, move and adjust the fan. Students never touch mains plugs.
- Capacitors: check polarity before connecting; first test with faces back.
- No phones connected to anything. Power banks only through the charging module, after you check the wiring.
- Outdoor tests: short pole (no more than about 2 m), open ground, no power lines, nobody in the plane of the blades.
- Neodymium magnet rules.

---

## Session plans

### Step 1: No fuel, no fire (45 min)

The "harder to turn with the bulb" observation is the most important one of the module. Make sure everyone feels it.

### Step 2: Magnets make current (90 min)

**Expected:** a strong neodymium magnet pushed quickly through 100 turns gives a few millivolts to a few tens of millivolts; 200 turns about double; faster motion gives bigger peaks; reversing the pole or direction reverses the sign. A still magnet gives zero.

### Step 3: Build a generator (150 min)

Can be split across two sessions. With 400 turns, strong magnets and a small gap, a fast hand spin gives roughly 1–4 V AC: enough to flash a red LED (which needs about 1.8 V). Two LEDs facing opposite ways flash alternately, a beautiful way to show AC. Short-circuiting the coil makes the shaft noticeably harder to spin (Lenz's law).

If no LED lights: check enamel is fully scraped from the ends, the magnets face outwards with opposite poles on the two sides, and the gap is small.

### Step 4: Blades (120 min)

Balance matters: unbalanced rotors shake and can break. **Expected:** 2- and 3-blade rotors usually spin fastest; 4–6 blades start more easily in weak wind but spin more slowly. Most teams end up choosing 3 blades, like real turbines. Keep the fan at a fixed setting and distance for fair comparisons, and keep everyone behind the turbine, never beside it.

### Step 5: Power in the wind (90 min)

Typical fan wind speeds are about 2–5 m/s. **Example:** blade radius 0.33 m → A ≈ 0.34 m². At v = 4 m/s, P_wind = 0.5 × 1.0 × 0.34 × 64 ≈ 11 W. If the turbine gives 2.2 V across 47 Ω, P = 2.2² ÷ 47 ≈ 0.10 W, so the efficiency is about 1%. That's typical for a home-made turbine with a stepper motor in fan wind. Don't let low efficiency disappoint students: discuss where the energy goes.

**Adama scale-up:** r = 40 m → A ≈ 5,000 m²; at 10 m/s, P_wind ≈ 0.5 × 1.0 × 5,000 × 1,000 = 2.5 MW; at 40%, about 1 MW.

The best load resistance is roughly equal to the generator's own coil resistance (maximum power transfer); students often find a middle value gives the most power.

### Step 6: From wobbly AC to useful DC (150 min)

Draw the bridge rectifier diagram on the board. Check every circuit before it's powered: diode stripes all oriented correctly, capacitor polarity right, no short across the output. **Expected:** DC output is about 0.6–1.5 V lower than the AC peak because of diode drops (two diodes conduct at a time in a bridge). Schottky diodes lose less. The capacitor removes most of the flicker.

Charging: most boost modules need at least about 1–3 V input to start. In fan wind, a stepper may only just reach this; spinning by hand or in a strong outdoor wind works better. If it won't charge, measuring how close it got is still a good result.

### Step 7: Into the wind (120 min)

Choose a windy afternoon. A short wooden pole driven into the ground or clamped to a fence post is enough; the point is clear wind, not height. Keep students upwind and behind the turbine.

---

## Judging the sign-off items

- **induction:** shows a reading only while moving; names speed, magnet strength and turns.
- **hand-generator:** an LED lights or flashes; explains the extra effort as energy conservation (Lenz).
- **blades:** same fan setting, distance and generator for each test; a reasoned choice.
- **wind-power-calc:** units throughout; a plausible (low) efficiency, with reasons.
- **rectifier:** DC meter reading stays positive; explains diodes as one-way valves and the capacitor as a store that fills in the gaps.
- **working-turbine:** LEDs lit, or the power bank's charge light on, in real or fan wind.

---

## Notes for experts reviewing this draft

- Check the specific charging modules available in Addis, and whether a simpler NiMH charging circuit would be safer and more reliable.
- Review blade-cutting and outdoor mounting safety.
- Check figures for the Adama wind farms.
- Curriculum tags (grades 11–12) need confirming.
