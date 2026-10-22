import { Suspense } from "react";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { SetScene } from "@/components/three/SceneLayer";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = pageMeta({ ...contact.meta, path: "/contact" });

const details = [
  { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: Phone, label: "Phone", value: site.contact.phone, href: `tel:${site.contact.phoneHref}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: site.contact.whatsappHref },
  { icon: MapPin, label: "Based in", value: site.contact.address },
  { icon: Clock, label: "Hours", value: `${site.contact.hours}. ${site.contact.replyTime}` },
];

export default function ContactPage() {
  return (
    <>
      <SetScene id="hello" />
      <section className="relative pb-10 pt-36 md:pt-44">
        <div className="container-x">
          <p className="mb-6 text-[15px] text-haze">{contact.hero.eyebrow}</p>
          <SplitReveal as="h1" onIntro className="max-w-[12ch] font-display text-[clamp(2.75rem,6.8vw,7.25rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {contact.hero.headline}
          </SplitReveal>
          <p className="mt-8 max-w-[44ch] text-lede text-bone/80">{contact.hero.subhead}</p>
        </div>
      </section>

      <section aria-label="Contact form" className="relative pb-16 pt-10">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="glass min-h-[560px] rounded-[28px]" />}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="lg:col-span-4">
            <div className="pixel-card rounded-[20px] bg-ink-2/75 p-7 backdrop-blur-sm lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">Prefer to talk directly?</h2>
              <ul className="mt-6 space-y-5">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border-2 border-line text-sprout">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm text-haze">{label}</span>
                      {href ? (
                        <a href={href} className="text-bone hover:underline" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                          {value}
                        </a>
                      ) : (
                        <span className="text-bone">{value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-[15px] text-haze">
                {site.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-bone">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
