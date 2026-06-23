"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, Calendar, Shield, MessageSquare, ExternalLink, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export default function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    Promise.all([
      api.getProfile(params.id as string).catch(() => null),
      api.getGigs({ q: "", category: "" }).then(res => (res.gigs || []).filter((g: any) => g.freelancerId === params.id)).catch(() => []),
    ]).then(([p, g]) => {
      setProfile(p);
      setGigs(g);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  );
  if (!profile) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-muted-foreground mb-4">Profile not found</p>
        <Link href="/marketplace"><Button variant="outline">Back to Marketplace</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile Card */}
          <Card className="border border-hairline mb-8 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/10" />
            <CardContent className="p-6 sm:p-8 -mt-12 relative">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-4xl font-bold shrink-0 shadow-xl shadow-primary/20 border-4 border-canvas">
                  {profile.name?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold">{profile.name}</h1>
                    {profile.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Shield className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4 max-w-2xl">{profile.bio || "No bio yet"}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {profile.location && (
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profile.location}</span>
                    )}
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Joined {profile.joinedAt?.split("T")[0] || "Recently"}</span>
                    {profile.hourlyRate > 0 && (
                      <span className="font-semibold text-foreground">${profile.hourlyRate}/hr</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link href={`/messages?user=${profile.id}`}>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" /> Message
                    </Button>
                  </Link>
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Globe className="w-4 h-4 mr-1" /> Website
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                {[
                  { value: profile.rating?.toFixed(1) || "New", label: "Rating", color: "text-amber-500" },
                  { value: profile.reviewsCount || 0, label: "Reviews" },
                  { value: gigs.length, label: "Active Gigs" },
                  { value: profile.isVerified ? "Verified" : "—", label: "Status" },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-surface-soft border border-hairline-soft">
                    <div className={`text-2xl font-bold ${stat.color || ""}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              {profile.skills?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Skills & AI Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((s: string) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gigs */}
          {gigs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Active Gigs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gigs.map((gig: any) => (
                  <Link key={gig.id} href={`/gig/${gig.id}`}>
                    <motion.div whileHover={{ y: -6 }} className="rounded-2xl overflow-hidden cursor-pointer group h-full border border-hairline bg-canvas hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                        <p className="text-lg font-bold opacity-80 px-4 text-center relative">{gig.title}</p>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">{gig.title}</h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-current" /> {gig.rating?.toFixed(1) || "New"}
                          </span>
                          <span className="font-bold">From ${gig.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
