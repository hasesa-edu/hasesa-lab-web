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
    video: { youtubeId: "w2mbvtpQKrM", credit: "Khan Academy" },
    whyItMatters: {
      en: "A minibus driver on Bole Road has to brake before a pedestrian crossing — but how far ahead? At 50 km/h, the bus needs about 35 metres to stop safely. Engineers at the Ethiopian Roads Authority calculate that with exactly the formulas in this lesson: v = Δx/Δt, then a = Δv/Δt for the brakes. The same math sets bus schedules, marks safe overtaking zones, and decides how tall speed bumps need to be. Every time you see \"50 km/h\" on a road sign or wonder why a Bajaj suddenly slows, you're watching kinematics in action.",
    },
    sections: [
      { heading: { en: "Position vs. displacement", am: "ቦታ እና የቦታ ለውጥ", om: "Iddoo fi jijjiirama iddoo" }, body: "Position is *where* an object is on a chosen axis — a coordinate `x`. Displacement is the *change* in position, `Δx = x_final − x_initial`. Distance is the total path length, which can be larger than the magnitude of displacement if the object turns around." },
      { heading: { en: "Velocity vs. speed", am: "ፍጥነት እና ፍጥነት መጠን", om: "Saffisa fi balaqqee saffisaa" }, body: "Average velocity `v_avg = Δx / Δt` is a vector — it has direction. Average speed is the total distance divided by time and is always non-negative. Instantaneous velocity is the limit of `Δx / Δt` as `Δt → 0`." },
      { heading: { en: "Acceleration", am: "ማፋጠን", om: "Dabalata saffisaa" }, body: "Acceleration is the rate of change of velocity: `a = Δv / Δt`. A negative acceleration in the direction of motion means the object is slowing down; in the opposite direction it can mean speeding up backwards." },
    ],
    workedExample: { problem: "A bus starts from rest and reaches 20 m/s in 8 s along a straight road. What is its average acceleration?", solution: "Use `a = Δv / Δt = (20 − 0) / 8 = 2.5 m/s²`. The bus speeds up by 2.5 m/s every second." },
    atHomeExperiment: {
      title: {
        en: "Measure your own walking speed",
        am: "የራስዎን የእግር ጉዞ ፍጥነት ይለኩ",
        om: "Saffisa deemsa kee mataa keetii safari",
      },
      video: { youtubeId: "EGqpLug-sDk", credit: "FuseSchool" },
      materials: [
        { en: "A flat 10-metre path (yard, hallway, or schoolyard)", am: "ጠፍጣፋ 10 ሜትር መንገድ (ግቢ ወይም አዳራሽ)", om: "Karaa diriiraa meetira 10 (oobdii ykn galma)" },
        { en: "A phone with a timer or a wristwatch", am: "የሰዓት ቆጣሪ ያለው ስልክ ወይም ሰዓት", om: "Bilbila yeroo lakkaa'u qabu ykn saatii" },
        { en: "Chalk or tape to mark start and end", am: "መነሻና መድረሻ ለማመልከት ጠመኔ ወይም ቴፕ", om: "Eegalaa fi dhumaa mallatteessuuf chalkii ykn teeppii" },
      ],
      steps: [
        { en: "Measure exactly 10 m along the path and mark the start and end.", am: "በመንገዱ ላይ ልክ 10 ሜትር ይለኩ፣ መነሻና መድረሻ ምልክት ያድርጉ።", om: "Karaa irratti meetira 10 sirritti safari, eegalaa fi dhumaa mallatteessi." },
        { en: "Walk at your normal pace from start to end. Have a friend time you (or start the timer yourself).", am: "ከመነሻ እስከ መድረሻ በተለመደው ፍጥነትዎ ይራመዱ። ጓደኛዎ ይቁጥርዎ።", om: "Saffisa baratamaa keetiin eegalaa irraa dhumaatti deemi. Hiriyaan kee yeroo si lakkaa'u." },
        { en: "Record the time. Repeat once walking slowly and once walking fast.", am: "ጊዜውን ይመዝግቡ። አንዴ በዝግታ፣ አንዴ በፍጥነት ይድገሙ።", om: "Yeroo galmeessi. Yeroo tokko suuta, yeroo tokko ammoo dafee deemi." },
        { en: "Calculate each speed: speed = 10 ÷ time (in m/s).", am: "ለእያንዳንዱ ፍጥነት = 10 ÷ ጊዜ (በሜ/ሰ) ይስሉ።", om: "Saffisa hundaa shallagi: saffisa = 10 ÷ yeroo (meetira/sekoondii)." },
      ],
      observe: {
        en: "Your three speeds should differ by a clear factor — maybe 0.8, 1.3, and 2.0 m/s. Because you walked in one direction, displacement equals distance, so your speed equals your average velocity. Now you've measured a real-world v = Δx / Δt with your own feet.",
        am: "ሦስቱ ፍጥነቶችዎ በግልጽ ሊለያዩ ይገባል — ምናልባት 0.8፣ 1.3 እና 2.0 ሜ/ሰ። በአንድ አቅጣጫ ስለተራመዱ የቦታ ለውጥ ከርቀት ጋር እኩል ነው፤ ስለዚህ ፍጥነትዎ ከአማካይ ፍጥነትዎ ጋር እኩል ነው። የራስዎን v = Δx / Δt ለክተዋል።",
        om: "Saffisni kee sadan sirriitti adda ta'uu qabu — fakkeenyaaf 0.8, 1.3 fi 2.0 m/s. Kallattii tokkoon waan deemteef jijjiiramni iddoo fageenya wajjin walqixa, kanaaf saffisni kee giddu-galeessa saffisa keetii ti. Miilla keetiin v = Δx / Δt safarteetta.",
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
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M2.1",
    eueeTopics: ["Newton's laws", "Forces"],
    eueeWeight: 10,
    estimatedMinutes: 22,
    title: { en: "Newton's three laws of motion", am: "የኒውተን ሦስት የእንቅስቃሴ ሕጎች", om: "Seerota sochii sadan Niwutan" },
    summary: { en: "The rules that govern how forces change motion. Foundational for every Mechanics question — and for understanding how anything in the world moves.", am: "ኃይሎች እንቅስቃሴን እንዴት እንደሚቀይሩ የሚገዙ ሕጎች።", om: "Seerota humnoonni akkaataa sochiin akka jijjiiraman bulchan." },
    video: { youtubeId: "kKKM8Y-u7ds", credit: "CrashCourse" },
    whyItMatters: {
      en: "When a Bajaj brakes hard and your body lurches forward, that's Newton's first law — inertia, your body wanting to keep moving. When an Ethiopian Airlines 787 taxis down Bole's runway, the pilots use F = ma to calculate the engine thrust needed to lift 250 tonnes of plane and passengers into the sky. When you kick a football at the Mekele Stadium, your foot pushes the ball and the ball pushes back on your foot equally — the third law, which is why your toes can hurt. The same three rules describe everything from a falling raindrop to a satellite in orbit above Ethiopia tonight.",
    },
    sections: [
      { heading: { en: "First law (inertia)", am: "የመጀመሪያ ሕግ", om: "Seera jalqabaa" }, body: "An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted on by a net external force. The tendency to resist changes is called *inertia*, and it scales with mass." },
      { heading: { en: "Second law (F = ma)", am: "ሁለተኛ ሕግ", om: "Seera lammaffaa" }, body: "The net force on an object equals its mass times its acceleration: `F_net = m · a`. Force is a vector — direction matters. Units: 1 newton (N) = 1 kg · m/s²." },
      { heading: { en: "Third law (action–reaction)", am: "ሦስተኛ ሕግ", om: "Seera sadaffaa" }, body: "For every action there is an equal and opposite reaction. If A pushes B with force `F`, then B pushes A with force `−F`. The two forces act on *different* objects, so they don't cancel out on a free-body diagram of one of them." },
    ],
    workedExample: { problem: "A 4 kg box is pushed with a net horizontal force of 12 N on a frictionless surface. What is its acceleration?", solution: "From `F = m·a`, we get `a = F / m = 12 / 4 = 3 m/s²` in the direction of the applied force." },
    atHomeExperiment: {
      title: {
        en: "The coin and card — see inertia for yourself",
        am: "ሳንቲምና ካርድ — የራሳችሁን ኢነርሺያ ይመልከቱ",
        om: "Saantimaa fi kaardii — iinarshiyaa ofii keetiin ilaali",
      },
      video: { youtubeId: "pS60Dv3uzf4", credit: "Make Science Fun" },
      materials: [
        { en: "A small coin (1 Birr or any coin)", am: "ትንሽ ሳንቲም (1 ብር ወይም ሌላ)", om: "Saantima xiqqaa (1 Birr ykn kan biraa)" },
        { en: "A stiff card (playing card, ID card, or thick paper)", am: "ጠንካራ ካርድ (የመጫወቻ ካርድ ወይም ወፍራም ወረቀት)", om: "Kaardii jabaa (kaardii taphaa ykn waraqaa furdaa)" },
        { en: "A small empty cup or glass", am: "ትንሽ ባዶ ኩባያ ወይም ብርጭቆ", om: "Kuppii ykn galaasii xiqqaa duwwaa" },
      ],
      steps: [
        { en: "Place the card flat on top of the cup, covering the opening.", am: "ካርዱን በኩባያው አፍ ላይ ጠፍጣፋ አድርገው ያስቀምጡ።", om: "Kaardii kuppii afaan irra dirii godhii kaa'i." },
        { en: "Balance the coin in the middle of the card, right over the cup's opening.", am: "ሳንቲሙን በካርዱ መሃል፣ ከኩባያው አፍ በላይ ያስቀምጡ።", om: "Saantima walakkaa kaardii, gubbaa afaan kuppii kaa'i." },
        { en: "Flick the card sharply sideways with your finger so it shoots away.", am: "ካርዱን በጣት በፍጥነት ጎን አድርገው ይምቱ።", om: "Kaardii quba keetiin dafqaan cinaatti dhiibi." },
        { en: "Watch what happens to the coin.", am: "ሳንቲሙ ምን እንደሚሆን ይመልከቱ።", om: "Saantimni maal akka ta'u ilaali." },
      ],
      observe: {
        en: "The coin drops straight into the cup. The card moves so quickly that there's barely any sideways force on the coin — inertia (Newton's first law) keeps it almost still while the card flies away. Once the card is gone, gravity pulls the coin straight down into the cup.",
        am: "ሳንቲሙ ቀጥ ብሎ ወደ ኩባያው ይወድቃል። ካርዱ በፍጥነት ስለሚንቀሳቀስ በሳንቲሙ ላይ ምንም ጎንዮሽ ኃይል አይተገብርም — ኢነርሺያ (የኒውተን የመጀመሪያ ህግ) ሳንቲሙን ቦታው እንዲቆይ ያደርጋል። ካርዱ ሲሄድ ስበት ሳንቲሙን ቀጥ ብሎ ወደ ኩባያው ይጎትታል።",
        om: "Saantimni kallattiin gara kuppiitti kufa. Kaardiin saffisaan waan socho'uuf saantima irratti humni cinaa hin uumamu — iinarshiyaan (Seera jalqabaa Niwutan) saantima iddoo isaa kaa'a. Kaardiin yoo darbe, humni harkisaa lafaa saantima kallattiin gara kuppiitti harkisa.",
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
    unit: { en: "Mechanics", am: "ሜካኒክስ", om: "Mekaanikisii" },
    moeCode: "PHY-G11-M1.3",
    eueeTopics: ["Free fall", "Gravity"],
    eueeWeight: 6,
    estimatedMinutes: 15,
    title: { en: "Free fall and gravity near Earth", am: "ነፃ ውድቀትና በምድር አጠገብ ስበት", om: "Kufaatii bilisaa fi humna harkisa Lafaa bira" },
    summary: { en: "Objects in free fall near Earth's surface accelerate downward at about 9.8 m/s² regardless of mass.", am: "በምድር ገጽ አጠገብ በነፃ ውድቀት ላይ ያሉ ነገሮች በ9.8 m/s² ወደ ታች ይፋጠናሉ።", om: "Wantoonni kufaatii bilisaa Lafaa bira jiran gara gadiitti 9.8 m/s² dabalata saffisaa qabu." },
    video: { youtubeId: "oYEgdZ3iEKA", credit: "NASA / Apollo 15 archive" },
    whyItMatters: {
      en: "Galileo proved 400 years ago that a feather and a hammer fall at the same rate when air is removed. Apollo 15 astronauts famously dropped both together on the moon — they hit the dust at the same instant. Why does this matter on Earth? When engineers design the spillway of the Grand Renaissance Dam, they calculate falling water and debris using g = 9.8 m/s². When helicopter pilots near the rock-hewn churches of Lalibela plan emergency descents, they use free-fall math. Even your mobile phone's drop-test rating depends on how fast it accelerates from your hand to the floor — exactly the equations in this lesson.",
    },
    sections: [
      { heading: { en: "g, the acceleration of gravity", am: "g, የስበት ማፋጠን", om: "g, dabalata saffisaa harkisa lafaa" }, body: "Near Earth's surface, `g ≈ 9.8 m/s²` (often rounded to 10 in classwork). It points toward Earth's center. In a vacuum, a feather and a hammer fall side by side because `g` doesn't depend on mass." },
      { heading: { en: "Kinematic equations for free fall", am: "ለነፃ ውድቀት ኪነማቲክ ቀመሮች", om: "Wal-qixxata Kinematiks kufaatii bilisaaf" }, body: "Taking downward as positive: `v = v₀ + g·t`, `y = v₀·t + ½·g·t²`, `v² = v₀² + 2·g·y`." },
      { heading: { en: "Air resistance — when it matters", am: "የአየር መከላከያ", om: "Diddaa qilleensaa" }, body: "Many problems say 'ignore air resistance'. In real life it matters a lot for light or wide objects — a parachute reaches *terminal velocity* when drag equals gravity." },
    ],
    workedExample: { problem: "A stone is dropped from a 45 m cliff. Taking g = 10 m/s², how long until it hits the ground?", solution: "Using `y = ½·g·t²` with y = 45: t² = 2·45 / 10 = 9, so t = 3 s." },
    atHomeExperiment: {
      title: {
        en: "Galileo's race: stone vs paper",
        am: "የጋሊልዮ ውድድር፦ ድንጋይ ከወረቀት ጋር",
        om: "Dorgommii Galileo: dhagaa fi waraqaa",
      },
      video: { youtubeId: "E43-CfukEgs", credit: "BBC / Brian Cox" },
      materials: [
        { en: "A small stone or coin", am: "ትንሽ ድንጋይ ወይም ሳንቲም", om: "Dhagaa ykn saantima xiqqaa" },
        { en: "Two sheets of paper of equal size", am: "እኩል መጠን ያላቸው ሁለት ወረቀቶች", om: "Waraqaa lama kan hammi isaanii wal-qixa" },
      ],
      steps: [
        { en: "Hold the stone in one hand and a flat sheet of paper in the other, at the same height (above your head).", am: "ድንጋዩን በአንድ እጅ፣ ጠፍጣፋ ወረቀቱን በሌላ እጅ፣ በእኩል ቁመት ይያዙ።", om: "Dhagaa harka tokkoon, waraqaa diriiraa harka biraan, hojjaa wal-qixaan qabadhu." },
        { en: "Drop them both at the same time. Which lands first?", am: "ሁለቱንም በተመሳሳይ ጊዜ ይጣሉ። የቱ ቀድሞ ይወድቃል?", om: "Yeruma tokkotti gad-dhiisi. Kamtu duraan kufa?" },
        { en: "Now crumple the second piece of paper into a tight ball.", am: "ሁለተኛውን ወረቀት ወደ ጠንካራ ኳስ ጨፍልቁ።", om: "Waraqaa lammaffaa kubbaa jabaa godhii cuqqaalsi." },
        { en: "Drop the stone and the crumpled paper together. What changed?", am: "ድንጋዩንና የተጨፋለቀውን ወረቀት አብረው ይጣሉ።", om: "Dhagaa fi waraqaa cuqqaalame walumaan gad-dhiisi." },
      ],
      observe: {
        en: "Flat paper drifts slowly — air resistance pushes against its wide surface. Crumpled paper and stone hit the ground at almost the same time, because gravity gives them the same acceleration g, and air resistance is now small. This is Galileo's famous insight: without air, all things fall together regardless of mass.",
        am: "ጠፍጣፋ ወረቀት ቀስ ብሎ ይወድቃል — የአየር መከላከያ በሰፊው ላይ ይገፋዋል። የተጨፋለቀ ወረቀትና ድንጋይ ግን ከሞላ ጎደል በተመሳሳይ ጊዜ ይወድቃሉ ምክንያቱም ስበት ለሁለቱም ተመሳሳይ የg ማፋጠን ይሰጣል። ይህ የጋሊልዮ ታዋቂ ግኝት ነው።",
        om: "Waraqaan diriiraan suuta kufa — diddaan qilleensaa bal'ina isaa irratti dhiiba. Garuu waraqaan cuqqaalame fi dhaganii yeruma tokkitti kufu, sababiin isaa humni harkisaa lafaa dabalata saffisaa wal-qixa g isaaniif kennaaf, diddaan qilleensaa ammoo xiqqoo ta'eef. Kun ifa Galileo'ti.",
      },
    },
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
    video: { youtubeId: "TLUZnCvuGBk", credit: "Khan Academy" },
    whyItMatters: {
      en: "The Grand Ethiopian Renaissance Dam is a giant energy-conversion machine. Water held in the reservoir has potential energy (PE = mgh) — the higher the lake, the more energy stored. When the water falls through turbines, PE becomes kinetic energy, which a generator converts into electricity that lights homes in Bahir Dar and Addis Ababa. Energy isn't created — it's converted. The same principle is why pedaling a Bajaj uphill feels exhausting (chemical → PE) and coasting down feels effortless (PE → KE). Every Ethiopian hydropower station — Gilgel Gibe, Tekeze, GERD — is gravity doing physics on water.",
    },
    sections: [
      { heading: { en: "Work done by a force", am: "በኃይል የተሰራ ሥራ", om: "Hojii humna tokkoon hojjetame" }, body: "Work `W = F · d · cos(θ)`, where θ is the angle between force and displacement. Push at 90° to motion and you do *zero* work. Units: 1 joule (J) = 1 N · m." },
      { heading: { en: "Kinetic and potential energy", am: "ኪነቲክና ሰብአዊ ሃይል", om: "Anniisaa kineetikii fi potensh." }, body: "`KE = ½·m·v²` is the energy of motion. Gravitational `PE = m·g·h` is the stored energy of height (relative to a chosen reference)." },
      { heading: { en: "Conservation of mechanical energy", am: "የሜካኒካል ሃይል ጥበቃ", om: "Eegumsa anniisaa mekaanikaa" }, body: "When only gravity acts (no friction, no air drag), `KE + PE` stays constant. A ball thrown straight up trades KE for PE on the way up and gets it back on the way down." },
    ],
    workedExample: { problem: "A 2 kg ball is dropped from 5 m. Ignoring air resistance, what is its speed just before hitting the ground? Use g = 10 m/s².", solution: "PE at top = m·g·h = 2·10·5 = 100 J. All of it becomes KE at the bottom: ½·m·v² = 100, so v² = 100, v = 10 m/s." },
    atHomeExperiment: {
      title: {
        en: "Pendulum: watch energy trade places",
        am: "ፔንዱለም፦ ሃይል ቦታ ሲቀያየር ይመልከቱ",
        om: "Pendulum: anniisaan iddoo akka jijjiiratu ilaali",
      },
      video: { youtubeId: "dPyzEeBVQO0", credit: "Mr. D'Antuono" },
      materials: [
        { en: "A string about 50 cm long", am: "50 ሴሜ የሆነ ገመድ", om: "Funyoo gar 50 cm" },
        { en: "A small heavy object (key, washer, or small stone)", am: "ትንሽ ከባድ ነገር (ቁልፍ ወይም ድንጋይ)", om: "Wanta xiqqaa ulfaataa (furtuu ykn dhagaa)" },
        { en: "A doorframe, chair, or table edge to hang from", am: "የበር ፍሬም ወይም ጠረጴዛ ጠርዝ", om: "Foonqolcha balbalaa ykn qarqara minjaalaa" },
      ],
      steps: [
        { en: "Tie the object firmly to one end of the string and hang the other end from a fixed support.", am: "ነገሩን በገመዱ ጫፍ አጥብቀው ያስሩትና ሌላውን ጫፍ በቋሚ ድጋፍ ላይ ይንጠለጥሉ።", om: "Wanta sana funyoo dhuma tokkoo irratti jabeessii hidhi; dhuma biraa ammoo deeggarsa qabataa irratti rarraasi." },
        { en: "Pull the weight sideways to a chosen height. Don't push it — just release.", am: "ክብደቱን ጎን አድርገው ይያዙት፣ ሳይገፉ ይልቀቁት።", om: "Ulfaatina sana cinaatti ol qabii, hin dhiibin, calʼisii gad-dhiisi." },
        { en: "Watch how high it swings up on the other side.", am: "በሌላ ጎን ምን ያህል ከፍ ብሎ እንደሚወዛወዝ ይመልከቱ።", om: "Cinaa biraan hamma kam ol akka raafamu ilaali." },
        { en: "Try with a higher starting height. What changes about its speed at the bottom?", am: "በከፍተኛ ቦታ ይጀምሩ። የታችኛው ፍጥነቱ ምን ይለወጣል?", om: "Hojjaa olaanaa irraa eegali. Saffisni isaa dhuma irratti maal jijjiirama?" },
      ],
      observe: {
        en: "The weight rises almost to its original height on the other side, then comes back. At the highest points it stops for an instant (all PE, no KE). At the lowest point it moves fastest (all KE, no PE). A little energy is lost each swing to air resistance — that's why it slowly damps. With a higher starting height, more PE turns into more KE — it moves faster at the bottom. Energy is just changing form, not disappearing.",
        am: "ክብደቱ ከሞላ ጎደል ወደ መጀመሪያው ቁመት ይነሳና ይመለሳል። በከፍተኛ ቦታ ሲሆን ለቅጽበት ይቆማል (ሁሉም PE ነው፣ ምንም KE የለም)። በዝቅተኛ ቦታ ላይ በከፍተኛ ፍጥነት ይንቀሳቀሳል። ሃይል ቅርጹን ብቻ ይቀይራል እንጂ አይጠፋም።",
        om: "Ulfaatichi gara cinaa biraatti hojjaa jalqabaa isaa garmalee dhihaatu ol ka'a, ergasii deebi'a. Iddoo ol-aanaatti yeroo gabaabaa ni dhaabbata (anniisaan hundi PE dha). Iddoo gad-aanaatti saffisa ol-aanaadhaan socho'a (hundi KE dha). Anniisaan bifa qofa jijjiirata, hin badu.",
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
    unit: { en: "Algebra", am: "አልጀብራ", om: "Aljabraa" },
    moeCode: "MTH-G11-A2.1",
    eueeTopics: ["Quadratic equations", "Discriminant"],
    eueeWeight: 9,
    estimatedMinutes: 22,
    title: { en: "Quadratic equations and the discriminant", am: "ኳድራቲክ እኩልታዎችና ዲስክሪሚናንት", om: "Wal-qixxata kuwaadiraatikii fi diskirminaantii" },
    summary: { en: "Solve ax² + bx + c = 0 using factoring, completing the square, and the quadratic formula. Use the discriminant to predict the number of real roots.", am: "ax² + bx + c = 0 ን በፋክተር መውጣት፣ ካሬ ማጠናቀቅና ኳድራቲክ ቀመር መፍታት።", om: "ax² + bx + c = 0 faaktariin, kuwaadiraatii guutuu gochuun, fi foormulaa kuwaadiraatikiin furuu." },
    video: { youtubeId: "JBSDQLZtjFo", credit: "Khan Academy" },
    whyItMatters: {
      en: "When an Ethiopian Coffee FC striker shoots toward the goal, the ball traces a parabola — a quadratic in flight. When farmers along the Awash design irrigation channels, the cross-section is shaped as a parabola for maximum flow. A satellite dish on a Mekele rooftop is a 3D parabola because parabolas focus signals perfectly onto a single point. Even the discriminant b² − 4ac matters in real life: it tells bridge designers whether a suspension cable will sag too much, and tells solar-cooker makers whether the sun's heat will actually focus. Quadratics aren't abstract — they describe almost everything that curves.",
    },
    sections: [
      { heading: { en: "The general form", am: "አጠቃላይ ቅርጽ", om: "Bifa waliigalaa" }, body: "Any quadratic is `a·x² + b·x + c = 0` with `a ≠ 0`. Solutions are called *roots* and represent where the parabola `y = a·x² + b·x + c` crosses the x-axis." },
      { heading: { en: "The quadratic formula", am: "የኳድራቲክ ቀመር", om: "Foormulaa kuwaadiraatikii" }, body: "`x = (-b ± √(b² − 4ac)) / (2a)`. Memorize this — it works for every quadratic. The two signs give the two roots." },
      { heading: { en: "The discriminant Δ = b² − 4ac", am: "ዲስክሪሚናንት Δ", om: "Diskirminaantii Δ" }, body: "The discriminant tells you the *type* of roots before you solve:\n- If `Δ > 0`: two distinct real roots.\n- If `Δ = 0`: one repeated real root (the parabola is tangent to the x-axis).\n- If `Δ < 0`: no real roots (two complex roots)." },
    ],
    workedExample: { problem: "Solve 2x² − 5x + 2 = 0.", solution: "a=2, b=−5, c=2. Δ = 25 − 16 = 9. `x = (5 ± 3) / 4`, giving x = 2 or x = 1/2." },
    atHomeExperiment: {
      title: {
        en: "Trace a parabola you throw with your own hand",
        am: "በእጅዎ የወረወሩትን ፓራቦላ ይከታተሉ",
        om: "Paraboolaa harka keetiin darbatte hordofi",
      },
      video: { youtubeId: "HB4ws7RoA3M", credit: "NSF / Science of NFL" },
      materials: [
        { en: "A small ball or pebble", am: "ትንሽ ኳስ ወይም ጠጠር", om: "Kubbaa ykn dhagaa xiqqaa" },
        { en: "An outdoor wall or clear space", am: "የውጭ ግድግዳ ወይም ክፍት ቦታ", om: "Dallaa alaa ykn bakka bal'aa" },
        { en: "A phone camera (optional, for slow-motion)", am: "የስልክ ካሜራ (አማራጭ)", om: "Kaameraa bilbilaa (filannoo)" },
        { en: "Paper and a pen to sketch", am: "ወረቀትና እስክሪብቶ", om: "Waraqaa fi ibsaa" },
      ],
      steps: [
        { en: "Stand facing a wall a few metres away.", am: "ከግድግዳው ጥቂት ሜትር ራቅ ብለው ይቁሙ።", om: "Dallaa irraa meetira muraasaan fagaate dhaabbadhu." },
        { en: "Throw the ball gently in an arc against the wall.", am: "ኳሱን በቅስት መልክ ወደ ግድግዳው ይወርውሩ።", om: "Kubbaa suuta saansaan godhii gara dallaatti darbi." },
        { en: "Either film it on slow-motion, or watch carefully and remember the shape.", am: "በዝግታ ቪዲዮ ይቅረጹ ወይም ቅርጹን በጥንቃቄ ይመልከቱ።", om: "Vidiyoo suuta jiruun waraabi ykn bocaa hubadhu." },
        { en: "On paper, sketch the path: horizontal distance on the x-axis, height on the y-axis.", am: "በወረቀት ላይ መንገዱን ይሳሉ።", om: "Waraqaa irratti karaa kubbaan deemu kaasi." },
      ],
      observe: {
        en: "The path is a perfect parabola — the curve y = a·x² + b·x + c. That's the same shape as a quadratic in algebra class. The two places where the curve crosses the ground (start of throw and where it lands) are the two roots — exactly the solutions you'd compute with the quadratic formula. Quadratics aren't just abstract algebra; they describe how anything thrown moves through the air.",
        am: "መንገዱ ፍጹም ፓራቦላ ነው — y = a·x² + b·x + c ኩርባ። ይህ ከአልጀብራ ክፍል የሚታወቅ ኳድራቲክ ቅርጽ ነው። ኩርባው መሬቱን የሚነካባቸው ሁለት ቦታዎች ሥሮቹ ናቸው።",
        om: "Karaan kubbaa deemu paraboolaa sirrii dha — saansaa y = a·x² + b·x + c. Bocni isaa kun kuwaadiraatikii kutaa aljabraa keessatti baranne wajjin wal-fakkaata. Iddoo lamaan saansaan lafa tuqu fakkii lameen ti.",
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
    unit: { en: "Trigonometry", am: "ትሪጎኖሜትሪ", om: "Trigonomeetirii" },
    moeCode: "MTH-G11-T1.1",
    eueeTopics: ["Trig ratios", "Unit circle"],
    eueeWeight: 8,
    estimatedMinutes: 20,
    title: { en: "Trigonometric ratios and the unit circle", am: "ትሪጎኖሜትሪክ ሬሾዎችና ዩኒት ክብ", om: "Reeshoolee trigonomeetirikii fi geengoo yuuniitii" },
    summary: { en: "sin, cos, tan from a right triangle, extended to all angles via the unit circle. Foundation for every wave, oscillation, and rotation problem.", am: "sin, cos, tan ከትክክለኛ ሦስት ጎን ሦስት ማዕዘን፣ ወደ ሁሉም ማዕዘናት በዩኒት ክብ የተራዘመ።", om: "sin, cos, tan rog-sadee mirgaa irraa, geengoo yuuniitiitiin gara cufaatti dheereffame." },
    video: { youtubeId: "1m9p9iubMLU", credit: "Khan Academy" },
    whyItMatters: {
      en: "How tall are the Aksum stelae — the giant carved stones that have stood for 1,700 years? Ancient Aksumite engineers used the same shadow-and-stick trick you'll do in this lesson's experiment. Today, every Ethio Telecom tower is sited using trigonometry to calculate line-of-sight over Ethiopia's hilly terrain. When Ethiopian Airlines pilots land at Bole, the runway glideslope is a 3° angle calculated with tangent. Surveyors planning roads through the Simien Mountains, builders measuring roof pitches in Addis, even farmers laying out coffee-drying yards in Sidamo to catch the most sun — all use sin, cos, and tan. Trig is the math of measuring things you can't reach.",
    },
    sections: [
      { heading: { en: "SOH-CAH-TOA", am: "SOH-CAH-TOA", om: "SOH-CAH-TOA" }, body: "In a right triangle with angle θ:\n- `sin(θ) = opposite / hypotenuse`\n- `cos(θ) = adjacent / hypotenuse`\n- `tan(θ) = opposite / adjacent = sin(θ) / cos(θ)`" },
      { heading: { en: "The unit circle", am: "ዩኒት ክብ", om: "Geengoo yuuniitii" }, body: "A point on a circle of radius 1 at angle θ from the positive x-axis is `(cos(θ), sin(θ))`. This extends sin and cos to *any* angle, including negative and > 90°. tan(θ) = sin(θ)/cos(θ) is undefined when cos(θ) = 0 (i.e. 90°, 270°)." },
      { heading: { en: "Key angles to memorize", am: "ቁልፍ ማዕዘናት", om: "Daa'imota dhaa-cufaa" }, body: "Know these by heart: sin(30°)=1/2, sin(45°)=√2/2, sin(60°)=√3/2; cos is the same in reverse (cos(30°)=√3/2, cos(60°)=1/2)." },
    ],
    workedExample: { problem: "A ladder leans against a wall. The ladder is 5 m long and makes a 60° angle with the ground. How high up the wall does it reach?", solution: "Height = ladder · sin(60°) = 5 · (√3/2) ≈ 5 · 0.866 ≈ 4.33 m." },
    atHomeExperiment: {
      title: {
        en: "Measure a tree's height using only its shadow",
        am: "የዛፍን ቁመት በጥላው ብቻ ይለኩ",
        om: "Hojjaa muka gaaddidduu isaa qofaan safari",
      },
      video: { youtubeId: "8-Vv-fAsuaY", credit: "Tim Pelton" },
      materials: [
        { en: "A straight stick exactly 1 metre long (or any known length)", am: "በትክክል 1 ሜትር የሆነ ቀጥ ያለ በትር", om: "Ulee qajeelaa meetira tokko (ykn dheerina beekamuu)" },
        { en: "A sunny day with clear shadows", am: "ጥላ የሚያሳይ ፀሐያማ ቀን", om: "Guyyaa aduu kan gaaddidduu calaqqisu" },
        { en: "A tape measure or long string with marks", am: "የመለኪያ ቴፕ ወይም ምልክት ያለው ገመድ", om: "Teeppii safaraa ykn funyoo mallattoo qabu" },
        { en: "A tall tree or building to measure", am: "ረዣዥም ዛፍ ወይም ሕንፃ", om: "Mukni ykn manni dheeraan" },
      ],
      steps: [
        { en: "Plant the stick straight up in the ground in full sunlight.", am: "በትሩን በፀሐይ ቀጥ አድርገው ይትከሉ።", om: "Ulee kee aduu ifa qabuun lafa irratti qajeelaa godhii dhaabi." },
        { en: "Measure the length of its shadow.", am: "የጥላውን ርዝመት ይለኩ።", om: "Dheerina gaaddidduu isaa safari." },
        { en: "Right away (the sun moves!), measure the shadow of the tree or building.", am: "በፍጥነት የዛፉን ጥላ ይለኩ።", om: "Yeruma sana gaaddidduu mukaa safari (aduun ni socho'a!)." },
        { en: "Compute tree height = (stick height × tree shadow) ÷ stick shadow.", am: "የዛፍ ቁመት = (በትር ቁመት × የዛፍ ጥላ) ÷ የበትር ጥላ።", om: "Hojjaa mukaa = (hojjaa ulee × gaaddidduu mukaa) ÷ gaaddidduu ulee." },
      ],
      observe: {
        en: "You just found the height of something tall without climbing it — using only ratios! The stick and the tree make similar right triangles with the sun. The angle of the sun is the same for both, so tan(angle) = height ÷ shadow is the same ratio for both. This is exactly how surveyors measured pyramids in ancient times.",
        am: "ሳይወጡ የረዥም ነገርን ቁመት አገኙ — በሬሾዎች ብቻ! በትሩና ዛፉ ከፀሐይ ጋር ተመሳሳይ ትክክለኛ ሦስት ጎን ሦስት ማዕዘናት ይፈጥራሉ።",
        om: "Ol bahuun malee hojjaa wanta dheeraa argachuu dandeesseetta — reeshoo qofaan! Uleen fi mukni aduu wajjin rog-sadee mirgaa wal-fakkaataa uumu. Akkuma kanaa namoonni durii pirammiidii safaran.",
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
    unit: { en: "Sequences & Series", am: "ቅደም ተከተሎች", om: "Tartiiba" },
    moeCode: "MTH-G11-S1.1",
    eueeTopics: ["Arithmetic sequences", "Geometric sequences"],
    eueeWeight: 5,
    estimatedMinutes: 18,
    title: { en: "Arithmetic and geometric sequences", am: "የቁጥርና የጂኦሜትሪክ ቅደም ተከተሎች", om: "Tartiiba lakkoofsaa fi jiyoomeetirikii" },
    summary: { en: "Patterns where each term differs from the last by a constant amount (arithmetic) or constant ratio (geometric).", am: "እያንዳንዱ ቃል ከመጨረሻው በቋሚ መጠን ወይም ሬሾ የሚለይ ቅርጾች።", om: "Calaqqee tokkoon tokkoon jechi yeroo darbe irraa hammaan ykn reeshoo wal-fakkaataadhaan adda ba'u." },
    video: { youtubeId: "pXo0bG4iAyg", credit: "Khan Academy" },
    whyItMatters: {
      en: "When a single COVID-19 case in Addis became 100, then 10,000 in weeks — that was geometric growth (each person infecting roughly two others). When Ethio Telecom rolls out 4G to one new town a month, that's arithmetic growth: steady, linear. Your CBE savings account pays compound interest — geometric. The population of Addis Ababa doubles every ~25 years — geometric. Even the old story of one grain of teff on the first square of an injera, two on the next, four on the next: by square 30 you'd need more teff than all of Ethiopia grows in a year. Knowing the difference helps you spot exponential dangers (debt, disease) and exponential opportunities (savings, learning) early.",
    },
    sections: [
      { heading: { en: "Arithmetic sequences", am: "የቁጥር ቅደም ተከተል", om: "Tartiiba lakkoofsaa" }, body: "Each term adds a fixed *common difference* d. nth term: `a_n = a_1 + (n−1)·d`. Sum of first n terms: `S_n = n/2 · (a_1 + a_n) = n/2 · (2a_1 + (n−1)d)`." },
      { heading: { en: "Geometric sequences", am: "የጂኦሜትሪክ ቅደም ተከተል", om: "Tartiiba jiyoomeetirikii" }, body: "Each term multiplies by a fixed *common ratio* r. nth term: `a_n = a_1 · r^(n−1)`. Sum of first n terms (r ≠ 1): `S_n = a_1 · (1 − r^n) / (1 − r)`." },
      { heading: { en: "Infinite geometric sums", am: "ማለቂያ የሌለው ጂኦሜትሪክ ድምር", om: "Walitti qabama jiyoomeetirikii dhuma hin qabne" }, body: "If `|r| < 1`, the infinite sum converges: `S_∞ = a_1 / (1 − r)`. If `|r| ≥ 1`, the sum diverges (grows without bound)." },
    ],
    workedExample: { problem: "Find the sum of the first 10 terms of 3, 7, 11, 15, ...", solution: "Arithmetic with a₁ = 3, d = 4. S₁₀ = 10/2 · (2·3 + 9·4) = 5 · 42 = 210." },
    atHomeExperiment: {
      title: {
        en: "Fold a paper and watch a geometric sequence appear",
        am: "ወረቀት አጥፉና የጂኦሜትሪክ ቅደም ተከተል ይታይ",
        om: "Waraqaa marachiisii tartiiba jiyoomeetirikii ilaali",
      },
      video: { youtubeId: "6EQeh2aK81Q", credit: "MythBusters" },
      materials: [
        { en: "One large sheet of paper (A4 or larger)", am: "አንድ ትልቅ ወረቀት", om: "Waraqaa guddaa tokko" },
        { en: "A ruler (optional)", am: "ሙለትታ (አማራጭ)", om: "Rooyaalii (filannoo)" },
      ],
      steps: [
        { en: "Fold the paper in half. Count the layers — write down: 1 fold → 2 layers.", am: "ወረቀቱን ለሁለት ይክፈሉት። ንብርብር ይቁጠሩ።", om: "Waraqaa walakkaatti marachiisi. Sadarkaa lakkaa'i." },
        { en: "Fold it in half again. Count layers (4). Write 2 folds → 4 layers.", am: "እንደገና ለሁለት ይክፈሉት። (4) ይቁጠሩ።", om: "Lammata walakkaatti marachiisi. (4) lakkaa'i." },
        { en: "Keep folding until you can't fold anymore. Record number of folds vs layers each time.", am: "ማጠፍ እስከማይችሉ ድረስ ይቀጥሉ።", om: "Marachiisuu hin dandeenyetti itti fufi." },
        { en: "After folding stops, look at your list: 2, 4, 8, 16, 32, …", am: "ዝርዝርዎን ይመልከቱ።", om: "Tarree kee ilaali." },
      ],
      observe: {
        en: "Your numbers form a geometric sequence with common ratio r = 2: every fold doubles the number of layers. Layers after n folds = 2ⁿ. Most people can't fold past 7 folds because by then you have 128 layers — the paper is too thick. That's why geometric growth is so powerful: it starts small, then explodes.",
        am: "ቁጥሮችዎ የጂኦሜትሪክ ቅደም ተከተል ናቸው፣ ሬሾው r = 2። ከn ማጠፍ በኋላ ንብርብሮች = 2ⁿ።",
        om: "Lakkoofsi kee tartiiba jiyoomeetirikii reeshoo r = 2 qabu uuma. Sadarkaan erga n marachiifame booda = 2ⁿ. Guddinni jiyoomeetirikii akkasitti humna qaba — xinnoodhaan jalqabee, dhumarratti dhoo'a.",
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
    unit: { en: "Stoichiometry", am: "ስቶይኪዮሜትሪ", om: "Istooyikiyoomeetirii" },
    moeCode: "CHE-G11-S1.1",
    eueeTopics: ["Mole concept", "Molar mass"],
    eueeWeight: 9,
    estimatedMinutes: 20,
    title: { en: "The mole and molar mass", am: "ሞልና ሞላር ብዛት", om: "Mool fi ulfaatina moolaarii" },
    summary: { en: "The mole bridges the world of atoms with the world of grams you can weigh in lab. Master it and most chemistry calculations become arithmetic.", am: "ሞል የአቶሞችን ዓለም ከላብ የምትመዝነው ግራም ጋር ያገናኛል።", om: "Moolichi addunyaa atoomotaa fi addunyaa giraamii laaboraatoriitti madaaltu walitti hidha." },
    video: { youtubeId: "wI56mHUDJgQ", credit: "Tyler DeWitt" },
    whyItMatters: {
      en: "When a chemist at an Ethiopian winery measures sulfur dioxide to preserve wine, they need exactly the right number of molecules — too many would poison drinkers, too few and the wine spoils. Pharmacists across Ethiopia dose paracetamol the same way: 500 mg is precisely 1.65 × 10²¹ molecules. Bakers measuring baking soda for injera dough are doing mole math without knowing it — the recipe was tuned by trial and error to get the right ratio of CO₂ molecules to dough. The mole is the bridge between the visible world (grams of teff, drops of medicine) and the invisible world of atoms. Without it, modern chemistry, medicine, and food science would not exist.",
    },
    sections: [
      { heading: { en: "What is a mole?", am: "ሞል ምንድነው?", om: "Mooliin maali?" }, body: "1 mole = 6.022 × 10²³ particles (Avogadro's number `N_A`). It's just a *counting* unit — like 'dozen' = 12, but vastly bigger because atoms are vastly smaller than eggs." },
      { heading: { en: "Molar mass", am: "ሞላር ብዛት", om: "Ulfaatina moolaarii" }, body: "The molar mass of a substance (g/mol) is numerically equal to the sum of atomic masses on the periodic table. Water H₂O: 2·(1) + 16 = 18 g/mol. So 1 mole of water weighs 18 g." },
      { heading: { en: "Converting mass ↔ moles ↔ particles", am: "ብዛት ↔ ሞል ↔ ቅንጣቶች ቀየራ", om: "Ulfaatina ↔ moolii ↔ qaccee jijjiiruu" }, body: "Moles = mass / molar mass. Particles = moles × N_A. Always check your units." },
    ],
    workedExample: { problem: "How many moles are in 9 g of water?", solution: "Molar mass of H₂O = 18 g/mol. Moles = 9 / 18 = 0.5 mol. That's 0.5 × 6.022e23 ≈ 3.0 × 10²³ water molecules." },
    atHomeExperiment: {
      title: {
        en: "Feel how big Avogadro's number really is — using rice",
        am: "የአቮጋድሮ ቁጥር ምን ያህል ግዙፍ እንደሆነ በሩዝ ይሰማዎ",
        om: "Lakkoofsa Avogadro hammam guddaa akka ta'e ruuziin dhandhami",
      },
      video: { youtubeId: "TEl4jeETVmg", credit: "TED-Ed" },
      materials: [
        { en: "A handful of uncooked rice", am: "የተወሰነ ጥሬ ሩዝ", om: "Ruuzii hin afoofamne harka guutuu" },
        { en: "A kitchen scale or measuring spoon", am: "የወጥ ቤት ሚዛን ወይም ማንኪያ", om: "Madaala mana keessaa ykn fal'aana safaraa" },
        { en: "Paper and pen", am: "ወረቀትና እስክሪብቶ", om: "Waraqaa fi ibsaa" },
      ],
      steps: [
        { en: "Count out exactly 100 grains of rice — yes, all 100. Take your time.", am: "በትክክል 100 የሩዝ ቅንጣት ይቁጠሩ።", om: "Qaccee ruuzii 100 sirritti lakkaa'i." },
        { en: "Weigh those 100 grains. Mass of 1 grain = total mass ÷ 100.", am: "100 ቅንጣት ይመዝኑ። የ1 ቅንጣት ብዛት = ጠቅላላ ÷ 100።", om: "Qaccee 100 madaali. Ulfaatina qaccee tokkoo = waliigalaa ÷ 100." },
        { en: "Now imagine 'a mole' of rice grains: 6.022 × 10²³ of them. Multiply: total mass = (mass of 1 grain) × 6.022 × 10²³.", am: "'አንድ ሞል' ሩዝ አስቡ።", om: "Amma 'mooliin' ruuzii yaadi: 6.022 × 10²³ qaccee." },
        { en: "Convert grams → kilograms → tonnes. Compare it to the mass of Mount Entoto or Africa.", am: "ግራም ወደ ኪሎግራም ወደ ቶን ይቀይሩ።", om: "Giraamii gara kiloogiraamiitti, ergasii gara toonniitti jijjiiri." },
      ],
      observe: {
        en: "A single rice grain weighs about 25 mg. One mole of rice would weigh about 1.5 × 10¹⁹ kg — many quadrillion tonnes, vastly more than Mount Entoto or even all the rice ever grown on Earth. Yet a mole of water molecules fits in 18 g — a single spoonful! That's because atoms are unimaginably smaller than rice grains. The mole is just a counting unit, but its scale tells you how tiny atoms really are.",
        am: "አንድ የሩዝ ቅንጣት ወደ 25 mg ይመዝናል። አንድ ሞል ሩዝ 1.5 × 10¹⁹ ኪግ ያህል ይመዝናል — ግዙፍ ቶኖች። ግን አንድ ሞል የውሃ ሞለኪውሎች 18 ግራም ብቻ ይይዛሉ! አቶሞች ምን ያህል ጥቃቅን እንደሆኑ ይታያል።",
        om: "Qaccee ruuzii tokko gar 25 mg ulfaata. Mooliin ruuzii tokko gar 1.5 × 10¹⁹ kg ulfaata — toonnii hedduu. Garuu mooliin moolikiyuulota bishaanii 18 giraamii qofa ulfaata — fal'aana tokko! Atoomonni hammam xixiqqaa akka ta'an kun mul'isa.",
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
    unit: { en: "Acids & Bases", am: "አሲድ እና ቤዝ", om: "Asiidii fi Beezii" },
    moeCode: "CHE-G11-AB1.1",
    eueeTopics: ["Acids and bases", "pH"],
    eueeWeight: 7,
    estimatedMinutes: 18,
    title: { en: "Acids, bases, and the pH scale", am: "አሲዶች፣ ቤዞችና የpH ሚዛን", om: "Asiidii, Beezii fi madaala pH" },
    summary: { en: "What makes something acidic or basic, how to measure it on the pH scale, and the simple math that connects pH to hydrogen ion concentration.", am: "አንድ ነገር አሲድ ወይም ቤዝ የሚያደርገው ምን እንደሆነ።", om: "Wantni tokko maaliif asiidii ykn beezii akka ta'u." },
    video: { youtubeId: "pY4RkElyvU8", credit: "Tyler DeWitt" },
    whyItMatters: {
      en: "Why does injera have its distinctive sour taste? Wild yeast and lactic-acid bacteria lower the dough's pH from about 7 to 4 over two or three days of fermentation. The acid kills harmful bacteria — which is why injera keeps for days without refrigeration. Farmers in the Oromia highlands check soil pH because teff grows best between 5.5 and 7.5; volcanic-ash zones can be too acidic, the Afar salt flats too basic, and yields collapse outside that range. Doctors monitor blood pH (must stay between 7.35 and 7.45 — outside that range is a medical emergency). Soap factories, tanneries, even the bitterness of strong bunna — all controlled by pH.",
    },
    sections: [
      { heading: { en: "Brønsted–Lowry definition", am: "የብሮንስቴድ-ሎውሪ ትርጓሜ", om: "Hiika Brønsted–Lowry" }, body: "An *acid* donates a proton (H⁺). A *base* accepts a proton. HCl in water donates H⁺ to water: HCl + H₂O → H₃O⁺ + Cl⁻. Water acts as the base here." },
      { heading: { en: "The pH scale", am: "የpH ሚዛን", om: "Madaala pH" }, body: "`pH = −log₁₀[H⁺]`, where [H⁺] is the molar concentration of hydrogen ions. Pure water at 25°C has [H⁺] = 10⁻⁷ M, so pH = 7 (neutral). pH < 7 = acidic, pH > 7 = basic. Each pH unit is a factor of 10 in [H⁺]." },
      { heading: { en: "Strong vs. weak", am: "ኃይለኛ እና ደካማ", om: "Cimaa fi laafaa" }, body: "Strong acids/bases ionize completely in water (HCl, NaOH). Weak ones only partially ionize (acetic acid, ammonia) — equilibrium matters." },
    ],
    workedExample: { problem: "What is the pH of a 0.01 M HCl solution?", solution: "HCl is a strong acid, so [H⁺] ≈ 0.01 M = 10⁻² M. pH = −log(10⁻²) = 2." },
    atHomeExperiment: {
      title: {
        en: "Make your own pH indicator from red cabbage",
        am: "ከቀይ ጎመን የራስዎን pH አመልካች ይስሩ",
        om: "Raafuu diimaa irraa agarsiisaa pH ofii kee tolfadhu",
      },
      video: { youtubeId: "PKUwxQI0wIo", credit: "Royal Institution" },
      materials: [
        { en: "Half a head of red cabbage (or 1 beetroot)", am: "ግማሽ ቀይ ጎመን (ወይም 1 ቀይ ሥር)", om: "Walakkaa raafuu diimaa (ykn buura diimaa tokko)" },
        { en: "Hot water and a pot", am: "ሙቅ ውሃና ድስት", om: "Bishaan ho'aa fi xuwwee" },
        { en: "3–5 clear cups", am: "3–5 ግልጽ ኩባያዎች", om: "Kuppii ifaa 3–5" },
        { en: "Lemon juice, vinegar, baking soda, ash water, soap water (test substances)", am: "የሎሚ ጭማቂ፣ ኮምጣጤ፣ የመጋገሪያ ሶዳ፣ የአመድ ውሃ፣ የሳሙና ውሃ", om: "Cuunfaa loomii, dhangaggaa'aa, soodaa makaa, bishaan daaraa, bishaan saamuna" },
      ],
      steps: [
        { en: "Chop the cabbage. Boil it in just enough water to cover it for 10 minutes. Cool and strain — keep the deep purple liquid.", am: "ጎመኑን ይክፈሉት። በውሃ ውስጥ ለ10 ደቂቃ ይቀቅሉት፣ ቆዳው ያቀዘቅዙት።", om: "Raafuu ciri. Bishaan keessatti daqiiqaa 10 affeeli, kuumii dhugaa qabate baasi." },
        { en: "Pour a little of the purple liquid into each clear cup.", am: "በእያንዳንዱ ኩባያ ውስጥ ትንሽ ሐምራዊ ፈሳሽ ያፍሱ።", om: "Kuppii tokkoon tokkoon keessatti kuumicha xiqqoo naqi." },
        { en: "Add a few drops of one test substance to each cup. Don't mix substances.", am: "ለእያንዳንዱ ኩባያ የተለያየ የሙከራ ንጥረ ነገር ይጨምሩ።", om: "Kuppii tokkoon tokkoon keessatti wanta qoraman addaan adda godhii dabali." },
        { en: "Observe the colour change in each cup.", am: "የቀለም ለውጥን ይመልከቱ።", om: "Jijjiirama halluu ilaali." },
      ],
      observe: {
        en: "The cabbage juice contains anthocyanin, a pigment whose shape changes with pH:\n- Pink/red → strong acid (lemon, vinegar — pH 1–3)\n- Purple → neutral (pH ~7)\n- Blue/green → mild base (baking soda, soap — pH 9–11)\n- Yellow → strong base (ash water — pH 12+)\nYou've just made a pH meter from a vegetable. Universal indicator strips work the same way — they're just a mix of pigments that change colour with [H⁺].",
        am: "የጎመኑ ጭማቂ አንቶሺያኒን ይዟል። ቀለሙ በpH ይለወጣል፦ ቀይ ለአሲድ፣ ሐምራዊ ለገለልተኛ፣ አረንጓዴ/ሰማያዊ ለቤዝ።",
        om: "Cuunfaan raafuu antoshiyaaniin qaba — halluun isaa pH waliin jijjiirama: diimaa (asiidii), kuumii (giddu-galeessa), magariisa/cuquliisa (beezii). Madaala pH muka irraa tolchitee jirta!",
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
    unit: { en: "Cell biology", am: "የሕዋስ ባዮሎጂ", om: "Baayooloojii seelii" },
    moeCode: "BIO-G11-C1.1",
    eueeTopics: ["Cell structure", "Organelles"],
    eueeWeight: 8,
    estimatedMinutes: 22,
    title: { en: "Cell structure and organelles", am: "የሕዋስ መዋቅርና ኦርጋኔሎች", om: "Caasaa seelii fi orgaaneelota" },
    summary: { en: "The basic unit of life and the specialized parts inside it that keep the cell alive and working.", am: "የሕይወት መሠረታዊ ክፍልና ህዋስን በህይወት የሚያቆዩ ልዩ ክፍሎች።", om: "Yuunitii bu'uura jireenyaa fi qaamota addaa seelii lubbuun jiraachisan." },
    video: { youtubeId: "8IlzKri08kk", credit: "Amoeba Sisters" },
    whyItMatters: {
      en: "Every bite of kitfo is muscle cells from a cow. Every cup of bunna comes from coffee plant cells. Injera ferments because of yeast cells dividing. Even the eye reading this sentence is built from about 100 million light-sensing cells, each containing hundreds of mitochondria converting last night's shiro into ATP energy. When doctors at Black Lion Hospital diagnose cancer, they look at cells under a microscope — cancer is just cells with broken control systems. Vaccines work by training your immune cells to recognize invaders. Ethiopian medical research at the Armauer Hansen Institute and Addis Ababa University all starts with understanding what's inside a single cell.",
    },
    sections: [
      { heading: { en: "Prokaryotic vs eukaryotic cells", am: "ፕሮካርዮቲክና ኢውካርዮቲክ", om: "Pirookaariyootik fi Iyukaariyootik" }, body: "Prokaryotes (bacteria, archaea) have no membrane-bound nucleus — DNA floats free in the cytoplasm. Eukaryotes (plants, animals, fungi, protists) have a true nucleus and many membrane-bound organelles." },
      { heading: { en: "Key organelles to know", am: "ቁልፍ ኦርጋኔሎች", om: "Orgaaneelota ijoo" }, body: "- *Nucleus*: stores DNA, controls gene expression.\n- *Mitochondria*: produce ATP via aerobic respiration — the cell's 'power plant'.\n- *Ribosomes*: build proteins from mRNA. Found free or on rough ER.\n- *Endoplasmic reticulum (ER)*: rough ER makes proteins; smooth ER makes lipids.\n- *Golgi apparatus*: modifies, sorts, and packages proteins for shipping.\n- *Chloroplasts* (plants only): site of photosynthesis." },
      { heading: { en: "Plant vs animal cells", am: "የተክልና የእንስሳ ሕዋስ", om: "Seelii biqiltootaa fi bineensotaa" }, body: "Plant cells additionally have a rigid *cell wall* (cellulose), a large central *vacuole* (storage + turgor pressure), and *chloroplasts*. Animal cells have *centrioles* (cell division) and lysosomes; plant cells generally don't." },
    ],
    workedExample: { problem: "A muscle cell uses huge amounts of ATP. Which organelle would you expect to find in unusually high numbers?", solution: "Mitochondria — they produce ATP via aerobic respiration, so cells with high energy demand pack many of them." },
    atHomeExperiment: {
      title: {
        en: "See real plant cells with no microscope (onion skin)",
        am: "ያለ ማይክሮስኮፕ የተክል ሕዋሶችን ይመልከቱ (የሽንኩርት ቆዳ)",
        om: "Maaykiroskooppii malee seelii biqiltuu ilaali (qola shunkurtii)",
      },
      video: { youtubeId: "Xc5HPAzXbZw", credit: "Microbehunter" },
      materials: [
        { en: "1 fresh onion", am: "1 ትኩስ ሽንኩርት", om: "Shunkurtii haaraa 1" },
        { en: "A sharp knife (ask an adult to help)", am: "ስለታም ቢላዋ (ትልቅ ሰው ይርዳ)", om: "Hadhaa qaramaa (nama guddaa gargaarsiisi)" },
        { en: "A bright window or strong lamp", am: "ብሩህ መስኮት ወይም መብራት", om: "Foddaa ifaa qabu ykn ibsaa cimaa" },
        { en: "A magnifying glass if you have one (helpful, not required)", am: "የማጉያ መነፅር (ካለ)", om: "Madaala ija (yoo qabaatte)" },
      ],
      steps: [
        { en: "Peel off one layer of the onion. Each layer is a curved white sheet.", am: "የሽንኩርቱን አንድ ንብርብር ይላጡት።", om: "Sadarkaa shunkurtii tokko qola." },
        { en: "On the inside (concave) surface, you'll see a very thin transparent skin. Gently peel a small piece of it with your nail.", am: "በውስጥ በኩል ቀጭን ግልጽ ቆዳ ያያሉ።", om: "Karaa keessaa qolli haphiin ifaan ni jira. Qubaan dafqaan qabi." },
        { en: "Hold the thin skin up to bright light or a window.", am: "ቀጭኑን ቆዳ ወደ ብርሃን ይዘው ያንሱ።", om: "Qola haphii sana gara ifaatti ol kaasi." },
        { en: "Look carefully (use the magnifier if you have one). You're looking at real plant cells.", am: "በትኩረት ይመልከቱ።", om: "Sirritti ilaali." },
      ],
      observe: {
        en: "You can see tiny rectangular cells lined up like bricks — those are real onion epidermis cells, each about 0.3 mm across. The clear outline is the cell wall (made of cellulose — a feature only plant cells have, not animal cells). Inside each one is a faint round shape: that's the nucleus. You just looked at one of the smallest building blocks of life with your own eyes, no microscope needed.",
        am: "እንደ ጡብ የተደረደሩ ትንንሽ አራት ማዕዘን ሕዋሶችን ማየት ይችላሉ — እነዚህ የሽንኩርት ኤፒደርሚስ ሕዋሶች ናቸው። ግልጽ መስመር የሕዋስ ግድግዳ ነው።",
        om: "Seeloota xixiqqaa roga afur fakkaatan akka jajjabbii sararamanii ilaaluu dandeessa — kunneen seeloota epidermis shunkurtii ti. Sararri ifaan dallaa seelii ti (kun amaloota biqiltuu qofa). Ija keetiin yuunitii bu'uura jireenyaa argiteetta.",
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
    unit: { en: "Cell biology", am: "የሕዋስ ባዮሎጂ", om: "Baayooloojii seelii" },
    moeCode: "BIO-G11-C2.1",
    eueeTopics: ["Mitosis", "Meiosis", "Cell division"],
    eueeWeight: 7,
    estimatedMinutes: 24,
    title: { en: "Mitosis vs meiosis", am: "ሚቶሲስና ሜዮሲስ", om: "Mitoosis fi Meeyoosis" },
    summary: { en: "Two ways cells divide: mitosis for growth and repair (identical daughters), meiosis for sex cells (genetically varied, half the chromosomes).", am: "ሕዋሶች የሚከፈሉባቸው ሁለት መንገዶች።", om: "Karaa lama seelonni ittiin qoqqoodaman." },
    video: { youtubeId: "zrKdz93WlVk", credit: "Amoeba Sisters" },
    whyItMatters: {
      en: "A teff farmer in the Oromia highlands plants one seed and a year later harvests thousands more. Every cell of every teff plant came from mitosis — the original embryo cell dividing again and again, each daughter cell an exact copy. But the new seeds inside those grains came from meiosis: the parent plant mixed its genes to make offspring that aren't identical. That's why some teff varieties resist drought while others give higher yields — and why breeders at the Debre Zeit Agricultural Research Center can select for the best. The same biology is why your siblings look different from you (meiosis in your parents), but a cut on your hand heals into identical skin cells (mitosis in your body).",
    },
    sections: [
      { heading: { en: "Mitosis: one becomes two identical cells", am: "ሚቶሲስ", om: "Mitoosis" }, body: "Mitosis produces two genetically identical *diploid* daughter cells (2n → 2n). Phases: prophase, metaphase, anaphase, telophase, then cytokinesis. Used for growth, tissue repair, and asexual reproduction." },
      { heading: { en: "Meiosis: one becomes four genetically varied cells", am: "ሜዮሲስ", om: "Meeyoosis" }, body: "Meiosis produces four genetically distinct *haploid* gametes (2n → n). Two divisions in a row: meiosis I separates homologous chromosomes; meiosis II separates sister chromatids (like mitosis)." },
      { heading: { en: "Why genetic variation?", am: "ለምን የዘረመል ልዩነት?", om: "Maaliif garaagarummaa jinii?" }, body: "Two mechanisms in meiosis create variation: (1) *crossing over* in prophase I — homologous chromosomes swap segments; (2) *independent assortment* — each pair of homologs lines up randomly in metaphase I." },
    ],
    workedExample: { problem: "A human cell has 46 chromosomes. After meiosis, how many chromosomes does each gamete have?", solution: "Meiosis halves the chromosome number: 46 / 2 = 23. Each sperm or egg carries 23 chromosomes; fertilization restores 46." },
    atHomeExperiment: {
      title: {
        en: "Watch mitosis grow a plant from a single seed",
        am: "ከአንድ ዘር ተክል ሲያድግ ይመልከቱ",
        om: "Sanyii tokko irraa biqiltuun akka guddatu ilaali",
      },
      video: { youtubeId: "w77zPAtVTuI", credit: "GPhase" },
      materials: [
        { en: "5–6 bean or chickpea seeds (any dried beans from the kitchen)", am: "5–6 የቦሎቄ ወይም የሽምብራ ዘሮች", om: "Sanyii baaqilaa ykn shumbiraa 5–6" },
        { en: "A small dish or plate", am: "ትንሽ ሳህን", om: "Saanii xiqqaa" },
        { en: "Cotton wool or a thick cloth", am: "ጥጥ ወይም ወፍራም ጨርቅ", om: "Jirbii ykn huccuu furdaa" },
        { en: "Water and a ruler", am: "ውሃና ሙለትታ", om: "Bishaan fi rooyaalii" },
      ],
      steps: [
        { en: "Soak the cotton in water until it is damp but not dripping. Place it on the dish.", am: "ጥጡን በውሃ ይንከሩት፣ በሳህኑ ላይ ያኑሩት።", om: "Jirbii bishaaniin jiidhi, saanii irra kaa'i." },
        { en: "Lay the seeds on top. Put the dish in a warm spot but out of direct sun.", am: "ዘሮቹን በላዩ ላይ ያስቀምጡ።", om: "Sanyii gubbaatti diriirsi." },
        { en: "Keep the cotton damp each day (sprinkle water).", am: "በየቀኑ ጥጡን እርጥብ ያድርጉ።", om: "Guyyaa hunda jirbii jiidhinsa eegi." },
        { en: "Each day for a week, measure and record the root length. Notice the first tiny root, then the shoot.", am: "ለአንድ ሳምንት በየቀኑ የስር ርዝመቱን ይለኩ።", om: "Torban tokkoof guyyaa hunda dheerina hiddaa safari." },
      ],
      observe: {
        en: "From one seed, you'll see hundreds of new cells in days — the seed grows roots, then a shoot, then leaves. Every one of those cells came from mitosis: the original embryo cell divided, the daughters divided again, and so on. All cells in the plant share the same DNA. (Meiosis is different — it only happens later, when the grown plant makes pollen and eggs for its own seeds.)",
        am: "ከአንድ ዘር በቀናት ውስጥ መቶዎች አዲስ ሕዋሶች ይታያሉ — ሁሉም በሚቶሲስ ተፈጥረዋል። ሁሉም ሕዋሶች ተመሳሳይ DNA አላቸው።",
        om: "Sanyii tokko irraa guyyoota muraasa keessatti seeloota dhibba hedduu argita — hidda, ergasii biqila, ergasii baala. Hundinuu mitoosisii dhufan. Hunduu DNA wal-fakkaataa qabu. (Meeyoosis adda — yeroo biqilichi guddatee firfirsa fi killee mataa isaaf sanyii qopheessu.)",
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
    unit: { en: "Genetics", am: "ጄኔቲክስ", om: "Jeneetiksii" },
    moeCode: "BIO-G11-G1.1",
    eueeTopics: ["DNA structure", "Nucleotides", "Genetic material"],
    eueeWeight: 8,
    estimatedMinutes: 22,
    title: { en: "DNA: the molecule of life", am: "ዲኤንኤ: የሕይወት ሞለኪውል", om: "DNA: moleekiyuulii jireenyaa" },
    summary: {
      en: "The chemical instructions inside every living cell — how DNA is built from four bases, twisted into a double helix, and packaged into chromosomes.",
      am: "በሁሉም ሕያው ሕዋስ ውስጥ ያለ ኬሚካዊ መመሪያ — ዲኤንኤ ከአራት ቤዞች እንዴት እንደተሠራ፣ ወደ ድርብ ጥምዝ መልክ እንደተጠምዘዘና ወደ ክሮሞሶም እንደተጠቀለለ።",
      om: "Qajeelfama keemikaa seelii lubbuu qabu hunda keessa jiru — DNA akkamitti bu'uura afuriin akka ijaaramee, akka maramaa lamaa marfamee fi krooomosoomii keessa akka kuufamuu.",
    },
    video: { youtubeId: "8m6hHRlKwxY", credit: "Amoeba Sisters" },
    whyItMatters: {
      en: "Why does one teff variety thrive in Tigray's dry highlands while another grows best in the Awash valley? The answer is written in DNA. Researchers at the Ethiopian Biodiversity Institute and the EIAR sequence the genomes of Ethiopian crops to find the genes for drought tolerance, iron-rich grains, and disease resistance. Forensic labs at the Federal Police use DNA to identify suspects and bring families closure. Doctors testing for sickle cell disease — common in parts of southern Ethiopia — are reading a single letter change in one gene. And every coffee tree in the Sidamo region carries DNA that researchers can trace back through centuries of farmer selection. DNA isn't abstract: it's the source code of every living thing around you.",
    },
    sections: [
      { heading: { en: "What is DNA made of?", am: "ዲኤንኤ ከምን ተሠራ?", om: "DNA maal irraa hojjetama?" }, body: "DNA stands for *deoxyribonucleic acid*. It is a long chain of small units called *nucleotides*. Every nucleotide has three parts: a sugar (deoxyribose), a phosphate group, and one of four nitrogen bases — *adenine (A)*, *thymine (T)*, *guanine (G)*, or *cytosine (C)*. The order of these bases along the chain is the genetic code." },
      { heading: { en: "The double helix and base pairing", am: "ድርብ ጥምዝና የቤዝ ጥንዶች", om: "Marama lamaa fi waltaanee bu'uuraa" }, body: "DNA is two strands twisted around each other in a *double helix*, first described by Watson, Crick, and Franklin in 1953. The strands are held together by base pairs: *A always pairs with T*, and *G always pairs with C*. This means one strand is the template for the other — if you know one side, you know the other." },
      { heading: { en: "Genes, chromosomes, and the genome", am: "ጂን፣ ክሮሞሶም እና ጂኖም", om: "Jiinii, krooomosoomii fi jiinoomii" }, body: "A *gene* is a stretch of DNA that codes for one protein or trait. Genes are packed onto long structures called *chromosomes* inside the nucleus — humans have 46 (23 pairs); teff has 40. The full set of DNA in an organism is its *genome* — about 3 billion base pairs in humans, far more in many plants." },
    ],
    workedExample: {
      problem: "One DNA strand reads 5'–ATGGCTAAG–3'. Write the sequence of the complementary strand.",
      solution: "Pair A↔T and G↔C, and remember the second strand runs in the opposite direction (3'→5' when read alongside the first). Reading base-by-base: A→T, T→A, G→C, G→C, C→G, T→A, A→T, A→T, G→C. So the complementary strand is 3'–TACCGATTC–5'.",
    },
    atHomeExperiment: {
      title: {
        en: "Extract real DNA from a strawberry",
        am: "ከእንጆሪ ውስጥ እውነተኛ ዲኤንኤ ያውጡ",
        om: "Istiroberii keessaa DNA dhugaa baasi",
      },
      video: { youtubeId: "zMw44VDqf2s", credit: "NHGRI (genome.gov)" },
      materials: [
        { en: "1 ripe strawberry (or 2–3 small ones)", am: "1 የበሰለ እንጆሪ (ወይም 2–3 ትንንሽ)", om: "Istiroberii bilchaate 1 (ykn 2–3 xixiqqaa)" },
        { en: "A zip-lock bag or any clean plastic bag", am: "ዚፕ-ሎክ ቦርሳ ወይም ንጹህ ላስቲክ ቦርሳ", om: "Boorsaa zip-lock ykn boorsaa pilaastikii qulqulluu" },
        { en: "1 teaspoon dish soap", am: "1 የሻይ ማንኪያ የሳህን ሳሙና", om: "Saamunaa saaniidhaa baasaa shaayii 1" },
        { en: "A pinch of table salt (about ¼ teaspoon)", am: "ትንሽ ጨው (¼ የሻይ ማንኪያ ያህል)", om: "Soogidda xiqqoo (gara ¼ baasaa shaayii)" },
        { en: "About 100 ml clean water", am: "100 ሚሊ ሊትር ንጹህ ውሃ", om: "Bishaan qulqulluu 100 ml" },
        { en: "A coffee filter or a clean piece of cloth", am: "የቡና ማጣሪያ ወይም ንጹህ ጨርቅ", om: "Filtara bunaa ykn huccuu qulqulluu" },
        { en: "A clear cup or small glass", am: "ግልጽ ጽዋ ወይም ትንሽ ብርጭቆ", om: "Kuusaa ifaan mul'atu ykn birxiqqoo xiqqaa" },
        { en: "Ice-cold rubbing alcohol or araki — kept in the freezer for 30 minutes", am: "በማቀዝቀዣ ለ30 ደቂቃ የቆየ የተበራቹ አልኮል ወይም አረቄ", om: "Alkoolii qorraa ykn araqee — daqiiqaa 30f firijii keessa turfame" },
        { en: "A toothpick or thin wooden skewer", am: "የጥርስ ማጽጃ እንጨት ወይም ቀጭን እንጨት", om: "Cabbii ilkaanii ykn muka haphii" },
      ],
      steps: [
        { en: "In a cup, gently stir together the water, salt, and dish soap. Don't make foam.", am: "በጽዋ ውስጥ ውሃ፣ ጨውና ሳሙና በቀስታ ይቀላቅሉ — አረፋ እንዳይፈጠር ይጠንቀቁ።", om: "Kuusaa keessatti bishaan, soogidda fi saamunaa suuta walitti makkaa — hoomacha hin uumiin." },
        { en: "Remove the green leaves from the strawberry, put it in the bag, and seal it. Squish with your fingers for about 2 minutes until it is a smooth pulp.", am: "የእንጆሪውን አረንጓዴ ቅጠል አስወግደው ቦርሳ ውስጥ ያስገቡት፣ ይዝጉት፣ በጣቶችዎ ለ2 ደቂቃ ያህል እስኪለሰልስ ድረስ ያደቅቁት።", om: "Istiroberii baala isaa magariisa irraa kaasi, boorsaa keessa kaa'ii cufi, qubaan daqiiqaa 2 caccabsii akka qabbii ta'utti dhiqi." },
        { en: "Pour the soap-salt-water mixture into the bag with the pulp. Seal and gently squish to mix for one more minute.", am: "የሳሙና-ጨው-ውሃ ቅልቅሉን ወደ ቦርሳው ውስጥ ጨምሩ፣ ይዝጉና ለ1 ደቂቃ ቀስ ብለው ያቀላቅሉ።", om: "Makaa saamunaa-soogiddaa-bishaanii boorsaa caccaba qabu keessatti naqi, cufiitii daqiiqaa tokkoof suuta walitti makaa." },
        { en: "Slowly pour the bag's contents through a coffee filter (or cloth) into a clear cup. Wait until you have a clear pink-red juice with no chunks.", am: "የቦርሳውን ይዘት በማጣሪያ ወይም በጨርቅ አጥርተው ወደ ግልጽ ጽዋ ያፍሱ። ግልጽ ጭማቂ እስኪሆን ይጠብቁ።", om: "Wantoota boorsaa keessaa filtara bunaa ykn huccuu keessaan suuta gara kuusaa ifaan mul'atu keessatti dhangalaasi. Hanga jiibaan ifaan diimaa-diimotuu argamutti eeggadhu." },
        { en: "Tilt the cup. Very slowly pour an equal amount of ice-cold alcohol down the inside of the cup so it forms a separate layer floating on top — do not mix.", am: "ጽዋውን ያዘንብሉ። እኩል መጠን ያለው ቀዝቃዛ አልኮል በቀስታ ከጽዋው ጎን ዳር በማውረድ በላዩ ላይ የተለየ ሽፋን ይፍጠር — አያቀላቅሉት።", om: "Kuusaa gad-gargalchi. Alkoolii qorraa hamma walqixaa ta'e gara cinaa kuusaa irraan suuta naqi — sadarkaa adda ta'e gubbatti uumamuu qaba — hin makin." },
        { en: "Watch the line where alcohol meets the juice. Within a minute, white stringy cloudy strands will rise into the alcohol layer.", am: "አልኮሉ እና ጭማቂው የሚገናኙበትን መስመር ይመልከቱ። በ1 ደቂቃ ውስጥ ነጭ ክር መሳይ ነገሮች ወደ አልኮሉ ይነሣሉ።", om: "Sarara alkoolii fi jiibaan walgahan ilaali. Daqiiqaa tokko keessatti, kiyyoo adii dhuma akka funyoo gara sadarkaa alkooliitti ol bahu argita." },
        { en: "Dip in the toothpick and slowly lift the white strands out. That is real DNA.", am: "የጥርስ ማጽጃውን አጥልቀው ነጩን ክር ቀስ ብለው አውጡ — ይህ እውነተኛ ዲኤንኤ ነው።", om: "Cabbii ilkaanii keessa cuuphiitii kiyyoo adii sana suuta ol baasi — kun DNA dhugaadha." },
      ],
      observe: {
        en: "The white stringy substance is real DNA — billions of strawberry DNA molecules tangled together so they're now visible to the eye. Each step did a specific job: the soap broke open the cell membranes and the nuclear envelopes (they're made of fat, and soap dissolves fat); the salt made the DNA strands clump by neutralising their negative charges; and the cold alcohol pulled the DNA out of solution because DNA does not dissolve in alcohol. Strawberries work especially well because they are octoploid — they carry eight copies of every chromosome, so you get a huge amount of DNA per cell. The same technique, scaled up with cleaner reagents, is what researchers at the Ethiopian Biotechnology Institute use to extract DNA from teff, coffee, and cattle for breeding and conservation work.",
        am: "ነጩ ክር መሳይ ነገር እውነተኛ ዲኤንኤ ነው — በቢሊዮኖች የሚቆጠሩ የእንጆሪ ዲኤንኤ ሞለኪውሎች ተጠምዝዘው አሁን ለዓይን ይታያሉ። ሳሙናው የሕዋስ ሽፋንና የንዩክሊየስ ሽፋን ሰበረ፤ ጨው ዲኤንኤ እንዲሰበሰብ አደረገ፤ ቀዝቃዛው አልኮል ዲኤንኤውን ከውሃ አወጣው። እንጆሪ በተለይ ጥሩ የሚሠራው ስምንት የክሮሞሶም ቅጂ ስለሚይዝ ነው።",
        om: "Wantoonni kiyyoo adii fakkaatan kun DNA dhugaadha — moleekiyuulota DNA istiroberii biiliyoonaan lakkaa'aman walitti maramanii ammaaf ija namaatti mul'achaa jiru. Saamunichi sibootaa fi haguggii nuukileesii diige (kunneen coomaa irraa hojjetamaniidhaa, saamunni immoo cooma baqsa); soogiddi DNA akka walitti qabaman gargaare; alkoolii qorraan immoo DNA bishaan keessaa baase. Istiroberii adda ta'e — krooomosoomii saddeet-cunqursaa qabu — kanaaf seelii tokkicha keessaa DNA hedduu argita.",
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
