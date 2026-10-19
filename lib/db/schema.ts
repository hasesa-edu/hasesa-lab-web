import { pgTable, text, timestamp, integer, boolean, primaryKey, index, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    // Google account ID ("sub" claim). Google is the only sign-in method.
    googleSub: text("google_sub").notNull(),
    avatarUrl: text("avatar_url"),
    displayName: text("display_name").notNull(),
    language: text("language").notNull().$type<"en" | "am" | "om">().default("en"),
    region: text("region"),
    school: text("school"),
    under18: boolean("under_18").notNull().default(false),
    extendedRetention: boolean("extended_retention").notNull().default(false),
    subjects: text("subjects").array().notNull().default([]),
    grade: integer("grade"),
    // End of the student's prepaid access. Null or in the past = no plan.
    paidUntil: timestamp("paid_until", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_lower_idx").on(t.email), uniqueIndex("users_google_sub_idx").on(t.googleSub)]
);

// One row per student per experiment they've started or completed.
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
    status: text("status").notNull().$type<"pending" | "success" | "failed">(),
    source: text("source").notNull().$type<"chapa" | "admin">(),
    chapaRef: text("chapa_ref"),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
  },
  (t) => [index("payments_user_idx").on(t.userId, t.createdAt), index("payments_verified_idx").on(t.verifiedAt)]
);
