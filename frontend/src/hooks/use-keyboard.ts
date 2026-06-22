"use client";

import { useEffect, useCallback } from "react";

type KeyHandler = (event: KeyboardEvent) => void;

interface UseKeyboardOptions {
  target?: "document" | "window";
  capture?: boolean;
}

export function useKeyboard(
  key: string,
  handler: KeyHandler,
  options: UseKeyboardOptions = {}
) {
  const { target = "document", capture = false } = options;

  useEffect(() => {
    const targetElement = target === "document" ? document : window;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event);
      }
    };

    targetElement.addEventListener("keydown", handleKeyDown, { capture });

    return () => {
      targetElement.removeEventListener("keydown", handleKeyDown, { capture });
    };
  }, [key, handler, target, capture]);
}

export function useEscapeKey(handler: KeyHandler, options?: UseKeyboardOptions) {
  useKeyboard("Escape", handler, options);
}

export function useEnterKey(handler: KeyHandler, options?: UseKeyboardOptions) {
  useKeyboard("Enter", handler, options);
}

export function useArrowKeys(
  handlers: {
    up?: KeyHandler;
    down?: KeyHandler;
    left?: KeyHandler;
    right?: KeyHandler;
  },
  options?: UseKeyboardOptions
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          handlers.up?.(event);
          break;
        case "ArrowDown":
          handlers.down?.(event);
          break;
        case "ArrowLeft":
          handlers.left?.(event);
          break;
        case "ArrowRight":
          handlers.right?.(event);
          break;
      }
    };

    const targetElement = options?.target === "window" ? window : document;
    targetElement.addEventListener("keydown", handleKeyDown, {
      capture: options?.capture,
    });

    return () => {
      targetElement.removeEventListener("keydown", handleKeyDown, {
        capture: options?.capture,
      });
    };
  }, [handlers, options]);
}

export function useFocusTrap(ref: React.RefObject<HTMLElement>, enabled = true) {
  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    firstElement.focus();

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, enabled]);
}
