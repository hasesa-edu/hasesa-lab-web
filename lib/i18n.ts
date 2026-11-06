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
    en: "Hasesa Academy is hands-on science for teenagers. Every module starts with a mystery and ends with something you built. Turn the dial to hear one.",
  },
  "hero.cta.lessons": { en: "See the modules" },
  "hero.cta.sample": { en: "Try a free unit" },
  "hero.cta.signup": { en: "Sign up with Google" },
  "hero.cta.dashboard": { en: "Go to my dashboard" },

  // Can you solve it? (hero challenge)
  "solve.eyebrow": { en: "A real case from" },
  "solve.title": { en: "Can you solve it?" },
  "solve.check": { en: "Check" },
  "solve.solved": { en: "Solved" },
  "solve.wrong": { en: "Not quite." },
  "solve.tryAgain": { en: "Check your working and try again." },
  "solve.open": { en: "Open the whole case" },
  "solve.more": { en: "More problems like this" },

  // Landing: why — the deck's story in three beats, for students and parents
  "why.then.label": { en: "Then" },
  "why.then.line": { en: "School was built for factories." },
  "why.then.body": { en: "Same lessons, same pace and the same exam for everyone. Memorize it, write it down, move on." },
  "why.now.label": { en: "Now" },
  "why.now.line": { en: "AI can recall it faster than you." },
  "why.now.body": { en: "Any phone can recite a formula or define density in a second. Remembering facts is no longer what makes you stand out." },
  "why.next.label": { en: "Next" },
  "why.next.line": { en: "So learn what AI can't do for you." },
  "why.next.body": { en: "Get curious, build things, test them, work out why they failed and fix them, together with other people. That's what every Hasesa module trains." },

  // Landing: marquee, how it works, showcase
  "how.title": { en: "Start by doing. The theory follows." },
  "how.1.title": { en: "Meet the mystery" },
  "how.1.body": { en: "Every module opens with something that makes you curious: a radio with no battery, a claw that obeys your muscles." },
  "how.2.title": { en: "Build and investigate" },
  "how.2.body": { en: "At the Academy, with a guide, you test, build and measure, using real tools and local materials." },
  "how.3.title": { en: "Learn just enough" },
  "how.3.body": { en: "At home, read the concept units the project needs and solve real problems. Already know one? Test out." },
  "how.4.title": { en: "Finish and get signed off" },
  "how.4.body": { en: "Make it work, explain how, and your guide signs you off with a certificate." },
  "showcase.title": { en: "Three mysteries, on air now" },
  "showcase.sub": { en: "Each one is about 10 hours, mixing physics, chemistry, biology, maths and technology." },
  "showcase.hours": { en: "hours" },
  "showcase.steps": { en: "steps" },
  "showcase.all": { en: "See every module" },

  // What you get at the Academy
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

  // For parents
  "parents.title": { en: "Fun, and it counts." },
  "parents.sub": { en: "Every module connects to the national curriculum, so what your child builds here shows up again in class and in exams." },
  "parents.curriculum.title": { en: "curriculum topics, used for real" },
  "parents.curriculum.body": { en: "Each concept unit is tagged with where it appears in the school curriculum." },
  "parents.guide.title": { en: "A guide who follows every student" },
  "parents.guide.body": { en: "The guide sees what your child studied, where they stopped and how they scored, and steps in when they're stuck." },
  "parents.cert.title": { en: "A certificate for every module" },
  "parents.cert.body": { en: "Earned by making the build work and explaining how, not by sitting an exam." },

  // Partners
  "partners.eyebrow": { en: "Piloted with" },
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
