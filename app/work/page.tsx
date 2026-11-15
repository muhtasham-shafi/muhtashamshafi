import type { Metadata } from "next";
import Image from "next/image";
import { clientWork, projects, services } from "@/lib/content";
import { ArrowLink, Button, PageHeader, ProjectCard, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Robotics, AI and web projects by Muhtasham Shafi.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work"
        intro="Hardware prototypes, AI systems and websites — from my first line-follower to client platforms in production."
      />

      <Section title="Prototypes" intro="Six working prototypes, each aimed at a real problem in Bangladesh.">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section title="Client work">
        {clientWork.map((c) => (
          <div key={c.title} className="grid overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-2">
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-sm text-muted">Website · Live</p>
              <h3 className="mt-2 font-serif text-3xl sm:text-4xl">{c.title}</h3>
              <p className="mt-3 text-muted">{c.summary}</p>
              <div className="mt-6">
                <ArrowLink href={c.href}>Visit site</ArrowLink>
              </div>
            </div>
            <div className="relative aspect-[16/10] bg-line md:aspect-auto">
              <Image src={c.image} alt={`${c.title} website`} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover object-top" />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Services">
        <div className="grid gap-6 sm:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.summary}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/#contact">Start a project</Button>
        </div>
      </Section>
    </>
  );
}
