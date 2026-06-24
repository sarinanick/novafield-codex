"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-caption font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-ink text-surface-soft",
        secondary: "border-transparent bg-surface-soft text-ink",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-hairline text-ink",
        accent: "border-transparent bg-accent-orange/10 text-accent-orange",
        success: "border-transparent bg-semantic-success/10 text-semantic-success",
        warning: "border-transparent bg-semantic-warning/10 text-semantic-warning",
        info: "border-transparent bg-semantic-info/10 text-semantic-info",
        tool: "border-hairline bg-canvas text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
