---
title: Tune in
kind: build
minutes: 120
video: { youtubeId: "QJr60m4_a1M", credit: "Matthew Fairbanks" }
units: [resonance, rearranging-formulas, scientific-notation]
---
## Do: wind the tuning coil

1. Take a tube about 5 cm across (cardboard or PVC). Make two small holes near one end, and thread the wire through them to anchor it. Leave 30 cm free.
2. Wind **neat, tight turns side by side**, with no gaps and no crossings. Aim for 60–100 turns. Count out loud with a partner.
3. **Taps:** every 10 turns, twist a small loop of wire (about 2 cm), then carry on winding. These loops let you choose how many turns are used.
4. Anchor the far end through two more holes, leaving 30 cm free.
5. Scrape the enamel off both ends and off the tip of each tap loop until it shines.

*(Alternative: wind without taps, then sand a thin strip along the top of the coil and use a sliding clip that touches one turn at a time.)*

## Do: add the capacitor

Your variable capacitor comes from an old radio. Find its two connections: one goes to the moving plates (usually the metal frame or shaft), one to the fixed plates. Turn the shaft and watch the plates slide in and out of each other.

Connect, for now on the guide's diode and earpiece:

- antenna → top of the coil;
- ground → bottom of the coil;
- capacitor across the coil (one side to each end);
- the guide's diode and earpiece across the coil.

## Notice

- Turn the capacitor slowly. Where do stations appear? Mark the dial with tape and a pen.
- Move the clip to different taps. What happens to where the stations appear on the dial?
- With the capacitor removed, can you still hear something? Is it one station or a mix?

**Puzzle:** the antenna catches every station at once. How does turning a knob pick out just one?

## Theory: just enough

Read *Resonance and tuning*. A coil and a capacitor make an electric "swing" with its own natural frequency:

$$f = \frac{1}{2\pi\sqrt{LC}}$$

Only the station at that frequency builds up a big oscillation. Bigger $C$ or more turns (bigger $L$) means lower frequency.

## Do it better: calculate your coil

1. Measure your coil: diameter $d$ and wound length $l$ in cm, and count turns $N$.
2. Estimate its inductance with Wheeler's formula: $L \approx \dfrac{d^2 N^2}{45.7\,d + 101.6\,l}$ µH.
3. Using $C$ from 30 pF to 365 pF, calculate the lowest and highest frequency your radio can tune.
4. Your station is on a known frequency. Rearrange to find the $C$ you need: $C = \dfrac{1}{4\pi^2 f^2 L}$. Is the knob near where you'd expect?

**Example:** $L = 270\ \mu$H and $C = 100$ pF give $f \approx 968$ kHz.

If your coil can't reach a station, change the number of turns used, and predict which way first.
