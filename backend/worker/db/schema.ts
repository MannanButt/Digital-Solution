import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * demo_requests — stores every Book a Demo form submission.
 * Used by the Cloudflare Worker API (POST /api/contact).
 */
export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company").notNull(),
  service: text("service").notNull(),
  subService: text("sub_service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type DemoRequest = typeof demoRequests.$inferSelect;
export type NewDemoRequest = typeof demoRequests.$inferInsert;
