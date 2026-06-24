"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageSquare, LayoutDashboard, LogOut, ChevronDown, Shield, ShoppingCart, Store, FilePlus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useIsScrolled } from "@/hooks/use-scroll";

const publicNavLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/auth/register?role=freelancer", label: "Become a freelancer" },
];

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const scrolled = useIsScrolled(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    api.getUnreadCount().then(r => setUnread(r.count)).catch(() => {});
    const interval = setInterval(() => {
      api.getUnreadCount().then(r => setUnread(r.count)).catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShowMenu(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-canvas/80 backdrop-blur-xl border-b border-hairline shadow-sm"
            : "bg-canvas border-b border-hairline"
        }`}
        style={{ height: 56 }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="NovaField home">
              <span className="text-xl font-bold tracking-tight text-ink">NovaField</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {publicNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-body-sm rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    pathname.startsWith(link.href.split("?")[0])
                      ? "text-ink font-medium bg-surface-soft"
                      : "text-muted-foreground hover:text-ink hover:bg-surface-soft/50"
                  }`}
                  aria-current={pathname.startsWith(link.href.split("?")[0]) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link
                        href="/messages"
                        className="relative p-2 rounded-full hover:bg-surface-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label={`Messages${unread > 0 ? `, ${unread} unread` : ""}`}
                      >
                        <MessageSquare className="w-5 h-5 text-ink" />
                        {unread > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold" aria-hidden="true">
                            {unread > 9 ? "9+" : unread}
                          </span>
                        )}
                      </Link>
                      <div className="relative" ref={menuRef}>
                        <button
                          onClick={() => setShowMenu(!showMenu)}
                          className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          aria-expanded={showMenu}
                          aria-haspopup="true"
                          aria-label="User menu"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                            {user.name?.[0]}
                          </div>
                          <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${showMenu ? "rotate-180" : ""}`} />
                        </button>
                        {showMenu && (
                          <div
                            className="absolute right-0 top-full mt-2 w-56 bg-canvas border border-hairline rounded-xl shadow-xl p-1 z-50"
                            role="menu"
                          >
                            <div className="px-3 py-2 border-b border-hairline-soft mb-1">
                              <p className="text-body-sm font-medium text-ink">{user.name}</p>
                              <p className="text-caption text-muted-foreground">{user.email}</p>
                            </div>
                            {[
                              { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
                              { href: "/orders", icon: ShoppingCart, label: "Orders" },
                              { href: "/messages", icon: MessageSquare, label: "Messages" },
                              { href: "/marketplace", icon: Store, label: "Marketplace" },
                              ...(user.role === "freelancer" ? [{ href: "/create-gig", icon: FilePlus, label: "Create Gig" }] : []),
                              { href: `/profile/${user.id}`, icon: MessageSquare, label: "Profile" },
                              ...(user.role === "admin" ? [{ href: "/admin", icon: Shield, label: "Admin" }] : []),
                            ].map(item => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setShowMenu(false)}
                                className="flex items-center gap-2 px-3 py-2 text-body-sm rounded-lg hover:bg-surface-soft transition-colors text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                role="menuitem"
                              >
                                <item.icon className="w-4 h-4" /> {item.label}
                              </Link>
                            ))}
                            <div className="border-t border-hairline-soft mt-1 pt-1">
                              <button
                                onClick={() => { logout(); setShowMenu(false); }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-body-sm rounded-lg hover:bg-surface-soft text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                role="menuitem"
                              >
                                <LogOut className="w-4 h-4" /> Sign Out
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" className="btn-secondary text-body-sm px-4 py-2">
                        Sign In
                      </Link>
                      <Link href="/auth/register" className="btn-primary text-body-sm px-4 py-2">
                        Get Started
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-full hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-canvas border-l border-hairline z-50 md:hidden overflow-y-auto"
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-ink">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {user && (
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-hairline">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {user.name?.[0]}
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-ink">{user.name}</p>
                    <p className="text-caption text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}

              <nav className="space-y-1">
                {publicNavLinks.map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block px-4 py-3 text-body-sm rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      pathname.startsWith(l.href.split("?")[0]) ? "bg-surface-soft text-ink font-medium" : "text-muted-foreground hover:bg-surface-soft hover:text-ink"
                    }`}
                    aria-current={pathname.startsWith(l.href.split("?")[0]) ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              {user ? (
                <div className="mt-6 pt-6 border-t border-hairline space-y-1">
                  <Link href="/dashboard" className="block px-4 py-3 text-body-sm text-muted-foreground hover:bg-surface-soft rounded-lg transition-colors">Dashboard</Link>
                  <Link href="/orders" className="block px-4 py-3 text-body-sm text-muted-foreground hover:bg-surface-soft rounded-lg transition-colors">Orders</Link>
                  <Link href="/messages" className="block px-4 py-3 text-body-sm text-muted-foreground hover:bg-surface-soft rounded-lg transition-colors">Messages {unread > 0 && `(${unread})`}</Link>
                  <Link href="/marketplace" className="block px-4 py-3 text-body-sm text-muted-foreground hover:bg-surface-soft rounded-lg transition-colors">Marketplace</Link>
                  {user.role === "freelancer" && (
                    <Link href="/create-gig" className="block px-4 py-3 text-body-sm text-muted-foreground hover:bg-surface-soft rounded-lg transition-colors">Create Gig</Link>
                  )}
                  <Link href={`/profile/${user.id}`} className="block px-4 py-3 text-body-sm text-muted-foreground hover:bg-surface-soft rounded-lg transition-colors">Profile</Link>
                  {user.role === "admin" && (
                    <Link href="/admin" className="block px-4 py-3 text-body-sm text-muted-foreground hover:bg-surface-soft rounded-lg transition-colors">Admin</Link>
                  )}
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-left px-4 py-3 text-body-sm text-destructive hover:bg-surface-soft rounded-lg transition-colors mt-2">Sign Out</button>
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t border-hairline space-y-3">
                  <Link href="/auth/login" className="block btn-secondary text-body-sm text-center">Sign In</Link>
                  <Link href="/auth/register" className="block btn-primary text-body-sm text-center">Get Started</Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
