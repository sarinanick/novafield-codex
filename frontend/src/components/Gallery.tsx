"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const presets = [
  { name: "CGI BREAKDOWN", block: "block-lime" },
  { name: "KUNG FU HIT", block: "block-lilac" },
  { name: "DRIFT RACING", block: "block-cream" },
  { name: "ZOMBIE DANCE", block: "block-mint" },
  { name: "NEON CITY", block: "block-pink" },
  { name: "DRAGON FANTASY", block: "block-coral" },
  { name: "RED CARPET", block: "block-lime" },
  { name: "OFFICE CCTV", block: "block-cream" },
  { name: "ORBITAL PRESENCE", block: "block-lilac" },
  { name: "SOUL FIGHTER", block: "block-pink" },
  { name: "NIGHT VISION", block: "block-mint" },
  { name: "3D RENDER", block: "block-coral" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="section-block block-cream">
          <div className="mono-eyebrow text-black/70">Presets</div>
          <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">Color blocks become the visual rhythm.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-black/75">
            The gallery is now more like a spread of sticky notes than a grid of neon cards.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {presets.map((preset) => (
              <motion.div key={preset.name} whileHover={{ y: -4 }} className={`section-block ${preset.block} min-h-44 p-4`}>
                <div className="flex h-full flex-col justify-between">
                  <div className="flex justify-end">
                    <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
                      preview
                    </span>
                  </div>
                  <div>
                    <div className="mono-eyebrow text-black/65">{preset.name}</div>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-black px-3 py-2 text-xs text-white">
                      <Play className="h-3 w-3" /> Watch
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Button variant="outline" size="lg">
              View all presets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
