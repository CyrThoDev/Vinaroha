import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { workSans, leagueGothic, urbanist, lovelo, avallon, fontjek, caveat } from "./fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vinaroha.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vin'Aroha — Cave à vins naturels, Mimizan (Landes)",
    template: "%s | Vin'Aroha",
  },
  description:
    "Vin'Aroha, votre cave à vins naturels et de terroir à Mimizan (Landes). Dégustations, masterclasses, rencontres producteurs, box vin mensuelle et sélection de producteurs engagés.",
  keywords: ['cave à vin', 'Mimizan', 'Landes', 'vin naturel', 'vin nature', 'dégustation', 'producteur', 'box vin'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: "Vin'Aroha",
    title: "Vin'Aroha — Cave à vins naturels, Mimizan",
    description:
      "Cave à vins naturels et de terroir à Mimizan (Landes). Dégustations, masterclasses, box vin mensuelle.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: "Vin'Aroha — Cave à vins, Mimizan" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vin'Aroha — Cave à vins, Mimizan",
    description: "Cave à vins naturels à Mimizan (Landes). Dégustations, masterclasses, box vin.",
  },
  robots:
    process.env.VERCEL_ENV === 'production'
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable} ${leagueGothic.variable} ${urbanist.variable} ${lovelo.variable} ${avallon.variable} ${fontjek.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-zinc-900">{children}</body>
    </html>
  );
}
