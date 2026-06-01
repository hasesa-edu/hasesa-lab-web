import type { Locale } from "./i18n";

export type Translated = Record<Locale, string>;
export type Subject = "math" | "physics" | "chemistry" | "biology";

export const SUBJECTS: { id: Subject; label: Translated; emoji: string }[] = [
  {
    id: "math",
    label: { en: "Mathematics" },
    emoji: "🧮",
  },
  {
    id: "physics",
    label: { en: "Physics" },
    emoji: "⚛️",
  },
  {
    id: "chemistry",
    label: { en: "Chemistry" },
    emoji: "🧪",
  },
  {
    id: "biology",
    label: { en: "Biology" },
    emoji: "🧬",
  },
];

export function subjectMeta(id: Subject) {
  return SUBJECTS.find((s) => s.id === id)!;
}

export type LessonVideo = {
  /** YouTube video ID (the 11-char string after `?v=`) */
  youtubeId: string;
  /** Credit for the channel/creator that made the video */
  credit: string;
};

export type AtHomeExperiment = {
  title: Translated;
  materials: Translated[];
  steps: Translated[];
  observe: Translated;
  video?: LessonVideo;
};

/**
 * A short story (~100 words) connecting the lesson to real Ethiopian life.
 * `en` is required; `am` / `om` are filled in by translators — until then the
 * renderer falls back to `en`.
 */
export type StoryTranslated = { en: string; am?: string; om?: string };

export type Lesson = {
  id: string;
  subject: Subject;
  unit: Translated;
  moeCode: string;
  eueeTopics: string[];
  eueeWeight: number;
  estimatedMinutes: number;
  title: Translated;
  summary: Translated;
  video?: LessonVideo;
  whyItMatters?: StoryTranslated;
  sections: { heading: Translated; body: string }[];
  workedExample: { problem: string; solution: string };
  atHomeExperiment: AtHomeExperiment;
  quiz: { q: string; choices: string[]; answerIndex: number; explanation: string }[];
};

