"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Page transition: a violet curtain sweeps off as each route mounts.
 * Content itself is never transformed, so GSAP pinned sections keep working.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-gradient-to-b from-violet via-[#2a1a6e] to-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </>
  );
}
