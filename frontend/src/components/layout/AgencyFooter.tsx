"use client";

import { MouseEvent, useState } from "react";
import { Linkedin, Instagram, Facebook, Globe2, Mail, Phone, ArrowUpRight } from "lucide-react";
import { Brand } from "@/src/components/brand/Brand";
import { claimMailSendPermission } from "@/src/lib/mailRateLimit";
import "@/src/features/home/styles/footer.css";

export function AgencyFooter() {
  const [mailLimitMessage, setMailLimitMessage] = useState("");

  const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const permission = claimMailSendPermission();
    if (!permission.allowed) {
      event.preventDefault();
      setMailLimitMessage(permission.message);
    }
  };

  return (
    <footer className="vx-agency-footer" id="contact">
      <div className="vx-agency-footer-inner">
        <div className="vx-agency-footer-grid">
          {/* Column 1: Contact Us & Brand & Social Icons */}
          <div className="vx-footer-col-contact">
            <div style={{ marginBottom: "18px" }}>
              <Brand />
            </div>
            <span className="lead-text">Have a project?</span>
            <h3 className="main-text">Contact us</h3>

            <div className="vx-footer-contact-info">
              <a href="mailto:dsolutions555@gmail.com" className="vx-footer-contact-link" onClick={handleEmailClick}>
                <Mail size={16} /> dsolutions555@gmail.com
              </a>
              <a href="tel:+923096548143" className="vx-footer-contact-link">
                <Phone size={16} /> +92 309 6548143
              </a>
              <a href="tel:+923293269494" className="vx-footer-contact-link">
                <Phone size={16} /> +92 329 3269494
              </a>
              {mailLimitMessage && <p role="status">{mailLimitMessage}</p>}
            </div>

            <div className="vx-footer-social-icons">
              <a href="https://www.linkedin.com/in/abdul-mannan-butt-0382a1379" target="_blank" rel="noopener noreferrer" className="vx-footer-social-btn" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://www.instagram.com/dsolution555/" target="_blank" rel="noopener noreferrer" className="vx-footer-social-btn" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61594256333150" target="_blank" rel="noopener noreferrer" className="vx-footer-social-btn" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#top" className="vx-footer-social-btn" aria-label="Website">
                <Globe2 size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Development */}
          <div className="vx-footer-col">
            <h4>Development</h4>
            <ul>
              <li><a href="/services/development">Web &amp; App Engineering</a></li>
              <li><a href="/services/development">AI Product Development</a></li>
              <li><a href="/services/development">API &amp; Systems Integration</a></li>
              <li><a href="/services/development">Cloud &amp; DevOps</a></li>
              <li><a href="/services/development">Quality Automation</a></li>
            </ul>
          </div>

          {/* Column 3: AI Automation */}
          <div className="vx-footer-col">
            <h4>AI Automation</h4>
            <ul>
              <li><a href="/services/ai-automation">Workflow Automation</a></li>
              <li><a href="/services/ai-automation">AI Agents &amp; Copilots</a></li>
              <li><a href="/services/ai-automation">Process Intelligence</a></li>
              <li><a href="/services/ai-automation">Document Intelligence</a></li>
              <li><a href="/services/ai-automation">Governance &amp; Observability</a></li>
            </ul>
          </div>

          {/* Column 4: Marketing & SEO (Separated) */}
          <div className="vx-footer-col">
            <h4>Marketing &amp; SEO</h4>
            <ul>
              <li><a href="/services/marketing-seo">Meta &amp; Google Ads</a></li>
              <li><a href="/services/marketing-seo">Technical SEO</a></li>
              <li><a href="/services/marketing-seo">Performance Marketing</a></li>
              <li><a href="/services/marketing-seo">Conversion Funnels</a></li>
              <li><a href="/services/marketing-seo">Growth Strategy</a></li>
            </ul>
          </div>

          {/* Column 5: Product Design (Separated) */}
          <div className="vx-footer-col">
            <h4>Product Design</h4>
            <ul>
              <li><a href="/services/design">UX &amp; UI Design</a></li>
              <li><a href="/services/design">Figma Systems</a></li>
              <li><a href="/services/design">Product Strategy</a></li>
              <li><a href="/services/design">Interactive Prototypes</a></li>
              <li><a href="/services/design">Design Tokens</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="vx-footer-copyright-bar">
          <span>© {new Date().getFullYear()} Digital Solutions. All rights reserved.</span>
          <div className="vx-footer-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              Back to top <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default AgencyFooter;
