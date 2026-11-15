import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const base = "https://muhtashamshafi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/awards", "/miracle-robotics", "/writing"].map((path) => ({
    url: base + path,
    lastModified: new Date(),
  }));
  const postPages = posts.map((p) => ({
    url: `${base}/writing/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...pages, ...postPages];
}
