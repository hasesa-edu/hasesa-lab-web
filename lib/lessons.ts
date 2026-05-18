import type { Locale } from "./i18n";

export type Translated = Record<Locale, string>;

export type Lesson = {
  id: string;
  subject: "physics";
  unit: Translated;
  moeCode: string;
  eueeTopics: string[];
  estimatedMinutes: number;
  title: Translated;
  summary: Translated;
  sections: { heading: Translated; body: string }[];
  workedExample: { problem: string; solution: string };
  quiz: { q: string; choices: string[]; answerIndex: number; explanation: string }[];
};

export const LESSONS: Lesson[] = [
  {
    id: "phy-mech-01-kinematics-1d",
    subject: "physics",
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M1.1",
    eueeTopics: ["Kinematics", "Motion in 1D"],
    estimatedMinutes: 18,
    title: {
      en: "Motion in a straight line",
      am: "በቀጥታ መስመር ላይ እንቅስቃሴ",
      om: "Sochii sararaa qajeelaa irratti",
    },
    summary: {
      en: "Position, displacement, velocity, and acceleration for objects moving along a single axis. Build the vocabulary you need for every Mechanics problem.",
      am: "በአንድ ዘንግ ላይ ለሚንቀሳቀሱ ነገሮች ቦታ፣ የቦታ ለውጥ፣ ፍጥነትና ማፋጠን። ለሁሉም የሜካኒክስ ጥያቄ የሚያስፈልገውን ቃላት ይገንቡ።",
      om: "Iddoo, jijjiirama iddoo, saffisa fi dabalata saffisaa wantoota aksiisii tokko irratti sochoo'aniif. Jechoota rakkoo Mekaanikisii hundaaf si barbaachisan ijaari.",
    },
    sections: [
      {
        heading: { en: "Position vs. displacement", am: "ቦታ እና የቦታ ለውጥ", om: "Iddoo fi jijjiirama iddoo" },
        body: "Position is *where* an object is on a chosen axis — a coordinate `x`. Displacement is the *change* in position, `Δx = x_final − x_initial`. Distance is the total path length, which can be larger than the magnitude of displacement if the object turns around.",
      },
      {
        heading: { en: "Velocity vs. speed", am: "ፍጥነት እና ፍጥነት መጠን", om: "Saffisa fi balaqqee saffisaa" },
        body: "Average velocity `v_avg = Δx / Δt` is a vector — it has direction. Average speed is the total distance divided by time and is always non-negative. Instantaneous velocity is the limit of `Δx / Δt` as `Δt → 0`.",
      },
      {
        heading: { en: "Acceleration", am: "ማፋጠን", om: "Dabalata saffisaa" },
        body: "Acceleration is the rate of change of velocity: `a = Δv / Δt`. A negative acceleration in the direction of motion means the object is slowing down; in the opposite direction it can mean speeding up backwards.",
      },
    ],
    workedExample: {
      problem: "A bus starts from rest and reaches 20 m/s in 8 s along a straight road. What is its average acceleration?",
      solution: "Use `a = Δv / Δt = (20 − 0) / 8 = 2.5 m/s²`. The bus speeds up by 2.5 m/s every second.",
    },
    quiz: [
      {
        q: "A student walks 100 m east, then 40 m west. What is the magnitude of displacement?",
        choices: ["60 m", "100 m", "140 m", "40 m"],
        answerIndex: 0,
        explanation: "Displacement is the net change in position: 100 − 40 = 60 m east. Distance traveled would be 140 m.",
      },
      {
        q: "Which quantity is always non-negative?",
        choices: ["Velocity", "Displacement", "Speed", "Acceleration"],
        answerIndex: 2,
        explanation: "Speed is a scalar magnitude — always ≥ 0. The others are vectors and can be negative depending on direction.",
      },
    ],
  },
  {
    id: "phy-mech-02-newtons-laws",
    subject: "physics",
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M2.1",
    eueeTopics: ["Newton's laws", "Forces"],
    estimatedMinutes: 22,
    title: {
      en: "Newton's three laws of motion",
      am: "የኒውተን ሦስት የእንቅስቃሴ ሕጎች",
      om: "Seerota sochii sadan Niwutan",
    },
    summary: {
      en: "The rules that govern how forces change motion. Foundational for every Mechanics question on the EUEE.",
      om: "Seerota humnoonni akkaataa sochiin akka jijjiiraman bulchan. Gaaffii Mekaanikisii EUEE hundaaf bu'uura.",
      am: "ኃይሎች እንቅስቃሴን እንዴት እንደሚቀይሩ የሚገዙ ሕጎች። ለEUEE ለሁሉም የሜካኒክስ ጥያቄ መሠረታዊ።",
    },
    sections: [
      {
        heading: { en: "First law (inertia)", am: "የመጀመሪያ ሕግ (ዝምታ)", om: "Seera jalqabaa (inarshiyaa)" },
        body: "An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted on by a net external force. The tendency to resist changes is called *inertia*, and it scales with mass.",
      },
      {
        heading: { en: "Second law (F = ma)", am: "ሁለተኛ ሕግ (F = ma)", om: "Seera lammaffaa (F = ma)" },
        body: "The net force on an object equals its mass times its acceleration: `F_net = m · a`. Force is a vector — direction matters. Units: 1 newton (N) = 1 kg · m/s².",
      },
      {
        heading: { en: "Third law (action–reaction)", am: "ሦስተኛ ሕግ (ድርጊት–ምላሽ)", om: "Seera sadaffaa (gocha–deebii)" },
        body: "For every action there is an equal and opposite reaction. If A pushes B with force `F`, then B pushes A with force `−F`. The two forces act on *different* objects, so they don't cancel out on a free-body diagram of one of them.",
      },
    ],
    workedExample: {
      problem: "A 4 kg box is pushed with a net horizontal force of 12 N on a frictionless surface. What is its acceleration?",
      solution: "From `F = m·a`, we get `a = F / m = 12 / 4 = 3 m/s²` in the direction of the applied force.",
    },
    quiz: [
      {
        q: "You push a wall and it doesn't move. By Newton's third law, what does the wall do?",
        choices: [
          "Nothing — it's just a wall",
          "Pushes you back with equal force in the opposite direction",
          "Pushes you back with greater force",
          "Absorbs your force",
        ],
        answerIndex: 1,
        explanation: "Action–reaction pairs are equal in magnitude and opposite in direction. The wall pushes back on you with the same force you push it.",
      },
      {
        q: "If you double the net force on an object, what happens to its acceleration (mass unchanged)?",
        choices: ["Halved", "Unchanged", "Doubled", "Quadrupled"],
        answerIndex: 2,
        explanation: "F = m·a. With m fixed, a is proportional to F, so doubling F doubles a.",
      },
    ],
  },
  {
    id: "phy-mech-03-free-fall",
    subject: "physics",
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M1.3",
    eueeTopics: ["Free fall", "Gravity"],
    estimatedMinutes: 15,
    title: {
      en: "Free fall and gravity near Earth",
      am: "ነፃ ውድቀትና በምድር አጠገብ ስበት",
      om: "Kufaatii bilisaa fi humna harkisa Lafaa bira",
    },
    summary: {
      en: "Objects in free fall near Earth's surface accelerate downward at about 9.8 m/s² regardless of mass.",
      am: "በምድር ገጽ አጠገብ በነፃ ውድቀት ላይ ያሉ ነገሮች የብዙኃን ምንም ይሁን ምን በ9.8 m/s² ወደ ታች ይፋጠናሉ።",
      om: "Wantoonni kufaatii bilisaa Lafaa bira jiran ulfaatina isaanii kamiyyuu osoo hin ilaalin gara gadiitti 9.8 m/s² dabalata saffisaa qabu.",
    },
    sections: [
      {
        heading: { en: "g, the acceleration of gravity", am: "g, የስበት ማፋጠን", om: "g, dabalata saffisaa harkisa lafaa" },
        body: "Near Earth's surface, `g ≈ 9.8 m/s²` (often rounded to 10 in classwork). It points toward Earth's center. In a vacuum, a feather and a hammer fall side by side because `g` doesn't depend on mass.",
      },
      {
        heading: { en: "Kinematic equations for free fall", am: "ለነፃ ውድቀት ኪነማቲክ ቀመሮች", om: "Wal-qixxata Kinematiks kufaatii bilisaaf" },
        body: "Taking downward as positive: `v = v₀ + g·t`, `y = v₀·t + ½·g·t²`, `v² = v₀² + 2·g·y`. These are the same equations you used for 1D motion with constant acceleration — gravity just supplies the acceleration.",
      },
      {
        heading: { en: "Air resistance — when it matters", am: "የአየር መከላከያ — መቼ አስፈላጊ ነው", om: "Diddaa qilleensaa — yoom barbaachisaa dha" },
        body: "On the EUEE, problems usually say 'ignore air resistance'. In real life it matters a lot for light or wide objects — a parachute reaches *terminal velocity* when drag equals gravity.",
      },
    ],
    workedExample: {
      problem: "A stone is dropped from a 45 m cliff. Taking g = 10 m/s², how long until it hits the ground?",
      solution: "Using `y = ½·g·t²` with y = 45: t² = 2·45 / 10 = 9, so t = 3 s.",
    },
    quiz: [
      {
        q: "Two balls of different mass are dropped from the same height in a vacuum. Which hits first?",
        choices: ["The heavier one", "The lighter one", "They hit at the same time", "Depends on size"],
        answerIndex: 2,
        explanation: "In free fall, all objects accelerate at the same g regardless of mass. They hit together in a vacuum.",
      },
    ],
  },
  {
    id: "phy-mech-04-energy",
    subject: "physics",
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M3.2",
    eueeTopics: ["Work", "Energy", "Conservation"],
    estimatedMinutes: 20,
    title: {
      en: "Work, energy, and conservation",
      am: "ሥራ፣ ኃይልና ጥበቃ",
      om: "Hojii, anniisaa fi eegumsa" ,
    },
    summary: {
      en: "How forces transfer energy, and why total mechanical energy is conserved when only gravity acts.",
      am: "ኃይሎች ሃይል እንዴት እንደሚያስተላልፉና ስበት ብቻ ሲሰራ አጠቃላይ ሜካኒካል ሃይል ለምን እንደሚጠበቅ።",
      om: "Akkaataa humnoonni anniisaa akka dabarsanii fi yommuu harkisni qofti hojjetu anniisaan mekaanikaa waliigalaa maaliif akka eegamu.",
    },
    sections: [
      {
        heading: { en: "Work done by a force", am: "በኃይል የተሰራ ሥራ", om: "Hojii humna tokkoon hojjetame" },
        body: "Work `W = F · d · cos(θ)`, where θ is the angle between force and displacement. Push at 90° to motion and you do *zero* work. Units: 1 joule (J) = 1 N · m.",
      },
      {
        heading: { en: "Kinetic and potential energy", am: "ኪነቲክና ሰብአዊ ሃይል", om: "Anniisaa kineetikii fi potensh." },
        body: "`KE = ½·m·v²` is the energy of motion. Gravitational `PE = m·g·h` is the stored energy of height (relative to a chosen reference).",
      },
      {
        heading: { en: "Conservation of mechanical energy", am: "የሜካኒካል ሃይል ጥበቃ", om: "Eegumsa anniisaa mekaanikaa" },
        body: "When only gravity acts (no friction, no air drag), `KE + PE` stays constant. A ball thrown straight up trades KE for PE on the way up and gets it back on the way down.",
      },
    ],
    workedExample: {
      problem: "A 2 kg ball is dropped from 5 m. Ignoring air resistance, what is its speed just before hitting the ground? Use g = 10 m/s².",
      solution: "PE at top = m·g·h = 2·10·5 = 100 J. All of it becomes KE at the bottom: ½·m·v² = 100, so v² = 100, v = 10 m/s.",
    },
    quiz: [
      {
        q: "You carry a 10 kg bag horizontally across a room. How much work do you do on the bag (ignore acceleration)?",
        choices: ["100 J", "10 J", "0 J", "Depends on distance"],
        answerIndex: 2,
        explanation: "You apply an upward force, but the bag moves horizontally — the angle between force and displacement is 90°, so cos(θ) = 0 and W = 0.",
      },
    ],
  },
];

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
