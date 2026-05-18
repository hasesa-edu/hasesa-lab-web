import type { Locale } from "./i18n";

export type Translated = Record<Locale, string>;
export type Subject = "math" | "physics" | "chemistry" | "biology";

export const SUBJECTS: { id: Subject; label: Translated; emoji: string }[] = [
  {
    id: "math",
    label: { en: "Mathematics", am: "ሒሳብ", om: "Heerregaa" },
    emoji: "🧮",
  },
  {
    id: "physics",
    label: { en: "Physics", am: "ፊዚክስ", om: "Fiiziksii" },
    emoji: "⚛️",
  },
  {
    id: "chemistry",
    label: { en: "Chemistry", am: "ኬሚስትሪ", om: "Keemistirii" },
    emoji: "🧪",
  },
  {
    id: "biology",
    label: { en: "Biology", am: "ባዮሎጂ", om: "Baayooloojii" },
    emoji: "🧬",
  },
];

export function subjectMeta(id: Subject) {
  return SUBJECTS.find((s) => s.id === id)!;
}

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
  sections: { heading: Translated; body: string }[];
  workedExample: { problem: string; solution: string };
  quiz: { q: string; choices: string[]; answerIndex: number; explanation: string }[];
};

export const LESSONS: Lesson[] = [
  // ----- PHYSICS -----
  {
    id: "phy-mech-01-kinematics-1d",
    subject: "physics",
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M1.1",
    eueeTopics: ["Kinematics", "Motion in 1D"],
    eueeWeight: 8,
    estimatedMinutes: 18,
    title: {
      en: "Motion in a straight line",
      am: "በቀጥታ መስመር ላይ እንቅስቃሴ",
      om: "Sochii sararaa qajeelaa irratti",
    },
    summary: {
      en: "Position, displacement, velocity, and acceleration for objects moving along a single axis. Build the vocabulary you need for every Mechanics problem.",
      am: "በአንድ ዘንግ ላይ ለሚንቀሳቀሱ ነገሮች ቦታ፣ የቦታ ለውጥ፣ ፍጥነትና ማፋጠን። ለሁሉም የሜካኒክስ ጥያቄ የሚያስፈልገውን ቃላት ይገንቡ።",
      om: "Iddoo, jijjiirama iddoo, saffisa fi dabalata saffisaa wantoota aksiisii tokko irratti sochoo'aniif.",
    },
    sections: [
      { heading: { en: "Position vs. displacement", am: "ቦታ እና የቦታ ለውጥ", om: "Iddoo fi jijjiirama iddoo" }, body: "Position is *where* an object is on a chosen axis — a coordinate `x`. Displacement is the *change* in position, `Δx = x_final − x_initial`. Distance is the total path length, which can be larger than the magnitude of displacement if the object turns around." },
      { heading: { en: "Velocity vs. speed", am: "ፍጥነት እና ፍጥነት መጠን", om: "Saffisa fi balaqqee saffisaa" }, body: "Average velocity `v_avg = Δx / Δt` is a vector — it has direction. Average speed is the total distance divided by time and is always non-negative. Instantaneous velocity is the limit of `Δx / Δt` as `Δt → 0`." },
      { heading: { en: "Acceleration", am: "ማፋጠን", om: "Dabalata saffisaa" }, body: "Acceleration is the rate of change of velocity: `a = Δv / Δt`. A negative acceleration in the direction of motion means the object is slowing down; in the opposite direction it can mean speeding up backwards." },
    ],
    workedExample: { problem: "A bus starts from rest and reaches 20 m/s in 8 s along a straight road. What is its average acceleration?", solution: "Use `a = Δv / Δt = (20 − 0) / 8 = 2.5 m/s²`. The bus speeds up by 2.5 m/s every second." },
    quiz: [
      { q: "A student walks 100 m east, then 40 m west. What is the magnitude of displacement?", choices: ["60 m", "100 m", "140 m", "40 m"], answerIndex: 0, explanation: "Displacement is the net change in position: 100 − 40 = 60 m east. Distance traveled would be 140 m." },
      { q: "Which quantity is always non-negative?", choices: ["Velocity", "Displacement", "Speed", "Acceleration"], answerIndex: 2, explanation: "Speed is a scalar magnitude — always ≥ 0. The others are vectors and can be negative depending on direction." },
    ],
  },
  {
    id: "phy-mech-02-newtons-laws",
    subject: "physics",
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M2.1",
    eueeTopics: ["Newton's laws", "Forces"],
    eueeWeight: 10,
    estimatedMinutes: 22,
    title: { en: "Newton's three laws of motion", am: "የኒውተን ሦስት የእንቅስቃሴ ሕጎች", om: "Seerota sochii sadan Niwutan" },
    summary: { en: "The rules that govern how forces change motion. Foundational for every Mechanics question on the EUEE.", am: "ኃይሎች እንቅስቃሴን እንዴት እንደሚቀይሩ የሚገዙ ሕጎች።", om: "Seerota humnoonni akkaataa sochiin akka jijjiiraman bulchan." },
    sections: [
      { heading: { en: "First law (inertia)", am: "የመጀመሪያ ሕግ", om: "Seera jalqabaa" }, body: "An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted on by a net external force. The tendency to resist changes is called *inertia*, and it scales with mass." },
      { heading: { en: "Second law (F = ma)", am: "ሁለተኛ ሕግ", om: "Seera lammaffaa" }, body: "The net force on an object equals its mass times its acceleration: `F_net = m · a`. Force is a vector — direction matters. Units: 1 newton (N) = 1 kg · m/s²." },
      { heading: { en: "Third law (action–reaction)", am: "ሦስተኛ ሕግ", om: "Seera sadaffaa" }, body: "For every action there is an equal and opposite reaction. If A pushes B with force `F`, then B pushes A with force `−F`. The two forces act on *different* objects, so they don't cancel out on a free-body diagram of one of them." },
    ],
    workedExample: { problem: "A 4 kg box is pushed with a net horizontal force of 12 N on a frictionless surface. What is its acceleration?", solution: "From `F = m·a`, we get `a = F / m = 12 / 4 = 3 m/s²` in the direction of the applied force." },
    quiz: [
      { q: "You push a wall and it doesn't move. By Newton's third law, what does the wall do?", choices: ["Nothing — it's just a wall", "Pushes you back with equal force in the opposite direction", "Pushes you back with greater force", "Absorbs your force"], answerIndex: 1, explanation: "Action–reaction pairs are equal in magnitude and opposite in direction." },
      { q: "If you double the net force on an object, what happens to its acceleration (mass unchanged)?", choices: ["Halved", "Unchanged", "Doubled", "Quadrupled"], answerIndex: 2, explanation: "F = m·a. With m fixed, a is proportional to F, so doubling F doubles a." },
    ],
  },
  {
    id: "phy-mech-03-free-fall",
    subject: "physics",
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M1.3",
    eueeTopics: ["Free fall", "Gravity"],
    eueeWeight: 6,
    estimatedMinutes: 15,
    title: { en: "Free fall and gravity near Earth", am: "ነፃ ውድቀትና በምድር አጠገብ ስበት", om: "Kufaatii bilisaa fi humna harkisa Lafaa bira" },
    summary: { en: "Objects in free fall near Earth's surface accelerate downward at about 9.8 m/s² regardless of mass.", am: "በምድር ገጽ አጠገብ በነፃ ውድቀት ላይ ያሉ ነገሮች በ9.8 m/s² ወደ ታች ይፋጠናሉ።", om: "Wantoonni kufaatii bilisaa Lafaa bira jiran gara gadiitti 9.8 m/s² dabalata saffisaa qabu." },
    sections: [
      { heading: { en: "g, the acceleration of gravity", am: "g, የስበት ማፋጠን", om: "g, dabalata saffisaa harkisa lafaa" }, body: "Near Earth's surface, `g ≈ 9.8 m/s²` (often rounded to 10 in classwork). It points toward Earth's center. In a vacuum, a feather and a hammer fall side by side because `g` doesn't depend on mass." },
      { heading: { en: "Kinematic equations for free fall", am: "ለነፃ ውድቀት ኪነማቲክ ቀመሮች", om: "Wal-qixxata Kinematiks kufaatii bilisaaf" }, body: "Taking downward as positive: `v = v₀ + g·t`, `y = v₀·t + ½·g·t²`, `v² = v₀² + 2·g·y`." },
      { heading: { en: "Air resistance — when it matters", am: "የአየር መከላከያ", om: "Diddaa qilleensaa" }, body: "On the EUEE, problems usually say 'ignore air resistance'. In real life it matters a lot for light or wide objects — a parachute reaches *terminal velocity* when drag equals gravity." },
    ],
    workedExample: { problem: "A stone is dropped from a 45 m cliff. Taking g = 10 m/s², how long until it hits the ground?", solution: "Using `y = ½·g·t²` with y = 45: t² = 2·45 / 10 = 9, so t = 3 s." },
    quiz: [
      { q: "Two balls of different mass are dropped from the same height in a vacuum. Which hits first?", choices: ["The heavier one", "The lighter one", "They hit at the same time", "Depends on size"], answerIndex: 2, explanation: "In free fall, all objects accelerate at the same g regardless of mass." },
    ],
  },
  {
    id: "phy-mech-04-energy",
    subject: "physics",
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M3.2",
    eueeTopics: ["Work", "Energy", "Conservation"],
    eueeWeight: 7,
    estimatedMinutes: 20,
    title: { en: "Work, energy, and conservation", am: "ሥራ፣ ኃይልና ጥበቃ", om: "Hojii, anniisaa fi eegumsa" },
    summary: { en: "How forces transfer energy, and why total mechanical energy is conserved when only gravity acts.", am: "ኃይሎች ሃይል እንዴት እንደሚያስተላልፉና ስበት ብቻ ሲሰራ አጠቃላይ ሜካኒካል ሃይል ለምን እንደሚጠበቅ።", om: "Akkaataa humnoonni anniisaa akka dabarsanii fi maaliif anniisaan mekaanikaa eegamu." },
    sections: [
      { heading: { en: "Work done by a force", am: "በኃይል የተሰራ ሥራ", om: "Hojii humna tokkoon hojjetame" }, body: "Work `W = F · d · cos(θ)`, where θ is the angle between force and displacement. Push at 90° to motion and you do *zero* work. Units: 1 joule (J) = 1 N · m." },
      { heading: { en: "Kinetic and potential energy", am: "ኪነቲክና ሰብአዊ ሃይል", om: "Anniisaa kineetikii fi potensh." }, body: "`KE = ½·m·v²` is the energy of motion. Gravitational `PE = m·g·h` is the stored energy of height (relative to a chosen reference)." },
      { heading: { en: "Conservation of mechanical energy", am: "የሜካኒካል ሃይል ጥበቃ", om: "Eegumsa anniisaa mekaanikaa" }, body: "When only gravity acts (no friction, no air drag), `KE + PE` stays constant. A ball thrown straight up trades KE for PE on the way up and gets it back on the way down." },
    ],
    workedExample: { problem: "A 2 kg ball is dropped from 5 m. Ignoring air resistance, what is its speed just before hitting the ground? Use g = 10 m/s².", solution: "PE at top = m·g·h = 2·10·5 = 100 J. All of it becomes KE at the bottom: ½·m·v² = 100, so v² = 100, v = 10 m/s." },
    quiz: [
      { q: "You carry a 10 kg bag horizontally across a room. How much work do you do on the bag (ignore acceleration)?", choices: ["100 J", "10 J", "0 J", "Depends on distance"], answerIndex: 2, explanation: "Force is upward, displacement is horizontal — angle is 90°, so cos(θ) = 0 and W = 0." },
    ],
  },

  // ----- MATHEMATICS -----
  {
    id: "math-alg-01-quadratics",
    subject: "math",
    unit: { en: "Algebra", am: "አልጀብራ", om: "Aljabraa" },
    moeCode: "MTH-G11-A2.1",
    eueeTopics: ["Quadratic equations", "Discriminant"],
    eueeWeight: 9,
    estimatedMinutes: 22,
    title: { en: "Quadratic equations and the discriminant", am: "ኳድራቲክ እኩልታዎችና ዲስክሪሚናንት", om: "Wal-qixxata kuwaadiraatikii fi diskirminaantii" },
    summary: { en: "Solve ax² + bx + c = 0 using factoring, completing the square, and the quadratic formula. Use the discriminant to predict the number of real roots.", am: "ax² + bx + c = 0 ን በፋክተር መውጣት፣ ካሬ ማጠናቀቅና ኳድራቲክ ቀመር መፍታት።", om: "ax² + bx + c = 0 faaktariin, kuwaadiraatii guutuu gochuun, fi foormulaa kuwaadiraatikiin furuu." },
    sections: [
      { heading: { en: "The general form", am: "አጠቃላይ ቅርጽ", om: "Bifa waliigalaa" }, body: "Any quadratic is `a·x² + b·x + c = 0` with `a ≠ 0`. Solutions are called *roots* and represent where the parabola `y = a·x² + b·x + c` crosses the x-axis." },
      { heading: { en: "The quadratic formula", am: "የኳድራቲክ ቀመር", om: "Foormulaa kuwaadiraatikii" }, body: "`x = (-b ± √(b² − 4ac)) / (2a)`. Memorize this — it works for every quadratic. The two signs give the two roots." },
      { heading: { en: "The discriminant Δ = b² − 4ac", am: "ዲስክሪሚናንት Δ", om: "Diskirminaantii Δ" }, body: "The discriminant tells you the *type* of roots before you solve:\n- If `Δ > 0`: two distinct real roots.\n- If `Δ = 0`: one repeated real root (the parabola is tangent to the x-axis).\n- If `Δ < 0`: no real roots (two complex roots)." },
    ],
    workedExample: { problem: "Solve 2x² − 5x + 2 = 0.", solution: "a=2, b=−5, c=2. Δ = 25 − 16 = 9. `x = (5 ± 3) / 4`, giving x = 2 or x = 1/2." },
    quiz: [
      { q: "How many real roots does x² − 4x + 5 = 0 have?", choices: ["Two", "One repeated", "Zero", "Cannot tell"], answerIndex: 2, explanation: "Δ = 16 − 20 = −4 < 0, so no real roots (two complex roots)." },
      { q: "What is the sum of the roots of 2x² − 6x + 1 = 0?", choices: ["−3", "3", "1/2", "6"], answerIndex: 1, explanation: "Sum of roots = −b/a = −(−6)/2 = 3 (Vieta's formula)." },
    ],
  },
  {
    id: "math-trig-01-ratios",
    subject: "math",
    unit: { en: "Trigonometry", am: "ትሪጎኖሜትሪ", om: "Trigonomeetirii" },
    moeCode: "MTH-G11-T1.1",
    eueeTopics: ["Trig ratios", "Unit circle"],
    eueeWeight: 8,
    estimatedMinutes: 20,
    title: { en: "Trigonometric ratios and the unit circle", am: "ትሪጎኖሜትሪክ ሬሾዎችና ዩኒት ክብ", om: "Reeshoolee trigonomeetirikii fi geengoo yuuniitii" },
    summary: { en: "sin, cos, tan from a right triangle, extended to all angles via the unit circle. Foundation for every wave, oscillation, and rotation problem.", am: "sin, cos, tan ከትክክለኛ ሦስት ጎን ሦስት ማዕዘን፣ ወደ ሁሉም ማዕዘናት በዩኒት ክብ የተራዘመ።", om: "sin, cos, tan rog-sadee mirgaa irraa, geengoo yuuniitiitiin gara cufaatti dheereffame." },
    sections: [
      { heading: { en: "SOH-CAH-TOA", am: "SOH-CAH-TOA", om: "SOH-CAH-TOA" }, body: "In a right triangle with angle θ:\n- `sin(θ) = opposite / hypotenuse`\n- `cos(θ) = adjacent / hypotenuse`\n- `tan(θ) = opposite / adjacent = sin(θ) / cos(θ)`" },
      { heading: { en: "The unit circle", am: "ዩኒት ክብ", om: "Geengoo yuuniitii" }, body: "A point on a circle of radius 1 at angle θ from the positive x-axis is `(cos(θ), sin(θ))`. This extends sin and cos to *any* angle, including negative and > 90°. tan(θ) = sin(θ)/cos(θ) is undefined when cos(θ) = 0 (i.e. 90°, 270°)." },
      { heading: { en: "Key angles to memorize", am: "ቁልፍ ማዕዘናት", om: "Daa'imota dhaa-cufaa" }, body: "Know these by heart for the EUEE: sin(30°)=1/2, sin(45°)=√2/2, sin(60°)=√3/2; cos is the same in reverse (cos(30°)=√3/2, cos(60°)=1/2)." },
    ],
    workedExample: { problem: "A ladder leans against a wall. The ladder is 5 m long and makes a 60° angle with the ground. How high up the wall does it reach?", solution: "Height = ladder · sin(60°) = 5 · (√3/2) ≈ 5 · 0.866 ≈ 4.33 m." },
    quiz: [
      { q: "What is cos(0°)?", choices: ["0", "1/2", "1", "Undefined"], answerIndex: 2, explanation: "At angle 0° on the unit circle, the point is (1, 0), so cos(0°) = 1." },
      { q: "If sin(θ) = 3/5 and θ is acute, what is cos(θ)?", choices: ["4/5", "3/5", "5/3", "5/4"], answerIndex: 0, explanation: "Using sin² + cos² = 1: cos²θ = 1 − 9/25 = 16/25, so cos θ = 4/5 (positive because θ is acute)." },
    ],
  },
  {
    id: "math-seq-01-arith-geom",
    subject: "math",
    unit: { en: "Sequences & Series", am: "ቅደም ተከተሎች", om: "Tartiiba" },
    moeCode: "MTH-G11-S1.1",
    eueeTopics: ["Arithmetic sequences", "Geometric sequences"],
    eueeWeight: 5,
    estimatedMinutes: 18,
    title: { en: "Arithmetic and geometric sequences", am: "የቁጥርና የጂኦሜትሪክ ቅደም ተከተሎች", om: "Tartiiba lakkoofsaa fi jiyoomeetirikii" },
    summary: { en: "Patterns where each term differs from the last by a constant amount (arithmetic) or constant ratio (geometric).", am: "እያንዳንዱ ቃል ከመጨረሻው በቋሚ መጠን ወይም ሬሾ የሚለይ ቅርጾች።", om: "Calaqqee tokkoon tokkoon jechi yeroo darbe irraa hammaan ykn reeshoo wal-fakkaataadhaan adda ba'u." },
    sections: [
      { heading: { en: "Arithmetic sequences", am: "የቁጥር ቅደም ተከተል", om: "Tartiiba lakkoofsaa" }, body: "Each term adds a fixed *common difference* d. nth term: `a_n = a_1 + (n−1)·d`. Sum of first n terms: `S_n = n/2 · (a_1 + a_n) = n/2 · (2a_1 + (n−1)d)`." },
      { heading: { en: "Geometric sequences", am: "የጂኦሜትሪክ ቅደም ተከተል", om: "Tartiiba jiyoomeetirikii" }, body: "Each term multiplies by a fixed *common ratio* r. nth term: `a_n = a_1 · r^(n−1)`. Sum of first n terms (r ≠ 1): `S_n = a_1 · (1 − r^n) / (1 − r)`." },
      { heading: { en: "Infinite geometric sums", am: "ማለቂያ የሌለው ጂኦሜትሪክ ድምር", om: "Walitti qabama jiyoomeetirikii dhuma hin qabne" }, body: "If `|r| < 1`, the infinite sum converges: `S_∞ = a_1 / (1 − r)`. If `|r| ≥ 1`, the sum diverges (grows without bound)." },
    ],
    workedExample: { problem: "Find the sum of the first 10 terms of 3, 7, 11, 15, ...", solution: "Arithmetic with a₁ = 3, d = 4. S₁₀ = 10/2 · (2·3 + 9·4) = 5 · 42 = 210." },
    quiz: [
      { q: "What is the 8th term of the geometric sequence 2, 6, 18, ...?", choices: ["486", "1458", "4374", "162"], answerIndex: 2, explanation: "r = 3, so a₈ = 2 · 3⁷ = 2 · 2187 = 4374." },
    ],
  },

  // ----- CHEMISTRY -----
  {
    id: "chem-mol-01-mole",
    subject: "chemistry",
    unit: { en: "Stoichiometry", am: "ስቶይኪዮሜትሪ", om: "Istooyikiyoomeetirii" },
    moeCode: "CHE-G11-S1.1",
    eueeTopics: ["Mole concept", "Molar mass"],
    eueeWeight: 9,
    estimatedMinutes: 20,
    title: { en: "The mole and molar mass", am: "ሞልና ሞላር ብዛት", om: "Mool fi ulfaatina moolaarii" },
    summary: { en: "The mole bridges the world of atoms with the world of grams you can weigh in lab. Master it and most chemistry calculations become arithmetic.", am: "ሞል የአቶሞችን ዓለም ከላብ የምትመዝነው ግራም ጋር ያገናኛል።", om: "Moolichi addunyaa atoomotaa fi addunyaa giraamii laaboraatoriitti madaaltu walitti hidha." },
    sections: [
      { heading: { en: "What is a mole?", am: "ሞል ምንድነው?", om: "Mooliin maali?" }, body: "1 mole = 6.022 × 10²³ particles (Avogadro's number `N_A`). It's just a *counting* unit — like 'dozen' = 12, but vastly bigger because atoms are vastly smaller than eggs." },
      { heading: { en: "Molar mass", am: "ሞላር ብዛት", om: "Ulfaatina moolaarii" }, body: "The molar mass of a substance (g/mol) is numerically equal to the sum of atomic masses on the periodic table. Water H₂O: 2·(1) + 16 = 18 g/mol. So 1 mole of water weighs 18 g." },
      { heading: { en: "Converting mass ↔ moles ↔ particles", am: "ብዛት ↔ ሞል ↔ ቅንጣቶች ቀየራ", om: "Ulfaatina ↔ moolii ↔ qaccee jijjiiruu" }, body: "Moles = mass / molar mass. Particles = moles × N_A. Always check your units." },
    ],
    workedExample: { problem: "How many moles are in 9 g of water?", solution: "Molar mass of H₂O = 18 g/mol. Moles = 9 / 18 = 0.5 mol. That's 0.5 × 6.022e23 ≈ 3.0 × 10²³ water molecules." },
    quiz: [
      { q: "How many grams are in 0.25 mol of NaCl? (Na = 23, Cl = 35.5)", choices: ["14.6 g", "29.25 g", "58.5 g", "7.3 g"], answerIndex: 0, explanation: "Molar mass NaCl = 58.5 g/mol. 0.25 × 58.5 = 14.625 g." },
      { q: "What does Avogadro's number represent?", choices: ["Mass of one mole in grams", "Number of particles in one mole", "Volume of one mole of gas", "Number of protons in carbon-12"], answerIndex: 1, explanation: "N_A ≈ 6.022 × 10²³ is the number of particles in one mole." },
    ],
  },
  {
    id: "chem-acid-01-ph",
    subject: "chemistry",
    unit: { en: "Acids & Bases", am: "አሲድ እና ቤዝ", om: "Asiidii fi Beezii" },
    moeCode: "CHE-G11-AB1.1",
    eueeTopics: ["Acids and bases", "pH"],
    eueeWeight: 7,
    estimatedMinutes: 18,
    title: { en: "Acids, bases, and the pH scale", am: "አሲዶች፣ ቤዞችና የpH ሚዛን", om: "Asiidii, Beezii fi madaala pH" },
    summary: { en: "What makes something acidic or basic, how to measure it on the pH scale, and the simple math that connects pH to hydrogen ion concentration.", am: "አንድ ነገር አሲድ ወይም ቤዝ የሚያደርገው ምን እንደሆነ።", om: "Wantni tokko maaliif asiidii ykn beezii akka ta'u." },
    sections: [
      { heading: { en: "Brønsted–Lowry definition", am: "የብሮንስቴድ-ሎውሪ ትርጓሜ", om: "Hiika Brønsted–Lowry" }, body: "An *acid* donates a proton (H⁺). A *base* accepts a proton. HCl in water donates H⁺ to water: HCl + H₂O → H₃O⁺ + Cl⁻. Water acts as the base here." },
      { heading: { en: "The pH scale", am: "የpH ሚዛን", om: "Madaala pH" }, body: "`pH = −log₁₀[H⁺]`, where [H⁺] is the molar concentration of hydrogen ions. Pure water at 25°C has [H⁺] = 10⁻⁷ M, so pH = 7 (neutral). pH < 7 = acidic, pH > 7 = basic. Each pH unit is a factor of 10 in [H⁺]." },
      { heading: { en: "Strong vs. weak", am: "ኃይለኛ እና ደካማ", om: "Cimaa fi laafaa" }, body: "Strong acids/bases ionize completely in water (HCl, NaOH). Weak ones only partially ionize (acetic acid, ammonia) — equilibrium matters." },
    ],
    workedExample: { problem: "What is the pH of a 0.01 M HCl solution?", solution: "HCl is a strong acid, so [H⁺] ≈ 0.01 M = 10⁻² M. pH = −log(10⁻²) = 2." },
    quiz: [
      { q: "A solution has pH = 4. How does its [H⁺] compare to one with pH = 6?", choices: ["100× higher", "2× higher", "100× lower", "The same"], answerIndex: 0, explanation: "Each pH unit is a 10× change. 6 − 4 = 2 units, so [H⁺] at pH 4 is 10² = 100× higher than at pH 6." },
      { q: "Which is a Brønsted–Lowry base?", choices: ["HCl", "NH₃", "H₂SO₄", "HNO₃"], answerIndex: 1, explanation: "NH₃ accepts a proton to become NH₄⁺. The others are all proton donors (acids)." },
    ],
  },

  // ----- BIOLOGY -----
  {
    id: "bio-cell-01-organelles",
    subject: "biology",
    unit: { en: "Cell biology", am: "የሕዋስ ባዮሎጂ", om: "Baayooloojii seelii" },
    moeCode: "BIO-G11-C1.1",
    eueeTopics: ["Cell structure", "Organelles"],
    eueeWeight: 8,
    estimatedMinutes: 22,
    title: { en: "Cell structure and organelles", am: "የሕዋስ መዋቅርና ኦርጋኔሎች", om: "Caasaa seelii fi orgaaneelota" },
    summary: { en: "The basic unit of life and the specialized parts inside it that keep the cell alive and working.", am: "የሕይወት መሠረታዊ ክፍልና ህዋስን በህይወት የሚያቆዩ ልዩ ክፍሎች።", om: "Yuunitii bu'uura jireenyaa fi qaamota addaa seelii lubbuun jiraachisan." },
    sections: [
      { heading: { en: "Prokaryotic vs eukaryotic cells", am: "ፕሮካርዮቲክና ኢውካርዮቲክ", om: "Pirookaariyootik fi Iyukaariyootik" }, body: "Prokaryotes (bacteria, archaea) have no membrane-bound nucleus — DNA floats free in the cytoplasm. Eukaryotes (plants, animals, fungi, protists) have a true nucleus and many membrane-bound organelles." },
      { heading: { en: "Key organelles to know", am: "ቁልፍ ኦርጋኔሎች", om: "Orgaaneelota ijoo" }, body: "- *Nucleus*: stores DNA, controls gene expression.\n- *Mitochondria*: produce ATP via aerobic respiration — the cell's 'power plant'.\n- *Ribosomes*: build proteins from mRNA. Found free or on rough ER.\n- *Endoplasmic reticulum (ER)*: rough ER makes proteins; smooth ER makes lipids.\n- *Golgi apparatus*: modifies, sorts, and packages proteins for shipping.\n- *Chloroplasts* (plants only): site of photosynthesis." },
      { heading: { en: "Plant vs animal cells", am: "የተክልና የእንስሳ ሕዋስ", om: "Seelii biqiltootaa fi bineensotaa" }, body: "Plant cells additionally have a rigid *cell wall* (cellulose), a large central *vacuole* (storage + turgor pressure), and *chloroplasts*. Animal cells have *centrioles* (cell division) and lysosomes; plant cells generally don't." },
    ],
    workedExample: { problem: "A muscle cell uses huge amounts of ATP. Which organelle would you expect to find in unusually high numbers?", solution: "Mitochondria — they produce ATP via aerobic respiration, so cells with high energy demand pack many of them." },
    quiz: [
      { q: "Which organelle is the site of protein synthesis?", choices: ["Mitochondria", "Ribosome", "Golgi apparatus", "Nucleus"], answerIndex: 1, explanation: "Ribosomes translate mRNA into protein. The nucleus stores the DNA *blueprint*, but synthesis happens at ribosomes." },
      { q: "Which structure is found in plant cells but NOT animal cells?", choices: ["Mitochondria", "Cell wall", "Nucleus", "Ribosomes"], answerIndex: 1, explanation: "Cell walls (cellulose) are a defining plant feature. Animals have only a flexible plasma membrane." },
    ],
  },
  {
    id: "bio-div-01-mitosis-meiosis",
    subject: "biology",
    unit: { en: "Cell biology", am: "የሕዋስ ባዮሎጂ", om: "Baayooloojii seelii" },
    moeCode: "BIO-G11-C2.1",
    eueeTopics: ["Mitosis", "Meiosis", "Cell division"],
    eueeWeight: 7,
    estimatedMinutes: 24,
    title: { en: "Mitosis vs meiosis", am: "ሚቶሲስና ሜዮሲስ", om: "Mitoosis fi Meeyoosis" },
    summary: { en: "Two ways cells divide: mitosis for growth and repair (identical daughters), meiosis for sex cells (genetically varied, half the chromosomes).", am: "ሕዋሶች የሚከፈሉባቸው ሁለት መንገዶች።", om: "Karaa lama seelonni ittiin qoqqoodaman." },
    sections: [
      { heading: { en: "Mitosis: one becomes two identical cells", am: "ሚቶሲስ", om: "Mitoosis" }, body: "Mitosis produces two genetically identical *diploid* daughter cells (2n → 2n). Phases: prophase, metaphase, anaphase, telophase, then cytokinesis. Used for growth, tissue repair, and asexual reproduction." },
      { heading: { en: "Meiosis: one becomes four genetically varied cells", am: "ሜዮሲስ", om: "Meeyoosis" }, body: "Meiosis produces four genetically distinct *haploid* gametes (2n → n). Two divisions in a row: meiosis I separates homologous chromosomes; meiosis II separates sister chromatids (like mitosis)." },
      { heading: { en: "Why genetic variation?", am: "ለምን የዘረመል ልዩነት?", om: "Maaliif garaagarummaa jinii?" }, body: "Two mechanisms in meiosis create variation: (1) *crossing over* in prophase I — homologous chromosomes swap segments; (2) *independent assortment* — each pair of homologs lines up randomly in metaphase I." },
    ],
    workedExample: { problem: "A human cell has 46 chromosomes. After meiosis, how many chromosomes does each gamete have?", solution: "Meiosis halves the chromosome number: 46 / 2 = 23. Each sperm or egg carries 23 chromosomes; fertilization restores 46." },
    quiz: [
      { q: "Which process produces genetically identical daughter cells?", choices: ["Mitosis", "Meiosis", "Fertilization", "Crossing over"], answerIndex: 0, explanation: "Mitosis copies the parent cell exactly. Meiosis and crossing over generate variation." },
      { q: "How many cells does one round of meiosis produce from one starting cell?", choices: ["1", "2", "4", "8"], answerIndex: 2, explanation: "Meiosis is two divisions in a row, producing 4 haploid daughter cells from one diploid parent." },
    ],
  },
];

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function lessonsBySubject(subject: Subject): Lesson[] {
  return LESSONS.filter((l) => l.subject === subject);
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
