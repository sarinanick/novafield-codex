"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const radioId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex items-start gap-3">
        <input
          type="radio"
          id={radioId}
          ref={ref}
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 rounded-full border-hairline bg-surface-soft text-ink",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <div className="space-y-0.5">
          {label && (
            <label htmlFor={radioId} className="text-body-sm font-medium text-ink leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
Radio.displayName = "Radio";

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string; disabled?: boolean }>;
  error?: string;
  className?: string;
}

function RadioGroup({ name, value, onChange, options, error, className }: RadioGroupProps) {
  return (
    <div role="radiogroup" aria-invalid={!!error || undefined} className={cn("space-y-3", className)}>
      {options.map(opt => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          checked={value === opt.value}
          onChange={() => onChange?.(opt.value)}
          label={opt.label}
          description={opt.description}
          disabled={opt.disabled}
        />
      ))}
      {error && (
        <p className="text-caption text-destructive" role="alert">{error}</p>
      )}
    </div>
  );
}

export { Radio, RadioGroup };
