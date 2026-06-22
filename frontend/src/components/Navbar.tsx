"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageSquare, Bell, LayoutDashboard, LogOut, ChevronDown, Globe, Calendar, Shield } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (user) {
      api.getUnreadCount().then(r => setUnread(r.count)).catch(() => {});
      const interval = setInterval(() => {
        api.getUnreadCount().then(r => setUnread(r.count)).catch(() => {});
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <motion.header
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-canvas border-b border-hairline"
      style={{ height: 56 }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-ink">
              NovaField
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-body-sm rounded-md transition-colors ${
                  pathname.startsWith(link.href)
                    ? "text-ink font-medium"
                    : "text-muted-foreground hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/messages"
                      className="relative p-2 rounded-full hover:bg-surface-soft transition-colors"
                    >
                      <MessageSquare className="w-5 h-5 text-ink" />
                      {unread > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">
                          {unread > 9 ? "9+" : unread}
                        </span>
                      )}
                    </Link>
                    <div className="relative">
                      <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-soft transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          {user.name?.[0]}
                        </div>
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                      </button>
                      <AnimatePresence>
                        {showMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-56 bg-canvas border border-hairline rounded-lg shadow-lg p-1"
                          >
                            <div className="px-3 py-2 border-b border-hairline-soft mb-1">
                              <p className="text-body-sm font-medium text-ink">{user.name}</p>
                              <p className="text-caption text-muted-foreground">{user.email}</p>
                            </div>
                            <Link href="/dashboard" onClick={() => setShowMenu(false)} className="flex items-center gap-2 px-3 py-2 text-body-sm rounded-md hover:bg-surface-soft transition-colors text-ink">
                              <LayoutDashboard className="w-4 h-4" /> Dashboard
                            </Link>
                            <Link href="/world" onClick={() => setShowMenu(false)} className="flex items-center gap-2 px-3 py-2 text-body-sm rounded-md hover:bg-surface-soft transition-colors text-ink">
                              <Globe className="w-4 h-4" /> World
                            </Link>
                            <Link href="/meetings" onClick={() => setShowMenu(false)} className="flex items-center gap-2 px-3 py-2 text-body-sm rounded-md hover:bg-surface-soft transition-colors text-ink">
                              <Calendar className="w-4 h-4" /> Meetings
                            </Link>
                            <Link href="/messages" onClick={() => setShowMenu(false)} className="flex items-center gap-2 px-3 py-2 text-body-sm rounded-md hover:bg-surface-soft transition-colors text-ink">
                              <MessageSquare className="w-4 h-4" /> Messages
                            </Link>
                            <Link href={`/profile/${user.id}`} onClick={() => setShowMenu(false)} className="flex items-center gap-2 px-3 py-2 text-body-sm rounded-md hover:bg-surface-soft transition-colors text-ink">
                              <Bell className="w-4 h-4" /> Profile
                            </Link>
                            {user.role === "admin" && (
                              <Link href="/admin" onClick={() => setShowMenu(false)} className="flex items-center gap-2 px-3 py-2 text-body-sm rounded-md hover:bg-surface-soft transition-colors text-ink">
                                <Shield className="w-4 h-4" /> Admin
                              </Link>
                            )}
                            <button onClick={() => { logout(); setShowMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-body-sm rounded-md hover:bg-surface-soft text-destructive transition-colors">
                              <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="btn-secondary text-body-sm px-4 py-2">
                      Sign In
                    </Link>
                    <Link href="/auth/register" className="btn-primary text-body-sm px-4 py-2">
                      Get Started Free
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <button className="md:hidden p-2 rounded-full hover:bg-surface-soft" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-canvas border-t border-hairline">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} className="block px-4 py-3 text-body-sm text-ink hover:bg-surface-soft rounded-md" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/messages" className="block px-4 py-3 text-body-sm text-ink hover:bg-surface-soft rounded-md" onClick={() => setMobileOpen(false)}>Messages {unread > 0 && `(${unread})`}</Link>
                  <Link href="/meetings" className="block px-4 py-3 text-body-sm text-ink hover:bg-surface-soft rounded-md" onClick={() => setMobileOpen(false)}>Meetings</Link>
                  <Link href="/orders" className="block px-4 py-3 text-body-sm text-ink hover:bg-surface-soft rounded-md" onClick={() => setMobileOpen(false)}>Orders</Link>
                  {user.role === "admin" && (
                    <Link href="/admin" className="block px-4 py-3 text-body-sm text-ink hover:bg-surface-soft rounded-md" onClick={() => setMobileOpen(false)}>Admin</Link>
                  )}
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-left px-4 py-3 text-body-sm text-destructive hover:bg-surface-soft rounded-md">Sign Out</button>
                </>
              ) : (
                <div className="pt-2 space-y-2">
                  <Link href="/auth/login" className="block btn-secondary text-body-sm text-center">Sign In</Link>
                  <Link href="/auth/register" className="block btn-primary text-body-sm text-center">Get Started Free</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
