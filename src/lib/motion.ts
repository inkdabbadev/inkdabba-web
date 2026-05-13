/**
 * Ink Dabba — Motion System
 * ---------------------------------------------------------------
 * Single source of truth for the site's animation language.
 * Tokens (ease, duration, stagger), reusable variants, and a set
 * of primitives (Reveal, MaskedHeading, SplitLines, ParallaxLayer,
 * Magnetic, HoverMedia, SectionVeil) that every section uses so
 * the whole site breathes with one rhythm.
 *
 * Design intent: cinematic, editorial, restrained. No bouncy
 * gimmicks. Every ease is picked for a specific kind of pacing.
 */

import type { Variants, Transition } from "framer-motion";

// ────────────────────────────────────────────────────────────────
// TOKENS
// ────────────────────────────────────────────────────────────────

/** Primary cinematic ease — long exhale, premium feel. */
export const easePremium = [0.22, 1, 0.36, 1] as const;
/** Slightly snappier — used for typographic reveals. */
export const easeSharp = [0.16, 1, 0.3, 1] as const;
/** Curtain / wipe ease — in/out, used for page transitions. */
export const easeCurtain = [0.76, 0, 0.24, 1] as const;
/** Overshoot — used for small chip / pill reveals. */
export const easeOvershoot = [0.34, 1.56, 0.64, 1] as const;
/** Gentle inertia for parallax-like scroll follow. */
export const easeDrift = [0.25, 0.1, 0.25, 1] as const;

export const durations = {
  xs: 0.32,
  sm: 0.48,
  md: 0.7,
  lg: 0.9,
  xl: 1.15,
  scene: 1.4,
} as const;

export const stagger = {
  micro: 0.028,
  tight: 0.042,
  base: 0.06,
  loose: 0.09,
  line: 0.11,
} as const;

/** Standard viewport trigger for on-scroll reveals. */
export const viewportOnce = { once: true, margin: "-8%" } as const;
export const viewportSoft = { once: true, margin: "-4%" } as const;
export const viewportEarly = { once: true, margin: "0px 0px -20% 0px" } as const;

// ────────────────────────────────────────────────────────────────
// BASE VARIANTS
// ────────────────────────────────────────────────────────────────

/** Generic fade + slight lift. Use when nothing more specific fits. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.md, ease: easePremium },
  },
};

/** Soft fade without filter work; keeps reveals light on the compositor. */
export const fadeBlur: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: durations.md, ease: easePremium },
  },
};

/** Clip-reveal from bottom — good for paragraph blocks. */
export const clipUp: Variants = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)", y: 8 },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    transition: { duration: durations.lg, ease: easeSharp },
  },
};

/** Horizontal curtain — used for headline lines. */
export const curtainLeft: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: durations.md, ease: easeSharp },
  },
};

/** Scale drift — use sparingly for hero moments. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.lg, ease: easePremium },
  },
};

/** Masked line (text) reveal. Use with overflow-hidden parent. */
export const maskedLine: Variants = {
  hidden: { y: "112%", skewX: -6, opacity: 0 },
  visible: {
    y: "0%",
    skewX: 0,
    opacity: 1,
    transition: { duration: 0.72, ease: easeSharp },
  },
};

/** Per-word rise — subtle, editorial. */
export const wordRise: Variants = {
  hidden: { y: "114%", skewX: -5, opacity: 0 },
  visible: {
    y: "0%",
    skewX: 0,
    opacity: 1,
    transition: { duration: 0.68, ease: easeSharp },
  },
};

/** Small overshoot for chips, badges, dots. */
export const chipPop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOvershoot },
  },
};

/** Left-right line grow — dividers, accents. */
export const lineDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: easePremium },
  },
};

// ────────────────────────────────────────────────────────────────
// GROUP VARIANTS
// ────────────────────────────────────────────────────────────────

export const group = (s: number = stagger.base, delay: number = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: s, delayChildren: delay },
  },
});

/** Shared scene transition for continuity between sections. */
export const sceneTransition: Transition = {
  duration: durations.xl,
  ease: easePremium,
};

// ────────────────────────────────────────────────────────────────
// HOVER PRESETS
// ────────────────────────────────────────────────────────────────

export const hoverLift = {
  y: -6,
  transition: { duration: 0.4, ease: easePremium },
} as const;

export const hoverLiftStrong = {
  y: -10,
  scale: 1.012,
  transition: { duration: 0.5, ease: easePremium },
} as const;

export const tapCompress = {
  scale: 0.97,
  transition: { duration: 0.18, ease: easeSharp },
} as const;
