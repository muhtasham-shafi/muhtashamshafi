"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A pen plotter on a rail across the top of the hero sheet. On load it writes
 * the headline (each [data-pen-line] fills with ink as the pen passes), then
 * parks. On devices with a mouse it jogs to the pointer and leaves a short
 * ink trail, like doodling on the blueprint. Large screens only; reduced
 * motion shows it parked and the headline already inked.
 */
type Geo = { x0: number; x1: number; rail: number; bottom: number };

const RAIL_Y = 26;
const PEN_UP = 9;

export default function PlotterHero() {
  const svg = useRef<SVGSVGElement>(null);
  const carriage = useRef<SVGGElement>(null);
  const rod = useRef<SVGLineElement>(null);
  const pen = useRef<SVGGElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const readout = useRef<SVGTextElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const svgEl = svg.current;
    const section = svgEl?.parentElement;
    if (!svgEl || !section) return;
    const h1 = section.querySelector("h1");
    const lines = Array.from(section.querySelectorAll<HTMLElement>("[data-pen-line]"));
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!wide.matches || !h1) return;

    let g: Geo = { x0: 0, x1: 0, rail: RAIL_Y, bottom: 0 };
    const pos = { x: 0, y: 0, lift: PEN_UP };
    const target = { x: 0, y: 0, lift: PEN_UP };
    let mode: "writing" | "parked" | "following" = "parked";
    let frame = 0;
    let alive = true;
    const points: { x: number; y: number; t: number }[] = [];

    const measure = () => {
      const s = section.getBoundingClientRect();
      const c = h1.parentElement!.getBoundingClientRect();
      g = { x0: c.left - s.left + 8, x1: c.right - s.left - 8, rail: RAIL_Y, bottom: s.height - 24 };
      setGeo(g);
    };
    const park = () => ({ x: g.x1 - 70, y: g.rail + 96, lift: PEN_UP });

    const draw = () => {
      const tipY = pos.y - pos.lift;
      carriage.current?.setAttribute("transform", `translate(${pos.x} ${g.rail})`);
      rod.current?.setAttribute("x1", String(pos.x));
      rod.current?.setAttribute("x2", String(pos.x));
      rod.current?.setAttribute("y1", String(g.rail + 11));
      rod.current?.setAttribute("y2", String(tipY - 34));
      pen.current?.setAttribute("transform", `translate(${pos.x} ${tipY})`);
      if (readout.current) {
        // Under the carriage, on whichever side of the rod has room.
        const left = pos.x > g.x1 - 150;
        readout.current.setAttribute("x", String(pos.x + (left ? -12 : 12)));
        readout.current.setAttribute("y", String(g.rail + 32));
        readout.current.setAttribute("text-anchor", left ? "end" : "start");
        readout.current.textContent = `X ${(pos.x * 0.2646).toFixed(1)}  Y ${(pos.y * 0.2646).toFixed(1)}`;
      }
      const now = performance.now();
      while (points.length && now - points[0].t > 900) points.shift();
      trail.current?.setAttribute(
        "d",
        points.length > 1 ? "M" + points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("L") : "",
      );
    };

    const tween = (to: { x: number; y: number; lift: number }, ms: number, onStep?: (k: number) => void, linear = false) =>
      new Promise<void>((resolve) => {
        const from = { ...pos };
        const t0 = performance.now();
        const step = (now: number) => {
          if (!alive) return resolve();
          const k = Math.min(1, (now - t0) / ms);
          const e = linear ? k : k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
          pos.x = from.x + (to.x - from.x) * e;
          pos.y = from.y + (to.y - from.y) * e;
          pos.lift = from.lift + (to.lift - from.lift) * e;
          onStep?.(e);
          draw();
          if (k < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      });

    const write = async () => {
      mode = "writing";
      h1.classList.add("plotting");
      lines.forEach((l) => l.style.setProperty("--ink", "0%"));
      for (const line of lines) {
        const s = section.getBoundingClientRect();
        const r = line.getBoundingClientRect();
        const left = r.left - s.left;
        const width = r.width;
        const base = r.top - s.top + r.height * 0.6;
        await tween({ x: left, y: base, lift: PEN_UP }, 420);
        await tween({ x: left, y: base, lift: 0 }, 90);
        await tween(
          { x: left + width, y: base, lift: 0 },
          Math.max(500, width / 1.15),
          (k) => {
            line.style.setProperty("--ink", `${(k * 100).toFixed(1)}%`);
            pos.y = base + Math.sin(k * width * 0.09) * 7;
          },
          true,
        );
        line.style.setProperty("--ink", "100%");
        await tween({ x: left + width, y: base, lift: PEN_UP }, 90);
      }
      const p = park();
      await tween(p, 650);
      Object.assign(target, p);
      mode = "parked";
    };

    // Following the pointer, with an ink trail that dries as it goes.
    const loop = () => {
      frame = 0;
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      pos.lift += (target.lift - pos.lift) * 0.3;
      if (mode === "following" && pos.lift < 2) points.push({ x: pos.x, y: pos.y, t: performance.now() });
      draw();
      const moving = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5;
      if (moving || points.length) frame = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (mode === "writing" || e.pointerType !== "mouse") return;
      const s = section.getBoundingClientRect();
      mode = "following";
      target.x = Math.min(g.x1 - 24, Math.max(g.x0 + 24, e.clientX - s.left));
      target.y = Math.min(g.bottom, Math.max(g.rail + 70, e.clientY - s.top));
      target.lift = 0;
      kick();
    };
    const onLeave = () => {
      if (mode === "writing") return;
      mode = "parked";
      Object.assign(target, park());
      kick();
    };
    const onResize = () => {
      measure();
      if (mode !== "writing") {
        Object.assign(pos, park());
        Object.assign(target, park());
        draw();
      }
    };

    measure();
    Object.assign(pos, park());
    Object.assign(target, park());
    draw();

    if (!reduce.matches) {
      document.fonts.ready.then(() => {
        if (!alive) return;
        measure();
        window.setTimeout(() => alive && write(), 250);
      });
      if (mouse.matches) {
        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerleave", onLeave);
      }
    }
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      h1.classList.remove("plotting");
      lines.forEach((l) => l.style.removeProperty("--ink"));
    };
  }, []);

  return (
    <svg
      ref={svg}
      aria-hidden
      className="plotter pointer-events-none absolute inset-0 z-20 hidden h-full w-full overflow-visible lg:block"
    >
      <path ref={trail} className="plot-trail" />
      {geo && (
        <g className="plot-rail">
          <rect x={geo.x0} y={geo.rail - 5} width={geo.x1 - geo.x0} height="10" rx="2" />
          <line x1={geo.x0 + 14} y1={geo.rail} x2={geo.x1 - 14} y2={geo.rail} className="plot-belt" />
          <rect x={geo.x0 - 18} y={geo.rail - 14} width="22" height="28" rx="3" />
          <circle cx={geo.x0 - 7} cy={geo.rail} r="6" />
          <rect x={geo.x1 - 4} y={geo.rail - 14} width="22" height="28" rx="3" />
          <circle cx={geo.x1 + 7} cy={geo.rail} r="6" />
        </g>
      )}
      <line ref={rod} className="plot-rod" />
      <g ref={carriage} className="plot-carriage">
        <rect x="-26" y="-12" width="52" height="24" rx="4" />
        <circle cx="-13" cy="0" r="3" />
        <circle cx="13" cy="0" r="3" />
      </g>
      <g ref={pen} className="plot-pen">
        <rect x="-8" y="-36" width="16" height="24" rx="3" />
        <path d="M-8 -12 0 0l8-12z" />
        <circle className="plot-nib" cx="0" cy="0" r="2" />
      </g>
      <text ref={readout} className="plot-readout" />
    </svg>
  );
}
