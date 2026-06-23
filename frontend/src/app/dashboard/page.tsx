"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Star, Eye, TrendingUp, Package, Clock, CheckCircle, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [myGigs, setMyGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { router.push("/auth/login"); return; }
    if (!user) return;
    Promise.all([
      api.getDashboard().catch(() => null),
      api.getOrders().catch(() => []),
      user.role === "freelancer" ? api.getMyGigs().catch(() => []) : Promise.resolve([]),
    ]).then(([s, o, g]) => {
      setStats(s);
      setOrders(o);
      setMyGigs(g);
      setLoading(false);
    });
  }, [user, authLoading]);

  if (authLoading || loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  );
  if (!user) return null;

  const statCards = [
    {
      label: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      label: "Active Orders",
      value: stats?.activeOrders || 0,
      icon: Clock,
      color: "from-orange-500 to-amber-500",
      change: null,
      changeType: null,
    },
    {
      label: user.role === "freelancer" ? "Total Earnings" : "Total Spent",
      value: `$${(user.role === "freelancer" ? stats?.totalEarnings : stats?.totalSpent)?.toFixed(0) || 0}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      label: "Avg Rating",
      value: stats?.avgRating?.toFixed(1) || "New",
      icon: Star,
      color: "from-amber-500 to-yellow-500",
      change: null,
      changeType: null,
    },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    active: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    delivered: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    revision: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    completed: "bg-green-500/10 text-green-600 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
              <p className="text-muted-foreground mt-1">Here&apos;s your {user.role === "freelancer" ? "seller" : "buyer"} dashboard</p>
            </div>
            {user.role === "freelancer" && (
              <Link href="/create-gig">
                <Button><Plus className="w-4 h-4 mr-2" /> Create New Gig</Button>
              </Link>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="border border-hairline hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      {stat.change && (
                        <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                          {stat.changeType === "positive" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stat.change}
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Secondary Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Completed", value: stats?.completedOrders || 0, icon: CheckCircle },
              { label: user.role === "freelancer" ? "Active Gigs" : "Total Views", value: user.role === "freelancer" ? stats?.totalGigs || 0 : stats?.totalViews || 0, icon: Eye },
              { label: "Conversion", value: `${((stats?.conversionRate || 0) * 100).toFixed(0)}%`, icon: TrendingUp },
              { label: "Reviews", value: stats?.totalReviews || 0, icon: Star },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-soft border border-hairline-soft">
                  <stat.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="orders">
            <TabsList className="mb-6">
              <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              {user.role === "freelancer" && <TabsTrigger value="gigs">My Gigs</TabsTrigger>}
            </TabsList>

            <TabsContent value="orders">
              <Card className="border border-hairline">
                <CardContent className="p-0">
                  {orders.length === 0 ? (
                    <div className="text-center py-16">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium text-ink mb-1">No orders yet</p>
                      <p className="text-sm text-muted-foreground mb-4">Start by browsing the marketplace</p>
                      <Link href="/marketplace">
                        <Button variant="outline">Browse Marketplace</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-hairline">
                      {orders.slice(0, 8).map((o: any) => (
                        <Link key={o.id} href="/orders">
                          <motion.div whileHover={{ backgroundColor: "hsl(var(--surface-soft))" }} className="flex items-center justify-between p-4 sm:p-5 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center shrink-0">
                                <Package className="w-5 h-5 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-sm truncate">{o.gig?.title || "Order"}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {user.role === "freelancer" ? `From ${o.buyer?.name}` : `To ${o.seller?.name}`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-4">
                              <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[o.status] || ""}`}>
                                {o.status}
                              </span>
                              <span className="font-semibold text-sm">${o.price}</span>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {user.role === "freelancer" && (
              <TabsContent value="gigs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myGigs.map((gig: any) => (
                    <Link key={gig.id} href={`/gig/${gig.id}`}>
                      <Card className="border border-hairline cursor-pointer hover:shadow-md hover:border-primary/20 transition-all h-full">
                        <CardContent className="p-5">
                          <h3 className="font-semibold mb-2 line-clamp-1">{gig.title}</h3>
                          <div className="flex justify-between text-sm text-muted-foreground mb-3">
                            <span>{gig.ordersCount || 0} orders</span>
                            <span>{gig.views || 0} views</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs px-2 py-1 rounded-full ${gig.status === "active" ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-500"}`}>
                              {gig.status}
                            </span>
                            <span className="font-bold">${gig.price}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  <Link href="/create-gig">
                    <Card className="border-2 border-dashed border-hairline cursor-pointer hover:border-primary/30 transition-colors h-full flex items-center justify-center min-h-[200px]">
                      <div className="text-center">
                        <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground font-medium">Create New Gig</p>
                      </div>
                    </Card>
                  </Link>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
