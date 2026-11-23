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
  Container,
  PostList,
  ProjectPlate,
  Section,
} from "@/components/ui";
import MiracleMark from "@/components/MiracleMark";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The journey doubles as the drawing's revision history: the first year is
// revision A, the latest is the current revision.
const revisionOf = (i: number) => String.fromCharCode(65 + timeline.length - 1 - i);
const currentRevision = revisionOf(0);
const firstYear = timeline[timeline.length - 1].year;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// Callouts on the hero photo. `top` is where the leader meets the photo.
const callouts: { top: string; key: string; value: React.ReactNode; now?: boolean }[] = [
  { top: "34%", key: "Latest", value: `${heroBadge.label}, ${heroBadge.detail}`, now: true },
  {
    top: "60%",
    key: "Founder",
    value: (
      <Link href="/miracle-robotics" className="link hover:text-white!">
        {miracleRobotics.name}
      </Link>
    ),
  },
  { top: "84%", key: "FIRST Global", value: `${stats[1].value} for Team Bangladesh` },
];

const titleBlock: { key: string; value: React.ReactNode; wide?: boolean }[] = [
  { key: "Drawn by", value: profile.name },
  { key: "Location", value: profile.location },
  { key: stats[2].label, value: stats[2].value },
  {
    key: "Revision",
    value: (
      <a href="#journey" className="link hover:text-white!">
        {currentRevision}, {timeline[0].year}
      </a>
    ),
  },
  { key: "Took part in", value: representedAt.join(", "), wide: true },
];

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 8 8" className={`h-2 w-2 shrink-0 fill-current ${flip ? "rotate-180" : ""}`}>
      <path d="M0 4 8 0v8z" />
    </svg>
  );
}

