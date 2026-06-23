"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

const benefits = [
  "Access 30+ cutting-edge AI models",
  "Connect with verified AI freelancers",
  "Secure payments with escrow protection",
  "Collaborate in virtual workspaces",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const hasError = error.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex">
      {/* Left side - Form */}
      <section className="flex-1 flex items-center justify-center p-6 sm:p-8" aria-labelledby="login-heading">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="inline-block text-xl font-bold text-ink mb-10" aria-label="NovaField home">
            NovaField
          </Link>

          <h1 id="login-heading" className="text-3xl font-bold text-ink mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-body-sm font-medium text-ink">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={hasError && !email ? "true" : "false"}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-body-sm font-medium text-ink">
                  Password
                </label>
                <Link href="#" className="text-body-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  autoComplete="current-password"
                  aria-required="true"
                  aria-invalid={hasError && !password ? "true" : "false"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={showPass ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {showPass ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
              aria-busy={loading}
              aria-label={loading ? "Signing in, please wait" : "Sign in to your account"}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded">
              Create one free
            </Link>
          </p>
        </motion.div>
      </section>

      {/* Right side - Visual */}
      <aside
        className="hidden lg:flex flex-1 items-center justify-center bg-surface-soft border-l border-hairline"
        aria-hidden="true"
      >
        <div className="max-w-md p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20">
            <span className="text-3xl font-bold text-white">N</span>
          </div>
          <h2 className="text-2xl font-bold text-ink mb-4">
            Access your AI workspace
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Join 500,000+ creators using NovaField to generate cinematic AI videos and collaborate in virtual spaces.
          </p>
          <ul className="space-y-3 text-left max-w-xs mx-auto">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3 mt-10">
            {[
              { value: "4.5M+", label: "Videos Created" },
              { value: "30+", label: "AI Models" },
              { value: "500K+", label: "Creators" },
              { value: "50M+", label: "Images Generated" },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl bg-canvas border border-hairline-soft">
                <p className="text-lg font-bold text-ink">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
