"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          aria-invalid={error}
          aria-describedby={errorMessage ? `${props.id}-error` : undefined}
          {...props}
        />
        {errorMessage && (
          <p
            id={`${props.id}-error`}
            className="mt-1 text-sm text-destructive"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
