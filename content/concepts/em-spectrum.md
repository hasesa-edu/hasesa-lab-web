---
title: The electromagnetic spectrum
summary: Radio waves, light and X-rays are the same kind of wave at different frequencies. All travel at c = 3.0 × 10^8 m/s, so λ = c/f tells you how long a radio wave is, and how long your antenna should be.
status: ai-draft
public: false
curriculum:
  - { subject: physics, grade: 10, unit: "Electromagnetic waves" }
  - { subject: physics, grade: 12, unit: "Electromagnetic waves and their applications" }
problems:
  - id: radio-speed
    type: mcq
    q: "How fast does a radio wave travel through air?"
    choices: ["About 340 m/s, like sound", "About 3.0 × 10^8 m/s, like light", "It depends on how loud the station is", "It depends on the station's frequency"]
    answerIndex: 1
    explanation: "Radio waves are electromagnetic waves, just like light. All electromagnetic waves travel at c = 3.0 × 10^8 m/s in air or space, whatever their frequency."
  - id: lambda-1000k
    type: numeric
    q: "What is the wavelength of a radio station broadcasting at 1000 kHz, in metres?"
    answer: 300
    tolerancePct: 2
    unit: "m"
    explanation: "1000 kHz = 1.0 × 10^6 Hz. λ = c/f = 3.0 × 10^8 ÷ 1.0 × 10^6 = 300 m. That's about three football pitches for one wave!"
  - id: lambda-873k
    type: numeric
    q: "A medium-wave station broadcasts at 873 kHz. What is its wavelength, in metres?"
    answer: 343.6
    tolerancePct: 2
    unit: "m"
    explanation: "873 kHz = 8.73 × 10^5 Hz. λ = 3.0 × 10^8 ÷ 8.73 × 10^5 ≈ 344 m."
  - id: f-from-lambda
    type: numeric
    q: "Old radios marked stations by wavelength. A station is marked 500 m. What is its frequency, in kHz?"
    answer: 600
    tolerancePct: 2
    unit: "kHz"
    explanation: "Rearrange λ = c/f to f = c/λ = 3.0 × 10^8 ÷ 500 = 6.0 × 10^5 Hz = 600 kHz."
  - id: order-spectrum
    type: mcq
    q: "Which list goes from LONGEST wavelength to SHORTEST?"
    choices: ["Visible light, radio, X-rays", "Radio, visible light, X-rays", "X-rays, visible light, radio", "Radio, X-rays, visible light"]
    answerIndex: 1
    explanation: "Radio waves are the longest (metres to kilometres), visible light is under a micrometre, and X-rays are even shorter. Shorter wavelength means higher frequency and more energy per photon."
  - id: quarter-wave
    type: numeric
    q: "A quarter-wave antenna is one quarter of a wavelength long. How long would a quarter-wave antenna be for a 1 MHz station, in metres?"
    answer: 75
    tolerancePct: 2
    unit: "m"
    explanation: "λ = 3.0 × 10^8 ÷ 1.0 × 10^6 = 300 m. A quarter of that is 75 m, far too long for a school roof. That's why crystal radios use a shorter wire and a tuning coil to make up the difference."
---
## One family of waves

Light, the heat you feel from a charcoal stove, the microwaves that heat food, the X-rays at a clinic, and the radio waves that carry a football commentary are all **the same kind of wave**: an **electromagnetic (EM) wave**.

An EM wave is a changing electric field and a changing magnetic field, each creating the other as they travel. It needs no water, air or rope. It can cross empty space, which is how sunlight reaches us.

## All at the speed of light

Every EM wave travels at the same speed in empty space (and almost exactly the same in air):

$$c = 3.0 \times 10^{8}\ \text{m/s}$$

That's fast enough to go around the Earth 7½ times in one second. The wave equation $v = f\lambda$ becomes

$$c = f\lambda \qquad\Rightarrow\qquad \lambda = \frac{c}{f}$$

Because $c$ is fixed, **high frequency means short wavelength** and low frequency means long wavelength.

## The spectrum

Arranged by wavelength, longest first:

| Type | Typical wavelength | Used for |
|---|---|---|
| Radio | 1 mm to many km | AM/FM radio, TV, phones, Wi-Fi |
| Microwave | about 1 mm to 30 cm | microwave ovens, satellite links |
| Infrared | about 1 µm | TV remotes, heat |
| Visible light | 400–700 nm | seeing! |
| Ultraviolet | about 100 nm | sunburn, sterilising water |
| X-rays | about 0.1 nm | medical images |
| Gamma rays | even smaller | from radioactive atoms |

(Microwaves are really short radio waves; the boundary is not sharp.) Ultraviolet, X-rays and gamma rays carry enough energy to damage cells. Radio waves don't.

## The medium-wave (AM) band

Your crystal radio listens to the **medium-wave** band, about **530 kHz to 1700 kHz**. Let's find the wavelengths:

$$\lambda = \frac{3.0 \times 10^{8}}{5.3 \times 10^{5}} \approx 566\ \text{m} \qquad \lambda = \frac{3.0 \times 10^{8}}{1.7 \times 10^{6}} \approx 176\ \text{m}$$

So medium waves are roughly **180 m to 570 m** long. FM radio (around 100 MHz) has waves only about 3 m long.

**Worked example.** A station is on 1 MHz. $\lambda = 3.0\times10^8 \div 1.0\times10^6 = 300$ m.

## Does the antenna have to be that long?

A wire antenna works best when it's a good fraction of a wavelength, such as a half or a quarter. A quarter-wave for 1 MHz is 75 m. Not practical!

Luckily, a crystal radio doesn't need a perfect antenna. **Any** long wire in the wave's path has its electrons pushed back and forth by the passing field, so a 15–30 m wire, up high, still picks up a small signal. The higher and longer it is, the more energy it collects. What the short wire lacks, the **tuning coil and capacitor** make up for: they make the circuit resonate at the station's frequency (see *Resonance*). A good **ground** connection completes the circuit, so current can flow from the antenna, through your radio, into the earth.

## Medium waves at night

Medium waves travel along the ground in the daytime, reaching perhaps a few hundred kilometres. At night, a layer of the upper atmosphere (the ionosphere) reflects them, so you may hear stations from much further away after dark.
