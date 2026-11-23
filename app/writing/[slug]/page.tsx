import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { openGraphDefaults } from "@/lib/site";
import { formatDate, getPost, posts } from "@/lib/posts";
import { ArrowLink, Container } from "@/components/ui";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      ...openGraphDefaults,
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/writing/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Container className="max-w-2xl py-16 sm:py-24">
      <ArrowLink href="/writing">All posts</ArrowLink>
      <p className="mt-10 text-sm text-muted">{formatDate(post.date)}</p>
      <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg text-muted">{post.summary}</p>
      <div className="mt-10 space-y-5 border-t border-line pt-10 text-lg leading-relaxed">
        {post.body.map((b, i) =>
          typeof b === "string" ? (
            <p key={i}>{b}</p>
          ) : (
            <h2 key={i} className="pt-4 font-serif text-2xl sm:text-3xl">
              {b.h}
            </h2>
          )
        )}
      </div>
    </Container>
  );
}
