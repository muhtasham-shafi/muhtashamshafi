import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Award, Build, Project } from "@/lib/content";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

/**
 * A datasheet row: the section title sits in a 4-column gutter (sticky on
 * large screens) and the content runs in the 8 columns beside it.
 */
export function Section({
  id,
  title,
  intro,
  action,
  children,
}: {
  id?: string;
  title: string;
  intro?: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line">
      <Container className="grid gap-x-10 gap-y-8 py-16 sm:py-20 lg:grid-cols-12">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h2 className="font-serif text-[2.25rem] leading-none sm:text-[2.75rem]">{title}</h2>
            {intro && <p className="mt-3 max-w-sm text-muted">{intro}</p>}
            {action && (
              <p className="mt-5">
                <TextLink href={action.href}>{action.label}</TextLink>
              </p>
            )}
          </div>
        </header>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </Container>
    </section>
  );
}

export function PageHeader({
  title,
  intro,
  badge,
}: {
  title: string;
  intro?: string;
  badge?: React.ReactNode;
}) {
  return (
    <Container className="pb-14 pt-14 sm:pb-20 sm:pt-20">
      {badge && <div className="assemble mb-8">{badge}</div>}
      <h1 className="assemble max-w-[18ch] font-serif text-[clamp(2.75rem,8vw,6rem)] leading-[1.02]">{title}</h1>
      {intro && (
        <p className="assemble mt-6 max-w-[58ch] text-lg text-muted sm:text-xl" style={{ "--d": "120ms" } as React.CSSProperties}>
          {intro}
        </p>
      )}
    </Container>
  );
}

/** Underlined text link. External links open in a new tab and say so with an icon. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn("link inline-flex items-center gap-1 font-medium", className)}
    >
      {children}
      {external && (
        <>
          <ArrowUpRight size={15} aria-hidden className="shrink-0" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </Link>
  );
}

/** Primary actions are cut like the logo; secondary actions are plain links. */
export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  if (variant === "secondary") {
    return (
      <Link href={href} className="link inline-flex items-center px-1 py-3 font-medium">
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="chamfer inline-flex items-center bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors [--cut:10px] hover:bg-text hover:text-bg"
    >
      {children}
    </Link>
  );
}

/** The red disc of the Bangladesh flag — marks what is happening now. */
export function SignalDot({ label = "Latest" }: { label?: string }) {
  return (
    <span className="inline-block h-2.5 w-2.5 shrink-0 translate-y-[-1px] rounded-full bg-signal" role="img" aria-label={label} />
  );
}

export type SpecRow = { key: string; value: React.ReactNode; now?: boolean };

/** Key/value rows, set like a component datasheet. */
export function SpecSheet({ rows, className }: { rows: SpecRow[]; className?: string }) {
  return (
    <dl className={cn("border-t border-line text-[0.9375rem]", className)}>
      {rows.map((r) => (
        <div
          key={r.key}
          className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] gap-4 border-b border-line py-2.5 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]"
        >
          <dt className="type-label text-muted">{r.key}</dt>
          <dd className="flex items-baseline gap-2 tabular-nums">
            {r.now && <SignalDot />}
            <span>{r.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A prototype, laid out as a catalogue entry: photo beside its datasheet. */
export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="grid gap-5 border-t border-line py-9 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-surface">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        <p className="type-label flex flex-wrap gap-x-3 text-muted">
          <span>{project.category}</span>
          <span className="text-accent">{project.status}</span>
        </p>
        <h3 className="type-heading mt-1.5 text-2xl">{project.title}</h3>
        <p className="mt-2 max-w-[60ch] text-muted">{project.summary}</p>
        <SpecSheet className="mt-5" rows={project.metrics.map((m) => ({ key: m.label, value: m.value }))} />
      </div>
    </article>
  );
}

/** Printer's crop marks at the four corners of a plate. */
export function CropMarks() {
  const mark = "pointer-events-none absolute h-3 w-3 border-text/45";
  return (
    <>
      <span aria-hidden className={cn(mark, "-left-2 -top-2 border-l border-t")} />
      <span aria-hidden className={cn(mark, "-right-2 -top-2 border-r border-t")} />
      <span aria-hidden className={cn(mark, "-bottom-2 -left-2 border-b border-l")} />
      <span aria-hidden className={cn(mark, "-bottom-2 -right-2 border-b border-r")} />
    </>
  );
}

/** A prototype as a cyanotype plate; hover develops the real photo. */
export function ProjectPlate({ project }: { project: Project }) {
  return (
    <article className="group">
      <div className="relative">
        <CropMarks />
        <div className="cyanotype aspect-[4/3]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <p className="type-label mt-5 flex flex-wrap gap-x-3 text-muted">
        <span>{project.category}</span>
        <span className="text-accent">{project.status}</span>
      </p>
      <h3 className="type-heading mt-1 text-xl">{project.title}</h3>
      <p className="mt-2 text-[0.9375rem] text-muted">{project.summary}</p>
      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {project.metrics.map((m) => (
          <div key={m.label} className="flex flex-col-reverse">
            <dt className="type-label text-sm text-muted">{m.label}</dt>
            <dd className="font-serif text-3xl leading-none tabular-nums">{m.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function BuildEntry({ build }: { build: Build }) {
  return (
    <article className="flex flex-col border-t border-line pt-5">
      {build.image && (
        <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[3px] bg-surface">
          <Image
            src={build.image}
            alt={build.title}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            style={build.position ? { objectPosition: build.position } : undefined}
          />
        </div>
      )}
      <p className="type-label flex gap-3 text-muted">
        <span className="tabular-nums">{build.year}</span>
        <span>{build.category}</span>
      </p>
      <h3 className="type-heading mt-1.5 text-xl">{build.title}</h3>
      <p className="mt-2 text-[0.9375rem] text-muted">{build.summary}</p>
      {build.result && <p className="mt-3 text-[0.9375rem] font-semibold text-accent">{build.result}</p>}
    </article>
  );
}

export function AwardList({ items }: { items: Award[] }) {
  return (
    <ol className="border-b border-line">
      {items.map((a) => (
        <li
          key={a.year + a.title}
          className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-t border-line py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)_7rem] sm:items-baseline"
        >
          <span className="type-heading text-lg tabular-nums">{a.year}</span>
          <div>
            <p className="font-semibold">{a.title}</p>
            <p className="mt-0.5 text-[0.9375rem] text-muted">{a.detail}</p>
          </div>
          <span className="type-label col-start-2 text-muted sm:col-start-auto sm:text-right">{a.kind}</span>
        </li>
      ))}
    </ol>
  );
}

export function PostList({ items }: { items: Post[] }) {
  return (
    <ul className="border-b border-line">
      {items.map((p) => (
        <li key={p.slug} className="border-t border-line">
          <Link href={`/writing/${p.slug}`} className="group block py-6">
            <p className="type-label text-muted">{formatDate(p.date)}</p>
            <h3 className="type-heading mt-1.5 text-xl transition-colors group-hover:text-accent sm:text-2xl">
              {p.title}
            </h3>
            <p className="mt-2 max-w-[62ch] text-muted">{p.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
