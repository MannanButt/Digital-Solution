import type { Metadata } from "next";
import { Search, Cpu, Target, Mail, BarChart3 } from "lucide-react";
import { ServiceHubView } from "@/src/features/services/components/ServiceHubView";
import { marketingSeoSubServices } from "@/src/features/services/data/marketingSeoData";
import type { HubPageConfig } from "@/src/features/services/types";

export const metadata: Metadata = {
  title: "Marketing & SEO Services — Digital Solutions",
  description:
    "Connected search, content, performance marketing, and lifecycle automation systems engineered for measurable business growth.",
};

const config: HubPageConfig = {
  title: "Marketing & SEO Services — Digital Solutions",
  eyebrow: "Measurable Growth Engine",
  heading: "Marketing & SEO Systems Designed for Scale",
  description:
    "Connected technical search, AI content pipelines, algorithmic paid media, and customer lifecycle automation built for high ROI.",
  groupSlug: "marketing-seo",
  services: Object.values(marketingSeoSubServices),
  icons: {
    "technical-seo": Search,
    "ai-content-systems": Cpu,
    "performance-marketing": Target,
    "crm-lifecycle-automation": Mail,
    "analytics-attribution": BarChart3,
  },
  ctaHeading: "Scale Your Marketing & Search Growth",
  ctaDescription:
    "Get an expert technical SEO audit, AI content roadmap, or performance marketing plan tailored to your product.",
  ctaButtonText: "Start Growth Strategy",
};

export default function MarketingSeoHubPage() {
  return <ServiceHubView config={config} />;
}
