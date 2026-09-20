"use client";

import { FormEvent, useState } from "react";
import { ServicePageHeader } from "@/src/features/services/components/ServicePageHeader";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import { ApiClientError, submitContactRequest } from "@/src/lib/api/contact";
import "@/src/features/contact/styles/contact.css";

const ADMIN_EMAIL = "dsolutions555@gmail.com";
const ADMIN_PHONE = "+923096548143";
const SECONDARY_PHONE = "+923293269494";

type BookingForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  subService: string;
  customService: string;
  message: string;
};

const serviceOptions: Record<string, string[]> = {
  "AI agents and automation": [
    "Workflow automation",
    "AI agents and copilots",
    "Process intelligence",
    "Document intelligence",
    "Governance and observability",
  ],
  "Web and app development": [
    "Web and app engineering",
    "AI product development",
    "API and systems integration",
    "Cloud and DevOps",
    "Quality automation",
  ],
  "Marketing and SEO": [
    "Technical SEO",
    "Content systems",
    "Performance marketing",
    "Lifecycle automation",
    "Revenue analytics",
  ],
  "Product and UX design": [
    "Product strategy",
    "UX and UI design",
    "Design systems",
    "Interactive prototypes",
    "Conversion funnels",
  ],
};

const countryCodes = [
  { code: "+92", label: "🇵🇰 +92" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+966", label: "🇸🇦 +966" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
];

const initialForm: BookingForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  subService: "",
  customService: "",
  message: "",
};

