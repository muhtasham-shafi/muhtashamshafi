"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/content";

/**
 * The prototypes as a set of engineering drawing sheets. On large screens
 * the set is pinned and slides sideways as you scroll down; each photo
 * develops from blueprint to full colour as its sheet reaches the middle.
 * Phones and reduced motion get a plain swipeable row of sheets.
 */
export default function DrawingSet({
  projects,
  intro,
  aside,
}: {
  projects: Project[];
  intro: string;
  aside?: React.ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [sheet, setSheet] = useState(0);
  const total = projects.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setPinned(wide.matches && !reduce.matches);
    decide();
    wide.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    const sec = section.current;
    const vp = viewport.current;
    const tr = track.current;
    if (!sec || !vp || !tr) return;
    const sheets = Array.from(tr.children) as HTMLElement[];

    if (!pinned) {
      sec.style.removeProperty("height");
      tr.style.removeProperty("transform");
      sheets.forEach((s) => s.style.setProperty("--dev", "1"));
      return;
    }

    let frame = 0;
    let travel = 0;
    const layout = () => {
      travel = Math.max(0, tr.scrollWidth - vp.clientWidth);
      sec.style.height = `${window.innerHeight + travel}px`;
    };
    const update = () => {
      frame = 0;
      const r = sec.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      tr.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
      const mid = window.innerWidth / 2;
      let nearest = 0;
      let best = Infinity;
      sheets.forEach((s, i) => {
        const b = s.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - mid);
        if (d < best) {
          best = d;
          nearest = i;
        }
        s.style.setProperty("--dev", (1 - Math.min(1, d / (b.width * 0.9))).toFixed(3));
      });
      setSheet(nearest);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      layout();
      onScroll();
    };
    layout();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pinned]);

  return (
    <section ref={section} id="prototypes" className="relative border-t border-line bg-surface">
      <div className={pinned ? "sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-hidden" : ""}>
        <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-8 px-5 pt-14 sm:px-8 lg:pt-10">
          <div>
            <h2 className="font-serif text-[2.75rem] leading-none sm:text-[3.5rem]">Prototypes</h2>
            <p className="mt-3 max-w-md text-muted">{intro}</p>
            <p className="mt-4">
              <Link href="/work" className="link font-medium">
                Competition robots and more builds
              </Link>
            </p>
          </div>
          <div className="hidden shrink-0 items-end gap-8 sm:flex">
            {aside && <div className="w-36 lg:w-40">{aside}</div>}
            {pinned && (
              <p className="type-label pb-1 text-muted tabular-nums" aria-live="polite">
                Sheet {pad(sheet + 1)} of {pad(total)}
              </p>
            )}
          </div>
        </div>

        <div
          ref={viewport}
          className={
            pinned
              ? "relative min-h-0 flex-1 py-8"
              : "mt-10 snap-x snap-mandatory overflow-x-auto pb-14 [scrollbar-width:thin]"
          }
        >
          <div
            ref={track}
            className={`flex gap-8 will-change-transform ${
              pinned ? "h-full px-[max(2rem,calc((100vw_-_72rem)/2_+_2rem))]" : "px-5 sm:px-8"
            }`}
          >
            {projects.map((p, i) => (
              <article
                key={p.slug}
                className={`drawing-sheet relative flex shrink-0 snap-center flex-col bg-bg p-3 ${
                  pinned ? "h-full w-[min(64rem,78vw)]" : "w-[85vw] max-w-[34rem]"
                }`}
                aria-label={`${p.title}, sheet ${i + 1} of ${total}`}
              >
                <div className="flex min-h-0 flex-1 flex-col border border-text/40 lg:flex-row">
                  <div className="sheet-photo relative aspect-[4/3] w-full shrink-0 lg:aspect-auto lg:w-[56%]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 560px, 85vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col border-t border-text/40 lg:border-l lg:border-t-0">
                    <div className="flex-1 p-5 lg:p-7">
                      <p className="type-label flex flex-wrap gap-x-3 text-muted">
                        <span>{p.category}</span>
                        <span className="text-accent">{p.status}</span>
                      </p>
                      <h3 className="mt-2 font-serif text-[2rem] leading-[1.02] lg:text-[2.75rem]">{p.title}</h3>
                      <p className="mt-3 text-[0.9375rem] text-muted lg:text-base">{p.summary}</p>
                      <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
                        {p.metrics.map((m) => (
                          <div key={m.label} className="flex flex-col-reverse">
                            <dt className="type-label text-sm text-muted">{m.label}</dt>
                            <dd className="font-serif text-4xl leading-none tabular-nums lg:text-5xl">{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    {/* Title block along the foot of the sheet. */}
                    <dl className="grid grid-cols-3 border-t border-text/40 text-[0.8125rem]">
                      {[
                        ["Field", p.category],
                        ["Status", p.status],
                        ["Sheet", `${pad(i + 1)} of ${pad(total)}`],
                      ].map(([k, v]) => (
                        <div key={k} className="border-l border-text/40 px-3 py-2 first:border-l-0">
                          <dt className="type-label text-muted">{k}</dt>
                          <dd className="truncate tabular-nums">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {pinned && (
          <div className="mx-auto w-full max-w-6xl px-5 pb-6 sm:px-8" aria-hidden>
            <div className="relative h-px bg-text/20">
              <div
                className="absolute -top-[3px] h-[7px] bg-accent transition-[left] duration-150"
                style={{ width: `${100 / total}%`, left: `${(sheet * 100) / total}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
