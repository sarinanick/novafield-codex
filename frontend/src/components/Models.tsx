"use client";

import { motion } from "framer-motion";
import { Film, Image, Sparkles, Zap, Brain, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const videoModels = [
  { id: "sora-2", name: "Sora 2", desc: "State-of-the-art video generation.", icon: Film },
  { id: "kling-3", name: "Kling 3.0", desc: "Cinematic motion with camera control.", icon: Film },
  { id: "veo-3", name: "Google Veo 3", desc: "Advanced scene synthesis.", icon: Sparkles },
  { id: "seedance-2", name: "Seedance 2.0", desc: "Fast motion and clean render output.", icon: Zap },
  { id: "minimax", name: "MiniMax Hailuo", desc: "Realistic motion with lip sync.", icon: Film },
];

const imageModels = [
  { id: "soul-v2", name: "Higgsfield Soul", desc: "Consistent character generation.", icon: Brain },
  { id: "nano-banana", name: "Nano Banana", desc: "High-quality visual generation.", icon: Palette },
  { id: "gpt-image", name: "GPT Image", desc: "OpenAI image generation.", icon: Image },
  { id: "recraft-v4", name: "Recraft 4.1", desc: "Crisp vectors and refined aesthetics.", icon: Palette },
  { id: "flux", name: "Flux Kontext", desc: "Context-aware image generation.", icon: Sparkles },
];

export default function Models() {
  return (
    <section id="tools" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="section-block block-mint">
          <div className="mono-eyebrow text-black/70">Models</div>
          <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">The model library gets the same editorial calm.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-black/75">
            Tabs stay pill-shaped and the content reads like a catalog instead of a dashboard dump.
          </p>

          <Tabs defaultValue="video" className="mt-8">
            <TabsList>
              <TabsTrigger value="video">Video models</TabsTrigger>
              <TabsTrigger value="image">Image models</TabsTrigger>
            </TabsList>

            <TabsContent value="video">
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {videoModels.map((model) => (
                  <motion.div key={model.id} whileHover={{ y: -4 }} className="sheet p-5">
                    <model.icon className="h-6 w-6" />
                    <h3 className="mt-5 text-xl font-medium">{model.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/70">{model.desc}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="image">
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {imageModels.map((model) => (
                  <motion.div key={model.id} whileHover={{ y: -4 }} className="sheet p-5">
                    <model.icon className="h-6 w-6" />
                    <h3 className="mt-5 text-xl font-medium">{model.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/70">{model.desc}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
