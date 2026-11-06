# Mind over Machine — guide's notes

You do **not** need to be an electronics engineer or a biologist to run this module. Everything here is explained step by step. The single most important thing: **build and test the whole claw yourself before the first session.** If it works on your arm, you can fix it on theirs.

## Before the module

### Shopping list (per pair of students unless noted)

Prices are rough international estimates in US dollars to help budgeting — check current local prices in Merkato, Piassa or online, as they change quickly.

| Item | Rough cost | Notes |
|---|---|---|
| Arduino Uno clone + USB cable | $8–15 | Clones with a CH340 chip need a free driver on the laptop. |
| EMG muscle sensor module + snap cable | $10–25 (clone V3 type); $40+ (MyoWare 2.0) | Order early; buy 1–2 spares for the class. |
| Disposable snap gel electrodes (ECG type) | $0.10–0.30 each | 3 per student per session that uses them (steps 5, 6, 7 → about 10 per student, plus spares). Pharmacies / medical suppliers. |
| SG90 micro servo | $2–4 | Buy spares — the plastic gears strip if forced. |
| Breadboard + jumper wires | $3–6 | Male–male and male–female. |
| 2 × 9 V batteries + clips | $3–6 | Only for EMG modules that need ±9 V. Expect to replace them during the module. |
| 4 × AA battery holder + batteries | $2–5 | Rechargeable NiMH (4.8 V) is ideal for the SG90; fresh alkaline (about 6.2 V) is usually OK. |
| Multimeter (one per class or group) | $8–15 | For checking the EMG output stays under 5 V. |
| Cardboard, straws, thread/fishing line, rubber bands, tape, glue | small | Box cardboard works well. |
| Chicken wings | small | One per pair, raw, bought the same morning. |
| Gloves, trays/plastic sheet, paper towel, soap, disinfectant, rubbish bags | small | |
| Rulers (30 cm), one metre stick, dominoes or cards, stopwatch (phone) | small | |

Laptops: one per pair, with the **Arduino IDE** installed and **fully charged**. They will run on battery during electrode work.

### Flash and test the sketch

1. Install the Arduino IDE. Plug in the Arduino; under **Tools → Board** choose "Arduino Uno" and under **Tools → Port** choose the new port. If no port appears on a clone, install the CH340 driver.
2. Upload the short plotting sketch from step 5. Open **Tools → Serial Plotter** at 9600 baud. With nothing connected to A0 you will see a random wandering line — that is normal ("floating" input).
3. Wire the EMG module (see step 5). **Before connecting SIG to A0**, power the module, put electrodes on your own forearm, clench as hard as you can, and measure SIG to GND with the multimeter. It must stay **below 5 V**. If it goes higher, turn the module's gain knob down. (For ±9 V modules this is a real risk; for 5 V modules it cannot exceed 5 V.)
4. Connect SIG to A0 and watch your signal. Note your relaxed and clenched values.
5. Upload the full claw sketch from step 6 and test with a servo alone (no cardboard yet).
6. Check every laptop can upload a sketch. Driver problems eat lessons.

### Build a demo claw

Build one complete claw (step 4 hand + step 6 servo and sketch) for the hook in step 1. Practise the demo several times: it is the moment that hooks the class. Keep a fresh set of electrodes for the demo. Have it calibrated and running **before** students walk in; hide the laptop screen so they see only the arm and the claw.

### Prepare chicken wings safely

- Buy raw wings the **same morning**; keep them cold (cool box or fridge) until the lesson.
- Use one tray per pair, gloves for everyone, and keep all chicken away from where people eat or drink.
- Afterwards: chicken, gloves and paper towels go into a tied bag and straight into an outside rubbish bin. Wipe trays and tables with disinfectant (or soap and hot water, then a bleach solution). Everyone washes hands with soap for 20 seconds.
- Nobody eats the wings — even if cooked later, they have been handled by many people.
- Students who do not want to touch raw meat (for religious, dietary or personal reasons — note that some students may be fasting) can be the "recorder" for their pair, or observe and sketch. Respect this without fuss.

## Safety briefing (read aloud at step 5, repeat at steps 6 and 7)

