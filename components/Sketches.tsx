/**
 * Hand-drawn robotics sketches in the site colours: ink line work, Miracle
 * blue marker fills set slightly off-register, red for the "live" bits.
 * A displacement filter gives the lines a hand-drawn wobble, and each
 * sketch draws itself in as it scrolls into view (see .sketch in globals.css).
 * All of them are decorative.
 */
import { cn } from "@/lib/utils";

function Sketch({
  id,
  viewBox,
  className,
  children,
}: {
  id: string;
  viewBox: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg viewBox={viewBox} aria-hidden className={cn("sketch", className)}>
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="2.8" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{children}</g>
    </svg>
  );
}

/** The first robot: a line-follower riding its track, 2019. */
export function LineFollowerSketch({ className }: { className?: string }) {
  return (
    <Sketch id="sk-line-follower" viewBox="0 0 220 160" className={className}>
      <path className="sk-ink sk-thick" d="M6 98C40 72 70 60 110 66s72 26 104-6" />
      <path className="sk-ink sk-thin" d="M62 54H46M58 66H34M62 78H46" />
      <rect className="sk-fill" x="84" y="50" width="60" height="44" rx="10" />
      <rect className="sk-ink" x="78" y="44" width="60" height="44" rx="10" />
      <rect className="sk-ink" x="88" y="32" width="26" height="10" rx="3" />
      <rect className="sk-ink" x="88" y="90" width="26" height="10" rx="3" />
      <rect className="sk-ink sk-thin" x="88" y="52" width="32" height="20" rx="2" />
      <path className="sk-ink sk-thin" d="M92 52v-4M98 52v-4M104 52v-4M110 52v-4M116 52v-4" />
      <path className="sk-blue" d="M120 64c8 2 10 10 18 8" />
      <circle className="sk-red" cx="145" cy="56" r="3.5" />
      <circle className="sk-red" cx="148" cy="66" r="3.5" />
      <circle className="sk-red" cx="145" cy="76" r="3.5" />
      <path className="sk-ink sk-thin" d="M160 138c10-14 0-30-36-34m7-6-7 6 8 5" />
      <text className="sk-note" x="12" y="146">
        first robot, 2019
      </text>
    </Sketch>
  );
}

/** A delivery drone dropping a parcel. */
export function DroneSketch({ className }: { className?: string }) {
  return (
    <Sketch id="sk-drone" viewBox="0 0 220 180" className={className}>
      {[
        [54, 40],
        [166, 40],
        [54, 130],
        [166, 130],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle className="sk-fill" cx={x + 4} cy={y + 4} r="24" />
          <circle className="sk-ink sk-thin" cx={x} cy={y} r="24" />
          <path className="sk-ink sk-thin" d={`M${x - 18} ${y - 7}l36 14`} />
          <circle className="sk-ink" cx={x} cy={y} r="4.5" />
        </g>
      ))}
      <path className="sk-ink" d="M98 74 58 44M122 74l40-30M98 98l-40 28M122 98l40 28" />
      <rect className="sk-fill" x="96" y="72" width="40" height="34" rx="9" />
      <rect className="sk-ink" x="90" y="68" width="40" height="34" rx="9" />
      <circle className="sk-red" cx="110" cy="77" r="3" />
      <circle className="sk-ink sk-thin" cx="110" cy="92" r="5" />
      <path className="sk-blue sk-dash" d="M122 108c18 30 40 34 56 40" />
      <rect className="sk-fill" x="184" y="144" width="24" height="20" rx="2" />
      <rect className="sk-ink" x="180" y="140" width="24" height="20" rx="2" />
      <path className="sk-ink sk-thin" d="M180 148h24M192 140v20" />
    </Sketch>
  );
}

/** A small robot lifting a trophy. */
export function TrophyBotSketch({ className }: { className?: string }) {
  return (
    <Sketch id="sk-trophy-bot" viewBox="0 0 200 186" className={className}>
      <path className="sk-fill" d="M84 16h40v8c0 16-10 24-20 24s-20-8-20-24z" />
      <path className="sk-ink" d="M80 12h40v8c0 16-10 24-20 24S80 36 80 20z" />
      <path className="sk-ink sk-thin" d="M80 18c-10 0-10 12 0 12M120 18c10 0 10 12 0 12M100 44v8M88 54h24" />
      <path className="sk-red-line" d="M56 14v10M51 19h10" />
      <path className="sk-blue" d="M144 8v8M140 12h8M150 34v6M147 37h6" />
      <path className="sk-ink" d="M78 104 66 60l4-30M122 104l12-44-4-30" />
      <circle className="sk-ink" cx="70" cy="27" r="4.5" />
      <circle className="sk-ink" cx="130" cy="27" r="4.5" />
      <rect className="sk-fill" x="84" y="66" width="44" height="32" rx="8" />
      <rect className="sk-ink" x="78" y="62" width="44" height="32" rx="8" />
      <circle className="sk-dot" cx="92" cy="77" r="3.5" />
      <circle className="sk-dot" cx="108" cy="77" r="3.5" />
      <path className="sk-ink sk-thin" d="M92 85q8 6 16 0M100 94v6" />
      <rect className="sk-fill" x="82" y="104" width="48" height="40" rx="6" />
      <rect className="sk-ink" x="76" y="100" width="48" height="40" rx="6" />
      <circle className="sk-red" cx="100" cy="116" r="5" />
      <path className="sk-ink sk-thin" d="M86 130h28" />
      <rect className="sk-ink" x="68" y="146" width="64" height="18" rx="9" />
      <circle className="sk-ink sk-thin" cx="82" cy="155" r="4.5" />
      <circle className="sk-ink sk-thin" cx="100" cy="155" r="4.5" />
      <circle className="sk-ink sk-thin" cx="118" cy="155" r="4.5" />
      <path className="sk-ink sk-thin" d="M46 176h108" />
    </Sketch>
  );
}

