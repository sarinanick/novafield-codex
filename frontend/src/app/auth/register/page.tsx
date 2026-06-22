"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Sparkles, Eye, EyeOff, Briefcase, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("client");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(email, password, name, role);
      router.push(role === "freelancer" ? "/create-gig" : "/marketplace");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center lg:grid-cols-[1fr_0.95fr]">
        <div className="section-block block-cream mb-6 lg:mb-0">
          <div className="mono-eyebrow text-black/70">Create account</div>
          <h1 className="mt-4 text-5xl font-light tracking-[-0.05em] sm:text-6xl">Start from a more composed surface.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-black/75">
            The signup page now matches the rest of the system instead of feeling like a separate app.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sheet p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-2xl font-medium">Create your account</h2>
            <p className="mt-1 text-sm text-black/55">Join the AI freelancer marketplace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <div className="grid grid-cols-2 gap-3 rounded-3xl border border-black/10 bg-white p-1">
              <button type="button" onClick={() => setRole("client")} className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-all ${role === "client" ? "bg-black text-white" : "text-black/55 hover:bg-black/5"}`}>
                <Briefcase className="h-4 w-4" /> Hire talent
              </button>
              <button type="button" onClick={() => setRole("freelancer")} className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-all ${role === "freelancer" ? "bg-black text-white" : "text-black/55 hover:bg-black/5"}`}>
                <Code className="h-4 w-4" /> Work as freelancer
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <Input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="pl-11" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-11" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <Input type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-11 pr-11" required minLength={6} />
                <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-black/55">
            Already have an account? <Link href="/auth/login" className="font-medium text-black underline">Sign in</Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
