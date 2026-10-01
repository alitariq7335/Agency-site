import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { NewsletterForm } from "./NewsletterForm";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-line bg-ink">
      <div className="container-x pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-haze">
              {site.name} — {site.tagline.charAt(0).toLowerCase() + site.tagline.slice(1)}
            </p>
            <div className="mt-8">
              <p className="mb-3 text-[15px] text-bone">Monthly growth tips. No spam.</p>
              <NewsletterForm />
            </div>
          </div>
          <nav aria-label="Services" className="lg:col-span-3">
            <p className="mb-4 font-display text-lg">Services</p>
            <ul className="space-y-2 text-[15px] text-haze">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-bone">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company" className="lg:col-span-2">
            <p className="mb-4 font-display text-lg">Company</p>
            <ul className="space-y-2 text-[15px] text-haze">
              <li><Link href="/services" className="hover:text-bone">All services</Link></li>
              <li><Link href="/#work" className="hover:text-bone">Work</Link></li>
              <li><Link href="/#process" className="hover:text-bone">Process</Link></li>
              <li><Link href="/contact" className="hover:text-bone">Contact</Link></li>
            </ul>
            <p className="mb-4 mt-8 font-display text-lg">Social</p>
            <ul className="space-y-2 text-[15px] text-haze">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-bone">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="mb-4 font-display text-lg">Contact</p>
            <address className="space-y-2 text-[15px] not-italic text-haze">
              <a href={`mailto:${site.contact.email}`} className="block text-bone hover:underline">{site.contact.email}</a>
              <a href={`tel:${site.contact.phoneHref}`} className="block hover:text-bone">{site.contact.phone}</a>
              <a href={site.contact.whatsappHref} target="_blank" rel="noreferrer" className="block hover:text-bone">WhatsApp {site.contact.whatsapp}</a>
              <span className="block">{site.contact.address}</span>
              <span className="block">{site.contact.hours}</span>
            </address>
          </div>
        </div>

        <p aria-hidden className="mt-20 select-none font-display text-[19vw] font-bold leading-[0.8] tracking-[-0.07em] text-white/[0.04]">
          {site.name.toLowerCase()}
        </p>

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 text-sm text-haze md:flex-row md:items-center md:justify-between">
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
