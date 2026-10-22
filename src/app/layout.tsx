import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/motion/Preloader";
import { Cursor } from "@/components/motion/Cursor";
import { SceneLayer } from "@/components/three/SceneLayer";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";

// Brand typography: Outfit for body and interface, Press Start 2P for pixel headlines.
const outfit = localFont({
  src: "../fonts/outfit.woff2",
  variable: "--font-outfit",
  weight: "100 900",
  display: "swap",
});
const pressStart = localFont({
  src: "../fonts/press-start-2p.woff2",
  variable: "--font-press-start",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.meta.title, template: `%s | ${site.name}` },
  description: home.meta.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: ["digital agency Pakistan", "AI chatbots", "Shopify development", "WordPress development", "Local SEO", "Google Business Profile", "Meta ads", "mobile app development", "online store setup"],
};

export const viewport: Viewport = {
  themeColor: "#2A1245",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${pressStart.variable}`}>
      <body>
        <SmoothScroll>
          <Preloader />
          <SceneLayer />
          <Navbar />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
          <div className="grain" aria-hidden />
          <Cursor />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
