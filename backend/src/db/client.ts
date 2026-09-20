import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getEnv } from "../config/env.js";
import * as schema from "./schema.js";

let queryClient: ReturnType<typeof postgres> | undefined;
let database: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDatabase() {
  if (!queryClient || !database) {
    queryClient = postgres(getEnv().DATABASE_URL, {
      max: 1,
      ssl: "require",
      prepare: false,
      connect_timeout: 10,
      idle_timeout: 20,
    });
    database = drizzle(queryClient, { schema });
  }

  return database;
}

export async function closeDatabase(): Promise<void> {
  if (!queryClient) return;
  await queryClient.end({ timeout: 5 });
  queryClient = undefined;
  database = undefined;
}

export type Database = ReturnType<typeof getDatabase>;
