"use client";

import { Film, Image, Video, Users, Wand2, Layers, Camera, Palette } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const tools = [
  { icon: Film, title: "Cinema Studio", desc: "Create cinematic scenes with full camera control and direction", badge: "New" },
  { icon: Image, title: "Image Generator", desc: "Generate high-quality images with 15+ specialized AI models", badge: "Popular" },
  { icon: Video, title: "Video Generator", desc: "Create videos from text prompts in seconds with AI", badge: "Fast" },
  { icon: Users, title: "Character AI", desc: "Build consistent characters across multiple video scenes", badge: "Trending" },
  { icon: Wand2, title: "Image Editor", desc: "AI-powered inpainting, outpainting, and style transfer", badge: null },
  { icon: Layers, title: "Marketing Studio", desc: "Launch full marketing campaigns from a single prompt", badge: "Hot" },
  { icon: Camera, title: "Supercomputer", desc: "One superagent for your entire creative stack", badge: "Pro" },
  { icon: Palette, title: "Style Presets", desc: "50+ viral presets from CGI to cyberpunk to anime", badge: null },
];

export default function Features() {
  return (
    <section id="features" className="bg-canvas py-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-eyebrow text-muted-foreground mb-4">TOOLS</p>
          <h2 className="text-display-lg text-ink mb-6">
            Everything you need to
            <br />
            bring your vision to life
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to final render, NovaField gives you complete creative control
            with the most advanced AI models available.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
          {tools.map((tool) => (
            <StaggerItem key={tool.title}>
              <div className="bg-surface-soft rounded-md p-6 h-full cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-canvas border border-hairline rounded-md flex items-center justify-center mb-4">
                  <tool.icon className="w-6 h-6 text-ink" />
                </div>
                <h3 className="text-card-title text-ink mb-2 flex items-center gap-2">
                  {tool.title}
                  {tool.badge && (
                    <span className="text-caption px-2 py-0.5 rounded-full bg-block-lime text-ink">
                      {tool.badge}
                    </span>
                  )}
                </h3>
                <p className="text-body-sm text-muted-foreground">{tool.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
