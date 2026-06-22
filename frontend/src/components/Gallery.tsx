"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const presets = [
  { name: "CGI BREAKDOWN", color: "bg-block-lilac" },
  { name: "KUNG FU HIT", color: "bg-block-coral" },
  { name: "DRIFT RACING", color: "bg-block-mint" },
  { name: "ZOMBIE DANCE", color: "bg-block-lime" },
  { name: "NEON CITY", color: "bg-block-pink" },
  { name: "DRAGON FANTASY", color: "bg-block-cream" },
  { name: "RED CARPET", color: "bg-block-coral" },
  { name: "OFFICE CCTV", color: "bg-surface-soft" },
  { name: "ORBITAL PRESENCE", color: "bg-block-lilac" },
  { name: "SOUL FIGHTER", color: "bg-block-pink" },
  { name: "NIGHT VISION", color: "bg-block-mint" },
  { name: "3D RENDER", color: "bg-block-lime" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="color-block-lilac py-section mx-6 lg:mx-8 rounded-lg">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-eyebrow text-ink/60 mb-4">PRESETS</p>
          <h2 className="text-display-lg text-ink mb-6">
            Viral Presets
          </h2>
          <p className="text-body-lg text-ink/70 max-w-xl mx-auto">
            Big-budget visual effects, one click away. From explosions to surreal transformations.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3" staggerDelay={0.05}>
          {presets.map((preset) => (
            <StaggerItem key={preset.name}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative group rounded-md overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <div className={`absolute inset-0 ${preset.color}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-caption text-ink/70 text-center px-2">{preset.name}</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-ink/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-canvas/90 flex items-center justify-center">
                    <Play className="w-4 h-4 text-ink ml-0.5" />
                  </div>
                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.3} className="text-center mt-12">
          <a href="#" className="btn-secondary text-body-sm px-6 py-3">
            View All Presets
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
