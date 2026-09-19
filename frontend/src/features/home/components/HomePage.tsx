"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  Star,
  X,
} from "lucide-react";
import { Brand } from "@/src/components/brand/Brand";
import { BrandBar } from "@/src/components/brand/BrandBar";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import { clientReviews, heroImages } from "@/src/features/home/data/content";
import { getServiceItemHref, serviceMenuGroups } from "@/src/features/services/data/services";

type SiteSearchItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  href: "#services" | "#why" | "#method" | "#contact";
  groupIndex?: number;
  featured?: boolean;
};

const serviceSearchItems: SiteSearchItem[] = serviceMenuGroups.flatMap((group, groupIndex) => [
  {
    id: `group-${group.id}`,
    title: group.title,
    category: "Service area",
    description: group.description,
    href: "#services" as const,
    groupIndex,
    featured: groupIndex === 0,
  },
  ...group.services.map((service, serviceIndex) => ({
    id: `${group.id}-${serviceIndex}`,
    title: service,
    category: group.title,
    description: group.description,
    href: "#services" as const,
    groupIndex,
    featured: (groupIndex === 0 && serviceIndex < 2) || (groupIndex > 0 && serviceIndex === 0),
  })),
]);

const siteSearchItems: SiteSearchItem[] = [
  ...serviceSearchItems,
  {
    id: "why-choose-us",
    title: "Why Choose Digital Solutions",
    category: "About Us",
    description: "Enterprise governance, multi-cloud speed, and proven ROI.",
    href: "#why" as const,
  },
  {
    id: "workflow-discovery",
    title: "Workflow Discovery & Strategy",
    category: "Approach",
    description: "Find the highest-value workflows and shape a practical automation roadmap.",
    href: "#method" as const,
  },
  {
    id: "production-approach",
    title: "Production AI Delivery",
    category: "Approach",
    description: "Secure integrations, human approvals, governance, and operational control.",
    href: "#method" as const,
  },
  {
    id: "start-project",
    title: "Start an AI Automation Project",
    category: "Contact",
    description: "Talk with Digital Solutions about your workflow automation opportunity.",
    href: "#contact" as const,
  },
].filter((item, index, items) => (
  items.findIndex((candidate) => candidate.title.toLocaleLowerCase() === item.title.toLocaleLowerCase()) === index
));

const processSteps = [
  {
    step: "01",
    title: "Identify",
    shortCopy: "We surface the highest value AI opportunities, the ones you cannot see yet.",
    heading: "From whiteboard to production.",
    description: "Every engagement starts by mapping your reality to the highest value AI opportunities, so by the time we build, we already know exactly what will move the needle.",
    cmdLogs: [
      { text: "$ Digital Solutions deployment process", type: "cmd" },
      { text: "✓ Requirements mapped", type: "done" },
      { text: "✓ Architecture designed", type: "done" },
      { text: "→ Surfacing high-value AI opportunities..", type: "active" },
      { text: "• Live in discovery", type: "live" },
    ],
    features: ["Workflow Opportunity Mapping", "ROI & Impact Modeling", "Custom AI Feasibility Assessment"],
  },
  {
    step: "02",
    title: "Design",
    shortCopy: "We architect the solution around your reality, not a template.",
    heading: "Tailored AI & System Architecture.",
    description: "We design custom guardrails, human-in-the-loop approvals, and secure API architecture so every workflow fits seamlessly inside your team's stack.",
    cmdLogs: [
      { text: "$ Digital Solutions architecture process", type: "cmd" },
      { text: "✓ Operational guardrails defined", type: "done" },
      { text: "✓ Security & privacy compliance checked", type: "done" },
      { text: "→ Designing custom system specs..", type: "active" },
      { text: "• System blueprint ready", type: "live" },
    ],
    features: ["Human-in-the-Loop Guardrails", "Security & Compliance Audits", "Enterprise Architecture Blueprint"],
  },
  {
    step: "03",
    title: "Build",
    shortCopy: "We build it AI natively, by people who build with AI.",
    heading: "Native AI Development & Integration.",
    description: "Full-stack development, agentic workflows, RAG engines, and cloud software built with sub-second execution speed and enterprise governance.",
    cmdLogs: [
      { text: "$ Digital Solutions build & test runner", type: "cmd" },
      { text: "✓ Next.js & Node services compiled", type: "done" },
      { text: "✓ Agents trained & tested in sandbox", type: "done" },
      { text: "→ Integrating APIs & vector stores..", type: "active" },
      { text: "• Build passed all integration suites", type: "live" },
    ],
    features: ["Autonomous AI & RAG Agents", "Sub-Second Latency Cloud APIs", "Full-Stack Web & Mobile Apps"],
  },
  {
    step: "04",
    title: "Implement",
    shortCopy: "We put it to work, deployed into real operations and measured.",
    heading: "Smooth Operational Rollout.",
    description: "Staging validation, permission controls, webhooks, and telemetry are wired together so live production launches reliably without disrupting existing workflows.",
    cmdLogs: [
      { text: "$ Digital Solutions deployment pipeline", type: "cmd" },
      { text: "✓ Staging validation completed", type: "done" },
      { text: "✓ Team permissions & webhooks set", type: "done" },
      { text: "→ Deploying to production environment..", type: "active" },
      { text: "• Live in production", type: "live" },
    ],
    features: ["Zero-Downtime Deployment", "Real-Time Telemetry & Dashboards", "Automated Fail-Safe Retries"],
  },
  {
    step: "05",
    title: "Enable",
    shortCopy: "We train your people to own it, so value compounds after we leave.",
    heading: "Team Empowerment & Compounding ROI.",
    description: "We train your team to operate, govern, and monitor the intelligent systems, ensuring performance scales long after initial deployment.",
    cmdLogs: [
      { text: "$ Digital Solutions enablement module", type: "cmd" },
      { text: "✓ Documentation & SOPs generated", type: "done" },
      { text: "✓ Internal team training completed", type: "done" },
      { text: "→ Handoff completed & telemetry live..", type: "active" },
      { text: "● Live in production & compounding ROI", type: "live" },
    ],
    features: ["Comprehensive Team SOPs", "Interactive Handoff Training", "Long-Term Value Compounding"],
  },
];

