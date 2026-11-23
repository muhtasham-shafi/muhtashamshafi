import type { Metadata } from "next";

/**
 * The site's real address. The bare domain (muhtashamshafi.com) redirects
 * here, so every absolute URL — canonical tags, sitemap, social previews —
 * should use this one to keep search engines from splitting ranking.
 */
export const siteUrl = "https://www.muhtashamshafi.com";

/**
 * Shared social-preview settings. A page that sets its own `openGraph`
 * replaces the layout's whole object, so spread these in and override `url`.
 */
export const openGraphDefaults = {
  title: "Muhtasham Shafi",
  description: "Robotics, AI & Software Projects",
  siteName: "Muhtasham Shafi Portfolio",
  type: "website",
  locale: "en_US",
  images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
} satisfies NonNullable<Metadata["openGraph"]>;
