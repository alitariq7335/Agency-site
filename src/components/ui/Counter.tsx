"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Counts up to `value` the first time it scrolls into view. Renders the final value on the server. */
export function Counter({ value, decimals = 0, suffix = "", className }: { value: number; decimals?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const o = { v: 0 };
    gsap.to(o, {
      v: value,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        el.textContent = o.v.toFixed(decimals);
      },
    });
    el.textContent = (0).toFixed(decimals);
  });
  return (
    <span className={className}>
      <span ref={ref}>{value.toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}
