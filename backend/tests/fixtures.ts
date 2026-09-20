import type { AppEnv } from "../src/config/env.js";
import type { ContactRequest } from "../src/schemas/contact.schema.js";

export const testEnv: AppEnv = {
  NODE_ENV: "test",
  PORT: 4000,
  DATABASE_URL: "postgresql://test:test@localhost:5432/test",
  RESEND_API_KEY: "re_test",
  ADMIN_EMAIL: "admin@example.com",
  EMAIL_FROM: "Digital Solutions <onboarding@resend.dev>",
  CORS_ORIGINS: "http://localhost:3000",
  CONTACT_RATE_LIMIT_WINDOW_MS: 600_000,
  CONTACT_RATE_LIMIT_MAX: 100,
  corsOrigins: ["http://localhost:3000"],
};

export const validContactRequest: ContactRequest = {
  name: "Test User",
  email: "test@example.com",
  phone: "923001234567",
  company: "Example Company",
  service: "AI agents and automation",
  subService: "Workflow automation",
  message: "We need help automating our customer support workflow.",
};
