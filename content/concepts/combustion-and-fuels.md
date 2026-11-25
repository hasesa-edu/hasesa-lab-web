---
title: Combustion and fuels
summary: What a fire needs, what burning makes, why smoke and carbon monoxide come from fires that are short of air, and how to compare fuels by the energy they hold and how much of it reaches the pot.
status: ai-draft
public: false
curriculum:
  - { subject: chemistry, grade: 9, unit: "Chemical reactions and equations" }
  - { subject: chemistry, grade: 10, unit: "Hydrocarbons and their natural sources" }
  - { subject: physics, grade: 9, unit: "Work, energy and power" }
problems:
  - id: lid-on-fire
    type: mcq
    q: "Oil in a pan catches fire. You slide a metal lid over the pan and the flames go out. Which side of the fire triangle did the lid remove?"
    choices: ["Fuel", "Heat", "Oxygen", "None: the lid cooled the oil to room temperature at once"]
    answerIndex: 2
    explanation: "The lid stops fresh air reaching the burning oil. With no oxygen, the reaction stops. The oil (fuel) is still there and still hot for a while, which is why you leave the lid on until the pan has cooled. Never throw water on burning oil."
  - id: blue-or-yellow
    type: mcq
    q: "A biogas burner gives a quiet blue flame. A wood fire on three stones gives a tall yellow flame and leaves black soot on the pot. What does this tell you?"
    choices: ["The yellow flame is hotter and burns more completely", "The blue flame is burning more completely; the yellow flame has glowing bits of unburnt carbon in it", "Both are complete combustion; colour depends only on the fuel's price", "The blue flame is making more carbon monoxide"]
    answerIndex: 1
    explanation: "A blue flame means the gas is mixed well with air and burns almost completely to carbon dioxide and water. The yellow colour comes from tiny glowing particles of carbon (soot) that have not burnt. Some of them end up on the pot, and in the air as smoke."
  - id: charcoal-energy
    type: numeric
    q: "Charcoal holds about 29 MJ of energy per kilogram. How much energy, in MJ, is stored in a 250 g bag of charcoal?"
    answer: 7.25
    tolerancePct: 2
    unit: "MJ"
    explanation: "250 g = 0.25 kg. Energy = 0.25 × 29 = 7.25 MJ."
  - id: three-stone-efficiency
    type: numeric
    q: "On a three-stone fire, 1.0 kg of water is heated from 20 °C to 92 °C (boiling in Addis Ababa). The fire burns 0.15 kg of wood holding 16 MJ/kg. What is the efficiency, in %? (c of water = 4200 J/kg°C)"
    answer: 12.6
    tolerancePct: 5
    unit: "%"
    explanation: "Useful energy: Q = 1.0 × 4200 × 72 = 302,400 J. Energy in the wood: 0.15 × 16,000,000 = 2,400,000 J. Efficiency = 302,400 ÷ 2,400,000 × 100% ≈ 12.6%. Almost nine-tenths of the energy went somewhere other than the water."
  - id: why-co-kills
    type: mcq
    q: "Why is carbon monoxide (CO) from a charcoal stove so dangerous in a closed room?"
    choices: ["It smells so bad that people faint", "It has no colour or smell, and it sticks to the haemoglobin in your blood far more strongly than oxygen does, so your blood carries less oxygen", "It is heavier than water and sinks to the floor", "It only harms people with asthma"]
    answerIndex: 1
    explanation: "You cannot see or smell CO. It binds to haemoglobin roughly 200 times more strongly than oxygen, so even a small amount in the air steadily stops your blood carrying oxygen. People fall asleep and do not wake up. A charcoal stove must never be used, or left to burn down, inside a closed room."
  - id: biogas-volume
    type: numeric
    q: "A family needs 8 MJ of useful heat a day for cooking. Their biogas stove is 50% efficient, and their biogas holds about 20 MJ per cubic metre. How many cubic metres of biogas do they need each day?"
    answer: 0.8
    tolerancePct: 2
    unit: "m³"
    explanation: "At 50% efficiency, the energy going in must be 8 ÷ 0.5 = 16 MJ. Volume = 16 ÷ 20 = 0.8 m³ of biogas a day."
  - id: methane-oxygen
    type: mcq
    q: "Methane, the main fuel in biogas, burns completely: CH₄ + ?O₂ → CO₂ + 2H₂O. What number goes in place of the question mark?"
    choices: ["1", "2", "3", "4"]
    answerIndex: 1
    explanation: "On the right there are 2 oxygen atoms in CO₂ and 2 more in 2H₂O: 4 oxygen atoms. That needs 2 molecules of O₂. CH₄ + 2O₂ → CO₂ + 2H₂O."
  - id: insulation-smoke
    type: mcq
    q: "A tin-can stove with ash packed around its fire tube makes less smoke than the same stove with no ash. What is the best explanation?"
    choices: ["Ash absorbs the smoke", "The ash keeps the fire tube hot, so the gases and tiny tar droplets from the wood burn completely instead of escaping as smoke", "Ash adds oxygen to the fire", "Ash makes the wood burn more slowly, so it gives off no gases"]
    answerIndex: 1
    explanation: "Smoke is fuel that left the fire before it could burn. Hot gases from wood need a high temperature and enough air to burn fully. Insulation stops the tube losing heat through its walls, so the flame zone stays hot and burns more of the gas."
---
Every cooking fire in Ethiopia, from a three-stone fire (*gulicha*, ጉልቻ) under a pot of wot to a charcoal *kesel* stove for coffee to a biogas burner, is the same chemical reaction: a fuel joining with oxygen and giving out energy. This is **combustion**.

