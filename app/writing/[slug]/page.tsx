import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { openGraphDefaults } from "@/lib/site";
import { formatDate, getPost, posts } from "@/lib/posts";
import { Container, TextLink } from "@/components/ui";

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
    <Container className="py-14 sm:py-20">
      <article className="max-w-[44rem]">
        <TextLink href="/writing">All posts</TextLink>
        <p className="type-label mt-10 text-muted">{formatDate(post.date)}</p>
        <h1 className="type-display mt-3 text-[clamp(2.25rem,6vw,3.75rem)] leading-[1]">{post.title}</h1>
        <p className="mt-5 text-xl text-muted">{post.summary}</p>
        <div className="mt-10 space-y-5 border-t border-line pt-10 text-lg leading-[1.7]">
          {post.body.map((b, i) =>
            typeof b === "string" ? (
              <p key={i}>{b}</p>
            ) : (
              <h2 key={i} className="type-heading pt-5 text-2xl">
                {b.h}
              </h2>
            )
          )}
        </div>
      </article>
    </Container>
  );
}
