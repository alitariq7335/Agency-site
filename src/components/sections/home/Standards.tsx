import { home } from "@/content/home";
import { CorePose } from "@/components/motion/CorePose";
import { SplitReveal } from "@/components/motion/SplitReveal";

/** Commitments from the delivery standards, shown as big pixel numbers (not invented results). */
export function Standards() {
  return (
    <CorePose pose="aside" className="relative py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <SplitReveal className="font-display text-title font-bold lg:col-span-4">{home.standards.heading}</SplitReveal>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {home.standards.items.map((r, i) => (
            <div key={r.label} className="pixel-card flex min-h-52 flex-col justify-between rounded-[18px] p-7">
              <dd className="order-1 flex items-baseline gap-2">
                <span className="font-pixel text-[clamp(2.5rem,4.6vw,4rem)] leading-none" style={{ color: ["#7BE04F", "#FFD23F", "#A66BFF", "#FF7AC8"][i] }}>
                  {r.value}
                </span>
                <span className="font-pixel text-xs text-bone/70">{r.unit}</span>
              </dd>
              <dt className="order-2 mt-8 max-w-[30ch] text-haze">{r.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </CorePose>
  );
}
