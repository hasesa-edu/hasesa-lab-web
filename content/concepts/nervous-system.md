---
title: The nervous system
summary: How the brain, spinal cord and nerves carry messages from your senses to your muscles.
status: ai-draft
public: false
curriculum:
  - { subject: biology, grade: 10, unit: "Coordination and response in humans" }
  - { subject: biology, grade: 11, unit: "Human physiology: the nervous system" }
problems:
  - id: cns-parts
    type: mcq
    q: "Which parts make up the central nervous system (CNS)?"
    choices: ["The brain and the spinal cord", "The brain and the eyes", "All the nerves in the arms and legs", "The heart and the brain"]
    answerIndex: 0
    explanation: "The CNS is the brain plus the spinal cord: the 'control centre'. The nerves that run out to the skin, muscles and organs are the peripheral nervous system."
  - id: sensory-direction
    type: mcq
    q: "You touch a hot pan. Which neurons carry the message 'HOT!' from your fingertip to your spinal cord?"
    choices: ["Motor neurons", "Sensory neurons", "Relay neurons in the brain only", "Muscle fibres"]
    answerIndex: 1
    explanation: "Sensory neurons carry information IN, from receptors (like heat receptors in the skin) towards the CNS. Motor neurons carry commands OUT to muscles."
  - id: reflex-brain
    type: mcq
    q: "When a doctor taps below your knee, your leg kicks before you even decide anything. Why is this reflex so fast?"
    choices: ["The signal goes to the brain extra fast", "The signal only goes as far as the spinal cord and straight back out", "Muscles move without any nerve signal", "The knee has its own small brain"]
    answerIndex: 1
    explanation: "In a reflex arc the message goes sensory neuron → spinal cord → motor neuron. The brain is not in the loop for the decision, so the path is shorter and there are fewer synapses to cross. The brain finds out a moment later."
  - id: reflex-path-time
    type: numeric
    q: "In a reflex, a signal travels 0.8 m from the foot up to the spinal cord and 0.8 m back down to a leg muscle. If the nerves conduct at 80 m/s, how many milliseconds does the travel take? (Ignore synapse delays.)"
    answer: 20
    tolerancePct: 3
    unit: "ms"
    explanation: "Total path = 0.8 + 0.8 = 1.6 m. Time = distance ÷ speed = 1.6 / 80 = 0.020 s = 20 ms. A ruler-drop reaction (about 200 ms) is ten times longer, because it needs your eyes and brain."
  - id: synapse-delays
    type: numeric
    q: "Each synapse (the gap between two neurons) adds about 0.5 ms of delay. A message passes through 6 synapses on its way from your eye to your finger muscles. How many milliseconds do the synapses add in total?"
    answer: 3
    tolerancePct: 2
    unit: "ms"
    explanation: "6 × 0.5 ms = 3 ms. Synapse delays are small one by one, but the brain's decision-making involves huge networks of neurons, so the processing inside the brain adds far more than this simple count."
---
## Your body's messaging network

Clench your fist. Something in your head decided, and a fraction of a second later muscles in your forearm pulled. In between, a message travelled about a metre through your body. The system that carries these messages is the **nervous system**.

It has two big parts:

- **Central nervous system (CNS):** the **brain** and the **spinal cord**. This is where information is sorted and decisions are made.
- **Peripheral nervous system (PNS):** all the **nerves** that branch out from the CNS to your skin, eyes, muscles and organs — like the roads that lead out of Addis Ababa to every town.

A **nerve** is a bundle of many long cells called **neurons**, wrapped together like the wires inside a cable.

## Three kinds of neuron

1. **Sensory neurons** carry information **in**: from receptors (in skin, eyes, ears) to the CNS.
2. **Relay neurons** (also called interneurons) sit inside the CNS and connect everything to everything.
3. **Motor neurons** carry commands **out**: from the CNS to muscles (and glands).

The gap where one neuron passes its message to the next is called a **synapse**. Crossing a synapse takes a little time — roughly half a millisecond.

## The chain for a voluntary movement

When you *choose* to catch a falling ruler:

**eyes** (see ruler move) → sensory neurons → **brain** (recognise, decide) → down the **spinal cord** → **motor neuron** → **forearm muscles** → fingers close.

Every arrow is time. The travel along nerves is quick, but the brain's work takes longest. That is why a reaction time is around 0.2 s, even though the nerve signal itself could cross your body in about 0.02 s.

## Reflexes: the shortcut

Touch a hot charcoal stove and your hand jerks away before you feel pain. This is a **reflex**. The path is:

**receptor** → sensory neuron → **spinal cord** (one relay neuron) → motor neuron → **muscle**

The brain is skipped for the decision. Shorter path + fewer synapses = faster. Reflexes protect you; voluntary actions let you choose.

### Worked example

A sensory signal goes 0.9 m from your hand to the brain and the motor command comes 0.9 m back. Nerves conduct at 60 m/s.

$$t = \frac{d}{v} = \frac{1.8\ \text{m}}{60\ \text{m/s}} = 0.03\ \text{s} = 30\ \text{ms}$$

If your measured reaction time is 200 ms, then about $200 - 30 = 170$ ms is spent **processing** — in your eyes, synapses and brain.

## Why this matters for our robot claw

Our claw "listens" at the very end of this chain: the muscle. The brain sends its command down the motor neurons; the muscle fibres switch on electrically; our sensor picks up that electricity on the skin. The machine never reads your thoughts — it reads your **muscles obeying** your thoughts.
