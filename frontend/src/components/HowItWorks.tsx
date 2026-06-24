"use client";

import { useState } from "react";
import { Search, Shield, CreditCard, Package, UserPlus, FileText, DollarSign, TrendingUp } from "lucide-react";

const clientSteps = [
  { icon: Search, title: "Browse AI services", description: "Explore categories and find freelancers with the skills you need." },
  { icon: Shield, title: "Compare freelancers", description: "Review ratings, portfolios, delivery times, and pricing." },
  { icon: CreditCard, title: "Order securely", description: "Place your order with clear pricing and delivery timelines." },
  { icon: Package, title: "Receive final work", description: "Get your completed project with revision support." },
];

const freelancerSteps = [
  { icon: UserPlus, title: "Create your profile", description: "Set up your freelancer account and showcase your expertise." },
  { icon: FileText, title: "Publish AI services", description: "Create gig listings with pricing, delivery times, and details." },
  { icon: DollarSign, title: "Get orders", description: "Clients find your services and place orders directly." },
  { icon: TrendingUp, title: "Deliver and grow", description: "Complete work, build reviews, and grow your business." },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"client" | "freelancer">("client");
  const steps = activeTab === "client" ? clientSteps : freelancerSteps;

  return (
    <section id="how-it-works" className="bg-canvas py-section" aria-labelledby="how-it-works-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-eyebrow text-muted-foreground mb-4" aria-hidden="true">HOW IT WORKS</p>
          <h2 id="how-it-works-heading" className="text-display-lg text-ink mb-6">
            Two ways to use NovaField
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you need AI work done or want to sell your AI skills, we have you covered.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div
            className="inline-flex items-center gap-1 bg-surface-soft rounded-pill p-1"
            role="tablist"
            aria-label="User type"
          >
            <button
              role="tab"
              aria-selected={activeTab === "client"}
              onClick={() => setActiveTab("client")}
              className={`px-6 py-2.5 rounded-pill text-body-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTab === "client" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-ink"
              }`}
            >
              For clients
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "freelancer"}
              onClick={() => setActiveTab("freelancer")}
              className={`px-6 py-2.5 rounded-pill text-body-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTab === "freelancer" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-ink"
              }`}
            >
              For freelancers
            </button>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          role="tabpanel"
          aria-label={activeTab === "client" ? "Client workflow" : "Freelancer workflow"}
        >
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <article className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-surface-soft border border-hairline flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-ink" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-caption font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-card-title text-ink mb-3">{step.title}</h3>
                <p className="text-body-sm text-muted-foreground max-w-xs mx-auto">{step.description}</p>
              </article>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 z-10 text-hairline text-2xl" aria-hidden="true">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