1. "Electrodes only on the forearm. All three on the **same** arm. Never on the chest or across the body." *Why:* we never want any current path across the heart. Our circuit is tiny and battery-powered, but the rule protects you with any equipment.
2. "Batteries only. The laptop charger is **unplugged from the wall** whenever electrodes are on someone." *Why:* a faulty charger is the only way mains electricity could get into the circuit. On battery, there is no connection to the wall at all.
3. "Anyone with a pacemaker or implanted device — tell me privately, you'll be the engineer, not the test arm."
4. "If the skin itches or burns, peel it off and tell me. One person, one set of electrodes."
5. "Fingers out of the claw when it's powered. Unplug the servo battery before adjusting strings."
6. Scissors: cut away from yourself. Only you (the guide) use a craft knife.

Walk round and **physically check** every laptop charger is unplugged before electrodes go on. Make it a routine: "chargers up!" and students hold up the unplugged plug.

## Session plan

### Step 1 — Hook (45 min)

- **0–10 min: Demo.** Say little. "Watch." Clench, relax, repeat. Let them react. Invite one or two to tell you to "do it again".
- **10–20 min: Predictions.** Students write answers to the four prediction questions alone, *before* discussing. Don't give hints. If asked "is it reading your mind?", reply "What do you think? Write it down."
- **20–30 min: Feel your forearm.** Have everyone feel their forearm move when they wiggle fingers. Many are surprised the finger muscles are in the forearm.
- **30–45 min: Questions.** Collect a class question list on the board; photograph it — you'll return to it in step 7.

**Good questions to ask:** "If I put the sticker on my head, would it work better?" "Why not on my hand?" "What's in the wires — electricity? From where?"

### Step 2 — Reaction time (75 min)

- **0–25 min:** Ruler drop, 5 trials each, swap. Check the zero mark is level with the top of the thumb.
- **25–45 min:** Introduce $t = \sqrt{2d/g}$. Work the 20 cm example on the board together: $\sqrt{0.4/9.8} \approx 0.20$ s. Students calculate their own.
- **45–65 min:** Distraction trials (counting back in sevens), then optional sound/non-writing-hand trials.
- **65–75 min:** Think questions.

**Expected results:** undistracted catches of about 10–20 cm (0.14–0.20 s); distracted catches 15–30 cm or misses (0.17–0.25 s or more). Some students "cheat" by anticipating — look for catches under 5 cm (0.10 s) and vary the delay before dropping.

**Answer key:** the nerve travel (say 1.5 m at 75 m/s ≈ 0.02 s) is only about 10% of the reaction time; most of the time is in the eye, brain and synapses. A 30 cm ruler measures at most $\sqrt{0.6/9.8} \approx 0.25$ s.

**Sticking points:** forgetting cm → m (answers 10× too big — $\sqrt{100} = 10$); forgetting the 2; pressing √ before dividing. Ask: "Is 2 seconds a reasonable reaction time? So something went wrong — what?"

### Step 3 — Neuron chain (75 min)

- **0–25 min:** Hand-squeeze chain, 3 runs, eyes closed. Then shoulder taps. Then dominoes.
- **25–40 min:** Calculate speed and delay per person.
- **40–60 min:** Theory: neuron parts, −70 mV, action potential, all-or-nothing. Use the class chain as the model: "Each of you **re-made** the squeeze — that's an action potential being regenerated."
- **60–75 min:** "Do it better" variations (myelin with a rope between people; refractory "one-thousand"; how to show a stronger command — answer: **more squeezes per second**, not harder squeezes).

**Expected results:** about 0.2–0.4 s per person, so a chain of 20–30 students takes 5–10 s; speeds of a few m/s. A real motor neuron is roughly 10–50 times faster.

**Sticking points:** students think electricity flows down nerves like current in a copper wire. Correct gently: it is a wave of ions moving in and out of the membrane, re-made at each point — much slower than electricity in a wire. Another: "a strong signal is a big spike" — no, it's *more* spikes and *more* neurons.

### Step 4 — Tendons and cardboard hand (90 min)

