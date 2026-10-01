"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/content/site";
import { services, serviceGroups } from "@/content/services";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !menu);
    setScrolled(y > 40);
  });

  // Close menus when navigating; render-time reset avoids an effect cascade.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(false);
    setMega(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.6, ease }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={() => setMega(false)}
      >
        <div className="container-x pt-3 md:pt-4">
          <div
            className={cn(
              "flex items-center justify-between rounded-full py-2 pl-4 pr-2 transition-[background-color,border-color,backdrop-filter] duration-500",
              scrolled || mega ? "glass" : "border border-transparent",
            )}
          >
            <Logo />
            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const active = item.href === "/services" ? pathname.startsWith("/services") : pathname === item.href;
                const isServices = item.href === "/services";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setMega(isServices)}
                    onFocus={() => setMega(isServices)}
                    aria-expanded={isServices ? mega : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[15px] transition-colors",
                      active ? "text-bone" : "text-haze hover:text-bone",
                    )}
                  >
                    {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.07]" transition={{ duration: 0.5, ease }} />}
                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden items-center gap-1.5 rounded-full bg-bone px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-white sm:inline-flex"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                className="relative grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
                aria-label={menu ? "Close menu" : "Open menu"}
                aria-expanded={menu}
                onClick={() => setMenu((m) => !m)}
              >
                <span className={cn("absolute h-px w-5 bg-bone transition-transform duration-500 ease-out-expo", menu ? "rotate-45" : "-translate-y-1")} />
                <span className={cn("absolute h-px w-5 bg-bone transition-transform duration-500 ease-out-expo", menu ? "-rotate-45" : "translate-y-1")} />
              </button>
            </div>
          </div>

          {/* Services mega-menu (desktop) */}
          <AnimatePresence>
            {mega && (
              <motion.div
                initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease }}
                className="glass mt-2 hidden rounded-[28px] p-6 lg:block"
              >
                <div className="grid grid-cols-4 gap-6">
                  {serviceGroups.map((g) => (
                    <div key={g.id}>
                      <p className="mb-1 font-display text-lg">{g.title}</p>
                      <p className="mb-4 text-sm text-haze">{g.line}</p>
                      <ul className="space-y-1">
                        {services
                          .filter((s) => s.group === g.id)
                          .map((s) => (
                            <li key={s.slug}>
                              <Link href={`/services/${s.slug}`} className="group flex items-center gap-2 rounded-xl px-2 py-1.5 -mx-2 text-[15px] text-bone/90 hover:bg-white/[0.06]">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
                                {s.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm text-haze">
                  <span>Not sure where to start? We&apos;ll audit your site, rankings and ads for free.</span>
                  <Link href="/services" className="text-bone underline decoration-violet underline-offset-4 hover:decoration-bone">
                    Explore all services
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-xl lg:hidden"
            data-lenis-prevent
          >
            <div className="container-x flex min-h-full flex-col pb-10 pt-28">
              <nav aria-label="Mobile" className="flex flex-col">
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease }}
                  >
                    <Link href={item.href} onClick={() => setMenu(false)} className="block border-b border-line py-4 font-display text-5xl tracking-[-0.04em]">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] text-haze">
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMenu(false)} className="py-1 hover:text-bone">
                    {s.shortName}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-10 text-sm text-haze">
                <a href={`mailto:${site.contact.email}`} className="block text-bone">{site.contact.email}</a>
                <a href={`tel:${site.contact.phoneHref}`} className="block">{site.contact.phone}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
