"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="section-block block-pink text-center">
          <div className="mono-eyebrow text-black/70">Final note</div>
          <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">Ready for a cleaner deployment story?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-black/75">
            The site now reads with a much stronger visual system, so the product can feel deliberate instead of assembled.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8 inline-flex">
            <Button size="xl">
              <Zap className="mr-2 h-4 w-4" />
              Start creating free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
