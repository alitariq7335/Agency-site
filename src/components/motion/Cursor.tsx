"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useFinePointer, useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Dot + trailing ring. Over elements with data-cursor="Label" the ring grows
 * into a labelled pill. Desktop with a fine pointer only.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!fine || reduced) return;
    document.documentElement.classList.add("has-cursor");
    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      const t = (e.target as Element | null)?.closest?.("[data-cursor], a, button, [role=button], input, textarea, select, label");
      setLabel(t?.getAttribute("data-cursor") ?? null);
      setHot(!!t);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] -ml-1 -mt-1 h-2 w-2 rounded-full bg-bone mix-blend-difference" />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[89] flex items-center justify-center"
      >
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[13px] font-medium transition-[width,height,background-color,border-color] duration-300 ease-out"
          style={{
            width: label ? 96 : hot ? 56 : 36,
            height: label ? 96 : hot ? 56 : 36,
            background: label ? "rgb(124 92 255 / 0.9)" : "transparent",
            borderColor: label ? "transparent" : "rgb(238 234 247 / 0.35)",
          }}
        >
          {label && <span className="text-white">{label}</span>}
        </div>
      </div>
    </>
  );
}
