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
  "nav.lessons": { en: "Lessons" },
  "nav.tutor": { en: "Tutor" },
  "nav.dashboard": { en: "My progress" },
  "nav.teacher": { en: "Teacher" },
  "nav.signin": { en: "Sign in" },
  "nav.signup": { en: "Sign up" },
  "nav.signout": { en: "Sign out" },
  "nav.language": { en: "Language" },

  // Hero
  "hero.tag": {
    en: "Quality Education for Ethiopian High Schools",
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
  "hero.cta.lessons": { en: "Browse lessons" },
  "hero.cta.chat": { en: "Try the AI tutor" },
  "hero.cta.signup": { en: "Get started" },
  "hero.cta.dashboard": { en: "Go to my dashboard" },
  "hero.pilot": {
    en: "Free during pilot",
  },
  "hero.pilot.note": {
    en: "Create a free account in under a minute. No SMS needed.",
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
    en: "Create a free pilot account in under a minute. No SMS required.",
  },

  // Lessons
  "lessons.title": { en: "Lessons" },
  "lessons.subtitle": {
    en: "Grade 11 Math, Physics, Chemistry, and Biology — our demo content. Each lesson includes a video, worked example, an at-home experiment, and a quick quiz.",
  },
  "lessons.all": { en: "All subjects" },
  "lessons.estimate": { en: "min" },
  "lessons.code": { en: "MoE code" },
  "lessons.start": { en: "Open lesson" },
  "lessons.back": { en: "← All lessons" },
  "lessons.askAbout": { en: "Ask the AI tutor about this lesson" },
  "lessons.nav.previous": { en: "Previous" },
  "lessons.nav.next": { en: "Next" },
  "lessons.nav.between": { en: "Between lessons" },
  "lessons.notFound": { en: "Lesson not found." },
  "lessons.badge.video": { en: "Video" },
  "lessons.badge.videoTitle": { en: "Video lesson included" },
  "lessons.badge.experiment": { en: "Experiment" },
  "lessons.badge.experimentTitle": { en: "At-home experiment included" },
  "lessons.badge.quiz": { en: "quiz" },
  "lessons.badge.quizTitle": { en: "quick-check questions" },
  "exp.label": { en: "At-home experiment" },

  // Chat
  "chat.title": { en: "AI Tutor" },
  "chat.subtitle": { en: "Ask anything about Grade 11 Math, Physics, Chemistry, or Biology." },
  "chat.placeholder": { en: "e.g. Explain Newton's second law with an example" },
  "chat.send": { en: "Send" },
  "chat.thinking": { en: "Thinking…" },
  "chat.empty.title": { en: "How can I help you study?" },
  "chat.empty.body": { en: "Try one of the suggestions below, or type your own question." },
  "chat.disclaimer": { en: "Demo build. AI can make mistakes — always check against your lesson." },
  "chat.error": { en: "Couldn't reach the AI service. Try again." },
  "chat.grounded": { en: "Grounded in" },
  "chat.viewLesson": { en: "view" },
  "chat.newMessage": { en: "New message" },

  // Auth
  "auth.signin.title": { en: "Sign in" },
  "auth.signup.title": { en: "Create your account" },
  "auth.signup.tagline": { en: "Free to get started. No SMS required." },
  "auth.username": { en: "Username" },
  "auth.email": { en: "Email" },
  "auth.displayName": { en: "Display name (optional)" },
  "auth.password": { en: "Password" },
  "auth.passwordRule": { en: "Minimum 6 characters." },
  "auth.role": { en: "I am a…" },
  "auth.role.student": { en: "Student" },
  "auth.role.teacher": { en: "Teacher" },
  "auth.region": { en: "Region (optional)" },
  "auth.school": { en: "School (optional)" },
  "auth.under18": {
    en: "I am under 18. (We'll show a simplified privacy notice.)",
  },
  "auth.under18.notice": {
    en: "We collect only your email, language, and learning progress. Demo notice — a production version would meet Ethiopia's data protection guidelines.",
  },
  "auth.privacy": {
    en: "Demo accounts are stored only in your browser (localStorage). No real password hashing or server storage in this demo — do not use a real password.",
  },
  "auth.err.signup": { en: "Sign-up failed. Try again." },
  "auth.signin.cta": { en: "Sign in" },
  "auth.signup.cta": { en: "Create account" },
  "auth.signin.alt": { en: "Already have an account?" },
  "auth.signup.alt": { en: "Don't have one yet?" },
  "auth.err.takenUsername": { en: "That username is already taken." },
  "auth.err.wrong": { en: "Wrong username or password." },
  "auth.err.required": { en: "Username and password are required." },

  // Onboarding
  "onboard.welcome": { en: "Welcome — let's set up your study plan." },
  "onboard.pickSubjects": { en: "Which subjects do you want to study?" },
  "onboard.continue": { en: "Continue" },
  "onboard.diag.title": { en: "Quick diagnostic" },
  "onboard.diag.intro": {
    en: "Two short questions per subject. Don't worry about getting them right — this just tells us where to start you.",
  },
  "onboard.diag.skip": { en: "Skip" },
  "onboard.finish": { en: "Finish onboarding" },
  "onboard.done.title": { en: "All set!" },
  "onboard.done.body": { en: "Your dashboard is ready. Pick a recommended lesson to begin." },

  // Dashboard
  "dash.title": { en: "My progress" },
  "dash.greeting": { en: "Hello" },
  "dash.recommended": { en: "Recommended for you" },
  "dash.recommendedWhy": { en: "Picked from the topics you've struggled with most." },
  "dash.mastery": { en: "Mastery by topic" },
  "dash.weak": { en: "Weakest topics" },
  "dash.takeMock": { en: "Take a practice exam" },
  "dash.noActivity": { en: "No activity yet. Start a lesson!" },
  "dash.recommendedWhyNew": {
    en: "Start here — based on the subjects you picked.",
  },

  // Mock test
  "mock.title": { en: "Practice exam" },
  "mock.intro": { en: "10 mixed-topic questions from this subject — EUEE-style, but tuned for learning. No time limit on the demo." },
  "mock.start": { en: "Start practice" },
  "mock.question": { en: "Question" },
  "mock.of": { en: "of" },
  "mock.submit": { en: "Submit" },
  "mock.next": { en: "Next" },
  "mock.score": { en: "Your score" },
  "mock.again": { en: "Try another" },
  "mock.review": { en: "Review answers" },
  "mock.questions": { en: "questions" },
  "mock.byTopic": { en: "By topic" },
  "mock.yourAnswer": { en: "Your answer" },
  "mock.correctAnswer": { en: "Correct" },
  "mock.subjectNotFound": { en: "Subject not found." },

  // Lesson video
  "video.label": { en: "Watch the lesson" },
  "video.credit": { en: "Video by" },
  "exp.video": { en: "Watch the demo" },

  // Why this matters
  "why.label": { en: "Why this matters" },
  "why.untranslated": {
    en: "",
  },

  // Lesson detail TOC
  "toc.why": { en: "Why" },
  "toc.video": { en: "Video" },
  "toc.lesson": { en: "Lesson" },
  "toc.worked": { en: "Example" },
  "toc.experiment": { en: "Experiment" },
  "toc.quiz": { en: "Quiz" },
  "toc.ask": { en: "Ask AI" },

  // At-home experiment
  "exp.materials": { en: "You'll need" },
  "exp.steps": { en: "Try it" },
  "exp.observe": { en: "What you'll observe" },

  // Quiz / lesson interaction
  "quiz.check": { en: "Quick check" },
  "quiz.workedEx": { en: "Worked example" },
  "quiz.problem": { en: "Problem." },
  "quiz.solution": { en: "Solution." },
  "quiz.generate": { en: "Generate more practice questions" },
  "quiz.generating": { en: "Generating…" },
  "quiz.generated": { en: "AI-generated practice" },
  "quiz.correct": { en: "Correct." },
  "quiz.incorrect": { en: "Not quite." },
  "quiz.tryAgain": { en: "Try again" },
  "quiz.noneYet": {
    en: "No AI-generated questions yet. Click the button above to make some.",
  },
  "quiz.genError": {
    en: "Couldn't generate questions. Try again.",
  },

  // Teacher
  "teacher.title": { en: "Teacher dashboard" },
  "teacher.subtitle": {
    en: "Create a class code, see aggregate progress. No individual student data — only class-level mastery.",
  },
  "teacher.yourClasses": { en: "Your classes" },
  "teacher.err.load": { en: "Couldn't load your classes." },
  "teacher.err.create": { en: "Couldn't create the class." },
  "teacher.createClass": { en: "Create a class" },
  "teacher.className": { en: "Class name" },
  "teacher.create": { en: "Create" },
  "teacher.share": { en: "Share this code with students:" },
  "teacher.students": { en: "students" },
  "teacher.aggregateMastery": { en: "Class average mastery" },
  "teacher.weakest": { en: "Weakest topics for this class" },
  "teacher.noClasses": { en: "No classes yet. Create one to get started." },
  "teacher.noStudents": { en: "No students have joined yet. Share the code above." },

  "student.joinClass": { en: "Join a class" },
  "student.joinCode": { en: "Enter the class code from your teacher" },
  "student.join": { en: "Join" },
  "student.joined": { en: "Joined class" },
  "student.joinErr": { en: "That code doesn't match any class." },

  // Common
  "common.subjects": { en: "Subjects" },
  "common.loading": { en: "Loading…" },
  "common.signinRequired": { en: "Please sign in to continue." },
  "common.signinCTA": { en: "Sign in" },
  "common.tryAgain": { en: "Try again" },
  "lesson.nextLesson": { en: "Next lesson" },

  "footer.demo": {
    en: "Free during pilot · feedback welcome",
  },
};

export function tr(key: keyof typeof t, locale: Locale): string {
  return t[key]?.[locale] ?? t[key]?.en ?? key;
}
