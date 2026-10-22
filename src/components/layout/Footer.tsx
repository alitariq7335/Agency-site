import Link from "next/link";
import { Logo, Mascot } from "./Logo";
import { site } from "@/content/site";
import { serviceLines, servicesInLine } from "@/content/services";
import { NewsletterForm } from "./NewsletterForm";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t-2 border-line bg-ink-2">
      <div className="container-x pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo height={48} />
            <p className="mt-6 max-w-xs text-haze">{site.description}</p>
            <p className="mt-6 font-pixel text-[11px] leading-relaxed text-sprout">{site.tagline}</p>
          </div>
          <nav aria-label="Services" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            {serviceLines.map((l) => (
              <div key={l.id}>
                <p className="mb-3 flex items-center gap-2 font-display text-base font-semibold">
                  <span className="h-2 w-2" style={{ background: l.accent }} />
                  {l.title}
                </p>
                <ul className="space-y-1.5 text-[15px] text-haze">
                  {servicesInLine(l.id).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="hover:text-bone">
                        {s.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="mb-3 font-display text-base font-semibold">Company</p>
              <ul className="space-y-1.5 text-[15px] text-haze">
                <li><Link href="/about" className="hover:text-bone">About</Link></li>
                <li><Link href="/services" className="hover:text-bone">All services</Link></li>
                <li><Link href="/#process" className="hover:text-bone">Process</Link></li>
                <li><Link href="/contact" className="hover:text-bone">Contact</Link></li>
              </ul>
            </div>
          </nav>
          <div className="lg:col-span-3">
            <p className="mb-3 font-display text-base font-semibold">Say hello</p>
            <address className="space-y-1.5 text-[15px] not-italic text-haze">
              <a href={`mailto:${site.contact.email}`} className="block text-bone hover:underline">{site.contact.email}</a>
              <a href={site.contact.whatsappHref} target="_blank" rel="noreferrer" className="block hover:text-bone">WhatsApp {site.contact.whatsapp}</a>
              <span className="block">{site.contact.hours}</span>
              <span className="block">{site.contact.replyTime}</span>
            </address>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-haze">
              {site.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-bone">
                  {s.label}
                </a>
              ))}
            </div>
            <div className="mt-8">
              <p className="mb-3 text-[15px] text-bone">Monthly growth tips. No spam.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div aria-hidden className="mt-20 flex select-none items-end gap-4 overflow-hidden md:gap-8">
          <Mascot size={120} className="hidden shrink-0 opacity-80 md:block" />
          <p className="font-pixel text-[13vw] leading-[0.85] text-white/[0.05] md:text-[10vw]">Bengan</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-sm text-haze md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-bone">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-bone">Terms of Use</Link>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
