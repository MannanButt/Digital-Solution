import { ArrowLeft, Mail } from "lucide-react";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import "@/src/features/legal/styles/legal.css";

type LegalPageProps = {
  type: "privacy" | "terms";
};

const lastUpdated = "September 15, 2026";

export function LegalPage({ type }: LegalPageProps) {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  const intro = isPrivacy
    ? "How Digital Solutions collects, uses, and protects the information you share with us."
    : "The terms that apply when you use the Digital Solutions website or engage our services.";

  return (
    <main className="ds-legal-page">
      <section className="ds-legal-hero">
        <div className="ds-legal-hero-inner">
          <a href="/" className="ds-legal-back"><ArrowLeft size={16} /> Back to home</a>
          <span className="ds-legal-kicker">Digital Solutions</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <span className="ds-legal-updated">Last updated: {lastUpdated}</span>
        </div>
      </section>

      <section className="ds-legal-content" aria-label={title}>
        {isPrivacy ? <PrivacyContent /> : <TermsContent />}
        <aside className="ds-legal-contact">
          <Mail size={20} aria-hidden="true" />
          <div>
            <h2>Questions about this policy?</h2>
            <p>Contact us at <a href="mailto:dsolutions555@gmail.com">dsolutions555@gmail.com</a>.</p>
          </div>
        </aside>
      </section>

      <AgencyFooter />
    </main>
  );
}

function PrivacyContent() {
  return (
    <article className="ds-legal-article">
      <section>
        <h2>1. Introduction</h2>
        <p>Digital Solutions is committed to respecting your privacy. This Privacy Policy explains how we handle personal information collected through our website, contact forms, and service enquiries.</p>
      </section>
      <section>
        <h2>2. Information we collect</h2>
        <p>We may collect your name, email address, phone number, company details, and information about your project when you contact us, request a consultation, or submit a form on our website.</p>
      </section>
      <section>
        <h2>3. How we use information</h2>
        <p>We use your information to respond to enquiries, arrange consultations, prepare proposals, deliver our services, and improve our website and client experience. We only process information where there is a legitimate business purpose or your consent.</p>
      </section>
      <section>
        <h2>4. Sharing and security</h2>
        <p>We do not sell or rent your personal information. We may share it with trusted service providers only when required to operate our business or deliver services to you. We use reasonable organisational and technical safeguards to protect your information.</p>
      </section>
      <section>
        <h2>5. Data retention</h2>
        <p>We retain personal information only for as long as needed for the purpose it was collected, to meet legal obligations, or to resolve disputes.</p>
      </section>
      <section>
        <h2>6. Your rights</h2>
        <p>You may request access to, correction of, or deletion of your personal information. To make a request, contact us using the email address below.</p>
      </section>
      <section>
        <h2>7. Changes to this policy</h2>
        <p>We may update this policy from time to time. The latest version will always be available on this page with its revised date.</p>
      </section>
    </article>
  );
}

function TermsContent() {
  return (
    <article className="ds-legal-article">
      <section>
        <h2>1. Agreement to these terms</h2>
        <p>By accessing this website or engaging Digital Solutions, you agree to these Terms of Service. If you do not agree, please do not use the website or our services.</p>
      </section>
      <section>
        <h2>2. Services and project scope</h2>
        <p>Our services, deliverables, timeline, fees, and responsibilities are set out in a written proposal, statement of work, or agreement. That document takes precedence where it differs from these website terms.</p>
      </section>
      <section>
        <h2>3. Client responsibilities</h2>
        <p>You agree to provide accurate information, required access, feedback, and approvals needed for us to perform the agreed work. Delays in receiving these items may affect delivery timelines.</p>
      </section>
      <section>
        <h2>4. Fees and payments</h2>
        <p>Fees and payment schedules are confirmed in the applicable project agreement. Unless otherwise agreed in writing, invoices are payable according to the terms shown on the invoice.</p>
      </section>
      <section>
        <h2>5. Intellectual property</h2>
        <p>Each party retains ownership of materials it owned before the engagement. Ownership and licensing of project deliverables will be specified in the applicable written agreement.</p>
      </section>
      <section>
        <h2>6. Website use</h2>
        <p>Website content is provided for general information. You may not reproduce, republish, or use our branding or content without our prior written permission.</p>
      </section>
      <section>
        <h2>7. Liability</h2>
        <p>To the extent permitted by law, Digital Solutions is not liable for indirect, incidental, or consequential loss arising from use of this website. Nothing in these terms limits liability that cannot lawfully be limited.</p>
      </section>
      <section>
        <h2>8. Changes to these terms</h2>
        <p>We may revise these terms from time to time. Continued use of the website after changes are posted means you accept the updated terms.</p>
      </section>
    </article>
  );
}
