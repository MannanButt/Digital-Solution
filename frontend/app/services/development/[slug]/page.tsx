import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/src/features/services/components/ServiceDetailView";
import { webDevServices } from "@/src/features/services/data/webDevelopmentData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return webDevServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = webDevServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — Development Services`,
    description: `${service.heroSubtitle} ${service.shortDescription}`,
  };
}

export default async function DevelopmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = webDevServices.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  return <ServiceDetailView detail={service} heroImage="/assets/images/services/menu-development.jpg" />;
}
