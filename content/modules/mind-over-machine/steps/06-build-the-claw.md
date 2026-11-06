---
title: Build the muscle-powered claw
kind: build
minutes: 135
video: { youtubeId: "N5eBWFjQF7s", credit: "Thetips4you" }
units: [microcontroller-basics, sensors-and-signals, charge-current-voltage, simple-circuits]
---
## Do: give the hand a muscle

Until now, **you** pulled the strings of your cardboard hand. Now a motor will.

1. Glue or tape an **SG90 servo** to the base near the wrist of your cardboard hand, with its shaft facing up.
2. Fit the servo **horn** (the plastic arm). Before tying anything, connect the servo and run the sketch below once so it goes to its "open" angle, then fit the horn pointing **towards the fingers**.
3. Gather the finger strings. Tie them together to a small hole near the **end of the horn**. With the servo at "open", the strings should be just slightly loose.
4. Turn the horn by hand (gently, power off) to check: turning it pulls the strings and the fingers curl.

## Do: wire it up

Keep the EMG wiring from step 5. Add the servo:

| Servo wire | Goes to |
|---|---|
| Orange/yellow (signal) | Arduino **pin 9** |
| Red (power) | **+** of a 4 × AA battery pack (about 6 V) |
| Brown/black (ground) | **−** of the battery pack **and** an Arduino **GND** pin |

So in the end: EMG **SIG → A0**; EMG ground, servo ground, battery-pack − and Arduino GND are **all joined**. Laptop still on battery, charger unplugged.

Why a separate pack for the servo? When a servo starts, it gulps current. Powered from the Arduino's 5 V pin, it can make the voltage dip and the Arduino reset or the signal jump. A separate pack avoids that. The **shared ground** lets the servo understand the signal on pin 9.

## The program

This sketch **calibrates** to your arm when it starts, then closes the claw when your signal goes above the threshold.

```cpp
#include <Servo.h>

const int EMG_PIN = A0;
const int SERVO_PIN = 9;
const int OPEN_ANGLE = 10;     // change these to suit your claw
const int CLOSED_ANGLE = 120;

Servo claw;
int threshold = 0;
int margin = 0;
bool isClosed = false;

// Average the sensor for a number of milliseconds.
int averageFor(unsigned long ms) {
  long sum = 0;
  long count = 0;
  unsigned long start = millis();
  while (millis() - start < ms) {
    sum += analogRead(EMG_PIN);
    count++;
    delay(5);
  }
  return sum / count;
}

void setup() {
  Serial.begin(9600);
  claw.attach(SERVO_PIN);
  claw.write(OPEN_ANGLE);

  Serial.println("RELAX your arm in 2 seconds...");
  delay(2000);
  int relaxed = averageFor(3000);

  Serial.println("Now CLENCH your fist and hold...");
  delay(1000);
  int clenched = averageFor(3000);

  threshold = (relaxed + clenched) / 2;
  margin = (clenched - relaxed) / 10;   // the "dead band" for hysteresis
  if (margin < 5) margin = 5;

  Serial.print("relaxed=");   Serial.print(relaxed);
  Serial.print(" clenched="); Serial.print(clenched);
  Serial.print(" threshold="); Serial.println(threshold);
  if (clenched - relaxed < 50) {
    Serial.println("Gap too small! Check electrodes, then press RESET.");
  }
}

void loop() {
  int value = analogRead(EMG_PIN);

  if (!isClosed && value > threshold + margin) {
    isClosed = true;
    claw.write(CLOSED_ANGLE);
  } else if (isClosed && value < threshold - margin) {
    isClosed = false;
    claw.write(OPEN_ANGLE);
  }

  // For the Serial Plotter: three lines to watch
  Serial.print("EMG:");        Serial.print(value);
  Serial.print(",Threshold:"); Serial.print(threshold);
  Serial.print(",Closed:");    Serial.println(isClosed ? threshold * 2 : 0);
  delay(20);
}
```

Upload it, open the Serial **Monitor**, and follow the instructions: relax for 3 seconds, then clench for 3 seconds. Then switch to the Serial **Plotter**.

## Notice

- Clench: does the claw close? Relax: does it open?
- Look at the plotter. Where does the EMG line sit compared with the threshold line when you relax? When you clench?
- What happens if you clench only half as hard?
- Does the claw ever **flicker** open-closed?

## Just enough theory

Read *Microcontroller basics*:

- `setup()` runs once (we calibrate there); `loop()` repeats about 50 times a second.
- `if` makes the decision: **sense → decide → act**.
- `servo.write(angle)` turns the servo to an angle and holds it.
- **Calibration**: threshold = halfway between relaxed and clenched averages.
- **Hysteresis**: close above threshold + margin, open below threshold − margin, so noise near the threshold can't make the claw flicker.

## Do it better

Work through these one at a time. Test after each change.

1. **Write down your calibration numbers.** Relaxed = ?, clenched = ?, threshold = ? Check the threshold by hand.
2. **Tune the angles.** Change `OPEN_ANGLE` and `CLOSED_ANGLE` so the fingers open wide and close firmly without the servo straining (a buzzing servo is pushing against something).
3. **Experiment with the threshold.** Replace the calibration line with a fixed number, e.g. `threshold = relaxed + 20;`. What goes wrong? Then try `threshold = clenched + 50;`. What goes wrong now? Put the calibration back.
4. **Turn off hysteresis** (set `margin = 0;`). Hold a half-clench near the threshold. What happens?
5. **Swap users:** let a partner use your claw without recalibrating. Does it work? Why not? Press RESET to recalibrate for them.

## Think

1. Your relaxed average is 120 and clenched is 480. What threshold does the sketch choose? What margin?
2. Why does the program need to calibrate for each person, and even for the same person on a different day?
3. The loop has `delay(20)`. About how many times per second does the claw check your muscle? Is that faster or slower than your own reaction time?
4. Draw the full wiring diagram in your notebook, showing every ground connection.
