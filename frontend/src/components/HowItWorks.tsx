"use client";

import { motion } from "framer-motion";
import { Upload, Wand2, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Describe Your Vision",
    description: "Write a text prompt describing the video or image you want to create. Be as detailed or abstract as you like.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: Wand2,
    title: "AI Generates It",
    description: "Choose from 30+ AI models. Our platform handles rendering, style transfer, and output optimization automatically.",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: Download,
    title: "Download & Use",
    description: "Get your creation in up to 4K resolution. Use it commercially with no restrictions. Iterate until it's perfect.",
    color: "from-green-500 to-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-canvas py-section" aria-labelledby="how-it-works-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-eyebrow text-muted-foreground mb-4" aria-hidden="true">HOW IT WORKS</p>
          <h2 id="how-it-works-heading" className="text-display-lg text-ink mb-6">
            From idea to cinema in 3 steps
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            No technical skills needed. Just describe what you want, and our AI brings it to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-hairline" aria-hidden="true" />
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative"
            >
              <article className="text-center">
                <div className="relative inline-block mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-canvas border-2 border-hairline flex items-center justify-center text-caption font-bold text-ink">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-card-title text-ink mb-3">{step.title}</h3>
                <p className="text-body-sm text-muted-foreground max-w-xs mx-auto">{step.description}</p>
              </article>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-16 -right-4 z-10">
                  <ArrowRight className="w-6 h-6 text-hairline" aria-hidden="true" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
