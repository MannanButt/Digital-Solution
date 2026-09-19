export type SubServiceDetail = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  metrics: readonly { value: string; label: string }[];
  deliverables: readonly { title: string; desc: string; iconName: string }[];
  workflowSteps: readonly { step: string; title: string; desc: string }[];
  techStack: readonly string[];
  faq: readonly { question: string; answer: string }[];
};

export const marketingSeoSubServices: Record<string, SubServiceDetail> = {
  "technical-seo": {
    slug: "technical-seo",
    title: "Technical SEO & Architecture",
    eyebrow: "Search Engine Optimization",
    headline: "Engineering search architecture for maximum indexability and speed.",
    description: "We optimize crawl budgets, structured schema data, Core Web Vitals, and server-side rendering to turn your platform into an organic search authority.",
    metrics: [
      { value: "99+", label: "Core Web Vitals Score" },
      { value: "3.4×", label: "Organic Crawl Frequency" },
      { value: "+180%", label: "Indexed Landing Pages" },
    ],
    deliverables: [
      { title: "Core Web Vitals & Speed Optimization", desc: "Sub-second LCP and zero Cumulative Layout Shift across desktop and mobile browsers.", iconName: "Zap" },
      { title: "JSON-LD & Structured Schema", desc: "Custom Rich Snippets schema for products, services, FAQs, organizations, and knowledge graphs.", iconName: "Code2" },
      { title: "Crawl Budget & Indexing Control", desc: "Robots.txt, sitemap management, canonical URL enforcement, and rendering log analysis.", iconName: "Search" },
      { title: "International SEO & Hreflang", desc: "Multi-region, multi-language URL routing and geotargeted search signaling.", iconName: "Globe" },
    ],
    workflowSteps: [
      { step: "01", title: "Comprehensive Tech Audit", desc: "Deep log analysis, crawling 100k+ URLs to identify indexing barriers and latency spikes." },
      { step: "02", title: "Architecture Refactoring", desc: "Fixing JS rendering bottlenecks, canonical conflicts, and broken URL structures." },
      { step: "03", title: "Schema & Speed Deployment", desc: "Injecting structured JSON-LD schema and optimizing image/code bundles for instant load." },
      { step: "04", title: "Monitoring & Maintenance", desc: "Automated Search Console monitoring to instantly catch indexation anomalies." },
    ],
    techStack: ["Next.js / Vinext", "JSON-LD Schema", "Cloudflare Workers", "Screaming Frog", "Google Search Console API"],
    faq: [
      { question: "How quickly can technical SEO improvements boost rankings?", answer: "Technical fixes like Core Web Vitals and Schema rendering typically reflect in Google indexation within 2 to 4 weeks." },
      { question: "Do you handle JavaScript rendering SEO?", answer: "Yes, we specialize in SSR and RSC (React Server Components) so search bots receive fully pre-rendered HTML." },
    ],
  },
  "ai-content-systems": {
    slug: "ai-content-systems",
    title: "AI Content Systems & Programmatic SEO",
    eyebrow: "Content Automation",
    headline: "Scaling search content creation with brand-governed AI workflows.",
    description: "Build automated content engines that research, draft, fact-check, and publish SEO-optimized articles, product landing pages, and documentation at scale.",
    metrics: [
      { value: "10×", label: "Faster Content Output" },
      { value: "100%", label: "Brand Voice Alignment" },
      { value: "+240%", label: "Organic Search Traffic" },
    ],
    deliverables: [
      { title: "Programmatic SEO Engines", desc: "Dynamic page generation templates driven by structured datasets for long-tail search dominance.", iconName: "Cpu" },
      { title: "Brand Voice AI Fine-Tuning", desc: "Custom LLM prompts and style rules ensuring every piece matches your corporate tone.", iconName: "FileText" },
      { title: "Automated Fact-Checking & Editing", desc: "Multi-stage AI workflows that verify facts, cite sources, and check readability before human review.", iconName: "CheckCircle2" },
      { title: "Multi-Channel Distribution", desc: "Automatically syndicate content to blogs, social platforms, and newsletters.", iconName: "Share2" },
    ],
    workflowSteps: [
      { step: "01", title: "Search Intent Mapping", desc: "Keyword research and entity mapping to discover high-value search clusters." },
      { step: "02", title: "Engine & Prompt Design", desc: "Building modular AI prompts and formatting templates for your CMS." },
      { step: "03", title: "Human-in-the-Loop Review", desc: "Setting up approval dashboards for rapid editor review and publishing." },
      { step: "04", title: "Programmatic Scaling", desc: "Launching hundreds of target pages with automated sitemap updates." },
    ],
    techStack: ["OpenAI API / Claude", "Headless CMS", "Programmatic SEO Data Pipelines", "Grammarly & Style Validation"],
    faq: [
      { question: "Does Google penalize AI-generated content?", answer: "Google explicitly rewards high-quality, helpful content regardless of how it is produced. We enforce human editing and strict quality standards." },
      { question: "Can we integrate this with our existing CMS?", answer: "Yes, our content workflows publish directly into WordPress, Webflow, Contentful, or custom Next.js apps." },
    ],
  },
  "performance-marketing": {
    slug: "performance-marketing",
    title: "Performance Marketing & AI Bidding",
    eyebrow: "Paid Growth & Advertising",
    headline: "Data-driven ad campaigns optimized for maximum return on ad spend.",
    description: "Combine AI bid management, dynamic creative optimization, and conversion-focused landing pages to turn paid search and social into predictable growth.",
    metrics: [
      { value: "4.2×", label: "Average ROAS" },
      { value: "-35%", label: "Lower Cost Per Acquisition" },
      { value: "24/7", label: "Algorithmic Bid Tuning" },
    ],
    deliverables: [
      { title: "Google & Meta Ads Automation", desc: "Structure-driven campaign setups with continuous creative testing and smart bidding.", iconName: "Target" },
      { title: "Dynamic Landing Page Experience", desc: "Personalized landing page variants aligned with visitor search keywords for max conversions.", iconName: "Layout" },
      { title: "Ad Creative Automation", desc: "Generative creative pipelines producing high-converting ad variations in minutes.", iconName: "Zap" },
      { title: "Conversion Rate Optimization (CRO)", desc: "A/B testing, heatmaps, and friction reduction across checkout and lead forms.", iconName: "TrendingUp" },
    ],
    workflowSteps: [
      { step: "01", title: "Audience & Competitor Audit", desc: "Analyze high-performing keywords, ad creatives, and competitor positioning." },
      { step: "02", title: "Campaign & Landing Page Build", desc: "Engineered campaigns paired with high-converting, sub-second landing pages." },
      { step: "03", title: "AI Bidding Activation", desc: "Connecting offline conversion tracking to guide ad platform algorithms towards high-value leads." },
      { step: "04", title: "Creative & Copy Testing", desc: "Weekly creative refreshes to eliminate ad fatigue and drive down CPA." },
    ],
    techStack: ["Google Ads API", "Meta Ads Manager", "Vite / Next.js CRO Pages", "PostHog & Hotjar", "GA4 Premier"],
    faq: [
      { question: "What ad channels do you manage?", answer: "We focus on Google Search, Performance Max, Meta Ads (Instagram/Facebook), LinkedIn Ads, and YouTube Ads." },
      { question: "How do you handle conversion tracking with privacy updates?", answer: "We implement Server-Side Google Tag Manager and Conversions API (CAPI) to preserve 100% data accuracy." },
    ],
  },
  "crm-lifecycle-automation": {
    slug: "crm-lifecycle-automation",
    title: "CRM & Lifecycle Automation",
    eyebrow: "Retention & Customer Journeys",
    headline: "Automating customer communication from first touch to long-term retention.",
    description: "We connect your CRM, email, SMS, and product data into unified automation flows that nurture prospects and drive repeat customer lifetime value.",
    metrics: [
      { value: "+65%", label: "Email Revenue Growth" },
      { value: "85%", label: "Automated Lead Qualification" },
      { value: "3.8×", label: "Higher Repeat Purchase Rate" },
    ],
    deliverables: [
      { title: "Omnichannel Lifecycle Flows", desc: "Automated welcome series, abandoned cart, post-purchase, and win-back email/SMS sequences.", iconName: "Mail" },
      { title: "CRM Architecture & Lead Scoring", desc: "Structuring Hubspot, Salesforce, or Klaviyo with intelligent lead scoring and routing.", iconName: "Users" },
      { title: "Customer Behavioral Segmentation", desc: "Dynamic user segments based on real-time app usage, purchase frequency, and RFM metrics.", iconName: "PieChart" },
      { title: "Automated Sales Handoff", desc: "Instant Slack/CRM notifications when high-intent leads take key actions.", iconName: "Bell" },
    ],
    workflowSteps: [
      { step: "01", title: "Lifecycle Audit & Mapping", desc: "Mapping the customer journey to spot drop-offs and retention opportunities." },
      { step: "02", title: "CRM Data Synchronization", desc: "Unifying website behavior, product data, and sales activity into one CRM source." },
      { step: "03", title: "Flow Build & Copywriting", desc: "Creating targeted email designs, SMS triggers, and conditional logic flows." },
      { step: "04", title: "Optimization & A/B Testing", desc: "Testing subject lines, timing intervals, and offer structures for maximum ROI." },
    ],
    techStack: ["HubSpot", "Klaviyo", "Salesforce", "Zapier / Make", "Segment", "Twilio SMS"],
    faq: [
      { question: "Which CRM platforms do you support?", answer: "We specialize in HubSpot, Klaviyo, Salesforce, ActiveCampaign, and custom database webhooks." },
      { question: "Can you help migrate our existing email list and automations?", answer: "Yes, we handle seamless data migration without downtime or deliverability loss." },
    ],
  },
  "analytics-attribution": {
    slug: "analytics-attribution",
    title: "Analytics & Multi-Touch Attribution",
    eyebrow: "Data & Revenue Intelligence",
    headline: "Clarity on where every dollar comes from and which channels drive profit.",
    description: "Eliminate dark social and channel attribution guesswork with custom data pipelines, executive dashboards, and first-party tracking infrastructure.",
    metrics: [
      { value: "100%", label: "First-Party Data Ownership" },
      { value: "0", label: "Attribution Blindspots" },
      { value: "Realtime", label: "Revenue Dashboards" },
    ],
    deliverables: [
      { title: "First-Party Server-Side Tracking", desc: "Bypass ad-blockers and iOS privacy restrictions with server-side GTM and custom domain tracking.", iconName: "Database" },
      { title: "Multi-Touch Attribution Modeling", desc: "First-touch, last-touch, linear, and data-driven models to understand the entire buying path.", iconName: "BarChart3" },
      { title: "Executive Revenue Dashboards", desc: "Real-time Looker Studio / Metabase dashboards connecting ad spend to actual bank revenue.", iconName: "LineChart" },
      { title: "Predictive LTV Analytics", desc: "Machine learning models forecasting customer lifetime value and churn risk.", iconName: "Brain" },
    ],
    workflowSteps: [
      { step: "01", title: "Tracking Audit & Cleanup", desc: "Auditing current tags, pixel errors, and broken conversion events." },
      { step: "02", title: "Server-Side Setup", desc: "Deploying server-side tracking containers hosted on your primary domain." },
      { step: "03", title: "Attribution Modeling", desc: "Building unified SQL data models joining ad platforms, web events, and CRM sales." },
      { step: "04", title: "Dashboard Delivery & Training", desc: "Delivering automated executive dashboards with weekly reporting alerts." },
    ],
    techStack: ["Server-Side GTM", "GA4", "PostHog", "BigQuery / Snowflake", "Looker Studio", "Metabase"],
    faq: [
      { question: "Why is server-side tracking better than client-side tags?", answer: "Server-side tracking runs on your own domain, preventing ad-blocker loss, extending cookie life, and improving site speed." },
      { question: "Can we track offline sales or phone calls back to ad campaigns?", answer: "Yes, we integrate CRM offline conversion uploads to attribute sales closed weeks later back to initial ad clicks." },
    ],
  },
};
