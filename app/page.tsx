import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
import {
  AwardList,
  Button,
  Container,
  PostList,
  ProjectEntry,
  Section,
  SpecSheet,
  type SpecRow,
} from "@/components/ui";
import MiracleMark from "@/components/MiracleMark";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const heroSpecs: SpecRow[] = [
  { key: "Based in", value: profile.location },
  ...stats.map((s) => ({ key: s.label, value: s.value })),
  {
    key: "Company",
    value: (
      <>
        <Link href="/miracle-robotics" className="link">
          {miracleRobotics.name}
        </Link>
        , founded {miracleRobotics.founded}
      </>
    ),
  },
  { key: "Latest", value: `${heroBadge.label}, ${heroBadge.detail}`, now: true },
  { key: "Took part in", value: representedAt.join(", ") },
];

export default function Home() {
  return (
    <>
      {/* Hero: the one loud moment on the page. */}
      <section className="border-b border-line">
        <Container className="pb-16 pt-12 sm:pb-20 sm:pt-16">
          <h1 className="assemble type-display max-w-[15ch] text-[clamp(2.75rem,9.2vw,7rem)]">{profile.tagline}</h1>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
            <div className="assemble lg:col-span-7 lg:col-start-6" style={{ "--d": "140ms" } as React.CSSProperties}>
              <p className="max-w-[52ch] text-xl leading-relaxed">{profile.intro}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href="/work">See my work</Button>
                <Button href="#contact" variant="secondary">
                  Email me
                </Button>
              </div>
              <SpecSheet className="mt-10" rows={heroSpecs} />
            </div>

            <figure
              className="assemble lg:col-span-5 lg:col-start-1 lg:row-start-1"
              style={{ "--d": "260ms" } as React.CSSProperties}
            >
              <div className="chamfer relative aspect-[4/5] max-w-xs overflow-hidden bg-surface [--cut:28px] sm:max-w-sm lg:max-w-none">
                <Image
                  src={profile.photo}
                  alt={`${profile.name} speaking`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 384px"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </Container>
      </section>

      <Section id="about" title="About">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="max-w-[62ch] space-y-5 text-lg">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-surface md:self-start">
            <Image
              src={profile.photoAlt}
              alt={`${profile.name} at work`}
              fill
              sizes="(min-width: 768px) 224px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section
        title="Prototypes"
        intro="Working machines, each aimed at a real problem in Bangladesh."
        action={{ label: `All ${projects.length} prototypes`, href: "/work" }}
      >
        {projects.slice(0, 4).map((p) => (
          <ProjectEntry key={p.slug} project={p} />
        ))}
      </Section>

      <Section
        id="services"
        title="What I build for clients"
        action={{ label: "Ask for a quote", href: "#contact" }}
      >
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
        {clientWork.map((c) => (
          <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className="group mt-12 block">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[3px] border border-line bg-surface">
              <Image
                src={c.image}
                alt={`${c.title} website`}
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="type-heading text-2xl transition-colors group-hover:text-accent">{c.title}</h3>
              <span className="type-label shrink-0 text-muted">Client site, live</span>
            </div>
            <p className="mt-1 max-w-[56ch] text-muted">
              {c.summary}
              <span className="sr-only"> (opens in a new tab)</span>
            </p>
          </a>
        ))}
      </Section>

      <Section title="Awards" action={{ label: "All awards", href: "/awards" }}>
        <AwardList items={awards.slice(0, 4)} />
      </Section>

      {/* Miracle Robotics: the company gets its own cut panel in brand navy. */}
      <section className="border-t border-line py-16 sm:py-20">
        <Container>
          <div className="chamfer grid overflow-hidden bg-navy text-on-navy [--cut:36px] lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-7">
              <span className="chamfer grid h-16 w-16 place-items-center bg-white [--cut:10px]">
                <MiracleMark className="h-8 w-auto" />
              </span>
              <h2 className="type-display mt-8 text-[clamp(2.25rem,5.5vw,3.75rem)]">{miracleRobotics.name}</h2>
              <p className="mt-4 max-w-[40ch] text-xl">{miracleRobotics.oneLiner}</p>
              <p className="mt-4 max-w-[56ch] text-on-navy/75">{miracleRobotics.mission}</p>
              <p className="type-label mt-6 text-on-navy/60">
                Founded {miracleRobotics.founded} in {profile.location}
              </p>
              <Link
                href="/miracle-robotics"
                className="chamfer mt-8 inline-flex bg-white px-6 py-3.5 font-semibold text-[#052c77] transition-opacity [--cut:10px] hover:opacity-90"
              >
                About Miracle Robotics
              </Link>
            </div>
            <div className="relative min-h-72 lg:col-span-5">
              <Image
                src={miracleRobotics.image}
                alt="The Miracle Robotics workshop"
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section id="journey" title="How I got here">
        {/* An aluminium bar with a mounting hole at each year; the current year is the red disc. */}
        <ol className="relative before:absolute before:bottom-0 before:left-0 before:top-1 before:w-5 before:rounded-[3px] before:bg-line">
          {timeline.map((t, i) => (
            <li key={t.year} className="relative pb-10 pl-12 last:pb-0">
              <span
                aria-hidden
                className={`absolute left-[4px] top-[0.5rem] h-3 w-3 rounded-full ${i === 0 ? "bg-signal" : "bg-bg"}`}
              />
              <p className="type-heading text-2xl tabular-nums">{t.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
              <p className="mt-1 max-w-[60ch] text-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Writing" action={{ label: "All posts", href: "/writing" }}>
        <PostList items={sortedPosts().slice(0, 3)} />
      </Section>

      <section id="contact" className="scroll-mt-20 border-t border-line">
        <Container className="py-20 sm:py-28">
          <h2 className="type-heading text-[clamp(2rem,5vw,3rem)]">Let&apos;s build something.</h2>
          <p className="mt-4 max-w-[52ch] text-lg text-muted">
            Hiring, partnering, investing, or just want to talk robots? Email is the fastest way to reach me.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="link type-display mt-10 inline-block max-w-full break-words text-[clamp(1.25rem,5.4vw,3.5rem)] text-accent"
          >
            {profile.email}
          </a>
          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 font-medium">
                  {s.name}
                  <ArrowUpRight size={15} aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
