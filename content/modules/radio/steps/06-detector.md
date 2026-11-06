---
title: The detector
kind: build
minutes: 90
video: { youtubeId: "G7wzFLegC48", credit: "Backroom Electronics" }
units: [diodes-and-rectification, amplitude-modulation]
---
## Do: the one-way valve

Before the radio, a quick demo with a red LED, a 1 kΩ resistor and a 9 V battery.

1. Connect them in a loop. Does the LED light?
2. Turn **only** the LED round. Now?
3. Turn it back.

The LED is a kind of **diode**: it lets current through one way only. The 1 kΩ resistor stops too much current flowing: check with Ohm's law that it's about 7 mA.

## Do: add your own diode

Now replace the guide's diode with **your own germanium diode** (1N34A or 1N60, a tiny glass part with a stripe at one end).

- Connect it from the top of the coil to one wire of the earpiece.
- Connect the other earpiece wire to the bottom of the coil (the ground side).
- Tune to your station.

## Notice

- Take the diode out and connect the earpiece straight across the coil. What do you hear?
- Put the diode back the other way round. Any difference?
- Try a silicon diode (1N4148) instead. Louder or quieter?
- Try your normal earbuds in place of the crystal earpiece.

**Puzzle:** the signal from the coil is a strong, clean radio wave at the station's frequency. So why is it **silent** without the diode, and why does a one-way valve make it turn into a voice?

## Theory: just enough

Read *Diodes and rectification* and then *Amplitude modulation (AM)*. The station hides sound in the **amplitude** of a fast carrier wave. Your earpiece can't follow a million pushes a second, and the carrier's pushes average to **zero**. The diode cuts away one half, so the average follows the envelope, which is the sound.

Germanium diodes start conducting at about 0.2–0.3 V; silicon needs about 0.6–0.7 V. The radio signal is often only a few tenths of a volt, so germanium wins.

## Do it better

- Sketch three graphs, one above the other: the AM wave from the coil, the signal after the diode, and what the earpiece "feels" (the average).
- A station on 1000 kHz sends a 1 kHz tone. How many carrier cycles fit in one cycle of the tone?
- Try a small capacitor (about 1–10 nF) across the earpiece. Does it change the sound?

## The question it leaves

You now have every part working. Can you build it neatly, find every station the Academy can hear, and explain the whole chain to someone who has never seen a radio?
