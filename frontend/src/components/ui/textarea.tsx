"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, errorMessage, helperText, label, id, maxLength, value, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const currentLength = typeof value === "string" ? value.length : 0;
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-body-sm font-medium text-ink block">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border bg-surface-soft px-3 py-2.5 text-body-sm text-ink placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150 resize-y",
            error ? "border-destructive focus-visible:ring-destructive" : "border-hairline",
            className
          )}
          ref={ref}
          aria-invalid={error || undefined}
          aria-describedby={errorMessage ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        <div className="flex items-center justify-between">
          {errorMessage && (
            <p id={`${textareaId}-error`} className="text-caption text-destructive" role="alert">
              {errorMessage}
            </p>
          )}
          {helperText && !errorMessage && (
            <p id={`${textareaId}-helper`} className="text-caption text-muted-foreground">
              {helperText}
            </p>
          )}
          {maxLength && (
            <span className="text-caption text-muted-foreground ms-auto">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
