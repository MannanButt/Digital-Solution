import type { Metadata } from "next";
import HomePage from "@/src/features/home/components/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Digital Solutions | AI Workflow Automation" },
  description:
    "Digital Solutions designs AI workflows, agents, integrations, and intelligent operations systems around the tools your business already uses.",
};

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/assets/images/home/hero-integrations-768.avif"
        imageSrcSet="/assets/images/home/hero-integrations-768.avif 768w, /assets/images/home/hero-integrations-1280.avif 1280w, /assets/images/home/hero-integrations-1920.avif 1920w"
        imageSizes="100vw"
        type="image/avif"
        fetchPriority="high"
      />
      <HomePage />
    </>
  );
}
