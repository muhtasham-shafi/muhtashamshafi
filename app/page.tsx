import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Cpu, Globe, Mail, MapPin, Trophy } from "lucide-react";
import {
  awards,
  clientWork,
  heroBadge,
  miracleRobotics,
  profile,
  projects,
  representedAt,
  services,
  socials,
  stats,
  timeline,
} from "@/lib/content";
import { sortedPosts } from "@/lib/posts";
import { AwardList, Button, Container, PostList, ProjectCard, Section } from "@/components/ui";
import MiracleMark from "@/components/MiracleMark";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 md:grid-cols-[1fr_auto]">
          <div>
            <Link
              href="/miracle-robotics"
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-bg/80 py-1.5 pl-2 pr-4 text-sm backdrop-blur transition-colors hover:border-accent/50"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white">
                <MiracleMark className="h-3.5 w-auto" />
              </span>
              <span>
                Founder, <span className="font-medium">Miracle Robotics</span>
              </span>
              <ArrowUpRight size={14} className="text-muted" />
            </Link>
            <h1 className="font-serif text-5xl leading-[1.02] sm:text-7xl">
              <Tagline text={profile.tagline} highlight="one prototype" />
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/work">See my work</Button>
              <Button href="#contact" variant="secondary">
                Work with me
              </Button>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} className="text-accent" />
              {profile.location} · {profile.role}
            </p>
          </div>
          <div className="relative mx-auto w-60 sm:w-72 md:mx-0">
            <div aria-hidden className="absolute -inset-3 -z-10 rotate-3 rounded-[1.75rem] bg-accent/10" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-line shadow-xl shadow-text/10">
              <Image src={profile.photo} alt={profile.name} fill priority sizes="288px" className="object-cover" />
            </div>
            <div className="float absolute -bottom-5 -left-6 flex items-center gap-3 rounded-2xl border border-line bg-bg/95 px-4 py-3 shadow-lg shadow-text/10 backdrop-blur">
              <Trophy size={18} className="shrink-0 text-accent" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">{heroBadge.label}</p>
                <p className="text-xs text-muted">{heroBadge.detail}</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Stats + where I've been */}
      <Container>
        <dl className="grid grid-cols-3 gap-4 border-t border-line pt-10">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-serif text-5xl text-accent sm:text-6xl">{s.value}</dd>
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-10 pb-12">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Represented Bangladesh &amp; took part in</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {representedAt.map((r) => (
              <li key={r} className="font-serif text-xl text-text/70 sm:text-2xl">
                {r}
              </li>
            ))}
          </ul>
        </div>
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
          {services.map((s, i) => {
            const Icon = serviceIcons[i] ?? Cpu;
            return (
            <div
              key={s.title}
              className="rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon size={20} />
              </span>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.summary}</p>
            </div>
            );
          })}
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
      <section className="border-t border-line py-16 sm:py-24">
        <Container className="reveal">
          <div className="relative grid overflow-hidden rounded-3xl bg-[#071a3d] text-white md:grid-cols-[1.1fr_1fr]">
            <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-60 [--accent:#6fa8ff]" />
            <div className="relative p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white">
                  <MiracleMark className="h-6 w-auto" />
                </span>
                <div className="leading-tight">
                  <p className="text-lg font-semibold tracking-wide">MIRACLE</p>
                  <p className="text-xs tracking-[0.35em] text-[#8fb8ff]">ROBOTICS</p>
                </div>
              </div>
              <p className="mt-8 text-sm font-medium text-[#8fb8ff]">Founded {miracleRobotics.founded}</p>
              <p className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{miracleRobotics.oneLiner}</p>
              <p className="mt-4 text-white/70">{miracleRobotics.mission}</p>
              <Link
                href="/miracle-robotics"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#071a3d] transition-opacity hover:opacity-90"
              >
                About the company <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative min-h-64">
              <Image
                src={miracleRobotics.image}
                alt="Miracle Robotics"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#071a3d] via-[#071a3d]/10 to-transparent max-md:bg-gradient-to-b" />
            </div>
          </div>
        </Container>
      </section>

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
      <section id="contact" className="scroll-mt-20 border-t border-line py-16 sm:py-24">
        <Container className="reveal">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-14">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
        <div className="relative">
        <p className="mb-3 text-sm font-medium text-accent">Contact</p>
        <h2 className="max-w-2xl font-serif text-5xl leading-[1.05] sm:text-6xl">
          Let&apos;s build <em className="text-accent">something.</em>
        </h2>
        <p className="mt-5 max-w-xl text-lg text-muted">
          Hiring, partnering, investing, or just want to talk robots? Email is the fastest way to reach me.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex max-w-full items-center gap-3 break-all rounded-full bg-text px-6 py-4 font-medium text-bg transition hover:-translate-y-0.5 hover:opacity-90"
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
                className="inline-block rounded-full border border-line bg-bg px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        </div>
        </div>
        </Container>
      </section>
    </>
  );
}

const serviceIcons = [Globe, Bot, Cpu];

/** Renders the tagline with one phrase set in accent italics. */
function Tagline({ text, highlight }: { text: string; highlight: string }) {
  const i = text.indexOf(highlight);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em className="text-accent">{highlight}</em>
      {text.slice(i + highlight.length)}
    </>
  );
}
