"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { easeSharp, stagger as staggerTokens, viewportOnce } from "@/lib/motion";

type Line = string | { text: string; italic?: boolean; accent?: boolean };

interface MaskedHeadingProps {
  /**
   * Lines of the headline. Either a plain string (split into words
   * automatically) or an object to flag italic/accent styling for
   * the whole line.
   */
  lines: Line[];
  className?: string;
  /** Class applied to each visible line element (block). */
  lineClassName?: string;
  /** Class applied to each word — use for italic/accent overrides. */
  wordClassName?: string;
  /** Class applied to the accent line wrapper. */
  accentClassName?: string;
  as?: "h1" | "h2" | "h3";
  /** Delay before the first line begins. */
  delay?: number;
  /** Per-word stagger token or raw seconds. */
  wordStagger?: keyof typeof staggerTokens | number;
  /** Per-line stagger token or raw seconds. */
  lineStagger?: keyof typeof staggerTokens | number;
  id?: string;
  /** Viewport margin override. */
  margin?: string;
}

/**
 * MaskedHeading — cinematic headline reveal.
 * Each line is an overflow-hidden row of per-word <span>s that rise
 * from below their baseline with a subtle skew and opacity easing.
 * This replaces the duplicated headline-stagger patterns that used
 * to live inside every section.
 */
export default function MaskedHeading({
  lines,
  className,
  lineClassName,
  wordClassName,
  accentClassName,
  as = "h2",
  delay = 0,
  wordStagger = "tight",
  lineStagger = "base",
  id,
  margin,
}: MaskedHeadingProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.h2;

  const wordStep =
    typeof wordStagger === "number" ? wordStagger : staggerTokens[wordStagger];
  const lineStep =
    typeof lineStagger === "number" ? lineStagger : staggerTokens[lineStagger];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: lineStep,
        delayChildren: delay,
      },
    },
  };

  const lineGroup: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: wordStep },
    },
  };

  const word: Variants = {
    hidden: { y: "115%", skewX: -6, opacity: 0 },
    visible: {
      y: "0%",
      skewX: 0,
      opacity: 1,
      transition: { duration: 0.74, ease: easeSharp },
    },
  };

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {lines.map((ln, i) => {
          const text = typeof ln === "string" ? ln : ln.text;
          const italic = typeof ln === "object" && ln.italic;
          const accent = typeof ln === "object" && ln.accent;
          return (
            <span
              key={i}
              className={`${lineClassName ?? "block"} ${italic ? "italic font-light" : ""} ${
                accent ? accentClassName ?? "" : ""
              }`}
            >
              {text}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, ...(margin ? { margin } : {}) }}
      variants={container}
    >
      {lines.map((ln, i) => {
        const text = typeof ln === "string" ? ln : ln.text;
        const italic = typeof ln === "object" && ln.italic;
        const accent = typeof ln === "object" && ln.accent;
        const words = text.split(" ");
        return (
          <motion.span
            key={i}
            variants={lineGroup}
            className={`${lineClassName ?? "block"} overflow-hidden pb-[0.04em] ${
              italic ? "italic font-light" : ""
            } ${accent ? accentClassName ?? "" : ""}`}
          >
            {words.map((w, wi) => (
              <Fragment key={wi}>
                <motion.span
                  variants={word}
                  className={`inline-block ${wordClassName ?? ""}`}
                >
                  {w}
                </motion.span>
                {wi < words.length - 1 ? <span>{"\u00A0"}</span> : null}
              </Fragment>
            ))}
          </motion.span>
        );
      })}
    </Tag>
  );
}
