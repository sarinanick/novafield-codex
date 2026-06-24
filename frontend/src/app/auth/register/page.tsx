"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, Briefcase, Code, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const param = searchParams.get("role");
    if (param === "freelancer" || param === "client") {
      setRole(param);
    }
  }, [searchParams]);

  const passwordValid = password.length >= 6;
  const passwordStrong = password.length >= 8;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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
          <h2 className="text-2xl font-bold text-ink mb-4">Join the AI services marketplace</h2>
          <p className="text-muted-foreground leading-relaxed">
            Hire experts or sell AI-powered services in one focused workspace.
          </p>
          <div className="mt-8 space-y-4 text-left">
            {[
              "Browse AI services by category",
              "Compare price, rating, and delivery time",
              "Publish your own AI gigs",
              "Manage orders and conversations",
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
        <div className="w-full max-w-md">
          {/* Mobile trust strip */}
          <div className="lg:hidden flex flex-wrap gap-4 justify-center mb-8 text-caption text-muted-foreground">
            <span>For clients and AI freelancers</span>
            <span className="hidden sm:inline">·</span>
            <span>No credit card required</span>
            <span className="hidden sm:inline">·</span>
            <span>Start in under a minute</span>
          </div>

          <div className="mb-8">
            <Link href="/" className="text-xl font-bold text-ink">NovaField</Link>
          </div>

          <h1 className="text-3xl font-bold text-ink mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Join the AI freelancer marketplace</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              >
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-body-sm font-medium text-ink">I want to</label>
              <div
                className="grid grid-cols-2 gap-3"
                role="radiogroup"
                aria-label="Select your role"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={role === "client"}
                  onClick={() => setRole("client")}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                    role === "client"
                      ? "border-primary bg-primary/5"
                      : "border-hairline bg-surface-soft hover:border-hairline/80"
                  }`}
                >
                  {role === "client" && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <Briefcase className="w-6 h-6 text-ink" />
                  <div>
                    <p className="text-body-sm font-semibold text-ink">Hire AI talent</p>
                    <p className="text-caption text-muted-foreground mt-1">
                      Find freelancers for AI videos, images, chatbots, automations, and creative work.
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={role === "freelancer"}
                  onClick={() => setRole("freelancer")}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                    role === "freelancer"
                      ? "border-primary bg-primary/5"
                      : "border-hairline bg-surface-soft hover:border-hairline/80"
                  }`}
                >
                  {role === "freelancer" && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <Code className="w-6 h-6 text-ink" />
                  <div>
                    <p className="text-body-sm font-semibold text-ink">Sell AI services</p>
                    <p className="text-caption text-muted-foreground mt-1">
                      Publish AI gigs, get discovered, and receive client orders.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Role-specific note */}
            <p className="text-caption text-muted-foreground text-center px-4">
              {role === "client"
                ? "After signup, you'll browse services and compare freelancers."
                : "After signup, you'll create your first AI service."}
            </p>

            <div className="space-y-2">
              <label htmlFor="name" className="text-body-sm font-medium text-ink">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-body-sm font-medium text-ink">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-body-sm font-medium text-ink">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                  autoComplete="new-password"
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
              {password.length > 0 && (
                <div className="flex gap-2 text-caption">
                  <span className={passwordValid ? "text-semantic-success" : "text-muted-foreground"}>
                    {passwordValid ? "✓" : "○"} 6+ required
                  </span>
                  <span className={passwordStrong ? "text-semantic-success" : "text-muted-foreground"}>
                    {passwordStrong ? "✓" : "○"} 8+ recommended
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-body-sm font-medium text-ink">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirmPass ? "Hide password" : "Show password"}
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <p className={`text-caption ${passwordsMatch ? "text-semantic-success" : "text-destructive"}`}>
                  {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Creating account..." : role === "client" ? "Create account and browse services" : "Create account and publish service"}
              {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed">
            By creating an account, you agree to NovaField&apos;s terms when they become available.
          </p>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
