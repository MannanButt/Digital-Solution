import type { Metadata } from "next";
import { LegalPage } from "@/src/features/legal/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Digital Solutions website and services.",
};

export default function TermsOfServicePage() {
  return <LegalPage type="terms" />;
}
