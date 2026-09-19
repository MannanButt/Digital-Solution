export interface ClientReview {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarInitials: string;
  rating: number;
  category: "AI Automation" | "Web Development" | "Cloud & Architecture" | "Performance Marketing";
  quote: string;
  outcome: string;
  date: string;
  verified: boolean;
}

export const allClientReviews: ClientReview[] = [
  {
    id: "northline-logistics",
    name: "Amina Rahman",
    role: "Head of Operations",
    company: "Northline Logistics",
    avatarInitials: "AR",
    rating: 5,
    category: "AI Automation",
    quote:
      "Digital Solutions replaced a week of manual handoffs with an autonomous pipeline that runs overnight. Our operations team finally has bandwidth for work that actually requires human judgment.",
    outcome: "Saved 32+ ops hours weekly",
    date: "August 2026",
    verified: true,
  },
  {
    id: "harborpay-fintech",
    name: "James Okonkwo",
    role: "VP Product",
    company: "Harborpay",
    avatarInitials: "JO",
    rating: 5,
    category: "Web Development",
    quote:
      "They did not just add AI to the product. They rebuilt the experience around how our enterprise customers actually transact, and conversion followed immediately across our tier-1 accounts.",
    outcome: "+48% checkout conversion",
    date: "July 2026",
    verified: true,
  },
  {
    id: "lumen-and-co",
    name: "Sofia Alvarez",
    role: "Marketing Director",
    company: "Lumen & Co.",
    avatarInitials: "SA",
    rating: 5,
    category: "Performance Marketing",
    quote:
      "Clear process, tight communication, and delivery we could confidently present to the board. It felt like an organic extension of our core internal leadership team from day one.",
    outcome: "4.2× sustained ROAS lift",
    date: "June 2026",
    verified: true,
  },
  {
    id: "apex-cloud-systems",
    name: "David Vance",
    role: "Chief Technology Officer",
    company: "Apex Cloud Networks",
    avatarInitials: "DV",
    rating: 5,
    category: "Cloud & Architecture",
    quote:
      "Their microservices restructuring cut our API latency by 64% while trimming cloud server expenditure by over $8,500 every single month. Highly technical engineers who speak business outcomes.",
    outcome: "64% latency drop & -30% cloud bill",
    date: "May 2026",
    verified: true,
  },
  {
    id: "zenith-health",
    name: "Elena Rostova",
    role: "VP Patient Experience",
    company: "Zenith Digital Health",
    avatarInitials: "ER",
    rating: 5,
    category: "AI Automation",
    quote:
      "Deploying secure, HIPAA-compliant document intelligence eliminated our manual intake backlog. What previously took 3 days now resolves in under 4 minutes with zero data discrepancies.",
    outcome: "98% reduction in intake turnaround",
    date: "April 2026",
    verified: true,
  },
  {
    id: "stride-ecommerce",
    name: "Marcus Sterling",
    role: "Founder & CEO",
    company: "Stride Athletic Gear",
    avatarInitials: "MS",
    rating: 5,
    category: "Web Development",
    quote:
      "Our store handles massive product drop traffic surges without breaking a sweat. The custom headless storefront they delivered was the single highest ROI investment we made this year.",
    outcome: "Zero downtime during $2M drop",
    date: "March 2026",
    verified: true,
  },
];
