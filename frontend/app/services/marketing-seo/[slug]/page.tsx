import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marketingSeoSubServices } from "@/src/features/services/data/marketingSeoData";
import { ServiceDetailView } from "@/src/features/services/components/ServiceDetailView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(marketingSeoSubServices).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = marketingSeoSubServices[slug];
  if (!detail) return {};

  return {
    title: `${detail.title} — Digital Solutions`,
    description: detail.headline + " " + detail.description,
  };
}

export default async function MarketingSeoSubServicePage({ params }: PageProps) {
  const { slug } = await params;
  const detail = marketingSeoSubServices[slug];

  if (!detail) {
    notFound();
  }

  return <ServiceDetailView detail={detail} heroImage="/assets/images/services/menu-marketing-seo.jpg" />;
}
