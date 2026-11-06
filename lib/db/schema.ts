import { pgTable, text, timestamp, integer, boolean, jsonb, primaryKey, index, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    // Google account ID ("sub" claim). Google is the only sign-in method.
    // Nullable so accounts created before Google sign-in can be linked by
    // email on their first Google sign-in.
    googleSub: text("google_sub"),
    avatarUrl: text("avatar_url"),
    displayName: text("display_name").notNull(),
    language: text("language").notNull().$type<"en" | "am" | "om">().default("en"),
    region: text("region"),
    school: text("school"),
    under18: boolean("under_18").notNull().default(false),
    extendedRetention: boolean("extended_retention").notNull().default(false),
    // Retired with the grade 9–12 catalogue; kept so old rows stay readable.
    subjects: text("subjects").array().notNull().default([]),
    grade: integer("grade"),
    // "guide" = the Academy's teacher: sees every student's progress and the guide's version of each module.
    role: text("role").notNull().$type<"student" | "guide">().default("student"),
    // End of the student's Academy enrolment. Null or in the past = not enrolled.
    paidUntil: timestamp("paid_until", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_lower_idx").on(t.email), uniqueIndex("users_google_sub_idx").on(t.googleSub)]
);

// One row per student per experiment (retired grade 9–12 catalogue; no longer written).
export const experimentProgress = pgTable(
  "experiment_progress",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    experimentId: text("experiment_id").notNull(),
    status: text("status").notNull().$type<"started" | "done">(),
    observations: text("observations"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.experimentId] })]
);

export const conversations = pgTable(
  "conversations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("conversations_user_idx").on(t.userId, t.updatedAt)]
);

export const messages = pgTable(
  "messages",
  {
    id: text("id").primaryKey(),
    conversationId: text("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    role: text("role").notNull().$type<"user" | "assistant">(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("messages_conv_idx").on(t.conversationId, t.createdAt), index("messages_created_idx").on(t.createdAt)]
);

export const pageViews = pgTable(
  "page_views",
  {
    id: text("id").primaryKey(),
    path: text("path").notNull(),
    country: text("country"),
    region: text("region"),
    city: text("city"),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    userId: text("user_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("page_views_created_idx").on(t.createdAt),
    index("page_views_path_idx").on(t.path),
    index("page_views_country_idx").on(t.country),
  ]
);

// Per-user daily usage counters for cost caps
export const usage = pgTable(
  "usage",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    period: text("period").notNull(), // Addis Ababa calendar day, e.g. "2026-10-19"
    chatTurns: integer("chat_turns").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.userId, t.period] })]
);

// One row per checkout attempt (Chapa) or manual grant (admin).
export const payments = pgTable(
  "payments",
  {
    txRef: text("tx_ref").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    amountEtb: integer("amount_etb").notNull(),
    currency: text("currency").notNull().default("ETB"),
    days: integer("days").notNull(),
    // "review": Chapa says paid, but the amount or currency didn't match. Needs a human.
    status: text("status").notNull().$type<"pending" | "success" | "failed" | "review">(),
    source: text("source").notNull().$type<"chapa" | "admin">(),
    chapaRef: text("chapa_ref"),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
  },
  (t) => [index("payments_user_idx").on(t.userId, t.createdAt), index("payments_verified_idx").on(t.verifiedAt)]
);

// ---------- Academy modules ----------

// A student's place in a module. Students can start, drop and restart freely.
export const moduleEnrollments = pgTable(
  "module_enrollments",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    moduleId: text("module_id").notNull(),
    status: text("status").notNull().$type<"active" | "dropped" | "completed">(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    // Set by the guide when a student needs attention.
    flagged: boolean("flagged").notNull().default(false),
    flagNote: text("flag_note"),
  },
  (t) => [primaryKey({ columns: [t.userId, t.moduleId] })]
);

// Per-step lab notebook and "done" mark.
export const stepProgress = pgTable(
  "step_progress",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    moduleId: text("module_id").notNull(),
    stepId: text("step_id").notNull(),
    done: boolean("done").notNull().default(false),
    notes: text("notes"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.moduleId, t.stepId] })]
);

// Where a student is with a shared concept unit.
export const unitProgress = pgTable(
  "unit_progress",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    unitId: text("unit_id").notNull(),
    status: text("status").notNull().$type<"started" | "completed" | "tested_out">(),
    // Practice: % right on the first try. Tested out: the test-out score.
    score: integer("score").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.unitId] })]
);

// Every answer a student submits, so the guide can see what they tried.
export const questionAttempts = pgTable(
  "question_attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    unitId: text("unit_id").notNull(),
    questionId: text("question_id").notNull(),
    answer: text("answer").notNull(),
    correct: boolean("correct").notNull(),
    mode: text("mode").notNull().$type<"practice" | "testout">(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("question_attempts_user_unit_idx").on(t.userId, t.unitId, t.createdAt)]
);

// The guide's sign-off on a finished module. The row is the certificate.
export const signoffs = pgTable(
  "signoffs",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    moduleId: text("module_id").notNull(),
    checks: jsonb("checks").notNull().$type<string[]>(),
    note: text("note"),
    guideId: text("guide_id")
      .notNull()
      .references(() => users.id),
    signedAt: timestamp("signed_at", { withTimezone: true }).notNull().defaultNow(),
    certificateCode: text("certificate_code").notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.moduleId] }), uniqueIndex("signoffs_code_idx").on(t.certificateCode)]
);

export const guideFeedback = pgTable(
  "guide_feedback",
  {
    id: text("id").primaryKey(),
    studentId: text("student_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    guideId: text("guide_id")
      .notNull()
      .references(() => users.id),
    moduleId: text("module_id"),
    stepId: text("step_id"),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    readAt: timestamp("read_at", { withTimezone: true }),
  },
  (t) => [index("guide_feedback_student_idx").on(t.studentId, t.createdAt)]
);

// Concept units the guide asked a student to study. Done = unit_progress says so.
export const unitAssignments = pgTable(
  "unit_assignments",
  {
    id: text("id").primaryKey(),
    studentId: text("student_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    unitId: text("unit_id").notNull(),
    note: text("note"),
    guideId: text("guide_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("unit_assignments_student_idx").on(t.studentId, t.createdAt)]
);
