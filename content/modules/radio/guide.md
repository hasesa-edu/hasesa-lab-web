# Radio: guide's notes

This module is written for a physics teacher who has never built a radio. You don't need to be a radio expert. You do need to **build one yourself before the first session**, and to **check that a station can be received at the Academy**. Most of the problems you'll meet below come down to one thing: the energy from the antenna is tiny, so every connection matters.

Total time: about 10 hours over seven steps (45 + 75 + 90 + 90 + 120 + 90 + 90 minutes).

---

## Before the module

### 1. Check which stations you can receive (do this first)

A crystal radio has no amplifier, so it only works with a **strong medium-wave (AM) station**, usually one within a few tens of kilometres, or a very powerful one further away.

1. Buy or borrow a cheap ordinary radio with an **AM / MW** band (not only FM).
2. At the Academy, in daytime and again in the evening, tune slowly through the whole MW band (about 530–1700 kHz). Write down every station you hear, its frequency (from the dial or display) and how strong it is.
3. Try it indoors and outdoors. If the cheap radio can only just hear a station, a crystal radio probably won't.

You need at least one station that's **loud and clear on the cheap radio in the daytime**. Note its frequency: students use it in the antenna problem (step 4) and the tuning calculation (step 5).

**If you find no strong MW station:**

- Try at night: medium-wave reception improves after dark, and you may run an evening session for steps 5–7.
- Try a different site (a hilltop, a roof, an open field away from buildings and power lines).
- Make the antenna longer (30 m or more) and higher, and improve the ground.
- **Backup plan:** a "transmitter in a box". An adult with radio knowledge can set up a very low-power AM test transmitter in the room (kits are sold for testing old radios). Check with the Academy that this is allowed. As a last resort, run the build with the cup speaker and the guide's demo, and present the radio part as a demonstration using the cheap radio. Tell students honestly why: that's real science too.

### 2. Shopping and preparation (2–3 weeks ahead)

- Enamelled copper wire 0.3–0.5 mm (about 30 m per student, plus spare). Motor-rewinding shops in Merkato sell it by weight.
- Germanium diodes 1N34A or 1N60, two per student. These are the hardest part to find locally; order online early if needed. **Silicon diodes will not do.**
- Crystal (piezo) earpieces, one per student. If not available, buy bare **piezo discs** (the thin brass disc with a ceramic centre, without any circuit board) and solder two leads to each. A piezo disc pressed against the ear works as a crystal earpiece.
- Variable capacitors: collect old broken AM radios from repair shops and pull out the tuning capacitor (the part attached to the tuning knob, with metal plates or in a small square plastic case). Plastic "polyvaricon" capacitors have three or four tabs: use the middle tab (the frame) and the larger-capacitance outer tab (try both and keep the one that tunes lower).
- Tubes, boards, clips, sandpaper, magnets, paper cups, old earphone cables, LED, 1 kΩ resistor, 9 V battery, slinky, rope, tray.
- Antenna wire (30 m), insulators, nylon rope, ground clamp or rod.

### 3. Build the demo radio (at least a week ahead)

Build the full radio yourself exactly as students will (steps 4–7). This is the radio you play in step 1, and it's your reference when a student's radio doesn't work: swap parts one at a time between the two radios to find the fault.

Typical working values: 5 cm tube, 80 turns of 0.4 mm wire with taps every 10 turns (about 270 µH), a 30–365 pF variable capacitor, a 1N34A diode, a crystal earpiece.

### 4. Put up the antenna

Put up a permanent antenna (or two) before the module starts, so you know it works. Students then put up their own in step 4. Pick a route **far from power lines** and away from metal roofs if possible.

---

## Safety briefing

Give this at the start of step 1 and again before going outside in step 4. Make students repeat the key points back.

