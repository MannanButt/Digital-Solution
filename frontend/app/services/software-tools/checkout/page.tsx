import type { Metadata } from "next";
import { Suspense } from "react";
import SoftwareCheckoutPage from "@/src/features/services/components/SoftwareCheckoutPage";
import "@/src/features/services/styles/software-checkout.css";

export const metadata: Metadata = {
  title: "Complete your software order | Digital Solutions",
  description: "Choose a payment method and send proof of payment for your software tool order.",
};

export default function CheckoutRoute() {
  return (
    <Suspense fallback={<main aria-busy="true">Loading checkout…</main>}>
      <SoftwareCheckoutPage />
    </Suspense>
  );
}
