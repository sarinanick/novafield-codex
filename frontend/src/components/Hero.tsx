"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const stats = [
  { value: "4.5M+", label: "Videos Generated" },
  { value: "30+", label: "AI Models" },
  { value: "500K+", label: "Active Creators" },
  { value: "50M+", label: "Images Created" },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} className="relative bg-canvas overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hairline to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--hairline-soft)) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.3,
          }}
        />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-hairline bg-surface-soft/50 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-semantic-success animate-pulse" />
              <span className="text-caption text-muted-foreground">NOW IN PUBLIC BETA</span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-display-xl text-ink mb-8 leading-[0.95]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              Turn ideas into
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
                cinematic AI videos
              </span>
            </motion.h1>

            <motion.p
              className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Generate stunning videos and images with 30+ AI models.
              No limits, full creative control. From concept to cinema in seconds.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              role="group"
              aria-label="Call to action buttons"
            >
              <Button asChild size="xl" className="group">
                <Link href="/auth/register">
                  Start Creating Free
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="xl" className="group">
                <Link href="#features">
                  <Play className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  See How It Works
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              role="list"
              aria-label="Platform statistics"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-surface-soft/50 backdrop-blur-sm border border-hairline-soft/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  role="listitem"
                >
                  <div
                    className="text-display-lg text-ink mb-1"
                    style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 540 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-caption text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
