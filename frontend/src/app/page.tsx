"use client";

import dynamic from "next/dynamic";
import { SkipLink } from "@/components/SkipLink";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Marquee = dynamic(() => import("@/components/Marquee"), { ssr: false });
const Features = dynamic(() => import("@/components/Features"), { ssr: false });
const FeaturedServices = dynamic(() => import("@/components/FeaturedServices"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: false });
const Trust = dynamic(() => import("@/components/Trust"), { ssr: false });
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: false });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <>
      <SkipLink />
      <main id="main-content" className="min-h-screen bg-canvas">
        <Navbar />
        <Hero />
        <Marquee />
        <Features />
        <FeaturedServices />
        <HowItWorks />
        <Trust />
        <Pricing />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
