"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
};

/** Primary CTA: pulled toward the cursor, with an icon disc that rolls on hover. */
export function MagneticButton({ href, children, variant = "solid", size = "md", className, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-3 rounded-full font-medium transition-colors duration-300 will-change-transform";
  const sizes = size === "lg" ? "pl-7 pr-2 py-2 text-lg" : "pl-5 pr-1.5 py-1.5 text-[15px]";
  const variants =
    variant === "solid"
      ? "bg-bone text-ink hover:bg-white"
      : "border border-line text-bone hover:border-bone/40 bg-white/[0.02] backdrop-blur-md";

  const content = (
    <>
      <span className="relative">{children}</span>
      <span
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-full",
          size === "lg" ? "h-11 w-11" : "h-9 w-9",
          variant === "solid" ? "bg-ink text-bone" : "bg-bone text-ink",
        )}
      >
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-6 group-hover:-translate-y-6" />
        <ArrowUpRight className="absolute h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </>
  );

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-block">
      {external ? (
        <a ref={ref} href={href} target="_blank" rel="noreferrer" onPointerMove={onMove} onPointerLeave={reset} className={cn(base, sizes, variants, className)}>
          {content}
        </a>
      ) : (
        <Link ref={ref} href={href} onPointerMove={onMove} onPointerLeave={reset} className={cn(base, sizes, variants, className)}>
          {content}
        </Link>
      )}
    </motion.span>
  );
}
