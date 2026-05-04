"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const stopFrame = () => {
      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };

    const raf = (time: number) => {
      if (!activeRef.current || !lenisRef.current) {
        frameIdRef.current = null;
        return;
      }

      lenisRef.current.raf(time);
      frameIdRef.current = window.requestAnimationFrame(raf);
    };

    const startFrame = () => {
      if (frameIdRef.current !== null || !activeRef.current || !lenisRef.current) return;
      frameIdRef.current = window.requestAnimationFrame(raf);
    };

    const stopLenis = () => {
      stopFrame();
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const startLenis = () => {
      if (lenisRef.current) return;

      lenisRef.current = new Lenis({
        duration: 1.5, // Slower, more cinematic scroll
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium smooth ease out
        smoothWheel: true,
        syncTouch: true, // Enable touch smoothing
        touchMultiplier: 1.5,
        wheelMultiplier: 0.8,
      });

      activeRef.current = !document.hidden;
      startFrame();
    };

    const shouldSkipLenis = () => reduceMotionQuery.matches;

    const syncLenis = () => {
      if (shouldSkipLenis()) {
        stopLenis();
        return;
      }

      startLenis();
    };

    const handleVisibility = () => {
      activeRef.current = !document.hidden;

      if (!activeRef.current) {
        stopFrame();
        return;
      }

      startFrame();
    };

    syncLenis();
    document.addEventListener("visibilitychange", handleVisibility);
    reduceMotionQuery.addEventListener("change", syncLenis);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      reduceMotionQuery.removeEventListener("change", syncLenis);
      activeRef.current = false;
      stopLenis();
    };
  }, []);

  return <>{children}</>;
}
