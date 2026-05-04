"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  type PanInfo,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowUp } from "lucide-react";

export type VerticalImageStackItem = {
  id: number | string;
  src: string;
  alt: string;
  title?: string;
  tag?: string;
};

type VerticalImageStackProps = {
  images: VerticalImageStackItem[];
  className?: string;
  showDots?: boolean;
  showCounter?: boolean;
  showHint?: boolean;
  autoPlayMs?: number;
  allowWheelNavigation?: boolean;
  imageFit?: "cover" | "contain";
};

export function VerticalImageStack({
  images,
  className,
  showDots = true,
  showCounter = true,
  showHint = true,
  autoPlayMs,
  allowWheelNavigation = true,
  imageFit = "cover",
}: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const lastNavigationTime = useRef(0);
  const autoPlayResumeAt = useRef(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const navigationCooldown = 260;
  const reduceMotion = useReducedMotion();
  const isInView = useInView(stackRef, { amount: 0.35, once: false });

  const navigate = useCallback(
    (newDirection: number) => {
      if (images.length <= 1) return;

      const now = Date.now();
      if (now - lastNavigationTime.current < navigationCooldown) return;
      lastNavigationTime.current = now;

      setCurrentIndex((prev) => {
        if (newDirection > 0) {
          return prev === images.length - 1 ? 0 : prev + 1;
        }

        return prev === 0 ? images.length - 1 : prev - 1;
      });
    },
    [images.length],
  );

  const pauseAutoPlay = useCallback(() => {
    autoPlayResumeAt.current = Date.now() + 5000;
  }, []);

  const navigateToIndex = useCallback(
    (index: number) => {
      if (!images.length || index === currentIndex) return;

      setCurrentIndex(index);
      lastNavigationTime.current = Date.now();
      pauseAutoPlay();
    },
    [currentIndex, images.length, pauseAutoPlay],
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  useEffect(() => {
    if (
      !autoPlayMs ||
      images.length <= 1 ||
      !isInView ||
      reduceMotion ||
      isHovered ||
      isFocused
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      if (Date.now() < autoPlayResumeAt.current) return;
      navigate(1);
    }, autoPlayMs);

    return () => window.clearInterval(interval);
  }, [autoPlayMs, images.length, isFocused, isHovered, isInView, navigate, reduceMotion]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 50;

    if (info.offset.y < -threshold) {
      pauseAutoPlay();
      navigate(1);
    } else if (info.offset.y > threshold) {
      pauseAutoPlay();
      navigate(-1);
    }
  };

  const getCardStyle = (index: number) => {
    const total = images.length;
    let diff = index - currentIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
    }
    if (diff === -1) {
      return { y: -124, scale: 0.84, opacity: 0.56, zIndex: 4, rotateX: 10 };
    }
    if (diff === -2) {
      return { y: -220, scale: 0.72, opacity: 0.24, zIndex: 3, rotateX: 16 };
    }
    if (diff === 1) {
      return { y: 124, scale: 0.84, opacity: 0.56, zIndex: 4, rotateX: -10 };
    }
    if (diff === 2) {
      return { y: 220, scale: 0.72, opacity: 0.24, zIndex: 3, rotateX: -16 };
    }

    return {
      y: diff > 0 ? 320 : -320,
      scale: 0.64,
      opacity: 0,
      zIndex: 0,
      rotateX: diff > 0 ? -20 : 20,
    };
  };

  const isVisible = (index: number) => {
    const total = images.length;
    let diff = index - currentIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return Math.abs(diff) <= 2;
  };

  if (!images.length) return null;

  return (
    <div
      ref={stackRef}
      className={`relative flex h-[24rem] w-full items-center justify-center overflow-hidden md:h-[30rem] lg:h-[34rem] ${className ?? ""}`}
      tabIndex={0}
      role="region"
      aria-label="Selected work image stack"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          pauseAutoPlay();
          navigate(1);
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          pauseAutoPlay();
          navigate(-1);
        }
      }}
      onWheel={(event) => {
        if (!allowWheelNavigation) return;
        if (Math.abs(event.deltaY) <= 30) return;

        event.preventDefault();
        pauseAutoPlay();
        navigate(event.deltaY > 0 ? 1 : -1);
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.02] blur-3xl" />
      </div>

      <div
        className="relative flex h-[20rem] w-[11.5rem] items-center justify-center md:h-[24rem] md:w-[13rem] lg:h-[28rem] lg:w-[15.5rem]"
        style={{ perspective: "1200px" }}
      >
        {images.map((image, index) => {
          if (!isVisible(index)) return null;

          const style = getCardStyle(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
              }}
              transition={{
                type: reduceMotion ? "tween" : "spring",
                duration: reduceMotion ? 0.2 : undefined,
                stiffness: reduceMotion ? undefined : 380,
                damping: reduceMotion ? undefined : 22,
                mass: reduceMotion ? undefined : 1,
              }}
              drag={!reduceMotion && isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.18}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className="relative h-[15.5rem] w-[10.5rem] overflow-hidden rounded-[1.35rem] border border-black/6 bg-white md:h-[18rem] md:w-[12rem] md:rounded-[1.6rem] lg:h-[21rem] lg:w-[13.5rem] lg:rounded-[1.8rem]"
                style={{
                  boxShadow: isCurrent
                    ? "0 26px 56px -26px rgba(0,0,0,0.22)"
                    : "0 12px 28px -18px rgba(0,0,0,0.14)",
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent_22%,transparent_72%,rgba(8,9,12,0.14)_100%)]" />
                <div
                  className={`absolute inset-0 ${
                    imageFit === "contain" ? "bg-[#f6f1e8]" : ""
                  }`}
                >
                  <div
                    className={`absolute ${
                      imageFit === "contain" ? "inset-4" : "inset-0"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 767px) 70vw, (max-width: 1279px) 34vw, 18vw"
                      className={`h-full w-full ${
                        imageFit === "contain" ? "object-contain" : "object-cover"
                      }`}
                      draggable={false}
                      loading="lazy"
                      quality={68}
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(8,9,12,0.78))]" />

                {(image.title || image.tag) && (
                    <div className="absolute inset-x-3 bottom-3 z-10 md:inset-x-4 md:bottom-4">
                    {image.tag && (
                      <p className="brand-chip mb-2 text-white/72">
                        {image.tag}
                      </p>
                    )}
                    {image.title && (
                      <p className="brand-display text-[1.1rem] leading-[0.92] text-white md:text-[1.28rem] lg:text-[1.45rem]">
                        {image.title}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute right-3 top-3 z-20 flex flex-col gap-2 md:right-4 md:top-4">
        <button
          type="button"
          onClick={() => {
            pauseAutoPlay();
            navigate(-1);
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/90 text-ink shadow-[0_12px_30px_-18px_rgba(0,0,0,0.3)] transition-colors hover:bg-white md:h-9 md:w-9"
          aria-label="Show previous image"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.8} />
        </button>
        <button
          type="button"
          onClick={() => {
            pauseAutoPlay();
            navigate(1);
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/90 text-ink shadow-[0_12px_30px_-18px_rgba(0,0,0,0.3)] transition-colors hover:bg-white md:h-9 md:w-9"
          aria-label="Show next image"
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      {showDots && (
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2 md:right-4">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => navigateToIndex(index)}
              className={`w-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "h-6 bg-ink/82"
                  : "h-2 bg-ink/16 hover:bg-ink/30"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {showHint && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-1.5 text-ink/42">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.6,
                ease: "easeInOut",
              }}
            >
              <ArrowUp className="h-4 w-4" strokeWidth={1.75} />
            </motion.div>
            <span className="brand-chip text-[0.6rem] md:text-[0.7rem]">
              Scroll or drag
            </span>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.6,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
            </motion.div>
          </div>
        </motion.div>
      )}

      {showCounter && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 md:left-4">
          <div className="flex flex-col items-center">
            <span className="brand-display text-[1.45rem] leading-none text-ink/84 tabular-nums md:text-[2rem]">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <div className="my-2 h-px w-8 bg-ink/18" />
            <span className="brand-chip text-ink/34 tabular-nums">
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
