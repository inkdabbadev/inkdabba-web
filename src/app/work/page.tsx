import type { Metadata } from "next";
import Navigation from "@/components/global/Navigation";
import SiteFooter from "@/components/global/SiteFooter";
import SelectedWorkSection from "@/components/sections/SelectedWorkSection";
import { getLogoAssets } from "@/lib/logo-assets";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Work",
  description: "Browse the visual archive. Poster, Banner, Logo, Package.",
  path: "/work",
  keywords: ["INK DABBA work", "poster design portfolio", "logo and packaging portfolio"],
  image: "/image/generated/nightlife.png",
});

export default async function WorkPage() {
  const logoAssets = await getLogoAssets();

  return (
    <div data-nav-theme="light" className="bg-paper-soft text-ink min-h-screen">
      
      <main className="pt-20 pb-18 md:pt-24 md:pb-24">
        <SelectedWorkSection logoAssets={logoAssets} />
      </main>
      <SiteFooter />
    </div>
  );
}
