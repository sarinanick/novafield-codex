"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  id?: string;
  className?: string;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled, label, description, id, className }, ref) => {
    const switchId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex items-start gap-3">
        <button
          id={switchId}
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          onClick={() => onCheckedChange?.(!checked)}
          className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            checked ? "bg-ink" : "bg-hairline",
            className
          )}
        >
          <span
            className={cn(
              "pointer-events-none block h-5 w-5 rounded-full bg-surface-soft shadow-lg transition-transform duration-200",
              checked ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"
            )}
          />
        </button>
        <div className="space-y-0.5">
          {label && (
            <label htmlFor={switchId} className="text-body-sm font-medium text-ink leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          )}
          {description && (
            <p className="text-caption text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
