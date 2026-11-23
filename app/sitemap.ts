import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/awards", "/miracle-robotics", "/writing"].map((path) => ({
    url: siteUrl + path,
    lastModified: new Date(),
  }));
  const postPages = posts.map((p) => ({
    url: `${siteUrl}/writing/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...pages, ...postPages];
}
