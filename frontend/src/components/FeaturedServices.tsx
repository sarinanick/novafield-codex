"use client";

import Link from "next/link";
import { Star, Clock } from "lucide-react";

const featuredServices = [
  {
    title: "TikTok Video Ads",
    category: "AI Video & Ads",
    freelancer: "Sarah K.",
    rating: 4.9,
    reviews: 127,
    price: 150,
    delivery: "3 days",
    tools: ["Sora", "Runway"],
    initials: "SK",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Product Photography",
    category: "AI Image Generation",
    freelancer: "Marcus L.",
    rating: 4.8,
    reviews: 89,
    price: 75,
    delivery: "2 days",
    tools: ["Midjourney", "DALL-E"],
    initials: "ML",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Brand Chatbot",
    category: "Chatbots & Agents",
    freelancer: "Aiko T.",
    rating: 5.0,
    reviews: 64,
    price: 200,
    delivery: "5 days",
    tools: ["GPT", "Claude"],
    initials: "AT",
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Workflow Automation",
    category: "AI Automation",
    freelancer: "Dev P.",
    rating: 4.7,
    reviews: 53,
    price: 120,
    delivery: "4 days",
    tools: ["Zapier", "Make"],
    initials: "DP",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Landing Page Design",
    category: "AI Web Apps",
    freelancer: "Rina M.",
    rating: 4.9,
    reviews: 78,
    price: 180,
    delivery: "4 days",
    tools: ["Figma", "Next.js"],
    initials: "RM",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    title: "Blog Content Pack",
    category: "AI Content & Copywriting",
    freelancer: "James W.",
    rating: 4.6,
    reviews: 41,
    price: 90,
    delivery: "2 days",
    tools: ["Claude", "GPT"],
    initials: "JW",
    gradient: "from-amber-500 to-orange-600",
  },
];

export default function FeaturedServices() {
  return (
    <section className="bg-canvas py-section" aria-labelledby="featured-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-eyebrow text-muted-foreground mb-4" aria-hidden="true">FEATURED</p>
          <h2 id="featured-heading" className="text-display-lg text-ink mb-6">
            Featured AI services
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-picked services from top-rated AI freelancers on NovaField.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Featured AI services"
        >
          {featuredServices.map((service) => (
            <article
              key={service.title}
              className="bg-surface-soft border border-hairline rounded-lg p-6 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              role="listitem"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                  {service.initials}
                </div>
                <div>
                  <p className="text-body-sm font-medium text-ink">{service.freelancer}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-semantic-warning text-semantic-warning" aria-hidden="true" />
                    <span className="text-caption text-muted-foreground">{service.rating} ({service.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <h3 className="text-card-title text-ink mb-1">{service.title}</h3>
              <p className="text-caption text-muted-foreground mb-3">{service.category}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.tools.map(tool => (
                  <span key={tool} className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-hairline-soft">
                <span className="text-body-sm font-semibold text-ink">From ${service.price}</span>
                <span className="flex items-center gap-1 text-caption text-muted-foreground">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {service.delivery}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 btn-primary text-body-sm px-6 py-3"
          >
            Browse all services
          </Link>
        </div>
      </div>
    </section>
  );
}
