import { site } from "./site";

export const home = {
  meta: {
    title: `${site.name} — Digital Marketing Agency in ${site.city} | Web, SEO & Ads`,
    description: `${site.name} builds high-converting websites and runs SEO, Google Ads and social campaigns that grow revenue. Get a free audit today.`,
  },
  hero: {
    eyebrow: `Digital marketing agency · ${site.city}`,
    headlineLead: "We build brands people",
    rotating: ["remember", "find", "buy from", "talk about"],
    subhead:
      "Websites that convert, SEO that ranks, and campaigns that pay for themselves. Ten services, one team, measured by your growth.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "See our work", href: "#work" },
  },
  logosLabel: "Trusted by brands that refuse to blend in",
  /** Sample client names — replace with real client logos (SVG) before launch. */
  logos: ["Northwind", "Kestrel & Co", "Bloomfield", "Arcadia Foods", "Meridian", "Saltline", "Vantage Labs", "Copperleaf", "Halcyon", "Brightwater"],
  manifesto:
    "Most agencies sell you a website. We build you a growth engine — design that stops the scroll, search visibility that brings customers to you, and campaigns tracked down to the last rupee and dollar.",
  services: {
    heading: "Everything you need to grow online. Under one roof.",
    subhead: "Pick one service or let us run the whole engine.",
  },
  results: {
    heading: "Results, not reports.",
    /** Sample values — replace with real averages from your client work. */
    items: [
      { value: 180, suffix: "%", label: "average increase in organic traffic within 6 months" },
      { value: 4.2, suffix: "x", label: "average return on ad spend across PPC clients", decimals: 1 },
      { value: 120, suffix: "+", label: "websites launched" },
      { value: 92, suffix: "%", label: "client retention rate" },
    ],
  },
  work: {
    heading: "Work that moved the numbers.",
    subhead: "A few projects we're proud of. Ask us for the full case studies.",
    /** Sample projects — replace with real case studies. */
    items: [
      { client: "Saltline Clinics", industry: "Healthcare", services: ["Website", "Local SEO"], result: "+212% leads in 90 days", hue: 262 },
      { client: "Arcadia Foods", industry: "Food & beverage", services: ["Branding", "Social"], result: "3x Instagram reach in 4 months", hue: 330 },
      { client: "Vantage Labs", industry: "B2B SaaS", services: ["SEO", "Content"], result: "Page one for 48 target keywords", hue: 188 },
      { client: "Copperleaf Home", industry: "E-commerce", services: ["Store", "Email", "Google Ads"], result: "4.6x return on ad spend", hue: 30 },
    ],
  },
  process: {
    heading: "How we work. Four steps, zero guesswork.",
    steps: [
      { title: "Discover", body: "We learn your business, customers and competitors, then audit what you have today.", time: "Week 1" },
      { title: "Strategize", body: "A clear plan with goals, channels, budget and the numbers we'll be judged on.", time: "Week 2" },
      { title: "Build & launch", body: "Design, development and campaigns go live, tested on every device.", time: "Weeks 3–8" },
      { title: "Grow", body: "Monthly reporting, testing and optimisation so results keep compounding.", time: "Ongoing" },
    ],
  },
  why: {
    heading: `Why brands stay with ${site.name}.`,
    items: [
      { title: "No templates.", body: "Every site and campaign is built for your business, not copied from the last one." },
      { title: "One team, every channel.", body: "Design, SEO, ads and content talk to each other, so nothing works in a silo." },
      { title: "Transparent reporting.", body: "A live dashboard and a monthly call. You always know where the money went." },
      { title: "Speed matters.", body: "Sites built to score 90+ on Google PageSpeed and load in under 2 seconds." },
      { title: "No lock-in contracts.", body: "We keep clients with results, not paperwork." },
      { title: "You own everything.", body: "Domains, accounts, code and designs are yours from day one." },
    ],
  },
  testimonials: {
    heading: "Don't take our word for it.",
    /** Sample testimonials — replace with real, attributable client quotes before launch. */
    items: [
      { quote: "Our leads tripled within three months of the new site and SEO going live. The team explains everything in plain English.", who: "Owner", org: "Home services company" },
      { quote: "They took our ad spend from break-even to 4x return. Best decision we made this year.", who: "Marketing lead", org: "E-commerce brand" },
      { quote: "The new brand finally looks like the business we are. Customers comment on it constantly.", who: "Founder", org: "Café chain" },
    ],
  },
  faq: {
    heading: "Questions we hear every week.",
    items: [
      { q: "How much does a website cost?", a: "Most business websites fall between $1,500 and $8,000 depending on pages, features and content. You get a fixed quote after a free discovery call." },
      { q: "How long until I see SEO results?", a: "Usually 3–6 months for meaningful movement, depending on competition and your site's starting point. We share progress monthly." },
      { q: "Do I need a long contract?", a: "No. Projects are fixed-scope; monthly services run month-to-month after an initial 3-month period." },
      { q: `Do you work with businesses outside ${site.city}?`, a: "Yes. We work with clients across Pakistan and internationally, fully remote." },
      { q: "What do I need to get started?", a: "A 30-minute call. We handle the rest." },
    ],
  },
  finalCta: {
    headline: "Got a project in mind? Let's make it impossible to ignore.",
    subhead: "Tell us where you want to be in 12 months. We'll show you how to get there — free.",
    primary: { label: "Start a project", href: "/contact" },
    secondary: { label: "Book a free 30-minute call", href: site.contact.calendarUrl },
  },
};
