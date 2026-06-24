import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface OrderCardProps {
  title: string;
  status: "جدید" | "در حال انجام" | "منتظر بررسی" | "تکمیل‌شده" | "لغوشده";
  price: string;
  deadline: string;
  counterparty: string;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "success" | "warning" | "info" }> = {
  "جدید": { variant: "info" },
  "در حال انجام": { variant: "warning" },
  "منتظر بررسی": { variant: "secondary" },
  "تکمیل‌شده": { variant: "success" },
  "لغوشده": { variant: "destructive" },
};

export function OrderCard({ title, status, price, deadline, counterparty, onAction, actionLabel, className }: OrderCardProps) {
  return (
    <div className={cn("bg-surface-soft border border-hairline rounded-xl p-5", className)}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-body-sm font-semibold text-ink leading-snug">{title}</h3>
        <Badge variant={statusConfig[status]?.variant || "secondary"}>{status}</Badge>
      </div>
      <div className="space-y-1.5 mb-4">
        <p className="text-caption text-muted-foreground">مبلغ: <span className="text-ink font-medium">{price}</span></p>
        <p className="text-caption text-muted-foreground">مهلت: <span className="text-ink font-medium">{deadline}</span></p>
        <p className="text-caption text-muted-foreground">طرف مقابل: <span className="text-ink font-medium">{counterparty}</span></p>
      </div>
      {onAction && actionLabel && (
        <Button variant="secondary" size="sm" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
