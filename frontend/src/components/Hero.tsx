"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "4.5M+", label: "Videos Generated" },
  { value: "30+", label: "AI Models" },
  { value: "500K+", label: "Active Creators" },
  { value: "50M+", label: "Images Created" },
];

export default function Hero() {
  return (
    <section className="relative bg-canvas overflow-hidden" aria-labelledby="hero-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.p
            className="text-eyebrow mb-6 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            aria-hidden="true"
          >
            AI-POWERED CREATIVE PLATFORM
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="text-display-xl text-ink mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Turn ideas into
            <br />
            cinematic AI videos
          </motion.h1>

          <motion.p
            className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Generate stunning videos and images with 30+ AI models.
            No limits, full creative control. From concept to cinema in seconds.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            role="group"
            aria-label="Call to action buttons"
          >
            <Button asChild size="lg">
              <Link href="/auth/register">
                Start Creating Free
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#features">
                See How It Works
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            role="list"
            aria-label="Platform statistics"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                role="listitem"
              >
                <div
                  className="text-display-lg text-ink mb-1"
                  style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 540 }}
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {stat.value}
                </div>
                <div className="text-caption text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
