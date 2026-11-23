import Link from "next/link";
import { profile, socials } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-navy text-on-navy">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="type-heading text-2xl">{profile.name}</p>
          <p className="mt-2 text-on-navy/70">
            Founder of{" "}
            <Link href="/miracle-robotics" className="link text-on-navy hover:text-white!">
              Miracle Robotics
            </Link>
            , building in {profile.location}.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link hover:text-white!">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="type-label text-sm text-on-navy/60 md:col-span-2">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
