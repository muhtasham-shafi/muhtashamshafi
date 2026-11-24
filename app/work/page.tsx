import type { Metadata } from "next";
import { openGraphDefaults } from "@/lib/site";
import Image from "next/image";
import { builds, clientWork, projects, services } from "@/lib/content";
import { BuildEntry, Button, PageHeader, ProjectEntry, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  openGraph: { ...openGraphDefaults, url: "/work" },
  title: "Work",
  description: "Robotics, AI and web projects by Muhtasham M. Shafi.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work"
        intro="Hardware prototypes, AI systems and websites — from my first line-follower to client platforms in production."
      />

      <Section title="Prototypes" intro={`${projects.length} working prototypes, each aimed at a real problem in Bangladesh.`}>
        {projects.map((p) => (
          <ProjectEntry key={p.slug} project={p} />
        ))}
      </Section>

      <Section
        title="Robots and other builds"
        intro="Competition robots for Team Bangladesh, my AI assistant, and the builds that got me here."
      >
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {builds.map((b) => (
            <BuildEntry key={b.title} build={b} />
          ))}
        </div>
      </Section>

      <Section title="Client work">
        {clientWork.map((c) => (
          <article key={c.title}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[3px] border border-line bg-surface">
              <Image
                src={c.image}
                alt={`${c.title} website`}
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <h3 className="type-heading mt-5 text-2xl">{c.title}</h3>
            <p className="mt-1 max-w-[56ch] text-muted">{c.summary}</p>
            <p className="mt-4">
              <TextLink href={c.href}>Visit {c.title}</TextLink>
            </p>
          </article>
        ))}
      </Section>

      <Section title="Services">
        <ul className="border-b border-line">
          {services.map((s) => (
            <li
              key={s.title}
              className="grid gap-1.5 border-t border-line py-5 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-8"
            >
              <h3 className="type-heading text-lg">{s.title}</h3>
              <p className="max-w-[56ch] text-muted">{s.summary}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href="/#contact">Start a project</Button>
        </div>
      </Section>
    </>
  );
}
