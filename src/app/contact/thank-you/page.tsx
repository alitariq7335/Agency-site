import type { Metadata } from "next";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { SetScene } from "@/components/three/SceneLayer";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = { title: "Message received", robots: { index: false, follow: false } };

export default async function ThankYouPage({ searchParams }: PageProps<"/contact/thank-you">) {
  const sp = await searchParams;
  const raw = typeof sp.name === "string" ? sp.name : "";
  const name = raw.slice(0, 40) || "there";
  return (
    <>
      <SetScene id="core" />
      <section className="relative flex min-h-[100svh] items-end pb-20 pt-36">
        <div className="container-x">
          <h1 className="max-w-[12ch] font-display text-[clamp(2.75rem,7vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {contact.success.title}
          </h1>
          <p className="mt-8 max-w-[44ch] text-lede text-bone/80">{contact.success.body(name)}</p>
          <p className="mt-2 text-haze">Want to skip the wait?</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {site.contact.calendarUrl.startsWith("http") && (
              <MagneticButton href={site.contact.calendarUrl} size="lg" external>Book a call now</MagneticButton>
            )}
            <MagneticButton href={site.contact.whatsappHref} size="lg" variant={site.contact.calendarUrl.startsWith("http") ? "ghost" : "solid"} external>Chat on WhatsApp</MagneticButton>
            <MagneticButton href="/services" size="lg" variant="ghost">Explore services</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
