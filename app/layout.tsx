import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Muhtasham Shafi | Student Innovator & Developer",
    template: "%s | Muhtasham Shafi",
  },
  description:
    "Portfolio of Muhtasham Shafi — young Bangladeshi engineer building robotics, AI, and software for real-world impact. Founder of Miracle Robotics.",

  metadataBase: new URL("https://muhtashamshafi.com"),

  openGraph: {
    title: "Muhtasham Shafi",
    description: "Robotics, AI & Software Projects",
    url: "https://muhtashamshafi.com",
    siteName: "Muhtasham Shafi Portfolio",
    type: "website",
    images: [
      {
        url: "https://muhtashamshafi.com/og-v2.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} font-sans antialiased bg-bg text-text`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
