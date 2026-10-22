"use client";

import { useRef } from "react";
import { home } from "@/content/home";
import { CorePose } from "@/components/motion/CorePose";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Mascot } from "@/components/layout/Logo";

const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"];
const dots = ["#7BE04F", "#A66BFF", "#FFD23F", "#FF7AC8", "#F6F0FF"];

/** Company values as a bento grid lit by a cursor spotlight, plus the "why an eggplant" tile. */
export function Values() {
  const grid = useRef<HTMLDivElement>(null);
  const e = home.values.eggplant;
  return (
    <CorePose pose="aside" className="relative py-24 md:py-36">
      <div className="container-x">
        <SplitReveal className="font-display text-title font-bold">{home.values.heading}</SplitReveal>
        <div
          ref={grid}
          onPointerMove={(ev) => {
            grid.current?.querySelectorAll<HTMLElement>("[data-tile]").forEach((t) => {
              const r = t.getBoundingClientRect();
              t.style.setProperty("--mx", `${ev.clientX - r.left}px`);
              t.style.setProperty("--my", `${ev.clientY - r.top}px`);
            });
          }}
          className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-6"
        >
          {home.values.items.map((it, i) => (
            <div key={it.title} data-tile className={`pixel-card group relative overflow-hidden rounded-[18px] p-7 md:min-h-56 md:p-8 ${spans[i]}`}>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgb(166 107 255 / .22), transparent 60%)" }}
              />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <span aria-hidden className="h-3 w-3" style={{ background: dots[i] }} />
                <div>
                  <h3 className="font-display text-3xl font-bold tracking-[-0.03em]">{it.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-haze">{it.body}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="relative flex flex-col gap-6 overflow-hidden rounded-[18px] bg-purple p-7 shadow-[6px_6px_0_0_#1A0A2E] md:col-span-6 md:flex-row md:items-center md:p-10">
            <Mascot size={96} className="shrink-0" />
            <div>
              <h3 className="font-pixel text-sm leading-relaxed text-sprout md:text-base">{e.title}</h3>
              <p className="mt-3 max-w-2xl text-lede text-bone/90">{e.body}</p>
            </div>
          </div>
        </div>
      </div>
    </CorePose>
  );
}