/** A revision delta, as drawn in a title block's revision table. */
function Delta({ letter, now }: { letter: string; now?: boolean }) {
  return (
    <svg viewBox="0 0 30 26" className={`h-8 w-9 ${now ? "text-signal" : "text-text"}`} role="img" aria-label={`Revision ${letter}`}>
      <path d="M15 1.5 28.5 24.5h-27z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <text x="15" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
        {letter}
      </text>
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero: a blueprint sheet. Every drafting mark carries a real fact. */}
      <section className="blueprint">
        <Container className="pb-12 pt-12 sm:pb-16 sm:pt-16">
          <h1 className="assemble max-w-[18ch] font-serif text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
            {profile.tagline}
          </h1>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="assemble lg:col-span-5" style={delay(140)}>
              <p className="max-w-[46ch] text-xl leading-relaxed text-white/85">{profile.intro}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="/work"
                  className="chamfer inline-flex bg-white px-6 py-3.5 font-semibold text-[#052c77] transition-opacity [--cut:10px] hover:opacity-90"
                >
                  See my work
                </Link>
                <a href="#contact" className="link px-1 py-3 font-medium hover:text-white!">
                  Email me
                </a>
              </div>
            </div>

            <figure className="lg:col-span-7">
              {/* Dimension line across the photo: how long he's been building. */}
              <div className="mb-4 flex w-full items-center sm:w-[58%]" role="img" aria-label={`${stats[0].value} years building, since ${firstYear}`}>
                <span aria-hidden className="h-5 w-px bg-white/70" />
                <Arrow />
                <span aria-hidden className="draw-c h-px flex-1 bg-white/70" style={delay(500)} />
                <span aria-hidden className="type-label assemble whitespace-nowrap px-3 text-sm" style={delay(700)}>
                  {firstYear} to now, {stats[0].value} years
                </span>
                <span aria-hidden className="draw-c h-px flex-1 bg-white/70" style={delay(500)} />
                <Arrow flip />
                <span aria-hidden className="h-5 w-px bg-white/70" />
              </div>

              <div className="relative">
                <div
                  className="assemble relative aspect-[4/5] w-full overflow-hidden outline outline-1 outline-offset-4 outline-white/40 sm:w-[58%]"
                  style={delay(260)}
                >
                  <Image
                    src={profile.photo}
                    alt={`${profile.name} speaking`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* Leader-line callouts (tablet and up). */}
                {callouts.map((c, i) => (
                  <div
                    key={c.key}
                    className="invisible absolute flex -translate-y-1/2 items-center sm:visible"
                    style={{ top: c.top, left: "27%", right: 0 }}
                  >
                    <span
                      aria-hidden
                      className={`assemble h-3 w-3 shrink-0 rounded-full border-2 border-white ${c.now ? "bg-signal" : "bg-[#052c77]"}`}
                      style={delay(600 + i * 120)}
                    />
                    <span aria-hidden className="draw-x h-px flex-1 bg-white/85" style={delay(650 + i * 120)} />
                    <div
                      className="assemble w-44 shrink-0 border border-white/50 bg-[#052c77] px-3 py-2 lg:w-48"
                      style={delay(900 + i * 120)}
                    >
                      <p className="type-label text-sm text-white/65">{c.key}</p>
                      <p className="text-[0.9375rem] leading-snug">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* The same notes as a list on phones. */}
              <ul className="mt-6 space-y-3 sm:hidden">
                {callouts.map((c) => (
                  <li key={c.key} className="flex items-baseline gap-3">
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 shrink-0 translate-y-[-1px] rounded-full border-2 border-white ${c.now ? "bg-signal" : ""}`}
                    />
                    <span>
                      <span className="type-label text-white/65">{c.key}: </span>
                      {c.value}
                    </span>
                  </li>
                ))}
              </ul>
            </figure>
          </div>

          {/* Title block, like the corner of an engineering drawing. */}
          <dl
            className="assemble mt-14 grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] border-l border-t border-white/40 text-[0.9375rem] sm:grid-cols-[minmax(0,8rem)_minmax(0,1fr)_minmax(0,8rem)_minmax(0,1fr)] lg:ml-auto lg:w-[46rem]"
            style={delay(1100)}
          >
            {titleBlock.map((r) => (
              <div key={r.key} className="contents">
                <dt className="type-label border-b border-r border-white/40 px-3 py-2.5 text-white/65">{r.key}</dt>
                <dd className={`border-b border-r border-white/40 px-3 py-2.5 ${r.wide ? "sm:col-span-3" : ""}`}>{r.value}</dd>
              </div>
            ))}
          </dl>
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
        action={{ label: "Competition robots and more builds", href: "/work" }}
      >
        <div className="grid gap-x-10 gap-y-14 px-2 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectPlate key={p.slug} project={p} />
          ))}
        </div>
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
              <p className="mt-4">
                Services:{" "}
                <Link href="/miracle-robotics#services" className="link text-on-navy hover:text-white!">
                  {miracleRobotics.services.map((s) => s.title).join(", ")}
                </Link>
              </p>
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

      <Section
        id="journey"
        title="Revision history"
        intro={`How I got here: each year a new revision, from ${revisionOf(timeline.length - 1)} in ${firstYear} to ${currentRevision} today.`}
      >
        <div aria-hidden className="type-label hidden grid-cols-[3rem_4.5rem_minmax(0,1fr)_10rem] gap-6 border-b border-text/60 pb-2 text-sm text-muted sm:grid">
          <span>Rev</span>
          <span>Year</span>
          <span>Change</span>
        </div>
        <ol className="border-b border-line">
          {timeline.map((t, i) => (
            <li
              key={t.year}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-4 border-t border-line py-6 first:border-t-0 sm:grid-cols-[3rem_4.5rem_minmax(0,1fr)_10rem] sm:gap-x-6"
            >
              <Delta letter={revisionOf(i)} now={i === 0} />
              <p className="type-heading self-center text-2xl tabular-nums sm:self-start sm:pt-0.5 sm:text-xl">{t.year}</p>
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-lg font-semibold leading-snug">{t.title}</h3>
                <p className="mt-1 max-w-[56ch] text-muted">{t.text}</p>
              </div>
              <div className="relative col-span-2 aspect-[4/3] max-w-[16rem] overflow-hidden bg-surface sm:col-span-1 sm:max-w-none">
                <Image src={t.image} alt={t.title} fill sizes="(min-width: 640px) 160px, 256px" className="object-cover" />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Writing" action={{ label: "All posts", href: "/writing" }}>
        <PostList items={sortedPosts().slice(0, 3)} />
      </Section>

      <section id="contact" className="scroll-mt-20 border-t border-line">
        <Container className="py-20 sm:py-28">
          <h2 className="font-serif text-[clamp(2.75rem,7vw,4.5rem)] leading-none">Let&apos;s build something.</h2>
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
