import { ArrowRight, Star, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const demoServices = [
  {
    title: "AI Video Ad Creator",
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
    title: "Product Image Generator",
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
    title: "Custom Chatbot Builder",
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
    title: "AI Automation Expert",
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
];

export default function Hero() {
  return (
    <section className="relative bg-canvas overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hairline to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--hairline-soft)) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.3,
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-20 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-hairline bg-surface-soft/50 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-semantic-success animate-pulse" />
                <span className="text-caption text-muted-foreground">AI MARKETPLACE IN PUBLIC BETA</span>
              </div>

              <h1 id="hero-heading" className="text-display-xl text-ink mb-6 leading-[0.95]">
                Hire AI freelancers for videos, images, chatbots, and automations
              </h1>

              <p className="text-body-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
                NovaField connects businesses and creators with skilled AI freelancers who build production-ready creative and technical work using the latest AI tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10" role="group" aria-label="Call to action buttons">
                <Button asChild size="xl" className="group">
                  <Link href="/marketplace">
                    Browse AI Services
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="xl" className="group">
                  <Link href="/auth/register?role=freelancer">
                    Start Selling Services
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 text-body-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  30+ AI service categories
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  2-sided marketplace
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Clear project workflow
                </span>
              </div>
            </div>

            <div className="hidden lg:block">
              <p className="text-caption text-muted-foreground mb-4 text-center">Example AI services</p>
              <div className="grid grid-cols-2 gap-4">
                {demoServices.map((service) => (
                  <Link
                    key={service.title}
                    href="/marketplace"
                    className="group bg-surface-soft border border-hairline rounded-lg p-5 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`View ${service.title} services`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                        {service.initials}
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-ink leading-tight">{service.freelancer}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-semantic-warning text-semantic-warning" aria-hidden="true" />
                          <span className="text-caption text-muted-foreground">{service.rating} ({service.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-body-sm font-semibold text-ink mb-1">{service.title}</h3>
                    <p className="text-caption text-muted-foreground mb-3">{service.category}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.tools.map(tool => (
                        <span key={tool} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-hairline-soft">
                      <span className="text-body-sm font-semibold text-ink">From ${service.price}</span>
                      <span className="flex items-center gap-1 text-caption text-muted-foreground">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {service.delivery}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
