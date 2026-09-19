import type { ServiceDetail } from "@/src/features/services/types";

export type WebDevService = ServiceDetail;

export const webDevServices: readonly WebDevService[] = [
  /* ───────────────────────── 1. Web & App Engineering ───────────────────────── */
  {
    title: "Web & App Engineering",
    slug: "web-app-engineering",
    shortDescription:
      "High‑performance websites, progressive web apps, and native mobile applications built with modern frameworks and pixel‑perfect UI.",
    heroSubtitle: "Craft blazing‑fast digital experiences.",
    metrics: [
      { label: "Lighthouse Score", value: "95+" },
      { label: "Load Time", value: "<1.5s" },
      { label: "Client Retention", value: "94%" },
    ],
    deliverables: [
      { title: "Responsive Web Applications", desc: "Server‑rendered or SPA apps optimised for every screen size and device.", iconName: "Globe" },
      { title: "Progressive Web Apps", desc: "Offline‑capable, installable PWAs with push notifications and app‑like UX.", iconName: "Zap" },
      { title: "Native & Cross‑Platform Mobile", desc: "React Native and Flutter apps shipped to iOS and Android simultaneously.", iconName: "Layout" },
      { title: "Design System & Component Library", desc: "Reusable, accessible component libraries that enforce brand consistency.", iconName: "Code2" },
    ],
    workflowSteps: [
      { step: "01", title: "Discovery & Scoping", desc: "Define requirements, user personas, and technical feasibility." },
      { step: "02", title: "UI/UX & Prototyping", desc: "Wireframes, interactive prototypes, and design‑system tokens." },
      { step: "03", title: "Agile Development", desc: "Sprint‑based builds with continuous demos and feedback loops." },
      { step: "04", title: "QA & Launch", desc: "Automated testing, performance audits, and zero‑downtime deployment." },
    ],
    techStack: ["Next.js", "React", "React Native", "Flutter", "TypeScript", "Tailwind CSS", "Vercel", "Figma"],
    faq: [
      { question: "Do you build native mobile apps too?", answer: "Yes — we deliver native iOS/Android or cross‑platform apps with React Native and Flutter." },
      { question: "Can you work with our existing design system?", answer: "Absolutely. We can adopt, extend, or build a new design system from scratch." },
      { question: "How do you handle SEO for SPAs?", answer: "We use SSR/SSG with Next.js to ensure full crawlability and top Lighthouse scores." },
    ],
  },

  /* ───────────────────────── 2. AI Product Development ───────────────────────── */
  {
    title: "AI Product Development",
    slug: "ai-product-development",
    shortDescription:
      "End‑to‑end AI‑powered products — from intelligent chatbots and recommendation engines to computer vision pipelines and LLM integrations.",
    heroSubtitle: "Turn artificial intelligence into real business value.",
    metrics: [
      { label: "Model Accuracy", value: "97%+" },
      { label: "Time‑to‑Production", value: "6 weeks" },
      { label: "Cost Reduction", value: "40%" },
    ],
    deliverables: [
      { title: "Custom LLM Integrations", desc: "Fine‑tuned GPT, Claude, or open‑source models embedded in your product workflow.", iconName: "Brain" },
      { title: "Intelligent Chatbots & Agents", desc: "Conversational AI with RAG pipelines, tool‑use, and memory for support and sales.", iconName: "Zap" },
      { title: "Recommendation & Personalization", desc: "ML‑driven recommendation engines that boost engagement and revenue.", iconName: "TrendingUp" },
      { title: "Computer Vision Pipelines", desc: "Image classification, object detection, and video analytics solutions.", iconName: "Target" },
    ],
    workflowSteps: [
      { step: "01", title: "Problem Framing", desc: "Identify use cases, define success metrics, and evaluate data readiness." },
      { step: "02", title: "Data Engineering", desc: "Collect, clean, and pipeline data for training and evaluation." },
      { step: "03", title: "Model Development", desc: "Train, fine‑tune, and benchmark models against baselines." },
      { step: "04", title: "Productionisation", desc: "Deploy with monitoring, A/B testing, and continuous retraining." },
    ],
    techStack: ["Python", "PyTorch", "TensorFlow", "LangChain", "OpenAI API", "Pinecone", "FastAPI", "Hugging Face"],
    faq: [
      { question: "Do you work with proprietary data?", answer: "Yes — all data stays within your infrastructure. We sign NDAs and follow strict data governance." },
      { question: "Can you fine‑tune open‑source models?", answer: "Absolutely. We regularly fine‑tune Llama, Mistral, and other open‑weight models." },
      { question: "How do you ensure model reliability?", answer: "Comprehensive evaluation suites, red‑teaming, guardrails, and automated monitoring." },
    ],
  },

  /* ───────────────────────── 3. API & Systems Integration ───────────────────────── */
  {
    title: "API & Systems Integration",
    slug: "api-systems-integration",
    shortDescription:
      "Seamless connectivity between your tools, platforms, and data sources through robust REST/GraphQL APIs, middleware, and event‑driven architecture.",
    heroSubtitle: "Connect every system into one intelligent ecosystem.",
    metrics: [
      { label: "Integration Speed", value: "3× faster" },
      { label: "API Uptime", value: "99.99%" },
      { label: "Data Sync Accuracy", value: "100%" },
    ],
    deliverables: [
      { title: "Custom REST & GraphQL APIs", desc: "Production‑grade APIs with OpenAPI specs, versioning, and rate limiting.", iconName: "Database" },
      { title: "Third‑Party Integrations", desc: "CRM, ERP, payment gateways, and SaaS connectors built to spec.", iconName: "Share2" },
      { title: "Event‑Driven Architecture", desc: "Real‑time data flows with Kafka, RabbitMQ, or AWS EventBridge.", iconName: "Zap" },
      { title: "Legacy System Modernisation", desc: "Wrap legacy systems with modern APIs without disrupting operations.", iconName: "Cpu" },
    ],
    workflowSteps: [
      { step: "01", title: "System Audit", desc: "Map existing systems, data flows, and integration pain points." },
      { step: "02", title: "Architecture Design", desc: "Design API contracts, event schemas, and middleware topology." },
      { step: "03", title: "Build & Integrate", desc: "Develop connectors, transformers, and orchestration logic." },
      { step: "04", title: "Monitor & Scale", desc: "Deploy observability dashboards and auto‑scaling policies." },
    ],
    techStack: ["Node.js", "Express", "GraphQL", "Kafka", "RabbitMQ", "PostgreSQL", "Redis", "Docker"],
    faq: [
      { question: "Can you integrate with our legacy ERP?", answer: "Yes — we build adapter layers and APIs around legacy systems without touching core logic." },
      { question: "Do you support real‑time data sync?", answer: "Absolutely. We use event‑driven patterns for sub‑second data propagation." },
      { question: "How do you handle API security?", answer: "OAuth2, API keys, rate limiting, request signing, and comprehensive audit logging." },
    ],
  },

  /* ───────────────────────── 4. Cloud & DevOps ───────────────────────── */
  {
    title: "Cloud & DevOps",
    slug: "cloud-devops",
    shortDescription:
      "Scalable cloud infrastructure, CI/CD pipelines, container orchestration, and infrastructure‑as‑code to ship faster with zero downtime.",
    heroSubtitle: "Ship faster. Scale infinitely. Sleep soundly.",
    metrics: [
      { label: "Deploy Frequency", value: "50×/week" },
      { label: "Uptime SLA", value: "99.95%" },
      { label: "Infra Cost Savings", value: "35%" },
    ],
    deliverables: [
      { title: "CI/CD Pipeline Engineering", desc: "Automated build, test, and deploy pipelines with GitHub Actions, GitLab CI, or Jenkins.", iconName: "Code2" },
      { title: "Container Orchestration", desc: "Production Kubernetes clusters with Helm charts, auto‑scaling, and self‑healing.", iconName: "Cpu" },
      { title: "Infrastructure as Code", desc: "Terraform and Pulumi modules for reproducible, auditable cloud environments.", iconName: "FileText" },
      { title: "Observability & SRE", desc: "Prometheus, Grafana, and PagerDuty setups with SLOs and automated alerting.", iconName: "Bell" },
    ],
    workflowSteps: [
      { step: "01", title: "Cloud Assessment", desc: "Evaluate current infrastructure and identify migration or optimisation paths." },
      { step: "02", title: "Architecture Blueprint", desc: "Design VPC topology, networking, IAM, and multi‑region strategy." },
      { step: "03", title: "Provision & Automate", desc: "Deploy IaC modules, configure CI/CD, and containerise workloads." },
      { step: "04", title: "Operate & Optimise", desc: "Cost monitoring, performance tuning, and continuous security hardening." },
    ],
    techStack: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "Prometheus"],
    faq: [
      { question: "Which cloud providers do you work with?", answer: "AWS, Azure, GCP, and multi‑cloud / hybrid setups." },
      { question: "Can you migrate our on‑prem infrastructure?", answer: "Yes — we plan and execute lift‑and‑shift, re‑platform, or re‑architect migrations." },
      { question: "Do you provide 24/7 support?", answer: "We offer managed SRE packages with on‑call rotations and incident response." },
    ],
  },

  /* ───────────────────────── 5. Quality Automation ───────────────────────── */
  {
    title: "Quality Automation",
    slug: "quality-automation",
    shortDescription:
      "Automated testing frameworks, performance benchmarks, and continuous quality gates that catch bugs before your users do.",
    heroSubtitle: "Ship confidently with automated quality at every layer.",
    metrics: [
      { label: "Test Coverage", value: "95%+" },
      { label: "Bug Escape Rate", value: "<1%" },
      { label: "CI Time Savings", value: "60%" },
    ],
    deliverables: [
      { title: "E2E Test Automation", desc: "Playwright and Cypress suites covering critical user journeys with visual regression.", iconName: "CheckCircle2" },
      { title: "API & Contract Testing", desc: "Automated API validation with Pact, Postman, or custom frameworks.", iconName: "Database" },
      { title: "Performance & Load Testing", desc: "k6 and Locust scripts simulating real‑world traffic and identifying bottlenecks.", iconName: "BarChart3" },
      { title: "CI Quality Gates", desc: "Automated linting, security scanning, and coverage thresholds in every pipeline.", iconName: "Target" },
    ],
    workflowSteps: [
      { step: "01", title: "Quality Audit", desc: "Assess current testing gaps, flakiness, and coverage blind spots." },
      { step: "02", title: "Strategy & Framework", desc: "Design test pyramid, select tools, and define quality KPIs." },
      { step: "03", title: "Automate & Integrate", desc: "Build test suites and wire them into CI/CD as mandatory gates." },
      { step: "04", title: "Report & Iterate", desc: "Dashboards, trend analysis, and continuous test maintenance." },
    ],
    techStack: ["Playwright", "Cypress", "Jest", "k6", "Postman", "Pact", "SonarQube", "GitHub Actions"],
    faq: [
      { question: "Can you automate tests for our existing app?", answer: "Yes — we retrofit automation onto legacy and modern codebases alike." },
      { question: "Do you handle mobile app testing?", answer: "Absolutely — Appium and Detox for native, Playwright for mobile web." },
      { question: "How do you reduce flaky tests?", answer: "Isolation, deterministic data, retry policies, and root‑cause analysis for every flake." },
    ],
  },
] as const;
