import type { FaqItem } from "@/content/types";
import { Accordion } from "@/components/ui/Accordion";
import { SplitReveal } from "@/components/motion/SplitReveal";

export function Faq({ heading, items }: { heading: string; items: FaqItem[] }) {
  return (
    <section aria-label="Frequently asked questions" className="relative py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SplitReveal className="font-display text-title font-semibold lg:sticky lg:top-32">{heading}</SplitReveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
