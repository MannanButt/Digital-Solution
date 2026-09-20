import type { ContactRequest } from "../schemas/contact.schema.js";

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export function renderContactEmail(payload: ContactRequest): string {
  const safe = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, escapeHtml(value)]),
  ) as Record<keyof ContactRequest, string>;

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#111827">
      <h2 style="margin:0 0 4px">New demo request</h2>
      <p style="color:#6b7280;margin-top:0">Digital Solutions website</p>
      <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0" />
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        <tr><td style="padding:8px 0;color:#6b7280;width:130px">Name</td><td style="padding:8px 0;font-weight:600">${safe.name}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${safe.phone}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Company</td><td style="padding:8px 0">${safe.company}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Service</td><td style="padding:8px 0">${safe.service}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280">Focus area</td><td style="padding:8px 0">${safe.subService}</td></tr>
      </table>
      <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0" />
      <h3 style="font-size:15px;margin-bottom:8px">Project details</h3>
      <p style="line-height:1.6;white-space:pre-wrap">${safe.message}</p>
    </div>
  `;
}
