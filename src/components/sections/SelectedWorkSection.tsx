"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  VerticalImageStack,
  type VerticalImageStackItem,
} from "@/components/ui/vertical-image-stack";
import MaskedHeading from "@/components/motion/MaskedHeading";
import Reveal from "@/components/motion/Reveal";
import StaggerGroup from "@/components/motion/StaggerGroup";
import { easePremium, easeSharp, easeOvershoot } from "@/lib/motion";
import type { LogoAsset } from "@/lib/logo-assets";
import LogoMarqueeWall from "@/components/ui/LogoMarqueeWall";
import usePointerField from "@/hooks/usePointerField";

const imagePath = (folder: string, fileName: string) =>
  `/image/${folder}/${encodeURIComponent(fileName)}`;

const stackTimings = [1800, 2000, 1900, 2100];

export default function SelectedWorkSection({ logoAssets }: { logoAssets: LogoAsset[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const pointerField = usePointerField({ stiffness: 42, damping: 16, mass: 0.92 });
  const categoryColumns: Array<{
    title: string;
    note: string;
    images: VerticalImageStackItem[];
    kind?: "logos";
  }> = [
    {
      title: "Banner",
      note: "Wide-format. Campaign-ready.",
      images: [
        "Banner (1).jpeg",
        "Banner (10).jpeg",
        "Banner (11).jpeg",
        "Banner (12).jpeg",
        "Banner (13).jpeg",
      ].map((fileName, index) => ({
        id: `banner-${index}`,
        title: "Banner Design",
        tag: "BANNER",
        src: imagePath("banner", fileName),
        alt: `Banner design ${index + 1}`,
      })),
    },
    {
      title: "Poster",
      note: "High-impact. Print to digital.",
      images: [
        "Poster (1).jpeg",
        "Poster (10).jpeg",
        "Poster (34).jpeg",
        "Poster (72).jpeg",
        "Poster (108).jpeg",
      ].map((fileName, index) => ({
        id: `poster-${index}`,
        title: "Poster Design",
        tag: "POSTER",
        src: imagePath("poster", fileName),
        alt: `Poster design ${index + 1}`,
      })),
    },
    {
      title: "Logo",
      note: "Identity marks and systems.",
      kind: "logos",
      images: logoAssets.map((logo) => ({
        id: logo.id,
        title: logo.label,
        tag: "LOGO",
        src: logo.src,
        alt: logo.alt,
      })),
    },
    {
      title: "Package",
      note: "Packaging with shelf instinct.",
      images: [
        "Agni Masala Branding-12.jpg",
        "Agni Masala Branding-16.jpg",
        "Plumoeasy Mockup-1.jpg",
        "Plumoeasy Mockup-2.jpg",
      ].map((fileName, index) => ({
        id: `package-${index}`,
        title: "Package Design",
        tag: "PACKAGE",
        src: imagePath("label", fileName),
        alt: `Package design ${index + 1}`,
      })),
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.35, 0.35, 0],
  );
  const ambientLightX = useTransform(pointerField.x, (v) => v * 180);
  const ambientLightY = useTransform(pointerField.y, (v) => v * 120);
  const ambientShadowX = useTransform(pointerField.x, (v) => v * -120);
  const ambientShadowY = useTransform(pointerField.y, (v) => v * -90);
  const gridDriftX = useTransform(pointerField.x, (v) => v * -10);
  const gridDriftY = useTransform(pointerField.y, (v) => v * -6);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      data-nav-theme="light"
      className="relative overflow-hidden border-b border-black/8 bg-paper-soft"
      onMouseMove={pointerField.handleMove}
      onMouseLeave={pointerField.handleLeave}
    >
      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ y: bgY, opacity: bgOpacity }}
        >
          <div className="absolute left-[-12%] top-[10%] h-[48vh] w-[48vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,102,91,0.12),transparent_62%)] blur-[110px]" />
          <div className="absolute right-[-8%] bottom-[14%] h-[54vh] w-[54vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(8,9,12,0.06),transparent_68%)] blur-[140px]" />
        </motion.div>
      ) : null}
      {!reduce ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[22%] z-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78),rgba(249,102,91,0.14)_42%,transparent_72%)] blur-[84px]"
            style={{ x: ambientLightX, y: ambientLightY, opacity: bgOpacity }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[12%] top-[56%] z-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(17,18,20,0.08),transparent_72%)] blur-[110px]"
            style={{ x: ambientShadowX, y: ambientShadowY, opacity: bgOpacity }}
          />
        </>
      ) : null}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 noise opacity-[0.025] mix-blend-multiply" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-18 md:px-8 md:py-28">
        <div className="mb-10 border-b border-black/8 pb-8 lg:mb-16 lg:pb-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[640px]">
              <Reveal preset="fadeUp" className="mb-6 flex items-center gap-3">
                <motion.span
                  className="h-px w-5 flex-shrink-0 origin-left bg-[#F9665B]/70"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, ease: easePremium }}
                />
                <p className="brand-kicker text-ink/55">Selected work</p>
              </Reveal>

              <MaskedHeading
                lines={["Real work. Four categories.", "Zero filler."]}
                className="brand-display flex max-w-[640px] flex-wrap gap-x-[0.22em] gap-y-1 pb-1 text-[clamp(2.3rem,8vw,4.4rem)] text-ink"
                lineClassName="block w-full"
                wordClassName="inline-block"
                as="h2"
              />
            </div>

            <StaggerGroup
              stagger="base"
              className="flex flex-wrap gap-2 lg:justify-end"
              margin="-4%"
            >
              {categoryColumns.map((category) => (
                <motion.span
                  key={category.title}
                  variants={{
                    hidden: { opacity: 0, scale: 0.84, y: 6 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: easeOvershoot },
                    },
                  }}
                  className="brand-chip rounded-full border border-black/10 bg-white px-3 py-1 text-ink/44"
                >
                  {category.title}
                </motion.span>
              ))}
            </StaggerGroup>
          </div>
          <motion.div
            aria-hidden
            initial={reduce ? undefined : { opacity: 0, scaleX: 0.6 }}
            whileInView={reduce ? undefined : { opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, delay: 0.12, ease: easePremium }}
            className="mt-8 h-px origin-left bg-[linear-gradient(90deg,rgba(249,102,91,0.55),rgba(249,102,91,0.12)_42%,transparent_74%)]"
          />
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-6"
          style={reduce ? { perspective: "1400px" } : { perspective: "1400px", x: gridDriftX, y: gridDriftY }}
        >
          {categoryColumns.map((category, index) => (
            <motion.article
              key={category.title}
              initial={
                reduce
                  ? undefined
                  : {
                      opacity: 0,
                      y: 42,
                      rotateX: 8,
                      clipPath: "inset(10% 0 0 0 round 2rem)",
                    }
              }
              whileInView={
                reduce
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      clipPath: "inset(0% 0 0 0 round 2rem)",
                    }
              }
              whileHover={reduce ? undefined : { y: -10, scale: 1.014 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{
                duration: 0.82,
                delay: index * 0.09,
                ease: easeSharp,
              }}
              data-cursor="drag"
              className={`group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-black/8 bg-white p-4 shadow-[0_24px_80px_-54px_rgba(17,18,20,0.18)] transition-colors duration-500 hover:border-black/12 md:rounded-[2rem] md:p-5 ${
                index % 2 === 1 ? "xl:translate-y-10" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[1.6rem] md:rounded-[2rem]"
                style={{
                  boxShadow:
                    "0 48px 120px -40px rgba(17,18,20,0.32), 0 4px 18px -12px rgba(249,102,91,0.18)",
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: easePremium }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-[-12%] rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_44%,rgba(249,102,91,0.08)_76%,transparent_100%)] blur-[24px] md:rounded-[2.4rem]"
                initial={{ opacity: 0.18 }}
                whileHover={{ opacity: 0.38, scale: 1.02 }}
                transition={{ duration: 0.55, ease: easePremium }}
              />

              <div className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[linear-gradient(90deg,rgba(249,102,91,0.45)_0%,transparent_55%)]" />
              <motion.div
                className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[linear-gradient(90deg,#F9665B_0%,rgba(249,102,91,0.4)_55%,transparent_100%)]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: easePremium }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute right-[-12%] top-[18%] h-20 w-20 rounded-full border border-black/6 md:h-28 md:w-28"
                initial={{ opacity: 0.14, scale: 0.84 }}
                whileHover={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.6, ease: easePremium }}
              />
              <span
                aria-hidden
                className="brand-display pointer-events-none absolute bottom-2 right-4 text-[3rem] leading-none text-ink/[0.04] md:bottom-3 md:right-5 md:text-[4.2rem]"
              >
                0{index + 1}
              </span>

              <div className="mb-4 flex items-start justify-between gap-3 border-b border-black/8 pb-4 md:mb-5 md:gap-4">
                <div>
                  <div className="mb-1.5 overflow-hidden">
                    <motion.p
                      className="brand-kicker text-ink/38"
                      initial={{ y: "100%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true, margin: "-6%" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.18 + index * 0.1,
                        ease: easeSharp,
                      }}
                    >
                      {category.title}
                    </motion.p>
                  </div>
                  <p className="brand-body-copy max-w-[16rem] text-[0.78rem] text-ink/46 md:max-w-[18rem] md:text-[0.84rem]">
                    {category.note}
                  </p>
                </div>
                <div className="shrink-0 pt-0.5 text-right">
                  <motion.span
                    className="brand-display block text-[1.55rem] leading-none text-ink"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-6%" }}
                    transition={{
                      duration: 0.55,
                      delay: 0.28 + index * 0.1,
                      ease: easeOvershoot,
                    }}
                  >
                    {String(category.images.length).padStart(2, "0")}
                  </motion.span>
                  <span className="brand-chip mt-1 block text-ink/30">
                    pieces
                  </span>
                </div>
              </div>

              {category.kind === "logos" ? (
                <LogoMarqueeWall
                  logos={logoAssets}
                  className="h-[24rem] min-h-[24rem] md:h-[30rem] md:min-h-[30rem] lg:h-[36rem] lg:min-h-[36rem]"
                />
              ) : (
                <VerticalImageStack
                  images={category.images}
                  autoPlayMs={stackTimings[index]}
                  allowWheelNavigation={true}
                  imageFit="contain"
                  showHint={index === 0}
                  className="h-[24rem] min-h-[24rem] md:h-[30rem] md:min-h-[30rem] lg:h-[36rem] lg:min-h-[36rem]"
                />
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
