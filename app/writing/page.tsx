import type { Metadata } from "next";
import { openGraphDefaults } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
import { press } from "@/lib/content";
import { formatDate, sortedPosts } from "@/lib/posts";
import { PageHeader, PostList, Section } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/writing" },
  openGraph: { ...openGraphDefaults, url: "/writing" },
  title: "Writing & press",
  description: "Notes, updates and press coverage from Muhtasham Shafi.",
};

export default function WritingPage() {
  const sortedPress = [...press].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes & updates"
        intro="What I'm building, what I'm learning, and what went wrong along the way."
      />

      <Section title="Posts">
        <PostList items={sortedPosts()} />
      </Section>

      {sortedPress.length > 0 && (
        <Section title="Press & mentions">
          <ul className="divide-y divide-line border-y border-line">
            {sortedPress.map((p) => (
              <li key={p.href}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-4 py-5">
                  <div>
                    <p className="text-sm text-muted">
                      {p.outlet} · {formatDate(p.date)}
                    </p>
                    <p className="mt-1 font-medium group-hover:text-accent">{p.title}</p>
                  </div>
                  <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted" />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
