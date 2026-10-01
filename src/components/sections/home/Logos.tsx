import { home } from "@/content/home";
import { Marquee } from "@/components/ui/Marquee";

/** Client names as a wordmark marquee. Replace with real SVG logos when available. */
export function Logos() {
  const half = Math.ceil(home.logos.length / 2);
  const rows = [home.logos.slice(0, half), home.logos.slice(half)];
  return (
    <section aria-label="Clients" className="relative py-16 md:py-24">
      <div className="container-x mb-8">
        <p className="text-[15px] text-haze">{home.logosLabel}</p>
      </div>
      <div className="space-y-4">
        {rows.map((row, r) => (
          <Marquee key={r} reverse={r === 1} speed={r === 1 ? 32 : 40}>
            {row.map((name, i) => (
              <span
                key={name}
                className={`mx-6 whitespace-nowrap font-display text-5xl font-semibold tracking-[-0.04em] md:mx-10 md:text-7xl ${
                  (i + r) % 2 ? "outline-text" : "text-bone/80"
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
