import Link from "next/link";
import { site } from "@/content/site";

/** Bengan Studios pixel logo: eggplant mascot + BENGAN / STUDIOS wordmark. */
export function Logo({ className = "", height = 40 }: { className?: string; height?: number }) {
  const width = Math.round((height * 594) / 204);
  return (
    <Link href="/" className={`group inline-flex items-center ${className}`} aria-label={`${site.name} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- crisp pixel SVG, no optimisation needed */}
      <img
        src="/brand/logo-horizontal.svg"
        alt={site.name}
        width={width}
        height={height}
        className="pixelated block transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

/** The mascot on its own, for small spaces and decorative use. */
export function Mascot({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- crisp pixel SVG
    <img src="/brand/mascot.svg" alt="" aria-hidden width={size} height={Math.round((size * 1020) / 960)} className={`pixelated ${className}`} />
  );
}
