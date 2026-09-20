import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== ".next" && entry.name !== "node_modules") {
      return collectSourceFiles(target);
    }
    return entry.isFile() && /\.(?:ts|tsx)$/.test(entry.name) ? [target] : [];
  }));
  return files.flat();
}

test("frontend owns no backend implementation or server route", async () => {
  const sourceFiles = await collectSourceFiles(root);
  const contents = await Promise.all(sourceFiles.map((file) => readFile(file, "utf8")));
  const source = contents.join("\n");

  assert.doesNotMatch(source, /@backend|drizzle-orm|from ["']postgres["']|from ["']resend["']/);
  await assert.rejects(readFile(path.join(root, "app", "api", "contact", "route.ts"), "utf8"));
});

test("contact form uses the centralized environment-based API client", async () => {
  const [component, client] = await Promise.all([
    readFile(path.join(root, "src", "features", "contact", "components", "BookDemoPage.tsx"), "utf8"),
    readFile(path.join(root, "src", "lib", "api", "contact.ts"), "utf8"),
  ]);

  assert.match(component, /submitContactRequest/);
  assert.doesNotMatch(component, /fetch\(/);
  assert.match(client, /process\.env\.NEXT_PUBLIC_API_URL/);
  assert.match(client, /\/api\/v1\/contact/);
  assert.doesNotMatch(client, /https?:\/\/[^"'`]+\.vercel\.app/);
});

test("all public page entry points remain present", async () => {
  const pages = [
    "app/page.tsx",
    "app/book-a-demo/page.tsx",
    "app/reviews/page.tsx",
    "app/privacy-policy/page.tsx",
    "app/terms-of-service/page.tsx",
    "app/services/development/page.tsx",
    "app/services/ai-automation/page.tsx",
    "app/services/design/page.tsx",
    "app/services/marketing-seo/page.tsx",
    "app/services/software-tools/page.tsx"
  ];

  await Promise.all(pages.map((page) => readFile(path.join(root, page), "utf8")));
});
