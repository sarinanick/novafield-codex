"use client";

import { Film, Image, Sparkles, Zap, Brain, Palette } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const videoModels = [
  { id: "sora-2", name: "Sora 2", desc: "State-of-the-art video generation by OpenAI", icon: Film },
  { id: "kling-3", name: "Kling 3.0", desc: "High-quality cinematic videos with camera control", icon: Film },
  { id: "veo-3", name: "Google Veo 3", desc: "Advanced video synthesis with physics understanding", icon: Sparkles },
  { id: "seedance-2", name: "Seedance 2.0", desc: "Create videos in seconds with motion control", icon: Zap },
  { id: "minimax", name: "MiniMax Hailuo", desc: "Realistic video generation with lip sync", icon: Film },
];

const imageModels = [
  { id: "soul-v2", name: "Higgsfield Soul", desc: "Consistent character generation across scenes", icon: Brain },
  { id: "nano-banana", name: "Nano Banana", desc: "High-quality visual generation with style control", icon: Palette },
  { id: "gpt-image", name: "GPT Image", desc: "OpenAI's latest image generation model", icon: Image },
  { id: "recraft-v4", name: "Recraft 4.1", desc: "Crisp vectors, refined aesthetics, total control", icon: Palette },
  { id: "flux", name: "Flux Kontext", desc: "Context-aware image generation", icon: Sparkles },
];

export default function Models() {
  return (
    <section id="tools" className="bg-canvas py-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-eyebrow text-muted-foreground mb-4">AI MODELS</p>
          <h2 className="text-display-lg text-ink mb-6">
            30+ AI Models
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
            Access the most powerful AI models in one platform. From video to image generation.
          </p>
        </AnimatedSection>

        <Tabs defaultValue="video" className="w-full">
          <AnimatedSection delay={0.2} className="flex justify-center mb-12">
            <TabsList className="bg-surface-soft border border-hairline p-1 rounded-pill h-12">
              <TabsTrigger value="video" className="px-6 text-body-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-pill transition-all duration-300">
                <Film className="w-4 h-4 mr-2" />
                Video Models
              </TabsTrigger>
              <TabsTrigger value="image" className="px-6 text-body-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-pill transition-all duration-300">
                <Image className="w-4 h-4 mr-2" />
                Image Models
              </TabsTrigger>
            </TabsList>
          </AnimatedSection>

          <TabsContent value="video">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
              {videoModels.map((model) => (
                <StaggerItem key={model.id}>
                  <div className="bg-surface-soft border border-hairline rounded-md p-6 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-canvas border border-hairline rounded-md flex items-center justify-center shrink-0">
                        <model.icon className="w-6 h-6 text-ink" />
                      </div>
                      <div>
                        <h3 className="text-card-title text-ink mb-1">{model.name}</h3>
                        <p className="text-body-sm text-muted-foreground">{model.desc}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </TabsContent>

          <TabsContent value="image">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
              {imageModels.map((model) => (
                <StaggerItem key={model.id}>
                  <div className="bg-surface-soft border border-hairline rounded-md p-6 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-canvas border border-hairline rounded-md flex items-center justify-center shrink-0">
                        <model.icon className="w-6 h-6 text-ink" />
                      </div>
                      <div>
                        <h3 className="text-card-title text-ink mb-1">{model.name}</h3>
                        <p className="text-body-sm text-muted-foreground">{model.desc}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
