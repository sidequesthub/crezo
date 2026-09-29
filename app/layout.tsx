import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";

// Self-hosted by Next at build time: no request to Google, no layout shift.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Crezo — The Creator's Zone",
  description:
    "Content calendar, brand deals, GST invoices, media vault — all in one app. Built for Indian creators.",
  keywords: [
    "creator tools",
    "brand deals",
    "GST invoicing",
    "content calendar",
    "Indian creators",
    "influencer management",
  ],
  openGraph: {
    title: "Crezo — Run your creator business like a pro",
    description:
      "Content calendar, brand deals, GST invoices, media vault — all in one app. Built for Indian creators.",
    url: "https://crezo.studio",
    siteName: "Crezo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${manrope.variable}`}>
      <body className="noise-bg antialiased">{children}</body>
    </html>
  );
}