- **Mains:** no part of this project ever goes near a mains socket. 220 V kills.
- **Power lines:** the antenna goes nowhere near them. If a wire ever touches one, nobody touches the wire or the radio. Call the power company.
- **Lightning:** an outdoor antenna can carry a lightning strike indoors. Never put it up, touch it or listen during a storm, or when thunder can be heard. When storms are forecast (especially in the kiremt rainy season), disconnect the antenna from the radio and leave its end outside, away from people, or connect it straight to the ground rod.
- **Height:** ladders only with an adult holding them; nobody climbs on roofs alone; you decide who climbs.
- **Soldering iron** (if you use one): only you use it, always on its stand, cool before packing away.
- **Neodymium magnets:** they pinch hard. Keep them away from phones, cards and pacemakers. Collect them all at the end of each session. Two swallowed magnets can tear the gut, so they must never go home with younger siblings.
- **Wire ends** are sharp: point them away from faces.

---

## Session plans

### Step 1: The radio with no battery (45 min)

| Time | What happens |
|---|---|
| 0–10 | Safety briefing. |
| 10–20 | Play the demo radio. Everyone listens. Don't explain anything yet. |
| 20–30 | Predictions in notebooks; test a few (unclip antenna → silence; reverse diode → still works, roughly the same; earbuds → silence). |
| 30–40 | Draw and label; tell them the real names. |
| 40–45 | Group question list on a big sheet; keep it on the wall for the whole module. |

**What to say:** "Your phone has a battery. This doesn't. By the end of next week you'll have built one and you'll be able to tell me exactly where its energy comes from."

**Expected student ideas:** "the coil stores electricity", "static", "the earth", "the sun", "magnets". Accept everything; don't correct. The real answer (the energy comes from the transmitter, through the air) should be discovered by step 4.

Note: reversing the diode usually still works. The earpiece responds to the envelope whichever half is let through. Let students be surprised; it's a good question for step 6.

### Step 2: Make waves (75 min)

| Time | What happens |
|---|---|
| 0–25 | Rope and slinky on the floor: pulses, steady waves, slow vs fast, transverse vs longitudinal. Tape on the rope stays in place. |
| 25–50 | Water tray: count ripples in 10 s, measure λ, fill the table. |
| 50–65 | Discuss: $f \times \lambda$ stays about constant. Introduce $v = f\lambda$. |
| 65–75 | Rope: measure v by timing a pulse; predict λ for a counted shake. |

**Expected results:** water ripples in a shallow tray go roughly 15–30 cm/s; a rope on the floor, a few m/s. Measurements will be rough (±30%), and that's fine. The point is that $f$ up means $\lambda$ down.

