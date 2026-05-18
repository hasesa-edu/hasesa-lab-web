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
