import type { Metadata } from "next";
import { Zap, Brain, BarChart3, FileText, ShieldCheck } from "lucide-react";
import { ServiceHubView } from "@/src/features/services/components/ServiceHubView";
import { aiAutomationServices } from "@/src/features/services/data/aiAutomationData";
import type { HubPageConfig } from "@/src/features/services/types";

export const metadata: Metadata = {
  title: "AI Automation Services — Digital Solutions",
  description: "AI agents and dependable workflows designed around how your teams actually work.",
};

const config: HubPageConfig = {
  title: "AI Automation Services — Digital Solutions",
  eyebrow: "Intelligent Operations",
  heading: "AI Automation Engineered for Enterprise Production",
  description:
    "From single bottlenecked workflows to company-wide autonomous programs, we build the operating system around your real operational work.",
  groupSlug: "ai-automation",
  services: aiAutomationServices,
  icons: {
    "ai-workflow-automation": Zap,
    "ai-agents-copilots": Brain,
    "process-intelligence": BarChart3,
    "document-intelligence": FileText,
    "governance-observability": ShieldCheck,
  },
  ctaHeading: "Scale Your Operations with AI",
  ctaDescription:
    "Partner with specialized engineers to design dependable workflows and autonomous agents that move business needles.",
  ctaButtonText: "Map Your Workflow",
};

export default function AIAutomationHubPage() {
  return <ServiceHubView config={config} />;
}
