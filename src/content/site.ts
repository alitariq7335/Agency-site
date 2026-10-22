/**
 * Global company settings — one edit here updates the whole site.
 * Items marked TODO are not in the company documentation yet; replace them before launch.
 */
/** Accepts "example.com", "https://example.com/" etc. and returns "https://example.com". */
function normalizeUrl(raw: string | undefined) {
  const v = (raw ?? "").trim();
  if (!v) return "https://benganstudios.com";
  const withProtocol = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return "https://benganstudios.com";
  }
}

export const site = {
  name: "Bengan Studios",
  shortName: "Bengan",
  legalName: "Bengan Studios",
  handle: "@BenganStudios",
  tagline: "Plant the idea. We'll grow it.",
  description:
    "Bengan Studios is a full-service digital agency that builds software, automates work with AI, and helps businesses grow online — for business owners in Pakistan and clients worldwide.",
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL),
  city: "Pakistan",
  country: "PK",
  locale: "en",
  contact: {
    email: "hello@benganstudios.com", // TODO: confirm once the domain is final
    phone: "+92 300 0000000", // TODO
    phoneHref: "+923000000000", // TODO
    whatsapp: "+92 300 0000000", // TODO
    whatsappHref: "https://wa.me/923000000000", // TODO
    address: "Pakistan · working worldwide, remote-first", // TODO: add a city or office address if you have one
    hours: "Mon–Sat, 10:00–19:00 (PKT)",
    replyTime: "We reply within one working day.",
    calendarUrl: "/contact", // TODO: swap for a Calendly / Cal.com link when you have one
  },
  /** One handle everywhere, as the brand guide says. TODO: confirm each profile exists. */
  social: [
    { label: "Instagram", href: "https://instagram.com/benganstudios" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/benganstudios" },
    { label: "Facebook", href: "https://facebook.com/benganstudios" },
    { label: "X", href: "https://x.com/BenganStudios" },
    { label: "YouTube", href: "https://youtube.com/@BenganStudios" },
  ],
  /** Brand palette from the identity guide */
  colors: {
    aubergine: "#2A1245",
    night: "#1A0A2E",
    purple: "#6A2C91",
    grape: "#A66BFF",
    sprout: "#7BE04F",
    coin: "#FFD23F",
    blush: "#FF7AC8",
    pixel: "#F6F0FF",
  },
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
] as const;
