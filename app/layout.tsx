import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-bg antialiased">{children}</body>
    </html>
  );
}
