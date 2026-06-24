"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-section" aria-labelledby="cta-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="bg-primary rounded-lg p-8 md:p-16 lg:p-20 text-center">
          <h2 id="cta-heading" className="text-display-lg text-primary-foreground mb-6">
            Ready to hire AI talent or sell your AI skills?
          </h2>
          <p className="text-body-lg text-primary-foreground/80 mb-10 max-w-lg mx-auto">
            Join NovaField today and connect with the AI marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Call to action buttons">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center h-14 px-10 text-body-lg font-medium rounded-pill bg-white text-primary hover:bg-white/90 shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Browse Marketplace
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
            <Link
              href="/auth/register?role=freelancer"
              className="inline-flex items-center justify-center h-14 px-10 text-body-lg font-medium rounded-pill bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Become a Freelancer
            </Link>
          </div>
          <p className="text-caption text-primary-foreground/60 mt-6" aria-hidden="true">NO CREDIT CARD REQUIRED</p>
        </div>
      </div>
    </section>
  );
}
