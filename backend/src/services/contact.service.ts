import type { DemoRequest } from "../db/schema.js";
import type { ContactRepository } from "../repositories/contact.repository.js";
import type { ContactRequest } from "../schemas/contact.schema.js";
import type { EmailService } from "./email.service.js";
import { logger } from "../utils/logger.js";

export interface ContactSubmissionResult {
  record: DemoRequest;
  notificationSent: boolean;
}

export interface ContactService {
  submit(payload: ContactRequest): Promise<ContactSubmissionResult>;
}

export class DefaultContactService implements ContactService {
  constructor(
    private readonly repository: ContactRepository,
    private readonly notifications: EmailService,
  ) {}

  async submit(payload: ContactRequest): Promise<ContactSubmissionResult> {
    let record: DemoRequest | undefined;
    try {
      record = await this.repository.create(payload);
    } catch (dbError) {
      logger.error("Contact DB save failed", { error: dbError });
    }

    let notificationSent = false;
    try {
      await this.notifications.sendContactNotification(payload);
      notificationSent = true;
    } catch (emailError) {
      logger.error("Contact notification email failed", { error: emailError });
    }

    if (!record && !notificationSent) {
      throw new Error("Unable to process contact request at this time. Please try again.");
    }

    return {
      record: record ?? ({
        id: 0,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        service: payload.service,
        subService: payload.subService,
        message: payload.message,
        createdAt: new Date(),
      } as DemoRequest),
      notificationSent,
    };
  }
}
