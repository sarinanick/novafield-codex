"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, errorMessage, helperText, label, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-body-sm font-medium text-ink block">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              "flex h-11 w-full rounded-lg border bg-surface-soft px-3 py-2 text-body-sm text-ink placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150",
              leftIcon && "ps-10",
              rightIcon && "pe-10",
              error ? "border-destructive focus-visible:ring-destructive" : "border-hairline",
              className
            )}
            ref={ref}
            aria-invalid={error || undefined}
            aria-describedby={errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <span className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
        {errorMessage && (
          <p id={`${inputId}-error`} className="text-caption text-destructive" role="alert">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p id={`${inputId}-helper`} className="text-caption text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