export default function BookDemoPage() {
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [countryCode, setCountryCode] = useState("+92");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof BookingForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setSubmitted(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = form.name.trim();
    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[a-zA-Z\s'.-]+$/.test(cleanName)) {
      setError("Name can only contain alphabetic letters and spaces (no numbers or special symbols).");
      return;
    }
    if (cleanName.length > 60) {
      setError("Name must be 60 characters or fewer.");
      return;
    }

    const cleanEmail = form.email.trim();
    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setError("Please enter a valid work email address.");
      return;
    }
    if (cleanEmail.length > 100) {
      setError("Email must be 100 characters or fewer.");
      return;
    }

    const cleanPhone = form.phone.trim();
    if (!/^\d{7,14}$/.test(cleanPhone)) {
      setError("Please enter a valid phone number (7 to 14 digits).");
      return;
    }

    const cleanCompany = form.company.trim();
    if (!cleanCompany) {
      setError("Please enter your company name.");
      return;
    }
    if (cleanCompany.length > 100) {
      setError("Company name must be 100 characters or fewer.");
      return;
    }

    if (!form.service) {
      setError("Please select a service.");
      return;
    }
    if (form.service === "Something else" ? !form.customService.trim() : !form.subService) {
      setError(form.service === "Something else" ? "Please describe the service you need." : "Please select a focus area.");
      return;
    }

    const cleanMessage = form.message.trim();
    if (!cleanMessage) {
      setError("Please share a few project details.");
      return;
    }
    if (cleanMessage.length > 2000) {
      setError("Project details must be 2000 characters or fewer.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await submitContactRequest({
        name: cleanName,
        email: cleanEmail,
        phone: `${countryCode} ${cleanPhone}`,
        company: cleanCompany,
        service: form.service,
        subService: form.customService.trim() || form.subService,
        message: cleanMessage,
      });

      setSubmitted(true);
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError instanceof ApiClientError
        ? submitError.message
        : "Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ds-booking-page">
      <ServicePageHeader backHref="/" backLabel="Back to Home" />

      <main className="ds-booking-main">
        <section className="ds-booking-intro" aria-labelledby="booking-title">
          <span className="ds-booking-kicker">Book a demo</span>
          <h1 id="booking-title">Let&apos;s make the next step concrete.</h1>
          <p>
            Tell us what you are building, improving, or automating. A Digital Solutions specialist will review your goals and get back to you with a practical next step.
          </p>
          <div className="ds-booking-contact-note">
            <span>Prefer a direct conversation?</span>
            <a href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a>
            <a href={`tel:${ADMIN_PHONE}`}>{ADMIN_PHONE}</a>
            <a href={`tel:${SECONDARY_PHONE}`}>{SECONDARY_PHONE}</a>
          </div>
        </section>

        <section className="ds-booking-form-section" aria-labelledby="booking-form-title">
          <div className="ds-booking-form-heading">
            <span className="ds-booking-kicker">Start a conversation</span>
            <h2 id="booking-form-title">Share a little context.</h2>
            <p>Every field is required so our team can prepare a focused response before we contact you.</p>
          </div>

          <form className="ds-booking-form" onSubmit={handleSubmit} noValidate>
            <div className="ds-booking-field-grid">
              <label>
                <span className="ds-booking-label">Full name <em aria-hidden="true">*</em></span>
                <input name="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" placeholder="Your full name" maxLength={60} required />
              </label>
              <label>
                <span className="ds-booking-label">Work email <em aria-hidden="true">*</em></span>
                <input name="email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" placeholder="you@company.com" maxLength={100} required />
              </label>
              <label>
                <span className="ds-booking-label">Phone number <em aria-hidden="true">*</em></span>
                <div className="ds-phone-input-group">
                  <select
                    className="ds-phone-country-select"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    aria-label="Country Code"
                  >
                    {countryCodes.map((item) => (
                      <option key={`${item.code}-${item.label}`} value={item.code}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{7,14}"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value.replace(/\D/g, ""))}
                    autoComplete="tel"
                    placeholder="7-14 digits"
                    maxLength={14}
                    required
                  />
                </div>
              </label>
              <label>
                <span className="ds-booking-label">Company <em aria-hidden="true">*</em></span>
                <input name="company" value={form.company} onChange={(event) => updateField("company", event.target.value)} autoComplete="organization" placeholder="Company name" maxLength={100} required />
              </label>
            </div>

            <label>
              <span className="ds-booking-label">What can we help with? <em aria-hidden="true">*</em></span>
              <select name="service" value={form.service} onChange={(event) => {
                setForm((current) => ({ ...current, service: event.target.value, subService: "", customService: "" }));
                setError("");
                setSubmitted(false);
              }} required>
                <option value="">Select a service</option>
                <option value="AI agents and automation">AI agents and automation</option>
                <option value="Web and app development">Web and app development</option>
                <option value="Marketing and SEO">Marketing and SEO</option>
                <option value="Product and UX design">Product and UX design</option>
                <option value="Something else">Something else</option>
              </select>
            </label>

            {form.service === "Something else" ? (
              <label>
                <span className="ds-booking-label">Tell us what you need <em aria-hidden="true">*</em></span>
                <input name="customService" value={form.customService} onChange={(event) => updateField("customService", event.target.value)} placeholder="Describe the service or outcome" maxLength={150} required />
              </label>
            ) : (
              <label>
                <span className="ds-booking-label">Focus area <em aria-hidden="true">*</em></span>
                <select name="subService" value={form.subService} onChange={(event) => updateField("subService", event.target.value)} disabled={!form.service} required>
                  <option value="">{form.service ? "Select a focus area" : "Select a service first"}</option>
                  {(serviceOptions[form.service] ?? []).map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
            )}

            <label>
              <span className="ds-booking-label">Project details <em aria-hidden="true">*</em></span>
              <textarea name="message" value={form.message} onChange={(event) => updateField("message", event.target.value)} rows={6} placeholder="What would you like to improve, launch, or automate?" maxLength={2000} required />
            </label>

            {error && <p className="ds-booking-form-message ds-booking-form-message--error" role="alert">{error}</p>}
            {submitted && <p className="ds-booking-form-message ds-booking-form-message--success" role="status">✓ Request received! We will review your details and get back to you shortly.</p>}

            <button type="submit" className="ds-booking-submit" disabled={loading}>
              {loading ? "Sending…" : <>Send request <span aria-hidden="true">↗</span></>}
            </button>
            <p className="ds-booking-privacy">Your details are used only to respond to this request.</p>
          </form>
        </section>
      </main>

      <AgencyFooter />
    </div>
  );
}
