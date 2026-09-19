import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Creates a Drizzle database client connected to Aiven PostgreSQL.
 * DATABASE_URL is set as a Cloudflare Worker secret.
 * We use `max: 1` because Cloudflare Workers are stateless and short-lived.
 */
export function createDb(databaseUrl: string) {
  const client = postgres(databaseUrl, {
    max: 1,
    ssl: "require", // Aiven requires SSL
    connect_timeout: 10,
  });
  return drizzle(client, { schema });
}

export type Database = ReturnType<typeof createDb>;
