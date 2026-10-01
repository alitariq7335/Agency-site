import { CorePose } from "@/components/motion/CorePose";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Cta = { label: string; href: string };

/** Closing call to action: giant headline over the returning 3D Core. */
export function FinalCta({ headline, subhead, primary, secondary }: { headline: string; subhead?: string; primary: Cta; secondary?: Cta }) {
  return (
    <CorePose pose="finale" className="relative py-32 md:py-48">
      <div className="container-x text-center">
        <SplitReveal className="mx-auto max-w-[14ch] font-display text-[clamp(3rem,8vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
          {headline}
        </SplitReveal>
        {subhead && <p className="mx-auto mt-8 max-w-xl text-lede text-bone/75">{subhead}</p>}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton href={primary.href} size="lg">{primary.label}</MagneticButton>
          {secondary && (
            <MagneticButton href={secondary.href} size="lg" variant="ghost" external={secondary.href.startsWith("http")}>
              {secondary.label}
            </MagneticButton>
          )}
        </div>
      </div>
    </CorePose>
  );
}
