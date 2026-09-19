// src/features/services/data/designData.ts
export type DesignService = {
  title: string;
  slug: string;
  shortDescription: string;
  heroSubtitle: string;
  metrics: { label: string; value: string }[];
  deliverables: { title: string; desc: string; iconName: string }[];
  workflowSteps: { step: string; title: string; desc: string }[];
  techStack: string[];
  faq: { question: string; answer: string }[];
};

export const designServices: readonly DesignService[] = [
  /* ───────────────────────── 1. Product Strategy ───────────────────────── */
  {
    title: "Product Strategy",
    slug: "product-strategy",
    shortDescription:
      "Transform business goals into prioritized product roadmaps, validated value propositions, and market-ready feature definitions.",
    heroSubtitle: "De-risk bold ideas with research-backed product direction.",
    metrics: [
      { label: "Roadmap Clarity", value: "100%" },
      { label: "Market Validation", value: "3x Faster" },
      { label: "User Alignment", value: "95%" },
    ],
    deliverables: [
      { title: "Market & Competitor Analysis", desc: "Deep benchmarking of competitor UX, pricing models, and market positioning.", iconName: "Target" },
      { title: "User Persona & Journey Maps", desc: "Detailed customer archetypes, empathy mapping, and end-to-end user journeys.", iconName: "Users" },
      { title: "Prioritized Feature Matrix", desc: "Value vs. complexity prioritization frameworks to focus engineering on high-impact MVP features.", iconName: "Layout" },
      { title: "Strategic Product Roadmap", desc: "Phased release blueprints tying feature rollouts directly to business milestones and KPIs.", iconName: "TrendingUp" },
    ],
    workflowSteps: [
      { step: "01", title: "Stakeholder Alignment", desc: "Define business vision, success metrics, resource constraints, and market opportunities." },
      { step: "02", title: "User Research & Discovery", desc: "Conduct qualitative user interviews, surveys, and behavioral data audits." },
      { step: "03", title: "Opportunity Mapping", desc: "Synthesize findings into problem statements and high-conviction product bets." },
      { step: "04", title: "Roadmap Formulation", desc: "Deliver actionable product specs, release schedules, and KPI tracking scorecards." },
    ],
    techStack: ["Figma", "Miro", "Notion", "Mixpanel", "Dovetail", "Linear"],
    faq: [
      { question: "When should a company invest in Product Strategy?", answer: "Before writing any code for a new product, or when re-architecting an existing platform that has plateaued." },
      { question: "Do you collaborate with our in-house product managers?", answer: "Yes, we work as embedded strategic partners alongside your founders, PMs, and technical leads." },
      { question: "How long does a typical Product Strategy engagement take?", answer: "Typically 2 to 4 weeks for a complete discovery and product roadmap sprint." },
    ],
  },

  /* ───────────────────────── 2. UX & UI Design ───────────────────────── */
  {
    title: "UX & UI Design",
    slug: "ux-ui-design",
    shortDescription:
      "Modern, intuitive user interfaces and friction-free user experiences engineered for complex enterprise software, mobile apps, and SaaS platforms.",
    heroSubtitle: "Crafting interfaces that make complex software feel effortless.",
    metrics: [
      { label: "Task Completion", value: "+45%" },
      { label: "User Satisfaction", value: "98%" },
      { label: "Design Delivery", value: "2x Faster" },
    ],
    deliverables: [
      { title: "Interactive Wireframes", desc: "Low-fidelity structural blueprints testing information architecture and user flow efficiency.", iconName: "Layout" },
      { title: "Pixel-Perfect UI Mockups", desc: "Modern, high-fidelity visual design with cohesive color palettes, typography, and iconography.", iconName: "Palette" },
      { title: "Micro-Interactions & Motion", desc: "Engaging transition animations and responsive feedback states that elevate user delight.", iconName: "Zap" },
      { title: "Developer Hand-Off Specs", desc: "Fully annotated design specs, auto-layout tokens, and redlines for seamless frontend implementation.", iconName: "Code2" },
    ],
    workflowSteps: [
      { step: "01", title: "Information Architecture", desc: "Map navigation structures, page hierarchy, and core interaction loops." },
      { step: "02", title: "Wireframing & Flow Design", desc: "Rapidly draft structural flows and test layout alternatives." },
      { step: "03", title: "Visual Design System", desc: "Apply typography, modern elevation, sleek glassmorphism, and branded visual styles." },
      { step: "04", title: "Design QA & Hand-Off", desc: "Inspect frontend builds to guarantee 1:1 parity between design and production code." },
    ],
    techStack: ["Figma", "FigJam", "Storybook", "Principle", "Lottie", "Tailwind CSS"],
    faq: [
      { question: "Do you design for both web and mobile platforms?", answer: "Yes, our designs are mobile-first and responsive across mobile, tablet, desktop, and ultra-wide displays." },
      { question: "Can you provide production-ready SVGs and CSS tokens?", answer: "Yes, our Figma files include production-ready export assets, CSS variables, and design tokens." },
      { question: "How do you ensure accessibility in UI design?", answer: "All typography contrast, focus states, and tap targets are strictly WCAG 2.1 AA compliant." },
    ],
  },

  /* ───────────────────────── 3. Design Systems ───────────────────────── */
  {
    title: "Design Systems",
    slug: "design-systems",
    shortDescription:
      "Scalable token systems, multi-brand component libraries, and living documentation that unite design and engineering teams.",
    heroSubtitle: "Build faster with consistent, scalable design foundations.",
    metrics: [
      { label: "Development Speed", value: "50% Faster" },
      { label: "UI Consistency", value: "100%" },
      { label: "Brand Cohesion", value: "10x" },
    ],
    deliverables: [
      { title: "Design Token Architecture", desc: "Centralized color, spacing, typography, and elevation tokens compatible with CSS/Tailwind.", iconName: "Database" },
      { title: "Multi-State Component Library", desc: "Modular Figma component variants with auto-layout, interactive states, and accessibility props.", iconName: "Layout" },
      { title: "Living Documentation Portal", desc: "Searchable documentation covering usage guidelines, accessibility dos/don'ts, and code snippets.", iconName: "FileText" },
      { title: "Code Alignment (React/Vue)", desc: "Synchronized design tokens mapped to Storybook or frontend component repos for instant adoption.", iconName: "Code2" },
    ],
    workflowSteps: [
      { step: "01", title: "UI Audit & Inventory", desc: "Catalog existing inconsistencies, duplicate components, and visual fragmentation across all apps." },
      { step: "02", title: "Token Foundations", desc: "Establish mathematical scales for typography, color semantic tokens, spacing, and radiuses." },
      { step: "03", title: "Component Crafting", desc: "Build foundational elements (buttons, inputs, modals, navigation) with rigid variant architectures." },
      { step: "04", title: "Governance & Rollout", desc: "Document contribution models, versioning guidelines, and developer adoption tracks." },
    ],
    techStack: ["Figma Variables", "Tokens Studio", "Storybook", "Zeroheight", "Tailwind CSS", "TypeScript"],
    faq: [
      { question: "Can you retrofit a design system into an established codebase?", answer: "Yes, we implement incremental token adoption so existing pages upgrade without breaking." },
      { question: "Do you support dark mode and multi-theme branding?", answer: "Yes, our tokens use semantic aliasing making dark mode and multi-brand white-labeling seamless." },
      { question: "Who maintains the design system after handoff?", answer: "We provide comprehensive governance guidelines and can train your internal team to lead iterations." },
    ],
  },

  /* ───────────────────────── 4. Rapid Prototyping ───────────────────────── */
  {
    title: "Rapid Prototyping",
    slug: "rapid-prototyping",
    shortDescription:
      "High-fidelity clickable prototypes that validate features with users, investors, and stakeholders in days instead of months.",
    heroSubtitle: "Validate concepts before writing a single line of backend code.",
    metrics: [
      { label: "Validation Time", value: "<7 Days" },
      { label: "Stakeholder Buy-in", value: "100%" },
      { label: "Waste Reduction", value: "65%" },
    ],
    deliverables: [
      { title: "Clickable High-Fidelity Prototypes", desc: "Realistic interactions, transitions, and micro-flows that mirror real production software.", iconName: "Zap" },
      { title: "Usability Testing Protocols", desc: "Structured user test scripts, scenario prompts, and task completion metrics.", iconName: "CheckCircle2" },
      { title: "Investor & Pitch Prototypes", desc: "Polished demonstration prototypes tailored for investor decks and executive alignment.", iconName: "Target" },
      { title: "User Feedback Synthesis", desc: "Clear video clips, heatmaps, and actionable design recommendations based on real user trials.", iconName: "TrendingUp" },
    ],
    workflowSteps: [
      { step: "01", title: "Hypothesis Definition", desc: "Isolate the critical core assumptions and high-risk workflows that need validation." },
      { step: "02", title: "Rapid Prototype Build", desc: "Assemble interactive screens with realistic sample data and conditional flows within 48-72 hours." },
      { step: "03", title: "User Testing Rounds", desc: "Run moderated or unmoderated testing sessions with targeted customer profiles." },
      { step: "04", title: "Iteration & Refinement", desc: "Incorporate findings, eliminate user friction, and finalize the proven solution design." },
    ],
    techStack: ["Figma Interactive", "Protopie", "Maze", "UserTesting", "Loom", "Framermotion"],
    faq: [
      { question: "How realistic can the prototype feel?", answer: "With micro-interactions, input states, and transition curves, it feels like a published application." },
      { question: "How quickly can you deliver a clickable prototype?", answer: "Standard rapid prototypes are typically designed and clickable within 3 to 5 business days." },
      { question: "Can the prototype be shared publicly with test participants?", answer: "Yes, we provide secure web preview links that run seamlessly on smartphones, tablets, and desktop browsers." },
    ],
  },

  /* ───────────────────────── 5. Conversion Experience Design ───────────────────────── */
  {
    title: "Conversion Experience Design",
    slug: "conversion-experience-design",
    shortDescription:
      "Psychology-driven landing pages, checkout flows, and onboarding funnels designed to maximize conversion rates and customer lifetime value.",
    heroSubtitle: "Turn clicks into loyal customers with high-converting UX.",
    metrics: [
      { label: "Conversion Lift", value: "+38%" },
      { label: "Bounce Rate", value: "-28%" },
      { label: "Checkout Completion", value: "89%" },
    ],
    deliverables: [
      { title: "High-Converting Landing Pages", desc: "Above-the-fold value hooks, scannable proof points, and high-impact call-to-action designs.", iconName: "Target" },
      { title: "Onboarding & Signup Funnels", desc: "Progressive profiling and zero-friction signup flows that prevent user drop-off.", iconName: "Users" },
      { title: "Checkout & Cart Optimization", desc: "Frictionless checkout paths with trust badges, instant validation, and 1-click payment triggers.", iconName: "CheckCircle2" },
      { title: "A/B Testing Variants", desc: "Alternative design hypotheses, copy hooks, and visual hierarchy tests ready for split-testing.", iconName: "BarChart3" },
    ],
    workflowSteps: [
      { step: "01", title: "Friction & Funnel Audit", desc: "Review heatmaps, scroll depth, and drop-off analytics to isolate conversion leaks." },
      { step: "02", title: "Conversion Architecture", desc: "Apply behavioral design principles, persuasive hierarchy, and friction reduction strategies." },
      { step: "03", title: "Visual Execution", desc: "Design ultra-crisp responsive layouts with trust signals and clear action triggers." },
      { step: "04", title: "Split Test & Measurement", desc: "Deploy multivariate tests to scientifically measure revenue and lead increases." },
    ],
    techStack: ["Hotjar", "PostHog", "Google Optimize / VWO", "Figma", "Next.js", "Unbounce"],
    faq: [
      { question: "How is this different from standard UI design?", answer: "Conversion design directly focuses on behavioral psychology, cognitive load reduction, and measurable revenue KPIs." },
      { question: "Can you redesign our existing landing pages?", answer: "Yes, we specialize in high-ROI redesigns that improve conversion rates without rebuilding the entire website." },
      { question: "Do you supply the copywriting as well?", answer: "Yes, we formulate conversion-focused headlines, value propositions, and micro-copy alongside the visual design." },
    ],
  },
] as const;
