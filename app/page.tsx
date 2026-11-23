import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import {
  awards,
  clientWork,
  miracleRobotics,
  profile,
  projects,
  services,
  socials,
  stats,
  timeline,
} from "@/lib/content";
import { sortedPosts } from "@/lib/posts";
import { ArrowLink, AwardList, Button, Container, PostList, ProjectCard, Section } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Container className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-4 text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] sm:text-7xl">{profile.tagline}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/work">See my work</Button>
            <Button href="#contact" variant="secondary">
              Work with me
            </Button>
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-56 overflow-hidden rounded-2xl bg-line sm:w-72 md:mx-0">
          <Image src={profile.photo} alt={profile.name} fill priority sizes="288px" className="object-cover" />
        </div>
      </Container>

      {/* Stats */}
      <Container>
        <dl className="grid grid-cols-3 gap-4 border-t border-line py-8">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-serif text-4xl sm:text-5xl">{s.value}</dd>
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>

      {/* About */}
      <Section id="about" eyebrow="About" title="Building systems, not just code.">
        <div className="grid gap-10 md:grid-cols-[1fr_20rem]">
          <div className="space-y-5 text-lg text-muted">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-line">
            <Image src={profile.photoAlt} alt={`${profile.name} at work`} fill sizes="320px" className="object-cover" />
          </div>
        </div>
      </Section>

      {/* Selected work */}
      <Section
        eyebrow="Portfolio"
        title="Selected work"
        intro="Prototypes I've designed and built, aimed at real problems in Bangladesh."
        action={{ label: "All projects", href: "/work" }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(0, 4).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* Client work + services */}
      <Section
        id="services"
        eyebrow="Services"
        title="What I can build for you"
        action={{ label: "Get a quote", href: "#contact" }}
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.summary}</p>
            </div>
          ))}
        </div>
        {clientWork.map((c) => (
          <a
            key={c.title}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 grid overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-2"
          >
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-sm text-muted">Client project · Live</p>
              <h3 className="mt-2 flex items-center gap-2 font-serif text-3xl sm:text-4xl">
                {c.title}
                <ArrowUpRight size={22} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </h3>
              <p className="mt-3 text-muted">{c.summary}</p>
            </div>
            <div className="relative aspect-[16/10] bg-line md:aspect-auto">
              <Image src={c.image} alt={`${c.title} website`} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover object-top" />
            </div>
          </a>
        ))}
      </Section>

      {/* Awards */}
      <Section
        eyebrow="Recognition"
        title="Awards & achievements"
        action={{ label: "See all", href: "/awards" }}
      >
        <AwardList items={awards.slice(0, 4)} />
      </Section>

      {/* Miracle Robotics */}
      <Section eyebrow={`Founded ${miracleRobotics.founded}`} title={miracleRobotics.name}>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xl">{miracleRobotics.oneLiner}</p>
            <p className="mt-4 text-muted">{miracleRobotics.mission}</p>
            <div className="mt-6">
              <ArrowLink href="/miracle-robotics">About the company</ArrowLink>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-line">
            <Image src={miracleRobotics.image} alt="Miracle Robotics" fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      {/* Journey */}
      <Section id="journey" eyebrow="Journey" title="How I got here">
        <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
          {timeline.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[39px]" />
              <p className="font-serif text-2xl leading-none text-muted">{t.year}</p>
              <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>
              <p className="mt-1 max-w-2xl text-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Writing */}
      <Section eyebrow="Writing" title="Notes & updates" action={{ label: "All posts", href: "/writing" }}>
        <PostList items={sortedPosts().slice(0, 3)} />
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Contact" title="Let's build something.">
        <p className="max-w-xl text-lg text-muted">
          Hiring, partnering, investing, or just want to talk robots? Email is the fastest way to reach me.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex max-w-full items-center gap-3 break-all rounded-full bg-text px-6 py-4 font-medium text-bg hover:opacity-85"
        >
          <Mail size={18} className="shrink-0" />
          {profile.email}
        </a>
        <ul className="mt-8 flex flex-wrap gap-3">
          {socials.map((s) => (
            <li key={s.name}>
              <Link
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-line px-4 py-2 text-sm hover:border-text"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