export const LESSONS: Lesson[] = [
  // ----- PHYSICS -----
  {
    id: "phy-mech-01-kinematics-1d",
    subject: "physics",
    unit: { en: "Mechanics" },
    moeCode: "PHY-G11-M1.1",
    eueeTopics: ["Kinematics", "Motion in 1D"],
    eueeWeight: 8,
    estimatedMinutes: 18,
    title: {
      en: "Motion in a straight line",
    },
    summary: {
      en: "Position, displacement, velocity, and acceleration for objects moving along a single axis. Build the vocabulary you need for every Mechanics problem.",
    },
    video: { youtubeId: "w2mbvtpQKrM", credit: "Khan Academy" },
    whyItMatters: {
      en: "A minibus driver on Bole Road has to brake before a pedestrian crossing — but how far ahead? At 50 km/h, the bus needs about 35 metres to stop safely. Engineers at the Ethiopian Roads Authority calculate that with exactly the formulas in this lesson: v = Δx/Δt, then a = Δv/Δt for the brakes. The same math sets bus schedules, marks safe overtaking zones, and decides how tall speed bumps need to be. Every time you see \"50 km/h\" on a road sign or wonder why a Bajaj suddenly slows, you're watching kinematics in action.",
    },
    sections: [
      { heading: { en: "Position vs. displacement" }, body: "Position is *where* an object is on a chosen axis — a coordinate `x`. Displacement is the *change* in position, `Δx = x_final − x_initial`. Distance is the total path length, which can be larger than the magnitude of displacement if the object turns around." },
      { heading: { en: "Velocity vs. speed" }, body: "Average velocity `v_avg = Δx / Δt` is a vector — it has direction. Average speed is the total distance divided by time and is always non-negative. Instantaneous velocity is the limit of `Δx / Δt` as `Δt → 0`." },
      { heading: { en: "Acceleration" }, body: "Acceleration is the rate of change of velocity: `a = Δv / Δt`. A negative acceleration in the direction of motion means the object is slowing down; in the opposite direction it can mean speeding up backwards." },
    ],
    workedExample: { problem: "A bus starts from rest and reaches 20 m/s in 8 s along a straight road. What is its average acceleration?", solution: "Use `a = Δv / Δt = (20 − 0) / 8 = 2.5 m/s²`. The bus speeds up by 2.5 m/s every second." },
    atHomeExperiment: {
      title: {
        en: "Measure your own walking speed",
      },
      video: { youtubeId: "EGqpLug-sDk", credit: "FuseSchool" },
      materials: [
        { en: "A flat 10-metre path (yard, hallway, or schoolyard)" },
        { en: "A phone with a timer or a wristwatch" },
        { en: "Chalk or tape to mark start and end" },
      ],
      steps: [
        { en: "Measure exactly 10 m along the path and mark the start and end." },
        { en: "Walk at your normal pace from start to end. Have a friend time you (or start the timer yourself)." },
        { en: "Record the time. Repeat once walking slowly and once walking fast." },
        { en: "Calculate each speed: speed = 10 ÷ time (in m/s)." },
      ],
      observe: {
        en: "Your three speeds should differ by a clear factor — maybe 0.8, 1.3, and 2.0 m/s. Because you walked in one direction, displacement equals distance, so your speed equals your average velocity. Now you've measured a real-world v = Δx / Δt with your own feet.",
      },
    },
    quiz: [
      { q: "A student walks 100 m east, then 40 m west. What is the magnitude of displacement?", choices: ["60 m", "100 m", "140 m", "40 m"], answerIndex: 0, explanation: "Displacement is the net change in position: 100 − 40 = 60 m east. Distance traveled would be 140 m." },
      { q: "Which quantity is always non-negative?", choices: ["Velocity", "Displacement", "Speed", "Acceleration"], answerIndex: 2, explanation: "Speed is a scalar magnitude — always ≥ 0. The others are vectors and can be negative depending on direction." },
    ],
  },
  {
    id: "phy-mech-02-newtons-laws",
    subject: "physics",
    unit: { en: "Mechanics" },
    moeCode: "PHY-G11-M2.1",
    eueeTopics: ["Newton's laws", "Forces"],
    eueeWeight: 10,
    estimatedMinutes: 22,
    title: { en: "Newton's three laws of motion" },
    summary: { en: "The rules that govern how forces change motion. Foundational for every Mechanics question — and for understanding how anything in the world moves." },
    video: { youtubeId: "kKKM8Y-u7ds", credit: "CrashCourse" },
    whyItMatters: {
      en: "When a Bajaj brakes hard and your body lurches forward, that's Newton's first law — inertia, your body wanting to keep moving. When an Ethiopian Airlines 787 taxis down Bole's runway, the pilots use F = ma to calculate the engine thrust needed to lift 250 tonnes of plane and passengers into the sky. When you kick a football at the Mekele Stadium, your foot pushes the ball and the ball pushes back on your foot equally — the third law, which is why your toes can hurt. The same three rules describe everything from a falling raindrop to a satellite in orbit above Ethiopia tonight.",
    },
    sections: [
      { heading: { en: "First law (inertia)" }, body: "An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted on by a net external force. The tendency to resist changes is called *inertia*, and it scales with mass." },
      { heading: { en: "Second law (F = ma)" }, body: "The net force on an object equals its mass times its acceleration: `F_net = m · a`. Force is a vector — direction matters. Units: 1 newton (N) = 1 kg · m/s²." },
      { heading: { en: "Third law (action–reaction)" }, body: "For every action there is an equal and opposite reaction. If A pushes B with force `F`, then B pushes A with force `−F`. The two forces act on *different* objects, so they don't cancel out on a free-body diagram of one of them." },
    ],
    workedExample: { problem: "A 4 kg box is pushed with a net horizontal force of 12 N on a frictionless surface. What is its acceleration?", solution: "From `F = m·a`, we get `a = F / m = 12 / 4 = 3 m/s²` in the direction of the applied force." },
    atHomeExperiment: {
      title: {
        en: "The coin and card — see inertia for yourself",
      },
      video: { youtubeId: "pS60Dv3uzf4", credit: "Make Science Fun" },
      materials: [
        { en: "A small coin (1 Birr or any coin)" },
        { en: "A stiff card (playing card, ID card, or thick paper)" },
        { en: "A small empty cup or glass" },
      ],
      steps: [
        { en: "Place the card flat on top of the cup, covering the opening." },
        { en: "Balance the coin in the middle of the card, right over the cup's opening." },
        { en: "Flick the card sharply sideways with your finger so it shoots away." },
        { en: "Watch what happens to the coin." },
      ],
      observe: {
        en: "The coin drops straight into the cup. The card moves so quickly that there's barely any sideways force on the coin — inertia (Newton's first law) keeps it almost still while the card flies away. Once the card is gone, gravity pulls the coin straight down into the cup.",
      },
    },
    quiz: [
      { q: "You push a wall and it doesn't move. By Newton's third law, what does the wall do?", choices: ["Nothing — it's just a wall", "Pushes you back with equal force in the opposite direction", "Pushes you back with greater force", "Absorbs your force"], answerIndex: 1, explanation: "Action–reaction pairs are equal in magnitude and opposite in direction." },
      { q: "If you double the net force on an object, what happens to its acceleration (mass unchanged)?", choices: ["Halved", "Unchanged", "Doubled", "Quadrupled"], answerIndex: 2, explanation: "F = m·a. With m fixed, a is proportional to F, so doubling F doubles a." },
    ],
  },
  {
    id: "phy-mech-03-free-fall",
    subject: "physics",
    unit: { en: "Mechanics" },
    moeCode: "PHY-G11-M1.3",
    eueeTopics: ["Free fall", "Gravity"],
    eueeWeight: 6,
    estimatedMinutes: 15,
    title: { en: "Free fall and gravity near Earth" },
    summary: { en: "Objects in free fall near Earth's surface accelerate downward at about 9.8 m/s² regardless of mass." },
    video: { youtubeId: "oYEgdZ3iEKA", credit: "NASA / Apollo 15 archive" },
    whyItMatters: {
      en: "Galileo proved 400 years ago that a feather and a hammer fall at the same rate when air is removed. Apollo 15 astronauts famously dropped both together on the moon — they hit the dust at the same instant. Why does this matter on Earth? When engineers design the spillway of the Grand Renaissance Dam, they calculate falling water and debris using g = 9.8 m/s². When helicopter pilots near the rock-hewn churches of Lalibela plan emergency descents, they use free-fall math. Even your mobile phone's drop-test rating depends on how fast it accelerates from your hand to the floor — exactly the equations in this lesson.",
    },
    sections: [
      { heading: { en: "g, the acceleration of gravity" }, body: "Near Earth's surface, `g ≈ 9.8 m/s²` (often rounded to 10 in classwork). It points toward Earth's center. In a vacuum, a feather and a hammer fall side by side because `g` doesn't depend on mass." },
      { heading: { en: "Kinematic equations for free fall" }, body: "Taking downward as positive: `v = v₀ + g·t`, `y = v₀·t + ½·g·t²`, `v² = v₀² + 2·g·y`." },
      { heading: { en: "Air resistance — when it matters" }, body: "Many problems say 'ignore air resistance'. In real life it matters a lot for light or wide objects — a parachute reaches *terminal velocity* when drag equals gravity." },
    ],
    workedExample: { problem: "A stone is dropped from a 45 m cliff. Taking g = 10 m/s², how long until it hits the ground?", solution: "Using `y = ½·g·t²` with y = 45: t² = 2·45 / 10 = 9, so t = 3 s." },
    atHomeExperiment: {
      title: {
        en: "Galileo's race: stone vs paper",
      },
      video: { youtubeId: "E43-CfukEgs", credit: "BBC / Brian Cox" },
      materials: [
        { en: "A small stone or coin" },
        { en: "Two sheets of paper of equal size" },
      ],
      steps: [
        { en: "Hold the stone in one hand and a flat sheet of paper in the other, at the same height (above your head)." },
        { en: "Drop them both at the same time. Which lands first?" },
        { en: "Now crumple the second piece of paper into a tight ball." },
        { en: "Drop the stone and the crumpled paper together. What changed?" },
      ],
      observe: {
        en: "Flat paper drifts slowly — air resistance pushes against its wide surface. Crumpled paper and stone hit the ground at almost the same time, because gravity gives them the same acceleration g, and air resistance is now small. This is Galileo's famous insight: without air, all things fall together regardless of mass.",
      },
    },
    quiz: [
      { q: "Two balls of different mass are dropped from the same height in a vacuum. Which hits first?", choices: ["The heavier one", "The lighter one", "They hit at the same time", "Depends on size"], answerIndex: 2, explanation: "In free fall, all objects accelerate at the same g regardless of mass." },
    ],
  },
  {
    id: "phy-mech-04-energy",
    subject: "physics",
    unit: { en: "Mechanics" },
    moeCode: "PHY-G11-M3.2",
    eueeTopics: ["Work", "Energy", "Conservation"],
    eueeWeight: 7,
    estimatedMinutes: 20,
    title: { en: "Work, energy, and conservation" },
    summary: { en: "How forces transfer energy, and why total mechanical energy is conserved when only gravity acts." },
    video: { youtubeId: "TLUZnCvuGBk", credit: "Khan Academy" },
    whyItMatters: {
      en: "The Grand Ethiopian Renaissance Dam is a giant energy-conversion machine. Water held in the reservoir has potential energy (PE = mgh) — the higher the lake, the more energy stored. When the water falls through turbines, PE becomes kinetic energy, which a generator converts into electricity that lights homes in Bahir Dar and Addis Ababa. Energy isn't created — it's converted. The same principle is why pedaling a Bajaj uphill feels exhausting (chemical → PE) and coasting down feels effortless (PE → KE). Every Ethiopian hydropower station — Gilgel Gibe, Tekeze, GERD — is gravity doing physics on water.",
    },
    sections: [
      { heading: { en: "Work done by a force" }, body: "Work `W = F · d · cos(θ)`, where θ is the angle between force and displacement. Push at 90° to motion and you do *zero* work. Units: 1 joule (J) = 1 N · m." },
      { heading: { en: "Kinetic and potential energy" }, body: "`KE = ½·m·v²` is the energy of motion. Gravitational `PE = m·g·h` is the stored energy of height (relative to a chosen reference)." },
      { heading: { en: "Conservation of mechanical energy" }, body: "When only gravity acts (no friction, no air drag), `KE + PE` stays constant. A ball thrown straight up trades KE for PE on the way up and gets it back on the way down." },
    ],
    workedExample: { problem: "A 2 kg ball is dropped from 5 m. Ignoring air resistance, what is its speed just before hitting the ground? Use g = 10 m/s².", solution: "PE at top = m·g·h = 2·10·5 = 100 J. All of it becomes KE at the bottom: ½·m·v² = 100, so v² = 100, v = 10 m/s." },
    atHomeExperiment: {
      title: {
        en: "Pendulum: watch energy trade places",
      },
      video: { youtubeId: "dPyzEeBVQO0", credit: "Mr. D'Antuono" },
      materials: [
        { en: "A string about 50 cm long" },
        { en: "A small heavy object (key, washer, or small stone)" },
        { en: "A doorframe, chair, or table edge to hang from" },
      ],
      steps: [
        { en: "Tie the object firmly to one end of the string and hang the other end from a fixed support." },
        { en: "Pull the weight sideways to a chosen height. Don't push it — just release." },
        { en: "Watch how high it swings up on the other side." },
        { en: "Try with a higher starting height. What changes about its speed at the bottom?" },
      ],
      observe: {
        en: "The weight rises almost to its original height on the other side, then comes back. At the highest points it stops for an instant (all PE, no KE). At the lowest point it moves fastest (all KE, no PE). A little energy is lost each swing to air resistance — that's why it slowly damps. With a higher starting height, more PE turns into more KE — it moves faster at the bottom. Energy is just changing form, not disappearing.",
      },
    },
    quiz: [
      { q: "You carry a 10 kg bag horizontally across a room. How much work do you do on the bag (ignore acceleration)?", choices: ["100 J", "10 J", "0 J", "Depends on distance"], answerIndex: 2, explanation: "Force is upward, displacement is horizontal — angle is 90°, so cos(θ) = 0 and W = 0." },
    ],
  },

  // ----- MATHEMATICS -----
  {
    id: "math-alg-01-quadratics",
    subject: "math",
    unit: { en: "Algebra" },
    moeCode: "MTH-G11-A2.1",
    eueeTopics: ["Quadratic equations", "Discriminant"],
    eueeWeight: 9,
    estimatedMinutes: 22,
    title: { en: "Quadratic equations and the discriminant" },
    summary: { en: "Solve ax² + bx + c = 0 using factoring, completing the square, and the quadratic formula. Use the discriminant to predict the number of real roots." },
    video: { youtubeId: "JBSDQLZtjFo", credit: "Khan Academy" },
    whyItMatters: {
      en: "When an Ethiopian Coffee FC striker shoots toward the goal, the ball traces a parabola — a quadratic in flight. When farmers along the Awash design irrigation channels, the cross-section is shaped as a parabola for maximum flow. A satellite dish on a Mekele rooftop is a 3D parabola because parabolas focus signals perfectly onto a single point. Even the discriminant b² − 4ac matters in real life: it tells bridge designers whether a suspension cable will sag too much, and tells solar-cooker makers whether the sun's heat will actually focus. Quadratics aren't abstract — they describe almost everything that curves.",
    },
    sections: [
      { heading: { en: "The general form" }, body: "Any quadratic is `a·x² + b·x + c = 0` with `a ≠ 0`. Solutions are called *roots* and represent where the parabola `y = a·x² + b·x + c` crosses the x-axis." },
      { heading: { en: "The quadratic formula" }, body: "`x = (-b ± √(b² − 4ac)) / (2a)`. Memorize this — it works for every quadratic. The two signs give the two roots." },
      { heading: { en: "The discriminant Δ = b² − 4ac" }, body: "The discriminant tells you the *type* of roots before you solve:\n- If `Δ > 0`: two distinct real roots.\n- If `Δ = 0`: one repeated real root (the parabola is tangent to the x-axis).\n- If `Δ < 0`: no real roots (two complex roots)." },
    ],
    workedExample: { problem: "Solve 2x² − 5x + 2 = 0.", solution: "a=2, b=−5, c=2. Δ = 25 − 16 = 9. `x = (5 ± 3) / 4`, giving x = 2 or x = 1/2." },
    atHomeExperiment: {
      title: {
        en: "Trace a parabola you throw with your own hand",
      },
      video: { youtubeId: "HB4ws7RoA3M", credit: "NSF / Science of NFL" },
      materials: [
        { en: "A small ball or pebble" },
        { en: "An outdoor wall or clear space" },
        { en: "A phone camera (optional, for slow-motion)" },
        { en: "Paper and a pen to sketch" },
      ],
      steps: [
        { en: "Stand facing a wall a few metres away." },
        { en: "Throw the ball gently in an arc against the wall." },
        { en: "Either film it on slow-motion, or watch carefully and remember the shape." },
        { en: "On paper, sketch the path: horizontal distance on the x-axis, height on the y-axis." },
      ],
      observe: {
        en: "The path is a perfect parabola — the curve y = a·x² + b·x + c. That's the same shape as a quadratic in algebra class. The two places where the curve crosses the ground (start of throw and where it lands) are the two roots — exactly the solutions you'd compute with the quadratic formula. Quadratics aren't just abstract algebra; they describe how anything thrown moves through the air.",
      },
    },
    quiz: [
      { q: "How many real roots does x² − 4x + 5 = 0 have?", choices: ["Two", "One repeated", "Zero", "Cannot tell"], answerIndex: 2, explanation: "Δ = 16 − 20 = −4 < 0, so no real roots (two complex roots)." },
      { q: "What is the sum of the roots of 2x² − 6x + 1 = 0?", choices: ["−3", "3", "1/2", "6"], answerIndex: 1, explanation: "Sum of roots = −b/a = −(−6)/2 = 3 (Vieta's formula)." },
    ],
  },
  {
    id: "math-trig-01-ratios",
    subject: "math",
    unit: { en: "Trigonometry" },
    moeCode: "MTH-G11-T1.1",
    eueeTopics: ["Trig ratios", "Unit circle"],
    eueeWeight: 8,
    estimatedMinutes: 20,
    title: { en: "Trigonometric ratios and the unit circle" },
    summary: { en: "sin, cos, tan from a right triangle, extended to all angles via the unit circle. Foundation for every wave, oscillation, and rotation problem." },
    video: { youtubeId: "1m9p9iubMLU", credit: "Khan Academy" },
    whyItMatters: {
      en: "How tall are the Aksum stelae — the giant carved stones that have stood for 1,700 years? Ancient Aksumite engineers used the same shadow-and-stick trick you'll do in this lesson's experiment. Today, every Ethio Telecom tower is sited using trigonometry to calculate line-of-sight over Ethiopia's hilly terrain. When Ethiopian Airlines pilots land at Bole, the runway glideslope is a 3° angle calculated with tangent. Surveyors planning roads through the Simien Mountains, builders measuring roof pitches in Addis, even farmers laying out coffee-drying yards in Sidamo to catch the most sun — all use sin, cos, and tan. Trig is the math of measuring things you can't reach.",
    },
    sections: [
      { heading: { en: "SOH-CAH-TOA" }, body: "In a right triangle with angle θ:\n- `sin(θ) = opposite / hypotenuse`\n- `cos(θ) = adjacent / hypotenuse`\n- `tan(θ) = opposite / adjacent = sin(θ) / cos(θ)`" },
      { heading: { en: "The unit circle" }, body: "A point on a circle of radius 1 at angle θ from the positive x-axis is `(cos(θ), sin(θ))`. This extends sin and cos to *any* angle, including negative and > 90°. tan(θ) = sin(θ)/cos(θ) is undefined when cos(θ) = 0 (i.e. 90°, 270°)." },
      { heading: { en: "Key angles to memorize" }, body: "Know these by heart: sin(30°)=1/2, sin(45°)=√2/2, sin(60°)=√3/2; cos is the same in reverse (cos(30°)=√3/2, cos(60°)=1/2)." },
    ],
    workedExample: { problem: "A ladder leans against a wall. The ladder is 5 m long and makes a 60° angle with the ground. How high up the wall does it reach?", solution: "Height = ladder · sin(60°) = 5 · (√3/2) ≈ 5 · 0.866 ≈ 4.33 m." },
    atHomeExperiment: {
      title: {
        en: "Measure a tree's height using only its shadow",
      },
      video: { youtubeId: "8-Vv-fAsuaY", credit: "Tim Pelton" },
      materials: [
        { en: "A straight stick exactly 1 metre long (or any known length)" },
        { en: "A sunny day with clear shadows" },
        { en: "A tape measure or long string with marks" },
        { en: "A tall tree or building to measure" },
      ],
      steps: [
        { en: "Plant the stick straight up in the ground in full sunlight." },
        { en: "Measure the length of its shadow." },
        { en: "Right away (the sun moves!), measure the shadow of the tree or building." },
        { en: "Compute tree height = (stick height × tree shadow) ÷ stick shadow." },
      ],
      observe: {
        en: "You just found the height of something tall without climbing it — using only ratios! The stick and the tree make similar right triangles with the sun. The angle of the sun is the same for both, so tan(angle) = height ÷ shadow is the same ratio for both. This is exactly how surveyors measured pyramids in ancient times.",
      },
    },
    quiz: [
      { q: "What is cos(0°)?", choices: ["0", "1/2", "1", "Undefined"], answerIndex: 2, explanation: "At angle 0° on the unit circle, the point is (1, 0), so cos(0°) = 1." },
      { q: "If sin(θ) = 3/5 and θ is acute, what is cos(θ)?", choices: ["4/5", "3/5", "5/3", "5/4"], answerIndex: 0, explanation: "Using sin² + cos² = 1: cos²θ = 1 − 9/25 = 16/25, so cos θ = 4/5 (positive because θ is acute)." },
    ],
  },
  {
    id: "math-seq-01-arith-geom",
    subject: "math",
    unit: { en: "Sequences & Series" },
    moeCode: "MTH-G11-S1.1",
    eueeTopics: ["Arithmetic sequences", "Geometric sequences"],
    eueeWeight: 5,
    estimatedMinutes: 18,
    title: { en: "Arithmetic and geometric sequences" },
    summary: { en: "Patterns where each term differs from the last by a constant amount (arithmetic) or constant ratio (geometric)." },
    video: { youtubeId: "pXo0bG4iAyg", credit: "Khan Academy" },
    whyItMatters: {
      en: "When a single COVID-19 case in Addis became 100, then 10,000 in weeks — that was geometric growth (each person infecting roughly two others). When Ethio Telecom rolls out 4G to one new town a month, that's arithmetic growth: steady, linear. Your CBE savings account pays compound interest — geometric. The population of Addis Ababa doubles every ~25 years — geometric. Even the old story of one grain of teff on the first square of an injera, two on the next, four on the next: by square 30 you'd need more teff than all of Ethiopia grows in a year. Knowing the difference helps you spot exponential dangers (debt, disease) and exponential opportunities (savings, learning) early.",
    },
    sections: [
      { heading: { en: "Arithmetic sequences" }, body: "Each term adds a fixed *common difference* d. nth term: `a_n = a_1 + (n−1)·d`. Sum of first n terms: `S_n = n/2 · (a_1 + a_n) = n/2 · (2a_1 + (n−1)d)`." },
      { heading: { en: "Geometric sequences" }, body: "Each term multiplies by a fixed *common ratio* r. nth term: `a_n = a_1 · r^(n−1)`. Sum of first n terms (r ≠ 1): `S_n = a_1 · (1 − r^n) / (1 − r)`." },
      { heading: { en: "Infinite geometric sums" }, body: "If `|r| < 1`, the infinite sum converges: `S_∞ = a_1 / (1 − r)`. If `|r| ≥ 1`, the sum diverges (grows without bound)." },
    ],
    workedExample: { problem: "Find the sum of the first 10 terms of 3, 7, 11, 15, ...", solution: "Arithmetic with a₁ = 3, d = 4. S₁₀ = 10/2 · (2·3 + 9·4) = 5 · 42 = 210." },
    atHomeExperiment: {
      title: {
        en: "Fold a paper and watch a geometric sequence appear",
      },
      video: { youtubeId: "6EQeh2aK81Q", credit: "MythBusters" },
      materials: [
        { en: "One large sheet of paper (A4 or larger)" },
        { en: "A ruler (optional)" },
      ],
      steps: [
        { en: "Fold the paper in half. Count the layers — write down: 1 fold → 2 layers." },
        { en: "Fold it in half again. Count layers (4). Write 2 folds → 4 layers." },
        { en: "Keep folding until you can't fold anymore. Record number of folds vs layers each time." },
        { en: "After folding stops, look at your list: 2, 4, 8, 16, 32, …" },
      ],
      observe: {
        en: "Your numbers form a geometric sequence with common ratio r = 2: every fold doubles the number of layers. Layers after n folds = 2ⁿ. Most people can't fold past 7 folds because by then you have 128 layers — the paper is too thick. That's why geometric growth is so powerful: it starts small, then explodes.",
      },
    },
    quiz: [
      { q: "What is the 8th term of the geometric sequence 2, 6, 18, ...?", choices: ["486", "1458", "4374", "162"], answerIndex: 2, explanation: "r = 3, so a₈ = 2 · 3⁷ = 2 · 2187 = 4374." },
    ],
  },

  // ----- CHEMISTRY -----
  {
    id: "chem-mol-01-mole",
    subject: "chemistry",
    unit: { en: "Stoichiometry" },
    moeCode: "CHE-G11-S1.1",
    eueeTopics: ["Mole concept", "Molar mass"],
    eueeWeight: 9,
    estimatedMinutes: 20,
    title: { en: "The mole and molar mass" },
    summary: { en: "The mole bridges the world of atoms with the world of grams you can weigh in lab. Master it and most chemistry calculations become arithmetic." },
    video: { youtubeId: "wI56mHUDJgQ", credit: "Tyler DeWitt" },
    whyItMatters: {
      en: "When a chemist at an Ethiopian winery measures sulfur dioxide to preserve wine, they need exactly the right number of molecules — too many would poison drinkers, too few and the wine spoils. Pharmacists across Ethiopia dose paracetamol the same way: 500 mg is precisely 1.65 × 10²¹ molecules. Bakers measuring baking soda for injera dough are doing mole math without knowing it — the recipe was tuned by trial and error to get the right ratio of CO₂ molecules to dough. The mole is the bridge between the visible world (grams of teff, drops of medicine) and the invisible world of atoms. Without it, modern chemistry, medicine, and food science would not exist.",
    },
    sections: [
      { heading: { en: "What is a mole?" }, body: "1 mole = 6.022 × 10²³ particles (Avogadro's number `N_A`). It's just a *counting* unit — like 'dozen' = 12, but vastly bigger because atoms are vastly smaller than eggs." },
      { heading: { en: "Molar mass" }, body: "The molar mass of a substance (g/mol) is numerically equal to the sum of atomic masses on the periodic table. Water H₂O: 2·(1) + 16 = 18 g/mol. So 1 mole of water weighs 18 g." },
      { heading: { en: "Converting mass ↔ moles ↔ particles" }, body: "Moles = mass / molar mass. Particles = moles × N_A. Always check your units." },
    ],
    workedExample: { problem: "How many moles are in 9 g of water?", solution: "Molar mass of H₂O = 18 g/mol. Moles = 9 / 18 = 0.5 mol. That's 0.5 × 6.022e23 ≈ 3.0 × 10²³ water molecules." },
    atHomeExperiment: {
      title: {
        en: "Feel how big Avogadro's number really is — using rice",
      },
      video: { youtubeId: "TEl4jeETVmg", credit: "TED-Ed" },
      materials: [
        { en: "A handful of uncooked rice" },
        { en: "A kitchen scale or measuring spoon" },
        { en: "Paper and pen" },
      ],
      steps: [
        { en: "Count out exactly 100 grains of rice — yes, all 100. Take your time." },
        { en: "Weigh those 100 grains. Mass of 1 grain = total mass ÷ 100." },
        { en: "Now imagine 'a mole' of rice grains: 6.022 × 10²³ of them. Multiply: total mass = (mass of 1 grain) × 6.022 × 10²³." },
        { en: "Convert grams → kilograms → tonnes. Compare it to the mass of Mount Entoto or Africa." },
      ],
      observe: {
        en: "A single rice grain weighs about 25 mg. One mole of rice would weigh about 1.5 × 10¹⁹ kg — many quadrillion tonnes, vastly more than Mount Entoto or even all the rice ever grown on Earth. Yet a mole of water molecules fits in 18 g — a single spoonful! That's because atoms are unimaginably smaller than rice grains. The mole is just a counting unit, but its scale tells you how tiny atoms really are.",
      },
    },
    quiz: [
      { q: "How many grams are in 0.25 mol of NaCl? (Na = 23, Cl = 35.5)", choices: ["14.6 g", "29.25 g", "58.5 g", "7.3 g"], answerIndex: 0, explanation: "Molar mass NaCl = 58.5 g/mol. 0.25 × 58.5 = 14.625 g." },
      { q: "What does Avogadro's number represent?", choices: ["Mass of one mole in grams", "Number of particles in one mole", "Volume of one mole of gas", "Number of protons in carbon-12"], answerIndex: 1, explanation: "N_A ≈ 6.022 × 10²³ is the number of particles in one mole." },
    ],
  },
  {
    id: "chem-acid-01-ph",
    subject: "chemistry",
    unit: { en: "Acids & Bases" },
    moeCode: "CHE-G11-AB1.1",
    eueeTopics: ["Acids and bases", "pH"],
    eueeWeight: 7,
    estimatedMinutes: 18,
    title: { en: "Acids, bases, and the pH scale" },
    summary: { en: "What makes something acidic or basic, how to measure it on the pH scale, and the simple math that connects pH to hydrogen ion concentration." },
    video: { youtubeId: "pY4RkElyvU8", credit: "Tyler DeWitt" },
    whyItMatters: {
      en: "Why does injera have its distinctive sour taste? Wild yeast and lactic-acid bacteria lower the dough's pH from about 7 to 4 over two or three days of fermentation. The acid kills harmful bacteria — which is why injera keeps for days without refrigeration. Farmers in the Oromia highlands check soil pH because teff grows best between 5.5 and 7.5; volcanic-ash zones can be too acidic, the Afar salt flats too basic, and yields collapse outside that range. Doctors monitor blood pH (must stay between 7.35 and 7.45 — outside that range is a medical emergency). Soap factories, tanneries, even the bitterness of strong bunna — all controlled by pH.",
    },
    sections: [
      { heading: { en: "Brønsted–Lowry definition" }, body: "An *acid* donates a proton (H⁺). A *base* accepts a proton. HCl in water donates H⁺ to water: HCl + H₂O → H₃O⁺ + Cl⁻. Water acts as the base here." },
      { heading: { en: "The pH scale" }, body: "`pH = −log₁₀[H⁺]`, where [H⁺] is the molar concentration of hydrogen ions. Pure water at 25°C has [H⁺] = 10⁻⁷ M, so pH = 7 (neutral). pH < 7 = acidic, pH > 7 = basic. Each pH unit is a factor of 10 in [H⁺]." },
      { heading: { en: "Strong vs. weak" }, body: "Strong acids/bases ionize completely in water (HCl, NaOH). Weak ones only partially ionize (acetic acid, ammonia) — equilibrium matters." },
    ],
    workedExample: { problem: "What is the pH of a 0.01 M HCl solution?", solution: "HCl is a strong acid, so [H⁺] ≈ 0.01 M = 10⁻² M. pH = −log(10⁻²) = 2." },
    atHomeExperiment: {
      title: {
        en: "Make your own pH indicator from red cabbage",
      },
      video: { youtubeId: "PKUwxQI0wIo", credit: "Royal Institution" },
      materials: [
        { en: "Half a head of red cabbage (or 1 beetroot)" },
        { en: "Hot water and a pot" },
        { en: "3–5 clear cups" },
        { en: "Lemon juice, vinegar, baking soda, ash water, soap water (test substances)" },
      ],
      steps: [
        { en: "Chop the cabbage. Boil it in just enough water to cover it for 10 minutes. Cool and strain — keep the deep purple liquid." },
        { en: "Pour a little of the purple liquid into each clear cup." },
        { en: "Add a few drops of one test substance to each cup. Don't mix substances." },
        { en: "Observe the colour change in each cup." },
      ],
      observe: {
        en: "The cabbage juice contains anthocyanin, a pigment whose shape changes with pH:\n- Pink/red → strong acid (lemon, vinegar — pH 1–3)\n- Purple → neutral (pH ~7)\n- Blue/green → mild base (baking soda, soap — pH 9–11)\n- Yellow → strong base (ash water — pH 12+)\nYou've just made a pH meter from a vegetable. Universal indicator strips work the same way — they're just a mix of pigments that change colour with [H⁺].",
      },
    },
    quiz: [
      { q: "A solution has pH = 4. How does its [H⁺] compare to one with pH = 6?", choices: ["100× higher", "2× higher", "100× lower", "The same"], answerIndex: 0, explanation: "Each pH unit is a 10× change. 6 − 4 = 2 units, so [H⁺] at pH 4 is 10² = 100× higher than at pH 6." },
      { q: "Which is a Brønsted–Lowry base?", choices: ["HCl", "NH₃", "H₂SO₄", "HNO₃"], answerIndex: 1, explanation: "NH₃ accepts a proton to become NH₄⁺. The others are all proton donors (acids)." },
    ],
  },

  // ----- BIOLOGY -----
  {
    id: "bio-cell-01-organelles",
    subject: "biology",
    unit: { en: "Cell biology" },
    moeCode: "BIO-G11-C1.1",
    eueeTopics: ["Cell structure", "Organelles"],
    eueeWeight: 8,
    estimatedMinutes: 22,
    title: { en: "Cell structure and organelles" },
    summary: { en: "The basic unit of life and the specialized parts inside it that keep the cell alive and working." },
    video: { youtubeId: "8IlzKri08kk", credit: "Amoeba Sisters" },
    whyItMatters: {
      en: "Every bite of kitfo is muscle cells from a cow. Every cup of bunna comes from coffee plant cells. Injera ferments because of yeast cells dividing. Even the eye reading this sentence is built from about 100 million light-sensing cells, each containing hundreds of mitochondria converting last night's shiro into ATP energy. When doctors at Black Lion Hospital diagnose cancer, they look at cells under a microscope — cancer is just cells with broken control systems. Vaccines work by training your immune cells to recognize invaders. Ethiopian medical research at the Armauer Hansen Institute and Addis Ababa University all starts with understanding what's inside a single cell.",
    },
    sections: [
      { heading: { en: "Prokaryotic vs eukaryotic cells" }, body: "Prokaryotes (bacteria, archaea) have no membrane-bound nucleus — DNA floats free in the cytoplasm. Eukaryotes (plants, animals, fungi, protists) have a true nucleus and many membrane-bound organelles." },
      { heading: { en: "Key organelles to know" }, body: "- *Nucleus*: stores DNA, controls gene expression.\n- *Mitochondria*: produce ATP via aerobic respiration — the cell's 'power plant'.\n- *Ribosomes*: build proteins from mRNA. Found free or on rough ER.\n- *Endoplasmic reticulum (ER)*: rough ER makes proteins; smooth ER makes lipids.\n- *Golgi apparatus*: modifies, sorts, and packages proteins for shipping.\n- *Chloroplasts* (plants only): site of photosynthesis." },
      { heading: { en: "Plant vs animal cells" }, body: "Plant cells additionally have a rigid *cell wall* (cellulose), a large central *vacuole* (storage + turgor pressure), and *chloroplasts*. Animal cells have *centrioles* (cell division) and lysosomes; plant cells generally don't." },
    ],
    workedExample: { problem: "A muscle cell uses huge amounts of ATP. Which organelle would you expect to find in unusually high numbers?", solution: "Mitochondria — they produce ATP via aerobic respiration, so cells with high energy demand pack many of them." },
    atHomeExperiment: {
      title: {
        en: "See real plant cells with no microscope (onion skin)",
      },
      video: { youtubeId: "Xc5HPAzXbZw", credit: "Microbehunter" },
      materials: [
        { en: "1 fresh onion" },
        { en: "A sharp knife (ask an adult to help)" },
        { en: "A bright window or strong lamp" },
        { en: "A magnifying glass if you have one (helpful, not required)" },
      ],
      steps: [
        { en: "Peel off one layer of the onion. Each layer is a curved white sheet." },
        { en: "On the inside (concave) surface, you'll see a very thin transparent skin. Gently peel a small piece of it with your nail." },
        { en: "Hold the thin skin up to bright light or a window." },
        { en: "Look carefully (use the magnifier if you have one). You're looking at real plant cells." },
      ],
      observe: {
        en: "You can see tiny rectangular cells lined up like bricks — those are real onion epidermis cells, each about 0.3 mm across. The clear outline is the cell wall (made of cellulose — a feature only plant cells have, not animal cells). Inside each one is a faint round shape: that's the nucleus. You just looked at one of the smallest building blocks of life with your own eyes, no microscope needed.",
      },
    },
    quiz: [
      { q: "Which organelle is the site of protein synthesis?", choices: ["Mitochondria", "Ribosome", "Golgi apparatus", "Nucleus"], answerIndex: 1, explanation: "Ribosomes translate mRNA into protein. The nucleus stores the DNA *blueprint*, but synthesis happens at ribosomes." },
      { q: "Which structure is found in plant cells but NOT animal cells?", choices: ["Mitochondria", "Cell wall", "Nucleus", "Ribosomes"], answerIndex: 1, explanation: "Cell walls (cellulose) are a defining plant feature. Animals have only a flexible plasma membrane." },
    ],
  },
  {
    id: "bio-div-01-mitosis-meiosis",
    subject: "biology",
    unit: { en: "Cell biology" },
    moeCode: "BIO-G11-C2.1",
    eueeTopics: ["Mitosis", "Meiosis", "Cell division"],
    eueeWeight: 7,
    estimatedMinutes: 24,
    title: { en: "Mitosis vs meiosis" },
    summary: { en: "Two ways cells divide: mitosis for growth and repair (identical daughters), meiosis for sex cells (genetically varied, half the chromosomes)." },
    video: { youtubeId: "zrKdz93WlVk", credit: "Amoeba Sisters" },
    whyItMatters: {
      en: "A teff farmer in the Oromia highlands plants one seed and a year later harvests thousands more. Every cell of every teff plant came from mitosis — the original embryo cell dividing again and again, each daughter cell an exact copy. But the new seeds inside those grains came from meiosis: the parent plant mixed its genes to make offspring that aren't identical. That's why some teff varieties resist drought while others give higher yields — and why breeders at the Debre Zeit Agricultural Research Center can select for the best. The same biology is why your siblings look different from you (meiosis in your parents), but a cut on your hand heals into identical skin cells (mitosis in your body).",
    },
    sections: [
      { heading: { en: "Mitosis: one becomes two identical cells" }, body: "Mitosis produces two genetically identical *diploid* daughter cells (2n → 2n). Phases: prophase, metaphase, anaphase, telophase, then cytokinesis. Used for growth, tissue repair, and asexual reproduction." },
      { heading: { en: "Meiosis: one becomes four genetically varied cells" }, body: "Meiosis produces four genetically distinct *haploid* gametes (2n → n). Two divisions in a row: meiosis I separates homologous chromosomes; meiosis II separates sister chromatids (like mitosis)." },
      { heading: { en: "Why genetic variation?" }, body: "Two mechanisms in meiosis create variation: (1) *crossing over* in prophase I — homologous chromosomes swap segments; (2) *independent assortment* — each pair of homologs lines up randomly in metaphase I." },
    ],
    workedExample: { problem: "A human cell has 46 chromosomes. After meiosis, how many chromosomes does each gamete have?", solution: "Meiosis halves the chromosome number: 46 / 2 = 23. Each sperm or egg carries 23 chromosomes; fertilization restores 46." },
    atHomeExperiment: {
      title: {
        en: "Watch mitosis grow a plant from a single seed",
      },
      video: { youtubeId: "w77zPAtVTuI", credit: "GPhase" },
      materials: [
        { en: "5–6 bean or chickpea seeds (any dried beans from the kitchen)" },
        { en: "A small dish or plate" },
        { en: "Cotton wool or a thick cloth" },
        { en: "Water and a ruler" },
      ],
      steps: [
        { en: "Soak the cotton in water until it is damp but not dripping. Place it on the dish." },
        { en: "Lay the seeds on top. Put the dish in a warm spot but out of direct sun." },
        { en: "Keep the cotton damp each day (sprinkle water)." },
        { en: "Each day for a week, measure and record the root length. Notice the first tiny root, then the shoot." },
      ],
      observe: {
        en: "From one seed, you'll see hundreds of new cells in days — the seed grows roots, then a shoot, then leaves. Every one of those cells came from mitosis: the original embryo cell divided, the daughters divided again, and so on. All cells in the plant share the same DNA. (Meiosis is different — it only happens later, when the grown plant makes pollen and eggs for its own seeds.)",
      },
    },
    quiz: [
      { q: "Which process produces genetically identical daughter cells?", choices: ["Mitosis", "Meiosis", "Fertilization", "Crossing over"], answerIndex: 0, explanation: "Mitosis copies the parent cell exactly. Meiosis and crossing over generate variation." },
      { q: "How many cells does one round of meiosis produce from one starting cell?", choices: ["1", "2", "4", "8"], answerIndex: 2, explanation: "Meiosis is two divisions in a row, producing 4 haploid daughter cells from one diploid parent." },
    ],
  },
  {
    id: "bio-gen-01-dna-structure",
    subject: "biology",
    unit: { en: "Genetics" },
    moeCode: "BIO-G11-G1.1",
    eueeTopics: ["DNA structure", "Nucleotides", "Genetic material"],
    eueeWeight: 8,
    estimatedMinutes: 22,
    title: { en: "DNA: the molecule of life" },
    summary: {
      en: "The chemical instructions inside every living cell — how DNA is built from four bases, twisted into a double helix, and packaged into chromosomes.",
    },
    video: { youtubeId: "8m6hHRlKwxY", credit: "Amoeba Sisters" },
    whyItMatters: {
      en: "Why does one teff variety thrive in Tigray's dry highlands while another grows best in the Awash valley? The answer is written in DNA. Researchers at the Ethiopian Biodiversity Institute and the EIAR sequence the genomes of Ethiopian crops to find the genes for drought tolerance, iron-rich grains, and disease resistance. Forensic labs at the Federal Police use DNA to identify suspects and bring families closure. Doctors testing for sickle cell disease — common in parts of southern Ethiopia — are reading a single letter change in one gene. And every coffee tree in the Sidamo region carries DNA that researchers can trace back through centuries of farmer selection. DNA isn't abstract: it's the source code of every living thing around you.",
    },
    sections: [
      { heading: { en: "What is DNA made of?" }, body: "DNA stands for *deoxyribonucleic acid*. It is a long chain of small units called *nucleotides*. Every nucleotide has three parts: a sugar (deoxyribose), a phosphate group, and one of four nitrogen bases — *adenine (A)*, *thymine (T)*, *guanine (G)*, or *cytosine (C)*. The order of these bases along the chain is the genetic code." },
      { heading: { en: "The double helix and base pairing" }, body: "DNA is two strands twisted around each other in a *double helix*, first described by Watson, Crick, and Franklin in 1953. The strands are held together by base pairs: *A always pairs with T*, and *G always pairs with C*. This means one strand is the template for the other — if you know one side, you know the other." },
      { heading: { en: "Genes, chromosomes, and the genome" }, body: "A *gene* is a stretch of DNA that codes for one protein or trait. Genes are packed onto long structures called *chromosomes* inside the nucleus — humans have 46 (23 pairs); teff has 40. The full set of DNA in an organism is its *genome* — about 3 billion base pairs in humans, far more in many plants." },
    ],
    workedExample: {
      problem: "One DNA strand reads 5'–ATGGCTAAG–3'. Write the sequence of the complementary strand.",
      solution: "Pair A↔T and G↔C, and remember the second strand runs in the opposite direction (3'→5' when read alongside the first). Reading base-by-base: A→T, T→A, G→C, G→C, C→G, T→A, A→T, A→T, G→C. So the complementary strand is 3'–TACCGATTC–5'.",
    },
    atHomeExperiment: {
      title: {
        en: "Extract real DNA from a strawberry",
      },
      video: { youtubeId: "zMw44VDqf2s", credit: "NHGRI (genome.gov)" },
      materials: [
        { en: "1 ripe strawberry (or 2–3 small ones)" },
        { en: "A zip-lock bag or any clean plastic bag" },
        { en: "1 teaspoon dish soap" },
        { en: "A pinch of table salt (about ¼ teaspoon)" },
        { en: "About 100 ml clean water" },
        { en: "A coffee filter or a clean piece of cloth" },
        { en: "A clear cup or small glass" },
        { en: "Ice-cold rubbing alcohol or araki — kept in the freezer for 30 minutes" },
        { en: "A toothpick or thin wooden skewer" },
      ],
      steps: [
        { en: "In a cup, gently stir together the water, salt, and dish soap. Don't make foam." },
        { en: "Remove the green leaves from the strawberry, put it in the bag, and seal it. Squish with your fingers for about 2 minutes until it is a smooth pulp." },
        { en: "Pour the soap-salt-water mixture into the bag with the pulp. Seal and gently squish to mix for one more minute." },
        { en: "Slowly pour the bag's contents through a coffee filter (or cloth) into a clear cup. Wait until you have a clear pink-red juice with no chunks." },
        { en: "Tilt the cup. Very slowly pour an equal amount of ice-cold alcohol down the inside of the cup so it forms a separate layer floating on top — do not mix." },
        { en: "Watch the line where alcohol meets the juice. Within a minute, white stringy cloudy strands will rise into the alcohol layer." },
        { en: "Dip in the toothpick and slowly lift the white strands out. That is real DNA." },
      ],
      observe: {
        en: "The white stringy substance is real DNA — billions of strawberry DNA molecules tangled together so they're now visible to the eye. Each step did a specific job: the soap broke open the cell membranes and the nuclear envelopes (they're made of fat, and soap dissolves fat); the salt made the DNA strands clump by neutralising their negative charges; and the cold alcohol pulled the DNA out of solution because DNA does not dissolve in alcohol. Strawberries work especially well because they are octoploid — they carry eight copies of every chromosome, so you get a huge amount of DNA per cell. The same technique, scaled up with cleaner reagents, is what researchers at the Ethiopian Biotechnology Institute use to extract DNA from teff, coffee, and cattle for breeding and conservation work.",
      },
    },
    quiz: [
      { q: "In DNA, which bases pair with each other?", choices: ["A–G and T–C", "A–T and G–C", "A–C and T–G", "Any base can pair with any base"], answerIndex: 1, explanation: "Adenine always pairs with thymine, and guanine always pairs with cytosine — that's why one strand fully determines the other." },
      { q: "Which part of a nucleotide actually carries the genetic information?", choices: ["The sugar", "The phosphate", "The nitrogen base", "The whole chromosome"], answerIndex: 2, explanation: "The order of the four nitrogen bases (A, T, G, C) along the strand is the code. The sugar and phosphate form the backbone but are identical in every nucleotide." },
    ],
  },
];

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function lessonsBySubject(subject: Subject): Lesson[] {
  return LESSONS.filter((l) => l.subject === subject);
}

export function adjacentLessons(id: string): { prev?: Lesson; next?: Lesson } {
  const lesson = getLesson(id);
  if (!lesson) return {};
  const siblings = lessonsBySubject(lesson.subject);
  const i = siblings.findIndex((l) => l.id === id);
  return { prev: siblings[i - 1], next: siblings[i + 1] };
}

export function allTopicsForSubject(subject: Subject): { topic: string; weight: number; lessonId: string }[] {
  const out: { topic: string; weight: number; lessonId: string }[] = [];
  const seen = new Set<string>();
  for (const lesson of lessonsBySubject(subject)) {
    for (const topic of lesson.eueeTopics) {
      const key = `${subject}:${topic}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ topic, weight: lesson.eueeWeight, lessonId: lesson.id });
    }
  }
  return out;
}
