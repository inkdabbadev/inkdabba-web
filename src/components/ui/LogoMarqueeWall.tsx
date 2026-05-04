"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import type { LogoAsset } from "@/lib/logo-assets";
import { easePremium } from "@/lib/motion";

type LogoMarqueeWallProps = {
  logos: LogoAsset[];
  className?: string;
  compact?: boolean;
};

export default function LogoMarqueeWall({
  logos,
  className,
  compact = false,
}: LogoMarqueeWallProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const laneCount = compact ? 2 : 3;
  const lanes = useMemo(
    () =>
      Array.from({ length: laneCount }, (_, laneIndex) =>
        logos.filter((_, index) => index % laneCount === laneIndex),
      ).filter((lane) => lane.length > 0),
    [laneCount, logos],
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  if (!logos.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(247,243,235,0.94))] p-4 shadow-[0_24px_80px_-48px_rgba(17,18,20,0.18)] ${className ?? ""}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={reduce ? undefined : { y: drift }}
      >
        <div className="absolute left-[-10%] top-[10%] h-[12rem] w-[12rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,102,91,0.13),transparent_70%)] blur-[50px]" />
        <div className="absolute bottom-[-12%] right-[-5%] h-[10rem] w-[10rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(17,18,20,0.08),transparent_74%)] blur-[46px]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-[linear-gradient(90deg,rgba(247,243,235,0.95),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-[linear-gradient(270deg,rgba(247,243,235,0.95),transparent)]" />

      <div className={`relative z-10 flex h-full flex-col ${compact ? "gap-3" : "gap-4"}`}>
        {lanes.map((lane, laneIndex) => {
          const duplicated = [...lane, ...lane];
          const reverse = laneIndex % 2 === 1;

          return (
            <div
              key={`lane-${laneIndex}`}
              className={`relative overflow-hidden ${compact ? "h-[4.75rem]" : "h-[6.8rem]"}`}
            >
              <motion.div
                className="flex min-w-max items-center gap-3"
                animate={
                  reduce
                    ? undefined
                    : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
                }
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: compact ? 24 + laneIndex * 3 : 28 + laneIndex * 3,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              >
                {duplicated.map((logo, index) => (
                  <motion.div
                    key={`${logo.id}-${index}`}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            y: compact ? -4 : -6,
                            scale: 1.03,
                            rotate: laneIndex % 2 === 0 ? -1.2 : 1.2,
                          }
                    }
                    transition={{ duration: 0.35, ease: easePremium }}
                    data-cursor="media"
                    className={`group relative shrink-0 overflow-hidden rounded-[1.3rem] border border-black/8 bg-white/86 px-4 shadow-[0_20px_50px_-36px_rgba(17,18,20,0.24)] backdrop-blur-md ${
                      compact ? "h-[4.75rem] w-[9rem]" : "h-[6.8rem] w-[11.5rem]"
                    }`}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent_38%,rgba(8,9,12,0.05)_100%)]" />
                    <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#F9665B]/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex h-full w-full items-center justify-center">
                      <div className={`relative w-full ${compact ? "h-9" : "h-12"}`}>
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          sizes={compact ? "144px" : "184px"}
                          className="object-contain opacity-58 grayscale transition-all duration-300 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
