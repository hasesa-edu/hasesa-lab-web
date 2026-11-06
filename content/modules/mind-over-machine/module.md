---
title: Mind over Machine
tagline: Control a robot claw with your muscles
disciplines: [biology, physics, technology]
hook: "The guide clenches a fist — and a cardboard robot claw on the table snaps shut. Nobody touched it. How does a thought become a movement, and how did a machine 'hear' it?"
goal: "Build a robot claw that opens and closes when you clench your own forearm muscles, use it to pick up an object, and explain every link in the chain from your brain to the motor."
whatYouBuild: "A cardboard robot hand with straw-and-string tendons, pulled by a servo motor, controlled by an Arduino that reads your muscle's electrical signal through skin electrodes."
hours: 10
status: ai-draft
publicSample: neurons-and-signals
materials:
  - { item: "Arduino Uno (or a compatible clone) with USB cable", note: "Clones are fine and cheaper; available from electronics shops around Merkato and Piassa, or online. Clones may need the CH340 USB driver on the laptop." }
  - { item: "EMG muscle sensor module with snap-electrode cable", note: "For example a 'Muscle Sensor V3' type (runs on two 9 V batteries) or a MyoWare-type (runs on 5 V). Usually ordered online; buy one spare." }
  - { item: "Disposable gel electrodes (snap type, as used for ECG), at least 3 per student per session", note: "Pharmacies and medical-supply shops sell ECG electrodes. They are single-use — do not share between students." }
  - { item: "SG90 micro servo motor with horn (arm) and screws" }
  - { item: "Breadboard and jumper wires (male–male and male–female)" }
  - { item: "Two 9 V batteries with snap clips (only for EMG modules that need ±9 V)", note: "Check your module's instructions. Never use a mains adapter for the EMG circuit." }
  - { item: "Battery holder for 4 × AA cells, or a USB power bank, for the servo" }
  - { item: "Laptop with the Arduino IDE installed, fully charged so it can run on battery", note: "The charger stays unplugged whenever electrodes are on skin." }
  - { item: "Multimeter (one per group is enough)", note: "Used to check the EMG output stays below 5 V." }
  - { item: "Stiff cardboard (e.g. from a box), drinking straws, strong thread or fishing line, rubber bands, tape, hot glue or white glue" }
  - { item: "Scissors, a craft knife for the guide only, cutting mat or thick card" }
  - { item: "30 cm rulers and one metre stick" }
  - { item: "Raw chicken wings, one per pair of students", note: "From the market or a butcher, bought the same morning and kept cold. Not for eating after the lesson." }
  - { item: "Disposable gloves, trays or plastic sheets, paper towels, soap, disinfectant, a bag for disposal" }
  - { item: "Cotton wool and water (or alcohol wipes) for cleaning skin before electrodes" }
  - { item: "Light objects to grab: crumpled paper balls, bottle caps, a small empty plastic cup" }
  - { item: "Notebook and pen for every student" }
safety:
  - "The EMG circuit runs on batteries ONLY. Whenever electrodes are on anyone's skin, the laptop must run on its own battery with the charger unplugged from the wall. Never connect any part of the circuit to mains power."
  - "Place electrodes only on the forearm. Keep all electrodes on the same forearm. Never place electrodes across the chest or anywhere near the heart, and never run a signal from one arm to the other."
  - "Do not wear electrodes if you have a pacemaker or another implanted electronic device; tell the guide privately."
  - "If the skin under an electrode itches, burns or turns red, take it off at once and tell the guide. Each electrode is used by one person only, then thrown away."
  - "Raw chicken can carry germs (such as Salmonella). Wear gloves, work on a tray, keep the chicken away from your face and from food, clean all surfaces with disinfectant afterwards, put the chicken and gloves in a sealed bag for disposal, wash your hands with soap — and never eat the chicken."
  - "Use scissors carefully and cut away from your body. Only the guide uses a craft knife."
  - "Keep fingers out of the claw and away from the servo arm while it is powered — it can pinch. Unplug the servo power before adjusting strings."
  - "Check the EMG module's output with a multimeter before connecting it to the Arduino: it must stay below 5 V."
signoff:
  - { id: claw-grabs, text: "The claw picks up and holds a light object (such as a paper ball or bottle cap) under muscle control: clench to close, relax to open." }
  - { id: explains-chain, text: "Explains, in their own words, the full chain: brain → spinal cord → motor neuron → muscle → electrical signal → sensor → microcontroller → motor." }
  - { id: calibrated-threshold, text: "Calibrated their own threshold from measured relaxed and clenched readings, and can say why it sits between them." }
  - { id: reaction-time, text: "Computed their own reaction time from the ruler-drop test using t = √(2d/g), with correct units." }
  - { id: notebook, text: "Notebook is complete: predictions, measurements, calculations, sketches of the wiring and the claw, and answers to each step's questions." }
---
You clench your fist, and a robot claw closes. No buttons, no remote — just your muscles.

In this module you will **start with the mystery** and work your way along it, one link at a time. First you will measure how long your body takes to react, and wonder where the time goes. You will pass a "nerve signal" through your whole class and discover how real neurons fire. You will dissect a chicken wing to see how muscles pull on bones through tendons — then copy that design in cardboard. Next you will stick electrodes on your own arm and *see* your muscle's electricity on a laptop screen. Finally you will write a program that listens to that signal and moves a motor.

By the end you will have built a working muscle-controlled claw, and you will be able to explain every step from a thought in your brain to a motor turning on your desk.

This is how real prosthetic (artificial) hands work. People who have lost a hand can use the muscles still in their forearm to control a robotic one. You are building a simple version of the same idea.
