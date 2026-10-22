import { Check } from "lucide-react";
import { home } from "@/content/home";
import { CorePose } from "@/components/motion/CorePose";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Market = typeof home.markets.local;

function Panel({ m, accent }: { m: Market; accent: string }) {
  return (
    <article className="pixel-card relative flex flex-col overflow-hidden rounded-[20px] p-7 md:p-10">
      <span aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl" style={{ background: accent }} />
      <p className="relative text-[15px] font-semibold" style={{ color: accent }}>
        {m.label}
      </p>
      <h3 className="relative mt-4 font-display text-[clamp(2rem,3.4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em]">{m.headline}</h3>
      <p className="relative mt-4 max-w-lg text-bone/80">{m.body}</p>
      <ul className="relative mt-6 space-y-2.5">
        {m.points.map((p) => (
          <li key={p} className="flex gap-3 text-[15px] text-bone/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
            {p}
          </li>
        ))}
      </ul>
      <div className="relative mt-auto pt-8">
        <MagneticButton href={m.cta.href} variant="ghost">{m.cta.label}</MagneticButton>
      </div>
    </article>
  );
}

/** Two markets, two lead messages (company documentation, section 3). */
export function Markets() {
  return (
    <CorePose pose="away" className="relative py-24 md:py-36">
      <div className="container-x">
        <SplitReveal className="max-w-[18ch] font-display text-title font-bold">{home.markets.heading}</SplitReveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Panel m={home.markets.local} accent="#FF7AC8" />
          <Panel m={home.markets.international} accent="#A66BFF" />
        </div>
      </div>
    </CorePose>
  );
}
