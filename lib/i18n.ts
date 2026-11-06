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
  "hero.title.before": {
    en: "Don't memorize. Build it.",
  },
  "hero.title.highlight": {
    en: "Learn by doing.",
  },
  "hero.sub": {
    en: "Hands-on modules at Hasesa Academy. Build a radio, control a robot claw with your muscles, catch food fakers. The science and maths come when the project needs them.",
  },
  "hero.cta.lessons": { en: "See the modules" },
  "hero.cta.signup": { en: "Sign up with Google" },
  "hero.cta.dashboard": { en: "Go to my dashboard" },
  "hero.free": {
    en: "Browse free",
  },
  "hero.free.note": {
    en: "Try a concept unit from every module. Enrol at the Academy to start building.",
  },
  "hero.video.alt": {
    en: "Short demo of the AI lab assistant answering a question with worked steps",
  },

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

  // Two pillars
  "pillars.exp.mock.label": {
    en: "MARKET DETECTIVE · STEP 2",
  },
  "pillars.exp.mock.title": {
    en: "Is this honey real?",
  },
  "pillars.exp.mock.step1": {
    en: "Weigh 10 mL of each honey sample.",
  },
  "pillars.exp.mock.step2": {
    en: "Work out the density: mass ÷ volume.",
  },
  "pillars.exp.mock.step3": {
    en: "Lower density than real honey? Someone added water or syrup.",
  },
  "pillars.ai.eyebrow": { en: "AI lab assistant" },
  "pillars.ai.title": {
    en: "A patient helper that knows your module",
  },
  "pillars.ai.body": {
    en: "Stuck on a build or a problem at home? The assistant knows the step you're on and the theory behind it, and gives hints instead of answers.",
  },
  "pillars.ai.mock.user": {
    en: "How long should my radio's antenna be for a 1000 kHz station?",
  },
  "pillars.ai.mock.assistant1": {
    en: "Start from the wavelength: divide the speed of light by the frequency. What do you get?",
  },
  "pillars.ai.mock.source": {
    en: "Grounded in Radio, step 4",
  },

  // Partners
  "partners.eyebrow": { en: "Our partners" },
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
  "cta.title": { en: "Ready to build something?" },
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
