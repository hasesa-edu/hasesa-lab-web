export type Locale = "en" | "am" | "om";

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "am", label: "Amharic", native: "አማርኛ" },
  { code: "om", label: "Afaan Oromo", native: "Afaan Oromoo" },
];

type Dict = Record<string, { en: string; am: string; om: string }>;

export const t: Dict = {
  "nav.home": { en: "Home", am: "መነሻ", om: "Mana" },
  "nav.lessons": { en: "Lessons", am: "ትምህርቶች", om: "Barnoota" },
  "nav.tutor": { en: "AI Tutor", am: "የAI አስተማሪ", om: "Barsiisaa AI" },
  "nav.language": { en: "Language", am: "ቋንቋ", om: "Afaan" },

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
    am: "ሒሳብ፣ ፊዚክስ፣ ኬሚስትሪ፣ ባዮሎጂ — ከትምህርት ሚኒስቴር ሥርዓተ ትምህርትና ከEUEE ዕቅድ ጋር የተጣጣመ። ለዝቅተኛ የኢንተርኔት ፍጥነት Android የተዘጋጀ፣ በእንግሊዝኛ፣ አማርኛና ኦሮምኛ።",
    om: "Heerregaa, Fiiziksii, Keemistirii, Baayooloojii — sirna barnootaa MoE fi karoora EUEE waliin walsimataa. Android baandwidth gad-aanaaf, Afaan Ingiliffaa, Amaariffaa fi Afaan Oromootiin.",
  },
  "hero.cta.lessons": { en: "Browse lessons", am: "ትምህርቶችን ይመልከቱ", om: "Barnoota ilaali" },
  "hero.cta.chat": { en: "Try the AI tutor", am: "AI አስተማሪውን ይሞክሩ", om: "Barsiisaa AI yaali" },

  "feature.aligned.title": { en: "MoE & EUEE aligned", am: "ከMoE እና EUEE ጋር የተጣጣመ", om: "MoE fi EUEE waliin walsimataa" },
  "feature.aligned.body": {
    en: "Every lesson tagged to a syllabus code and exam-blueprint topic.",
    am: "እያንዳንዱ ትምህርት ከሥርዓተ ትምህርት ኮድና ከፈተና ዕቅድ ርዕስ ጋር የተሰየመ ነው።",
    om: "Barnoonni hundi koodii sirna barnootaa fi mata-duree karoora qormaataatti hidhameera.",
  },
  "feature.lang.title": { en: "Three languages", am: "ሦስት ቋንቋዎች", om: "Afaan sadii" },
  "feature.lang.body": {
    en: "English, Amharic, Afaan Oromo — switch any time.",
    am: "እንግሊዝኛ፣ አማርኛ፣ ኦሮምኛ — በማንኛውም ጊዜ ይቀይሩ።",
    om: "Ingiliffa, Amaariffaa, Afaan Oromoo — yeroo barbaaddan jijjiiraa.",
  },
  "feature.offline.title": { en: "Works on slow networks", am: "በዝግታ ኢንተርኔት ይሰራል", om: "Interneetii suuta deemu irratti hojjeta" },
  "feature.offline.body": {
    en: "Lightweight pages, offline-capable lesson packs (coming soon).",
    am: "ቀላል ገጾች፣ ከመስመር ውጭ የሚሰሩ የትምህርት ጥቅሎች (በቅርቡ የሚመጣ)።",
    om: "Fuulota salphaa, paakeejii barnoota kan offline (dhihootti dhufu).",
  },
  "feature.ai.title": { en: "Grounded AI tutor", am: "በትምህርቶች ላይ የተመሰረተ AI", om: "Barsiisaa AI barnoota irratti hundaa'e" },
  "feature.ai.body": {
    en: "Answers cite the lesson they come from, not random web content.",
    am: "መልሶች ከትምህርቱ ምንጭ ይጠቅሳሉ፣ ከዘፈቀደ የድር ይዘት አይደለም።",
    om: "Deebii barnoota irraa dhufan eeru, qabiyyee weebii kamuu irraa miti.",
  },

  "lessons.title": { en: "Grade 11 lessons", am: "የ11ኛ ክፍል ትምህርቶች", om: "Barnoota Kutaa 11" },
  "lessons.subtitle": {
    en: "Demo: 4 sample Physics lessons (Mechanics unit). Other subjects coming with curriculum review.",
    am: "ማሳያ፡ 4 የፊዚክስ ምሳሌ ትምህርቶች (ሜካኒክስ ክፍል)። ሌሎች ትምህርቶች በሥርዓተ ትምህርት ግምገማ ጋር ይመጣሉ።",
    om: "Agarsiisa: barnoota fakkeenyaa Fiiziksii 4 (boqonnaa Mekaanikisii). Saayinsiin kaan qorannoo sirna barnootaa waliin dhufu.",
  },
  "lessons.estimate": { en: "min", am: "ደቂቃ", om: "daq." },
  "lessons.code": { en: "MoE code", am: "የMoE ኮድ", om: "Koodii MoE" },
  "lessons.start": { en: "Open lesson", am: "ትምህርቱን ይክፈቱ", om: "Barnoota bani" },
  "lessons.back": { en: "← All lessons", am: "← ሁሉም ትምህርቶች", om: "← Barnoota hunda" },
  "lessons.askAbout": { en: "Ask the AI tutor about this lesson", am: "AI አስተማሪውን ስለዚህ ትምህርት ይጠይቁ", om: "Waa'ee barnoota kanaa barsiisaa AI gaafadhu" },

  "chat.title": { en: "AI Tutor", am: "AI አስተማሪ", om: "Barsiisaa AI" },
  "chat.subtitle": {
    en: "Ask anything about Grade 11 Math, Physics, Chemistry, or Biology.",
    am: "ስለ 11ኛ ክፍል ሒሳብ፣ ፊዚክስ፣ ኬሚስትሪ ወይም ባዮሎጂ ማንኛውንም ይጠይቁ።",
    om: "Waa'ee Heerregaa, Fiiziksii, Keemistirii, ykn Baayooloojii Kutaa 11 waan barbaaddan gaafadhaa.",
  },
  "chat.placeholder": {
    en: "e.g. Explain Newton's second law with an example",
    am: "ለምሳሌ፡ የኒውተንን ሁለተኛ ህግ በምሳሌ ያስረዱኝ",
    om: "fkn. Seera lammaffaa Niwutan fakkeenyaan ibsi",
  },
  "chat.send": { en: "Send", am: "ላክ", om: "Ergi" },
  "chat.thinking": { en: "Thinking…", am: "በማሰብ ላይ…", om: "Yaaduu jira…" },
  "chat.empty.title": { en: "How can I help you study?", am: "በትምህርትዎ እንዴት ልርዳዎት?", om: "Akkamiin si gargaaru?" },
  "chat.empty.body": {
    en: "Try one of the suggestions below, or type your own question.",
    am: "ከታች ካሉት ጥቆማዎች አንዱን ይሞክሩ፣ ወይም የራስዎን ጥያቄ ይተይቡ።",
    om: "Yaada gadii keessaa tokko yaali, ykn gaaffii kee mataa keetii barreessi.",
  },
  "chat.disclaimer": {
    en: "Demo build. AI can make mistakes — always check against your lesson.",
    am: "የማሳያ እትም። AI ስህተት ሊሰራ ይችላል — ሁልጊዜ ከትምህርቱ ጋር ያረጋግጡ።",
    om: "Hojjettoo agarsiisaa. AI dogoggora hojjechuu danda'a — yeroo hunda barnoota kee waliin mirkaneessi.",
  },
  "chat.error": {
    en: "Couldn't reach the AI service. Check the GROQ_API_KEY env var or try again.",
    am: "የAI አገልግሎቱን መድረስ አልተቻለም። GROQ_API_KEY env var ይመልከቱ ወይም እንደገና ይሞክሩ።",
    om: "Tajaajila AI argachuu hin dandeenye. GROQ_API_KEY mirkaneessi ykn ammas yaali.",
  },

  "footer.demo": {
    en: "Demo · not the production product · based on REQUIREMENTS.md v0.2",
    am: "ማሳያ · የምርት እትም አይደለም · በREQUIREMENTS.md v0.2 ላይ የተመሠረተ",
    om: "Agarsiisa · oomisha dhugaa miti · REQUIREMENTS.md v0.2 irratti hundaa'a",
  },
};

export function tr(key: keyof typeof t, locale: Locale): string {
  return t[key]?.[locale] ?? t[key]?.en ?? key;
}
