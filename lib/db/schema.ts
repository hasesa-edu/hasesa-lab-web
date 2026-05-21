import { pgTable, text, timestamp, integer, boolean, primaryKey, index, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    displayName: text("display_name").notNull(),
    role: text("role").notNull().$type<"student" | "teacher">(),
    language: text("language").notNull().$type<"en" | "am" | "om">().default("en"),
    region: text("region"),
    school: text("school"),
    under18: boolean("under_18").notNull().default(false),
    extendedRetention: boolean("extended_retention").notNull().default(false),
    subjects: text("subjects").array().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_lower_idx").on(t.email)]
);

export const mastery = pgTable(
  "mastery",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    subject: text("subject").notNull(),
    topic: text("topic").notNull(),
    value: integer("value").notNull().default(50),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.subject, t.topic] })]
);

export const classes = pgTable(
  "classes",
  {
    code: text("code").primaryKey(),
    name: text("name").notNull(),
    teacherId: text("teacher_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("classes_teacher_idx").on(t.teacherId)]
);

export const classMembers = pgTable(
  "class_members",
  {
    classCode: text("class_code")
      .notNull()
      .references(() => classes.code, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.classCode, t.userId] })]
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

// Per-user monthly usage counters for NFR-14 cost caps
export const usage = pgTable(
  "usage",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    yearMonth: text("year_month").notNull(), // e.g. "2026-05"
    chatTurns: integer("chat_turns").notNull().default(0),
    quizBatches: integer("quiz_batches").notNull().default(0),
    aiGrades: integer("ai_grades").notNull().default(0),
    asrMinutes: integer("asr_minutes").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.userId, t.yearMonth] })]
);
