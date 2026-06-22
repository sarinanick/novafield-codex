"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="color-block-lime p-8 md:p-16 lg:p-20 rounded-lg text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-display-lg text-ink mb-6">
                Ready to create?
              </h2>
              <p className="text-body-lg text-ink/70 mb-10 max-w-lg mx-auto">
                Join 500,000+ creators already using NovaField to bring their ideas to life.
              </p>
              <Link href="/auth/register" className="btn-primary text-body px-8 py-4">
                Start Creating Free
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Link>
              <p className="text-caption text-ink/50 mt-6">NO CREDIT CARD REQUIRED</p>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
