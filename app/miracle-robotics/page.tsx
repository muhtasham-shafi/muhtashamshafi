import type { Metadata } from "next";
import { openGraphDefaults } from "@/lib/site";
import Image from "next/image";
import { miracleRobotics, profile, projects } from "@/lib/content";
import { Button, Container, PageHeader, ProjectCard, Section } from "@/components/ui";
import MiracleMark from "@/components/MiracleMark";

export const metadata: Metadata = {
  alternates: { canonical: "/miracle-robotics" },
  openGraph: { ...openGraphDefaults, url: "/miracle-robotics" },
  title: "Miracle Robotics",
  description: miracleRobotics.oneLiner,
};

export default function MiracleRoboticsPage() {
  const featured = miracleRobotics.projectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <>
      <PageHeader
        eyebrow={`Founded ${miracleRobotics.founded} · ${profile.location}`}
        title={miracleRobotics.name}
        intro={miracleRobotics.oneLiner}
        badge={
          <span className="inline-grid h-16 w-16 place-items-center rounded-2xl border border-line bg-white shadow-sm">
            <MiracleMark className="h-8 w-auto" />
          </span>
        }
      />

      <Container className="pb-16">
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-line">
          <Image src={miracleRobotics.image} alt={miracleRobotics.name} fill priority sizes="1024px" className="object-cover" />
        </div>
      </Container>

      <Section eyebrow="Mission" title="Technology that reaches the people who need it.">
        <p className="max-w-2xl text-lg text-muted">{miracleRobotics.mission}</p>
      </Section>

      <Section title="What we focus on">
        <div className="grid gap-6 sm:grid-cols-3">
          {miracleRobotics.focus.map((f, i) => (
            <div key={f.title} className="rounded-2xl border border-line bg-surface p-6">
              <p className="font-serif text-3xl text-accent">0{i + 1}</p>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What we're building">
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section title="Partner with us">
        <p className="max-w-xl text-lg text-muted">
          We&apos;re looking for partners, pilot sites and investors who want to put these systems to work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`mailto:${profile.email}?subject=Miracle%20Robotics`}>Email the founder</Button>
          <Button href="/work" variant="secondary">
            See all projects
          </Button>
        </div>
      </Section>
    </>
  );
}
