"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { home } from "@/content/home";
import { CorePose } from "@/components/motion/CorePose";
import { SplitReveal } from "@/components/motion/SplitReveal";

/** Four steps joined by a line that draws itself as you scroll. */
export function Process() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-line]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 60%", scrub: 0.5 } },
      );
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        gsap.fromTo(
          el.querySelector("[data-node]"),
          { scale: 0.4, backgroundColor: "#120f20" },
          { scale: 1, backgroundColor: "#7c5cff", duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none reverse" } },
        );
      });
    },
    { scope: root },
  );

  return (
    <CorePose pose="away" id="process" className="relative py-24 md:py-40">
      <div ref={root} className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SplitReveal className="font-display text-title font-semibold">{home.process.heading}</SplitReveal>
          </div>
        </div>
        <ol data-steps className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-line" />
          <span aria-hidden data-line className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-violet via-flare to-cyan" />
          {home.process.steps.map((step, i) => (
            <li key={step.title} data-step className="relative pb-16 pl-16 last:pb-0">
              <span data-node aria-hidden className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-line bg-ink-2 text-sm tabular-nums">
                {i + 1}
              </span>
              <p className="text-sm text-haze">{step.time}</p>
              <h3 className="mt-1 font-display text-4xl font-semibold tracking-[-0.035em] md:text-5xl">{step.title}</h3>
              <p className="mt-3 max-w-md text-lede text-bone/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </CorePose>
  );
}
