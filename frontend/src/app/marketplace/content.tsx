"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Star, Clock, X, ChevronDown, Grid3X3, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export default function MarketplaceContent() {
  const searchParams = useSearchParams();
  const [gigs, setGigs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { api.getCategories().then(setCategories).catch(() => {}); }, []);

  const loadGigs = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: "12", sort: sortBy };
      if (query) params.q = query;
      if (category) params.category = category;
      const res = await api.getGigs(params);
      setGigs(res.gigs || []);
      setTotal(res.total || 0);
    } catch { setGigs([]); }
    setLoading(false);
  }, [page, query, category, sortBy]);

  useEffect(() => { loadGigs(); }, [loadGigs]);

  const gradients: Record<string, string> = {
    "ai-video": "from-violet-600 via-purple-600 to-blue-600",
    "ai-image": "from-blue-600 via-cyan-500 to-teal-500",
    "ai-audio": "from-emerald-600 to-green-600",
    "ai-animation": "from-pink-600 via-rose-500 to-red-500",
    "ai-chatbots": "from-indigo-600 to-violet-600",
    "ai-webdev": "from-orange-500 to-amber-500",
    "ai-writing": "from-teal-500 to-cyan-500",
    "ai-data": "from-red-500 to-orange-500",
    "ai-design": "from-violet-500 to-purple-500",
    "ai-marketing": "from-yellow-500 to-amber-500",
  };

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Find AI <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Freelancers</span>
          </h1>
          <p className="text-muted-foreground mb-6">{total} services available</p>
          <form onSubmit={(e) => { e.preventDefault(); setPage(1); loadGigs(); }} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search AI services, tools, freelancers..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
            <Button type="submit" size="lg">Search</Button>
          </form>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-body-sm font-semibold text-ink mb-3">Categories</h3>
                <div className="space-y-0.5">
                  <button
                    onClick={() => { setCategory(""); setPage(1); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-body-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      !category ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-ink hover:bg-surface-soft"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat: any) => (
                    <button
                      key={cat.id}
                      onClick={() => { setCategory(cat.slug); setPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-body-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        category === cat.slug ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-ink hover:bg-surface-soft"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-hairline">
                <h3 className="text-body-sm font-semibold text-ink mb-3">Sort By</h3>
                <div className="space-y-0.5">
                  {sortOptions.map(s => (
                    <button
                      key={s.value}
                      onClick={() => { setSortBy(s.value); setPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-body-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        sortBy === s.value ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-ink hover:bg-surface-soft"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter bar */}
            <div className="flex items-center gap-2 mb-4 lg:hidden">
              <Button variant="secondary" size="sm" onClick={() => setShowFilters(true)}>
                <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
              </Button>
              {category && (
                <Badge variant="secondary" className="gap-1">
                  {categories.find((c: any) => c.slug === category)?.name || category}
                  <button onClick={() => { setCategory(""); setPage(1); }} className="ml-1" aria-label="Remove filter">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden animate-pulse bg-surface-soft border border-hairline">
                    <div className="aspect-video bg-hairline" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-hairline rounded w-3/4" />
                      <div className="h-3 bg-hairline rounded w-1/2" />
                      <div className="h-3 bg-hairline rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : gigs.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-surface-soft flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-xl font-medium text-ink mb-2">No gigs found</p>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {gigs.map((gig: any, i: number) => (
                  <Link key={gig.id} href={`/gig/${gig.id}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -6 }}
                      className="rounded-2xl overflow-hidden cursor-pointer group h-full border border-hairline bg-canvas hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gig.category] || "from-gray-600 to-slate-600"}`} />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-white/90 px-4 text-center">{gig.title}</span>
                        </div>
                        {gig.aiTools?.length > 0 && (
                          <div className="absolute bottom-3 left-3">
                            <span className="px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white/80 text-xs font-medium">
                              {gig.aiTools[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
                            {gig.freelancer?.name?.[0] || "?"}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{gig.freelancer?.name}</p>
                            <p className="text-xs text-muted-foreground">{gig.freelancer?.isVerified ? "Verified Seller" : "New Seller"}</p>
                          </div>
                        </div>
                        <h3 className="font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">{gig.title}</h3>
                        <div className="flex items-center gap-3 text-sm mb-3">
                          <span className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-current" /> {gig.rating?.toFixed(1) || "New"}
                            <span className="text-muted-foreground">({gig.reviewsCount || 0})</span>
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" /> {gig.deliveryDays}d delivery
                          </span>
                        </div>
                        <div className="pt-3 border-t border-hairline flex justify-between items-center">
                          <span className="text-xs text-muted-foreground uppercase">{gig.ordersCount || 0} orders</span>
                          <span className="font-bold text-lg">From ${gig.price}</span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            )}

            {total > 12 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                  Previous
                </Button>
                <span className="flex items-center px-4 text-sm text-muted-foreground">
                  Page {page} of {Math.ceil(total / 12)}
                </span>
                <Button variant="outline" size="sm" disabled={page * 12 >= total} onClick={() => setPage(p => p + 1)}>
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-canvas rounded-t-2xl z-50 max-h-[80vh] overflow-y-auto lg:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-surface-soft rounded-lg" aria-label="Close filters">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-body-sm font-semibold text-ink mb-3">Categories</h4>
                    <div className="space-y-1">
                      <button
                        onClick={() => { setCategory(""); setPage(1); setShowFilters(false); }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-body-sm transition-colors ${
                          !category ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-surface-soft"
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((cat: any) => (
                        <button
                          key={cat.id}
                          onClick={() => { setCategory(cat.slug); setPage(1); setShowFilters(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-body-sm transition-colors ${
                            category === cat.slug ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-surface-soft"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-hairline">
                    <h4 className="text-body-sm font-semibold text-ink mb-3">Sort By</h4>
                    <div className="space-y-1">
                      {sortOptions.map(s => (
                        <button
                          key={s.value}
                          onClick={() => { setSortBy(s.value); setPage(1); setShowFilters(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-body-sm transition-colors ${
                            sortBy === s.value ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-surface-soft"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
