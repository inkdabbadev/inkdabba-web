"use client";

import React, { useEffect, useId, useRef } from "react";
import {
  motion,
  MotionValue,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GridPattern = ({
  offsetX,
  offsetY,
  patternId,
  size,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
  patternId: string;
  size: number;
}) => {
  return (
    <svg className="h-full w-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

type InfiniteGridBackgroundProps = {
  className?: string;
  gridSize?: number;
};

export default function InfiniteGridBackground({
  className,
  gridSize = 42,
}: InfiniteGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const activityTimeoutRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const patternId = `infinite-grid-${useId().replace(/:/g, "")}`;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const highlightOpacity = useMotionValue(0);
  const highlightOpacitySpring = useSpring(highlightOpacity, {
    stiffness: 140,
    damping: 26,
    mass: 0.45,
  });

  useEffect(() => {
    const updateBounds = () => {
      boundsRef.current = containerRef.current?.getBoundingClientRect() ?? null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = boundsRef.current;
      if (!rect) {
        return;
      }

      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
      highlightOpacity.set(1);

      if (activityTimeoutRef.current) {
        window.clearTimeout(activityTimeoutRef.current);
      }

      activityTimeoutRef.current = window.setTimeout(() => {
        highlightOpacity.set(0);
      }, 700);
    };

    updateBounds();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", updateBounds, { passive: true });
    window.addEventListener("scroll", updateBounds, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);

      if (activityTimeoutRef.current) {
        window.clearTimeout(activityTimeoutRef.current);
      }
    };
  }, [highlightOpacity, mouseX, mouseY]);

  useAnimationFrame(() => {
    if (reduceMotion) {
      return;
    }

    gridOffsetX.set((gridOffsetX.get() + 0.28) % gridSize);
    gridOffsetY.set((gridOffsetY.get() + 0.28) % gridSize);
  });

  const maskImage = useMotionTemplate`radial-gradient(130px circle at ${mouseX}px ${mouseY}px, black 0%, black 28%, transparent 72%)`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden will-change-transform transform-gpu",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 text-warm-white opacity-[0.1]">
        <GridPattern
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          patternId={`${patternId}-base`}
          size={gridSize}
        />
      </div>

      <motion.div
        className="absolute inset-0 text-warm-white opacity-60 drop-shadow-[0_0_16px_rgba(255,244,230,0.65)]"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          opacity: highlightOpacitySpring,
        }}
      >
        <GridPattern
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          patternId={`${patternId}-highlight`}
          size={gridSize}
        />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-black via-ink-black/70 to-transparent" />
    </div>
  );
}
