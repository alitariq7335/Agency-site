"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="relative flex min-h-[80svh] items-end pb-20 pt-36">
      <div className="container-x">
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.04em]">This page didn&apos;t load.</h1>
        <p className="mt-4 max-w-md text-lede text-bone/75">Try again. If it keeps happening, email us and we&apos;ll fix it.</p>
        <button onClick={reset} className="mt-8 rounded-full bg-bone px-6 py-3 font-medium text-ink">Try again</button>
      </div>
    </section>
  );
}
