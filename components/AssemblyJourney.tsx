"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Entry = { year: string; title: string; text: string; image: string };

/** Revision letters run A, B, C… in build order. */
const letter = (i: number) => String.fromCharCode(65 + i);

/**
 * One part of the arm per revision, in build order. Each part is drawn at its
 * fitted position; (dx, dy) is where it waits in the exploded view. `tag` is
 * where its revision triangle sits.
 */
const parts: { dx: number; dy: number; tag: [number, number]; shape: React.ReactNode }[] = [
  {
    // A: base plate
    dx: 0,
    dy: 60,
    tag: [306, 424],
    shape: (
      <>
        <rect x="110" y="430" width="180" height="28" rx="3" />
        <line className="arm-detail" x1="110" y1="438" x2="290" y2="438" />
        <circle className="arm-detail" cx="132" cy="446" r="4" />
        <circle className="arm-detail" cx="268" cy="446" r="4" />
      </>
    ),
  },
  {
    // B: turntable
    dx: -110,
    dy: 20,
    tag: [264, 384],
    shape: (
      <>
        <rect x="152" y="392" width="96" height="38" rx="4" />
        <line className="arm-detail" x1="152" y1="404" x2="248" y2="404" />
        <rect x="176" y="380" width="48" height="12" rx="2" />
      </>
    ),
  },
  {
    // C: shoulder and lower arm
    dx: -70,
    dy: -10,
    tag: [96, 312],
    shape: (
      <>
        <rect x="182" y="195" width="36" height="193" rx="18" transform="rotate(-22.48 200 370)" />
        <circle cx="200" cy="370" r="24" />
        <circle className="arm-detail" cx="200" cy="370" r="8" />
      </>
    ),
  },
  {
    // D: elbow and upper arm
    dx: -50,
    dy: -110,
    tag: [196, 160],
    shape: (
      <>
        <rect x="125" y="51.1" width="30" height="188.9" rx="15" transform="rotate(65.85 140 225)" />
        <circle cx="140" cy="225" r="20" />
        <circle className="arm-detail" cx="140" cy="225" r="7" />
      </>
    ),
  },
  {
    // E: wrist
    dx: 80,
    dy: -80,
    tag: [322, 138],
    shape: (
      <>
        <rect x="274" y="113.4" width="22" height="46.6" rx="4" transform="rotate(144.6 285 160)" />
        <circle cx="285" cy="160" r="14" />
        <circle className="arm-detail" cx="285" cy="160" r="5" />
      </>
    ),
  },
  {
    // F: gripper, holding a printed part
    dx: 70,
    dy: 60,
    tag: [362, 222],
    shape: (
      <g transform="translate(312 198) rotate(54.6)">
        <rect x="-2" y="-20" width="10" height="40" rx="2" />
        <path d="M8 -17 34 -11v6L8 -8z" />
        <path d="M8 17 34 11v-6L8 8z" />
        <rect className="arm-detail" x="20" y="-5" width="12" height="10" />
      </g>
    ),
  },
];

function Tag({ x, y, children, now }: { x: number; y: number; children: string; now?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`} className={now ? "arm-tag arm-tag-now" : "arm-tag"}>
      <path d="M0 -12 12 9H-12z" />
      <text y="6" textAnchor="middle">
        {children}
      </text>
    </g>
  );
}

function Delta({ children, now }: { children: string; now?: boolean }) {
  return (
    <svg viewBox="0 0 30 26" className={`h-7 w-8 shrink-0 ${now ? "text-[#ff5a6a]" : "text-white"}`} aria-hidden>
      <path d="M15 1.5 28.5 24.5h-27z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <text x="15" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
        {children}
      </text>
    </svg>
  );
}

/**
 * The journey as an assembly drawing. Scrolling through the years fits one
 * part of a robot arm per revision, from the base plate in the first year to
 * the gripper today. `entries` are in build order, oldest first.
 */
export default function AssemblyJourney({ entries }: { entries: Entry[] }) {
  const host = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const n = entries.length;

  useEffect(() => {
    const hostEl = host.current;
    const listEl = list.current;
    if (!hostEl || !listEl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce.matches) {
        hostEl.style.setProperty("--p", "1");
        setStill(true);
        setActive(n - 1);
        return;
      }
      setStill(false);
      const r = listEl.getBoundingClientRect();
      const line = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (line - r.top) / r.height));
      hostEl.style.setProperty("--p", p.toFixed(4));
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", update);
    };
  }, [n]);

  const current = entries[active];

  return (
    <div ref={host} className="grid gap-x-12 lg:grid-cols-12" style={{ "--p": 0, "--n": n } as React.CSSProperties}>
      {/* The drawing stays pinned while the years scroll past. */}
      <div className="sticky top-16 z-10 -mx-5 self-start border-b border-white/20 bg-[#052c77] px-5 pb-3 pt-3 sm:-mx-8 sm:px-8 lg:top-24 lg:col-span-6 lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:pb-0">
        <svg
          viewBox="10 20 420 510"
          className="mx-auto h-[30vh] w-full lg:h-[68vh]"
          role="img"
          aria-label={`A robot arm drawn as an assembly, one part per revision. Showing revision ${letter(active)}.`}
        >
          {/* Ground and centrelines stay put. */}
          <g className="arm-centre">
            <line x1="200" y1="372" x2="200" y2="470" />
            <polyline points="200,370 140,225 285,160 312,198" />
          </g>
          <line className="arm-ground" x1="70" y1="458" x2="330" y2="458" />
          <g className="arm-hatch">
            {Array.from({ length: 13 }, (_, i) => (
              <line key={i} x1={74 + i * 20} y1="458" x2={64 + i * 20} y2="470" />
            ))}
          </g>

          {/* Where each part will go. */}
          <g className="arm-ghost">
            {parts.map((part, i) => (
              <g key={i}>{part.shape}</g>
            ))}
          </g>

          {/* The parts themselves, fitted as you scroll. */}
          <g className="arm-live">
            {parts.slice(0, n).map((part, i) => (
              <g key={i} style={{ "--i": i, "--dx": part.dx, "--dy": part.dy } as React.CSSProperties}>
                <g className="arm-part">{part.shape}</g>
                <Tag x={part.tag[0]} y={part.tag[1]} now={i === n - 1}>
                  {letter(i)}
                </Tag>
              </g>
            ))}
          </g>
        </svg>
        <p className="type-label mt-1 text-center text-sm text-white/70 lg:mt-4" aria-hidden>
          Assembled to revision {letter(active)}, {current.year}
        </p>
      </div>

      <ol ref={list} className="lg:col-span-6">
        {entries.map((e, i) => (
          <li
            key={e.year}
            className={`flex min-h-[62vh] flex-col justify-center py-10 transition-opacity duration-300 lg:min-h-[72vh] ${
              still || i === active ? "opacity-100" : "opacity-35"
            }`}
          >
            <div className="flex items-center gap-3">
              <Delta now={i === n - 1}>{letter(i)}</Delta>
              <span className="type-label text-white/70">Revision {letter(i)}</span>
            </div>
            <p className="mt-3 font-serif text-6xl leading-none tabular-nums sm:text-7xl">{e.year}</p>
            <h3 className="type-heading mt-4 text-xl">{e.title}</h3>
            <p className="mt-2 max-w-[48ch] text-white/75">{e.text}</p>
            <div className="relative mt-6 aspect-[4/3] w-full max-w-[15rem] overflow-hidden outline outline-1 outline-offset-4 outline-white/40 sm:max-w-xs">
              <Image src={e.image} alt={e.title} fill sizes="320px" className="object-cover" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
