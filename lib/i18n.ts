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
  "nav.experiments": { en: "Experiments" },
  "nav.assistant": { en: "Lab Assistant" },
  "nav.dashboard": { en: "My lab notebook" },
  "nav.settings": { en: "Grade & subjects" },
  "nav.signin": { en: "Sign in" },
  "nav.signup": { en: "Get started" },
  "nav.account": { en: "Account & billing" },
  "nav.signout": { en: "Sign out" },
  "nav.language": { en: "Language" },

  // Hero
  "hero.tag": {
    en: "Hands-on Learning",
  },
  "hero.title.before": {
    en: "Don't memorize. Do it.",
  },
  "hero.title.highlight": {
    en: "Learn your way.",
  },
  "hero.sub": {
    en: "An at-home experiment for every lesson, plus a tutor that learns at your pace.",
  },
  "hero.cta.lessons": { en: "Browse experiments" },
  "hero.cta.pricing": { en: "See pricing" },
  "hero.cta.signup": { en: "Continue with Google" },
  "hero.cta.dashboard": { en: "Go to my dashboard" },
  "hero.price": {
    en: "300 ETB / month",
  },
  "hero.price.note": {
    en: "Try 2 guides free. Pay with Telebirr, CBE Birr or card.",
  },
  "hero.video.alt": {
    en: "Short demo of the AI tutor answering a question with worked steps",
  },

  // Two pillars
  "pillars.eyebrow": {
    en: "Two things in every lesson",
  },
  "pillars.title": {
    en: "Two ways to make it stick.",
  },
  "pillars.exp.eyebrow": { en: "Hands-on" },
  "pillars.exp.title": {
    en: "An experiment you can hold",
  },
  "pillars.exp.body": {
    en: "Every topic ships with something tactile. Build a pH meter from red cabbage. Find a tree's height from its shadow. No fancy lab needed.",
  },
  "pillars.exp.mock.label": {
    en: "AT-HOME EXPERIMENT",
  },
  "pillars.exp.mock.title": {
    en: "Make a pH meter from red cabbage",
  },
  "pillars.exp.mock.step1": {
    en: "Boil red cabbage. Keep the purple water.",
  },
  "pillars.exp.mock.step2": {
    en: "Add a drop of lemon juice — it turns pink.",
  },
  "pillars.exp.mock.step3": {
    en: "Add baking soda — it turns blue.",
  },
  "pillars.ai.eyebrow": { en: "AI tutor" },
  "pillars.ai.title": {
    en: "A patient teacher, always on",
  },
  "pillars.ai.body": {
    en: "Stuck? Ask anytime. The tutor explains step by step, follows your textbook, and answers in your language.",
  },
  "pillars.ai.mock.user": {
    en: "Explain F = m·a like I'm 14.",
  },
  "pillars.ai.mock.assistant1": {
    en: "Push something heavier → it speeds up slower.",
  },
  "pillars.ai.mock.source": {
    en: "Grounded in your textbook",
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
    en: "— John Dewey",
  },

  // CTA strip
  "cta.title": { en: "Ready to start learning?" },
  "cta.sub": {
    en: "Sign in with Google in seconds, try two guides for free, and unlock everything for 300 ETB a month.",
  },

  // Pricing
  "pricing.eyebrow": { en: "Pricing" },
  "pricing.title": { en: "One simple pass" },
  "pricing.plan": { en: "Monthly pass" },
  "pricing.per": { en: "/ month" },
  "pricing.f.guides": { en: "Every step-by-step experiment guide, grades 9–12" },
  "pricing.f.videos": { en: "Demo videos and local-material substitutes" },
  "pricing.f.assistant": { en: "AI lab assistant, up to 30 questions a day" },
  "pricing.f.notebook": { en: "Your lab notebook: progress and observations" },
  "pricing.f.scientists": { en: "Guides reviewed by real scientists" },
  "pricing.pay": { en: "Pay with Telebirr, CBE Birr, M-Pesa or card through Chapa. Each payment adds 30 days. No auto-charge, renew when you want." },
  "pricing.cta": { en: "Get Hasesa" },
  "pricing.cta.renew": { en: "Add 30 more days" },
  "pricing.free": { en: "Try 2 free guides first" },
  "pricing.active": { en: "Your pass is active until" },

  // Experiments catalogue + guide
  "experiments.title": { en: "Experiments" },
  "experiments.subtitle": {
    en: "Hands-on biology, chemistry and physics for grades 9–12, using materials you can find at home or in the market. Each one has a step-by-step guide, a video, and a lab assistant to help when you get stuck.",
  },
  "experiments.grade": { en: "Grade" },
  "experiments.allGrades": { en: "All grades" },
  "experiments.allSubjects": { en: "All subjects" },
  "experiments.filter.grade": { en: "Filter by grade" },
  "experiments.filter.subject": { en: "Filter by subject" },
  "experiments.none": { en: "No experiments match these filters yet." },
  "experiments.minutes": { en: "min" },
  "experiments.easy": { en: "Easy" },
  "experiments.medium": { en: "Medium" },
  "experiments.reviewedBy": { en: "Reviewed by" },
  "experiments.free": { en: "Free sample" },
  "experiments.locked": { en: "Subscribers" },
  "experiments.badge.video": { en: "Video" },
  "experiments.badge.materials": { en: "materials" },
  "experiments.badge.done": { en: "Done" },
  "experiments.badge.started": { en: "In progress" },
  "experiments.back": { en: "← All experiments" },
  "experiments.notFound": { en: "Experiment not found." },
  "experiments.nav.previous": { en: "Previous" },
  "experiments.nav.next": { en: "Next" },
  "experiments.nav.between": { en: "Between experiments" },

  // Chat (lab assistant)
  "chat.title": { en: "Lab Assistant" },
  "chat.subtitle": {
    en: "Stuck on an experiment, or not sure why it worked? Ask about grade 9–12 biology, chemistry or physics.",
  },
  "chat.placeholder": { en: "e.g. Why did my cabbage indicator turn green?" },
  "chat.send": { en: "Send" },
  "chat.thinking": { en: "Thinking…" },
  "chat.empty.title": { en: "How can I help with your experiment?" },
  "chat.empty.body": { en: "Pick the experiment you're doing for better answers, or just ask." },
  "chat.disclaimer": { en: "AI can make mistakes. Always follow the safety notes in the guide." },
  "chat.error": { en: "Couldn't reach the lab assistant. Try again." },
  "chat.pickLabel": { en: "Experiment:" },
  "chat.pickNone": { en: "None (general question)" },
  "chat.viewExperiment": { en: "Open guide" },
  "chat.newMessage": { en: "New message" },

  // Onboarding
  "onboard.welcome": { en: "Welcome — let's set up your lab." },
  "onboard.pickGrade": { en: "Which grade are you in?" },
  "onboard.pickSubjects": { en: "Which subjects do you want to experiment with?" },
  "onboard.continue": { en: "Save" },
  "onboard.done.title": { en: "All set!" },
  "onboard.done.body": { en: "Your lab notebook is ready. Pick an experiment to begin." },

  // Lab notebook (dashboard)
  "dash.title": { en: "My lab notebook" },
  "dash.greeting": { en: "Hello" },
  "dash.stat.done": { en: "Done" },
  "dash.stat.inProgress": { en: "In progress" },
  "dash.stat.total": { en: "Available" },
  "dash.inProgress": { en: "Pick up where you left off" },
  "dash.continue": { en: "Continue" },
  "dash.next": { en: "Try next" },
  "dash.nextWhyNew": { en: "Picked for your grade and subjects." },
  "dash.nextWhy": { en: "Experiments you haven't tried yet, for your grade and subjects." },
  "dash.start": { en: "Start" },
  "dash.allDone": { en: "You've tried every experiment we have so far. More are coming!" },
  "dash.completed": { en: "Completed experiments" },
  "dash.noCompleted": { en: "Nothing here yet. Finish an experiment and mark it as done to save it here." },
  "dash.noNotes": { en: "No observations recorded." },
  "dash.browse": { en: "Browse all experiments" },
  "dash.askAssistant": { en: "Ask the lab assistant" },

  // Notebook card on the experiment page
  "notebook.cardTitle": { en: "Your lab notebook" },
  "notebook.prompt": { en: "What did you observe? Write down your results, measurements, and anything surprising." },
  "notebook.placeholder": { en: "e.g. The lemon juice turned the indicator bright pink…" },
  "notebook.saveNotes": { en: "Save notes" },
  "notebook.markDone": { en: "Mark as done" },
  "notebook.markNotDone": { en: "Mark as not done" },
  "notebook.saved": { en: "Saved." },
  "notebook.markedDone": { en: "Nice work — saved to your notebook." },
  "notebook.saveError": { en: "Couldn't save. Try again." },
  "notebook.signinPrompt": { en: "Sign in to save your observations and track the experiments you've done." },

  // Experiment video
  "video.credit": { en: "Video by" },
  "exp.video": { en: "Watch the demo" },
  "exp.videoSoon": { en: "Video coming soon" },
  "exp.videoSoonBody": { en: "We're recording a demo for this experiment. Until then, follow the step-by-step guide below." },

  // Why this matters
  "why.label": { en: "Why this matters" },

  // Experiment guide TOC
  "toc.why": { en: "Why" },
  "toc.video": { en: "Video" },
  "toc.concept": { en: "Concept" },
  "toc.materials": { en: "Materials" },
  "toc.safety": { en: "Safety" },
  "toc.steps": { en: "Steps" },
  "toc.results": { en: "Results" },
  "toc.troubleshooting": { en: "Troubleshooting" },
  "toc.check": { en: "Check" },
  "toc.notebook": { en: "Notebook" },

  // Experiment guide sections
  "exp.concept": { en: "The science" },
  "exp.materials": { en: "You'll need" },
  "exp.safety": { en: "Safety first" },
  "exp.steps": { en: "Step by step" },
  "exp.step": { en: "Step" },
  "exp.stepsDone": { en: "done" },
  "exp.observe": { en: "What you should see" },
  "exp.explanation": { en: "Why it happens" },
  "exp.troubleshooting": { en: "Didn't work? Try this" },
  "exp.stillStuck": { en: "Still stuck?" },
  "exp.askAssistant": { en: "Ask the lab assistant" },
  "exp.askAbout": { en: "Ask the lab assistant about this experiment" },

  // Concept check
  "quiz.check": { en: "Check your understanding" },
  "quiz.correct": { en: "Correct." },
  "quiz.incorrect": { en: "Not quite." },
  "quiz.tryAgain": { en: "Try again" },

  // Common
  "common.subjects": { en: "Subjects" },
  "common.loading": { en: "Loading…" },
  "common.signinRequired": { en: "Please sign in to continue." },
  "common.signinCTA": { en: "Sign in" },
  "common.tryAgain": { en: "Try again" },

  "footer.motto": {
    en: "Hands-on Learning",
  },
  "footer.terms": { en: "Terms" },
  "footer.privacy": { en: "Privacy" },
  "footer.refund": { en: "Refunds" },
};

export function tr(key: keyof typeof t, locale: Locale): string {
  return t[key]?.[locale] ?? t[key]?.en ?? key;
}
