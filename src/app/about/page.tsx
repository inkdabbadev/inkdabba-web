import type { Metadata } from "next";
import SiteFooter from "@/components/global/SiteFooter";
import AboutClient from "./AboutClient";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Learn how INK DABBA grew from two creative minds in 2018 into a playful full-service studio for social media marketing, branding, website development, and graphic design.",
  path: "/about",
  keywords: ["about INK DABBA", "creative studio Chennai", "branding and social media Chennai"],
  image: "/image/generated/wild_flour.png",
});

export default function AboutPage() {
  return (
    <>
      <AboutClient />
      <SiteFooter />
    </>
  );
}
