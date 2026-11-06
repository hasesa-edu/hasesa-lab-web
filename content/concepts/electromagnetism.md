---
title: Electromagnetism
summary: A current makes a magnetic field, a magnet pushes on a current (F = BIL), and a changing magnetic field makes a current. Speakers, motors, microphones and antennas all use this.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 10, unit: "Magnetism and electromagnetism" }
  - { subject: physics, grade: 12, unit: "Electromagnetic induction" }
problems:
  - id: wire-field
    type: mcq
    q: "A compass is placed next to a wire. When a current is switched on in the wire, the compass needle swings. Why?"
    choices: ["The wire gets hot", "The current makes a magnetic field around the wire", "The wire is made of iron", "Electrons jump from the wire to the needle"]
    answerIndex: 1
    explanation: "Any electric current makes a magnetic field around it. This was discovered by Ørsted in 1820 and it is the start of all of electromagnetism."
  - id: reverse-current
    type: mcq
    q: "In your paper-cup speaker, the coil is pushed towards the magnet. What happens if you reverse the direction of the current?"
    choices: ["The coil is still pushed towards the magnet", "The coil is pushed away from the magnet", "Nothing, the force disappears", "The magnet loses its magnetism"]
    answerIndex: 1
    explanation: "Reversing the current reverses the force. Music is a current that keeps reversing hundreds or thousands of times a second, so the coil (and cup) shake back and forth, making sound."
  - id: coil-length
    type: numeric
    q: "You wind 40 turns of wire around a tube 4 cm across. Roughly how much wire is in the coil, in metres? (Each turn is one circumference, π × diameter.)"
    answer: 5.03
    tolerancePct: 3
    unit: "m"
    explanation: "One turn = π × 0.04 m = 0.1257 m. 40 turns × 0.1257 m = 5.03 m. Add some extra for the leads when you cut your wire."
  - id: bil-force
    type: numeric
    q: "A speaker coil has 7.5 m of wire sitting in a magnetic field of 0.2 T, at right angles to it. A current of 0.05 A flows. What is the force on the coil, in newtons? (Use F = BIL.)"
    answer: 0.075
    tolerancePct: 2
    unit: "N"
    explanation: "F = BIL = 0.2 × 0.05 × 7.5 = 0.075 N. Small, but enough to shake a light paper cup."
  - id: induction
    type: mcq
    q: "You move a magnet quickly in and out of a coil connected to a sensitive meter. What do you see?"
    choices: ["Nothing, magnets do not affect copper", "A steady current that stays after you stop", "A current that flows while the magnet moves and changes direction when the motion reverses", "The coil becomes a permanent magnet"]
    answerIndex: 2
    explanation: "A changing magnetic field through a coil induces a voltage (Faraday's law). No change, no voltage. Moving in and out reverses the change, so the current reverses. Radio waves arriving at an antenna do the same thing to its electrons."
---
## Electricity and magnetism are connected

For a long time, people thought electricity and magnetism were separate. Then, in 1820, Hans Christian Ørsted noticed a compass needle twitch when he switched on a current nearby. That was the start of **electromagnetism**, which runs every motor, speaker, microphone, generator and radio on Earth.

There are three big ideas.

## 1. A current makes a magnetic field

Around any wire carrying current there's a **magnetic field** in circles around the wire. Wind the wire into a **coil** and the fields of all the turns add up, so the coil behaves like a bar magnet with a north end and a south end. More turns or more current = stronger field. Put an iron nail inside and it becomes much stronger again: an **electromagnet**.

Unlike a normal magnet, an electromagnet can be switched off, and its poles **swap** if you reverse the current.

## 2. A magnet pushes on a current

Put a wire carrying current in a magnetic field, and the wire feels a **force**. If the wire is at right angles to the field:

$$F = BIL$$

- $F$ = force in newtons (N)
- $B$ = strength of the magnetic field in **teslas** (T). A strong neodymium magnet gives a few tenths of a tesla near its surface.
- $I$ = current in amps (A)
- $L$ = length of wire inside the field, in metres

Reverse the current, or flip the magnet, and the force reverses.

**Worked example.** Your coil has 50 turns, each about 15 cm round, so $L \approx 50 \times 0.15 = 7.5$ m. With $B = 0.3$ T and $I = 0.02$ A:

$$F = 0.3 \times 0.02 \times 7.5 = 0.045\ \text{N}$$

(This is a simplified estimate: in a real speaker not every bit of the wire is at right angles to the field.)

### How a speaker works

Music from a phone is a current that changes direction very quickly, hundreds or thousands of times a second, in exactly the pattern of the sound. The coil sits next to a magnet, so it's pushed one way, then the other, in the same pattern. Glue the coil to something light and wide, like a paper cup, and it pushes the air: **sound**. A motor uses the same force, but arranged to make something spin.

## 3. A changing magnetic field makes a current

Michael Faraday turned idea 1 around. Move a magnet into a coil and a voltage appears across the coil, but **only while the field is changing**. Hold the magnet still and it stops. Pull it out and the voltage reverses. This is **electromagnetic induction**. Faster change = bigger voltage; more turns = bigger voltage.

Bicycle dynamos and power-station generators work this way. So do microphones: sound moves a coil near a magnet, making a small current that copies the sound.

## Why it matters for radio

A radio station drives a huge alternating current up and down its antenna mast. Changing electric and magnetic fields spread out from it at the speed of light: a **radio wave**. When the wave reaches your antenna wire, its changing fields push the electrons in your wire back and forth, making a tiny current. That's the energy your crystal radio runs on. It came all the way from the transmitter.
