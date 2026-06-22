"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "World", href: "/world" },
  ],
  Resources: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Meetings", href: "/meetings" },
    { label: "Messages", href: "/messages" },
    { label: "Orders", href: "/orders" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="sheet p-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <p className="text-2xl font-medium tracking-[-0.04em]">NovaField</p>
              <p className="mono-eyebrow mt-3 text-black/50">AI marketplace</p>
            </div>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="mono-eyebrow text-black/55">{category}</h4>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-black/70 transition-colors hover:text-black">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-6 text-sm text-black/55 md:flex-row md:items-center md:justify-between">
            <p>© 2026 NovaField. All rights reserved.</p>
            <div className="flex flex-wrap gap-5">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
