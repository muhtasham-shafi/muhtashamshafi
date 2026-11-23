import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Award, Build, Project } from "@/lib/content";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-5xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  action,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-16 sm:py-24">
      <Container className="reveal">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-medium text-accent">{eyebrow}</p>
            )}
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{title}</h2>
            {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
          </div>
          {action && <ArrowLink href={action.href}>{action.label}</ArrowLink>}
        </div>
        {children}
      </Container>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  badge,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  badge?: React.ReactNode;
}) {
  return (
    <Container className="pb-12 pt-16 sm:pb-16 sm:pt-24">
      {badge && <div className="mb-6">{badge}</div>}
      {eyebrow && <p className="mb-3 text-sm font-medium text-accent">{eyebrow}</p>}
      <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl">{title}</h1>
      {intro && <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">{intro}</p>}
    </Container>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-text hover:text-accent"
    >
      {children}
      <Icon size={16} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition",
        variant === "primary"
          ? "bg-text text-bg hover:opacity-85"
          : "border border-line bg-surface hover:border-text"
      )}
    >
      {children}
    </Link>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-line">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 480px, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-bg/90 px-3 py-1 text-xs font-medium text-text backdrop-blur">
          {project.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-accent">{project.category}</p>
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-muted">{project.summary}</p>
        <dl className="mt-5 flex gap-6 border-t border-line pt-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-serif text-3xl leading-none">{m.value}</dd>
              <dd className="mt-1 text-xs text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export function BuildCard({ build }: { build: Build }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-bg">
      <div className="relative aspect-[4/3] bg-surface">
        {build.image ? (
          <Image
            src={build.image}
            alt={build.title}
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover"
            style={build.position ? { objectPosition: build.position } : undefined}
          />
        ) : (
          <div className="flex h-full items-end p-6">
            <span className="font-serif text-4xl leading-tight text-accent">{build.title}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted">
          {build.year} · {build.category}
        </p>
        <h3 className="mt-2 font-semibold">{build.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{build.summary}</p>
        {build.result && <p className="mt-4 text-sm font-medium text-accent">{build.result}</p>}
      </div>
    </article>
  );
}

export function AwardList({ items }: { items: Award[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((a) => (
        <li
          key={a.year + a.title}
          className="grid grid-cols-[3.5rem_1fr] gap-4 py-5 sm:grid-cols-[5rem_1fr_auto] sm:items-center"
        >
          <span className="font-serif text-2xl leading-none text-muted">{a.year}</span>
          <div>
            <p className="font-medium">{a.title}</p>
            <p className="mt-1 text-sm text-muted">{a.detail}</p>
          </div>
          <span className="col-start-2 sm:col-start-auto">
            <Tag>{a.kind}</Tag>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PostList({ items }: { items: Post[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((p) => (
        <li key={p.slug}>
          <Link href={`/writing/${p.slug}`} className="group block py-6">
            <p className="text-sm text-muted">{formatDate(p.date)}</p>
            <h3 className="mt-1 text-xl font-semibold group-hover:text-accent">{p.title}</h3>
            <p className="mt-2 max-w-2xl text-muted">{p.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
