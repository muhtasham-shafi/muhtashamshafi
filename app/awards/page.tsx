import type { Metadata } from "next";
import Image from "next/image";
import { awards } from "@/lib/content";
import { AwardList, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Awards & achievements",
  description: "Competitions, olympiads and programs — FIRST Global, MIT, Oxford Union and more.",
};

const gallery: { src: string; caption: string; position?: string; wide?: boolean }[] = [
  { src: "/assets/img/journey/2026-korea-team.webp", caption: "Team Bangladesh at the FIRST Global Challenge, Korea 2026", wide: true },
  { src: "/assets/img/journey/2026-korea.jpg", caption: "Team Bangladesh's robot, FIRST Global Challenge, Korea 2026", position: "50% 72%" },
  { src: "/assets/img/journey/panama.jpg", caption: "FIRST Global Challenge, Panama 2025" },
  { src: "/assets/img/journey/2023-fgc-singapore.jpg", caption: "FIRST Global Challenge, Singapore 2023" },
  { src: "/assets/img/journey/2022-olympiad.jpg", caption: "National Mental Math Olympiad 2022" },
];

export default function AwardsPage() {
  const competitions = awards.filter((a) => a.kind === "Competition").length;
  const programs = awards.filter((a) => a.kind === "Program").length;

  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="Awards & achievements"
        intro={`Representing Bangladesh internationally, national olympiad placings, and ${programs} global programs.`}
      />

      <Section title="Highlights">
        <dl className="mb-12 grid grid-cols-3 gap-4">
          <div>
            <dd className="font-serif text-4xl sm:text-5xl">{competitions}×</dd>
            <dt className="mt-1 text-sm text-muted">FIRST Global, Team BD</dt>
          </div>
          <div>
            <dd className="font-serif text-4xl sm:text-5xl">36th</dd>
            <dt className="mt-1 text-sm text-muted">Best world ranking (of 186)</dt>
          </div>
          <div>
            <dd className="font-serif text-4xl sm:text-5xl">4th</dd>
            <dt className="mt-1 text-sm text-muted">National Math Olympiad</dt>
          </div>
        </dl>
        <AwardList items={awards} />
      </Section>

      <Section title="Gallery">
        <div className="grid gap-4 sm:grid-cols-2">
          {gallery.map((g) => (
            <figure key={g.src} className={g.wide ? "sm:col-span-2" : undefined}>
              <div className={`relative overflow-hidden rounded-2xl bg-line ${g.wide ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3]"}`}>
                <Image src={g.src} alt={g.caption} fill priority={g.wide} sizes={g.wide ? "(min-width: 640px) 976px, 100vw" : "(min-width: 640px) 480px, 100vw"} className="object-cover" style={g.position ? { objectPosition: g.position } : undefined} />
              </div>
              <figcaption className="mt-2 text-sm text-muted">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
