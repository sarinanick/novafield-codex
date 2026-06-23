"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

const benefits = [
  "Access 30+ cutting-edge AI models",
  "Connect with verified AI freelancers",
  "Manage orders, messages, and meetings in one workspace",
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
  const emailHelpId = "login-email-help";
  const passwordHelpId = "login-password-help";
  const errorId = "login-error";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      await login(email.trim(), password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Could not sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-canvas lg:grid lg:grid-cols-2">
      <section
        className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-8 lg:px-12"
        aria-labelledby="login-heading"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            href="/"
            className="mb-10 inline-block rounded text-xl font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="NovaField home"
          >
            NovaField
          </Link>

          <div className="rounded-3xl border border-hairline bg-canvas p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <p className="mb-3 text-caption font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Sign in
              </p>
              <h1 id="login-heading" className="text-3xl font-bold tracking-tight text-ink">
                Welcome back
              </h1>
              <p className="mt-2 text-muted-foreground">
                Access your NovaField dashboard, orders, messages, and creative workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-busy={loading}>
              {hasError && (
                <motion.div
                  id={errorId}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <p>{error}</p>
                </motion.div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-body-sm font-medium text-ink">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="pl-10"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={hasError && !email.trim() ? "true" : "false"}
                    aria-describedby={`${emailHelpId}${hasError ? ` ${errorId}` : ""}`}
                    required
                  />
                </div>
                <p id={emailHelpId} className="text-xs text-muted-foreground">
                  Use the email address connected to your NovaField account.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="password" className="text-body-sm font-medium text-ink">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="rounded text-body-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="pl-10 pr-11"
                    autoComplete="current-password"
                    aria-required="true"
                    aria-invalid={hasError && !password ? "true" : "false"}
                    aria-describedby={`${passwordHelpId}${hasError ? ` ${errorId}` : ""}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((visible) => !visible)}
                    className="absolute right-2 top-1/2 rounded p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={showPass ? "Hide password" : "Show password"}
                    aria-controls="password"
                    aria-pressed={showPass}
                  >
                    {showPass ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <p id={passwordHelpId} className="text-xs text-muted-foreground">
                  Enter your account password.
                </p>
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
                    <span
                      className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      aria-hidden="true"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="rounded font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Create one free
              </Link>
            </p>
          </div>
        </motion.div>
      </section>

      <aside
        className="hidden min-h-screen items-center justify-center border-l border-hairline bg-surface-soft px-12 lg:flex"
        aria-labelledby="login-benefits-heading"
      >
        <div className="max-w-md">
          <div
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-blue-600 shadow-xl shadow-primary/20"
            aria-hidden="true"
          >
            <span className="text-3xl font-bold text-white">N</span>
          </div>

          <h2 id="login-benefits-heading" className="mb-4 text-3xl font-bold tracking-tight text-ink">
            Access your AI workspace
          </h2>

          <p className="mb-8 text-muted-foreground leading-relaxed">
            Sign in to continue managing projects, AI services, conversations, and virtual collaboration spaces.
          </p>

          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
