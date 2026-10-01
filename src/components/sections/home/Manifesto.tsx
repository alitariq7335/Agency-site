import { home } from "@/content/home";
import { WordScrub } from "@/components/motion/WordScrub";
import { CorePose } from "@/components/motion/CorePose";

export function Manifesto() {
  return (
    <CorePose pose="manifesto" className="relative py-32 md:py-56">
      <div className="container-x">
        <WordScrub
          text={home.manifesto}
          className="max-w-[22ch] font-display text-[clamp(2rem,5.2vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.035em]"
        />
      </div>
    </CorePose>
  );
}
