import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

// The database schema is now owned by hasesa-api (Alembic migrations). Don't
// run `drizzle-kit push` or `generate`: they would try to change or drop
// tables this app doesn't know about. This config is kept for `db:studio`,
// and the filter limits Drizzle to the tables this app reads and writes.
export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: [
    "users",
    "experiment_progress",
    "conversations",
    "messages",
    "page_views",
    "usage",
    "payments",
    "module_enrollments",
    "step_progress",
    "unit_progress",
    "question_attempts",
    "signoffs",
    "guide_feedback",
    "unit_assignments",
  ],
} satisfies Config;
