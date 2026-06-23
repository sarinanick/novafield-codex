"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">!</span>
        </div>
        <h1 className="text-2xl font-bold text-ink mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-2">
          An unexpected error occurred. Please try again.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground mb-6 font-mono">
            Error: {error.digest}
          </p>
        )}
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}
