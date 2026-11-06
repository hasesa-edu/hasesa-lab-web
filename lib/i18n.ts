// English-only at this stage. Re-introduce { am: string; om: string } and
// extend Locale when Amharic / Afaan Oromo content is ready.
export type Locale = "en";

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
];

type Dict = Record<string, { en: string }>;

export const t: Dict = {
  // Nav
  "nav.home": { en: "Home" },
  "nav.experiments": { en: "Modules" },
  "nav.assistant": { en: "Lab Assistant" },
  "nav.dashboard": { en: "My dashboard" },
  "nav.guide": { en: "Student tracker" },
  "nav.signin": { en: "Continue with Google" },
  "nav.signup": { en: "Get started" },
  "nav.account": { en: "Account" },
  "nav.signout": { en: "Sign out" },
  "nav.language": { en: "Language" },

  // Hero
  "hero.tag": {
    en: "Reimagining Education for the AI Era",
  },
  "hero.title.a": { en: "Don't memorize." },
  "hero.title.b": { en: "Build it." },
  "hero.title.highlight": {
    en: "Learn by doing.",
  },
  "hero.sub": {
    en: "Hands-on modules at Hasesa Academy. Build a radio, control a robot claw with your muscles, catch food fakers. The science and maths come when the project needs them.",
  },
  "hero.cta.lessons": { en: "See the modules" },
  "hero.cta.sample": { en: "Try a free unit" },
  "hero.cta.signup": { en: "Sign up with Google" },
  "hero.cta.dashboard": { en: "Go to my dashboard" },
  "hero.note": { en: "↓ or try a real case right now" },

  // Can you solve it? (hero challenge)
  "solve.eyebrow": { en: "Case #2" },
  "solve.title": { en: "Can you solve it?" },
  "solve.check": { en: "Check" },
  "solve.solved": { en: "Solved" },
  "solve.wrong": { en: "Not quite." },
  "solve.tryAgain": { en: "Check your working and try again." },
  "solve.open": { en: "Open the whole case" },
  "solve.more": { en: "More problems like this" },

  // Landing: why
  "why.eyebrow": { en: "Why Hasesa" },
  "why.title": { en: "School was built for another era." },
  "why.sub": { en: "AI now handles much of the thinking work schools train for. What's left is what people bring: curiosity, judgment and the habit of figuring things out." },
  "why.then.label": { en: "What school builds today" },
  "why.then.1": { en: "One curriculum for everyone" },
  "why.then.2": { en: "Fixed schedules and one pace" },
  "why.then.3": { en: "Theory first, maybe practice later" },
  "why.then.4": { en: "Memorization and exams" },
  "why.now.label": { en: "What students will need" },
  "why.now.1": { en: "Curiosity, and the habit of feeding it" },
  "why.now.2": { en: "Learning by doing: experimenting, not memorizing" },
  "why.now.3": { en: "Their own path, at their own pace" },
  "why.now.4": { en: "Working with others, and with AI" },

  // Landing: marquee, how it works, showcase
  "landing.strip.label": { en: "What students do in our modules" },
  "how.eyebrow": { en: "How a module works" },
  "how.title": { en: "Start by doing. The theory follows." },
  "how.1.title": { en: "Meet the mystery" },
  "how.1.body": { en: "Every module opens with something that makes you curious: a radio with no battery, a claw that obeys your muscles." },
  "how.2.title": { en: "Build and investigate" },
  "how.2.body": { en: "At the Academy, with a guide, you test, build and measure, using real tools and local materials." },
  "how.3.title": { en: "Learn just enough" },
  "how.3.body": { en: "At home, read the concept units the project needs and solve real problems. Already know one? Test out." },
  "how.4.title": { en: "Finish and get signed off" },
  "how.4.body": { en: "Make it work, explain how, and your guide signs you off with a certificate." },
  "showcase.eyebrow": { en: "The modules" },
  "showcase.title": { en: "Pick a mystery" },
  "showcase.sub": { en: "Each one is about 10 hours, mixing physics, chemistry, biology, maths and technology." },
  "showcase.stat.modules": { en: "modules" },
  "showcase.stat.hours": { en: "hours each" },
  "showcase.stat.curriculum": { en: "curriculum topics" },
  "showcase.hours": { en: "hours" },
  "showcase.steps": { en: "steps" },
  "showcase.all": { en: "See every module" },

  // What you get at the Academy
  "pillars.eyebrow": { en: "At the Academy" },
  "pillars.title": { en: "Everything a module needs." },
  "pillars.sub": { en: "Hands-on work with a guide, theory at your own pace, and help whenever you're stuck." },
  "pillars.hands.title": { en: "Hands-on" },
  "pillars.hands.body": { en: "Build real things with real tools and local materials: a radio, a robot claw, a forensic lab." },
  "pillars.paths.title": { en: "Your own path" },
  "pillars.paths.body": { en: "Concept units you study at home, at your pace. Already know one? Test out and move on." },
  "pillars.guide.title": { en: "A guide" },
  "pillars.guide.body": { en: "A trained guide follows your progress, gives feedback and signs you off when your build works." },
  "pillars.together.title": { en: "Build together" },
  "pillars.together.body": { en: "Builds happen in groups at the Academy, so you learn from each other as much as from the steps." },
  "pillars.ai.title": { en: "AI support" },
  "pillars.ai.body": { en: "A lab assistant that knows the step you're on and gives hints, not answers." },
  "pillars.ai.mock.user": {
    en: "How long should my radio's antenna be for a 1000 kHz station?",
  },
  "pillars.ai.mock.assistant1": {
    en: "Start from the wavelength: divide the speed of light by the frequency. What do you get?",
  },
  "pillars.ai.mock.source": {
    en: "Grounded in Radio, step 4",
  },

  // For parents
  "parents.eyebrow": { en: "For parents" },
  "parents.title.a": { en: "Fun," },
  "parents.title.b": { en: "and it counts." },
  "parents.cert.mock": { en: "Certificate of completion" },
  "parents.sub": { en: "Every module connects to the national curriculum, so what your child builds here shows up again in class and in exams." },
  "parents.curriculum.title": { en: "curriculum topics, used for real" },
  "parents.curriculum.body": { en: "Each concept unit is tagged with where it appears in the school curriculum." },
  "parents.guide.title": { en: "A guide who follows every student" },
  "parents.guide.body": { en: "The guide sees what your child studied, where they stopped and how they scored, and steps in when they're stuck." },
  "parents.cert.title": { en: "A certificate for every module" },
  "parents.cert.body": { en: "Earned by making the build work and explaining how, not by sitting an exam." },

  // Partners
  "partners.eyebrow": { en: "Our pilot partners" },
  "partners.sb.tag": {
    en: "Science communication by researchers-in-training.",
  },
  "partners.mcs.tag": {
    en: "A school in Addis Ababa serving students at scale.",
  },

  // Dewey quote (lives in the Footer)
  "dewey.quote": {
    en: "Give the pupils something to do, not something to learn; and the doing is of such a nature as to demand thinking; learning naturally results.",
  },
  "dewey.attribution": {
    en: "John Dewey",
  },

  // CTA strip
  "cta.title.a": { en: "Ready to" },
  "cta.title.b": { en: "build something?" },
  "cta.enrol": { en: "Contact us to enrol" },
  "cta.sub": {
    en: "Sign up with Google to browse every module and try a concept unit. Enrol at the Academy to start building.",
  },

  // Chat (lab assistant)
  "chat.title": { en: "Lab Assistant" },
  "chat.subtitle": {
    en: "Stuck on a build or a problem? Pick what you're working on for better answers.",
  },
  "chat.placeholder": { en: "e.g. Why does my radio only pick up one station?" },
  "chat.send": { en: "Send" },
  "chat.thinking": { en: "Thinking…" },
  "chat.empty.title": { en: "How can I help with your module?" },
  "chat.empty.body": { en: "Pick the step or concept unit you're on for better answers, or just ask." },
  "chat.disclaimer": { en: "AI can make mistakes. Always follow the safety notes and your guide." },
  "chat.error": { en: "Couldn't reach the lab assistant. Try again." },
  "chat.pickLabel": { en: "Working on:" },
  "chat.pickNone": { en: "None (general question)" },
  "chat.viewExperiment": { en: "Open it" },
  "chat.newMessage": { en: "New message" },

  // Common
  "common.subjects": { en: "Subjects" },
  "common.loading": { en: "Loading…" },
  "common.signinRequired": { en: "Please sign in to continue." },
  "common.signinCTA": { en: "Sign in" },
  "common.tryAgain": { en: "Try again" },

  "footer.motto": {
    en: "Reimagining Education for the AI Era",
  },
  "footer.terms": { en: "Terms" },
  "footer.privacy": { en: "Privacy" },
};

export function tr(key: keyof typeof t, locale: Locale): string {
  return t[key]?.[locale] ?? t[key]?.en ?? key;
}
