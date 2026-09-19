import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/src/features/services/components/ServiceDetailView";
import { designServices } from "@/src/features/services/data/designData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return designServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = designServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — Design Services`,
    description: `${service.heroSubtitle} ${service.shortDescription}`,
  };
}

export default async function DesignDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = designServices.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  return <ServiceDetailView detail={service} heroImage="/assets/images/services/menu-design.jpg" />;
}
