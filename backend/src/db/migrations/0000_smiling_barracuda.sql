-- The table already exists in the current Aiven database. IF NOT EXISTS makes
-- this baseline migration safe while allowing clean databases to bootstrap.
CREATE TABLE IF NOT EXISTS "demo_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"company" text NOT NULL,
	"service" text NOT NULL,
	"sub_service" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
