"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  HelpCircle,
} from "lucide-react";
import type { FAQItem, ServiceDetail } from "@/src/features/services/types";
import { ServiceDeliverables, ServiceTimeline } from "./ServiceContent";
import { ServicePageHeader } from "./ServicePageHeader";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import { ResponsiveImage } from "@/src/components/ui/ResponsiveImage";

function formatMetric(metric: { value: string; label: string }) {
  if (metric.value.toLowerCase().includes("faster")) {
    return {
      value: metric.value.replace(/\s*faster/i, "").replace(/x/g, "×"),
      label: "Faster operations",
    };
  }
  return { value: metric.value.replace(/x/g, "×"), label: metric.label };
}

function parseMetric(value: string) {
  const match = value.match(/^([+<]?)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value, decimals: 0 };
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
  return { prefix: match[1], target: Number(match[2]), suffix: match[3], decimals };
}

function AnimatedMetric({ value }: { value: string }) {
  const parsed = parseMetric(value);
  const [current, setCurrent] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return parsed.target;
    }
    return parsed.target >= 1 ? 1 : 0;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || parsed.target === 0) {
      return;
    }

    let frame = 0;
    const startValue = parsed.target >= 1 ? 1 : 0;
    let startedAt = 0;
    const animate = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min((now - startedAt) / 2200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(startValue + (parsed.target - startValue) * eased);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    const delay = window.setTimeout(() => { frame = requestAnimationFrame(animate); }, 300);
    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(frame);
    };
  }, [parsed.target]);

  return <strong aria-label={value}>{`${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`}</strong>;
}

type ServiceDetailViewProps = { detail: ServiceDetail; heroImage?: string };

export function ServiceDetailView({ detail, heroImage = "/assets/images/home/hero-workflow.jpg" }: ServiceDetailViewProps) {
  const [activeFaq, setActiveFaq] = useState<FAQItem | null>(null);

  useEffect(() => {
    if (!activeFaq) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveFaq(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeFaq]);

  useEffect(() => {
    document.documentElement.classList.add("ds-motion-ready");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-service-reveal]"));
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ds-services-page">
      <ServicePageHeader backHref="/#services" backLabel="Back to Services" />

      <section className="ds-service-detail-hero" data-service-reveal>
        <div className="ds-service-hero-media" aria-hidden="true">
          <ResponsiveImage source={heroImage} widths={[480, 768, 1280]} sizes="100vw" alt="" loading="eager" fetchPriority="high" decoding="sync" />
        </div>
        <div className="ds-service-detail-hero-inner">
          <span className="ds-service-kicker">{detail.eyebrow || "Digital Solutions service"}</span>
          <h1>{detail.title}</h1>
          <p className="ds-service-hero-lede">{detail.heroSubtitle || detail.headline}</p>
          <p className="ds-service-hero-description">{detail.shortDescription || detail.description}</p>
          <div className="ds-service-actions">
            <a href="/book-a-demo" className="ds-service-primary">Start a conversation <ArrowRight size={16} /></a>
            <a href="#deliverables" className="ds-service-secondary">View deliverables</a>
          </div>
          <div className="ds-service-hero-stats" aria-label="Service outcomes">
            {detail.metrics.map((metric) => (
              <div key={metric.label} className="ds-service-hero-stat">
                {(() => {
                  const formatted = formatMetric(metric);
                  return <><AnimatedMetric value={formatted.value} /><span>{formatted.label}</span></>;
                })()}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="deliverables" className="ds-service-section" data-service-reveal>
        <div className="ds-service-section-heading">
          <div>
            <span className="ds-service-section-kicker">Scope of work</span>
            <h2>Clear outputs. Built to last.</h2>
          </div>
          <p className="ds-service-section-intro">We turn the brief into practical systems, documented decisions, and a delivery handover your team can confidently run.</p>
        </div>
        <ServiceDeliverables items={detail.deliverables} />
      </section>

      <section className="ds-service-section ds-service-section--wide" data-service-reveal>
        <div className="ds-service-section-heading">
          <div>
            <span className="ds-service-section-kicker">Delivery approach</span>
            <h2>A clear path from brief to production.</h2>
          </div>
          <p className="ds-service-section-intro">A focused process keeps delivery aligned, testable, and ready for the realities of production.</p>
        </div>
        <ServiceTimeline steps={detail.workflowSteps} />
      </section>

      <section className="ds-service-section" data-service-reveal>
        <div className="ds-service-split">
          <div>
            <span className="ds-service-section-kicker">Tools and foundations</span>
            <h2>Built around your stack.</h2>
            <div className="ds-service-tech-grid">
              {detail.techStack.map((tech, index) => (
                <span key={tech} style={{ animationDelay: `${index * 60}ms` }}>
                  <small>{String(index + 1).padStart(2, "0")}</small>{tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="ds-service-section-kicker">Common questions</span>
            <h2>What to know before we begin.</h2>
            <div className="ds-service-faq" aria-label="Frequently asked questions">
              {detail.faq.map((q) => (
                <button key={q.question} type="button" className="ds-service-faq-trigger" onClick={() => setActiveFaq(q)}>
                  <span><HelpCircle size={15} /> {q.question}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ds-service-cta" data-service-reveal>
        <div>
          <h2>Ready to make {detail.title.toLowerCase()} work harder?</h2>
          <p>Talk with a Digital Solutions specialist about the right scope, sequence, and next step for your team.</p>
        </div>
        <a href="/book-a-demo" className="ds-service-primary">Book a strategy call <ArrowUpRight size={16} /></a>
      </section>

      <AgencyFooter />

      {activeFaq && (
        <div className="ds-service-modal-backdrop" role="presentation">
          <div className="ds-service-modal" role="dialog" aria-modal="true" aria-labelledby="service-faq-title">
            <div className="ds-service-modal-topline">
              <span className="ds-service-section-kicker">Answer</span>
              <button type="button" className="ds-service-modal-close" onClick={() => setActiveFaq(null)} aria-label="Close answer">×</button>
            </div>
            <h2 id="service-faq-title">{activeFaq.question}</h2>
            <p>{activeFaq.answer}</p>
            <button type="button" className="ds-service-primary ds-service-modal-action" onClick={() => setActiveFaq(null)}>Close answer</button>
          </div>
        </div>
      )}
    </div>
  );
}
