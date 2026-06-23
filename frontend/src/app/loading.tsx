"use client";

import { Loading } from "@/components/ui/loading";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas gap-4">
      <div className="text-xl font-bold text-ink">NovaField</div>
      <Loading variant="spinner" size="md" />
    </div>
  );
}
