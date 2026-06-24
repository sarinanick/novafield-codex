"use client";

import Link from "next/link";
import { Film, Image, MessageSquare, Zap, Globe, PenTool, Palette, BarChart3 } from "lucide-react";

const categories = [
  { icon: Film, title: "AI Video & Ads", desc: "Video ads, product demos, social content, and cinematic scenes", href: "/marketplace?category=video" },
  { icon: Image, title: "AI Image Generation", desc: "Product photos, brand visuals, illustrations, and concept art", href: "/marketplace?category=images" },
  { icon: MessageSquare, title: "Chatbots & Agents", desc: "Custom chatbots, AI assistants, and conversational flows", href: "/marketplace?category=chatbots" },
  { icon: Zap, title: "AI Automation", desc: "Workflow automation, integrations, and process optimization", href: "/marketplace?category=automation" },
  { icon: Globe, title: "AI Web Apps", desc: "Landing pages, dashboards, and interactive prototypes", href: "/marketplace?category=webapps" },
  { icon: PenTool, title: "AI Content & Copywriting", desc: "Blog posts, ad copy, product descriptions, and scripts", href: "/marketplace?category=content" },
  { icon: Palette, title: "AI Design", desc: "Logos, brand identity, UI design, and visual systems", href: "/marketplace?category=design" },
  { icon: BarChart3, title: "Data & Research", desc: "Data analysis, market research, and report generation", href: "/marketplace?category=data" },
];

export default function Features() {
  return (
    <section id="categories" className="bg-canvas py-section" aria-labelledby="categories-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-eyebrow text-muted-foreground mb-4" aria-hidden="true">SERVICES</p>
          <h2 id="categories-heading" className="text-display-lg text-ink mb-6">
            Popular AI service categories
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Find specialized freelancers for any AI-powered project, from video production to automation.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="AI service categories"
        >
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group bg-surface-soft rounded-lg p-6 h-full hover:shadow-md transition-all hover:border-primary/30 border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              role="listitem"
            >
              <div className="w-12 h-12 bg-canvas border border-hairline rounded-lg flex items-center justify-center mb-4 group-hover:border-primary/30 transition-colors" aria-hidden="true">
                <cat.icon className="w-6 h-6 text-ink group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-card-title text-ink mb-2">{cat.title}</h3>
              <p className="text-body-sm text-muted-foreground">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
