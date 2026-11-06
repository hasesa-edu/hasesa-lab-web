---
title: Neurons and nerve signals
summary: How a single nerve cell sends an electrical message, and how fast that message travels.
status: ai-draft
public: true
curriculum:
  - { subject: biology, grade: 10, unit: "Coordination and response in humans" }
  - { subject: biology, grade: 11, unit: "Human physiology: the nervous system" }
problems:
  - id: resting-potential
    type: mcq
    q: "A neuron at rest has a small voltage across its membrane. Roughly what is it (inside compared with outside)?"
    choices: ["About +70 mV", "About −70 mV", "About −70 V", "Exactly 0 V"]
    answerIndex: 1
    explanation: "The inside of a resting neuron is about 70 millivolts more negative than the outside: about −70 mV. The sodium–potassium pump keeps it this way. Note mV, not V: 70 mV is only 0.07 V, far smaller than a phone battery."
  - id: myelin-speed
    type: mcq
    q: "Why do myelinated motor neurons carry signals much faster than unmyelinated ones?"
    choices: ["Myelin makes the electricity flow like in a copper wire", "The signal jumps from gap to gap (node to node) instead of creeping along every bit of membrane", "Myelin makes the neuron shorter", "Myelin stores extra sodium for the signal"]
    answerIndex: 1
    explanation: "Myelin is a fatty insulating wrap with small gaps (nodes of Ranvier). The action potential only has to be regenerated at the gaps, so it leaps along — this is called saltatory conduction, from the Latin 'saltare', to jump. It can be 50–120 m/s instead of around 1 m/s."
  - id: spine-to-foot
    type: numeric
    q: "A motor neuron runs 1.0 m from your spinal cord to a muscle in your foot and conducts at 60 m/s. How many milliseconds does the signal take to arrive?"
    answer: 16.7
    tolerancePct: 3
    unit: "ms"
    explanation: "t = d / v = 1.0 / 60 = 0.0167 s = 16.7 ms. Fast, but not instant — and that is one of the longest single cells in your body."
  - id: human-chain-speed
    type: numeric
    q: "In the human-chain activity, 20 students stand in a line 24 m long. A squeeze passes from the first to the last in 4.8 s. What is the speed of the 'signal' through the chain, in m/s?"
    answer: 5
    tolerancePct: 3
    unit: "m/s"
    explanation: "Speed = distance ÷ time = 24 / 4.8 = 5 m/s. That is 10–20 times slower than a real motor neuron, because each student has to see/feel, decide and act — like a synapse plus a brain at every link."
  - id: per-person-delay
    type: numeric
    q: "Same chain: 20 students, 4.8 s from first squeeze to last. What is the average delay per student, in seconds?"
    answer: 0.24
    tolerancePct: 3
    unit: "s"
    explanation: "4.8 s ÷ 20 students = 0.24 s each. That is close to a single person's ruler-drop reaction time — each student is doing a tiny reaction-time test."
  - id: travel-fraction
    type: numeric
    q: "Your ruler-drop reaction time is 0.20 s. The nerve path from brain to hand muscles is 1.0 m, conducting at 80 m/s. What percentage of your reaction time is spent just travelling down that motor nerve?"
    answer: 6.25
    tolerancePct: 3
    unit: "%"
    explanation: "Travel time = 1.0 / 80 = 0.0125 s. As a percentage: 0.0125 / 0.20 × 100 = 6.25%. Most of the delay is not the nerve 'wire' — it is seeing, deciding and passing signals across synapses."
---
## A cell built like a cable

A **neuron** is a nerve cell. It has three main parts:

- **Dendrites** — short branches that *receive* messages from other cells.
- **Cell body** — contains the nucleus; adds up the incoming messages.
- **Axon** — one long fibre that *sends* the message onwards. A motor neuron's axon can be about a metre long, from your spinal cord to your foot!

Many axons are wrapped in **myelin**, a fatty insulating layer, a bit like the plastic coat on a wire.

## A tiny battery in every cell

Every neuron keeps a small voltage across its outer membrane. At rest the inside is about **70 millivolts more negative** than the outside:

$$V_\text{rest} \approx -70\ \text{mV} = -0.070\ \text{V}$$

How? Proteins called **sodium–potassium pumps** use energy (from your food) to push sodium ions ($\text{Na}^+$) out and potassium ions ($\text{K}^+$) in. An **ion** is an atom with an electric charge. This separation of charge is the "battery".

## The action potential: a wave of switching

When a neuron is stimulated enough to pass a **threshold** (about −55 mV), gates in the membrane suddenly open:

1. **Na⁺ rushes in.** The inside swings positive, to about +30 mV. This is the **action potential** or "spike".
2. **K⁺ flows out.** The inside goes negative again.
3. **Pumps reset** the ions, ready for the next spike.

Each spike lasts about **1 millisecond**. The switching at one spot triggers the next spot along the axon, so the spike travels like a line of falling dominoes.

Important: a spike is **all-or-nothing**. It is always about the same size. A neuron cannot send a "bigger" spike for a stronger command. Instead it sends spikes **more often** — and more neurons join in. This idea comes back when we read muscle signals.

## How fast?

- Unmyelinated axon: about **0.5–2 m/s**.
- Myelinated motor axon: about **50–120 m/s**. The spike jumps between gaps in the myelin (called **nodes of Ranvier**) instead of creeping along. This jumping is called *saltatory conduction*.

### Worked example

How long does a command take to travel 0.8 m from your spinal cord to your hand at 60 m/s?

$$t = \frac{d}{v} = \frac{0.8}{60} = 0.0133\ \text{s} \approx 13\ \text{ms}$$

Compare with a ruler-drop reaction time of about 200 ms: the travel is only a small part. The rest is time for your eyes, your synapses and your brain to work.

## The synapse: a chemical handshake

Neurons do not touch. At a **synapse**, the arriving spike makes the axon release chemicals (**neurotransmitters**) that cross a tiny gap and start a new signal in the next cell. This takes about 0.5 ms. At a muscle, the same handshake makes the **muscle fibre** produce its own action potential — and that muscle electricity is what our sensor will detect.

## Domino model — and its limits

In class, a line of dominoes or a chain of students passing a hand-squeeze shows the key idea: the signal is **re-made at every step**, not pushed along like water in a pipe. But a real axon is far faster, and it resets itself in milliseconds — dominoes have to be stood up again by hand!
