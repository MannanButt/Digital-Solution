import { describe, expect, it, vi } from "vitest";
import type { DemoRequest } from "../src/db/schema.js";
import type { ContactRepository } from "../src/repositories/contact.repository.js";
import type { EmailService } from "../src/services/email.service.js";
import { DefaultContactService } from "../src/services/contact.service.js";
import { validContactRequest } from "./fixtures.js";

const storedRecord: DemoRequest = {
  id: 1,
  ...validContactRequest,
  createdAt: new Date("2026-09-20T00:00:00.000Z"),
};

describe("DefaultContactService", () => {
  it("persists before sending the notification", async () => {
    const calls: string[] = [];
    const repository: ContactRepository = {
      create: vi.fn(async () => {
        calls.push("database");
        return storedRecord;
      }),
    };
    const notifications: EmailService = {
      sendContactNotification: vi.fn(async () => {
        calls.push("email");
      }),
    };

    const result = await new DefaultContactService(repository, notifications).submit(validContactRequest);

    expect(calls).toEqual(["database", "email"]);
    expect(result).toEqual({ record: storedRecord, notificationSent: true });
  });

  it("keeps a persisted request successful when email delivery fails", async () => {
    const repository: ContactRepository = {
      create: vi.fn(async () => storedRecord),
    };
    const notifications: EmailService = {
      sendContactNotification: vi.fn(async () => {
        throw new Error("Email provider unavailable");
      }),
    };

    const result = await new DefaultContactService(repository, notifications).submit(validContactRequest);

    expect(result.record.id).toBe(1);
    expect(result.notificationSent).toBe(false);
  });
});
