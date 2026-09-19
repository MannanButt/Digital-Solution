// src/features/services/data/aiAutomationData.ts
export type AIAutomationService = {
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

export const aiAutomationServices: readonly AIAutomationService[] = [
  /* ───────────────────────── 1. AI Workflow Automation ───────────────────────── */
  {
    title: "AI Workflow Automation",
    slug: "ai-workflow-automation",
    shortDescription:
      "Connect disparate business systems into continuous, autonomous workflows that eliminate repetitive manual handoffs and operational drag.",
    heroSubtitle: "Turn fragmented manual tasks into hands-off automated workflows.",
    metrics: [
      { label: "Operational Speed", value: "10x Faster" },
      { label: "Cost Reduction", value: "48%" },
      { label: "Error Elimination", value: "99.9%" },
    ],
    deliverables: [
      { title: "End-to-End Workflow Orchestration", desc: "Automate cross-platform handoffs between ERPs, CRMs, financial systems, and communication tools.", iconName: "Zap" },
      { title: "Smart Routing & Decision Engines", desc: "Conditional AI logic paths that triage incoming leads, support tickets, and work orders autonomously.", iconName: "Cpu" },
      { title: "Human-in-the-Loop Triggers", desc: "Confidence score thresholds that automatically route edge cases to human managers for quick signoff.", iconName: "CheckCircle2" },
      { title: "Real-Time Pipeline Monitoring", desc: "Live event logging, anomaly alerts, and automatic recovery protocols for mission-critical jobs.", iconName: "Bell" },
    ],
    workflowSteps: [
      { step: "01", title: "Process Discovery", desc: "Map bottlenecked human processes, API touchpoints, and volume metrics across departments." },
      { step: "02", title: "Architecture & Logic Design", desc: "Formulate event-driven DAGs, retry rules, error cascades, and state management schemas." },
      { step: "03", title: "Integration & Deployment", desc: "Build connectors, deploy cloud webhooks, and integrate secure enterprise authorization." },
      { step: "04", title: "Continuous Optimization", desc: "Monitor cycle times, identify latency regressions, and continuously optimize throughput." },
    ],
    techStack: ["Temporal", "LangChain", "n8n", "Make / Zapier Enterprise", "Python", "Redis", "AWS Step Functions"],
    faq: [
      { question: "How safe is it to automate core business operations?", answer: "We implement strict Human-in-the-Loop (HITL) checkpoints and idempotent transactions so operations remain dependable and auditable." },
      { question: "Can you automate tools that lack public APIs?", answer: "Yes, we combine headless browser agents and secure webhook middleware to bridge closed systems." },
      { question: "How quickly can an automated workflow go live?", answer: "Standard department workflows typically go live in staging within 2 to 3 weeks of architectural scoping." },
    ],
  },

  /* ───────────────────────── 2. AI Agents & Copilots ───────────────────────── */
  {
    title: "AI Agents & Copilots",
    slug: "ai-agents-copilots",
    shortDescription:
      "Autonomous goal-seeking agents and internal conversational copilots equipped with domain memory, API tooling, and safe action execution.",
    heroSubtitle: "Deploy intelligent agents that take action, not just answer questions.",
    metrics: [
      { label: "Task Autonomy", value: "85%" },
      { label: "Response Latency", value: "<800ms" },
      { label: "Team Productivity", value: "+60%" },
    ],
    deliverables: [
      { title: "Domain-Trained Copilots", desc: "Internal copilots tuned on your company codebase, SOPs, contracts, and knowledge base.", iconName: "Brain" },
      { title: "Tool-Augmented Autonomous Agents", desc: "Agents capable of running SQL queries, creating Jira tickets, scheduling calendar invites, and updating records.", iconName: "Zap" },
      { title: "Multi-Agent Coordination Systems", desc: "Collaborative agent clusters where specialized sub-agents delegate, critique, and finalize outputs.", iconName: "Users" },
      { title: "Enterprise Access Control (RBAC)", desc: "Fine-grained permissions ensuring copilots only access information the authenticated user has clearance for.", iconName: "CheckCircle2" },
    ],
    workflowSteps: [
      { step: "01", title: "Agent Role Definition", desc: "Define explicit agent goals, tool allowances, knowledge scopes, and safety boundaries." },
      { step: "02", title: "RAG & Memory Engineering", desc: "Vectorize domain knowledge, configure hybrid search, and deploy conversational memory stores." },
      { step: "03", title: "Tool & API Wiring", desc: "Connect function calling interfaces for databases, SaaS APIs, and calculation modules." },
      { step: "04", title: "Safety Guardrails & Rollout", desc: "Implement prompt injection defense, hallucination checks, and role-based rollouts." },
    ],
    techStack: ["OpenAI Swarm / AutoGen", "LangGraph", "Claude 3.5 Sonnet", "Pinecone", "pgvector", "FastAPI", "Next.js"],
    faq: [
      { question: "Can agents take destructive actions by mistake?", answer: "No. All write/delete actions require human confirmation or adhere to strict transactional sandboxes." },
      { question: "Will our internal company data be used to train external models?", answer: "Never. We use enterprise zero-data-retention APIs and self-hosted private cloud vector instances." },
      { question: "What platforms do the copilots integrate into?", answer: "Slack, Microsoft Teams, internal web dashboards, or embedded directly inside your software app." },
    ],
  },

  /* ───────────────────────── 3. Process Intelligence ───────────────────────── */
  {
    title: "Process Intelligence",
    slug: "process-intelligence",
    shortDescription:
      "Data-driven mining of system event logs and workflow trajectories to identify bottlenecks, measure automation ROI, and unearth optimization opportunities.",
    heroSubtitle: "X-ray your enterprise operations to uncover hidden inefficiencies.",
    metrics: [
      { label: "Process Visibility", value: "100%" },
      { label: "Bottleneck Discovery", value: "3x Faster" },
      { label: "ROI Accuracy", value: "98%" },
    ],
    deliverables: [
      { title: "Process Mining & Journey Maps", desc: "Algorithmic reconstruction of actual operational workflows from raw event logs.", iconName: "BarChart3" },
      { title: "Friction & Bottleneck Detection", desc: "Automated identification of wait times, redundant loops, and rework hotspots across teams.", iconName: "Target" },
      { title: "Automation Opportunity Scoring", desc: "Scoring models ranking candidate processes by technical feasibility, hours saved, and financial ROI.", iconName: "TrendingUp" },
      { title: "Live Process Health Dashboards", desc: "Real-time metrics tracking cycle duration, throughput rate, and variance from standard SOPs.", iconName: "LineChart" },
    ],
    workflowSteps: [
      { step: "01", title: "Event Log Ingestion", desc: "Extract timestamped activity logs from ERP, CRM, issue trackers, and database audit logs." },
      { step: "02", title: "Graph Modeling & Conformance", desc: "Model process graphs to compare real-world employee workflows against theoretical SOPs." },
      { step: "03", title: "Root-Cause Diagnostics", desc: "Identify the organizational and technical causes behind delays, handoff friction, and rework." },
      { step: "04", title: "Automation Roadmap", desc: "Deliver prioritized action plans highlighting where automation produces the highest yield." },
    ],
    techStack: ["Celonis / PM4Py", "Apache Spark", "Snowflake", "BigQuery", "Metabase", "Python"],
    faq: [
      { question: "What data is required for process intelligence?", answer: "Case IDs, activity names, and timestamps from your existing database or SaaS event logs." },
      { question: "How is this different from traditional business analytics?", answer: "Traditional BI reports what happened; Process Intelligence visualizes the exact chronological path and reasons why delays occurred." },
      { question: "Can this monitor compliance and regulatory deviations?", answer: "Yes, automated alerts trigger whenever an execution path violates internal security or compliance protocols." },
    ],
  },

  /* ───────────────────────── 4. Document Intelligence ───────────────────────── */
  {
    title: "Document Intelligence",
    slug: "document-intelligence",
    shortDescription:
      "Transform unstructured PDFs, contracts, invoices, and clinical/legal files into structured, validated database records at sub-second speeds.",
    heroSubtitle: "Unlock high-precision structured data from unstructured documents.",
    metrics: [
      { label: "Extraction Accuracy", value: "99.4%" },
      { label: "Processing Speed", value: "<1.2s/page" },
      { label: "Manual Data Entry Cut", value: "92%" },
    ],
    deliverables: [
      { title: "Multi-Modal OCR & Document Parsing", desc: "Extract dense tabular data, signatures, stamps, and handwritten notes from low-res scans.", iconName: "FileText" },
      { title: "Semantic Contract & Clause Analysis", desc: "Automatically identify non-standard clauses, renewal dates, indemnification risks, and liabilities.", iconName: "Search" },
      { title: "Automated Invoice & Receipt Matching", desc: "Match line items against purchase orders and ERP records with autonomous duplicate detection.", iconName: "Database" },
      { title: "Structured Schema Export", desc: "Instant transformation into verified JSON schemas ready for downstream databases or accounting software.", iconName: "Code2" },
    ],
    workflowSteps: [
      { step: "01", title: "Document Taxonomy & Ingestion", desc: "Ingest document types via API, cloud storage, email webhooks, or direct drag-and-drop." },
      { step: "02", title: "OCR & Vision Encoding", desc: "Apply multi-modal LLM vision models to analyze document layout and extract raw text tokens." },
      { step: "03", title: "Semantic Entity Extraction", desc: "Extract target key-value pairs, tables, and clauses using strict JSON schema validation." },
      { step: "04", title: "Confidence Scoring & Output", desc: "Flag low-confidence fields for rapid one-click human verification before database insert." },
    ],
    techStack: ["AWS Textract", "Azure Document Intelligence", "GPT-4o Vision", "Docling", "Pydantic", "PostgreSQL"],
    faq: [
      { question: "Can it handle complex multi-page tables and varying layouts?", answer: "Yes. Our multi-modal vision architecture reconstructs complex tables and spans across page breaks reliably." },
      { question: "What happens if a scan is blurry or distorted?", answer: "Our pre-processing pipeline performs automated de-skewing, contrast enhancement, and noise reduction before extraction." },
      { question: "Is Document Intelligence HIPAA and SOC-2 compliant?", answer: "Yes. All processing runs in zero-retention HIPAA-eligible environments with encryption in transit and at rest." },
    ],
  },

  /* ───────────────────────── 5. Governance & Observability ───────────────────────── */
  {
    title: "Governance & Observability",
    slug: "governance-observability",
    shortDescription:
      "Enterprise guardrails, prompt injection defenses, cost tracking, and telemetry for production AI applications and autonomous agents.",
    heroSubtitle: "Safe, audited, and cost-controlled AI operating at enterprise scale.",
    metrics: [
      { label: "Hallucination Defense", value: "99.8%" },
      { label: "Audit Traceability", value: "100%" },
      { label: "Token Cost Optimization", value: "35%" },
    ],
    deliverables: [
      { title: "Deterministic Guardrail Layers", desc: "Real-time moderation filtering PII, prompt injections, harmful content, and off-topic queries.", iconName: "CheckCircle2" },
      { title: "Full Tracing & Decision Auditing", desc: "Complete lineage tracking of every prompt, tool call, retrieved chunk, and final completion.", iconName: "Search" },
      { title: "Cost & Token Consumption Telemetry", desc: "Granular cost attribution per department, user, and feature with intelligent semantic caching.", iconName: "LineChart" },
      { title: "Automated Evaluation & Drift Alerts", desc: "Continuous benchmarking against gold-standard evaluation datasets to catch model drift early.", iconName: "Bell" },
    ],
    workflowSteps: [
      { step: "01", title: "Security & Policy Definition", desc: "Establish corporate data boundaries, allowed tool lists, and PII redaction policies." },
      { step: "02", title: "Gateway Proxy Integration", desc: "Route all LLM requests through a centralized AI gateway for unified caching, routing, and filtering." },
      { step: "03", title: "Tracing & Telemetry Setup", desc: "Instrument OpenTelemetry collectors to log latency, cost, prompt versions, and user satisfaction." },
      { step: "04", title: "Continuous Benchmarking", desc: "Run scheduled automated evaluations and synthetic red-team attacks against production endpoints." },
    ],
    techStack: ["Langfuse", "Helicone", "NeMo Guardrails", "OpenTelemetry", "Prometheus", "Grafana", "Pydantic"],
    faq: [
      { question: "How do guardrails prevent data leaks?", answer: "Incoming and outgoing text passes through local regex and semantic classifiers that redact PII, API keys, and sensitive IP before hitting any model." },
      { question: "Can we cache repeated queries to save money?", answer: "Yes. Our semantic caching layers intercept near-identical queries, saving up to 40% on API billing with zero latency." },
      { question: "Does observability introduce latency?", answer: "No. Tracing and telemetry events are batched and dispatched asynchronously via background worker threads." },
    ],
  },
] as const;