/** A 3D printer printing the Miracle "M". Drawn for the navy panel. */
export function PrinterSketch({ className }: { className?: string }) {
  return (
    <Sketch id="sk-printer" viewBox="0 0 210 176" className={className}>
      <path className="sk-ink" d="M30 166V22h140v144M18 166h164" />
      <path className="sk-ink" d="M30 62h140" />
      <circle className="sk-ink" cx="186" cy="20" r="13" />
      <circle className="sk-ink sk-thin" cx="186" cy="20" r="3.5" />
      <path className="sk-blue" d="M178 30c-18 14-44 10-62 38" />
      <rect className="sk-fill" x="102" y="70" width="28" height="20" rx="3" />
      <rect className="sk-ink" x="96" y="66" width="28" height="20" rx="3" />
      <path className="sk-ink sk-thin" d="M104 86h12l-6 8z" />
      <circle className="sk-red" cx="110" cy="98" r="2.6" />
      <rect className="sk-ink sk-thin" x="44" y="146" width="112" height="8" rx="2" />
      <path className="sk-fill" d="M78 146v-32l14 14 14-14 14 14 14-14v32z" />
      <path className="sk-ink" d="M72 146v-34l14 14 14-14 14 14 14-14v34" />
      <path className="sk-blue sk-dash" d="M74 138h54M74 130h54M74 122h54" />
    </Sketch>
  );
}

/** A robot waving hello, wrench in the other hand. */
export function WavingRobotSketch({ className }: { className?: string }) {
  return (
    <Sketch id="sk-waving-robot" viewBox="0 0 240 210" className={className}>
      <path className="sk-ink" d="M120 30V16" />
      <circle className="sk-red" cx="120" cy="11" r="5.5" />
      <rect className="sk-fill" x="92" y="36" width="68" height="48" rx="12" />
      <rect className="sk-ink" x="86" y="30" width="68" height="48" rx="12" />
      <rect className="sk-ink sk-thin" x="96" y="40" width="48" height="22" rx="8" />
      <circle className="sk-dot" cx="110" cy="51" r="4" />
      <circle className="sk-dot" cx="130" cy="51" r="4" />
      <path className="sk-ink sk-thin" d="M110 68q10 6 20 0" />
      <circle className="sk-ink sk-thin" cx="83" cy="54" r="4" />
      <circle className="sk-ink sk-thin" cx="157" cy="54" r="4" />
      <path className="sk-ink" d="M120 78v8" />
      <rect className="sk-fill" x="90" y="92" width="72" height="62" rx="10" />
      <rect className="sk-ink" x="84" y="86" width="72" height="62" rx="10" />
      <rect className="sk-ink sk-thin" x="98" y="98" width="44" height="24" rx="3" />
      <path className="sk-blue" d="M105 116v-8M113 116v-12M121 116v-6M129 116v-10M137 116v-5" />
      <circle className="sk-red" cx="140" cy="136" r="4" />
      <path className="sk-ink" d="M84 100 60 84l-8-30" />
      <circle className="sk-ink" cx="50" cy="47" r="7" />
      <path className="sk-blue" d="M34 38q-6 10 0 20M24 32q-9 16 0 30" />
      <path className="sk-ink" d="M156 100l22 20 4 22" />
      <circle className="sk-ink" cx="183" cy="147" r="6" />
      <path className="sk-ink" d="M186 152l12 28" />
      <path className="sk-ink sk-thin" d="M194 178c-6 4-4 14 4 14 2-3 0-6 3-8s6 0 8-2c0-8-9-10-15-4" />
      <rect className="sk-ink" x="78" y="154" width="84" height="26" rx="13" />
      <circle className="sk-ink sk-thin" cx="94" cy="167" r="6.5" />
      <circle className="sk-ink sk-thin" cx="120" cy="167" r="6.5" />
      <circle className="sk-ink sk-thin" cx="146" cy="167" r="6.5" />
      <path className="sk-ink sk-thin" d="M48 196h144" />
    </Sketch>
  );
}
