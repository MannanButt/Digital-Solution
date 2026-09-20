import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import type { ContactService } from "../src/services/contact.service.js";
import { testEnv, validContactRequest } from "./fixtures.js";

function createService(): ContactService {
  return {
    submit: vi.fn(async (payload) => ({
      record: {
        id: 1,
        ...payload,
        createdAt: new Date("2026-09-20T00:00:00.000Z"),
      },
      notificationSent: true,
    })),
  };
}

describe("Express API", () => {
  it("returns a safe health response and request id", async () => {
    const response = await request(createApp({ env: testEnv, contactService: createService() }))
      .get("/api/health")
      .expect(200);

    expect(response.body.data).toEqual({ service: "digital-solutions-api", status: "ok" });
    expect(response.headers["x-request-id"]).toBeTypeOf("string");
  });

  it("validates requests before invoking the service", async () => {
    const service = createService();
    const response = await request(createApp({ env: testEnv, contactService: service }))
      .post("/api/v1/contact")
      .send({ name: "Only a name" })
      .expect(422);

    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(service.submit).not.toHaveBeenCalled();
  });

  it("accepts a valid contact request", async () => {
    const service = createService();
    const response = await request(createApp({ env: testEnv, contactService: service }))
      .post("/api/v1/contact")
      .set("Origin", "http://localhost:3000")
      .send(validContactRequest)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(service.submit).toHaveBeenCalledWith(validContactRequest);
    expect(response.headers["access-control-allow-origin"]).toBe("http://localhost:3000");
  });

  it("rejects a browser origin outside the allowlist", async () => {
    const response = await request(createApp({ env: testEnv, contactService: createService() }))
      .get("/api/health")
      .set("Origin", "https://malicious.example")
      .expect(403);

    expect(response.body.error.code).toBe("ORIGIN_NOT_ALLOWED");
  });

  it("returns consistent JSON for unknown routes", async () => {
    const response = await request(createApp({ env: testEnv, contactService: createService() }))
      .get("/missing")
      .expect(404);

    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("rate limits repeated contact attempts", async () => {
    const env = { ...testEnv, CONTACT_RATE_LIMIT_MAX: 2 };
    const app = createApp({ env, contactService: createService() });

    await request(app).post("/api/v1/contact").send(validContactRequest).expect(201);
    await request(app).post("/api/v1/contact").send(validContactRequest).expect(201);
    const response = await request(app).post("/api/v1/contact").send(validContactRequest).expect(429);

    expect(response.body.error.code).toBe("RATE_LIMITED");
  });
});
