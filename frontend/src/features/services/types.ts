// src/features/services/types.ts
import type { ElementType } from "react";

export type Metric = {
  readonly value: string;
  readonly label: string;
};

export type Deliverable = {
  readonly title: string;
  readonly desc: string;
  readonly iconName: string;
};

export type WorkflowStep = {
  readonly step: string;
  readonly title: string;
  readonly desc: string;
};

export type FAQItem = {
  readonly question: string;
  readonly answer: string;
};

export type ServiceDetail = {
  readonly slug: string;
  readonly title: string;
  readonly eyebrow?: string;
  readonly headline?: string;
  readonly description?: string;
  readonly heroSubtitle?: string;
  readonly shortDescription?: string;
  readonly metrics: readonly Metric[];
  readonly deliverables: readonly Deliverable[];
  readonly workflowSteps: readonly WorkflowStep[];
  readonly techStack: readonly string[];
  readonly faq: readonly FAQItem[];
};

export type ServiceGroup = {
  readonly id: string;
  readonly title: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly image: string;
  readonly imagePosition: string;
  readonly services: readonly string[];
};

export type HubPageConfig = {
  readonly title: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly description: string;
  readonly groupSlug: string;
  readonly services: readonly ServiceDetail[];
  readonly icons: Record<string, ElementType>;
  readonly ctaHeading: string;
  readonly ctaDescription: string;
  readonly ctaButtonText: string;
};
