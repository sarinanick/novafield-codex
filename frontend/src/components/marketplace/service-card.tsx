import Link from "next/link";
import { Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ServiceCardProps {
  title: string;
  category: string;
  sellerName: string;
  sellerInitials: string;
  sellerGradient?: string;
  rating: number;
  reviews: number;
  price: number;
  deliveryDays: number;
  tools: string[];
  href?: string;
}

export function ServiceCard({
  title,
  category,
  sellerName,
  sellerInitials,
  sellerGradient = "from-ink to-ink/80",
  rating,
  reviews,
  price,
  deliveryDays,
  tools,
  href = "/marketplace",
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-surface-soft border border-hairline rounded-xl p-5 hover:shadow-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${title} - ${sellerName}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${sellerGradient} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
          {sellerInitials}
        </div>
        <div className="min-w-0">
          <p className="text-body-sm font-medium text-ink truncate">{sellerName}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-semantic-warning text-semantic-warning shrink-0" aria-hidden="true" />
            <span className="text-caption text-muted-foreground">{rating} ({reviews})</span>
          </div>
        </div>
      </div>
      <h3 className="text-body-sm font-semibold text-ink mb-1 leading-snug">{title}</h3>
      <p className="text-caption text-muted-foreground mb-3">{category}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tools.map(tool => (
          <Badge key={tool} variant="tool" className="text-[10px]">{tool}</Badge>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-hairline-soft">
        <span className="text-body-sm font-semibold text-ink">از {price.toLocaleString("fa-IR")} دلار</span>
        <span className="flex items-center gap-1 text-caption text-muted-foreground">
          <Clock className="w-3 h-3" aria-hidden="true" />
          {deliveryDays} روزه
        </span>
      </div>
    </Link>
  );
}
