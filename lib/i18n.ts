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
  "nav.tutor": { en: "Tutor", am: "አስተማሪ", om: "Barsiisaa" },
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
  "hero.title.before": {
    en: "Don't memorize. Do it.",
    am: "አታስታውሱ። ይስሩት።",
    om: "Hin yaadatiin. Hojjedhu.",
  },
  "hero.title.highlight": {
    en: "Learn your way.",
    am: "በራስዎ መንገድ ይማሩ።",
    om: "Karaa keetiin baradhu.",
  },
  "hero.sub": {
    en: "An at-home experiment for every lesson, plus a tutor that learns at your pace.",
    am: "ለእያንዳንዱ ትምህርት በቤት የሚሰራ ሙከራ፣ ከእርስዎ ፍጥነት ጋር የሚማር አስተማሪ።",
    om: "Barnoota tokkoo tokkoof shaakala mana keessatti, fi barsiisaa saffisa keetiin baratu.",
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
  "hero.pilot.note": {
    en: "Create a free account in under a minute. No SMS needed.",
    am: "በደቂቃ ውስጥ የነጻ መለያ ይፍጠሩ። SMS አያስፈልግም።",
    om: "Daqiiqaa tokko keessatti akaawuntii bilisaa uumi. SMS hin barbaachisu.",
  },
  "hero.video.alt": {
    en: "Short demo of the AI tutor answering a question with worked steps",
    am: "AI አስተማሪው ጥያቄን ደረጃ-በ-ደረጃ ሲመልስ የሚያሳይ አጭር ማሳያ",
    om: "Agarsiisa gabaabaa barsiisaa AI gaaffii tarkaanfii-tarkaanfiin deebisuu",
  },

  // Two pillars
  "pillars.eyebrow": {
    en: "Two things in every lesson",
    am: "በእያንዳንዱ ትምህርት ሁለት ነገሮች",
    om: "Barnoota hunda keessa wantoota lama",
  },
  "pillars.title": {
    en: "Two ways to make it stick.",
    am: "ትምህርቱ እንዲቆይ ሁለት መንገዶች።",
    om: "Karaa lama barnoonni si bira akka turuuf.",
  },
  "pillars.exp.eyebrow": { en: "Hands-on", am: "በተግባር", om: "Hojiidhaan" },
  "pillars.exp.title": {
    en: "An experiment you can hold",
    am: "በእጅዎ መያዝ የሚችሉት ሙከራ",
    om: "Shaakala harkaan qabattu",
  },
  "pillars.exp.body": {
    en: "Every topic ships with something tactile. Build a pH meter from red cabbage. Find a tree's height from its shadow. No fancy lab needed.",
    am: "እያንዳንዱ ርዕስ በቤት የሚሰራ ነገር አለው። ከቀይ ጎመን የpH መለኪያ ይገንቡ። ከዛፍ ጥላ የዛፉን ርዝመት ይፈልጉ። ውድ ላብራቶሪ አያስፈልግም።",
    om: "Mata-dureen hundi waan harkaan tuqamuu danda'u wajjin dhufa. Cuunfaa raafuu diimaa irraa madaala pH ijaari. Gaaddidduu mukaa irraa dheerina muka argadhu. Laaboraatoorii gatii guddaa hin barbaachisu.",
  },
  "pillars.exp.mock.label": {
    en: "AT-HOME EXPERIMENT",
    am: "በቤት የሚሰራ ሙከራ",
    om: "SHAAKALA MANA KEESSATTI",
  },
  "pillars.exp.mock.title": {
    en: "Make a pH meter from red cabbage",
    am: "ከቀይ ጎመን የpH መለኪያ ይስሩ",
    om: "Raafuu diimaa irraa madaala pH hojjedhu",
  },
  "pillars.exp.mock.step1": {
    en: "Boil red cabbage. Keep the purple water.",
    am: "ቀይ ጎመንን አፍልተው የሐምራዊውን ውሃ ይያዙ።",
    om: "Raafuu diimaa danfisi. Bishaan diimaa eegi.",
  },
  "pillars.exp.mock.step2": {
    en: "Add a drop of lemon juice — it turns pink.",
    am: "የሎሚ ጭማቂ ይጨምሩ — ሮዝ ይሆናል።",
    om: "Cuunfaa loomii dhibba tokko itti dabali — diimaa magariisa ta'a.",
  },
  "pillars.exp.mock.step3": {
    en: "Add baking soda — it turns blue.",
    am: "ቤኪንግ ሶዳ ይጨምሩ — ሰማያዊ ይሆናል።",
    om: "Beekiing sooda itti dabali — cuquliisa ta'a.",
  },
  "pillars.ai.eyebrow": { en: "AI tutor", am: "AI አስተማሪ", om: "Barsiisaa AI" },
  "pillars.ai.title": {
    en: "A patient teacher, always on",
    am: "ሁልጊዜ የሚገኝ ትዕግስተኛ መምህር",
    om: "Barsiisaa obsaa, yeroo hunda jiru",
  },
  "pillars.ai.body": {
    en: "Stuck? Ask anytime. The tutor explains step by step, follows your textbook, and answers in your language.",
    am: "ተቸግረዋል? በማንኛውም ጊዜ ይጠይቁ። አስተማሪው ደረጃ-በ-ደረጃ ያስረዳል፣ መጽሐፍዎን ይከተላል፣ በቋንቋዎ ይመልሳል።",
    om: "Rakkoo qabda? Yeroo barbaadde gaafadhu. Barsiisichi tarkaanfii-tarkaanfiin ibsa, kitaaba kee hordofa, afaan keetiin deebii kenna.",
  },
  "pillars.ai.mock.user": {
    en: "Explain F = m·a like I'm 14.",
    am: "F = m·a እንደ 14 ዓመት ለሆነ ያስረዱኝ።",
    om: "F = m·a akka nama waggaa 14 naaf ibsi.",
  },
  "pillars.ai.mock.assistant1": {
    en: "Push something heavier → it speeds up slower.",
    am: "ከባድ ነገር ይግፉ → ቀስ ብሎ ይፈጥናል።",
    om: "Waan ulfaataa dhiibi → suuta saffisa.",
  },
  "pillars.ai.mock.source": {
    en: "Grounded in your textbook",
    am: "በመጽሐፍዎ ላይ የተመሰረተ",
    om: "Kitaaba kee irratti hundaa'e",
  },

  // Partners
  "partners.eyebrow": { en: "Our partners", am: "የእኛ አጋሮች", om: "Hiriyoota keenya" },
  "partners.sb.tag": {
    en: "Science communication by researchers-in-training.",
    am: "በምርምር ላይ ባሉ ተመራማሪዎች የሳይንስ ግንኙነት።",
    om: "Qunnamtii saayinsii qorattoota leenji'aa jiraniin.",
  },
  "partners.mcs.tag": {
    en: "A school in Addis Ababa serving students at scale.",
    am: "በብዙ ተማሪዎች የሚያገለግል በአዲስ አበባ የሚገኝ ትምህርት ቤት።",
    om: "Manni barumsaa Finfinneetti barattoota baay'eef tajaajilu.",
  },

  // Dewey quote (lives in the Footer)
  "dewey.quote": {
    en: "Give the pupils something to do, not something to learn; and the doing is of such a nature as to demand thinking; learning naturally results.",
    am: "ለተማሪዎች የሚሰሩትን ይስጡ፣ የሚማሩትን አይደለም፤ መሥራቱም ማሰብን የሚጠይቅ ስለሆነ መማር በተፈጥሮ ይከሰታል።",
    om: "Barattootaaf waan hojjetan kennaa, waan baratan miti፤ hojjechuun isaa yaaduu waan barbaaduuf, barachuun uumamaan dhufa.",
  },
  "dewey.attribution": {
    en: "— John Dewey",
    am: "— ጆን ዲዊ",
    om: "— John Dewey",
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
  "lessons.nav.previous": { en: "Previous", am: "ቀዳሚ", om: "Kan dura" },
  "lessons.nav.next": { en: "Next", am: "ቀጣይ", om: "Kan itti aanu" },
  "lessons.nav.between": { en: "Between lessons", am: "በትምህርቶች መካከል", om: "Barnootota gidduu" },
  "lessons.notFound": { en: "Lesson not found.", am: "ትምህርቱ አልተገኘም።", om: "Barnootichi hin argamne." },
  "lessons.badge.video": { en: "Video", am: "ቪዲዮ", om: "Vidiyoo" },
  "lessons.badge.videoTitle": { en: "Video lesson included", am: "የቪዲዮ ትምህርት ይዟል", om: "Barnoota vidiyoo qaba" },
  "lessons.badge.experiment": { en: "Experiment", am: "ሙከራ", om: "Shaakala" },
  "lessons.badge.experimentTitle": { en: "At-home experiment included", am: "በቤት የሚሰራ ሙከራ ይዟል", om: "Shaakala mana keessatti hojjetamu qaba" },
  "lessons.badge.quiz": { en: "quiz", am: "ፈተና", om: "qormaata" },
  "lessons.badge.quizTitle": { en: "quick-check questions", am: "ፈጣን ፈተና ጥያቄዎች", om: "gaaffilee sakatta'a saffisaa" },
  "exp.label": { en: "At-home experiment", am: "በቤት የሚሰራ ሙከራ", om: "Shaakala mana keessatti" },

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
