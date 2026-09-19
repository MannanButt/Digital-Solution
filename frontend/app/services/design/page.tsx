import type { Metadata } from "next";
import { Compass, Palette, Layers, Zap, Target } from "lucide-react";
import { ServiceHubView } from "@/src/features/services/components/ServiceHubView";
import { designServices } from "@/src/features/services/data/designData";
import type { HubPageConfig } from "@/src/features/services/types";

export const metadata: Metadata = {
  title: "Design Services — Digital Solutions",
  description: "Research-led experiences and design systems that make complex products feel simple.",
};

const config: HubPageConfig = {
  title: "Design Services — Digital Solutions",
  eyebrow: "Human-Centred Systems",
  heading: "Design Services Engineered for Clarity",
  description:
    "Research-led experiences and design systems that make complex digital products feel simple, intuitive, and conversion-ready.",
  groupSlug: "design",
  services: designServices,
  icons: {
    "product-strategy": Compass,
    "ux-ui-design": Palette,
    "design-systems": Layers,
    "rapid-prototyping": Zap,
    "conversion-experience-design": Target,
  },
  ctaHeading: "Elevate Your Product Experience",
  ctaDescription:
    "Turn complex enterprise software and digital workflows into seamless, delightfully usable experiences.",
  ctaButtonText: "Start Design Project",
};

export default function DesignHubPage() {
  return <ServiceHubView config={config} />;
}
