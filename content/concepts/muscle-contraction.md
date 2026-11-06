---
title: Muscles, tendons and levers
summary: How muscles shorten, why they can only pull, and how tendons and bones turn a small pull into a big movement.
status: ai-draft
public: false
curriculum:
  - { subject: biology, grade: 10, unit: "Support and movement in humans" }
  - { subject: physics, grade: 9, unit: "Simple machines and moments" }
problems:
  - id: only-pull
    type: mcq
    q: "Muscles can only pull, never push. So how do you straighten your arm after bending it?"
    choices: ["The biceps pushes the forearm back", "A second muscle (the triceps) on the other side pulls it straight", "Gravity always does it", "The tendons spring back by themselves"]
    answerIndex: 1
    explanation: "Muscles work in antagonistic pairs. The biceps contracts to bend (flex) the elbow; the triceps contracts to straighten (extend) it. While one pulls, the other relaxes and gets stretched."
  - id: tendon-vs-ligament
    type: mcq
    q: "In the chicken wing, the shiny white cord that joins a muscle to a bone is a…"
    choices: ["Ligament", "Tendon", "Cartilage", "Nerve"]
    answerIndex: 1
    explanation: "A tendon connects muscle to bone and transmits the muscle's pull. A ligament connects bone to bone at a joint. Cartilage is the smooth rubbery cap on the bone ends."
  - id: biceps-force
    type: numeric
    q: "You hold a 2.0 kg bag of sugar in your hand, 32 cm from your elbow. Your biceps tendon attaches 4.0 cm from the elbow. Ignoring the weight of the arm, how much force (in newtons) must the biceps pull with to hold the forearm still? Use g = 9.8 N/kg."
    answer: 156.8
    tolerancePct: 3
    unit: "N"
    explanation: "Weight of the bag = 2.0 × 9.8 = 19.6 N. Balance moments about the elbow: F × 0.04 = 19.6 × 0.32. So F = 19.6 × 0.32 / 0.04 = 156.8 N — eight times the weight! The arm trades force for distance and speed."
  - id: muscle-shortening
    type: numeric
    q: "When a muscle fully contracts, each of its sarcomeres shortens by about 20%. If a forearm muscle is 30 cm long, by how many centimetres does it shorten?"
    answer: 6
    tolerancePct: 3
    unit: "cm"
    explanation: "20% of 30 cm = 0.20 × 30 = 6 cm. All the sarcomeres in a row shorten together, so the whole muscle shortens by the same fraction."
  - id: stronger-clench
    type: mcq
    q: "Each motor neuron's spike is all-or-nothing. How does your forearm make a STRONGER grip?"
    choices: ["Each spike gets bigger", "More motor units switch on, and each fires spikes more often", "The muscle gets longer", "The tendon gets thicker during the grip"]
    answerIndex: 1
    explanation: "The nervous system recruits more motor units (a motor neuron plus the muscle fibres it controls) and raises their firing rate. More fibres firing more often = more force — and more electrical activity for our EMG sensor to pick up."
---
## Pull, never push

Every movement you make — writing, walking, clenching a fist — comes from muscles **shortening** (contracting). A muscle can only **pull**. It cannot push.

So muscles work in **antagonistic pairs**: one pulls one way, its partner pulls the other way. In your upper arm the **biceps** bends the elbow and the **triceps** straightens it. In your forearm, muscles on the palm side (the **flexors**) close your fingers, and muscles on the back (the **extensors**) open them.

Surprise: the muscles that move your fingers are mostly **not in your hand**. Make a fist and feel your inner forearm — it hardens. Long **tendons** run from those forearm muscles, through the wrist, to your finger bones. Your fingers are puppets on strings.

## Tendons and ligaments

- **Tendon:** tough, shiny white cord joining **muscle to bone**. It does not stretch much, so it passes the pull on.
- **Ligament:** joins **bone to bone** at a joint.
- **Cartilage:** smooth rubbery layer on the ends of bones, so joints slide.

In a chicken wing you can see all three. Pull a tendon with tweezers and the wing tip bends — just like our cardboard claw.

## Inside a muscle

A muscle is a bundle of long cells called **muscle fibres**. Each fibre contains thousands of tiny repeating units called **sarcomeres**. Inside them, two kinds of protein filament — **actin** (thin) and **myosin** (thick) — overlap. When the fibre is switched on, the myosin heads grab the actin, pull, let go and grab again, like a team pulling a rope hand over hand. The filaments **slide** past each other and every sarcomere shortens, by up to about 20%. This is the **sliding filament** model. It needs energy (ATP) and calcium.

What switches it on? An **action potential** from the motor neuron arrives at the muscle, and the muscle fibre produces its own electrical spike, which spreads along the fibre. That electrical activity is what an **EMG** (electromyography) sensor picks up from the skin.

## Stronger grip = more motor units

One motor neuron and all the fibres it controls are called a **motor unit**. A gentle grip uses a few units firing slowly. A hard clench **recruits** many more units and makes them fire faster. More units × more spikes = more force and a **bigger EMG signal**.

## Bones as levers

Your forearm is a **lever**, with the elbow as the pivot. The biceps tendon attaches very close to the elbow, but your hand is far away. Balance the **moments** (force × distance from pivot):

$$F_\text{muscle} \times d_\text{muscle} = F_\text{load} \times d_\text{load}$$

### Worked example

You hold a 1 kg water bottle (weight about 9.8 N) 30 cm from your elbow. The biceps attaches 5 cm from the elbow.

$$F = \frac{9.8 \times 0.30}{0.05} = 58.8\ \text{N}$$

The muscle pulls six times harder than the load! The pay-off: a small shortening of the muscle gives a big, fast movement of the hand. Our claw works the same way: a short pull on the string near the joint swings the finger tip a long way.
