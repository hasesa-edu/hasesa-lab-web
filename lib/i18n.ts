export type Locale = "en" | "am" | "om";

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "am", label: "Amharic", native: "አማርኛ" },
  { code: "om", label: "Afaan Oromo", native: "Afaan Oromoo" },
];

type Dict = Record<string, { en: string; am: string; om: string }>;

export const t: Dict = {
  // Nav
  "nav.home": { en: "Home", am: "መነሻ", om: "Mana" },
  "nav.lessons": { en: "Lessons", am: "ትምህርቶች", om: "Barnoota" },
  "nav.tutor": { en: "AI Tutor", am: "የAI አስተማሪ", om: "Barsiisaa AI" },
  "nav.dashboard": { en: "My progress", am: "የእኔ ሂደት", om: "Adeemsa koo" },
  "nav.teacher": { en: "Teacher", am: "መምህር", om: "Barsiisaa" },
  "nav.signin": { en: "Sign in", am: "ግባ", om: "Seeni" },
  "nav.signup": { en: "Sign up", am: "ይመዝገቡ", om: "Galmaa'i" },
  "nav.signout": { en: "Sign out", am: "ውጣ", om: "Ba'i" },
  "nav.language": { en: "Language", am: "ቋንቋ", om: "Afaan" },

  // Hero
  "hero.tag": {
    en: "Grade 11 · Ethiopia · EUEE-aligned",
    am: "11ኛ ክፍል · ኢትዮጵያ · ከEUEE ጋር የተጣጣመ",
    om: "Kutaa 11 · Itoophiyaa · EUEE waliin walsimataa",
  },
  "hero.title": {
    en: "Your AI tutor for Grade 11 sciences.",
    am: "ለ11ኛ ክፍል ሳይንስ ትምህርቶች የእርስዎ የAI አስተማሪ።",
    om: "Barsiisaa AI keessan kan kutaa 11 saayinsii.",
  },
  "hero.sub": {
    en: "Math, Physics, Chemistry, Biology — mapped to the MoE syllabus and EUEE blueprint. Built for low-bandwidth Android, in English, Amharic and Afaan Oromo.",
    am: "ሒሳብ፣ ፊዚክስ፣ ኬሚስትሪ፣ ባዮሎጂ — ከትምህርት ሚኒስቴር ሥርዓተ ትምህርትና ከEUEE ዕቅድ ጋር የተጣጣመ።",
    om: "Heerregaa, Fiiziksii, Keemistirii, Baayooloojii — sirna barnootaa MoE fi karoora EUEE waliin walsimataa.",
  },
  "hero.cta.lessons": { en: "Browse lessons", am: "ትምህርቶችን ይመልከቱ", om: "Barnoota ilaali" },
  "hero.cta.chat": { en: "Try the AI tutor", am: "AI አስተማሪውን ይሞክሩ", om: "Barsiisaa AI yaali" },
  "hero.cta.signup": { en: "Create a free account", am: "ነጻ መለያ ይፍጠሩ", om: "Akaawuntii bilisaa uumi" },
  "hero.cta.dashboard": { en: "Go to my dashboard", am: "ወደ ዳሽቦርዴ ይሂዱ", om: "Gara daashboordii kootti dhaqi" },

  "feature.aligned.title": { en: "MoE & EUEE aligned", am: "ከMoE እና EUEE ጋር የተጣጣመ", om: "MoE fi EUEE waliin walsimataa" },
  "feature.aligned.body": { en: "Every lesson tagged to a syllabus code and exam-blueprint topic.", am: "እያንዳንዱ ትምህርት ከሥርዓተ ትምህርት ኮድ ጋር የተሰየመ።", om: "Barnoonni hundi koodii sirna barnootaatti hidhameera." },
  "feature.lang.title": { en: "Three languages", am: "ሦስት ቋንቋዎች", om: "Afaan sadii" },
  "feature.lang.body": { en: "English, Amharic, Afaan Oromo — switch any time.", am: "እንግሊዝኛ፣ አማርኛ፣ ኦሮምኛ።", om: "Ingiliffa, Amaariffaa, Afaan Oromoo." },
  "feature.offline.title": { en: "Works on slow networks", am: "በዝግታ ኢንተርኔት ይሰራል", om: "Interneetii suuta deemu irratti hojjeta" },
  "feature.offline.body": { en: "Installable as a PWA, with offline-capable lesson cache.", am: "እንደ PWA መጫን ይቻላል።", om: "Akka PWA ti hojjeta." },
  "feature.ai.title": { en: "Grounded AI tutor", am: "በትምህርቶች ላይ የተመሰረተ AI", om: "Barsiisaa AI barnoota irratti hundaa'e" },
  "feature.ai.body": { en: "Answers cite the lesson they come from, not random web content.", am: "መልሶች ከትምህርቱ ምንጭ ይጠቅሳሉ።", om: "Deebii barnoota irraa dhufan eeru." },

  // Lessons
  "lessons.title": { en: "Grade 11 lessons", am: "የ11ኛ ክፍል ትምህርቶች", om: "Barnoota Kutaa 11" },
  "lessons.subtitle": {
    en: "Sample lessons across Math, Physics, Chemistry, and Biology. Filter by subject below.",
    am: "በሒሳብ፣ በፊዚክስ፣ በኬሚስትሪና በባዮሎጂ የናሙና ትምህርቶች።",
    om: "Barnoota fakkeenyaa Heerregaa, Fiiziksii, Keemistirii fi Baayooloojii.",
  },
  "lessons.all": { en: "All subjects", am: "ሁሉም ትምህርቶች", om: "Kutaalee hunda" },
  "lessons.estimate": { en: "min", am: "ደቂቃ", om: "daq." },
  "lessons.code": { en: "MoE code", am: "የMoE ኮድ", om: "Koodii MoE" },
  "lessons.start": { en: "Open lesson", am: "ትምህርቱን ይክፈቱ", om: "Barnoota bani" },
  "lessons.back": { en: "← All lessons", am: "← ሁሉም ትምህርቶች", om: "← Barnoota hunda" },
  "lessons.askAbout": { en: "Ask the AI tutor about this lesson", am: "AI አስተማሪውን ስለዚህ ትምህርት ይጠይቁ", om: "Waa'ee barnoota kanaa barsiisaa AI gaafadhu" },

  // Chat
  "chat.title": { en: "AI Tutor", am: "AI አስተማሪ", om: "Barsiisaa AI" },
  "chat.subtitle": { en: "Ask anything about Grade 11 Math, Physics, Chemistry, or Biology.", am: "ስለ 11ኛ ክፍል ሒሳብ፣ ፊዚክስ፣ ኬሚስትሪ ወይም ባዮሎጂ ይጠይቁ።", om: "Waa'ee Kutaa 11 saayinsii gaafadhaa." },
  "chat.placeholder": { en: "e.g. Explain Newton's second law with an example", am: "ለምሳሌ፡ የኒውተንን ሁለተኛ ህግ በምሳሌ ያስረዱኝ", om: "fkn. Seera lammaffaa Niwutan fakkeenyaan ibsi" },
  "chat.send": { en: "Send", am: "ላክ", om: "Ergi" },
  "chat.thinking": { en: "Thinking…", am: "በማሰብ ላይ…", om: "Yaaduu jira…" },
  "chat.empty.title": { en: "How can I help you study?", am: "በትምህርትዎ እንዴት ልርዳዎት?", om: "Akkamiin si gargaaru?" },
  "chat.empty.body": { en: "Try one of the suggestions below, or type your own question.", am: "ከታች ካሉት ጥቆማዎች አንዱን ይሞክሩ።", om: "Yaada gadii keessaa tokko yaali." },
  "chat.disclaimer": { en: "Demo build. AI can make mistakes — always check against your lesson.", am: "የማሳያ እትም። AI ስህተት ሊሰራ ይችላል።", om: "Hojjettoo agarsiisaa. AI dogoggora hojjechuu danda'a." },
  "chat.error": { en: "Couldn't reach the AI service. Try again.", am: "የAI አገልግሎቱን መድረስ አልተቻለም።", om: "Tajaajila AI argachuu hin dandeenye." },

  // Auth
  "auth.signin.title": { en: "Sign in", am: "ግባ", om: "Seeni" },
  "auth.signup.title": { en: "Create your account", am: "መለያዎን ይፍጠሩ", om: "Akaawuntii kee uumi" },
  "auth.signup.tagline": { en: "Free, forever. No payment, no SMS required.", am: "ሁልጊዜ ነጻ።", om: "Yeroo hunda bilisaa." },
  "auth.username": { en: "Username", am: "የተጠቃሚ ስም", om: "Maqaa fayyadamtuu" },
  "auth.password": { en: "Password", am: "የይለፍ ቃል", om: "Jecha icciitii" },
  "auth.role": { en: "I am a…", am: "እኔ…", om: "Ani…" },
  "auth.role.student": { en: "Student", am: "ተማሪ", om: "Barataa" },
  "auth.role.teacher": { en: "Teacher", am: "መምህር", om: "Barsiisaa" },
  "auth.region": { en: "Region (optional)", am: "ክልል", om: "Naannoo" },
  "auth.school": { en: "School (optional)", am: "ትምህርት ቤት", om: "Mana barumsaa" },
  "auth.under18": {
    en: "I am under 18. (We'll show a simplified privacy notice.)",
    am: "ዕድሜዬ ከ18 በታች ነው።",
    om: "Umuriin koo waggaa 18 gadi dha.",
  },
  "auth.privacy": {
    en: "Demo accounts are stored only in your browser (localStorage). No real password hashing or server storage in this demo — do not use a real password.",
    am: "የማሳያ መለያዎች በአሳሽዎ ብቻ ይከማቻሉ።",
    om: "Akaawuntiin agarsiisaa kun kuufamuu kan danda'u sakatta'aa kee qofa irratti dha.",
  },
  "auth.signin.cta": { en: "Sign in", am: "ግባ", om: "Seeni" },
  "auth.signup.cta": { en: "Create account", am: "መለያ ይፍጠሩ", om: "Akaawuntii uumi" },
  "auth.signin.alt": { en: "Already have an account?", am: "ቀድሞ መለያ አለዎት?", om: "Akaawuntii qabdaa?" },
  "auth.signup.alt": { en: "Don't have one yet?", am: "ገና የለዎትም?", om: "Hin qabdu?" },
  "auth.err.takenUsername": { en: "That username is already taken.", am: "ይህ የተጠቃሚ ስም ቀድሞ ተወስዷል።", om: "Maqaan kun durumaan fudhatameera." },
  "auth.err.wrong": { en: "Wrong username or password.", am: "የተጠቃሚ ስም ወይም የይለፍ ቃል ስህተት ነው።", om: "Maqaan ykn jechi icciitii dogoggora dha." },
  "auth.err.required": { en: "Username and password are required.", am: "የተጠቃሚ ስምና የይለፍ ቃል ያስፈልጋሉ።", om: "Maqaa fi jechi icciitii barbaachisaa dha." },

  // Onboarding
  "onboard.welcome": { en: "Welcome — let's set up your study plan.", am: "እንኳን ደህና መጡ — የጥናት እቅድዎን እናዘጋጅ።", om: "Baga nagaan dhuftan — karoora qayyabannaa keessan haa qopheessinu." },
  "onboard.pickSubjects": { en: "Which subjects do you want to study?", am: "የትኞቹን ትምህርቶች ማጥናት ይፈልጋሉ?", om: "Kutaalee kam baruu barbaaddu?" },
  "onboard.continue": { en: "Continue", am: "ቀጥል", om: "Itti fufi" },
  "onboard.diag.title": { en: "Quick diagnostic", am: "ፈጣን ምርመራ", om: "Qorannoo dafqaa" },
  "onboard.diag.intro": {
    en: "Two short questions per subject. Don't worry about getting them right — this just tells us where to start you.",
    am: "በአንድ ትምህርት ሁለት አጭር ጥያቄዎች።",
    om: "Kutaa tokkoof gaaffii lama gabaabaa.",
  },
  "onboard.diag.skip": { en: "Skip", am: "አሳልፍ", om: "Darbi" },
  "onboard.finish": { en: "Finish onboarding", am: "መግቢያን ጨርስ", om: "Galmee xumuri" },
  "onboard.done.title": { en: "All set!", am: "ሁሉም ተዘጋጅቷል!", om: "Hunduu qophaa'eera!" },
  "onboard.done.body": { en: "Your dashboard is ready. Pick a recommended lesson to begin.", am: "ዳሽቦርድዎ ዝግጁ ነው።", om: "Daashboordiin keessan qophaa'eera." },

  // Dashboard
  "dash.title": { en: "My progress", am: "የእኔ ሂደት", om: "Adeemsa koo" },
  "dash.greeting": { en: "Hello", am: "ሰላም", om: "Akkam jirta" },
  "dash.recommended": { en: "Recommended for you", am: "ለእርስዎ የተመከሩ", om: "Sidhif yaadaman" },
  "dash.recommendedWhy": { en: "Based on your weakest topics and EUEE weight.", am: "በደካማ ርዕሶችዎና በEUEE ክብደት መሰረት።", om: "Mata-duree dadhabaa fi ulfaatina EUEE irratti hundaa'e." },
  "dash.mastery": { en: "Mastery by topic", am: "በርዕስ የተካኑ", om: "Ogummaa mata-dureen" },
  "dash.weak": { en: "Weakest topics", am: "ደካማ ርዕሶች", om: "Mata-duree dadhabaa" },
  "dash.takeMock": { en: "Take a weekly mock test", am: "ሳምንታዊ ሞክ ፈተና ይውሰዱ", om: "Qormaata torban moocii fudhadhu" },
  "dash.noActivity": { en: "No activity yet. Start a lesson!", am: "እስካሁን ምንም እንቅስቃሴ የለም።", om: "Hojiin hin jiru." },

  // Mock test
  "mock.title": { en: "EUEE mock test", am: "EUEE ሞክ ፈተና", om: "Qormaata moocii EUEE" },
  "mock.intro": { en: "10 mixed-topic questions from this subject. No time limit on the demo.", am: "10 የተደባለቁ ጥያቄዎች።", om: "Gaaffii walmakaa 10." },
  "mock.start": { en: "Start mock", am: "ሞክ ጀምር", om: "Moocii eegali" },
  "mock.question": { en: "Question", am: "ጥያቄ", om: "Gaaffii" },
  "mock.of": { en: "of", am: "ከ", om: "kan" },
  "mock.submit": { en: "Submit", am: "አስገባ", om: "Galchi" },
  "mock.score": { en: "Your score", am: "ውጤትዎ", om: "Qabxiin kee" },
  "mock.again": { en: "Try another mock", am: "ሌላ ሞክ ይሞክሩ", om: "Moocii biraa yaali" },
  "mock.review": { en: "Review answers", am: "መልሶችን ይከልሱ", om: "Deebii ilaali" },

  // Quiz / lesson interaction
  "quiz.check": { en: "Quick check", am: "ፈጣን ምልከታ", om: "Sakatta'a saffisaa" },
  "quiz.workedEx": { en: "Worked example", am: "የተሰራ ምሳሌ", om: "Fakkeenya hojjetame" },
  "quiz.problem": { en: "Problem.", am: "ችግር።", om: "Rakkoo." },
  "quiz.solution": { en: "Solution.", am: "መፍትሄ።", om: "Furmaata." },
  "quiz.generate": { en: "Generate more practice questions", am: "ተጨማሪ ጥያቄዎችን ይፍጠሩ", om: "Gaaffii dabalataa uumi" },
  "quiz.generating": { en: "Generating…", am: "በመፍጠር ላይ…", om: "Uumamaa jira…" },
  "quiz.generated": { en: "AI-generated practice", am: "AI የፈጠራቸው ልምምድ", om: "Shaakala AI uume" },
  "quiz.correct": { en: "Correct.", am: "ትክክል።", om: "Sirrii dha." },
  "quiz.incorrect": { en: "Not quite.", am: "ትክክል አይደለም።", om: "Sirrii miti." },

  // Teacher
  "teacher.title": { en: "Teacher dashboard", am: "የመምህር ዳሽቦርድ", om: "Daashboordii barsiisaa" },
  "teacher.subtitle": { en: "Create a class code, see aggregate progress. No individual student data — only class-level mastery.", am: "የክፍል ኮድ ይፍጠሩ።", om: "Koodii kilaasii uumi." },
  "teacher.createClass": { en: "Create a class", am: "ክፍል ይፍጠሩ", om: "Kilaasii uumi" },
  "teacher.className": { en: "Class name", am: "የክፍል ስም", om: "Maqaa kilaasii" },
  "teacher.create": { en: "Create", am: "ይፍጠሩ", om: "Uumi" },
  "teacher.share": { en: "Share this code with students:", am: "ይህን ኮድ ለተማሪዎች ያጋሩ:", om: "Koodii kana barattootatti qoodi:" },
  "teacher.students": { en: "students", am: "ተማሪዎች", om: "barattoota" },
  "teacher.aggregateMastery": { en: "Class average mastery", am: "የክፍል አማካይ ችሎታ", om: "Giddu-galeessa ogummaa kilaasii" },
  "teacher.weakest": { en: "Weakest topics for this class", am: "የክፍሉ ደካማ ርዕሶች", om: "Mata-duree dadhabaa kilaasii kanaa" },
  "teacher.noClasses": { en: "No classes yet. Create one to get started.", am: "ገና ምንም ክፍል የለም።", om: "Kilaasiin hin jiru." },
  "teacher.noStudents": { en: "No students have joined yet. Share the code above.", am: "ገና ምንም ተማሪ አልገባም።", om: "Barattoonni hin galmoofne." },

  "student.joinClass": { en: "Join a class", am: "ክፍልን ይቀላቀሉ", om: "Kilaasii makami" },
  "student.joinCode": { en: "Enter the class code from your teacher", am: "ከመምህርዎ የክፍል ኮድ ያስገቡ", om: "Koodii kilaasii barsiisaa irraa galchi" },
  "student.join": { en: "Join", am: "ይቀላቀሉ", om: "Makami" },
  "student.joined": { en: "Joined class", am: "የተቀላቀልኳቸው ክፍሎች", om: "Kilaasii makame" },
  "student.joinErr": { en: "That code doesn't match any class.", am: "ይህ ኮድ ምንም ክፍል አይዛመድም።", om: "Koodiin kun kilaasii kamiyyuu wajjin walhin gitu." },

  // Common
  "common.subjects": { en: "Subjects", am: "ትምህርቶች", om: "Kutaalee" },
  "common.loading": { en: "Loading…", am: "በመጫን ላይ…", om: "Fe'amaa jira…" },
  "common.signinRequired": { en: "Please sign in to continue.", am: "ለመቀጠል እባክዎ ይግቡ።", om: "Itti fufuuf maaloo seeni." },
  "common.signinCTA": { en: "Sign in", am: "ግባ", om: "Seeni" },

  "footer.demo": {
    en: "Demo · not the production product · based on REQUIREMENTS.md v0.2",
    am: "ማሳያ · የምርት እትም አይደለም",
    om: "Agarsiisa · oomisha dhugaa miti",
  },
};

export function tr(key: keyof typeof t, locale: Locale): string {
  return t[key]?.[locale] ?? t[key]?.en ?? key;
}
