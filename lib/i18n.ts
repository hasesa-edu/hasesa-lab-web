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
  "nav.academy": { en: "Academy" },
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
    en: "Hands-on science for teenagers. Every module starts with a mystery and ends with something you built or solved. Turn the dial to hear one.",
  },
  "hero.cta.lessons": { en: "See the modules" },
  "academy.eyebrow": { en: "Hasesa Academy · our first program" },
  "hero.cta.sample": { en: "Try a free unit" },
  "hero.cta.signup": { en: "Sign up with Google" },
  "hero.cta.dashboard": { en: "Go to my dashboard" },

  // Mono section labels on the marketing pages ("01 — Why now")
  "label.why": { en: "Why now" },
  "label.exploring": { en: "What we're exploring" },
  "label.how": { en: "How we work" },
  "label.program": { en: "Our first program" },
  "label.modules": { en: "On air now" },
  "label.method": { en: "How a module works" },
  "label.parents": { en: "For parents" },
  "label.solve": { en: "Try one" },

  // Hasesa home page (/): the organisation, its thesis and what it is exploring
  "home.eyebrow": { en: "Hasesa means exploration" },
  "home.title": { en: "Education for the world of tomorrow." },
  "home.sub": {
    en: "AI is changing work, economies and society, and perhaps what it means to be human. We can't keep educating students for the world of yesterday. Hasesa is exploring an education system built for the AI era, and testing it with real students.",
  },
  "home.cta.academy": { en: "Visit the Academy" },
  "home.cta.exploring": { en: "What we're exploring" },

  "home.exploring.title": { en: "We don't have all the answers yet." },
  "home.exploring.sub": {
    en: "These are the questions we're working on, and what we're trying at the Academy to answer them.",
  },
  "home.status.testing": { en: "Testing" },
  "home.status.open": { en: "Open" },
  "home.q.graduate.title": { en: "What should a graduate be able to do?" },
  "home.q.graduate.body": { en: "The abilities that matter when AI can recall any fact. This is the question every other answer depends on." },
  "home.q.learning.title": { en: "How should learning happen?" },
  "home.q.learning.body": { en: "Start by making something real, and learn the theory when the work needs it." },
  "home.q.teacher.title": { en: "What is the teacher's role?" },
  "home.q.teacher.body": { en: "A guide who runs the builds, follows every student and steps in when they're stuck." },
  "home.q.ai.title": { en: "What role should AI play?" },
  "home.q.ai.body": { en: "An assistant that knows the page a student is on and gives hints, not answers." },
  "home.q.cost.title": { en: "Can any school afford it?" },
  "home.q.cost.body": { en: "Builds use cheap, locally available materials instead of lab equipment." },
  "home.q.evidence.title": { en: "How do we know it works?" },
  "home.q.evidence.body": { en: "The Academy pilot runs to the end of 2027. We'll share what worked and what didn't." },

  "home.how.title": { en: "We explore by building." },
  "home.how.1.title": { en: "Try it with real students" },
  "home.how.1.body": { en: "New ways of learning start as programs that students actually attend, not as papers." },
  "home.how.2.title": { en: "Keep what works" },
  "home.how.2.body": { en: "We watch closely, measure what students learn and change what doesn't work." },
  "home.how.3.title": { en: "Bring it to schools" },
  "home.how.3.body": { en: "What works is packaged so other schools and teachers can run it, in Ethiopia and beyond." },

  "home.programs.eyebrow": { en: "Our first program" },
  "home.programs.academy.title": { en: "Hasesa Academy" },
  "home.programs.academy.body": {
    en: "Hands-on science for teenagers. Students build a radio, control a robot claw with their muscles and catch food fakers, and learn the theory when the project needs it.",
  },
  "home.programs.academy.status": { en: "Pilot running" },
  "home.programs.academy.cta": { en: "Explore the Academy" },


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
  "why.then.line": { en: "School was built to pass on knowledge." },
  "why.then.body": { en: "Same lessons, same pace and the same exam for everyone. Memorize it, write it down, move on." },
  "why.now.label": { en: "Now" },
  "why.now.line": { en: "AI can recall it faster than you." },
  "why.now.body": { en: "Any phone can recite a formula or define density in a second. Remembering facts is no longer what makes you stand out." },
  "why.next.label": { en: "Next" },
  "why.next.line": { en: "So learn what AI can't do for you." },
  "why.next.body": { en: "Get curious, build things, test them, work out why they failed and fix them, together with other people. Hasesa is exploring what an education built around that looks like." },

  // Landing: marquee, how it works, showcase
  "how.title": { en: "Start by doing. The theory follows." },
  "how.1.title": { en: "Meet the mystery" },
  "how.1.body": { en: "Every module opens with something that makes you curious: a radio with no battery, a claw that obeys your muscles." },
  "how.2.title": { en: "Build and investigate" },
  "how.2.body": { en: "At the Academy, in small groups with a guide, you test, build and measure, using real tools and local materials." },
  "how.3.title": { en: "Learn just enough" },
  "how.3.body": { en: "At home, read the concept units the project needs and solve real problems, with a lab assistant that gives hints, not answers. Already know one? Test out." },
  "how.4.title": { en: "Finish and get signed off" },
  "how.4.body": { en: "Make it work, explain how, and your guide signs you off with a certificate." },
  "showcase.title": { en: "Three mysteries, on air now" },
  "showcase.sub": { en: "Each one is about 10 hours, mixing physics, chemistry, biology, maths and technology." },
  "showcase.hours": { en: "hours" },
  "showcase.steps": { en: "steps" },
  "showcase.all": { en: "See every module" },


  // For parents
  "parents.title": { en: "Fun, and it counts." },
  "parents.sub": { en: "Every module is mapped to the national curriculum (a draft that subject teachers are checking), so what your child builds connects to what they study in class." },
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

  // Dewey quote (pull quote in the Academy's "How a module works")
  "dewey.quote": {
    en: "Give the pupils something to do, not something to learn; and the doing is of such a nature as to demand thinking; learning naturally results.",
  },
  "dewey.attribution": {
    en: "John Dewey",
  },

  // CTA strip
  "cta.title": { en: "Ready to build something?" },
  "cta.sub": {
    en: "Sign up with Google. It's free during the pilot and opens every module, concept unit and the lab assistant.",
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
  "footer.contact.title": { en: "Across Ethiopia and beyond." },
  "footer.contact.body": {
    en: "Our goal is an education system that schools everywhere can use. If you run a school, teach, or want to support this work, we'd like to hear from you.",
  },
  "footer.contact.cta": { en: "Get in touch" },
  "footer.terms": { en: "Terms" },
  "footer.privacy": { en: "Privacy" },
};

export function tr(key: keyof typeof t, locale: Locale): string {
  return t[key]?.[locale] ?? t[key]?.en ?? key;
}
