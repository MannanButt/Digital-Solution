import { ArrowRight, ArrowUpRight } from "lucide-react";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { ResponsiveImage } from "@/src/components/ui/ResponsiveImage";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import type { HubPageConfig } from "@/src/features/services/types";
import { ServicePageHeader } from "./ServicePageHeader";

export function ServiceHubView({ config }: { config: HubPageConfig }) {
  const { eyebrow, heading, description, groupSlug, services, ctaHeading, ctaDescription, ctaButtonText } = config;
  const heroImage = {
    "ai-automation": "/assets/images/services/menu-ai-automation.jpg",
    "marketing-seo": "/assets/images/services/menu-marketing-seo.jpg",
    development: "/assets/images/services/menu-development.jpg",
    design: "/assets/images/services/menu-design.jpg",
  }[groupSlug] ?? "/assets/images/home/hero-workflow.jpg";

  return (
    <div className="ds-services-page">
      <ServicePageHeader backHref="/" backLabel="Back to Home" />

      <section className="ds-service-hub-hero">
        <div className="ds-service-hero-media" aria-hidden="true">
          <ResponsiveImage source={heroImage} widths={[480, 768, 1280]} sizes="100vw" alt="" loading="eager" fetchPriority="high" decoding="sync" />
        </div>
        <div className="ds-service-hub-hero-inner">
          <span className="ds-service-kicker">{eyebrow}</span>
          <h1>{heading}</h1>
          <p>{description}</p>
          <div className="ds-service-hub-meta">
            <span>{services.length} specialist disciplines</span>
            <span>Built around your operating model</span>
          </div>
        </div>
      </section>

      <section className="ds-service-section ds-service-hub-section">
        <div className="ds-service-section-heading">
          <div>
            <span className="ds-service-section-kicker">Specialist capabilities</span>
            <h2>Choose the right starting point.</h2>
          </div>
          <p className="ds-service-section-intro">Every engagement is shaped around a clear business outcome, a practical delivery plan, and systems your team can own.</p>
        </div>

        <div className="ds-service-hub-grid">
          {services.map((service, index) => {
            return (
              <a key={service.slug} href={`/services/${groupSlug}/${service.slug}`} className="ds-service-hub-card" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="ds-service-hub-card-top">
                  <span className="ds-service-hub-card-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2>{service.title}</h2>
                <p>{service.shortDescription || service.description || service.headline}</p>
                <span className="ds-service-hub-card-link">View capability <ArrowRight size={15} /></span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="ds-service-cta">
        <div>
          <h2>{ctaHeading}</h2>
          <p>{ctaDescription}</p>
        </div>
        <PrimaryButton href="/book-a-demo">{ctaButtonText} <ArrowUpRight size={16} /></PrimaryButton>
      </section>

      <AgencyFooter />
    </div>
  );
}
