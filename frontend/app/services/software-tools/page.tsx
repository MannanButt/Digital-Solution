import type { Metadata } from "next";
import { SoftwareToolsView } from "@/src/features/services/components/SoftwareToolsView";
import "@/src/features/services/styles/software-tools.css";

export const metadata: Metadata = {
  title: "Software Store",
  description: "Shop selected AI, creative, development, and productivity software with clear PKR pricing and local support.",
};

export default function SoftwareToolsPage() {
  return <SoftwareToolsView />;
}
