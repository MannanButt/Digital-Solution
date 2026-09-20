import "dotenv/config";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required.");
}

const client = postgres(databaseUrl, {
  max: 1,
  ssl: "require",
  prepare: false,
  connect_timeout: 10,
});

try {
  await client`select 1 as connected`;
  const columns = await client<{ column_name: string }[]>`
    select column_name
    from information_schema.columns
    where table_schema = 'public' and table_name = 'demo_requests'
  `;
  const expectedColumns = [
    "id",
    "name",
    "email",
    "phone",
    "company",
    "service",
    "sub_service",
    "message",
    "created_at",
  ];
  const availableColumns = new Set(columns.map((column) => column.column_name));
  const missingColumns = expectedColumns.filter((column) => !availableColumns.has(column));

  if (missingColumns.length > 0) {
    throw new Error(`demo_requests schema is missing: ${missingColumns.join(", ")}`);
  }

  console.info("Database connection and demo_requests schema check succeeded.");
} finally {
  await client.end({ timeout: 5 });
}
