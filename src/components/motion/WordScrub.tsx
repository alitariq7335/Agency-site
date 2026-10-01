"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** A statement that "reads itself": each word brightens as it scrolls through the viewport. */
export function WordScrub({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const spans = ref.current.querySelectorAll<HTMLSpanElement>("[data-w]");
      gsap.fromTo(
        spans,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} data-w className="inline">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
