import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/src/features/services/components/ServiceDetailView";
import { aiAutomationServices } from "@/src/features/services/data/aiAutomationData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return aiAutomationServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = aiAutomationServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — AI Automation Services`,
    description: `${service.heroSubtitle} ${service.shortDescription}`,
  };
}

export default async function AIAutomationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = aiAutomationServices.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  return <ServiceDetailView detail={service} heroImage="/assets/images/services/menu-ai-automation.jpg" />;
}
