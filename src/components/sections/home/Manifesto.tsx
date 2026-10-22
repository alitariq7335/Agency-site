import { home } from "@/content/home";
import { WordScrub } from "@/components/motion/WordScrub";
import { CorePose } from "@/components/motion/CorePose";

export function Manifesto() {
  return (
    <CorePose pose="manifesto" className="relative py-32 md:py-56">
      <div className="container-x">
        <WordScrub
          text={home.manifesto}
          className="max-w-[24ch] font-display text-[clamp(2rem,4.8vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
        />
      </div>
    </CorePose>
  );
}
