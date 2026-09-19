import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

let workerPromise;

async function getWorker() {
  if (workerPromise) return workerPromise;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  workerPromise = import(workerUrl.href).then((module) => module.default);
  return workerPromise;
}

async function request(path = "/", init = {}) {
  const worker = await getWorker();

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
      ...init,
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Digital Solutions homepage", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Digital Solutions \| AI Workflow Automation<\/title>/i);
  assert.match(html, /AI Workflow/);
  assert.match(html, /Automation/);
  assert.match(html, /Smart Solutions\./);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("server-renders every public page and service detail route", async () => {
  const routes = [
    "/book-a-demo",
    "/reviews",
    "/privacy-policy",
    "/terms-of-service",
    "/services/development",
    "/services/ai-automation",
    "/services/design",
    "/services/marketing-seo",
    "/services/software-tools",
    "/services/software-tools/checkout",
    "/services/development/web-app-engineering",
    "/services/development/ai-product-development",
    "/services/development/api-systems-integration",
    "/services/development/cloud-devops",
    "/services/development/quality-automation",
    "/services/ai-automation/ai-workflow-automation",
    "/services/ai-automation/ai-agents-copilots",
    "/services/ai-automation/process-intelligence",
    "/services/ai-automation/document-intelligence",
    "/services/ai-automation/governance-observability",
    "/services/design/product-strategy",
    "/services/design/ux-ui-design",
    "/services/design/design-systems",
    "/services/design/rapid-prototyping",
    "/services/design/conversion-experience-design",
    "/services/marketing-seo/technical-seo",
    "/services/marketing-seo/ai-content-systems",
    "/services/marketing-seo/performance-marketing",
    "/services/marketing-seo/crm-lifecycle-automation",
    "/services/marketing-seo/analytics-attribution",
  ];

  for (const route of routes) {
    const response = await request(route);
    assert.equal(response.status, 200, `${route} returned ${response.status}`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, `${route} did not return HTML`);
    const html = await response.text();
    assert.doesNotMatch(html, /Internal Server Error|Application error|codex-preview/i, `${route} rendered an error page`);
  }
});

test("contact API rejects malformed requests before external services", async () => {
  const optionsResponse = await request("/api/contact", { method: "OPTIONS" });
  assert.equal(optionsResponse.status, 204);

  const getResponse = await request("/api/contact", { method: "GET" });
  assert.equal(getResponse.status, 405);

  const malformedResponse = await request("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "not-json",
  });
  assert.equal(malformedResponse.status, 400);

  const invalidResponse = await request("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Test" }),
  });
  assert.equal(invalidResponse.status, 422);
});

test("Cloudflare build exposes the generated static asset binding", async () => {
  const config = JSON.parse(await readFile(new URL("../dist/server/wrangler.json", import.meta.url), "utf8"));
  assert.equal(config.assets?.binding, "ASSETS");
  assert.equal(config.assets?.directory, "../client");
});

test("keeps the five-photo hero and focused redesign assets", async () => {
  const [home, homeContent, page, layout, css] = await Promise.all([
    readFile(new URL("../frontend/src/features/home/components/HomePage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../frontend/src/features/home/data/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../frontend/app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../frontend/app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../frontend/src/features/home/styles/home.css", import.meta.url), "utf8"),
  ]);

  for (const image of [
    "hero-workflow.jpg",
    "hero-agents.jpg",
    "hero-process.jpg",
    "hero-integrations.jpg",
    "hero-customer.jpg",
  ]) {
    assert.match(`${home}\n${homeContent}`, new RegExp(image.replace(".", "\\.")));
  }

  assert.match(page, /<HomePage \/>/);
  assert.match(layout, /features\/home\/styles\/home\.css/);
  assert.match(layout, /Nunito_Sans/);
  assert.match(layout, /Roboto/);
  assert.match(css, /\.vx-frame/);
  assert.match(css, /\.vx-deck/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
