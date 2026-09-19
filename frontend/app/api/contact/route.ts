import { NextResponse } from "next/server";
import { createDb } from "@backend/worker/db/index";
import { demoRequests } from "@backend/worker/db/schema";
import { Resend } from "resend";

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as {
      name: string;
      email: string;
      phone?: string;
      company: string;
      service?: string;
      subService?: string;
      message: string;
    };

    // Server-side validation
    if (!payload.name || !payload.email || !payload.company || !payload.message) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // Connect to Aiven PostgreSQL (read from process.env natively in local dev)
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.error("DATABASE_URL is missing");
      return NextResponse.json({ success: false, error: "Server configuration error." }, { status: 500 });
    }

    const db = createDb(dbUrl);

    const safe = {
      name: escapeHtml(payload.name.trim()),
      email: escapeHtml(payload.email.trim()),
      phone: escapeHtml(payload.phone?.trim() || ""),
      company: escapeHtml(payload.company.trim()),
      service: escapeHtml(payload.service?.trim() || ""),
      subService: escapeHtml(payload.subService?.trim() || ""),
      message: escapeHtml(payload.message.trim()),
    };

    // Insert into Aiven DB
    await db.insert(demoRequests).values({
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone?.trim() || "",
      company: payload.company.trim(),
      service: payload.service?.trim() || "",
      subService: payload.subService?.trim() || "",
      message: payload.message.trim(),
    });

    // Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const adminEmail = process.env.ADMIN_EMAIL || "dsolutions555@gmail.com";

        await resend.emails.send({
          from: "Digital Solutions <onboarding@resend.dev>",
          to: [adminEmail],
          replyTo: payload.email.trim(),
          subject: `New Demo Request: ${payload.name} (${payload.company})`,
          html: `
            <div style="font-family:sans-serif;padding:24px">
              <h2>New Demo Request</h2>
              <p><strong>Name:</strong> ${safe.name}</p>
              <p><strong>Email:</strong> ${safe.email}</p>
              <p><strong>Phone:</strong> ${safe.phone}</p>
              <p><strong>Company:</strong> ${safe.company}</p>
              <p><strong>Service:</strong> ${safe.service} - ${safe.subService}</p>
              <h3>Project Details</h3>
              <p>${safe.message}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send email:", emailErr);
        // Continue even if email fails, since DB save succeeded
      }
    }

    return NextResponse.json({ success: true, message: "Request received successfully." });
  } catch (error) {
    console.error("API /contact error:", error);
    return NextResponse.json({ success: false, error: "Failed to process request." }, { status: 500 });
  }
}
