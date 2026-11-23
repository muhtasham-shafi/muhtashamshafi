import type { Metadata } from "next";
import { openGraphDefaults } from "@/lib/site";
import Image from "next/image";
import { miracleRobotics, profile, projects } from "@/lib/content";
import { Button, Container, PageHeader, ProjectEntry, Section } from "@/components/ui";
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
        title={miracleRobotics.name}
        intro={miracleRobotics.oneLiner}
        badge={
          <div className="flex items-center gap-4">
            <span className="chamfer grid h-16 w-16 place-items-center bg-white [--cut:10px]">
              <MiracleMark className="h-8 w-auto" />
            </span>
            <p className="type-label text-muted">
              Founded {miracleRobotics.founded} in {profile.location}
            </p>
          </div>
        }
      />

      <Container className="pb-16 sm:pb-20">
        <div className="chamfer relative aspect-[4/3] overflow-hidden bg-surface [--cut:36px] sm:aspect-[21/9]">
          <Image
            src={miracleRobotics.image}
            alt="The Miracle Robotics workshop"
            fill
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>

      <Section title="Mission">
        <p className="max-w-[56ch] text-xl leading-relaxed">{miracleRobotics.mission}</p>
      </Section>

      <Section title="What we focus on">
        <ul className="border-b border-line">
          {miracleRobotics.focus.map((f) => (
            <li
              key={f.title}
              className="grid gap-1.5 border-t border-line py-5 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-8"
            >
              <h3 className="type-heading text-lg">{f.title}</h3>
              <p className="max-w-[56ch] text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What we're building">
        {featured.map((p) => (
          <ProjectEntry key={p.slug} project={p} />
        ))}
      </Section>

      <Section title="Partner with us">
        <p className="max-w-[52ch] text-lg">
          We&apos;re looking for partners, pilot sites and investors who want to put these systems to work.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href={`mailto:${profile.email}?subject=Miracle%20Robotics`}>Email the founder</Button>
          <Button href="/work" variant="secondary">
            See all projects
          </Button>
        </div>
      </Section>
    </>
  );
}