const featuredProjects = [
  {
    id: "alooverse",
    title: "Alooverse",
    category: "FOOD & HOSPITALITY",
    client: "H Block DHA, Lahore",
    description: "A high-energy digital ordering experience for Belgian hand-cut fries, loaded creations, crazy dips, and thick-patty burgers.",
    image: "https://alooverse.alooverse.workers.dev/hero/potato-landed.webp",
    logo: "https://alooverse.alooverse.workers.dev/brand/mascot-profile-hd.webp",
    stats: "Live ordering experience",
    tags: ["Brand Experience", "Digital Menu", "E-commerce"],
    accent: "#e88911",
    href: "https://alooverse.alooverse.workers.dev/",
  },
];

const softwareToolLogoTiles = [
  { name: "ChatGPT", src: "/assets/logos/tools/openai.svg", className: "is-openai" },
  { name: "Claude", src: "/assets/logos/tools/claude.png", className: "is-claude" },
  { name: "Cursor", src: "/assets/logos/tools/cursor.svg", className: "is-cursor" },
  { name: "Canva", src: "/assets/logos/tools/canva.svg", className: "is-canva" },
  { name: "CapCut", src: "/assets/logos/tools/capcut.png", className: "is-capcut" },
  { name: "Gemini", src: "/assets/logos/tools/googlegemini.svg", className: "is-gemini" },
];

