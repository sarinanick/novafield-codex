"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles, ChevronDown, MessageSquare, LayoutDashboard, LogOut, Globe, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/world", label: "World" },
  { href: "/meetings", label: "Meetings" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user) return;
    api.getUnreadCount().then((r) => setUnread(r.count)).catch(() => {});
  }, [user]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">NovaField</p>
            <p className="mono-eyebrow mt-1 text-[10px] text-black/50">AI marketplace</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                pathname.startsWith(link.href) ? "bg-black text-white" : "text-black/70 hover:bg-black/5 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!loading && (
            user ? (
              <>
                <Link href="/messages" className="rounded-full border border-black/10 p-2 hover:bg-black hover:text-white transition-colors">
                  <MessageSquare className="h-4 w-4" />
                </Link>
                {unread > 0 && (
                  <span className="rounded-full bg-black px-2.5 py-1 text-xs font-medium text-white">{unread > 9 ? "9+" : unread}</span>
                )}
                <div className="relative">
                  <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2 rounded-full border border-black/10 px-3 py-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                      {user.name?.[0] ?? "U"}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-3xl border border-black/10 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                      >
                        <div className="border-b border-black/5 px-3 py-2">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-black/50">{user.email}</p>
                        </div>
                        <Link href="/dashboard" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-black/5">
                          <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Link>
                        <Link href="/world" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-black/5">
                          <Globe className="h-4 w-4" /> World
                        </Link>
                        <Link href="/meetings" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-black/5">
                          <Calendar className="h-4 w-4" /> Meetings
                        </Link>
                        {user.role === "admin" && (
                          <Link href="/admin" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-black/5">
                            <Shield className="h-4 w-4" /> Admin
                          </Link>
                        )}
                        <button onClick={() => { logout(); setMenuOpen(false); }} className="flex w-full items-center gap-2 rounded-full px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                          <LogOut className="h-4 w-4" /> Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login"><Button variant="outline">Sign in</Button></Link>
                <Link href="/auth/register"><Button>Get started</Button></Link>
              </>
            )
          )}
        </div>

        <button className="rounded-full border border-black/10 p-2 md:hidden" onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-black/10 bg-white md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <div className="grid gap-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-2xl px-4 py-3 text-sm hover:bg-black/5" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link href="/messages" className="rounded-2xl px-4 py-3 text-sm hover:bg-black/5" onClick={() => setMobileOpen(false)}>Messages {unread > 0 ? `(${unread})` : ""}</Link>
                    <Link href="/orders" className="rounded-2xl px-4 py-3 text-sm hover:bg-black/5" onClick={() => setMobileOpen(false)}>Orders</Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="rounded-2xl px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50">Sign out</button>
                  </>
                ) : (
                  <div className="grid gap-2 pt-2">
                    <Link href="/auth/login"><Button variant="outline" className="w-full">Sign in</Button></Link>
                    <Link href="/auth/register"><Button className="w-full">Get started</Button></Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
