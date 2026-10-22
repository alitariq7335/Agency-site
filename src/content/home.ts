import { site } from "./site";

export const home = {
  meta: {
    title: `${site.name} — Software, AI & Digital Marketing Agency in Pakistan`,
    description:
      "Bengan Studios builds websites, apps and online stores, automates work with AI chatbots and workflows, and grows businesses with Local SEO, Google Business Profile and Meta ads.",
  },
  hero: {
    eyebrow: "Digital agency · Pakistan & worldwide",
    tagline: ["Plant the idea.", "We'll grow it."],
    subhead:
      "Bengan Studios is the one team a business can call for the whole digital side: we build it, automate it, market it and keep it running.",
    primaryCta: { label: "Plant your idea", href: "/contact" },
    secondaryCta: { label: "Explore services", href: "/services" },
    promises: ["Reply within one working day", "Clear prices, written scope", "You own everything once paid", "30 days of support after launch"],
  },
  toolsLabel: "We build with tools you already trust",
  tools: ["Shopify", "WordPress", "WooCommerce", "Next.js", "React Native", "Flutter", "OpenAI", "Claude", "WhatsApp Business", "n8n", "HubSpot", "Meta Ads", "Google Business Profile", "Canva", "Figma"],
  manifesto:
    "Most businesses juggle a web designer, a marketer, a developer and a nephew who “does the Facebook page”. We're one team for all of it — so your website, your store, your automations and your ads finally work together.",
  services: {
    heading: "Five service lines. One team behind all of them.",
    subhead: "Buy one service, or combine them. A store can start with setup, then add management, Meta ads and social media.",
  },
  markets: {
    heading: "Two kinds of clients. One honest team.",
    local: {
      label: "For businesses in Pakistan",
      headline: "We get you more customers.",
      body: "You already have customers — on WhatsApp, Facebook or walking through the door. We help more of them find you on Google and Maps, and give you a proper store and website to sell from.",
      points: ["Online stores, Local SEO, Google Business Profile, Meta ads and social media", "Monthly retainers with exactly what's included written down", "WhatsApp-first communication and quick calls"],
      cta: { label: "Get a free local audit", href: "/contact?service=local-seo" },
    },
    international: {
      label: "For companies abroad",
      headline: "We build and automate your systems.",
      body: "You need a dependable team that ships on time and communicates clearly. We build AI chatbots, automations, custom software, mobile apps and Shopify or WordPress work — at a fair rate.",
      points: ["Fixed-price projects or hourly, billed in USD", "50% upfront, balance on delivery", "Weekly demo links and progress updates"],
      cta: { label: "Discuss a project", href: "/contact?service=ai-chatbots" },
    },
  },
  offers: {
    heading: "Where most clients start.",
    subhead: "Four flagship offers, each available in three tiers. Prices are quoted after a free discovery call, so you only pay for what you need.",
  },
  standards: {
    heading: "Our promises, in numbers.",
    items: [
      { value: "1", unit: "day", label: "Maximum time to reply to a client message, on working days" },
      { value: "30", unit: "days", label: "Of support after every launch, then an optional maintenance plan" },
      { value: "20+", unit: "tests", label: "Realistic questions every chatbot passes before it goes live" },
      { value: "100", unit: "%", label: "Ownership of the final work once it's paid in full" },
    ],
  },
  lab: {
    heading: "Fresh out of the lab.",
    subhead:
      "We're a new studio, so we'd rather show than tell. These sample projects show how we work — and our first three clients get a founding discount in return for a case study.",
    items: [
      { title: "Demo AI chatbot", kind: "AI", body: "A website and WhatsApp bot that answers FAQs, captures leads and hands over to a human.", status: "Building now", hue: "#A66BFF" },
      { title: "Sample Shopify store", kind: "E-commerce", body: "A complete store with products, local payments, courier setup and a tested checkout.", status: "Building now", hue: "#FFD23F" },
      { title: "Local SEO audit", kind: "Growth", body: "A real audit for a nearby business: Google profile, Maps ranking, competitors and quick wins.", status: "Building now", hue: "#FF7AC8" },
    ],
    founding: {
      title: "Become a founding client",
      body: "We're taking on our first three clients at a founding discount. In return, we ask for an honest testimonial and permission to share the work as a case study.",
      cta: { label: "Claim a founding spot", href: "/contact" },
    },
  },
  process: {
    heading: "Five stages. Your approval at every step.",
    steps: [
      { title: "Plan", body: "We confirm scope, milestones and dates, and collect your content and access.", time: "Stage 1" },
      { title: "Design", body: "You approve a mock-up, flow or content plan before we build anything.", time: "Stage 2" },
      { title: "Build", body: "We develop, set up or write in small steps, with a progress update at least once a week.", time: "Stage 3" },
      { title: "Review", body: "Our internal quality check first, then your review and revisions within the agreed rounds.", time: "Stage 4" },
      { title: "Launch & handover", body: "We go live, hand over logins and files, give a short training and start the support period.", time: "Stage 5" },
    ],
  },
  values: {
    heading: "How we work.",
    items: [
      { title: "Grow it", body: "Every project is measured by what it does for your business, not by hours spent." },
      { title: "Keep it simple", body: "Clear plans, plain language, no jargon." },
      { title: "Ship fast, ship well", body: "Small, frequent deliveries with quality checks before handover." },
      { title: "Play on purpose", body: "The pixel-and-eggplant brand is fun. The work behind it is serious." },
      { title: "Be honest", body: "Realistic timelines, clear prices and early warnings when something slips." },
    ],
    eggplant: {
      title: "Why an eggplant?",
      body: "“Bengan” means eggplant. Ideas are seeds: we plant them, tend them and help them grow into something your customers can actually use.",
    },
  },
  faq: {
    heading: "Questions we hear every week.",
    items: [
      { q: "How much does a project cost?", a: "It depends on the service and tier. After a free 20–30 minute discovery call, you get a one-to-two page proposal with scope, timeline, price and payment terms within two working days." },
      { q: "How do payments work?", a: "Projects start with a 50% deposit and the balance on delivery. Monthly retainers are paid at the start of each month. International clients pay in USD." },
      { q: "How many revisions do I get?", a: "The number of revision rounds is written into every proposal. Extra rounds are quoted separately, so there are no surprises." },
      { q: "Who owns the work?", a: "You do. Once paid in full, the final deliverables, code, designs and accounts are yours." },
      { q: "What about hosting, domains, ad spend and plugin fees?", a: "Third-party costs are paid by you directly, or billed at cost — we never mark them up." },
      { q: "Do you work with clients outside Pakistan?", a: "Yes. We work remotely with international clients on AI, development and e-commerce projects, with weekly updates and demo links." },
      { q: "Can you show previous work?", a: "We're a new studio, so our portfolio is growing. You can see our sample projects, and our first three clients get a founding discount in return for a case study." },
    ],
  },
  finalCta: {
    headline: "Got an idea? Let's plant it.",
    subhead: "Tell us what you want to build or grow. We'll reply within one working day with next steps — no jargon, no pressure.",
    primary: { label: "Plant your idea", href: "/contact" },
    secondary: { label: "Message us on WhatsApp", href: site.contact.whatsappHref },
  },
};
