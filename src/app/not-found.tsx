import { SetScene } from "@/components/three/SceneLayer";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <>
      <SetScene id="core" />
      <section className="relative flex min-h-[100svh] items-end pb-20 pt-36">
        <div className="container-x">
          <p className="font-pixel text-[clamp(4rem,16vw,14rem)] leading-[0.9] text-white/10">404</p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em]">This seed didn&apos;t sprout.</h1>
          <p className="mt-4 max-w-md text-lede text-bone/75">The link may be old or mistyped. Head home or tell us what you were looking for.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="/" size="lg">Back to home</MagneticButton>
            <MagneticButton href="/contact" size="lg" variant="ghost">Contact us</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
