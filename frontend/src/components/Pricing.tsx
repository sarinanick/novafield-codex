"use client";

import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "For clients",
    items: [
      "Browse services free",
      "Pay per project",
      "Secure order workflow",
      "Compare freelancers",
      "Revision support",
    ],
    cta: "Browse services",
    href: "/marketplace",
    variant: "secondary" as const,
  },
  {
    name: "For freelancers",
    items: [
      "Create profile free",
      "List unlimited services",
      "Set your own pricing",
      "Manage orders",
      "Grow your reputation",
    ],
    cta: "Start selling",
    href: "/auth/register?role=freelancer",
    variant: "default" as const,
  },
  {
    name: "Platform",
    items: [
      "Transparent service fee",
      "Shown before checkout",
      "Secure payment processing",
      "Dispute resolution",
      "Optional Pro tools later",
    ],
    cta: "Learn more",
    href: "/#how-it-works",
    variant: "secondary" as const,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-canvas py-section" aria-labelledby="pricing-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-eyebrow text-muted-foreground mb-4" aria-hidden="true">PRICING</p>
          <h2 id="pricing-heading" className="text-display-lg text-ink mb-6">
            Simple marketplace pricing
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
            No subscriptions, no hidden fees. Pay per project or sell your services.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          role="list"
          aria-label="Pricing options"
        >
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="bg-canvas border border-hairline rounded-lg p-8 h-full flex flex-col"
              role="listitem"
            >
              <h3 className="text-card-title text-ink mb-6">{plan.name}</h3>
              <ul className="space-y-3 mb-8 flex-1" role="list" aria-label={`${plan.name} features`}>
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body-sm">
                    <Check className="w-4 h-4 text-semantic-success shrink-0" aria-hidden="true" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`inline-flex items-center justify-center w-full h-10 px-5 text-body-sm font-medium rounded-pill transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  plan.variant === "default"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md"
                    : "bg-surface-soft text-ink hover:bg-hairline shadow-sm"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
