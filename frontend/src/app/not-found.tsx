"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="text-center max-w-md px-4">
        <div className="text-8xl font-bold text-hairline mb-4">404</div>
        <h1 className="text-2xl font-bold text-ink mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild variant="secondary">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
