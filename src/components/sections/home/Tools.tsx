import { home } from "@/content/home";
import { Marquee } from "@/components/ui/Marquee";

/** The platforms we build with, as a scroll-reactive marquee (not client logos). */
export function Tools() {
  const half = Math.ceil(home.tools.length / 2);
  const rows = [home.tools.slice(0, half), home.tools.slice(half)];
  return (
    <section aria-label="Tools and platforms" className="relative py-16 md:py-24">
      <div className="container-x mb-8">
        <p className="text-[15px] text-haze">{home.toolsLabel}</p>
      </div>
      <div className="space-y-4">
        {rows.map((row, r) => (
          <Marquee key={r} reverse={r === 1} speed={r === 1 ? 32 : 40}>
            {row.map((name, i) => (
              <span
                key={name}
                className={`mx-6 whitespace-nowrap font-display text-5xl font-bold tracking-[-0.03em] md:mx-10 md:text-7xl ${
                  (i + r) % 2 ? "outline-text" : "text-bone/85"
                }`}
              >
                {name}
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
