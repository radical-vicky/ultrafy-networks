import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "700"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ultrafynetworks.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ultrafy Networks | Fiber & Wireless Internet Provider in Thika",
    template: "%s | Ultrafy Networks",
  },
  description:
    "Ultrafy Networks provides fast, reliable fiber and wireless internet in Thika, Kenya, plus hotspots, CCTV installation, access control, solar power and electric fencing. Packages from KES 1,500/month.",
  keywords: [
    "internet provider Thika",
    "fiber internet Thika",
    "wireless internet Thika",
    "Ultrafy Networks",
    "ISP Thika Kenya",
    "CCTV installation Thika",
    "solar installation Thika",
    "cheap internet Kenya",
  ],
  authors: [{ name: "Ultrafy Networks" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Ultrafy Networks",
    title: "Ultrafy Networks | Fiber & Wireless Internet Provider in Thika",
    description:
      "Fast, reliable fiber and wireless internet in Thika, plus CCTV, access control, solar and electric fencing installation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultrafy Networks | Internet Provider in Thika",
    description: "Fast, reliable fiber and wireless internet in Thika, Kenya. Packages from KES 1,500/month.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
