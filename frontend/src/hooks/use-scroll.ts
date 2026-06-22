"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollPosition {
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right" | null;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
  });

  useEffect(() => {
    let lastX = window.scrollX;
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentX = window.scrollX;
      const currentY = window.scrollY;

      let direction: ScrollPosition["direction"] = null;
      if (currentY > lastY) direction = "down";
      else if (currentY < lastY) direction = "up";
      else if (currentX > lastX) direction = "right";
      else if (currentX < lastX) direction = "left";

      setScrollPosition({ x: currentX, y: currentY, direction });
      lastX = currentX;
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
}

export function useScrollToTop() {
  const scrollToTop = useCallback((smooth = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  return scrollToTop;
}

export function useScrollToElement(ref: React.RefObject<HTMLElement>, smooth = true) {
  const scrollToElement = useCallback(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: smooth ? "smooth" : "instant",
        block: "start",
      });
    }
  }, [ref, smooth]);

  return scrollToElement;
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

export function useIsScrolled(threshold = 20): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
