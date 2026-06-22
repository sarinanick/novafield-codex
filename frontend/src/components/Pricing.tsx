"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "per month",
    features: ["10 generations/month", "Basic AI models", "720p output", "Community support", "1 project"],
  },
  {
    name: "Pro",
    price: "$20",
    period: "per month",
    features: ["500 generations/month", "All 30+ AI models", "4K output", "Priority support", "Unlimited projects", "API access", "Commercial license"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "volume pricing",
    features: ["Unlimited generations", "Custom model training", "Dedicated manager", "SLA guarantee", "On-prem deployment", "SSO & SAML"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="section-block block-lime">
          <div className="mono-eyebrow text-black/70">Pricing</div>
          <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">Transparent pricing, shown as a quiet set of tiers.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-black/75">Black fill still means selected. White still means rest. The system stays consistent.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <motion.div key={plan.name} whileHover={{ y: -4 }} className={`sheet p-6 ${plan.popular ? "border-black" : ""}`}>
                {plan.popular && <div className="pill mb-4 inline-flex bg-black px-3 py-1 text-xs uppercase tracking-[0.25em] text-white">Most popular</div>}
                <div className="text-2xl font-medium">{plan.name}</div>
                <div className="mt-3 flex items-end gap-1">
                  <div className="text-5xl font-light tracking-[-0.05em]">{plan.price}</div>
                  {plan.price !== "Custom" && <div className="pb-2 text-sm text-black/55">/month</div>}
                </div>
                <p className="mt-2 text-sm text-black/55">{plan.period}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-black/75">
                      <span className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                    {plan.name === "Enterprise" ? "Contact sales" : "Choose plan"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
