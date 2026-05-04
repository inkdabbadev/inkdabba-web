"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Navigation from "@/components/global/Navigation";

const signalWords = ["Since 2018", "Built by 2", "Still going louder"];

const kineticWords = [
  {
    title: "Started with two",
    note: "Ink Dabba began with two creative minds, a sharp eye, and a big appetite for better work.",
  },
  {
    title: "Grew into a crew",
    note: "What started small turned into a team of thinkers, makers, and problem-solvers who love a good creative mission.",
  },
  {
    title: "Built to make noise",
    note: "We chase work that feels bold, looks sharp, and gives brands a real reason to be remembered.",
  },
];

const studioLanes = [
  "Social media marketing",
  "Branding",
  "Website development",
  "Graphic design",
];

const outcomeCards = [
  {
    title: "More spark",
    body: "Every brand gets a stronger personality and a clearer pulse.",
  },
  {
    title: "More impact",
    body: "The work is built to stop the scroll, hold attention, and leave a mark.",
  },
  {
    title: "More happy clients",
    body: "Our favorite part is seeing people love what we create together.",
  },
];

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 18,
    mass: 0.45,
  });

  const float = useSpring(scrollYProgress, {
    stiffness: 44,
    damping: 16,
    mass: 0.65,
  });

  const gradientY = useTransform(smooth, [0, 1], ["16%", "82%"]);
  const backgroundWash = useMotionTemplate`
    radial-gradient(circle at 50% ${gradientY}, rgba(249, 102, 91, 0.15) 0%, rgba(247, 243, 235, 0.55) 28%, rgba(73, 156, 170, 0.12) 52%, rgba(242, 239, 231, 1) 82%),
    linear-gradient(180deg, rgba(247, 243, 235, 1) 0%, rgba(242, 239, 231, 0.99) 100%)
  `;

  const frameY = useTransform(float, [0, 1], ["-2vh", "4vh"]);
  const frameScale = useTransform(float, [0, 1], [0.985, 1.03]);
  const frameOpacity = useTransform(smooth, [0, 0.08, 0.84, 1], [0.28, 0.45, 0.45, 0.16]);

  const introOpacity = useTransform(smooth, [0, 0.12, 0.22], [1, 1, 0]);
  const introY = useTransform(float, [0, 0.22], ["0vh", "-14vh"]);
  const introScale = useTransform(float, [0, 0.22], [1, 0.96]);
  const introBlur = useTransform(smooth, [0.16, 0.22], ["0px", "8px"]);
  const introFilter = useMotionTemplate`blur(${introBlur})`;

  const kineticOpacity = useTransform(smooth, [0.18, 0.28, 0.58, 0.68], [0, 1, 1, 0]);
  const kineticY = useTransform(float, [0.18, 0.68], ["10vh", "-7vh"]);
  const kineticBlur = useTransform(smooth, [0.18, 0.26, 0.58, 0.68], ["10px", "0px", "0px", "8px"]);
  const kineticFilter = useMotionTemplate`blur(${kineticBlur})`;

  const laneOpacity = useTransform(smooth, [0.58, 0.68, 0.84, 0.9], [0, 1, 1, 0]);
  const laneY = useTransform(float, [0.58, 0.9], ["10vh", "-6vh"]);
  const laneScale = useTransform(float, [0.58, 0.9], [0.975, 1]);
  const laneBlur = useTransform(smooth, [0.58, 0.68, 0.84, 0.9], ["10px", "0px", "0px", "8px"]);
  const laneFilter = useMotionTemplate`blur(${laneBlur})`;

  const wordOneOpacity = useTransform(smooth, [0.22, 0.28, 0.34, 0.4], [0.18, 1, 1, 0.16]);
  const wordTwoOpacity = useTransform(smooth, [0.34, 0.4, 0.48, 0.54], [0.14, 1, 1, 0.16]);
  const wordThreeOpacity = useTransform(smooth, [0.48, 0.54, 0.62, 0.68], [0.14, 1, 1, 0.2]);

  const wordOneScale = useTransform(smooth, [0.22, 0.3, 0.4], [0.94, 1, 1.03]);
  const wordTwoScale = useTransform(smooth, [0.34, 0.44, 0.54], [0.94, 1, 1.03]);
  const wordThreeScale = useTransform(smooth, [0.48, 0.58, 0.68], [0.94, 1, 1.03]);

  const wordOneSkew = useTransform(smooth, [0.22, 0.30], [4, 0]);
  const wordTwoSkew = useTransform(smooth, [0.34, 0.44], [4, 0]);
  const wordThreeSkew = useTransform(smooth, [0.48, 0.58], [4, 0]);

  const blackoutScaleX = useTransform(float, [0.88, 0.97], [0.24, 1.06]);
  const blackoutScaleY = useTransform(float, [0.88, 0.97], [0.16, 1.08]);
  const blackoutOpacity = useTransform(smooth, [0.86, 0.92, 1], [0, 1, 1]);
  const blackoutRadius = useTransform(float, [0.88, 0.94, 0.97], ["3rem", "1.8rem", "0rem"]);

  const finalOpacity = useTransform(smooth, [0.93, 0.98], [0, 1]);
  const finalY = useTransform(float, [0.93, 1], ["8vh", "0vh"]);
  const finalScale = useTransform(float, [0.93, 1], [0.97, 1]);
  const finalBlur = useTransform(smooth, [0.93, 0.98], ["8px", "0px"]);
  const finalFilter = useMotionTemplate`blur(${finalBlur})`;

  const ambientTransition = reduceMotion
    ? undefined
    : {
        duration: 18,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
      };

  return (
    <div ref={containerRef} data-nav-theme="light" className="relative h-[620svh] overflow-clip bg-paper text-ink md:h-[720svh]">

      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ background: backgroundWash }} />

        <motion.div
          className="pointer-events-none absolute left-[-8vw] top-[-10vh] h-[24vh] w-[42vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,102,91,0.18),transparent_68%)] blur-[52px] md:h-[44vh] md:w-[26vw] md:blur-[76px]"
          animate={reduceMotion ? undefined : { y: ["0vh", "4vh", "-2vh"] }}
          transition={ambientTransition}
        />
        <motion.div
          className="pointer-events-none absolute bottom-[-18vh] right-[-10vw] h-[24vh] w-[54vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(73,156,170,0.14),transparent_68%)] blur-[60px] md:h-[38vh] md:w-[30vw] md:blur-[86px]"
          animate={reduceMotion ? undefined : { y: ["0vh", "-3vh", "2vh"] }}
          transition={reduceMotion ? undefined : { ...ambientTransition, duration: 24 }}
        />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[78vmax] w-[78vmax] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/35 bg-white/16 shadow-[0_40px_120px_-100px_rgba(8,9,12,0.28)] backdrop-blur-[14px] md:h-[66vmax] md:w-[66vmax] md:rounded-[3rem] md:shadow-[0_60px_160px_-100px_rgba(8,9,12,0.28)] md:backdrop-blur-[18px]"
          style={{ y: frameY, scale: frameScale, opacity: frameOpacity }}
        />

        <motion.section
          className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center md:px-6"
          style={{ opacity: introOpacity, y: introY, scale: introScale, filter: introFilter }}
        >
          <div className="relative w-full max-w-6xl">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-7">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {signalWords.map((word) => (
                  <span
                    key={word}
                    className="brand-chip rounded-full border border-black/8 bg-white/70 px-3 py-2 text-ink/44 md:px-4"
                  >
                    {word}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                <p className="brand-kicker text-ink/36">
                  About INK DABBA
                </p>
                <h1 className="brand-display-tight text-[clamp(3rem,12vw,9.2rem)] text-ink">
                  {"Started\u00A0in\u00A02018.".split("").map((ch, ci) => (
                    <span
                      key={`q${ci}`}
                      className="inline-block anim-baseline-snap"
                      style={{ animationDelay: `${ci * 0.038}s` }}
                    >
                      {ch}
                    </span>
                  ))}
                  <span className="block text-[#F9665B]">
                    {"Still\u00A0making\u00A0noise.".split("").map((ch, ci) => (
                      <span
                        key={`l${ci}`}
                        className="inline-block anim-baseline-snap"
                        style={{ animationDelay: `${0.44 + ci * 0.038}s` }}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                </h1>
              </div>

              <p className="brand-body-copy max-w-[24rem] text-[0.94rem] text-ink/58 md:max-w-[42rem] md:text-[clamp(0.98rem,1.7vw,1.16rem)]">
                Ink Dabba started with two gifted people and grew into a full-service creative team making brands louder, sharper, and way harder to ignore.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-6"
          style={{ opacity: kineticOpacity, y: kineticY, filter: kineticFilter }}
        >
          <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
            <div className="space-y-6">
              <p className="brand-kicker text-ink/36">
                Studio rhythm
              </p>
              <h2 className="brand-display text-balance text-[clamp(2.8rem,4.8vw,5rem)] text-ink">
                Big ideas.
                <span className="block text-ink/42">Zero boring energy.</span>
              </h2>
              <div className="space-y-3">
                {kineticWords.map((word, index) => (
                  <div
                    key={word.title}
                    className="rounded-[1.8rem] border border-black/8 bg-white/72 px-5 py-4 shadow-[0_22px_60px_-42px_rgba(17,18,20,0.18)]"
                  >
                    <p className="brand-chip text-ink/42">
                      0{index + 1}
                    </p>
                    <p className="brand-body-copy mt-2 text-sm text-ink/58">{word.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex min-h-[18rem] items-center justify-center overflow-hidden rounded-[1.8rem] border border-black/8 bg-white/58 px-4 py-8 shadow-[0_28px_90px_-60px_rgba(17,18,20,0.24)] md:min-h-[22rem] md:rounded-[2.6rem] md:px-6 md:py-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(249,102,91,0.12),transparent_70%)] blur-[50px]" />
              </div>

              <div className="relative flex w-full flex-col items-center text-center">
                <motion.div style={{ opacity: wordOneOpacity, scale: wordOneScale, skewX: wordOneSkew }} className="py-1">
                  <h3 className="brand-display-tight text-[clamp(2.8rem,12vw,7.4rem)] text-ink">
                    Started small
                  </h3>
                </motion.div>

                <motion.div style={{ opacity: wordTwoOpacity, scale: wordTwoScale, skewX: wordTwoSkew }} className="py-1">
                  <h3 className="brand-display-outline text-[clamp(2.8rem,12vw,7.4rem)]">
                    Grew louder
                  </h3>
                </motion.div>

                <motion.div style={{ opacity: wordThreeOpacity, scale: wordThreeScale, skewX: wordThreeSkew }} className="py-1">
                  <h3 className="brand-display-tight text-[clamp(2.8rem,12vw,7.4rem)] text-[#F9665B]">
                    Built to hit
                  </h3>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-6"
          style={{ opacity: laneOpacity, y: laneY, scale: laneScale, filter: laneFilter }}
        >
          <div className="w-full max-w-6xl space-y-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="space-y-5">
                <p className="brand-kicker text-ink/36">
                  What leaves the studio
                </p>
                <h3 className="brand-display text-balance text-[clamp(3rem,5vw,5.2rem)] text-ink">
                  Full-service.
                  <span className="block text-ink/42">Still personal.</span>
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {studioLanes.map((lane) => (
                  <motion.div
                    key={lane}
                    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                    className="rounded-[1.4rem] border border-black/8 bg-white/76 px-4 py-4 shadow-[0_22px_62px_-44px_rgba(17,18,20,0.18)] md:rounded-[1.7rem] md:px-5 md:py-5"
                  >
                    <p className="brand-display text-[1.3rem] text-ink">
                      {lane}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {outcomeCards.map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="rounded-[1.5rem] border border-black/8 bg-white/72 p-5 shadow-[0_24px_70px_-48px_rgba(17,18,20,0.18)] md:rounded-[1.9rem] md:p-6"
                >
                  <p className="brand-display mb-3 text-[1.7rem] text-ink">
                    {card.title}
                  </p>
                  <p className="brand-body-copy text-sm text-ink/58">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.div
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center overflow-hidden"
          style={{ opacity: blackoutOpacity }}
        >
          <motion.div
            className="h-[118vh] w-[118vw] bg-ink shadow-[0_0_120px_rgba(8,9,12,0.35)]"
            style={{ scaleX: blackoutScaleX, scaleY: blackoutScaleY, borderRadius: blackoutRadius }}
          />
        </motion.div>

        <motion.section
          className="absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-porcelain md:px-6"
          style={{ opacity: finalOpacity, y: finalY, scale: finalScale, filter: finalFilter }}
        >
          <div className="w-full max-w-5xl space-y-8">
            <h4 className="brand-display-tight text-balance text-[clamp(2.8rem,10vw,6.8rem)] text-white">
              INK DABBA
              <span className="block text-[rgba(150,220,232,0.96)]">is built for brands with guts.</span>
            </h4>

            <p className="brand-body-copy mx-auto max-w-[22rem] text-[0.95rem] text-white/68 md:max-w-2xl md:text-[clamp(0.98rem,1.8vw,1.12rem)]">
              Social media marketing, branding, website development, graphic design, and the creative muscle behind all of it. You bring the brief. We bring the fire.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/work"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-center font-body text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:text-[0.8rem] sm:tracking-[0.2em]"
              >
                View work
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/18 px-6 py-3 text-center font-body text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white/88 transition-colors duration-300 hover:border-white/34 hover:text-white sm:w-auto sm:text-[0.8rem] sm:tracking-[0.2em]"
              >
                Start a project
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
