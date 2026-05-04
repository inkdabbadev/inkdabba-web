"use client";

import FadeIn from "@/components/home/FadeIn";
import MaskedHeading from "@/components/motion/MaskedHeading";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import ContactFormCard from "@/components/sections/ContactFormCard";
import { contactDetails } from "@/data/site-content";

const defaultHeadlineLines = ["IF YOU NEED", "A STRONGER", "VISUAL DIRECTION,", "LET'S TALK."];
const simpleHeadlineRows = ["IF YOU'RE LOOKING", "FOR A", "GROWTH PARTNER,", "LET'S TALK."];
const simpleSublineRows = [
  "We don't do retainers for the sake of it.",
  "We work with brands that are serious",
  "about growth and are willing to move fast.",
];

type ContactSectionProps = {
  mode?: "default" | "simple";
};

export default function ContactSection({ mode = "default" }: ContactSectionProps) {
  const isSimple = mode === "simple";

  if (isSimple) {
    return (
      <section id="contact" data-nav-theme="light" className="relative overflow-hidden bg-[#F9665B]">
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 py-14 md:px-10 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_47rem] lg:items-center lg:gap-16">
            <div className="max-w-[40rem] pt-4 lg:pt-16">
              <Reveal preset="fadeUp" className="brand-kicker text-ink/56">
                Ready to start
              </Reveal>

              <MaskedHeading
                lines={simpleHeadlineRows}
                as="h1"
                className="brand-display mt-5 max-w-[38rem] text-[clamp(3.2rem,6vw,5.7rem)] text-ink"
                lineClassName="block"
                wordClassName="inline-block"
              />

              <div className="brand-body-copy mt-8 max-w-[24rem] text-[1.02rem] text-ink/72">
                {simpleSublineRows.map((line, index) => (
                  <Reveal
                    key={line}
                    preset="clipUp"
                    as="div"
                    className="overflow-hidden"
                    delay={0.18 + index * 0.08}
                  >
                    <p>
                      {line}
                    </p>
                  </Reveal>
                ))}
              </div>

              <div className="mt-8 space-y-1.5 text-[0.96rem] text-ink/72">
                <Magnetic as="div" strength={0.1} dataCursor="link">
                  <a
                    href={`mailto:${contactDetails.email}`}
                    data-cursor="link"
                    className="block w-fit transition-colors hover:text-ink"
                  >
                    {contactDetails.email}
                  </a>
                </Magnetic>
                <Magnetic as="div" strength={0.1} dataCursor="link">
                  <a
                    href={`tel:${contactDetails.primaryPhone.replace(/\s+/g, "")}`}
                    data-cursor="link"
                    className="block w-fit transition-colors hover:text-ink"
                  >
                    {contactDetails.primaryPhone}
                  </a>
                </Magnetic>
                <p>{contactDetails.address}</p>
              </div>
            </div>

            <FadeIn>
              <ContactFormCard mode="simple" showContactDetails={false} />
            </FadeIn>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" data-nav-theme="light" className="relative overflow-hidden bg-[#F9665B]">
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1280px] items-center px-6 py-16 md:px-8 md:py-20">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,24rem)_38rem] lg:items-center lg:justify-between lg:gap-12">
          <div className="w-full max-w-[36rem]">
            <div className="px-1 py-2 lg:pl-2">
              <Reveal preset="fadeUp" className="brand-kicker mb-4 text-ink/80 md:mb-5 lg:text-[0.88rem]">
                Ready to start
              </Reveal>

              <MaskedHeading
                lines={defaultHeadlineLines}
                as="h2"
                className="brand-display text-[2.4rem] text-ink md:text-[2.8rem] lg:text-[3.35rem]"
                lineClassName="block"
                wordClassName="inline-block"
              />

              <Reveal
                preset="fadeBlur"
                delay={0.18}
                className="brand-body-copy mt-4 max-w-[420px] text-ink/65 md:mt-6 md:text-[1.05rem]"
              >
                Branding, campaigns, packaging, digital design, and launch support for brands
                that want sharper work and cleaner direction.
              </Reveal>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.35rem] border border-black/10 bg-white/20 px-4 py-4 backdrop-blur-sm">
                  <p className="brand-chip text-ink/42">Reach us</p>
                  <Magnetic as="div" strength={0.1} dataCursor="link">
                    <a
                      href={`mailto:${contactDetails.email}`}
                      data-cursor="link"
                      className="mt-2 block text-[1rem] font-semibold text-ink transition-colors hover:text-white"
                    >
                      {contactDetails.email}
                    </a>
                  </Magnetic>
                  <Magnetic as="div" strength={0.1} dataCursor="link">
                    <a
                      href={`tel:${contactDetails.primaryPhone.replace(/\s+/g, "")}`}
                      data-cursor="link"
                      className="mt-1 block text-[0.98rem] font-semibold text-ink transition-colors hover:text-white"
                    >
                      {contactDetails.primaryPhone}
                    </a>
                  </Magnetic>
                </div>

                <div className="rounded-[1.35rem] border border-black/10 bg-white/20 px-4 py-4 backdrop-blur-sm">
                  <p className="brand-chip text-ink/42">Studio base</p>
                  <p className="mt-2 text-[1rem] font-semibold leading-snug text-ink">
                    {contactDetails.addressLine1}
                  </p>
                  <p className="text-[0.94rem] leading-snug text-ink/72">
                    {contactDetails.addressLine2}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <FadeIn>
            <ContactFormCard mode={mode} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
