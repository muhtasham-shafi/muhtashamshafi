import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { themeScript } from "@/lib/theme";
import { openGraphDefaults, siteUrl } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f4f6fa",
};

// One variable family; the width axis gives display, body and label widths.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: {
    default: "Muhtasham Shafi | Student Innovator & Developer",
    template: "%s | Muhtasham Shafi",
  },
  description:
    "Portfolio of Muhtasham Shafi — young Bangladeshi engineer building robotics, AI, and software for real-world impact. Founder of Miracle Robotics.",

  metadataBase: new URL(siteUrl),

  openGraph: { ...openGraphDefaults, url: siteUrl },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${archivo.variable} font-sans antialiased bg-bg text-text`}
      >
        <StructuredData />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
