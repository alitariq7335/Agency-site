import type { ReactNode } from "react";

/** Simple long-form layout for legal pages. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="relative pb-20 pt-36 md:pt-44">
      <div className="container-x max-w-3xl">
        <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">{title}</h1>
        <p className="mt-4 text-haze">Last updated {updated}</p>
        <div className="mt-12 space-y-6 text-bone/85 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-bone [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </section>
  );
}
