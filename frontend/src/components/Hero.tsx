"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "4.5M+", label: "generations" },
  { value: "30+", label: "models" },
  { value: "500K+", label: "creators" },
  { value: "50M+", label: "assets" },
];

const chips = ["Editorial UI", "AI marketplace", "Fast deployment", "Black & white core"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="section-block block-cream relative overflow-hidden">
          <div className="absolute right-6 top-6 h-44 w-44 rounded-full bg-black/5 blur-3xl" />
          <div className="absolute left-6 bottom-6 h-56 w-56 rounded-full bg-white/40 blur-3xl" />

          <div className="relative grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="mono-eyebrow mb-5 text-black/70">NovaField marketplace</div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl text-5xl font-light tracking-[-0.05em] sm:text-6xl lg:text-[5.5rem] lg:leading-[0.95]"
              >
                A cleaner stage for AI work, built like an editorial system.
              </motion.h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/75">
                A monochrome shell, oversized type, and pastel story blocks bring the marketplace into a calmer, more premium rhythm.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <span key={chip} className="pill border border-black/10 bg-white px-4 py-2 text-sm text-black/75">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button size="xl" className="pill px-7">
                  Explore the marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="xl" className="pill px-7">
                  <Play className="mr-2 h-4 w-4" />
                  See the structure
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="sheet p-5">
                <div className="mono-eyebrow text-black/50">Today</div>
                <p className="mt-3 text-2xl font-medium tracking-[-0.03em]">Marketplace, profiles, world, meetings.</p>
                <p className="mt-2 text-sm leading-6 text-black/60">The whole app now shares one visual grammar, instead of several competing ones.</p>
              </div>
              <div className="sheet p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-black/50">Signature</p>
                    <p className="text-lg font-medium">Black chrome + pastel sections</p>
                  </div>
                </div>
              </div>
              <div className="sheet p-5">
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-black px-4 py-4 text-white">
                      <div className="text-2xl font-medium tracking-[-0.04em]">{stat.value}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
