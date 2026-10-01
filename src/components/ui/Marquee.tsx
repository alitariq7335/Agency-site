"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { motionState } from "@/lib/store";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Infinite marquee whose speed (and direction) responds to scroll velocity. */
export function Marquee({ children, reverse = false, speed = 40 }: { children: ReactNode; reverse?: boolean; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = track.current;
      if (!el || reduced) return;
      let x = 0;
      const dir = reverse ? 1 : -1;
      const tick = (_t: number, dt: number) => {
        const half = el.scrollWidth / 2;
        const boost = 1 + Math.min(6, Math.abs(motionState.velocity) * 0.25);
        const sign = motionState.velocity < -0.5 ? -1 : 1;
        x += dir * sign * speed * boost * (dt / 1000);
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        gsap.set(el, { x });
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { dependencies: [reduced, reverse, speed] },
  );

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
