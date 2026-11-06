---
title: Mind over machine
kind: finish
minutes: 90
units: [nervous-system, neurons-and-signals, muscle-contraction, sensors-and-signals, microcontroller-basics]
---
## The challenge

Using **only your muscles** — no touching the claw — pick up a light object, lift it (or slide the claw base) and drop it into a cup.

Choose your object:

- **Level 1:** a crumpled paper ball.
- **Level 2:** a plastic bottle cap.
- **Level 3:** something you choose that is harder — a folded piece of paper, a small empty cup. Explain why it's harder.

Before you start: run through the safety check (charger unplugged, electrodes on one forearm, fresh electrodes), recalibrate by pressing RESET, and check your claw opens and closes cleanly.

## Improve

Most claws need a few changes before they grab well. Ideas to test:

- **Grip:** add tape, a strip of rubber band or a bit of foam to the fingertips for friction.
- **Finger shape:** do curved fingers or straighter fingers hold better? Does a thumb opposite the fingers help?
- **String length:** if the claw closes too early or not fully, adjust where the strings tie to the horn, or change `CLOSED_ANGLE`.
- **Holding:** can you keep the claw closed for 10 seconds? What happens to your EMG signal as your muscle gets tired?

Record each change and whether it helped. This is how engineers work: change one thing, test, record.

## Explain the whole chain

Your guide will ask you to explain, out loud and in your notebook, what happens from the moment you decide to clench until the claw closes. Use your own words, and include **numbers** where you can.

Draw the chain as a row of boxes and arrows:

**brain** → **spinal cord** → **motor neuron** → **muscle** → **electrical signal** → **sensor** → **microcontroller** → **motor**

For each arrow, write one sentence: *what is the signal here, and what form is it in?* For example: "Along the motor neuron, the command travels as action potentials at about 50–120 m/s."

Then answer:

1. Does the claw read your thoughts? Exactly which part of the chain does it "listen" to?
2. Where are the delays in the chain? Which is the biggest? (Use your ruler-drop result.)
3. Where is the **threshold** in your body's chain, and where is it in the machine's? (Hint: a neuron fires only above about −55 mV.)
4. How is this like a real prosthetic hand? What would a real one need that yours doesn't have?

## Look back

Go back to your predictions and questions from the very first session.

- Which of your first guesses were right? Which were wrong?
- Answer every question on the class list. If one is still unanswered, write what you would need to find out.

## Sign-off

Your guide will check:

- [ ] Your claw picks up an object under muscle control: clench to close, relax to open.
- [ ] You can explain the full chain from brain to motor in your own words.
- [ ] You calibrated your own threshold and can say why it sits between the relaxed and clenched readings.
- [ ] You computed your reaction time from the ruler test with $t = \sqrt{2d/g}$.
- [ ] Your notebook is complete.

Then: clean up. Remove electrodes slowly, throw them away, disconnect batteries, and put components back in their boxes.
