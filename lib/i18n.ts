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
    en: "Quality education for Ethiopian high schools",
    am: "ለኢትዮጵያ ሁለተኛ ደረጃ ትምህርት ቤቶች ጥራት ያለው ትምህርት",
    om: "Barnoota qulqullina qabu manneen barumsaa sadarkaa lammaffaa Itoophiyaaf",
  },
  "hero.title": {
    en: "Learn deeply. Not just for the exam.",
    am: "በጥልቀት ይማሩ። ለፈተና ብቻ አይደለም።",
    om: "Gadi-fageenyaan baradhu. Qormaata qofaaf miti.",
  },
  "hero.sub": {
    en: "Built for real understanding — trilingual lessons, an AI tutor that explains step by step, and an at-home experiment in every lesson that turns theory into something you can touch. This demo starts with Grade 11 Math, Physics, Chemistry and Biology.",
    am: "ለእውነተኛ ግንዛቤ የተዘጋጀ — ሦስት ቋንቋ ትምህርቶች፣ ደረጃ-በ-ደረጃ የሚያስረዳ AI አስተማሪ፣ እንዲሁም በእያንዳንዱ ትምህርት በቤት የሚሰራ ሙከራ። ይህ ማሳያ ከ11ኛ ክፍል ሒሳብ፣ ፊዚክስ፣ ኬሚስትሪና ባዮሎጂ ይጀምራል።",
    om: "Hubannoo dhugaatiif kan qophaa'e — barnoota afaan sadiin, barsiisaa AI tarkaanfii-tarkaanfiin ibsu, fi barnoota tokkoo tokkoo keessatti shaakala mana keessatti hojjetamu. Agarsiisni kun Heerregaa, Fiiziksii, Keemistirii fi Baayooloojii Kutaa 11 irraa eegala.",
  },
  "hero.cta.lessons": { en: "Browse lessons", am: "ትምህርቶችን ይመልከቱ", om: "Barnoota ilaali" },
  "hero.cta.chat": { en: "Try the AI tutor", am: "AI አስተማሪውን ይሞክሩ", om: "Barsiisaa AI yaali" },
  "hero.cta.signup": { en: "Get started", am: "ይጀምሩ", om: "Eegali" },
  "hero.cta.dashboard": { en: "Go to my dashboard", am: "ወደ ዳሽቦርዴ ይሂዱ", om: "Gara daashboordii kootti dhaqi" },
  "hero.pilot": {
    en: "Free during pilot",
    am: "በሙከራ ወቅት ነጻ",
    om: "Yeroo yaaliitti bilisaa",
  },

  // How it works
  "how.title": { en: "How it works", am: "እንዴት እንደሚሰራ", om: "Akkamiin akka hojjetu" },
  "how.sub": {
    en: "Four steps from sign-up to mastering a subject — and confidently sitting the EUEE when the time comes.",
    am: "ከመመዝገብ እስከ አንድ ትምህርት ሙሉ በሙሉ ማወቅ — እና ጊዜው ሲደርስ EUEE ን በራስ መተማመን እስከ መውሰድ አራት ደረጃዎች።",
    om: "Galmaa'uu irraa hanga kutaa tokko gadi-fageenyaan beekuutti — fi yeroon yoo ga'e EUEE amantummaadhaan fudhachuutti tarkaanfii afur.",
  },
  "how.s1.title": { en: "Create an account", am: "መለያ ይፍጠሩ", om: "Akaawuntii uumi" },
  "how.s1.body": {
    en: "Pick your subjects. A short diagnostic places you at the right level.",
    am: "ትምህርቶችዎን ይምረጡ። አጭር ምርመራ ትክክለኛ ደረጃ ላይ ያስቀምጥዎታል።",
    om: "Kutaalee filadhu. Qorannoon gabaabaan sadarkaa sirrii irra si kaa'a.",
  },
  "how.s2.title": { en: "Read & do", am: "ይማሩ እና ይስሩ", om: "Baradhuu fi hojjedhu" },
  "how.s2.body": {
    en: "MoE-aligned lessons in your language, each with a worked example and an at-home experiment.",
    am: "በቋንቋዎ ከMoE ሥርዓተ ትምህርት ጋር የተጣጣሙ ትምህርቶች፣ እያንዳንዱ የተሰራ ምሳሌና በቤት የሚሰራ ሙከራ አለው።",
    om: "Barnoota MoE waliin walsimataa afaan keessaniin, hundi fakkeenya hojjetame fi shaakala mana keessatti qabu.",
  },
  "how.s3.title": { en: "Ask the AI tutor", am: "AI አስተማሪውን ይጠይቁ", om: "Barsiisaa AI gaafadhu" },
  "how.s3.body": {
    en: "Stuck on a concept? Get a patient, step-by-step explanation grounded in your lesson.",
    am: "ሀሳብ ካልገባዎ? ከትምህርቱ ጋር የተያያዘ ትዕግስተኛ፣ ደረጃ-በ-ደረጃ ማብራሪያ ያግኙ።",
    om: "Yaadni isin hin galchine? Ibsa obsaa, tarkaanfii-tarkaanfiin barnoota kee irratti hundaa'e argadhu.",
  },
  "how.s4.title": { en: "Track your mastery", am: "ችሎታዎን ይከታተሉ", om: "Ogummaa kee hordofi" },
  "how.s4.body": {
    en: "See per-topic progress and take practice exams to find — and close — your weak areas.",
    am: "በርዕስ ሂደትዎን ይመልከቱና ደካማ ቦታዎችን ለማግኘት የልምምድ ፈተናዎችን ይውሰዱ።",
    om: "Adeemsa mata-dureen ilaali; bakka dadhabaa argachuu fi cuufuuf qormaata shaakalaa fudhadhu.",
  },

  // Audience split
  "aud.students.title": { en: "For students", am: "ለተማሪዎች", om: "Barattootaaf" },
  "aud.students.b1": { en: "A patient tutor available 24/7, in your language.", am: "በቋንቋዎ 24/7 ትዕግስተኛ አስተማሪ።", om: "Barsiisaa obsaa 24/7, afaan keetiin." },
  "aud.students.b2": { en: "Personal mastery dashboard — know exactly what to study next.", am: "የግል ችሎታ ዳሽቦርድ — ቀጥሎ ምን ማጥናት እንዳለብዎ ይወቁ።", om: "Daashboordii ogummaa dhuunfaa — itti aansee maal akka qayyabattu beeki." },
  "aud.students.b3": { en: "Practice exams with a per-topic breakdown — so you study what you actually need.", am: "የልምምድ ፈተናዎች በርዕስ ትንተና።", om: "Qormaata shaakalaa mata-dureen qoodame — wanta dhugumatti barbaaddu qayyabachuuf." },
  "aud.teachers.title": { en: "For teachers", am: "ለመምህራን", om: "Barsiisotaaf" },
  "aud.teachers.b1": { en: "Create a class with one code — no rosters to upload.", am: "በአንድ ኮድ ክፍል ይፍጠሩ — ምንም ዝርዝር ማቅረብ አያስፈልግም።", om: "Koodii tokkoon kilaasii uumi — galmee qopheessuu hin barbaachisu." },
  "aud.teachers.b2": { en: "See class-level mastery without exposing individual data.", am: "የግል መረጃ ሳያጋልጡ የክፍል ደረጃ ችሎታን ይመልከቱ።", om: "Odeeffannoo dhuunfaa saaxiluu malee ogummaa sadarkaa kilaasii ilaali." },
  "aud.teachers.b3": { en: "Spot weak topics across your class at a glance.", am: "በክፍልዎ ውስጥ ያሉ ደካማ ርዕሶችን በፍጥነት ይለዩ።", om: "Mata-duree dadhabaa kilaasii kee keessatti yeruma argi." },

  // Why us
  "why.title": { en: "Why Personal AI Tutor", am: "ለምን Personal AI Tutor", om: "Maaliif Personal AI Tutor" },
  "why.sub": {
    en: "Built for Ethiopian classrooms — focused on real understanding, not just exam answers.",
    am: "ለኢትዮጵያ ክፍሎች የተሰራ — ለፈተና መልሶች ብቻ ሳይሆን ለእውነተኛ ግንዛቤ ያተኮረ።",
    om: "Kilaasota Itoophiyaatiif kan qophaa'e — hubannoo dhugaa irratti, deebii qormaata qofa irratti utuu hin ta'in.",
  },
  "why.b1.title": { en: "Real conversation, not just quizzes", am: "እውነተኛ ውይይት፣ ፈተና ብቻ አይደለም", om: "Marii dhugaa, qormaata qofa miti" },
  "why.b1.body": {
    en: "Ask follow-up questions, get worked examples, learn at your own pace.",
    am: "ተከታይ ጥያቄዎችን ይጠይቁ፣ የተሰሩ ምሳሌዎችን ያግኙ።",
    om: "Gaaffii itti aanu gaafadhu, fakkeenya hojjetame argadhu.",
  },
  "why.b2.title": { en: "Three languages, equal quality", am: "ሦስት ቋንቋዎች በእኩል ጥራት", om: "Afaan sadii, qulqullina walfakkaata" },
  "why.b2.body": {
    en: "English, Amharic, and Afaan Oromo — switch any time, no second-class translations.",
    am: "እንግሊዝኛ፣ አማርኛ፣ ኦሮምኛ — በማንኛውም ጊዜ ይቀይሩ።",
    om: "Ingiliffa, Amaariffaa, Afaan Oromoo — yeroo barbaadde jijjiiri.",
  },
  "why.b3.title": { en: "Learning by doing, every lesson", am: "በመስራት መማር፣ በእያንዳንዱ ትምህርት", om: "Hojii hojjechuun barachuu, barnoota hunda" },
  "why.b3.body": {
    en: "Each lesson includes an at-home experiment — physics with a coin, chemistry with red cabbage, biology with onion skin. Theory you can touch.",
    am: "እያንዳንዱ ትምህርት በቤት የሚሰራ ሙከራ አለው — በሳንቲም ፊዚክስ፣ በቀይ ጎመን ኬሚስትሪ፣ በሽንኩርት ቆዳ ባዮሎጂ።",
    om: "Barnoonni hundi shaakala mana keessatti qaba — saantimaan fiiziksii, raafuu diimaadhaan keemistirii, qola shunkurtiidhaan baayooloojii.",
  },
  "why.b4.title": { en: "Works on slow networks", am: "በዝግታ ኢንተርኔት ይሰራል", om: "Interneetii suuta deemu irratti hojjeta" },
  "why.b4.body": {
    en: "Installable as an app, with lessons cached for offline study.",
    am: "እንደ መተግበሪያ ይጫናል፤ ትምህርቶች ለመስመር-ላይ-ውጭ ጥናት ይቀመጣሉ።",
    om: "Akka aappiitti caqasama; barnoonni qayyabannaa offline-tiif kuufamu.",
  },

  // Landing — inline chat preview
  "preview.user": {
    en: "Explain Newton's second law with a simple example.",
    am: "የኒውተንን ሁለተኛ ህግ በቀላል ምሳሌ ያስረዱኝ።",
    om: "Seera lammaffaa Niwutan fakkeenya salphaadhaan ibsi.",
  },
  "preview.intro.before": {
    en: "Newton's second law says",
    am: "የኒውተን ሁለተኛ ህግ እንዲህ ይላል:",
    om: "Seerri lammaffaa Niwutan akkana jedha:",
  },
  "preview.intro.after": {
    en: "— the force on an object equals its mass times its acceleration.",
    am: "— በአንድ ነገር ላይ የሚደረግ ኃይል ከብዛቱና ከማፋጠኑ ብዜት ጋር እኩል ነው።",
    om: "— humni wanta tokko irra jiru ulfaatina isaa fi dabalata saffisaa isaa walbaayisuu wajjin walqixa.",
  },
  "preview.example.label": { en: "Example.", am: "ምሳሌ።", om: "Fakkeenya." },
  "preview.example.before": {
    en: "A 2 kg ball pushed with a force of 10 N accelerates at",
    am: "በ10 N ኃይል የተገፋ 2 kg ኳስ በ",
    om: "Kubbaan 2 kg humna 10 N tiin dhiibame",
  },
  "preview.source": {
    en: "From: Physics · Newton's laws of motion",
    am: "ምንጭ: ፊዚክስ · የኒውተን የእንቅስቃሴ ሕጎች",
    om: "Madda: Fiiziksii · Seerota sochii Niwutan",
  },

  // Learn by doing
  "lbd.eyebrow": { en: "Learn by doing", am: "በመስራት ይማሩ", om: "Hojiidhaan baradhu" },
  "lbd.title": {
    en: "Every lesson comes with a real experiment you can run at home.",
    am: "እያንዳንዱ ትምህርት በቤት የሚሰሩት እውነተኛ ሙከራ ይዟል።",
    om: "Barnoonni tokkoon tokkoon shaakala dhugaa mana keessatti hojjettu wajjin dhufa.",
  },
  "lbd.sub": {
    en: "No fancy lab gear. A coin and a card teach inertia. A stick and a shadow measure a tree. Red cabbage juice becomes a pH meter. Onion skin shows you real plant cells without a microscope.",
    am: "ምንም ውድ የላብ መሳሪያ አያስፈልግም። ሳንቲምና ካርድ ኢነርሺያን ያስተምራሉ። ቀይ ጎመን ጭማቂ የpH መለኪያ ይሆናል። የሽንኩርት ቆዳ ያለ ማይክሮስኮፕ የተክል ሕዋሶችን ያሳያል።",
    om: "Meeshaa laaboraatoorii gatii guddaa hin barbaachisu. Saantimaa fi kaardiin iinarshiyaa barsiisu. Cuunfaan raafuu diimaa madaala pH ta'a. Qolli shunkurtii maaykiroskooppii malee seelii biqiltuu si argisiisa.",
  },
  "lbd.example.title": {
    en: "Sample experiment — Newton's first law",
    am: "ናሙና ሙከራ — የኒውተን የመጀመሪያ ህግ",
    om: "Fakkeenya shaakalaa — Seera jalqabaa Niwutan",
  },
  "lbd.example.line1": {
    en: "Place a coin on a stiff card balanced over a cup. Flick the card sideways.",
    am: "በኩባያ ላይ በተደገፈ ጠንካራ ካርድ ላይ ሳንቲም ያስቀምጡ። ካርዱን በፍጥነት ጎን አድርገው ይምቱ።",
    om: "Saantima kaardii jabaa kuppii gubbaa irra jiru irra kaa'i. Kaardii dafqaan cinaatti dhiibi.",
  },
  "lbd.example.line2": {
    en: "Why does the coin drop straight into the cup instead of flying with the card?",
    am: "ሳንቲሙ ከካርዱ ጋር ከሚበር ይልቅ ቀጥ ብሎ ወደ ኩባያው የሚወድቀው ለምንድነው?",
    om: "Maaliif saantimni kaardii waliin balali'uu mannaa kallattiin gara kuppiitti kufa?",
  },

  // Dewey quote
  "dewey.eyebrow": {
    en: "Built on a simple idea",
    am: "በቀላል ሐሳብ ላይ የተመሰረተ",
    om: "Yaada salphaa irratti ijaarame",
  },
  "dewey.quote": {
    en: "The child's own instincts and powers furnish the material and give the starting point for all education.",
    am: "የልጁ የራሱ ስሜቶችና ችሎታዎች ለሁሉም ትምህርት ቁሳቁስን ያቀርባሉ፣ መነሻ ነጥብንም ይሰጣሉ።",
    om: "Miirri fi humni mucaa mataa isaa barnoota hundaaf maatii fi ka'umsa kenna.",
  },
  "dewey.attribution": {
    en: "— John Dewey, My Pedagogic Creed (1897)",
    am: "— ጆን ዲዊ፣ የእኔ ትምህርታዊ መርህ (1897)",
    om: "— John Dewey, My Pedagogic Creed (1897)",
  },
  "dewey.gloss": {
    en: "Personal AI Tutor is built on Dewey's idea: every learner starts somewhere different — so every lesson, quiz, and conversation adapts to where they are.",
    am: "Personal AI Tutor በዲዊ ሐሳብ ላይ የተመሰረተ ነው፦ እያንዳንዱ ተማሪ ከተለያየ ቦታ ይጀምራል — እያንዳንዱ ትምህርት፣ ፈተናና ውይይት ለእሱ ቦታ ይስማማል።",
    om: "Personal AI Tutor yaada Dewey irratti ijaarameera፦ barataan hundi bakka adda addaa irraa eegala — barnoonni, qormaanni, fi mariin hundi bakka inni jiruun walsimu.",
  },

  // CTA strip
  "cta.title": { en: "Ready to start learning?", am: "ለመማር ዝግጁ ነዎት?", om: "Baruuf qophaa'aa?" },
  "cta.sub": {
    en: "Create a free pilot account in under a minute. No SMS required.",
    am: "በደቂቃ ውስጥ የነጻ ሙከራ መለያ ይፍጠሩ። SMS አያስፈልግም።",
    om: "Daqiiqaa tokko keessatti akaawuntii yaalii bilisaa uumi. SMS hin barbaachisu.",
  },

  // Lessons
  "lessons.title": { en: "Lessons", am: "ትምህርቶች", om: "Barnoota" },
  "lessons.subtitle": {
    en: "Grade 11 Math, Physics, Chemistry, and Biology — our demo content. Each lesson includes a video, worked example, an at-home experiment, and a quick quiz.",
    am: "የ11ኛ ክፍል ሒሳብ፣ ፊዚክስ፣ ኬሚስትሪና ባዮሎጂ — የማሳያ ይዘታችን። እያንዳንዱ ትምህርት ቪዲዮ፣ የተሰራ ምሳሌ፣ በቤት የሚሰራ ሙከራና ፈጣን ፈተና ይዟል።",
    om: "Heerregaa, Fiiziksii, Keemistirii fi Baayooloojii Kutaa 11 — qabiyyee agarsiisaa keenya. Barnoonni hundi vidiyoo, fakkeenya hojjetame, shaakala mana keessatti, fi qormaata gabaabaa qaba.",
  },
  "lessons.all": { en: "All subjects", am: "ሁሉም ትምህርቶች", om: "Kutaalee hunda" },
  "lessons.estimate": { en: "min", am: "ደቂቃ", om: "daq." },
  "lessons.code": { en: "MoE code", am: "የMoE ኮድ", om: "Koodii MoE" },
  "lessons.start": { en: "Open lesson", am: "ትምህርቱን ይክፈቱ", om: "Barnoota bani" },
  "lessons.back": { en: "← All lessons", am: "← ሁሉም ትምህርቶች", om: "← Barnoota hunda" },
  "lessons.askAbout": { en: "Ask the AI tutor about this lesson", am: "AI አስተማሪውን ስለዚህ ትምህርት ይጠይቁ", om: "Waa'ee barnoota kanaa barsiisaa AI gaafadhu" },
  "lessons.notFound": { en: "Lesson not found.", am: "ትምህርቱ አልተገኘም።", om: "Barnootichi hin argamne." },
  "lessons.badge.video": { en: "Video", am: "ቪዲዮ", om: "Vidiyoo" },
  "lessons.badge.videoTitle": { en: "Video lesson included", am: "የቪዲዮ ትምህርት ይዟል", om: "Barnoota vidiyoo qaba" },
  "lessons.badge.experiment": { en: "Experiment", am: "ሙከራ", om: "Shaakala" },
  "lessons.badge.experimentTitle": { en: "At-home experiment included", am: "በቤት የሚሰራ ሙከራ ይዟል", om: "Shaakala mana keessatti hojjetamu qaba" },
  "lessons.badge.quiz": { en: "quiz", am: "ፈተና", om: "qormaata" },
  "lessons.badge.quizTitle": { en: "quick-check questions", am: "ፈጣን ፈተና ጥያቄዎች", om: "gaaffilee sakatta'a saffisaa" },

  // Chat
  "chat.title": { en: "AI Tutor", am: "AI አስተማሪ", om: "Barsiisaa AI" },
  "chat.subtitle": { en: "Ask anything about Grade 11 Math, Physics, Chemistry, or Biology.", am: "ስለ 11ኛ ክፍል ሒሳብ፣ ፊዚክስ፣ ኬሚስትሪ ወይም ባዮሎጂ ማንኛውንም ይጠይቁ።", om: "Waa'ee Heerregaa, Fiiziksii, Keemistirii ykn Baayooloojii Kutaa 11 waan barbaadde gaafadhu." },
  "chat.placeholder": { en: "e.g. Explain Newton's second law with an example", am: "ለምሳሌ፡ የኒውተንን ሁለተኛ ህግ በምሳሌ ያስረዱኝ", om: "fkn. Seera lammaffaa Niwutan fakkeenyaan ibsi" },
  "chat.send": { en: "Send", am: "ላክ", om: "Ergi" },
  "chat.thinking": { en: "Thinking…", am: "በማሰብ ላይ…", om: "Yaaduu jira…" },
  "chat.empty.title": { en: "How can I help you study?", am: "በትምህርትዎ እንዴት ልርዳዎት?", om: "Akkamiin si gargaaru?" },
  "chat.empty.body": { en: "Try one of the suggestions below, or type your own question.", am: "ከታች ካሉት ጥቆማዎች አንዱን ይሞክሩ።", om: "Yaada gadii keessaa tokko yaali." },
  "chat.disclaimer": { en: "Demo build. AI can make mistakes — always check against your lesson.", am: "የማሳያ እትም። AI ስህተት ሊሰራ ይችላል — ሁልጊዜ ከትምህርትዎ ጋር ያረጋግጡ።", om: "Hojjettoo agarsiisaa. AI dogoggora hojjechuu danda'a — yeroo hunda barnoota kee waliin mirkaneessi." },
  "chat.error": { en: "Couldn't reach the AI service. Try again.", am: "የAI አገልግሎቱን መድረስ አልተቻለም። እንደገና ይሞክሩ።", om: "Tajaajila AI argachuu hin dandeenye. Irra deebi'ii yaali." },
  "chat.grounded": { en: "Grounded in", am: "በዚህ ላይ የተመሰረተ", om: "Kana irratti hundaa'e" },
  "chat.viewLesson": { en: "view", am: "ይመልከቱ", om: "ilaali" },
  "chat.newMessage": { en: "New message", am: "አዲስ መልዕክት", om: "Ergaa haaraa" },

  // Auth
  "auth.signin.title": { en: "Sign in", am: "ግባ", om: "Seeni" },
  "auth.signup.title": { en: "Create your account", am: "መለያዎን ይፍጠሩ", om: "Akaawuntii kee uumi" },
  "auth.signup.tagline": { en: "Free to get started. No SMS required.", am: "ለመጀመር ነጻ። SMS አያስፈልግም።", om: "Eegaluuf bilisaa. SMS hin barbaachisu." },
  "auth.username": { en: "Username", am: "የተጠቃሚ ስም", om: "Maqaa fayyadamtuu" },
  "auth.email": { en: "Email", am: "ኢሜይል", om: "Imeelii" },
  "auth.displayName": { en: "Display name (optional)", am: "የሚታይ ስም (አማራጭ)", om: "Maqaa mul'atu (filannoo)" },
  "auth.password": { en: "Password", am: "የይለፍ ቃል", om: "Jecha icciitii" },
  "auth.passwordRule": { en: "Minimum 6 characters.", am: "ቢያንስ 6 ቁምፊ።", om: "Ugguu xinnaa qubee 6." },
  "auth.role": { en: "I am a…", am: "እኔ…", om: "Ani…" },
  "auth.role.student": { en: "Student", am: "ተማሪ", om: "Barataa" },
  "auth.role.teacher": { en: "Teacher", am: "መምህር", om: "Barsiisaa" },
  "auth.region": { en: "Region (optional)", am: "ክልል", om: "Naannoo" },
  "auth.school": { en: "School (optional)", am: "ትምህርት ቤት", om: "Mana barumsaa" },
  "auth.under18": {
    en: "I am under 18. (We'll show a simplified privacy notice.)",
    am: "ዕድሜዬ ከ18 በታች ነው። (ቀለል ያለ የግላዊነት ማስታወቂያ እናሳያለን።)",
    om: "Umuriin koo waggaa 18 gadi dha. (Beeksisa iccitii salphaa siif agarsiisna.)",
  },
  "auth.under18.notice": {
    en: "We collect only your email, language, and learning progress. Demo notice — a production version would meet Ethiopia's data protection guidelines.",
    am: "የምንሰበስበው ኢሜይልዎን፣ ቋንቋዎንና የመማር ሂደትዎን ብቻ ነው። የማሳያ ማስታወቂያ — የምርት እትም የኢትዮጵያን የመረጃ ጥበቃ መመሪያዎች ያሟላል።",
    om: "Kan walitti qabnu imeelii kee, afaan kee, fi adeemsa barnoota kee qofa. Beeksisa agarsiisaa — gosti hojiitti dhihaate qajeelfama eegumsa odeeffannoo Itoophiyaa ni guuta.",
  },
  "auth.privacy": {
    en: "Demo accounts are stored only in your browser (localStorage). No real password hashing or server storage in this demo — do not use a real password.",
    am: "የማሳያ መለያዎች በአሳሽዎ ብቻ (localStorage) ይከማቻሉ። በዚህ ማሳያ ምንም እውነተኛ የይለፍ ቃል ምስጠራ ወይም የሰርቨር ማከማቻ የለም — እውነተኛ የይለፍ ቃል አይጠቀሙ።",
    om: "Akaawuntiin agarsiisaa kun sakatta'aa kee qofa irratti (localStorage) kuufama. Agarsiisa kana keessatti icciitiin jecha icciitii dhugaa ykn kuusaa seervarii hin jiru — jecha icciitii dhugaa hin fayyadamin.",
  },
  "auth.err.signup": { en: "Sign-up failed. Try again.", am: "ምዝገባ አልተሳካም። እንደገና ይሞክሩ።", om: "Galmeen hin milkoofne. Irra deebi'ii yaali." },
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
    am: "በአንድ ትምህርት ሁለት አጭር ጥያቄዎች። ስለመመለስ አይጨነቁ — ይህ ከየት እንደምንጀምር ብቻ ያሳየናል።",
    om: "Kutaa tokkoof gaaffii lama gabaabaa. Sirritti deebisuun yaaddoo hin ta'in — kun bakka eegalu nuuf ni argisiisa.",
  },
  "onboard.diag.skip": { en: "Skip", am: "አሳልፍ", om: "Darbi" },
  "onboard.finish": { en: "Finish onboarding", am: "መግቢያን ጨርስ", om: "Galmee xumuri" },
  "onboard.done.title": { en: "All set!", am: "ሁሉም ተዘጋጅቷል!", om: "Hunduu qophaa'eera!" },
  "onboard.done.body": { en: "Your dashboard is ready. Pick a recommended lesson to begin.", am: "ዳሽቦርድዎ ዝግጁ ነው። ለመጀመር የተመከረ ትምህርት ይምረጡ።", om: "Daashboordiin kee qophaa'eera. Eegaluuf barnoota yaadame filadhu." },

  // Dashboard
  "dash.title": { en: "My progress", am: "የእኔ ሂደት", om: "Adeemsa koo" },
  "dash.greeting": { en: "Hello", am: "ሰላም", om: "Akkam jirta" },
  "dash.recommended": { en: "Recommended for you", am: "ለእርስዎ የተመከሩ", om: "Sidhif yaadaman" },
  "dash.recommendedWhy": { en: "Picked from the topics you've struggled with most.", am: "በጣም ካልተሳካላቸው ርዕሶችዎ የተመረጠ።", om: "Mata-duree baayyee si rakkisan keessaa kan filatame." },
  "dash.mastery": { en: "Mastery by topic", am: "በርዕስ የተካኑ", om: "Ogummaa mata-dureen" },
  "dash.weak": { en: "Weakest topics", am: "ደካማ ርዕሶች", om: "Mata-duree dadhabaa" },
  "dash.takeMock": { en: "Take a practice exam", am: "የልምምድ ፈተና ይውሰዱ", om: "Qormaata shaakalaa fudhadhu" },
  "dash.noActivity": { en: "No activity yet. Start a lesson!", am: "እስካሁን ምንም እንቅስቃሴ የለም። ትምህርት ይጀምሩ!", om: "Hojiin hin jiru. Barnoota tokko eegali!" },
  "dash.recommendedWhyNew": {
    en: "Start here — based on the subjects you picked.",
    am: "ከዚህ ይጀምሩ — በመረጡአቸው ትምህርቶች መሰረት።",
    om: "Asii eegali — kutaalee filattee irratti hundaa'e.",
  },

  // Mock test
  "mock.title": { en: "Practice exam", am: "የልምምድ ፈተና", om: "Qormaata shaakalaa" },
  "mock.intro": { en: "10 mixed-topic questions from this subject — EUEE-style, but tuned for learning. No time limit on the demo.", am: "ከዚህ ትምህርት 10 የተደባለቁ ጥያቄዎች — የEUEE ዓይነት፣ ለመማር የተዘጋጁ።", om: "Kutaa kana irraa gaaffii walmakaa 10 — bifa EUEE'tiin, garuu barachuuf qophaa'e." },
  "mock.start": { en: "Start practice", am: "ልምምድ ጀምር", om: "Shaakala eegali" },
  "mock.question": { en: "Question", am: "ጥያቄ", om: "Gaaffii" },
  "mock.of": { en: "of", am: "ከ", om: "kan" },
  "mock.submit": { en: "Submit", am: "አስገባ", om: "Galchi" },
  "mock.next": { en: "Next", am: "ቀጣይ", om: "Itti aanu" },
  "mock.score": { en: "Your score", am: "ውጤትዎ", om: "Qabxiin kee" },
  "mock.again": { en: "Try another", am: "ሌላ ይሞክሩ", om: "Kan biraa yaali" },
  "mock.review": { en: "Review answers", am: "መልሶችን ይከልሱ", om: "Deebii ilaali" },
  "mock.questions": { en: "questions", am: "ጥያቄዎች", om: "gaaffilee" },
  "mock.byTopic": { en: "By topic", am: "በርዕስ", om: "Mata-dureen" },
  "mock.yourAnswer": { en: "Your answer", am: "የእርስዎ መልስ", om: "Deebii kee" },
  "mock.correctAnswer": { en: "Correct", am: "ትክክለኛ", om: "Sirrii" },
  "mock.subjectNotFound": { en: "Subject not found.", am: "ትምህርቱ አልተገኘም።", om: "Kutaan hin argamne." },

  // Lesson video
  "video.label": { en: "Watch the lesson", am: "ትምህርቱን ይመልከቱ", om: "Barnoota daawwadhu" },
  "video.credit": { en: "Video by", am: "ቪዲዮ በ", om: "Vidiyoo kan" },
  "exp.video": { en: "Watch the demo", am: "ሙከራውን ይመልከቱ", om: "Shaakala daawwadhu" },

  // Why this matters
  "why.label": { en: "Why this matters", am: "ይህ ለምን አስፈላጊ ነው", om: "Maaliif kun barbaachisaa dha" },
  "why.untranslated": {
    en: "",
    am: "(በእንግሊዝኛ — ትርጉም በቅርቡ)",
    om: "(Afaan Ingiliffaan — hiikkaan dhihootti)",
  },

  // Lesson detail TOC
  "toc.why": { en: "Why", am: "ለምን", om: "Maaliif" },
  "toc.video": { en: "Video", am: "ቪዲዮ", om: "Vidiyoo" },
  "toc.lesson": { en: "Lesson", am: "ትምህርት", om: "Barnoota" },
  "toc.worked": { en: "Example", am: "ምሳሌ", om: "Fakkeenya" },
  "toc.experiment": { en: "Experiment", am: "ሙከራ", om: "Shaakala" },
  "toc.quiz": { en: "Quiz", am: "ፈተና", om: "Qormaata" },
  "toc.ask": { en: "Ask AI", am: "AIን ይጠይቁ", om: "AI gaafadhu" },

  // At-home experiment
  "exp.label": { en: "At-home experiment", am: "በቤት የሚሰራ ሙከራ", om: "Shaakala mana keessatti" },
  "exp.materials": { en: "You'll need", am: "የሚያስፈልጉ", om: "Wantoota barbaachisan" },
  "exp.steps": { en: "Try it", am: "ይሞክሩት", om: "Yaali" },
  "exp.observe": { en: "What you'll observe", am: "የምትመለከቱት", om: "Waan argitu" },

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
  "quiz.tryAgain": { en: "Try again", am: "እንደገና ይሞክሩ", om: "Irra deebi'ii yaali" },
  "quiz.noneYet": {
    en: "No AI-generated questions yet. Click the button above to make some.",
    am: "ገና በAI የተፈጠሩ ጥያቄዎች የሉም። ለመፍጠር ከላይ ያለውን አዝራር ይጫኑ።",
    om: "Hanga ammaatti gaaffii AI uume hin jiru. Uumuuf bantii armaan olii cuqaasi.",
  },
  "quiz.genError": {
    en: "Couldn't generate questions. Try again.",
    am: "ጥያቄዎችን መፍጠር አልተቻለም። እንደገና ይሞክሩ።",
    om: "Gaaffilee uumuun hin danda'amne. Irra deebi'ii yaali.",
  },

  // Teacher
  "teacher.title": { en: "Teacher dashboard", am: "የመምህር ዳሽቦርድ", om: "Daashboordii barsiisaa" },
  "teacher.subtitle": {
    en: "Create a class code, see aggregate progress. No individual student data — only class-level mastery.",
    am: "የክፍል ኮድ ይፍጠሩ፣ የተጠቃለለ ሂደትን ይመልከቱ። ምንም የግል ተማሪ መረጃ የለም — የክፍል ደረጃ ችሎታ ብቻ።",
    om: "Koodii kilaasii uumi, adeemsa walitti qabame ilaali. Odeeffannoo dhuunfaa barataa hin jiru — ogummaa sadarkaa kilaasii qofa.",
  },
  "teacher.yourClasses": { en: "Your classes", am: "ክፍሎችዎ", om: "Kilaasota kee" },
  "teacher.err.load": { en: "Couldn't load your classes.", am: "ክፍሎችዎን መጫን አልተቻለም።", om: "Kilaasota kee fe'uun hin danda'amne." },
  "teacher.err.create": { en: "Couldn't create the class.", am: "ክፍሉን መፍጠር አልተቻለም።", om: "Kilaasii uumuun hin danda'amne." },
  "teacher.createClass": { en: "Create a class", am: "ክፍል ይፍጠሩ", om: "Kilaasii uumi" },
  "teacher.className": { en: "Class name", am: "የክፍል ስም", om: "Maqaa kilaasii" },
  "teacher.create": { en: "Create", am: "ይፍጠሩ", om: "Uumi" },
  "teacher.share": { en: "Share this code with students:", am: "ይህን ኮድ ለተማሪዎች ያጋሩ:", om: "Koodii kana barattootatti qoodi:" },
  "teacher.students": { en: "students", am: "ተማሪዎች", om: "barattoota" },
  "teacher.aggregateMastery": { en: "Class average mastery", am: "የክፍል አማካይ ችሎታ", om: "Giddu-galeessa ogummaa kilaasii" },
  "teacher.weakest": { en: "Weakest topics for this class", am: "የክፍሉ ደካማ ርዕሶች", om: "Mata-duree dadhabaa kilaasii kanaa" },
  "teacher.noClasses": { en: "No classes yet. Create one to get started.", am: "ገና ምንም ክፍል የለም። ለመጀመር አንዱን ይፍጠሩ።", om: "Hanga ammaatti kilaasiin hin jiru. Eegaluuf tokko uumi." },
  "teacher.noStudents": { en: "No students have joined yet. Share the code above.", am: "ገና ምንም ተማሪ አልገባም። ከላይ ያለውን ኮድ ያጋሩ።", om: "Hanga ammaatti barataan hin galmoofne. Koodii armaan olii qoodi." },

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
  "common.tryAgain": { en: "Try again", am: "እንደገና ይሞክሩ", om: "Irra deebi'ii yaali" },
  "lesson.nextLesson": { en: "Next lesson", am: "ቀጣይ ትምህርት", om: "Barnoota itti aanu" },

  "footer.demo": {
    en: "Free during pilot · feedback welcome",
    am: "በሙከራ ወቅት ነጻ · አስተያየት እንቀበላለን",
    om: "Yeroo yaaliitti bilisaa · yaada simatama",
  },
};

export function tr(key: keyof typeof t, locale: Locale): string {
  return t[key]?.[locale] ?? t[key]?.en ?? key;
}
