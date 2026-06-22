"use client";

import { Loading } from "@/components/ui/loading";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <Loading variant="spinner" size="lg" text="Loading NovaField..." />
    </div>
  );
}
