"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/types";

/** FAQ accordion. Answers are in the HTML for crawlers even when collapsed visually. */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <li key={it.q}>
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl tracking-[-0.02em] md:text-2xl"
              >
                <span>{it.q}</span>
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-transform duration-500 ease-out-expo"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pr-14 text-haze">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {!isOpen && <p className="sr-only">{it.a}</p>}
          </li>
        );
      })}
    </ul>
  );
}
