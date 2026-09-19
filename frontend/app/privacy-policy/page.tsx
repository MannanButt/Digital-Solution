import type { Metadata } from "next";
import { LegalPage } from "@/src/features/legal/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Digital Solutions collects, uses, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage type="privacy" />;
}
