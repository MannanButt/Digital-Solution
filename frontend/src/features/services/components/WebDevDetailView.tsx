// src/features/services/components/WebDevDetailView.tsx
"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { WebDevService } from "@/src/features/services/data/webDevelopmentData";
import { ServiceDeliverables, ServiceTimeline } from "./ServiceContent";

export function WebDevDetailView({ detail }: { detail: WebDevService }) {
  return (
    <div className="vx-page min-h-screen bg-[#F4F9FF] text-[#050B14]">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 border border-sky-300/60 text-sky-800 text-xs font-bold uppercase tracking-wider mb-6">
            <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
            {detail.title}
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#050B14] tracking-tight leading-[1.08] mb-6">
            {detail.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8">
            {detail.shortDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/book-a-demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-sky-500 to-sky-600 text-white font-bold text-sm shadow-lg hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all"
            >
              Start This Project <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Deliverables Grid */}
      <section id="deliverables" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">What We Build & Deliver</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050B14] mt-2">Core Capabilities & Output</h2>
        </div>
        <ServiceDeliverables items={detail.deliverables} />
      </section>

      {/* Workflow Steps */}
      <section className="py-20 px-6 sm:px-12 bg-white border-y border-sky-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Implementation Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#050B14] mt-2">How We Execute</h2>
          </div>
          <ServiceTimeline steps={detail.workflowSteps} />
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-linear-to-r from-[#071325] via-[#0A1B36] to-[#050B14] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">Ready to transform your {detail.title}?</h3>
            <p className="text-sky-200 text-sm max-w-xl">
              Talk directly with Digital Solutions specialists to design a high‑ROI solution.
            </p>
          </div>
          <a
            href="/book-a-demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sky-400 text-slate-950 font-extrabold text-sm hover:bg-sky-300 transition-all shrink-0 shadow-lg"
          >
            Book Strategy Call <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
