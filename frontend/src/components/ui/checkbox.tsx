"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 rounded border-hairline bg-surface-soft text-ink",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className
          )}
          aria-describedby={description ? `${checkboxId}-desc` : error ? `${checkboxId}-error` : undefined}
          {...props}
        />
        <div className="space-y-0.5">
          {label && (
            <label htmlFor={checkboxId} className="text-body-sm font-medium text-ink leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          )}
          {description && (
            <p id={`${checkboxId}-desc`} className="text-caption text-muted-foreground">
              {description}
            </p>
          )}
          {error && (
            <p id={`${checkboxId}-error`} className="text-caption text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
