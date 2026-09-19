import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star, TrendingUp } from "lucide-react";
import { allClientReviews } from "@/src/features/reviews/data/reviewsData";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import "@/src/features/reviews/styles/reviews.css";

export const metadata: Metadata = {
  title: "Client Reviews & Measurable Results — Digital Solutions",
  description:
    "Verified client reviews, ROI outcomes, and testimonials from engineering leaders and executives partnering with Digital Solutions.",
};

export default function ClientReviewsPage() {
  return (
    <div className="vx-reviews-page">
      <div className="vx-reviews-page-inner">
        {/* Navigation / Header */}
        <header className="vx-reviews-page-header">
          <Link href="/" className="vx-reviews-page-back">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          <span className="vx-reviews-page-eyebrow">Proven Client Impact</span>
          <h1 className="vx-reviews-page-title">What Our Clients Say</h1>
          <p className="vx-reviews-page-subtitle">
            Real feedback, production benchmarks, and measurable ROI from leaders running our AI automation programs, high-scale web platforms, and growth engines.
          </p>
        </header>

        {/* Aggregate Stats Ribbon */}
        <div className="vx-reviews-stats-ribbon" aria-label="Key Performance Indicators">
          <div className="vx-reviews-stat-item">
            <span className="vx-reviews-stat-num">100%</span>
            <span className="vx-reviews-stat-label">Production Delivery Rate</span>
          </div>
          <div className="vx-reviews-stat-item">
            <span className="vx-reviews-stat-num">4.9 / 5.0</span>
            <span className="vx-reviews-stat-label">Average Client Rating</span>
          </div>
          <div className="vx-reviews-stat-item">
            <span className="vx-reviews-stat-num">4.2×</span>
            <span className="vx-reviews-stat-label">Average Client ROAS Lift</span>
          </div>
          <div className="vx-reviews-stat-item">
            <span className="vx-reviews-stat-num">Zero</span>
            <span className="vx-reviews-stat-label">Production Downtime Incidents</span>
          </div>
        </div>

        {/* Grid of Client Reviews */}
        <div className="vx-reviews-full-grid">
          {allClientReviews.map((review) => (
            <article className="vx-reviews-full-card" key={review.id}>
              <div>
                <div className="vx-reviews-card-top">
                  <div className="vx-reviews-stars-row" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className="vx-reviews-card-tag">{review.category}</span>
                </div>

                <blockquote className="vx-reviews-card-quote">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              <div>
                <div className="vx-reviews-card-outcome">
                  <TrendingUp size={14} color="var(--vx-blue)" />
                  <span>{review.outcome}</span>
                </div>

                <div className="vx-reviews-card-author">
                  <div className="vx-reviews-card-avatar" aria-hidden="true">
                    {review.avatarInitials}
                  </div>
                  <div className="vx-reviews-card-meta">
                    <strong>{review.name}</strong>
                    <span>{review.role}, {review.company}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Consultation Call to Action */}
        <section className="vx-reviews-page-cta">
          <h2>Ready to Build Systems That Deliver Outcomes?</h2>
          <p>
            Join industry-leading teams scaling operations, launching high-converting software, and automating workflows with Digital Solutions.
          </p>
          <Link href="/book-a-demo">
            Contact Us <ArrowRight size={16} />
          </Link>

        </section>
      </div>

      {/* Clean Global Footer */}
      <div style={{ marginTop: "80px" }}>
        <AgencyFooter />
      </div>
    </div>
  );
}
