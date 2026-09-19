export type ToolCategory = "AI" | "Design" | "Development" | "Productivity";

export type SoftwareTool = {
  readonly id: string;
  readonly name: string;
  readonly plan: string;
  readonly category: ToolCategory;
  readonly logoSlug: string;
  readonly price: number;
  readonly originalPrice: number;
  readonly period: string;
  readonly badge?: string;
  readonly description: string;
  readonly highlights: readonly string[];
};

export const softwareTools: readonly SoftwareTool[] = [
  { id: "chatgpt-plus", name: "ChatGPT Plus", plan: "Private account", category: "AI", logoSlug: "openai", price: 4000, originalPrice: 5600, period: "/ month", badge: "Popular", description: "Priority access for research, writing, coding and everyday AI work.", highlights: ["Private account", "25-day support", "Fast delivery"] },
  { id: "claude-pro", name: "Claude Pro", plan: "Private access", category: "AI", logoSlug: "anthropic", price: 5500, originalPrice: 5600, period: "/ month", badge: "Private", description: "Long-context reasoning and polished writing for demanding projects.", highlights: ["On your email", "Private access", "Setup help"] },
  { id: "gemini-ai", name: "Google AI Pro", plan: "2 TB cloud storage", category: "AI", logoSlug: "googlegemini", price: 2500, originalPrice: 33600, period: "/ year", badge: "Best value", description: "Google AI features with generous cloud storage for your everyday stack.", highlights: ["1-year plan", "2 TB storage", "AI credits"] },
  { id: "canva-pro", name: "Canva Pro", plan: "Personal workspace", category: "Design", logoSlug: "canva", price: 1000, originalPrice: 33600, period: "/ year", badge: "Sale", description: "Premium templates, brand tools and AI-assisted designs in one workspace.", highlights: ["1-year access", "AI features", "Brand kit"] },
  { id: "capcut-pro", name: "CapCut Pro", plan: "Creator plan", category: "Design", logoSlug: "capcut", price: 1000, originalPrice: 5600, period: "/ month", badge: "Sale", description: "Edit social videos faster with premium effects, templates and AI tools.", highlights: ["Premium effects", "AI credits", "Creator ready"] },
  { id: "figma-pro", name: "Figma Pro", plan: "Design seat", category: "Design", logoSlug: "figma", price: 2800, originalPrice: 4500, period: "/ month", description: "Collaborative UI design for product teams and ambitious freelancers.", highlights: ["Professional seat", "Collaboration", "Design files"] },
  { id: "cursor-pro", name: "Cursor Pro", plan: "Private developer plan", category: "Development", logoSlug: "cursor", price: 35000, originalPrice: 67200, period: "/ year", badge: "Developer pick", description: "An AI-native editor for shipping code with focus and speed.", highlights: ["Private plan", "1-year access", "AI coding"] },
  { id: "github-copilot", name: "GitHub Copilot", plan: "Individual plan", category: "Development", logoSlug: "github", price: 3500, originalPrice: 5600, period: "/ month", description: "Keep a capable AI pair-programmer within your existing coding flow.", highlights: ["Individual plan", "Code suggestions", "Setup support"] },
  { id: "notion-plus", name: "Notion Plus", plan: "Personal workspace", category: "Productivity", logoSlug: "notion", price: 1800, originalPrice: 2800, period: "/ month", description: "Organize notes, projects and knowledge in one flexible workspace.", highlights: ["Personal workspace", "Unlimited pages", "Templates"] },
  { id: "grammarly-pro", name: "Grammarly Pro", plan: "Individual plan", category: "Productivity", logoSlug: "grammarly", price: 1800, originalPrice: 3600, period: "/ month", description: "Write with more clarity and confidence across your everyday tools.", highlights: ["Premium checks", "Tone support", "Private setup"] },
  { id: "perplexity-pro", name: "Perplexity Pro", plan: "Research plan", category: "AI", logoSlug: "perplexity", price: 4200, originalPrice: 5600, period: "/ month", description: "Research with cited answers and access to advanced AI models.", highlights: ["Pro searches", "Source citations", "Model access"] },
  { id: "microsoft-365", name: "Microsoft 365", plan: "Personal plan", category: "Productivity", logoSlug: "microsoft365", price: 3200, originalPrice: 5600, period: "/ year", description: "Essential Word, Excel and PowerPoint tools with personal cloud storage.", highlights: ["1-year plan", "Office apps", "Cloud storage"] },
];

export const toolCategories: readonly ("All" | ToolCategory)[] = ["All", "AI", "Design", "Development", "Productivity"];

export const toolLogoSources: Record<string, string> = {
  openai: "/assets/logos/tools/openai.svg",
  anthropic: "/assets/logos/tools/anthropic.svg",
  googlegemini: "/assets/logos/tools/googlegemini.svg",
  canva: "/assets/logos/tools/canva.svg",
  capcut: "/assets/logos/tools/capcut.png",
  figma: "/assets/logos/tools/figma.svg",
  cursor: "/assets/logos/tools/cursor.svg",
  github: "/assets/logos/tools/github.svg",
  notion: "/assets/logos/tools/notion.svg",
  grammarly: "/assets/logos/tools/grammarly.svg",
  perplexity: "/assets/logos/tools/perplexity.svg",
  microsoft365: "/assets/logos/tools/microsoft365.svg",
};
