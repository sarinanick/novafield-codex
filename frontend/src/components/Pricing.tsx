"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "per month",
    features: ["10 generations/month", "Basic AI models", "720p output", "Community support", "1 project"],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$20",
    period: "per month",
    features: ["500 generations/month", "All 30+ AI models", "4K output", "Priority support", "Unlimited projects", "Custom characters", "API access", "Commercial license"],
    popular: true,
    cta: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "volume pricing",
    features: ["Unlimited generations", "Custom model training", "Dedicated account manager", "SLA guarantee", "On-premise deployment", "White-label options", "SSO & SAML", "Priority queue"],
    popular: false,
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-canvas py-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-eyebrow text-muted-foreground mb-4">PRICING</p>
          <h2 className="text-display-lg text-ink mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Start free, upgrade when you need more. No hidden fees.
          </p>

          <div className="inline-flex items-center gap-1 bg-surface-soft rounded-pill p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-pill text-body-sm transition-all ${!annual ? "bg-primary text-primary-foreground" : "text-ink hover:bg-canvas"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-pill text-body-sm transition-all ${annual ? "bg-primary text-primary-foreground" : "text-ink hover:bg-canvas"}`}
            >
              Annual
            </button>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.15}>
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`relative bg-canvas rounded-lg p-8 h-full flex flex-col ${
                  plan.popular
                    ? "border-2 border-primary shadow-lg"
                    : "border border-hairline"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-pill text-caption">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-card-title text-ink mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-display-lg text-ink" style={{ fontSize: 40, fontWeight: 540 }}>{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-body-sm text-muted-foreground">/month</span>
                    )}
                  </div>
                  <p className="text-body-sm text-muted-foreground mt-1">{plan.period}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-body-sm">
                      <Check className="w-4 h-4 text-semantic-success shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`w-full text-center ${
                    plan.popular ? "btn-primary" : "btn-secondary"
                  } text-body-sm px-6 py-3`}
                >
                  {plan.cta}
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
