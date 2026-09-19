// src/features/services/data/services.ts
export type ServiceGroup = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imagePosition: string;
  services: readonly string[];
};

export const serviceMenuGroups: readonly ServiceGroup[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    eyebrow: "Intelligent operations",
    description: "AI agents and dependable workflows designed around how your teams actually work.",
    image: "/assets/images/services/menu-ai-automation.jpg",
    imagePosition: "center center",
    services: [
      "AI Workflow Automation",
      "AI Agents & Copilots",
      "Process Intelligence",
      "Document Intelligence",
      "Governance & Observability",
    ],
  },
  {
    id: "marketing-seo",
    title: "Marketing & SEO",
    eyebrow: "Measurable growth",
    description: "Connected search, content, performance, and lifecycle systems that compound growth.",
    image: "/assets/images/services/menu-marketing-seo.jpg",
    imagePosition: "center center",
    services: [
      "Technical SEO",
      "AI Content Systems",
      "Performance Marketing",
      "CRM & Lifecycle Automation",
      "Analytics & Attribution",
    ],
  },
  {
    id: "development",
    title: "Development",
    eyebrow: "Production engineering",
    description: "Secure digital products, integrations, and platforms engineered for scale.",
    image: "/assets/images/services/menu-development.jpg",
    imagePosition: "center center",
    services: [
      "Web & App Engineering",
      "AI Product Development",
      "API & Systems Integration",
      "Cloud & DevOps",
      "Quality Automation",
    ],
  },
  {
    id: "design",
    title: "Design",
    eyebrow: "Human-centred systems",
    description: "Research-led experiences and design systems that make complex products feel simple.",
    image: "/assets/images/services/menu-design.jpg",
    imagePosition: "center center",
    services: [
      "Product Strategy",
      "UX & UI Design",
      "Design Systems",
      "Rapid Prototyping",
      "Conversion Experience Design",
    ],
  },
] as const;

/**
 * Mapping table of individual service button titles to their dedicated page routes.
 * If a dedicated page route exists, it directs to that page.
 * If no page exists yet, it routes to `/services/not-found` or 404 handler.
 */
export const SERVICE_ITEM_ROUTES: Record<string, string> = {
  // AI Automation sub-services
  "AI Workflow Automation": "/services/ai-automation/ai-workflow-automation",
  "AI Agents & Copilots": "/services/ai-automation/ai-agents-copilots",
  "Process Intelligence": "/services/ai-automation/process-intelligence",
  "Document Intelligence": "/services/ai-automation/document-intelligence",
  "Governance & Observability": "/services/ai-automation/governance-observability",

  // Marketing & SEO sub-services
  "Technical SEO": "/services/marketing-seo/technical-seo",
  "AI Content Systems": "/services/marketing-seo/ai-content-systems",
  "Performance Marketing": "/services/marketing-seo/performance-marketing",
  "CRM & Lifecycle Automation": "/services/marketing-seo/crm-lifecycle-automation",
  "Analytics & Attribution": "/services/marketing-seo/analytics-attribution",

  // Development sub-services
  "Web & App Engineering": "/services/development/web-app-engineering",
  "AI Product Development": "/services/development/ai-product-development",
  "API & Systems Integration": "/services/development/api-systems-integration",
  "Cloud & DevOps": "/services/development/cloud-devops",
  "Quality Automation": "/services/development/quality-automation",

  // Design sub-services
  "Product Strategy": "/services/design/product-strategy",
  "UX & UI Design": "/services/design/ux-ui-design",
  "Design Systems": "/services/design/design-systems",
  "Rapid Prototyping": "/services/design/rapid-prototyping",
  "Conversion Experience Design": "/services/design/conversion-experience-design",

};

/**
 * Returns the exact route for a service item, or falls back to its group hub page or 404
 */
export function getServiceItemHref(serviceName: string, groupId: string): string {
  if (SERVICE_ITEM_ROUTES[serviceName]) {
    return SERVICE_ITEM_ROUTES[serviceName];
  }
  // If no specific route exists yet, send to the group hub page if available
  if (
    groupId === "ai-automation" ||
    groupId === "marketing-seo" ||
    groupId === "development" ||
    groupId === "design"
  ) {
    return `/services/${groupId}`;
  }
  return `/services/not-found?service=${encodeURIComponent(serviceName)}`;
}
