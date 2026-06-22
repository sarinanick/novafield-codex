"use client";

import { motion } from "framer-motion";
import { Cpu, Bot, Link2, Cloud, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const capabilities = [
  { icon: Bot, label: "Agents", desc: "AI assistants" },
  { icon: Cpu, label: "Skills", desc: "Custom abilities" },
  { icon: Link2, label: "Connect", desc: "APIs & tools" },
  { icon: Cloud, label: "Drive", desc: "Cloud storage" },
];

export default function Supercomputer() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="section-block block-navy">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mono-eyebrow text-white/70">Ship products</div>
              <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] text-white sm:text-5xl">A dark story block that feels like a proper pause.</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-white/75">
                The navy panel gives the page contrast without returning to the old neon-glass language.
              </p>
              <div className="mt-8">
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Try the supercomputer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {capabilities.map((cap) => (
                <motion.div key={cap.label} whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur-sm">
                  <cap.icon className="h-7 w-7" />
                  <div className="mt-5 text-lg font-medium">{cap.label}</div>
                  <div className="mt-1 text-sm text-white/70">{cap.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
