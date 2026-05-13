import type { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingBadge from "@/components/global/FloatingBadge";
import SmoothScroll from "@/components/global/SmoothScroll";
import { Fredoka, Outfit } from "next/font/google";
import { seoDescription } from "@/data/site-content";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/global/CustomCursor";
import Navigation from "@/components/global/Navigation";

const fredoka = Fredoka({ 
  weight: ["400", "500", "600", "700"], 
  subsets: ["latin"], 
  variable: "--font-fredoka" 
});

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit" 
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "INK DABBA | Design-Led Creative Studio, Chennai",
    template: `%s | ${SITE_NAME}`,
  },
  description: seoDescription,
  keywords: [
    "INK DABBA",
    "design-led studio",
    "branding studio Chennai",
    "creative studio Chennai",
    "digital design studio",
    "banner design agency",
    "campaign creatives",
    "digital marketing design support",
    "visual communication studio India",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [{ url: "/logo/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/logo/favicon.svg",
    apple: "/logo/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "design",
};

export const viewport: Viewport = {
  themeColor: "#0B0A09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${outfit.variable}`}>
      <body className="relative overflow-x-hidden bg-ink-black font-body lowercase tracking-normal text-warm-white antialiased">
        
        {/* Advanced Premium Background Grid */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,174,239,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(236,0,140,0.07)_1px,transparent_1px)] bg-[size:8rem_8rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,black_10%,transparent_80%)]" />
          
          {/* CMYK press wash */}
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cmyk-cyan/5 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cmyk-magenta/5 blur-[100px] mix-blend-screen" />
        </div>

        <CursorProvider>
          <CustomCursor />
          <Navigation />
          <SmoothScroll>{children}</SmoothScroll>
          <FloatingBadge />
        </CursorProvider>
      </body>
    </html>
  );
}
