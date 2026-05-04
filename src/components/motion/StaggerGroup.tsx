"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { group, stagger as staggerTokens, viewportOnce } from "@/lib/motion";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: keyof typeof staggerTokens | number;
  delay?: number;
  as?: "div" | "ul" | "section" | "article" | "span";
  margin?: string;
  once?: boolean;
}

/**
 * StaggerGroup — declares a motion context that cascades reveal
 * timing down to every <Reveal inStagger /> or motion child using
 * the same variant keys (hidden/visible).
 */
export default function StaggerGroup({
  children,
  className,
  stagger = "base",
  delay = 0,
  as = "div",
  margin,
  once = true,
}: StaggerGroupProps) {
  const reduce = useReducedMotion();
  const step = typeof stagger === "number" ? stagger : staggerTokens[stagger];
  const MotionEl = motion[as] as typeof motion.div;

  if (reduce) {
    return <MotionEl className={className}>{children}</MotionEl>;
  }

  return (
    <MotionEl
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, once, ...(margin ? { margin } : {}) }}
      variants={group(step, delay)}
    >
      {children}
    </MotionEl>
  );
}
