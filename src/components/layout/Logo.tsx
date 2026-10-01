import Link from "next/link";
import { site } from "@/content/site";

/** Placeholder wordmark: an orbit glyph + name. Swap the SVG for your real logo. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={`${site.name} home`}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden className="transition-transform duration-700 ease-out-expo group-hover:rotate-180">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7C5CFF" />
            <stop offset="0.55" stopColor="#FF5FA2" />
            <stop offset="1" stopColor="#3DE3F5" />
          </linearGradient>
        </defs>
        <circle cx="14" cy="14" r="6.5" fill="url(#lg)" />
        <ellipse cx="14" cy="14" rx="12.5" ry="5" fill="none" stroke="#EEEAF7" strokeOpacity="0.7" strokeWidth="1.3" transform="rotate(-25 14 14)" />
        <circle cx="25" cy="9" r="1.8" fill="#EEEAF7" />
      </svg>
      <span className="font-display text-[22px] font-semibold tracking-[-0.04em]">{site.name.toLowerCase()}</span>
    </Link>
  );
}
