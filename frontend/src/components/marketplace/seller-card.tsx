import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export interface SellerCardProps {
  name: string;
  initials: string;
  gradient?: string;
  specialty: string;
  rating: number;
  completedOrders: number;
  responseTime: string;
  href?: string;
}

export function SellerCard({ name, initials, gradient, specialty, rating, completedOrders, responseTime, href = "/marketplace" }: SellerCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-surface-soft border border-hairline rounded-lg p-5 hover:shadow-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`پروفایل ${name}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <Avatar initials={initials} size="lg" />
        <div className="min-w-0">
          <p className="text-body-sm font-semibold text-ink truncate">{name}</p>
          <p className="text-caption text-muted-foreground">{specialty}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-semantic-warning text-semantic-warning" aria-hidden="true" />
          <span className="text-caption text-ink font-medium">{rating}</span>
        </div>
        <span className="text-caption text-muted-foreground">{completedOrders} سفارش</span>
        <span className="text-caption text-muted-foreground">{responseTime}</span>
      </div>
      <Badge variant="secondary" className="text-[10px]">مشاهده پروفایل</Badge>
    </Link>
  );
}
