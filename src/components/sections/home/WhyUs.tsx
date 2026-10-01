"use client";

import { useRef } from "react";
import { home } from "@/content/home";
import { CorePose } from "@/components/motion/CorePose";
import { SplitReveal } from "@/components/motion/SplitReveal";

const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4", "md:col-span-3", "md:col-span-3"];

/** Bento grid lit by a spotlight that follows the cursor across all tiles. */
export function WhyUs() {
  const grid = useRef<HTMLDivElement>(null);
  return (
    <CorePose pose="aside" className="relative py-24 md:py-40">
      <div className="container-x">
        <SplitReveal className="max-w-[16ch] font-display text-title font-semibold">{home.why.heading}</SplitReveal>
        <div
          ref={grid}
          onPointerMove={(e) => {
            const g = grid.current;
            if (!g) return;
            g.querySelectorAll<HTMLElement>("[data-tile]").forEach((t) => {
              const r = t.getBoundingClientRect();
              t.style.setProperty("--mx", `${e.clientX - r.left}px`);
              t.style.setProperty("--my", `${e.clientY - r.top}px`);
            });
          }}
          className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-6"
        >
          {home.why.items.map((it, i) => (
            <div
              key={it.title}
              data-tile
              className={`group relative overflow-hidden rounded-[24px] border border-line bg-ink-2/70 p-7 backdrop-blur-sm md:min-h-64 md:p-9 ${spans[i]}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [.grid:hover_&]:opacity-60"
                style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(124 92 255 / .22), transparent 60%)" }}
              />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <h3 className="font-display text-3xl font-semibold tracking-[-0.035em] md:text-4xl">{it.title}</h3>
                <p className="max-w-[40ch] text-haze">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CorePose>
  );
}
