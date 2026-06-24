"use client";

import { Shield, CreditCard, Clock, Users } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Verified freelancer profiles",
    description: "Every freelancer has a public portfolio, ratings, and review history you can trust.",
  },
  {
    icon: CreditCard,
    title: "Secure project workflow",
    description: "Clear pricing, order tracking, and project milestones from start to finish.",
  },
  {
    icon: Clock,
    title: "Clear delivery timelines",
    description: "Every service shows estimated delivery time so you know exactly when to expect work.",
  },
  {
    icon: Users,
    title: "Client and freelancer dashboards",
    description: "Manage orders, messages, and projects from dedicated dashboards for each role.",
  },
];

export default function Trust() {
  return (
    <section className="bg-surface-soft py-section" aria-labelledby="trust-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-eyebrow text-muted-foreground mb-4" aria-hidden="true">TRUST & SAFETY</p>
          <h2 id="trust-heading" className="text-display-lg text-ink mb-6">
            Built for reliable collaboration
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            NovaField provides the tools and transparency you need to work with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature) => (
            <article key={feature.title} className="text-center">
              <div className="w-14 h-14 bg-canvas border border-hairline rounded-xl flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-7 h-7 text-ink" aria-hidden="true" />
              </div>
              <h3 className="text-card-title text-ink mb-2">{feature.title}</h3>
              <p className="text-body-sm text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
