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
    const record = await this.repository.create(payload);

    try {
      await this.notifications.sendContactNotification(payload);
      return { record, notificationSent: true };
    } catch (error) {
      logger.error("Contact notification email failed after persistence", {
        error,
        contactRequestId: record.id,
      });
      return { record, notificationSent: false };
    }
  }
}
