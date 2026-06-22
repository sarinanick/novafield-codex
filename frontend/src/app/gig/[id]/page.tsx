"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, RefreshCcw, Shield, ChevronRight, Check, ShoppingCart, MessageSquare, Eye, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [gig, setGig] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [ordering, setOrdering] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    Promise.all([
      api.getGig(params.id as string).catch(() => null),
      api.getGigReviews(params.id as string).catch(() => []),
    ]).then(([g, r]) => {
      setGig(g);
      setReviews(r);
      if (g?.packages?.length) setSelectedPackage(g.packages[0]);
      setLoading(false);
    });
  }, [params.id]);

  const handleOrder = async () => {
    if (!user) { router.push("/auth/login"); return; }
    if (!selectedPackage) return;
    setOrdering(true);
    try {
      await api.createOrder({ gigId: gig.id, packageId: selectedPackage.id, requirements: "" });
      router.push("/orders");
    } catch (err: any) { alert(err.message); }
    setOrdering(false);
  };

  const handleFavorite = async () => {
    if (!user) { router.push("/auth/login"); return; }
    try {
      await api.toggleFavorite(gig.id);
      setFavorited(!favorited);
    } catch {}
  };

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  );
  if (!gig) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-muted-foreground mb-4">Gig not found</p>
        <Link href="/marketplace"><Button variant="outline">Back to Marketplace</Button></Link>
      </div>
    </div>
  );

  const gradients: Record<string, string> = {
    "ai-video": "from-violet-600 via-purple-600 to-blue-600",
    "ai-image": "from-blue-600 via-cyan-500 to-teal-500",
    "ai-audio": "from-emerald-600 to-green-600",
    "ai-animation": "from-pink-600 via-rose-500 to-red-500",
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/marketplace?category=${gig.category}`} className="hover:text-foreground transition-colors capitalize">{gig.category?.replace("ai-", "AI ")}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate max-w-[200px]">{gig.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Hero Image */}
              <div className="rounded-2xl overflow-hidden mb-6">
                <div className={`aspect-video bg-gradient-to-br ${gradients[gig.category] || "from-gray-600 to-slate-600"} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative text-center">
                    <p className="text-3xl font-bold text-white mb-2">{gig.title}</p>
                    {gig.aiTools?.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {gig.aiTools.map((tool: string) => (
                          <span key={tool} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white/90 text-sm">{tool}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Title & Seller */}
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{gig.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Link href={`/profile/${gig.freelancer?.id}`} className="flex items-center gap-3 hover:opacity-80 transition">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center font-bold text-sm">
                    {gig.freelancer?.name?.[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm flex items-center gap-1.5">
                      {gig.freelancer?.name}
                      {gig.freelancer?.isVerified && <Shield className="w-4 h-4 text-primary" />}
                    </p>
                    <p className="text-xs text-muted-foreground">{gig.freelancer?.isVerified ? "Verified Seller" : "New Seller"}</p>
                  </div>
                </Link>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{gig.rating?.toFixed(1) || "New"}</span>
                    <span className="text-muted-foreground">({gig.reviewsCount || 0})</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    {gig.views || 0} views
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {gig.deliveryDays} day delivery
                  </span>
                </div>
              </div>

              {/* Content Tabs */}
              <Tabs defaultValue="description">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="about">About the Seller</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{gig.description}</p>
                    {gig.tags?.length > 0 && (
                      <div className="mt-6">
                        <div className="flex flex-wrap gap-2">
                          {gig.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="about" className="mt-6">
                  <Card className="border border-hairline">
                    <CardContent className="p-6">
                      <Link href={`/profile/${gig.freelancer?.id}`} className="flex items-center gap-4 mb-6 hover:opacity-80 transition">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-2xl font-bold">
                          {gig.freelancer?.name?.[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{gig.freelancer?.name}</h3>
                          <p className="text-muted-foreground">{gig.freelancer?.bio || "No bio yet"}</p>
                        </div>
                      </Link>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: gig.freelancer?.rating?.toFixed(1) || "New", label: "Rating" },
                          { value: gig.freelancer?.reviewsCount || 0, label: "Reviews" },
                          { value: gig.ordersCount || 0, label: "Orders" },
                        ].map(stat => (
                          <div key={stat.label} className="text-center p-4 rounded-xl bg-surface-soft border border-hairline-soft">
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      {gig.freelancer?.skills?.length > 0 && (
                        <div className="mt-6">
                          <p className="text-sm font-medium mb-2">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {gig.freelancer.skills.map((s: string) => (
                              <Badge key={s} variant="secondary">{s}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <div className="text-center py-12">
                        <Star className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No reviews yet</p>
                      </div>
                    ) : reviews.map((r: any) => (
                      <Card key={r.id} className="border border-hairline">
                        <CardContent className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-xs font-bold">
                              {r.reviewer?.name?.[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{r.reviewer?.name}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < r.rating ? "text-amber-400 fill-current" : "text-muted-foreground"}`} />
                                ))}
                              </div>
                            </div>
                            <span className="ml-auto text-xs text-muted-foreground">{r.createdAt?.split("T")[0]}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar - Packages */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {gig.packages?.map((pkg: any) => (
                <motion.div
                  key={pkg.id}
                  whileHover={{ scale: 1.01 }}
                  className={`rounded-2xl p-6 cursor-pointer transition-all border ${
                    selectedPackage?.id === pkg.id
                      ? "border-primary shadow-xl shadow-primary/10 bg-canvas"
                      : "border-hairline bg-canvas hover:border-hairline"
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedPackage?.id === pkg.id}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedPackage(pkg); } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{pkg.name}</h3>
                    <span className="text-2xl font-bold">${pkg.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.deliveryDays} day delivery</span>
                    <span className="flex items-center gap-1"><RefreshCcw className="w-3.5 h-3.5" /> {pkg.revisions} revisions</span>
                  </div>
                  {pkg.features?.length > 0 && (
                    <ul className="space-y-2">
                      {pkg.features.map((f: string) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}

              <Button className="w-full" size="lg" onClick={handleOrder} disabled={ordering || !selectedPackage}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {ordering ? "Placing Order..." : `Continue ($${selectedPackage?.price || 0})`}
              </Button>

              {user && user.id !== gig.freelancer?.id && (
                <div className="flex gap-2">
                  <Link href={`/messages?user=${gig.freelancer?.id}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={handleFavorite} className={favorited ? "text-red-500 border-red-500/30" : ""}>
                    <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
