"use client";

import { motion } from "framer-motion";
import { Cpu, Bot, Link2, Cloud, ArrowRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const capabilities = [
  { icon: Bot, label: "Agents", desc: "AI assistants" },
  { icon: Cpu, label: "Skills", desc: "Custom abilities" },
  { icon: Link2, label: "Connect", desc: "APIs & tools" },
  { icon: Cloud, label: "Drive", desc: "Cloud storage" },
];

export default function Supercomputer() {
  return (
    <section className="py-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="color-block-navy p-8 md:p-12 lg:p-16 rounded-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-eyebrow text-inverse-ink/60 mb-4">NEW FEATURE</p>
                  <h2 className="text-display-lg text-inverse-ink mb-6">
                    Supercomputer
                  </h2>
                  <p className="text-body-lg text-inverse-ink/70 mb-8 max-w-lg">
                    One superagent for your entire creative stack. Build workflows, deploy agents,
                    connect APIs, and automate your creative pipeline.
                  </p>
                  <a href="#" className="btn-primary text-body px-6 py-3 bg-inverse-ink text-canvas hover:opacity-90">
                    Try Supercomputer
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </a>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="bg-on-inverse-soft/10 rounded-md p-5 text-center cursor-pointer"
                  >
                    <cap.icon className="w-8 h-8 mx-auto mb-3 text-inverse-ink" />
                    <div className="text-card-title text-inverse-ink mb-1">{cap.label}</div>
                    <div className="text-body-sm text-inverse-ink/60">{cap.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
