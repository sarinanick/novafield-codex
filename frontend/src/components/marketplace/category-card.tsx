import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

export interface CategoryCardProps {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  description: string;
  serviceCount?: number;
  href?: string;
  className?: string;
}

export function CategoryCard({ icon: Icon, title, description, serviceCount, href = "/marketplace", className }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block bg-surface-soft border border-hairline rounded-xl p-5 hover:shadow-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label={title}
    >
      <div className="w-11 h-11 bg-canvas border border-hairline rounded-lg flex items-center justify-center mb-3 group-hover:border-ink/20 transition-colors">
        <Icon className="w-5 h-5 text-ink" aria-hidden={true} />
      </div>
      <h3 className="text-body-sm font-semibold text-ink mb-1">{title}</h3>
      <p className="text-caption text-muted-foreground leading-relaxed">{description}</p>
      {serviceCount !== undefined && (
        <p className="text-caption text-muted-foreground mt-2">{serviceCount} خدمت</p>
      )}
    </Link>
  );
}
