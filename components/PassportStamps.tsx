import type { Award } from "@/lib/content";

/**
 * Awards as passport stamps: each competition or programme is inked onto the
 * page as it scrolls into view. The latest is in red, the rest in Miracle
 * blue and navy. The caption under each stamp carries the readable details.
 */
const tilt = [-8, 6, -3, 9, -6, 4];
const shapes = ["round", "box", "oval", "box", "round", "oval"] as const;

/** Squeeze text that would overflow its stamp (est. `per` px a character). */
function fit(text: string, per: number, max: number) {
  return text.length * per > max ? { textLength: max, lengthAdjust: "spacingAndGlyphs" as const } : {};
}

function split(title: string) {
  const [event, place] = title.split(" — ");
  return { event, place: place ?? "Bangladesh" };
}

function Stamp({ award, index }: { award: Award; index: number }) {
  const { event, place } = split(award.title);
  const shape = shapes[index % shapes.length];
  const id = `stamp-${index}`;
  const ink = index === 0 ? "text-signal" : index % 2 ? "text-accent" : "text-text";

  return (
    <svg viewBox="0 0 220 220" aria-hidden className={`stamp w-full ${ink}`} style={{ "--r": `${tilt[index % tilt.length]}deg` } as React.CSSProperties}>
      <defs>
        {/* Speckled, uneven ink. */}
        <filter id={`${id}-ink`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={index + 3} result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -6 0 0 0 4.2" result="holes" />
          <feComposite in="SourceGraphic" in2="holes" operator="in" />
        </filter>
        <path id={`${id}-top`} d="M30 110a80 80 0 0 1 160 0" />
        <path id={`${id}-bottom`} d="M38 110a72 72 0 0 0 144 0" />
      </defs>
      <g filter={`url(#${id}-ink)`} fill="currentColor" stroke="currentColor">
        {shape === "round" && (
          <>
            <circle cx="110" cy="110" r="100" fill="none" strokeWidth="4" />
            <circle cx="110" cy="110" r="92" fill="none" strokeWidth="1.5" />
            <circle cx="110" cy="110" r="56" fill="none" strokeWidth="1.5" />
            <text className="stamp-arc" stroke="none">
              <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
                {event}
              </textPath>
            </text>
            <text className="stamp-arc" stroke="none">
              <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
                {award.kind}
              </textPath>
            </text>
            <text x="110" y="108" textAnchor="middle" className="stamp-place" stroke="none" {...fit(place, 15, 100)}>
              {place}
            </text>
            <text x="110" y="134" textAnchor="middle" className="stamp-year" stroke="none">
              {award.year}
            </text>
          </>
        )}
        {shape === "box" && (
          <>
            <rect x="14" y="44" width="192" height="132" rx="10" fill="none" strokeWidth="4" />
            <rect x="22" y="52" width="176" height="116" rx="6" fill="none" strokeWidth="1.5" />
            <text x="110" y="76" textAnchor="middle" className="stamp-small" stroke="none" {...fit(event, 8.6, 166)}>
              {event}
            </text>
            <path d="M34 86h152M34 142h152" strokeWidth="1.5" fill="none" />
            <text x="110" y="126" textAnchor="middle" className="stamp-place" stroke="none" {...fit(place, 15, 160)}>
              {place}
            </text>
            <text x="110" y="160" textAnchor="middle" className="stamp-small" stroke="none">
              {award.kind} {award.year}
            </text>
          </>
        )}
        {shape === "oval" && (
          <>
            <ellipse cx="110" cy="110" rx="102" ry="74" fill="none" strokeWidth="4" />
            <ellipse cx="110" cy="110" rx="93" ry="65" fill="none" strokeWidth="1.5" />
            <text x="110" y="78" textAnchor="middle" className="stamp-small" stroke="none" {...fit(event, 8.6, 150)}>
              {event}
            </text>
            <text x="110" y="118" textAnchor="middle" className="stamp-place" stroke="none" {...fit(place, 15, 150)}>
              {place}
            </text>
            <text x="110" y="146" textAnchor="middle" className="stamp-small" stroke="none">
              {award.year}
            </text>
          </>
        )}
      </g>
    </svg>
  );
}

export default function PassportStamps({ items }: { items: Award[] }) {
  return (
    <ol className="grid gap-x-10 gap-y-14 [overflow-x:clip] sm:grid-cols-2">
      {items.map((a, i) => (
        <li key={a.year + a.title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="w-full max-w-[13.5rem]">
            <Stamp award={a} index={i} />
          </div>
          <p className="type-label mt-5 text-muted tabular-nums">
            {a.year}, {a.kind}
          </p>
          <h3 className="mt-1 font-semibold">{a.title}</h3>
          <p className="mt-0.5 max-w-[34ch] text-[0.9375rem] text-muted">{a.detail}</p>
        </li>
      ))}
    </ol>
  );
}
