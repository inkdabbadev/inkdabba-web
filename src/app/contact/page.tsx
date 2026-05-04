import type { Metadata } from "next";
import Navigation from "@/components/global/Navigation";
import SiteFooter from "@/components/global/SiteFooter";
import ContactSection from "@/components/sections/ContactSection";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with Chennai's design-led creative studio.",
  path: "/contact",
  keywords: ["contact INK DABBA", "hire branding studio Chennai", "creative studio contact"],
  image: "/image/generated/food.png",
});

export default function ContactPage() {
  return (
    <div data-nav-theme="light" className="relative min-h-screen overflow-hidden bg-[#F9665B] text-ink">

      <main className="relative z-10 pt-18 pb-10 md:pt-24 md:pb-16">
        <ContactSection mode="simple" />
      </main>
      <SiteFooter />
    </div>
  );
}
