"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash2, ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/toast";

export default function CreateGigPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    title: "", description: "", category: "", subcategory: "",
    tags: [""], aiTools: [""], priceType: "fixed",
    deliveryDays: 7, revisions: 3, images: [], videoUrl: "",
  });

  const [packages, setPackages] = useState([
    { name: "Basic", description: "Simple delivery", price: 25, deliveryDays: 3, revisions: 1, features: ["High-res delivery", "Source file"] },
    { name: "Standard", description: "Professional delivery", price: 75, deliveryDays: 5, revisions: 2, features: ["High-res delivery", "Source file", "Commercial license", "Priority support"] },
    { name: "Premium", description: "Full service", price: 200, deliveryDays: 7, revisions: 5, features: ["High-res delivery", "Source file", "Commercial license", "Priority support", "Custom revisions", "Rush delivery"] },
  ]);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "freelancer")) { router.push("/auth/login"); return; }
    api.getCategories().then(setCategories).catch(() => {});
  }, [user, authLoading]);

  const updateForm = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));
  const addTag = () => setForm(prev => ({ ...prev, tags: [...prev.tags, ""] }));
  const removeTag = (i: number) => setForm(prev => ({ ...prev, tags: prev.tags.filter((_, idx) => idx !== i) }));
  const updateTag = (i: number, v: string) => setForm(prev => ({ ...prev, tags: prev.tags.map((t, idx) => idx === i ? v : t) }));
  const addTool = () => setForm(prev => ({ ...prev, aiTools: [...prev.aiTools, ""] }));
  const removeTool = (i: number) => setForm(prev => ({ ...prev, aiTools: prev.aiTools.filter((_, idx) => idx !== i) }));
  const updateTool = (i: number, v: string) => setForm(prev => ({ ...prev, aiTools: prev.aiTools.map((t, idx) => idx === i ? v : t) }));
  const updatePackage = (i: number, field: string, value: any) => setPackages(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  const addFeature = (pkgIdx: number) => setPackages(prev => prev.map((p, idx) => idx === pkgIdx ? { ...p, features: [...p.features, ""] } : p));
  const updateFeature = (pkgIdx: number, featIdx: number, value: string) => setPackages(prev => prev.map((p, idx) => idx === pkgIdx ? { ...p, features: p.features.map((f, fi) => fi === featIdx ? value : f) } : p));
  const removeFeature = (pkgIdx: number, featIdx: number) => setPackages(prev => prev.map((p, idx) => idx === pkgIdx ? { ...p, features: p.features.filter((_, fi) => fi !== featIdx) } : p));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.filter(t => t),
        aiTools: form.aiTools.filter(t => t),
        packages: packages.map(p => ({ ...p, features: p.features.filter(f => f) })),
      };
      const res = await api.createGig(payload);
      router.push(`/gig/${res.id}`);
    } catch (err: any) { addToast("error", "Publish Failed", err.message); }
    setLoading(false);
  };

  if (authLoading) return <div className="min-h-screen pt-20 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  const steps = [
    { number: 1, label: "Gig Details" },
    { number: 2, label: "Pricing" },
    { number: 3, label: "Review" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => router.back()} className="p-2 hover:bg-surface-soft rounded-lg transition-colors" aria-label="Go back">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Create a Gig</h1>
              <p className="text-muted-foreground">Step {step} of 3 &mdash; {steps[step - 1].label}</p>
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex gap-2 mb-8">
            {steps.map(s => (
              <div key={s.number} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s.number <= step ? "bg-primary" : "bg-hairline"}`} />
            ))}
          </div>

          {step === 1 && (
            <Card className="border border-hairline">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Gig Details</h2>
                  <p className="text-sm text-muted-foreground">Tell buyers what you offer</p>
                </div>
                <div className="space-y-2">
                  <label className="text-body-sm font-medium text-ink">Gig Title</label>
                  <Input placeholder="I will create cinematic AI videos..." value={form.title} onChange={e => updateForm("title", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-body-sm font-medium text-ink">Description</label>
                  <textarea
                    className="w-full h-32 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Describe your service in detail. What will buyers get? What makes you unique?"
                    value={form.description}
                    onChange={e => updateForm("description", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-body-sm font-medium text-ink">Category</label>
                  <select
                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                    value={form.category}
                    onChange={e => updateForm("category", e.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map((c: any) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-body-sm font-medium text-ink">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.tags.filter(t => t).map(t => (
                      <Badge key={t} variant="secondary" className="gap-1">#{t}</Badge>
                    ))}
                  </div>
                  {form.tags.map((tag, i) => (
                    <div key={i} className="flex gap-2">
                      <Input placeholder="e.g. sora, cinematic" value={tag} onChange={e => updateTag(i, e.target.value)} />
                      {form.tags.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeTag(i)} aria-label="Remove tag"><Trash2 className="w-4 h-4" /></Button>}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addTag}><Plus className="w-3 h-3 mr-1" /> Add Tag</Button>
                </div>
                <div className="space-y-2">
                  <label className="text-body-sm font-medium text-ink">AI Tools Used</label>
                  {form.aiTools.map((tool, i) => (
                    <div key={i} className="flex gap-2">
                      <Input placeholder="e.g. Sora 2, Kling 3.0" value={tool} onChange={e => updateTool(i, e.target.value)} />
                      {form.aiTools.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeTool(i)} aria-label="Remove tool"><Trash2 className="w-4 h-4" /></Button>}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addTool}><Plus className="w-3 h-3 mr-1" /> Add Tool</Button>
                </div>
                <Button className="w-full" onClick={() => setStep(2)}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border border-hairline">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Pricing Packages</h2>
                  <p className="text-sm text-muted-foreground">Set up your pricing tiers</p>
                </div>
                <div className="grid gap-6">
                  {packages.map((pkg, i) => (
                    <div key={i} className="rounded-xl border border-hairline p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{pkg.name}</h3>
                        <span className="text-2xl font-bold">${pkg.price}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">Price ($)</label>
                          <Input type="number" value={pkg.price} onChange={e => updatePackage(i, "price", Number(e.target.value))} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">Delivery (days)</label>
                          <Input type="number" value={pkg.deliveryDays} onChange={e => updatePackage(i, "deliveryDays", Number(e.target.value))} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Description</label>
                        <Input value={pkg.description} onChange={e => updatePackage(i, "description", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Features</label>
                        {pkg.features.map((f, fi) => (
                          <div key={fi} className="flex gap-2">
                            <Input value={f} onChange={e => updateFeature(i, fi, e.target.value)} placeholder="Feature..." className="text-sm" />
                            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0" onClick={() => removeFeature(i, fi)} aria-label="Remove feature"><Trash2 className="w-3 h-3" /></Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => addFeature(i)}><Plus className="w-3 h-3 mr-1" /> Feature</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-1" onClick={() => setStep(3)}>Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border border-hairline">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Review & Publish</h2>
                  <p className="text-sm text-muted-foreground">Check everything before publishing</p>
                </div>
                <div className="rounded-xl border border-hairline p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{form.title || "Untitled Gig"}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{form.description || "No description"}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Starting at</p>
                      <p className="text-2xl font-bold">${packages[0].price}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.tags.filter(t => t).map(t => <Badge key={t} variant="secondary">#{t}</Badge>)}
                    {form.aiTools.filter(t => t).map(t => <Badge key={t}>{t}</Badge>)}
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-hairline">
                    {packages.map(p => (
                      <div key={p.name} className="text-center p-4 rounded-xl bg-surface-soft border border-hairline-soft">
                        <p className="text-xs text-muted-foreground mb-1">{p.name}</p>
                        <p className="text-xl font-bold">${p.price}</p>
                        <p className="text-xs text-muted-foreground mt-1">{p.deliveryDays}d delivery</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                  <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Publishing..." : <><Sparkles className="w-4 h-4 mr-2" /> Publish Gig</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
