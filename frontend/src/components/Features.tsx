"use client";

import { motion } from "framer-motion";
import { Film, Image, Video, Users, Wand2, Layers, Camera, Palette } from "lucide-react";

const tools = [
  { icon: Film, title: "Cinema Studio", desc: "Camera-aware creative scenes with more editorial control.", block: "block-lime" },
  { icon: Image, title: "Image Generator", desc: "High-signal visual work in a calmer presentation shell.", block: "block-lilac" },
  { icon: Video, title: "Video Generator", desc: "Prompt to motion with a more deliberate interface rhythm.", block: "block-mint" },
  { icon: Users, title: "Character AI", desc: "Consistent faces, roles, and story continuity.", block: "block-pink" },
  { icon: Wand2, title: "Image Editor", desc: "Inpaint, outpaint, and restyle without visual noise.", block: "block-cream" },
  { icon: Layers, title: "Marketing Studio", desc: "Campaign-ready surfaces for fast production.", block: "block-coral" },
  { icon: Camera, title: "Supercomputer", desc: "One control room for your creative stack.", block: "block-navy" },
  { icon: Palette, title: "Style Presets", desc: "Intentional presets with a more curated feel.", block: "block-lime" },
];

export default function Features() {
  return (
    <section id="features" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="section-block block-lilac">
          <div className="mono-eyebrow text-black/70">Creative system</div>
          <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="text-4xl font-light tracking-[-0.05em] sm:text-5xl">A tighter toolbox, laid out like a magazine spread.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-black/75">
                Each feature gets its own color block and its own tone, so the site feels composed instead of generic.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                whileHover={{ y: -4 }}
                className={`section-block ${tool.block} p-5`}
              >
                <tool.icon className="h-6 w-6" />
                <h3 className="mt-6 text-xl font-medium">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{tool.desc}</p>
                <div className="mt-8 mono-eyebrow text-black/55">0{index + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