export default function HomePage() {
  const [activeHero, setActiveHero] = useState(0);
  const [paused, setPaused] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeServiceGroup, setActiveServiceGroup] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeReviewPage, setActiveReviewPage] = useState(0);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveProcessStep((current) => (current + 1) % processSteps.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (reviewsPaused) return;
    const timer = window.setInterval(() => {
      setActiveReviewPage((current) => (current + 1) % 2);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reviewsPaused]);
  const headerRef = useRef<HTMLElement | null>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchResultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const firstServiceLinkRef = useRef<HTMLAnchorElement | null>(null);
  const menuReturnFocusRef = useRef<HTMLButtonElement | null>(null);
  const servicesCloseTimer = useRef<number | null>(null);

  const cancelServicesClose = () => {
    if (servicesCloseTimer.current !== null) {
      window.clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
  };

  const scheduleServicesClose = () => {
    cancelServicesClose();
    servicesCloseTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  };

  const openServices = (trigger: HTMLButtonElement | null) => {
    cancelServicesClose();
    setSearchOpen(false);
    setSearchQuery("");
    menuReturnFocusRef.current = trigger;
    setServicesOpen(true);
  };

  const changeHero = (direction: number) => {
    setActiveHero((current) => (current + direction + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    if (paused || servicesOpen || searchOpen) return;
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroImages.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [paused, searchOpen, servicesOpen]);

  useEffect(() => {
    if (!servicesOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setServicesOpen(false);
      window.requestAnimationFrame(() => menuReturnFocusRef.current?.focus());
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [servicesOpen]);

  useEffect(() => () => {
    if (servicesCloseTimer.current !== null) window.clearTimeout(servicesCloseTimer.current);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("vx-home-motion-ready");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-home-reveal]"));
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -7%" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!searchOpen) return;

    window.requestAnimationFrame(() => searchInputRef.current?.focus());

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSearchOpen(false);
      setSearchQuery("");
      window.requestAnimationFrame(() => searchButtonRef.current?.focus());
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  // Keep the mega menu stable during hot reloads or if a service category is removed.
  const activeMenuGroup = serviceMenuGroups[activeServiceGroup] ?? serviceMenuGroups[0];
  const activeMenuGroupIndex = serviceMenuGroups.indexOf(activeMenuGroup);
  const normalizedSearch = searchQuery.trim().toLocaleLowerCase();
  const searchResults = siteSearchItems.filter((item) => {
    if (!normalizedSearch) return item.featured;
    const searchable = `${item.title} ${item.category} ${item.description}`.toLocaleLowerCase();
    return normalizedSearch.split(/\s+/).every((term) => searchable.includes(term));
  }).slice(0, 6);

  const closeSearch = (restoreFocus = false) => {
    setSearchOpen(false);
    setSearchQuery("");
    if (restoreFocus) window.requestAnimationFrame(() => searchButtonRef.current?.focus());
  };

  const selectSearchResult = (item: SiteSearchItem) => {
    if (item.groupIndex !== undefined) setActiveServiceGroup(item.groupIndex);
    closeSearch();
  };

  return (
    <div className="vx-page">
      <main className="vx-frame" id="top">
        <section
          className="vx-hero"
          aria-label="Digital Solutions AI automation services"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
          onTouchStart={(event) => {
            touchStart.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const currentX = event.changedTouches[0]?.clientX ?? touchStart.current;
            const distance = currentX - touchStart.current;
            if (Math.abs(distance) > 50) changeHero(distance < 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          <div className="vx-hero-media">
            {heroImages.map((image, index) => (
              <div
                className={`vx-hero-slide${index === activeHero ? " is-active" : ""}`}
                aria-hidden={index !== activeHero}
                key={image.src}
              >
                <img
                  src={image.src}
                  alt={index === activeHero ? image.alt : ""}
                  style={{ objectPosition: image.position }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
          <div className="vx-hero-shade" aria-hidden="true" />

          <header
            className={`vx-header${servicesOpen ? " has-mega-open" : ""}${searchOpen ? " is-searching" : ""}`}
            ref={headerRef}
            onPointerEnter={cancelServicesClose}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") scheduleServicesClose();
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
            }}
          >
            <a href="#top" aria-label="Digital Solutions home">
              <Brand />
            </a>
            <div className="vx-header-center">
              <nav aria-label="Primary navigation">
                <button
                  className="vx-services-trigger"
                  ref={servicesTriggerRef}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-controls="vertex-services-mega"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") openServices(servicesTriggerRef.current);
                  }}
                  onFocus={() => openServices(servicesTriggerRef.current)}
                  onClick={() => openServices(servicesTriggerRef.current)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown") return;
                    event.preventDefault();
                    openServices(servicesTriggerRef.current);
                    window.requestAnimationFrame(() => firstServiceLinkRef.current?.focus());
                  }}
                >
                  Services <ChevronDown size={13} aria-hidden="true" />
                </button>
                <a className="vx-new-service-link" href="/services/software-tools">
                  <span>NEW</span> Software Tools
                </a>
                <a
                  href="#projects"
                  onPointerEnter={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(false)}
                  onClick={() => { setServicesOpen(false); closeSearch(); }}
                >
                  PROJECTS
                </a>
                <a
                  href="#why"
                  onPointerEnter={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(false)}
                  onClick={() => { setServicesOpen(false); closeSearch(); }}
                >
                  WHY US
                </a>
                <a
                  href="#contact"
                  onPointerEnter={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(false)}
                  onClick={() => { setServicesOpen(false); closeSearch(); }}
                >
                  CONTACT
                </a>
              </nav>

              <form
                className={`vx-header-search${searchOpen ? " is-open" : ""}`}
                role="search"
                aria-hidden={!searchOpen}
                onSubmit={(event) => {
                  event.preventDefault();
                  const firstResult = searchResults[0];
                  if (!firstResult) return;
                  selectSearchResult(firstResult);
                  window.requestAnimationFrame(() => {
                    document.querySelector(firstResult.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }}
              >
                <Search className="vx-header-search-icon" size={17} aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  disabled={!searchOpen}
                  tabIndex={searchOpen ? 0 : -1}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown" || searchResults.length === 0) return;
                    event.preventDefault();
                    searchResultRefs.current[0]?.focus();
                  }}
                  aria-label="Search Digital Solutions services and capabilities"
                  aria-controls="vertex-search-results"
                  aria-describedby="vertex-search-status"
                  placeholder="Search services..."
                  autoComplete="off"
                />

                {searchOpen && <div className="vx-search-results" id="vertex-search-results">
                  <div className="vx-search-status" id="vertex-search-status" aria-live="polite">
                    {normalizedSearch
                      ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for “${searchQuery.trim()}”`
                      : "Popular searches"}
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="vx-search-results-list">
                      {searchResults.map((item, index) => (
                        <a
                          className="vx-search-result"
                          href={item.href}
                          ref={(node) => { searchResultRefs.current[index] = node; }}
                          onClick={() => selectSearchResult(item)}
                          onKeyDown={(event) => {
                            if (event.key === "ArrowDown") {
                              event.preventDefault();
                              searchResultRefs.current[(index + 1) % searchResults.length]?.focus();
                            }
                            if (event.key === "ArrowUp") {
                              event.preventDefault();
                              if (index === 0) searchInputRef.current?.focus();
                              else searchResultRefs.current[index - 1]?.focus();
                            }
                          }}
                          key={item.id}
                        >
                          <span>
                            <small>{item.category}</small>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                          </span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="vx-search-empty">
                      No matches yet. Try “automation”, “SEO”, “development”, or “design”.
                    </div>
                  )}
                </div>}
              </form>
            </div>
            <div className="vx-header-actions">
              <button
                className="vx-search-toggle"
                ref={searchButtonRef}
                type="button"
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
                aria-controls="vertex-search-results"
                onClick={() => {
                  cancelServicesClose();
                  setServicesOpen(false);
                  setSearchQuery("");
                  setSearchOpen((open) => !open);
                }}
              >
                {searchOpen ? <X size={17} aria-hidden="true" /> : <Search size={17} aria-hidden="true" />}
              </button>
              <a href="/book-a-demo" onClick={() => { setServicesOpen(false); closeSearch(); }}>Book a Demo <ArrowUpRight size={14} aria-hidden="true" /></a>
              <button
                className="vx-menu-toggle"
                ref={menuButtonRef}
                type="button"
                aria-label={servicesOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={servicesOpen}
                aria-controls="vertex-services-mega"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                  menuReturnFocusRef.current = menuButtonRef.current;
                  setServicesOpen((open) => !open);
                }}
              >
                <Menu size={19} aria-hidden="true" />
              </button>
            </div>

            {servicesOpen && (
              <section
                className="vx-mega-menu is-open"
                id="vertex-services-mega"
                aria-label="Services navigation"
                style={{
                  backdropFilter: "blur(48px) saturate(92%) brightness(58%)",
                  WebkitBackdropFilter: "blur(48px) saturate(92%) brightness(58%)",
                }}
                onPointerEnter={cancelServicesClose}
              >
                <a
                  className="vx-mega-preview"
                  href={`/services/${activeMenuGroup.id}`}
                  onClick={() => setServicesOpen(false)}
                  aria-label={`Explore ${activeMenuGroup.title}`}
                >
                  <div className="vx-mega-preview-images" aria-hidden="true">
                    {serviceMenuGroups.map((group, index) => (
                      <img
                        className={index === activeMenuGroupIndex ? "is-active" : ""}
                        src={group.image}
                        alt=""
                        style={{ objectPosition: group.imagePosition }}
                        key={group.id}
                      />
                    ))}
                  </div>
                                    <div className="vx-mega-preview-copy">
                    <span>{activeMenuGroup.eyebrow}</span>
                    <h2>{activeMenuGroup.title}</h2>
                    <p>{activeMenuGroup.description}</p>
                    <strong>Explore service <ArrowRight size={14} aria-hidden="true" /></strong>
                  </div>
                </a>

                <div className="vx-mega-directory">
                  <div className="vx-mega-topline">
                    <div><span>What we do</span><strong>Services</strong></div>
                    <a href="#services" onClick={() => setServicesOpen(false)}>View all services <ArrowRight size={14} aria-hidden="true" /></a>
                  </div>

                  <div className="vx-mega-groups">
                    {serviceMenuGroups.map((group, groupIndex) => (
                      <section
                        className={`vx-mega-group${groupIndex === activeMenuGroupIndex ? " is-active" : ""}`}
                        key={group.id}
                        onPointerEnter={() => setActiveServiceGroup(groupIndex)}
                        onFocusCapture={() => setActiveServiceGroup(groupIndex)}
                      >
                        <a className="vx-mega-group-title" href={`/services/${group.id}`} onClick={() => setServicesOpen(false)}>
                          {group.title} <ArrowRight size={15} aria-hidden="true" />
                        </a>
                        <ul>
                          {group.services.map((service, serviceIndex) => (
                            <li key={service}>
                              <a
                                ref={groupIndex === 0 && serviceIndex === 0 ? firstServiceLinkRef : undefined}
                                href={getServiceItemHref(service, group.id)}
                                onPointerEnter={() => setActiveServiceGroup(groupIndex)}
                                onFocus={() => setActiveServiceGroup(groupIndex)}
                                onClick={() => setServicesOpen(false)}
                              >
                                {service} <ArrowRight size={12} aria-hidden="true" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </header>

          <div className={`vx-frost-panel vx-frost-panel--${activeHero}`} aria-hidden="true">
            <div className="vx-frost-tint" />
          </div>

          <div className="vx-frost-content">
            <div className="vx-frost-copy">
              <span>ENTERPRISE DIGITAL AGENCY &amp; AUTOMATION LAB</span>
              <h1><i>Smart Solutions.</i><i>Digital Growth.</i></h1>
              <p>We architect full-stack digital solutions—from autonomous AI agents and enterprise web applications to conversion-focused UI/UX design and high-ROAS Meta &amp; Google marketing funnels.</p>
              <div className="vx-frost-actions">
                <a href="#services" className="vx-frost-actions"><span>Explore Our Services </span><ArrowRight size={15} aria-hidden="true" /></a>
                <a href="/book-a-demo" className="vx-frost-actions"><span>Contact Us </span><ArrowRight size={15} aria-hidden="true" /></a>
              </div>
            </div>



            <div className="vx-hero-controls" aria-label="Hero image controls">
              <button type="button" onClick={() => changeHero(-1)} aria-label="Previous hero image">
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <div className="vx-hero-dots">
                {heroImages.map((image, index) => (
                  <button
                    type="button"
                    className={index === activeHero ? "is-active" : ""}
                    onClick={() => setActiveHero(index)}
                    aria-label={`Show hero image ${index + 1}`}
                    aria-current={index === activeHero ? "true" : undefined}
                    key={image.src}
                  />
                ))}
              </div>
              <button type="button" onClick={() => changeHero(1)} aria-label="Next hero image">
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* Agency Brand & Ecosystem Marquee Bar */}
        <div data-home-reveal className="vx-home-reveal"><BrandBar /></div>

        <section className="vx-process-section" id="why" aria-labelledby="why-title" data-home-reveal>
          <div className="vx-process-inner">
            {/* Timeline Process Stepper Header */}
            <div className="vx-process-stepper-wrap">
              <div className="vx-process-top-controls">
                <span className="vx-process-eyebrow" id="why-title">WHY DIGITAL SOLUTIONS</span>
              </div>

              <div className="vx-process-timeline-bar" aria-hidden="true">
                <div
                  className="vx-process-glowing-dot"
                  style={{ left: `${(activeProcessStep / (processSteps.length - 1)) * 100}%` }}
                />
              </div>

              <div className="vx-process-steps-row">
                {processSteps.map((step, idx) => (
                  <button
                    type="button"
                    key={step.step}
                    className={`vx-process-step-node${idx === activeProcessStep ? " is-active" : ""}${idx < activeProcessStep ? " is-completed" : ""}`}
                    onClick={() => setActiveProcessStep(idx)}
                    aria-label={`Step ${step.step}: ${step.title}`}
                    aria-current={idx === activeProcessStep ? "step" : undefined}
                  >
                    <div className="vx-process-circle">
                      <span>{step.step}</span>
                    </div>
                    <div className="vx-process-step-info">
                      <strong>{step.title}</strong>
                      <p>{step.shortCopy}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliding Practice Step Cards Deck (Slides smoothly like Hero Section cards) */}
            <div className="vx-process-cards-viewport">
              <div 
                className="vx-process-cards-track"
                style={{ transform: `translateX(-${activeProcessStep * 100}%)` }}
              >
                {processSteps.map((stepItem) => (
                  <div key={stepItem.step} className="vx-process-card-slide">
                    <div className="vx-process-practice-grid">
                      {/* Left Column: Terminal Execution Box */}
                      <div className="vx-process-terminal-card">
                        <div className="vx-terminal-header">
                          <span className="vx-terminal-dot" />
                          <span className="vx-terminal-title">digital-solutions · {stepItem.title.toLowerCase()} process</span>
                        </div>
                        <div className="vx-terminal-body">
                          {stepItem.cmdLogs.map((log, lIdx) => (
                            <div key={lIdx} className={`vx-terminal-line vx-terminal-line--${log.type}`}>
                              {log.text}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: In Practice Copy */}
                      <div className="vx-process-practice-copy">
                        <div className="vx-practice-top-tag">
                          <span className="vx-practice-badge">— IN PRACTICE</span>
                          <span className="vx-practice-step-num">PHASE {stepItem.step} OF 05</span>
                        </div>
                        <h3>{stepItem.heading}</h3>
                        <p>{stepItem.description}</p>

                        <div className="vx-practice-feature-list">
                          {stepItem.features.map((feat) => (
                            <div className="vx-practice-feature-item" key={feat}>
                              <span className="vx-feature-check">✓</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="vx-process-card-controls">
              <button
                type="button"
                className="vx-process-nav-btn"
                onClick={() => setActiveProcessStep((prev) => (prev - 1 + processSteps.length) % processSteps.length)}
                aria-label="Previous process step"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="vx-process-nav-btn"
                onClick={() => setActiveProcessStep((prev) => (prev + 1) % processSteps.length)}
                aria-label="Next process step"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Client Reviews Section (3 Cards Per Row, 6 Total Reviews) */}
            <div 
              className="vx-reviews-slider-section" 
              aria-labelledby="reviews-title"
              onMouseEnter={() => setReviewsPaused(true)}
              onMouseLeave={() => setReviewsPaused(false)}
            >
              <div className="vx-reviews-header">
                <div>
                  <span className="vx-reviews-eyebrow">CLIENT TESTIMONIALS</span>
                  <h3 id="reviews-title">What our clients say</h3>
                </div>
              </div>

              {/* 3 Cards Per Row Carousel Track */}
              <div className="vx-reviews-grid-viewport">
                <div 
                  className="vx-reviews-pages-track"
                  style={{ transform: `translateX(-${activeReviewPage * 100}%)` }}
                >
                  {/* Page 1 (Cards 0, 1, 2) */}
                  <div className="vx-reviews-page-grid">
                    {clientReviews.slice(0, 3).map((review) => (
                      <blockquote className="vx-review-card-sky" key={review.name}>
                        <div className="vx-review-stars" aria-label="5 out of 5 stars">
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <Star key={starIndex} size={14} fill="currentColor" aria-hidden="true" />
                          ))}
                        </div>
                        <p>“{review.quote}”</p>
                        <footer>
                          <div className="vx-review-avatar-sky" aria-hidden="true">
                            {review.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div className="vx-review-author-info">
                            <strong>{review.name}</strong>
                            <span>{review.role}, {review.company}</span>
                          </div>
                        </footer>
                      </blockquote>
                    ))}
                  </div>

                  {/* Page 2 (Cards 3, 4, 5) */}
                  <div className="vx-reviews-page-grid">
                    {clientReviews.slice(3, 6).map((review) => (
                      <blockquote className="vx-review-card-sky" key={review.name}>
                        <div className="vx-review-stars" aria-label="5 out of 5 stars">
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <Star key={starIndex} size={14} fill="currentColor" aria-hidden="true" />
                          ))}
                        </div>
                        <p>“{review.quote}”</p>
                        <footer>
                          <div className="vx-review-avatar-sky" aria-hidden="true">
                            {review.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div className="vx-review-author-info">
                            <strong>{review.name}</strong>
                            <span>{review.role}, {review.company}</span>
                          </div>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Controls Bar (Matching Reference Image 0) */}
              <div className="vx-reviews-bottom-controls">
                <button
                  type="button"
                  className="vx-reviews-arrow-btn"
                  onClick={() => setActiveReviewPage((prev) => (prev - 1 + 2) % 2)}
                  aria-label="Previous reviews page"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>

                <div className="vx-reviews-progress-bar-wrap">
                  <span className="vx-reviews-counter" aria-live="polite">
                    {String((activeReviewPage + 1) * 3).padStart(2, "0")} / {String(clientReviews.length).padStart(2, "0")}
                  </span>
                  <div className="vx-reviews-progress-track">
                    <div 
                      className="vx-reviews-progress-fill" 
                      style={{ width: activeReviewPage === 0 ? "50%" : "100%" }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="vx-reviews-arrow-btn"
                  onClick={() => setActiveReviewPage((prev) => (prev + 1) % 2)}
                  aria-label="Next reviews page"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="vx-deck" id="services" data-home-reveal>
          <div className="vx-services-showcase">
            <div className="vx-services-showcase-heading">
              <span>What We Deliver</span>
              <h2>Our Comprehensive Services</h2>
              <p>Explore our core service areas—engineered to transform operations, scale growth, and deliver high-impact digital experiences.</p>
            </div>

            <div className="vx-services-grid">
              {serviceMenuGroups.map((group, index) => (
                <article className="vx-service-card-main" style={{ animationDelay: `${index * 90}ms` }} key={group.id}>
                  <div>
                    {group.id === "software-tools" ? (
                      <div className="vx-service-card-image vx-service-tools-image" aria-label="ChatGPT, Claude, Cursor, Canva, CapCut, and Gemini tools">
                        <div className="vx-service-tools-image-glow" aria-hidden="true" />
                        <div className="vx-service-tools-logo-grid">
                          {softwareToolLogoTiles.map((tool) => (
                            <span className={`vx-service-tools-logo ${tool.className}`} key={tool.name} title={tool.name}>
                              <img src={tool.src} alt="" />
                            </span>
                          ))}
                        </div>
                        <span className="vx-service-tools-image-label">AI · DESIGN · VIDEO · CODE</span>
                      </div>
                    ) : (
                      <div className="vx-service-card-image">
                        <img src={group.image} alt={group.title} style={{ objectPosition: group.imagePosition }} />
                      </div>
                    )}
                    <span className="vx-service-card-eyebrow">{group.eyebrow}</span>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                    <div className="vx-service-card-subservices">
                      {group.services.map((subService) => (
                        <a
                          key={subService}
                          href={getServiceItemHref(subService, group.id)}
                          className="vx-service-chip"
                        >
                          {subService}
                        </a>
                      ))}
                    </div>
                  </div>
                  <a href={`/services/${group.id}`} className="vx-service-card-cta">
                    Explore {group.title} <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Featured Portfolio & Case Studies (Our Projects) ─── */}
        <section className="vx-projects" id="projects" aria-labelledby="projects-title" data-home-reveal>
          <div className="vx-projects-inner">
            <div className="vx-projects-heading">
              <span>FEATURED CASE STUDIES</span>
              <h2 id="projects-title">OUR PROJECTS</h2>
              <p>A live hospitality brand experience designed to make its menu, personality, and ordering journey unmistakable.</p>
            </div>

            <div className="vx-projects-grid">
              {featuredProjects.map((project, index) => (
                <article className="vx-project-card" style={{ animationDelay: `${index * 110}ms` }} key={project.id}>
                  <div className="vx-project-cover">
                    <img src={project.image} alt={project.title} />
                    <span className="vx-project-badge">{project.category}</span>
                    <div className="vx-project-brand">
                      <img src={project.logo} alt="Alooverse mascot" />
                      <span>ALOOVERSE</span>
                    </div>
                  </div>
                  <div className="vx-project-body">
                    <span className="vx-project-client">{project.client}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="vx-project-stat-pill">
                      <strong style={{ color: project.accent }}>{project.stats}</strong>
                    </div>
                    <div className="vx-project-tags">
                      {project.tags.map((tag) => (
                        <span className="vx-project-tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                    <a className="vx-project-link" href={project.href} target="_blank" rel="noreferrer">
                      Visit live site <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Premium Agency Footer (Matching Reference Design) ─── */}
        <AgencyFooter />
      </main>
    </div>
  );
}
