/**
 * Global site settings. Every placeholder lives here so one edit updates the whole site.
 * BEFORE LAUNCH: replace the brand name, contact details and stats with real values.
 * Stats with `value: null` are hidden automatically.
 */
export const site = {
  name: "Orbitly", // placeholder brand name — replace with your agency name
  legalName: "Orbitly Digital", // placeholder
  tagline: "We build brands people remember.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  city: "Pakistan", // primary market, e.g. "Lahore"
  country: "PK",
  locale: "en",
  contact: {
    email: "hello@example.com",
    phone: "+92 300 0000000",
    phoneHref: "+923000000000",
    whatsapp: "+92 300 0000000",
    whatsappHref: "https://wa.me/923000000000",
    address: "Office address, City, Pakistan",
    hours: "Mon–Fri, 10:00–19:00 (PKT)",
    mapUrl: "https://maps.google.com",
    calendarUrl: "#", // e.g. Calendly link for "Book a call"
  },
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
  /** Sample values for layout — replace with your real numbers or set to null to hide. */
  stats: {
    projects: 120 as number | null,
    clients: 80 as number | null,
    years: 6 as number | null,
    rating: 4.9 as number | null,
  },
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
] as const;
