import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(4000),
  DATABASE_URL: z.url().refine(
    (value) => value.startsWith("postgres://") || value.startsWith("postgresql://"),
    "DATABASE_URL must be a PostgreSQL URL",
  ),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  ADMIN_EMAIL: z.email(),
  EMAIL_FROM: z.string().min(3).default("Digital Solutions <onboarding@resend.dev>"),
  CORS_ORIGINS: z.string().min(1).default("http://localhost:3000"),
  CONTACT_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(600_000),
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(2),
});

export type AppEnv = z.infer<typeof envSchema> & {
  corsOrigins: string[];
};

export function loadEnv(source: NodeJS.ProcessEnv = process.env): AppEnv {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const keys = result.error.issues.map((issue) => issue.path.join(".")).filter(Boolean);
    throw new Error(`Invalid environment configuration: ${[...new Set(keys)].join(", ")}`);
  }

  return {
    ...result.data,
    corsOrigins: result.data.CORS_ORIGINS.split(",")
      .map((origin) => origin.trim().replace(/\/$/, ""))
      .filter(Boolean),
  };
}

let cachedEnv: AppEnv | undefined;

export function getEnv(): AppEnv {
  cachedEnv ??= loadEnv();
  return cachedEnv;
}
