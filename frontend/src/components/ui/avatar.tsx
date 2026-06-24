"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-soft text-ink font-medium",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  initials?: string;
  src?: string;
  alt?: string;
  status?: "online" | "offline" | "busy";
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, initials, src, alt, status, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
        {src ? (
          <img src={src} alt={alt || ""} className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
        {status && (
          <span
            className={cn(
              "absolute bottom-0 end-0 block rounded-full ring-2 ring-surface-soft",
              status === "online" && "bg-semantic-success",
              status === "offline" && "bg-muted-foreground",
              status === "busy" && "bg-destructive",
              size === "sm" && "h-2 w-2",
              size === "md" && "h-2.5 w-2.5",
              size === "lg" && "h-3 w-3",
              size === "xl" && "h-3.5 w-3.5"
            )}
            aria-label={status === "online" ? "آنلاین" : status === "busy" ? "مشغول" : "آفلاین"}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
