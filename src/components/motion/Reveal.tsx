"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import {
  fadeUp,
  fadeBlur,
  clipUp,
  curtainLeft,
  scaleIn,
  viewportOnce,
} from "@/lib/motion";

type Preset = "fadeUp" | "fadeBlur" | "clipUp" | "curtainLeft" | "scaleIn";

const MAP: Record<Preset, Variants> = {
  fadeUp,
  fadeBlur,
  clipUp,
  curtainLeft,
  scaleIn,
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  preset?: Preset;
  delay?: number;
  as?: "div" | "span" | "section" | "article" | "li";
  margin?: string;
  once?: boolean;
  /** Add to an existing stagger group (skip viewport trigger). */
  inStagger?: boolean;
}

/**
 * Reveal — the workhorse. Wraps children in a motion.div with a
 * named preset. Defaults to once-per-page trigger. Fully respects
 * prefers-reduced-motion.
 */
const Reveal = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  {
    children,
    className,
    preset = "fadeUp",
    delay = 0,
    as = "div",
    margin,
    once = true,
    inStagger = false,
  },
  ref,
) {
  const reduce = useReducedMotion();
  const baseVariants = MAP[preset];
  const variants: Variants =
    delay > 0
      ? {
          hidden: baseVariants.hidden,
          visible: {
            ...(baseVariants.visible ?? {}),
            transition: {
              ...(
                ((baseVariants.visible as { transition?: Record<string, unknown> } | undefined)
                  ?.transition ?? {}) as Record<string, unknown>
              ),
              delay,
            },
          },
        }
      : baseVariants;

  const MotionEl = motion[as] as typeof motion.div;

  if (reduce) {
    return (
      <MotionEl ref={ref} className={className}>
        {children}
      </MotionEl>
    );
  }

  if (inStagger) {
    return (
      <MotionEl ref={ref} className={className} variants={variants}>
        {children}
      </MotionEl>
    );
  }

  return (
    <MotionEl
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, once, ...(margin ? { margin } : {}) }}
      variants={variants}
    >
      {children}
    </MotionEl>
  );
});

export default Reveal;
