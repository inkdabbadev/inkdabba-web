"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Magnetic from "@/components/motion/Magnetic";
import { contactDetails, identityStamp } from "@/data/site-content";
import { easePremium } from "@/lib/motion";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.45,
  });

  const shellY = useTransform(smooth, [0, 1], ["16%", "0%"]);
  const shellScale = useTransform(smooth, [0, 1], [0.97, 1]);
  const shellOpacity = useTransform(smooth, [0, 0.4, 1], [0, 0.75, 1]);
  const glowY = useTransform(smooth, [0, 1], ["10%", "-8%"]);

  return (
    <footer
      ref={ref}
      data-nav-theme="dark"
      className="relative overflow-hidden border-t border-white/8 bg-[#08090C] text-white"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={reduce ? undefined : { y: glowY }}
      >
        <div className="absolute left-[-8%] top-[8%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,102,91,0.14),transparent_70%)] blur-[110px]" />
        <div className="absolute bottom-[-18%] right-[-6%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_72%)] blur-[100px]" />
      </motion.div>

      <div className="relative z-10 border-b border-white/8 py-3 md:py-4">
        <div className="text-band-mask overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex min-w-max items-center gap-8 will-change-transform"
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={reduce ? undefined : { duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index} className="brand-chip text-white/28">
                {identityStamp}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-[1600px] px-5 py-12 md:px-8 md:py-18"
        initial={reduce ? undefined : { opacity: 0, y: 56, clipPath: "inset(12% 0 0 0)" }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.95, ease: easePremium }}
        style={reduce ? undefined : { y: shellY, scale: shellScale, opacity: shellOpacity }}
      >
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_40px_120px_-54px_rgba(0,0,0,0.72)] backdrop-blur-xl md:rounded-[2.2rem] md:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-8">
              <div className="space-y-5">
                <Link href="/" data-cursor="link" className="inline-flex items-center">
                  <Image
                    src="/logo/inkdabba.svg"
                    alt="INK DABBA"
                    width={160}
                    height={48}
                    className="h-8 w-auto invert md:h-10"
                  />
                </Link>

                <div className="max-w-[48rem] overflow-hidden">
                  <motion.p
                    className="brand-display-tight text-[clamp(2.3rem,12vw,7.6rem)] leading-[0.86] text-white"
                    initial={reduce ? undefined : { y: "108%", opacity: 0 }}
                    whileInView={reduce ? undefined : { y: "0%", opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.88, delay: 0.08, ease: easePremium }}
                  >
                    {contactDetails.studioName}
                  </motion.p>
                </div>
              </div>

              <div className="grid gap-3 text-white/62 md:grid-cols-2">
                <Magnetic as="div" strength={0.1} dataCursor="link">
                  <a
                    href={`mailto:${contactDetails.email}`}
                    data-cursor="link"
                    className="brand-body-copy block w-fit transition-colors duration-300 hover:text-white"
                  >
                    {contactDetails.email}
                  </a>
                </Magnetic>
                <Magnetic as="div" strength={0.1} dataCursor="link">
                  <a
                    href={`tel:${contactDetails.primaryPhone.replace(/\s+/g, "")}`}
                    data-cursor="link"
                    className="brand-body-copy block w-fit transition-colors duration-300 hover:text-white"
                  >
                    {contactDetails.primaryPhone}
                  </a>
                </Magnetic>
                <p className="brand-body-copy md:col-span-2">
                  {contactDetails.address}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:justify-items-end">
              {footerLinks.map((link, index) => (
                <Magnetic
                  key={link.href}
                  as="div"
                  strength={0.12}
                  dataCursor="magnetic"
                  className="w-full sm:w-auto"
                >
                  <motion.div
                    initial={reduce ? undefined : { opacity: 0, y: 18 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.16 + index * 0.08,
                      ease: easePremium,
                    }}
                  >
                    <Link
                      href={link.href}
                      data-cursor="magnetic"
                      className="group flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:min-w-[10rem]"
                    >
                      <span className="brand-kicker text-white/68 transition-colors duration-300 group-hover:text-white">
                        {link.label}
                      </span>
                      <span className="text-sm text-white/38 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/72">
                        &rarr;
                      </span>
                    </Link>
                  </motion.div>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