- **0–5 min:** Hygiene briefing, gloves on.
- **5–35 min:** Dissection. Show the first cut yourself. The aim is to see tendons and pull them, not to take the wing apart.
- **35–45 min:** Clean-up routine (bag, disinfect, wash hands). Do not skip or rush this.
- **45–55 min:** Theory recap: antagonistic pairs, sliding filaments, levers.
- **55–90 min:** Build the cardboard hand. Two or three fingers plus a thumb is plenty.

**Expected results:** pulling the tendons on the inner side of the "forearm" bends the wing tip one way, the outer ones straighten it. Cardboard fingers curl when strings are pulled; rubber bands on the back help them reopen.

**Answer key:** string 1 cm from the joint, tip 6 cm from it → the tip moves about 6 times as far as the string. Biceps problem: $F = 19.6 \times 0.32 / 0.04 = 156.8$ N.

**Common build problems:** folds too stiff (fold back and forth more, or score the line lightly); string slips (knot it through a small hole at the tip, plus tape); fingers don't reopen (add rubber bands on the back); straws in the way of folds (leave a gap at each joint).

### Step 5 — See your signal (90 min)

- **0–10 min:** Safety briefing (above). "Chargers up!" check.
- **10–30 min:** Wiring and upload of the plotting sketch. Check each group's EMG output with the multimeter before SIG goes to A0 (±9 V modules).
- **30–40 min:** Skin prep and electrode placement — demonstrate on your own arm.
- **40–60 min:** Explore: gentle/hard clench, fingers, wrist, talking, cable swing.
- **60–75 min:** Theory: EMG, amplification, ADC, recruitment.
- **75–90 min:** Optimise placement; think questions.

**Expected results:** relaxed readings low and fairly flat (often 20–150, depends on module and gain); a firm clench several hundred higher. Exact numbers vary a lot between modules and people — what matters is a **clear gap**.

**Answer key:** 614 → $614 \times 5/1023 \approx 3.0$ V. 0.5 mV × 2000 = 1.0 V. The laptop must be off mains so there is no path at all from the wall socket through the USB cable to the skin.

**Sticking points:** "the sensor reads my brain" — no, it reads electricity from the muscle fibres themselves, triggered by the motor neurons. "Why does a stronger clench give a bigger signal if spikes are all-or-nothing?" — more motor units, firing more often, all adding together under the electrodes.

### Step 6 — Build the claw (135 min, can be split across two sessions)

- **0–10 min:** Safety check.
- **10–40 min:** Mount servo, fit horn, tie strings.
- **40–60 min:** Add servo wiring; check shared ground on every group before power.
- **60–80 min:** Upload sketch, calibrate, first test.
- **80–95 min:** Theory: setup/loop, if, servo.write, calibration, hysteresis.
- **95–135 min:** "Do it better" experiments and think questions.

**Expected results:** after calibration the claw closes within a fraction of a second of a firm clench and opens on relaxing. Calibration example: relaxed 120, clenched 480 → threshold 300, margin 36.

**Answer key:** a threshold too close to relaxed (relaxed + 20) makes the claw close by itself from noise; one above clenched never closes. With margin 0 the claw flickers near the threshold. A partner's arm needs its own calibration because skin, fat, muscle size and electrode position change the signal.

### Step 7 — Finish (90 min)

- **0–10 min:** Safety check, recalibrate.
- **10–45 min:** Challenge and improvements.
- **45–70 min:** Chain explanations — go round and listen to each student individually (this is a sign-off item).
- **70–85 min:** Look back at the step 1 question list.
- **85–90 min:** Clean-up.

## Common problems and fixes

### Noisy or weak EMG signal

- **Electrode placement:** both muscle electrodes on the bulge of the forearm flexors (inner forearm, about a third of the way from elbow to wrist), 2–3 cm apart, lined up along the muscle. Have the student clench and feel for the hardest spot.
- **Reference electrode:** must be on a **bony** area with little muscle — bony point of the elbow or the knob of bone at the back of the wrist. On a muscle, it adds signal and noise.
- **Skin prep:** wipe with damp cotton (or alcohol wipe) and let dry. Lotion or oily skin makes a poor contact. Arm hair under the gel can lift electrodes — choose a less hairy spot.
- **Old electrodes:** gel dries out. Use fresh ones from a sealed pack; don't reuse.
- **Cable movement:** tape the cable to the arm; rest the arm on the table. A swinging cable makes big false spikes.
- **Mains interference:** stay away from wall sockets, extension leads and chargers. Even an unplugged charger cable lying on the arm can pick up hum if it's near a powered socket.
- **Flat line at 0:** check SIG is in A0 (not another pin), grounds joined, batteries fresh (9 V batteries run down quickly — measure them; below about 7.5 V, replace).
- **Line stuck near 1023 or very high:** gain too high — turn the gain knob down.
- **Other muscles:** talking, shrugging or gripping the chair makes signal. Ask the student to sit still and relaxed.

