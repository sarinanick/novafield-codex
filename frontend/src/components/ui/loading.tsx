"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "bar" | "pulse";
  text?: string;
}

export function Loading({
  className,
  size = "md",
  variant = "spinner",
  text,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  if (variant === "spinner") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
        <svg
          className={cn("animate-spin text-primary", sizeClasses[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-primary animate-bounce",
              size === "sm" && "h-1.5 w-1.5",
              size === "md" && "h-2 w-2",
              size === "lg" && "h-3 w-3"
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
        {text && <p className="ml-2 text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }

  if (variant === "bar") {
    return (
      <div className={cn("w-full", className)}>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-soft">
          <div className="h-full bg-primary animate-[bar_1.5s_ease-in-out_infinite]" />
        </div>
        {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
        <div
          className={cn(
            "rounded-full bg-primary animate-pulse",
            sizeClasses[size]
          )}
        />
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }

  return null;
}

export function LoadingOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50",
        className
      )}
    >
      <Loading variant="spinner" size="lg" />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loading variant="spinner" size="lg" text="Loading..." />
    </div>
  );
}
