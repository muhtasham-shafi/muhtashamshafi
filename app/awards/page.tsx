import type { Metadata } from "next";
import Image from "next/image";
import { awards } from "@/lib/content";
import { AwardList, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Awards & achievements",
  description: "Competitions, olympiads and programs — FIRST Global, MIT, Oxford Union and more.",
};

const gallery = [
  { src: "/assets/img/journey/panama.jpg", caption: "FIRST Global Challenge, Panama 2025" },
  { src: "/assets/img/journey/2023-fgc-singapore.jpg", caption: "FIRST Global Challenge, Singapore 2023" },
  { src: "/assets/img/journey/2025-hanoi.jpg", caption: "Global Youth Summit, Hanoi 2025" },
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
            <figure key={g.src}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                <Image src={g.src} alt={g.caption} fill sizes="(min-width: 640px) 480px, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-2 text-sm text-muted">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
