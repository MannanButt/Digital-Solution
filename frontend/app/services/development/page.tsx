import type { Metadata } from "next";
import { Globe, Brain, Share2, Cloud, CheckCircle2 } from "lucide-react";
import { ServiceHubView } from "@/src/features/services/components/ServiceHubView";
import { webDevServices } from "@/src/features/services/data/webDevelopmentData";
import type { HubPageConfig } from "@/src/features/services/types";

export const metadata: Metadata = {
  title: "Development Services — Digital Solutions",
  description: "Secure digital products, integrations, and platforms engineered for scale.",
};

const config: HubPageConfig = {
  title: "Development Services — Digital Solutions",
  eyebrow: "Production Engineering",
  heading: "Development Services Built for Scale",
  description:
    "Secure digital products, integrations, and platforms engineered for performance, maintainability, and enterprise reliability.",
  groupSlug: "development",
  services: webDevServices,
  icons: {
    "web-app-engineering": Globe,
    "ai-product-development": Brain,
    "api-systems-integration": Share2,
    "cloud-devops": Cloud,
    "quality-automation": CheckCircle2,
  },
  ctaHeading: "Scale Your Digital Products",
  ctaDescription:
    "Build secure, performant, and maintainable applications with our expert development teams.",
  ctaButtonText: "Start Growth Strategy",
};

export default function DevelopmentHubPage() {
  return <ServiceHubView config={config} />;
}
