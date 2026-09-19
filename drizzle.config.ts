import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Cloudflare uses .dev.vars for local secrets, so we explicitly load it here
dotenv.config({ path: resolve(process.cwd(), ".dev.vars") });

/**
 * Drizzle Kit config — used for generating and running migrations locally.
 * DATABASE_URL must be set in your environment (e.g. a .env file or shell export).
 *
 * Usage:
 *   npx drizzle-kit generate   ← generate migration SQL
 *   npx drizzle-kit push       ← apply schema directly to Aiven DB (dev shortcut)
 */
export default defineConfig({
  schema: "./backend/worker/db/schema.ts",
  out: "./backend/worker/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
