import { Resend } from "resend";
import { getEnv } from "../config/env.js";
import type { ContactRequest } from "../schemas/contact.schema.js";
import { renderContactEmail } from "../templates/contact-email.js";

export interface EmailService {
  sendContactNotification(payload: ContactRequest): Promise<void>;
}

export class ResendEmailService implements EmailService {
  private client: Resend | undefined;

  async sendContactNotification(payload: ContactRequest): Promise<void> {
    const env = getEnv();
    this.client ??= new Resend(env.RESEND_API_KEY);

    const { error } = await this.client.emails.send({
      from: env.EMAIL_FROM,
      to: [env.ADMIN_EMAIL],
      replyTo: payload.email,
      subject: `New demo request — ${payload.name} (${payload.company})`,
      html: renderContactEmail(payload),
    });

    if (error) {
      throw new Error(`Resend rejected the email: ${error.message}`);
    }
  }
}

export const emailService = new ResendEmailService();
