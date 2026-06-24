"use client";

import { cn } from "@/lib/utils";

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

function Progress({ value = 0, max = 100, label, showPercentage = false, className, size = "md" }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const heightClass = size === "sm" ? "h-1.5" : size === "lg" ? "h-4" : "h-2.5";

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-body-sm font-medium text-ink">{label}</span>}
          {showPercentage && <span className="text-caption text-muted-foreground">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn("w-full overflow-hidden rounded-full bg-hairline", heightClass)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label || `${Math.round(percentage)}%`}>
        <div
          className={cn("h-full rounded-full bg-ink transition-all duration-300", heightClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export { Progress };
