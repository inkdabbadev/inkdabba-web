import type { Metadata } from "next";
import { contactDetails, seoDescription } from "@/data/site-content";
import { createMetadata, SITE_URL } from "@/lib/seo";
export const metadata: Metadata = {
  ...createMetadata({
    title: "INK DABBA | Design-Led Creative Studio, Chennai",
    description: seoDescription,
    path: "/",
    keywords: [
      "design-led creative studio",
      "branding studio Chennai",
      "digital design agency India",
      "campaign creative studio",
      "visual branding Chennai",
    ],
    image: "/image/generated/agni_masala.png",
  }),
  title: {
    absolute: "INK DABBA | Design-Led Creative Studio, Chennai",
  },
};

import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import SignatureBand from "@/components/home/SignatureBand";
import ClientSection from "@/components/home/ClientSection";
import InterludeSection from "@/components/home/InterludeSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/global/Footer";

export default async function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeAgency",
    name: "INK DABBA",
    description: seoDescription,
    url: SITE_URL,
    email: contactDetails.email,
    telephone: contactDetails.phoneNumbers,
    slogan: "Design-led studio in Chennai",
    image: `${SITE_URL}/image/generated/agni_masala.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactDetails.addressLine1,
      addressRegion: "Tamil Nadu",
      postalCode: "600040",
      addressLocality: "Chennai",
      addressCountry: "IN",
    },
    areaServed: "India",
    knowsAbout: [
      "Brand identity",
      "Poster design",
      "Campaign creatives",
      "Banner systems",
      "Digital marketing design support",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex flex-col bg-ink-black text-warm-white">
        <HeroSection />

        {/* ClientSection moved right after Hero as requested */}
        <ClientSection />

        <InterludeSection
          texts={[
            "NOT EVERY DESIGN NEEDS EXPLANATION.",
            "SOME BRANDS WHISPER.",
            "WE MAKE THEM LOUD.",
            "KEEP SCROLLING"
          ]}
        />

        <SelectedWorkSection />

        <SignatureBand />

        <ContactSection />

        <Footer />
      </main>
    </>
  );
}
