import { home } from "@/content/home";
import { Counter } from "@/components/ui/Counter";
import { CorePose } from "@/components/motion/CorePose";
import { SplitReveal } from "@/components/motion/SplitReveal";

export function Results() {
  return (
    <CorePose pose="aside" className="relative py-24 md:py-40">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <SplitReveal className="font-display text-title font-semibold lg:col-span-4 lg:col-start-1">{home.results.heading}</SplitReveal>
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {home.results.items.map((r) => (
            <div key={r.label} className="flex min-h-56 flex-col justify-between bg-ink/80 p-7 backdrop-blur-sm md:p-9">
              <dt className="order-2 max-w-[26ch] text-haze">{r.label}</dt>
              <dd className="order-1 font-display text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                <Counter value={r.value} decimals={r.decimals ?? 0} suffix={r.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </CorePose>
  );
}
