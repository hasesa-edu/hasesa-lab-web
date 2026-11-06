---
title: See your muscle's electricity
kind: investigate
minutes: 90
units: [sensors-and-signals, charge-current-voltage, simple-circuits, muscle-contraction]
---
## Safety check — before any electrode touches skin

- The laptop's **charger is unplugged from the wall**. It runs on battery only.
- The EMG module is powered by **batteries** only (9 V batteries, or the Arduino's 5 V coming from the battery-powered laptop).
- All electrodes go on **one forearm**. Never across the chest.
- New electrodes for each person. If skin itches or burns, take them off and tell your guide.

## Do: wire it up

Your guide will tell you which type of EMG module you have.

**Module with two 9 V batteries (e.g. "Muscle Sensor V3" type):**

- Connect the two 9 V batteries in series as the module's instructions show: **+Vs**, **GND** (the middle point) and **−Vs**.
- Module **SIG** → Arduino **A0**.
- Module **GND** → Arduino **GND** (this shared ground is essential).
- Turn the gain knob **low** to start. With a multimeter, check SIG never goes above 5 V when you clench hard.

**Module that runs on 5 V (e.g. MyoWare type):**

- Module **+** → Arduino **5V**, module **−** → Arduino **GND**, module **SIG** → Arduino **A0**.

Upload this tiny sketch:

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(analogRead(A0));  // a number from 0 to 1023
  delay(10);                        // about 100 readings per second
}
```

Open **Tools → Serial Plotter** (set to 9600 baud).

## Do: place the electrodes

1. Clean the skin on the inside of your forearm with damp cotton wool (or an alcohol wipe) and let it dry.
2. Make a fist and feel where the forearm muscle bulges, about a third of the way from elbow to wrist.
3. Stick **two electrodes on the bulge**, about 2–3 cm apart, in a line along the arm (along the direction of the muscle).
4. Stick the **reference** electrode on a **bony spot** of the same arm with little muscle — the bony point of the elbow or the bone on the back of the wrist.
5. Snap on the cable. Tape the cable to your arm so it can't swing.

## Notice

Sit still with your arm resting on the table, relaxed. Watch the line. Now:

- Clench gently. Then hard. Then as hard as you can for 3 seconds.
- Wiggle only your fingers. Lift your wrist. Talk. Shrug.
- Let the cable swing. Touch the laptop charger cable (unplugged!) or move near a wall socket.

Record in your notebook: the **relaxed** level and the **clenched** level (rough numbers from the plotter), and sketch the shape of the graph.

Puzzles:

1. The signal got **bigger** when you clenched harder. But you learned that every nerve spike is **all-or-nothing** — the same size. How can the total signal grow?
2. Where does the electricity come from? Is it from your brain?
3. Why did swinging the cable make a mess?

## Just enough theory

- *Sensors and signals*: what an EMG measures (millivolts on the skin from muscle fibres firing), why it must be **amplified** ($V_\text{out} = \text{gain} \times V_\text{in}$), why there is a reference electrode, and how analogRead turns 0–5 V into 0–1023.
- *Charge, current and voltage*: what a voltage actually is, and why tiny voltages are safe but mains is not.
- *Simple circuits*: why every part needs a complete loop and a **shared ground**.
- Back to *Muscles, tendons and levers*: harder clench = **more motor units, firing more often** = more electrical activity.

## Do it better

- Move the two muscle electrodes closer together or further apart. Which gives the cleanest signal?
- Try the electrodes on the **back** of the forearm (the extensors). Which movement makes *those* light up?
- Find the placement that gives the **biggest gap** between relaxed and clenched with the **least wobble** when relaxed. Photograph or draw it — you'll use it next step.

## Think

1. Your clenched reading is 614. What voltage is on pin A0? (Use $V = \text{reading} \times 5 / 1023$.)
2. Your skin signal is 0.5 mV and the gain is 2000. What is the output voltage?
3. Why must the laptop be unplugged from the wall while electrodes are on your skin?
4. Write the chain so far: brain → … → the line on the screen.