## The fire triangle

A fire needs three things at once:

- **Fuel**: something that can burn, like wood, charcoal, dried dung (*kubet*, ኩበት), kerosene or methane gas.
- **Oxygen**: from the air, which is about one-fifth oxygen.
- **Heat**: enough to get the fuel hot enough to start burning (its ignition temperature) and to keep it there.

Take away any side and the fire goes out. A lid on a burning pan removes oxygen. Water cools the fuel and removes heat. Pulling the sticks out of a fire removes fuel. Firefighters use exactly these three ideas.

The triangle also tells you how to make a fire burn **well**: plenty of air reaching the fuel, and a flame zone that stays hot.

## What burning makes

Most fuels are made mostly of **carbon** and **hydrogen** (wood also has oxygen in it). When they burn with plenty of air, the carbon becomes **carbon dioxide** and the hydrogen becomes **water vapour**. This is **complete combustion**.

For methane, the gas in biogas and natural gas:

$$\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}$$

Wood is mostly cellulose, a long chain of units of $\text{C}_6\text{H}_{10}\text{O}_5$. Each unit burns completely like this:

$$\text{C}_6\text{H}_{10}\text{O}_5 + 6\text{O}_2 \rightarrow 6\text{CO}_2 + 5\text{H}_2\text{O}$$

Check it: 6 carbons, 10 hydrogens and $5 + 12 = 17$ oxygens on the left; 6 carbons, 10 hydrogens and $12 + 5 = 17$ oxygens on the right.

## When there isn't enough air

If the fire is short of oxygen, or the flame is cooled (by a cold pot, a draught, or wet wood), the fuel doesn't finish burning. This is **incomplete combustion**. It makes:

- **Carbon monoxide (CO)**: $2\text{C} + \text{O}_2 \rightarrow 2\text{CO}$. A poisonous gas with no colour and no smell.
- **Soot**: tiny particles of unburnt carbon. They glow yellow in the flame, then cool and blacken pots, walls and lungs.
- **Smoke**: soot plus droplets of tar and other unburnt gases from the wood. If you can see smoke, you are seeing fuel that was wasted.

A clean blue gas flame is close to complete combustion. A smoky yellow wood fire is far from it.

## Smoke, carbon monoxide and health

Cooking smoke in a closed kitchen is one of the biggest health dangers in the world: the World Health Organization estimates about 3 million deaths a year from household air pollution, mostly women and young children who spend the most time near the fire. The finest smoke particles reach deep into the lungs and cause pneumonia, chronic lung disease and heart disease.

**Carbon monoxide** is dangerous in a different way. It binds to haemoglobin, the molecule in red blood cells that carries oxygen, about 200 times more strongly than oxygen does. Breathe it for a while and your blood carries less and less oxygen. You get a headache, feel sleepy, and can fall unconscious without knowing why. A charcoal stove glowing in a closed room overnight can kill everyone sleeping there. **Never burn charcoal or wood in a closed room.**

Better stoves help in two ways: they burn the fuel more completely (less smoke and CO made), and some have chimneys that carry the smoke outside.

## Energy in fuels

Different fuels hold different amounts of energy. The **energy content** (or calorific value) is the energy released when 1 kg (or 1 m³ of gas) burns completely.

| Fuel | Energy content (about) |
|---|---|
| Dried cow dung | 13 MJ/kg |
| Air-dried firewood | 16 MJ/kg |
| Charcoal | 29 MJ/kg |
| Kerosene | 43 MJ/kg |
| Methane | 50 MJ/kg, or 36 MJ/m³ |
| Biogas (about 60% methane) | 20–24 MJ/m³ |

1 MJ (megajoule) = 1,000,000 J. Wet wood holds less useful energy, because some of it is spent boiling off the water inside it.

Charcoal is made by heating wood with little air, which drives off water and gases. A kilogram of charcoal holds more energy than a kilogram of wood, but making it throws away more than half of the wood's energy, so charcoal is not a way to save trees.

$$E_{\text{fuel}} = m_{\text{fuel}} \times \text{energy content}$$

**Example.** 200 g of wood: $E = 0.2 \times 16 = 3.2$ MJ.

## Stove efficiency

Only part of the fuel's energy reaches the food. The rest heats the air, the ground, the stove itself, or leaves as unburnt smoke.

$$\text{efficiency} = \frac{\text{energy into the water or food}}{\text{energy in the fuel burnt}} \times 100\%$$

The energy into water is $Q = mc\Delta T$ (see **Energy and power**).

Rough efficiencies:

| Stove | Efficiency |
|---|---|
| Three-stone fire | 5–15% |
| Improved wood stove (such as *Mirt* for injera) or a rocket stove | 15–30% |
| Improved charcoal stove (such as *Lakech*) | 25–35% |
| Biogas or LPG burner | 40–60% |

An improved stove saves fuel by doing three things: keeping the fire hot with insulation (more complete burning), letting just enough air in, and making the hot gases scrape close past the pot (better heat transfer).

**Example.** A stove heats 1 kg of water from 20 °C to 92 °C using 100 g of wood. Useful energy $= 1 \times 4200 \times 72 = 302{,}400$ J. Fuel energy $= 0.1 \times 16{,}000{,}000 = 1{,}600{,}000$ J. Efficiency $= 302{,}400 \div 1{,}600{,}000 \times 100\% \approx 19\%$.
