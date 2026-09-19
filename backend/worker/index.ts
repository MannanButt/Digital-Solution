/** Cloudflare Worker entry point — handles image optimization and the contact API. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { createDb } from "./db/index";
import { demoRequests } from "./db/schema";
import { Resend } from "resend";

interface Env {
  ASSETS: Fetcher;
  IMAGES?: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
  /** Aiven PostgreSQL connection string — set via `wrangler secret put DATABASE_URL` */
  DATABASE_URL: string;
  /** Resend API key — set via `wrangler secret put RESEND_API_KEY` */
  RESEND_API_KEY: string;
  /** Admin email that receives lead notifications */
  ADMIN_EMAIL: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

/** Booking form payload shape — mirrors BookDemoPage form fields */
interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  subService: string;
  message: string;
}

/** Simple JSON response helper */
function json(data: unknown, status = 200): Response {
  return new Response(status === 204 ? null : JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

/** Validate contact form payload — returns error string or null if valid */
function validatePayload(p: Partial<ContactPayload>): string | null {
  if (!p.name?.trim()) return "Name is required.";
  if (!p.email?.trim() || !/^\S+@\S+\.\S+$/.test(p.email.trim())) return "A valid email is required.";
  if (!p.phone?.trim() || !/^\d{7,15}$/.test(p.phone.trim())) return "A valid phone number is required (digits only).";
  if (!p.company?.trim()) return "Company name is required.";
  if (!p.service?.trim()) return "Service selection is required.";
  if (!p.subService?.trim()) return "Focus area is required.";
  if (!p.message?.trim()) return "Project details are required.";
  return null;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

/** Handle POST /api/contact — save to DB and send email notification */
async function handleContact(request: Request, env: Env): Promise<Response> {
  // Parse body
  let payload: Partial<ContactPayload>;
  try {
    payload = await request.json() as Partial<ContactPayload>;
  } catch {
    return json({ success: false, error: "Invalid JSON body." }, 400);
  }

  // Validate
  const validationError = validatePayload(payload);
  if (validationError) {
    return json({ success: false, error: validationError }, 422);
  }

  const data = payload as ContactPayload;
  const safe = {
    name: escapeHtml(data.name.trim()),
    email: escapeHtml(data.email.trim()),
    phone: escapeHtml(data.phone.trim()),
    company: escapeHtml(data.company.trim()),
    service: escapeHtml(data.service.trim()),
    subService: escapeHtml(data.subService.trim()),
    message: escapeHtml(data.message.trim()),
  };

  // Save to Aiven PostgreSQL
  try {
    const db = createDb(env.DATABASE_URL);
    await db.insert(demoRequests).values({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      company: data.company.trim(),
      service: data.service.trim(),
      subService: data.subService.trim(),
      message: data.message.trim(),
    });
  } catch (dbError) {
    console.error("DB insert failed:", dbError);
    return json({ success: false, error: "Failed to save your request. Please try again." }, 500);
  }

  // Send email notification via Resend
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const adminEmail = env.ADMIN_EMAIL || "dsolutions555@gmail.com";

    await resend.emails.send({
      from: "Digital Solutions <onboarding@resend.dev>",
      to: [adminEmail],
      replyTo: data.email.trim(),
      subject: `New Demo Request — ${data.name.trim()} (${data.company.trim()})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#1a1a2e;margin-bottom:4px">New Demo Request</h2>
          <p style="color:#666;margin-top:0;font-size:14px">Digital Solutions website</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
          <table style="width:100%;border-collapse:collapse;font-size:15px">
            <tr><td style="padding:8px 0;color:#6b7280;width:130px">Name</td><td style="padding:8px 0;font-weight:600">${safe.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${safe.phone}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Company</td><td style="padding:8px 0">${safe.company}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Service</td><td style="padding:8px 0">${safe.service}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Focus Area</td><td style="padding:8px 0">${safe.subService}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
          <h3 style="color:#1a1a2e;font-size:15px;margin-bottom:8px">Project Details</h3>
          <p style="color:#374151;line-height:1.6;white-space:pre-wrap">${safe.message}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
          <p style="font-size:12px;color:#9ca3af">Sent from Digital Solutions website — reply directly to reach the prospect.</p>
        </div>
      `,
    });
  } catch (emailError) {
    // Email failure is non-fatal — data is already saved in DB
    console.error("Email send failed:", emailError);
  }

  return json({ success: true, message: "Your request has been received. We will be in touch shortly." });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method === "OPTIONS") return json(null, 204);
      if (request.method === "POST") return handleContact(request, env);
      return json({ success: false, error: "Method not allowed." }, 405);
    }

    // Image optimization
    if (url.pathname === "/_vinext/image") {
      const images = env.IMAGES;
      if (!images) {
        const source = url.searchParams.get("url");
        if (source?.startsWith("/") && !source.startsWith("//")) {
          return env.ASSETS.fetch(new Request(new URL(source, request.url)));
        }
        return json({ success: false, error: "Image optimization is unavailable." }, 503);
      }
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await images.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
