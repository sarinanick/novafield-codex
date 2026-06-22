"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Creative Director at Lumina",
    content: "NovaField cut our video production time from weeks to hours. The AI models are incredibly realistic, and the marketplace makes it easy to find specialized freelancers.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Independent Filmmaker",
    content: "I've generated over 200 cinematic scenes using the Cinema Studio. The camera control is unmatched. My short film won Best Visual Effects at an indie festival.",
    rating: 5,
  },
  {
    name: "Aiko Tanaka",
    role: "Marketing Lead at TechFlow",
    content: "We run our entire social media visual pipeline through NovaField. The Character AI keeps our brand mascots consistent across every campaign.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-canvas py-section" aria-labelledby="testimonials-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-eyebrow text-muted-foreground mb-4" aria-hidden="true">TESTIMONIALS</p>
          <h2 id="testimonials-heading" className="text-display-lg text-ink mb-6">
            Loved by creators worldwide
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            See what our community of 500,000+ creators have to say about NovaField.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <article className="bg-surface-soft rounded-2xl p-8 h-full flex flex-col">
                <Quote className="w-8 h-8 text-primary/30 mb-4" aria-hidden="true" />
                <p className="text-body text-muted-foreground flex-1 mb-6 leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-hairline-soft">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-ink">{t.name}</p>
                    <p className="text-caption text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