### Servo jitters, buzzes or the Arduino resets

- **Power:** power the servo from its own 4 × AA pack, not from the Arduino 5 V pin.
- **Shared ground:** servo brown wire, battery pack −, EMG ground and Arduino GND must all be connected. This is the number-one cause of a twitchy servo.
- **Weak batteries:** replace the AA cells.
- **Buzzing when closed:** the servo is pushing against the claw. Reduce `CLOSED_ANGLE` a little, or loosen the strings.
- **Servo turns the wrong way:** swap the values of `OPEN_ANGLE` and `CLOSED_ANGLE`.

### Threshold problems

- **Claw closes on its own:** threshold too low — recalibrate (press RESET) while truly relaxed; check electrodes are firmly stuck; cable taped.
- **Claw never closes:** threshold too high — the student probably clenched hard during calibration but can't repeat it, or the relaxed phase included movement. Recalibrate with a firm but comfortable clench. If the Serial Monitor says "Gap too small", fix the electrodes first.
- **Claw flickers:** signal hovering near threshold; check margin isn't 0, clench more decisively, improve signal (see above).
- **Works for one student, not their partner:** expected! Each person must recalibrate.

### Uploading problems

- No port: try another USB cable (some are charge-only), install CH340 driver for clones.
- "Upload error": close the Serial Plotter/Monitor, re-select port and board, try again.

## Conceptual sticking points and good questions

- **"It reads my mind."** Ask: "If you think about clenching but don't move, does the claw close?" (Try it — usually no, or very faintly.) The machine reads **muscle activity**, the last link before movement.
- **"Electricity in nerves is like in wires."** Ask: "If it were like a copper wire, how fast would it go? So why is your reaction 0.2 s?"
- **"Bigger spikes mean stronger."** Ask: "If every squeeze in our chain had to be the same, how could we send a 'strong' message?"
- **"Muscles push."** Ask: "Then why do you need a second muscle to straighten your arm?"
- **Threshold as an idea:** neurons fire above about −55 mV; our program fires the motor above its threshold. Ask: "Where else is there a threshold in this project?"
- **Units:** keep asking "in what units?" for every number.

## How to judge each sign-off item

1. **Claw picks up an object under muscle control** — watch live. The student's hands do not touch the claw. Clench to close and relax to open must both work. At least a Level 1 object (paper ball) is held long enough to move it or lift it. Two out of three attempts is a pass.
2. **Explains the brain-to-motor chain** — one-to-one conversation, 2–3 minutes. They should name, in order, brain → spinal cord → motor neuron → muscle → electrical signal → sensor → microcontroller → motor, and for most links say what form the signal takes (action potential; muscle fibre electricity; amplified voltage; number 0–1023; servo angle). They must make clear the machine reads the **muscle**, not thoughts. Accept their own words; don't require jargon if the meaning is right.
3. **Calibrated their own threshold** — they show you their relaxed, clenched and threshold numbers (Serial Monitor or notebook), the threshold is between the two, and they can say why: "so noise when relaxed stays below it and a clench goes above it."
4. **Computed reaction time** — notebook shows distance in metres, the formula $t = \sqrt{2d/g}$, the working, and a time in seconds in a sensible range (roughly 0.1–0.3 s). Check the cm → m conversion.
5. **Notebook complete** — predictions from step 1, measurement tables (ruler, chain), calculations with units, dissection sketch, wiring diagram with grounds, claw design changes, and answers to the think questions. Neatness doesn't matter; completeness and honesty do (wrong first predictions should stay, not be erased).
