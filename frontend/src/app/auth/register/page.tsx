"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Briefcase, Code, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen flex">
      {/* Left side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-surface-soft border-r border-hairline">
        <div className="max-w-md p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20">
            <span className="text-3xl font-bold text-white">N</span>
          </div>
          <h2 className="text-2xl font-bold text-ink mb-4">Start Creating Today</h2>
          <p className="text-muted-foreground leading-relaxed">
            Whether you&apos;re looking to hire AI talent or offer your skills, NovaField connects you with the best in the industry.
          </p>
          <div className="mt-8 space-y-4 text-left">
            {[
              "Access 30+ cutting-edge AI models",
              "Connect with verified AI freelancers",
              "Secure payments with escrow protection",
              "Build and grow your creative business",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <Link href="/" className="text-xl font-bold text-ink">NovaField</Link>
          </div>

          <h1 className="text-3xl font-bold text-ink mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Join the AI freelancer marketplace</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-surface-soft rounded-xl border border-hairline-soft">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                  role === "client"
                    ? "bg-canvas text-ink shadow-sm border border-hairline"
                    : "text-muted-foreground hover:text-ink"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Hire Talent
              </button>
              <button
                type="button"
                onClick={() => setRole("freelancer")}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                  role === "freelancer"
                    ? "bg-canvas text-ink shadow-sm border border-hairline"
                    : "text-muted-foreground hover:text-ink"
                }`}
              >
                <Code className="w-4 h-4" />
                Sell Services
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-body-sm font-medium text-ink">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-body-sm font-medium text-ink">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-body-sm font-medium text-ink">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