**Where they get stuck:** thinking that shaking faster makes the wave go faster. Ask: "Did the pulse get to the end any sooner when you shook faster?" Also, confusing a wavelength with the distance between a crest and a trough (that's half a wavelength).

### Step 3: Coil speaker (90 min)

| Time | What happens |
|---|---|
| 0–30 | Wind coils, sand the ends, glue to cups. |
| 30–45 | Prepare earphone cables (you strip/burn the coating on the thin enamelled strands with a lighter or solder iron, carefully). |
| 45–65 | Connect, play music, add the magnet. |
| 65–90 | Theory talk: current makes a field; $F = BIL$; change one variable and record. |

**Expected results:** faint but clearly recognisable music with the magnet held right against the coil; almost nothing without it. Louder with more turns and stronger magnets.

**Common problems:**
- *No sound:* enamel not removed (scrape until shiny copper all the way round); earphone strands still coated (test with a multimeter); phone volume too low; phone has no headphone socket and no adapter.
- *Very quiet:* magnet too far from the coil; cup too stiff; too few turns.
- Some phones lower the volume or say "headphones not detected" with an odd load. Try another phone or a cheap MP3 player.

**Questions to ask:** "What would happen if the current always flowed the same way?" (the coil would be pushed once and stay there: a click, not music). "What's moving the air?"

### Step 4: Catch the wave (90 min)

| Time | What happens |
|---|---|
| 0–10 | Safety briefing again (power lines, lightning, ladders). |
| 10–50 | Outside: choose the route, tie insulators, raise the wire, make the ground. |
| 50–65 | Test with the demo radio: long wire, short wire, no ground. |
| 65–90 | Theory: EM waves, $c$, the antenna problem with your real local station. |

**Answer key, the antenna problem** (replace with your station's frequency): for 900 kHz, $\lambda = 3.0\times10^8 \div 9.0\times10^5 \approx 333$ m; quarter-wave ≈ 83 m. For 600 kHz: 500 m and 125 m. For 1200 kHz: 250 m and 62.5 m. A 20 m antenna is roughly 15–25 times shorter than a wavelength.

**Expected results:** the long, high antenna with a good ground is clearly louder. No ground: much quieter or silent. Short 2 m wire: silent or almost silent.

**Where they get stuck:**
- "The antenna has to be exactly one wavelength." No: any wire picks up some energy; longer and higher picks up more; resonance in the tuned circuit does the rest.
- "Radio waves are sound waves." Ask: "How fast is sound? Could a station in another city reach us in a thousandth of a second at that speed?" Radio waves are light-speed EM waves; the sound is carried *inside* them (step 6).
- Scientific notation slips: insist that they write each step and estimate first ("a few hundred metres").

### Step 5: Tune in (120 min)

| Time | What happens |
|---|---|
| 0–40 | Wind the tuning coil with taps (this takes time; count turns in pairs). |
| 40–55 | Fit the capacitor. Identify its terminals. |
| 55–80 | Connect to antenna, ground and the guide's diode and earpiece. Find stations, mark the dial. |
| 80–100 | Theory: resonance, $f = 1/(2\pi\sqrt{LC})$, swing analogy. |
| 100–120 | Calculate their own coil's L and tuning range. |

**Answer key (typical coil):** 5 cm tube, 80 turns, 3.6 cm long → $L \approx 270$ µH. With 30–365 pF: from about 510 kHz to 1770 kHz. For a 1000 kHz station with 250 µH you need about 101 pF. Students' measured values will be **lower** than calculated, because the antenna adds its own capacitance. Explain this as a real-world effect, not a mistake.

**Expected results:** the station peaks at one place on the dial. Changing the tap moves where it appears: fewer turns → the station appears with more capacitance (plates further in). With a long antenna and no capacitor at all, they may still hear a station (the antenna's own capacitance tunes the coil) or a jumble.

**Common problems:**
- *Station everywhere on the dial, no tuning effect:* the antenna's capacitance is swamping the tuned circuit. Connect the antenna to a tap a few turns down instead of the top, or put a small capacitor (about 100 pF) in series with the antenna. This makes the tuning sharper but a bit quieter.
- *Can't reach the station:* the coil needs more turns (station appears at the end of the dial with plates fully in → add turns) or fewer (station is past the "plates fully out" end → use a lower tap).
- *Crackling:* loose tap contact; a tap still has enamel on it.
- *Capacitor plates touching (shorting)* in salvaged metal capacitors: you hear the station vanish at one spot. Check by eye or with a multimeter.

**Where they get stuck:** students think the capacitor makes the signal stronger, rather than choosing the frequency. Ask: "Is the station louder in the middle of the dial, or just *there*? What changes when you turn it: the loudness, or *which* station?" And the inverse relationship: "Bigger C, higher or lower frequency? Use the formula to prove it."

### Step 6: The detector (90 min)

| Time | What happens |
|---|---|
| 0–15 | LED demo: lights one way, not the other. Ohm's law check (7 mA). |
| 15–40 | Students fit their own germanium diode; tune in. |
| 40–55 | Experiments: no diode, reversed diode, silicon diode, normal earbuds. |
| 55–80 | Theory: rectification, AM, envelope; sketch the three graphs. |
| 80–90 | Problem: carrier cycles per audio cycle. |

**Expected results:**
- No diode: silence (or very faint, because some earpieces rectify a little themselves).
- Diode reversed: still works, about the same loudness. Explain: either half of the wave follows the same envelope.
- Silicon diode: much quieter or silent; it needs 0.6–0.7 V to turn on.
- Normal earbuds: silence or near-silence; 16–32 Ω loads the tuned circuit far too much.
- Small capacitor across the earpiece: little change, maybe slightly clearer. Crystal earpieces already have capacitance.

**Where they get stuck:** "If the diode throws half the signal away, why doesn't it get quieter?" Answer: without the diode you get *nothing*, because the average is zero. Half of something beats all of nothing. Another: "Why can't the earpiece just follow the carrier?" Ask how fast the cup speaker could shake: a thousand times a second, maybe; a million, never.

**Answer key:** 1000 kHz carrier, 1 kHz tone → 1000 carrier cycles per tone cycle.

### Step 7: Finish and explain (90 min)

| Time | What happens |
|---|---|
| 0–40 | Mount everything on the board; label terminals; test. |
| 40–60 | Station log (all taps, whole dial). |
| 60–80 | Whole-chain explanation; return to the step 1 mystery page. |
| 80–90 | Sign-off, one student at a time. Students waiting help each other or improve their logs. |

If possible, arrange one short evening session (or ask students to listen at home with an antenna, following the storm rules) to log extra night-time stations.

---

## Troubleshooting checklist: "I hear nothing"

Work through in this order. Swap parts with your demo radio to isolate the fault.

1. **Antenna and ground connected?** Both clipped on firmly, the antenna not touching walls or metal, the ground clamp on bare (scraped) metal pipe or a rod in damp soil.
2. **Enamel scraped off?** Every wire end and every tap must be shiny copper. This is the number one fault.
3. **Earpiece type?** Must be a crystal/piezo earpiece. Normal earbuds won't work.
4. **Diode:** germanium, not silicon. Not broken (the glass cracks easily if the legs are bent close to the body). Test it in your demo radio.
5. **Circuit correct?** Capacitor across the coil (not in series with the earpiece); diode between the top of the coil and the earpiece; earpiece back to the ground side.
6. **Tuning:** sweep the whole dial slowly, at every tap. The station may be at the very end.
7. **Station on air?** Check with the cheap AM radio right now. Stations sometimes go off air, or have breaks in transmission.
8. **Capacitor shorted?** Plates touching at some positions.
9. Still nothing? Plug their coil into your radio, then their capacitor, then their diode, then their earpiece, one at a time.

"I hear a buzz/hum": the antenna is picking up interference from nearby power lines or mains wiring. Move the antenna further from buildings' electrical wiring.

---

## Judging the sign-off items

| Item | Pass when… | Not yet if… |
|---|---|---|
| **receives** | You hear speech or music clearly enough to tell what it is, with the student tuning it (not you). | Only a faint mush, or only when you hold the wires. Help them fix joints and retest. |
| **explains-tuning** | They say, in their own words, that the coil and capacitor have a natural frequency, that only the station at that frequency builds up (like pushing a swing at the right rhythm), and that more C or more turns lowers the frequency. | They say "the capacitor makes it louder" or can't say which way f changes. |
| **explains-diode** | They explain that the carrier pushes up and down equally, too fast for the earpiece, so it averages to zero; the diode lets one half through so the average follows the sound. Bonus: why it still works reversed. | They say "the diode cleans the signal" or "makes it DC" with no link to the sound. |
| **antenna-problem** | Correct λ = c/f for a real local station (within a few percent), with units and scientific notation, and a sensible reason the antenna can be shorter (any wire catches some energy; the tuned circuit picks the frequency). | Power-of-ten error, or no reason given. Let them correct it and pass. |
| **station-log** | A table with at least the dial position, what was heard and loudness, ideally with tap, time and calculated frequency. | Missing or one empty line. |
| **whole-chain** | A drawing from transmitter to ear, with one correct sentence per part, and the answer "the energy came from the transmitter, through the air". | A part is missing, or they still think the coil or the ground supplies the energy. |

Ask follow-up questions rather than marking answers wrong: "What would you hear if…?", "Show me on your radio." Students who explain well while pointing at their own radio understand it.

---

## Notes for experts reviewing this draft

- Station frequencies are deliberately left out: check what is actually receivable at the Academy.
- The local availability of 1N34A/1N60 diodes and crystal earpieces in Addis needs confirming.
- Curriculum placements in the concept units are guesses and need checking against the current Ethiopian syllabus.
