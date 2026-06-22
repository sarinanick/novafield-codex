"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, AlertCircle, Star, MessageSquare, Send, FileUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) { router.push("/auth/login"); return; }
    loadOrders();
  }, [user, authLoading]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const o = await api.getOrders();
      setOrders(o);
    } catch {}
    setLoading(false);
  };

  const handleDeliver = async (orderId: string) => {
    setActionLoading(orderId);
    try {
      await api.deliverOrder(orderId, { file: "delivery.zip", notes: "Here is your delivery" });
      loadOrders();
    } catch (err: any) { alert(err.message); }
    setActionLoading(null);
  };

  const handleApprove = async (orderId: string) => {
    setActionLoading(orderId);
    try {
      await api.approveOrder(orderId);
      loadOrders();
    } catch (err: any) { alert(err.message); }
    setActionLoading(null);
  };

  const handleRevision = async (orderId: string) => {
    setActionLoading(orderId);
    try {
      await api.requestRevision(orderId, { message: "Please make revisions" });
      loadOrders();
    } catch (err: any) { alert(err.message); }
    setActionLoading(null);
  };

  if (authLoading || loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  );

  const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
    pending: { color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock, label: "Pending" },
    active: { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Send, label: "In Progress" },
    delivered: { color: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: FileUp, label: "Delivered" },
    revision: { color: "bg-orange-500/10 text-orange-600 border-orange-500/20", icon: AlertCircle, label: "Revision Requested" },
    completed: { color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle, label: "Completed" },
  };

  const filtered = orders.filter(o => {
    if (activeTab === "active") return ["active", "pending", "revision"].includes(o.status);
    if (activeTab === "delivered") return o.status === "delivered";
    if (activeTab === "completed") return o.status === "completed";
    return true;
  });

  const tabCounts = {
    active: orders.filter(o => ["active", "pending", "revision"].includes(o.status)).length,
    delivered: orders.filter(o => o.status === "delivered").length,
    completed: orders.filter(o => o.status === "completed").length,
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-muted-foreground mb-8">{orders.length} total orders</p>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active ({tabCounts.active})</TabsTrigger>
              <TabsTrigger value="delivered">Delivered ({tabCounts.delivered})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({tabCounts.completed})</TabsTrigger>
              <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-ink mb-1">No orders in this category</p>
                  <p className="text-sm text-muted-foreground mb-4">Browse the marketplace to find AI services</p>
                  <Link href="/marketplace">
                    <Button variant="outline">Browse Marketplace</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((order: any, i: number) => {
                    const status = statusConfig[order.status] || statusConfig.pending;
                    const StatusIcon = status.icon;
                    return (
                      <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <Card className="border border-hairline hover:shadow-md transition-shadow">
                          <CardContent className="p-5 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                              <div className="flex items-start gap-4">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${status.color.split(" ").slice(0, 1).join(" ")}`}>
                                  <StatusIcon className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <Link href={`/gig/${order.gigId}`} className="font-semibold hover:text-primary transition-colors line-clamp-1">
                                    {order.gig?.title || "Order"}
                                  </Link>
                                  <p className="text-sm text-muted-foreground mt-0.5">
                                    {user?.role === "freelancer" ? `Client: ${order.buyer?.name}` : `Freelancer: ${order.seller?.name}`}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-0.5">Created {order.createdAt?.split("T")[0]}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 sm:shrink-0">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${status.color}`}>
                                  {status.label}
                                </span>
                                <span className="text-lg font-bold">${order.price}</span>
                              </div>
                            </div>

                            {order.status === "delivered" && user?.role === "client" && (
                              <div className="flex flex-wrap gap-2 pt-4 border-t border-hairline">
                                <Button size="sm" onClick={() => handleApprove(order.id)} disabled={actionLoading === order.id}>
                                  <CheckCircle className="w-4 h-4 mr-1" /> Approve & Pay
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleRevision(order.id)} disabled={actionLoading === order.id}>
                                  <AlertCircle className="w-4 h-4 mr-1" /> Request Revision
                                </Button>
                                <Link href={`/messages?user=${order.sellerId}`}>
                                  <Button size="sm" variant="ghost"><MessageSquare className="w-4 h-4 mr-1" /> Message</Button>
                                </Link>
                              </div>
                            )}

                            {order.status === "active" && user?.role === "freelancer" && (
                              <div className="flex flex-wrap gap-2 pt-4 border-t border-hairline">
                                <Button size="sm" onClick={() => handleDeliver(order.id)} disabled={actionLoading === order.id}>
                                  <Send className="w-4 h-4 mr-1" /> Deliver Order
                                </Button>
                                <Link href={`/messages?user=${order.buyerId}`}>
                                  <Button size="sm" variant="ghost"><MessageSquare className="w-4 h-4 mr-1" /> Message</Button>
                                </Link>
                              </div>
                            )}

                            {order.status === "completed" && (
                              <div className="pt-4 border-t border-hairline">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  Order completed on {order.completedAt?.split("T")[0] || "N/A"}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
