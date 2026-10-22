import { site } from "./site";
import type { Service, ServiceLine, ServiceLineId } from "./types";

const A = site.name;

/** The five service lines from the company documentation. */
export const serviceLines: ServiceLine[] = [
  {
    id: "ai",
    title: "AI",
    line: "Chatbots and automations that answer customers and do the busywork.",
    accent: "#A66BFF",
    market: "International · premium local",
    approach: "We define the questions and tasks the bot or automation must handle, build and test on real examples, then deploy.",
    qualityCheck: "Tested with at least 20 realistic questions or cases, including the handoff to a human.",
    steps: [
      { title: "Map it", body: "List the questions, tasks and tools the bot or automation must handle." },
      { title: "Build it", body: "Train on your real content and connect your tools in small, testable steps." },
      { title: "Test it", body: "At least 20 realistic questions or cases, plus a clean handoff to a human." },
      { title: "Launch it", body: "Go live, train your team and watch the first weeks closely." },
    ],
  },
  {
    id: "development",
    title: "Development",
    line: "Software, apps, websites, plugins and CRMs, built to last.",
    accent: "#7BE04F",
    market: "International · local for websites",
    approach: "Short build cycles with demo links, and all code kept in version control.",
    qualityCheck: "Tested on phone and desktop; forms, payments and logins checked before handover.",
    steps: [
      { title: "Plan", body: "Confirm scope, milestones and dates, and collect content and access." },
      { title: "Design", body: "A mock-up or flow you approve before any code is written." },
      { title: "Build", body: "Short cycles with a demo link and a progress update at least once a week." },
      { title: "Launch & hand over", body: "Go live, hand over code and logins, short training, then 30 days of support." },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    line: "Online stores set up, stocked and run for you.",
    accent: "#FFD23F",
    market: "Pakistan and worldwide",
    approach: "We set up the store, products, payments and shipping, then manage orders and stock if you want us to.",
    qualityCheck: "A test order placed end to end; taxes, shipping and order emails checked.",
    steps: [
      { title: "Plan", body: "Products, platform, payments, shipping and who manages orders." },
      { title: "Set up", body: "Store design, product uploads, payment and courier setup." },
      { title: "Test", body: "A real test order end to end, including taxes, shipping and emails." },
      { title: "Launch & manage", body: "Go live, then daily orders and stock management if you choose it." },
    ],
  },
  {
    id: "growth",
    title: "Growth marketing",
    line: "Get found on Google and Maps, and reach buyers on Facebook and Instagram.",
    accent: "#FF7AC8",
    market: "Pakistan",
    approach: "Audit, plan, launch, then optimise every month.",
    qualityCheck: "Tracking and listings checked before launch; a monthly report with results.",
    steps: [
      { title: "Audit", body: "Where you stand today on Google, Maps and social, and what competitors do." },
      { title: "Plan", body: "Goals, budget, audiences and the numbers we'll report on." },
      { title: "Launch", body: "Fixes, listings and campaigns go live with tracking checked first." },
      { title: "Optimise", body: "Monthly changes and a plain-English report with results." },
    ],
  },
  {
    id: "content",
    title: "Content & social",
    line: "Posts, graphics and short videos that keep your pages alive.",
    accent: "#D9C2FF",
    market: "Pakistan",
    approach: "A monthly content calendar approved by you, then scheduled posting.",
    qualityCheck: "Proofread, brand colours and fonts checked, and your approval before anything is posted.",
    steps: [
      { title: "Plan", body: "A monthly calendar of posts, formats and dates for your approval." },
      { title: "Create", body: "Graphics, captions and short videos made in your brand style." },
      { title: "Approve", body: "Proofread and brand-checked; nothing posts without your OK." },
      { title: "Post & reply", body: "Scheduled posting and replies to comments and messages." },
    ],
  },
];

export const services: Service[] = [
  // ───────────────────────── AI ─────────────────────────
  {
    slug: "ai-chatbots",
    order: 1,
    name: "AI Chatbots",
    shortName: "AI Chatbots",
    line: "ai",
    market: "both",
    flagship: true,
    pitch: "Website and WhatsApp bots that answer customers and capture leads, day and night.",
    sceneId: "social",
    accent: "#A66BFF",
    meta: {
      title: `AI Chatbots for Websites & WhatsApp | ${A}`,
      description:
        "Custom AI chatbots for your website and WhatsApp that answer customer questions, capture leads and hand over to a human when needed.",
    },
    hero: {
      eyebrow: "AI Chatbots",
      headline: "A team member who answers every message, instantly.",
      subhead:
        "We build AI chatbots for your website and WhatsApp that know your business, answer customers in seconds, capture leads and pass tricky chats to a real person.",
      cta: "Plan my chatbot",
    },
    problem:
      "Customers message at midnight, on weekends and during your busiest hours. Every slow reply is a sale that goes to whoever answered first. Hiring people to sit on chat all day is expensive, and most questions are the same ten anyway.",
    included: [
      { title: "Website chatbot", body: "A chat widget on your site that answers questions from your own content." },
      { title: "WhatsApp chatbot", body: "Automatic replies on WhatsApp Business for FAQs, orders and bookings." },
      { title: "Lead capture", body: "The bot collects name, need and contact details and sends them to you." },
      { title: "Human handoff", body: "When a chat needs a person, it is passed to your team with full context." },
      { title: "Trained on your business", body: "Prices, policies, services and FAQs, written in your tone." },
      { title: "Tested before launch", body: "At least 20 realistic customer questions checked before it goes live." },
    ],
    audience:
      "Businesses that get the same questions every day: clinics, schools, stores, service companies, SaaS teams and agencies that want faster replies without hiring more support staff.",
    tools: ["OpenAI", "Claude", "WhatsApp Business API", "Voiceflow", "Botpress", "n8n", "Make", "HubSpot"],
    faq: [
      { q: "Will the bot make things up?", a: "We limit it to your approved content and test it on real questions before launch. When it isn't sure, it hands the chat to a person." },
      { q: "Can it work on WhatsApp?", a: "Yes, through the WhatsApp Business API. We help you set up the account if you don't have one." },
      { q: "Can I update what it knows?", a: "Yes. You can add or change answers, or we update it for you during the support period." },
    ],
    finalCta: { headline: "Let your chatbot take the first message.", cta: "Plan my chatbot" },
    related: ["ai-automation", "crm-systems", "website-development"],
  },
  {
    slug: "ai-automation",
    order: 2,
    name: "AI Automation",
    shortName: "AI Automation",
    line: "ai",
    market: "both",
    flagship: true,
    pitch: "Workflows that move data between your tools and handle repetitive work for you.",
    sceneId: "automation",
    accent: "#A66BFF",
    meta: {
      title: `AI Workflow Automation for Businesses | ${A}`,
      description:
        "We automate repetitive work between your tools — leads, orders, reports, emails and data entry — with AI-assisted workflows that save hours every week.",
    },
    hero: {
      eyebrow: "AI Automation",
      headline: "Stop copy-pasting. Let the workflow do it.",
      subhead:
        "We connect your forms, sheets, CRM, store and inbox so leads, orders and reports move on their own — with AI handling the sorting, summarising and first drafts.",
      cta: "Automate my work",
    },
    problem:
      "Your team spends hours moving the same information between tools: copying leads into a sheet, sending the same follow-up email, building the same weekly report. It is slow, it is boring, and it is where mistakes creep in.",
    included: [
      { title: "Workflow audit", body: "We find the repetitive tasks that cost you the most time." },
      { title: "Tool connections", body: "Forms, Google Sheets, CRM, email, WhatsApp, Shopify and more, linked together." },
      { title: "AI-assisted steps", body: "Sort enquiries, summarise messages, draft replies and extract data automatically." },
      { title: "Lead routing", body: "New leads land in the right place and the right person is notified." },
      { title: "Automatic reports", body: "Daily or weekly summaries sent to your inbox or chat." },
      { title: "Error alerts", body: "If a step fails, you know straight away instead of finding out weeks later." },
    ],
    audience:
      "Small and mid-size teams that run on spreadsheets, inboxes and several apps, and want hours back every week without replacing their tools.",
    tools: ["n8n", "Make", "Zapier", "OpenAI", "Claude", "Google Workspace", "Airtable", "HubSpot"],
    faq: [
      { q: "Do I need to change my current tools?", a: "Usually not. We connect the tools you already use and only suggest changes when they save real time." },
      { q: "What does it cost to run?", a: "Some automation platforms and AI services charge monthly. We estimate these running costs before we start; they're paid by you directly." },
      { q: "What if something breaks?", a: "Every workflow has error alerts, and fixes are included during the support period." },
    ],
    finalCta: { headline: "Which task would you never do again?", cta: "Automate my work" },
    related: ["ai-chatbots", "crm-systems", "software-development"],
  },

  // ───────────────────── Development ─────────────────────
  {
    slug: "software-development",
    order: 3,
    name: "Custom Software",
    shortName: "Software",
    line: "development",
    market: "international",
    pitch: "Custom web apps and internal tools built around how your business works.",
    sceneId: "web",
    accent: "#7BE04F",
    meta: {
      title: `Custom Software & Web App Development | ${A}`,
      description:
        "Custom web applications, dashboards and internal tools built in short cycles with demo links, clean code and full ownership for you.",
    },
    hero: {
      eyebrow: "Custom Software",
      headline: "Software shaped around your business, not the other way round.",
      subhead:
        "Web apps, portals, dashboards and internal tools — built in short cycles so you see working software every week, not just at the end.",
      cta: "Discuss my project",
    },
    problem:
      "Off-the-shelf software forces your team into someone else's process, and spreadsheets stop working once the business grows. A custom tool fits how you actually work, but only if it's built by a team that ships in small, visible steps.",
    included: [
      { title: "Discovery & scope", body: "A written scope with features, milestones and a fixed or hourly price." },
      { title: "UX & interface design", body: "Clickable flows you approve before development starts." },
      { title: "Web application build", body: "Modern, maintainable code in version control from day one." },
      { title: "Integrations & APIs", body: "Payments, email, CRMs, maps and any service with an API." },
      { title: "Weekly demo links", body: "See progress every week and give feedback early." },
      { title: "Handover & support", body: "Code, documentation and logins handed over, plus 30 days of support." },
    ],
    audience:
      "Startups building a first product, agencies that need a reliable development partner, and companies replacing spreadsheets or outdated internal tools.",
    tools: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Supabase", "Firebase", "GitHub", "Vercel"],
    faq: [
      { q: "How do you price software projects?", a: "As a fixed price for a clearly scoped project, or hourly in USD. Projects start with 50% upfront and the balance on delivery." },
      { q: "Will I own the code?", a: "Yes. Once paid in full, the code, designs and accounts are yours." },
      { q: "Can you work with my existing team?", a: "Yes. We can join your repository, tools and stand-ups and work as an extension of your team." },
    ],
    finalCta: { headline: "Have a tool in mind? Let's build the first version.", cta: "Discuss my project" },
    related: ["mobile-app-development", "crm-systems", "ai-automation"],
  },
  {
    slug: "mobile-app-development",
    order: 4,
    name: "Mobile Applications",
    shortName: "Mobile Apps",
    line: "development",
    market: "international",
    pitch: "Android and iOS apps your customers will actually keep on their phones.",
    sceneId: "phone",
    accent: "#7BE04F",
    meta: {
      title: `Android & iOS App Development | ${A}`,
      description:
        "Android and iOS mobile apps built with React Native or Flutter — designed, developed, tested on real devices and published to the app stores.",
    },
    hero: {
      eyebrow: "Mobile Applications",
      headline: "Your business, one tap away.",
      subhead:
        "We design and build Android and iOS apps from one codebase, test them on real devices and handle the app store submission for you.",
      cta: "Plan my app",
    },
    problem:
      "A clunky app gets deleted the same day it's installed. Building separately for Android and iOS doubles the cost and the bugs. You need one team that designs it properly, builds it once and ships it to both stores.",
    included: [
      { title: "App design", body: "Screens and flows designed and approved before the build starts." },
      { title: "Android & iOS", body: "One cross-platform codebase for both, with native features where needed." },
      { title: "Backend & admin", body: "Logins, databases, notifications and an admin panel to manage content." },
      { title: "Payments & integrations", body: "In-app payments, maps, chat and your existing systems." },
      { title: "Real-device testing", body: "Tested on a range of phones before release." },
      { title: "Store submission", body: "Google Play and App Store listings prepared and submitted." },
    ],
    audience:
      "Startups launching an app-first product, businesses adding an app for loyal customers, and companies that need a field or staff app.",
    tools: ["React Native", "Expo", "Flutter", "Firebase", "Supabase", "Google Play Console", "App Store Connect"],
    faq: [
      { q: "Do you build for both Android and iPhone?", a: "Yes, usually from one codebase, which keeps cost and maintenance down." },
      { q: "Who pays the app store fees?", a: "App store developer accounts are in your name and paid by you, so you own the listing." },
      { q: "How long does an app take?", a: "It depends on features. You get a timeline with milestones in the proposal, and weekly builds to try on your phone." },
    ],
    finalCta: { headline: "Let's put your idea in people's pockets.", cta: "Plan my app" },
    related: ["software-development", "ai-chatbots", "crm-systems"],
  },
  {
    slug: "website-development",
    order: 5,
    name: "Websites",
    shortName: "Websites",
    line: "development",
    market: "both",
    pitch: "Fast, clear business websites that turn visitors into enquiries.",
    sceneId: "web",
    accent: "#7BE04F",
    meta: {
      title: `Business Website Design & Development | ${A}`,
      description:
        "Fast, mobile-friendly business websites with clear messaging, WhatsApp and contact forms built in, and SEO basics done right from day one.",
    },
    hero: {
      eyebrow: "Websites",
      headline: "A website that works as hard as you do.",
      subhead:
        "Fast, mobile-first business websites with clear messaging, WhatsApp and enquiry forms built in, and the SEO basics done properly from day one.",
      cta: "Start my website",
    },
    problem:
      "Many businesses still sell only through a Facebook page or WhatsApp. Customers searching on Google can't find you, and when they do, a slow or outdated site makes them leave. A good website is the one place you fully control.",
    included: [
      { title: "Custom design", body: "Designed for your brand and your customers, not a generic template." },
      { title: "Mobile-first build", body: "Fast and easy to use on the phones most of your visitors use." },
      { title: "Enquiry tools", body: "WhatsApp button, contact forms and click-to-call wired in." },
      { title: "SEO basics", body: "Page titles, descriptions, speed and Google Search Console set up." },
      { title: "Easy editing", body: "Update text and images yourself, with a short training session." },
      { title: "Launch & support", body: "Domain and hosting help, go-live, and 30 days of support." },
    ],
    audience:
      "Shops, clinics, restaurants, schools and service businesses that need a proper website, and international companies that want a fast, modern marketing site.",
    tools: ["Next.js", "WordPress", "Webflow", "Figma", "Google Search Console", "Google Analytics 4", "Hostinger", "Vercel"],
    faq: [
      { q: "Can I update the website myself?", a: "Yes. We build with an editor you can use and show you how in a short training session." },
      { q: "Do you handle the domain and hosting?", a: "We help you set them up in your name. Hosting and domain fees are paid by you directly." },
      { q: "Do you write the text?", a: "We can. Our content team writes clear copy, or we polish what you already have." },
    ],
    finalCta: { headline: "Ready to be found online?", cta: "Start my website" },
    related: ["wordpress-development", "local-seo", "ecommerce-stores"],
  },
  {
    slug: "plugin-development",
    order: 6,
    name: "Plugins",
    shortName: "Plugins",
    line: "development",
    market: "international",
    pitch: "Custom WordPress and Shopify plugins that add exactly the feature you need.",
    sceneId: "maintenance",
    accent: "#7BE04F",
    meta: {
      title: `Custom WordPress & Shopify Plugin Development | ${A}`,
      description:
        "Custom WordPress plugins and Shopify apps and extensions — built cleanly, tested against your theme, and documented for your team.",
    },
    hero: {
      eyebrow: "Plugins",
      headline: "The exact feature your site is missing.",
      subhead:
        "When no existing plugin does quite what you need, we build one: custom WordPress plugins and Shopify apps and extensions that fit your site cleanly.",
      cta: "Describe my feature",
    },
    problem:
      "Stacking five plugins to fake one feature slows your site down and breaks on the next update. A single, well-built custom plugin does the job properly and keeps your site fast.",
    included: [
      { title: "Requirements & scope", body: "A clear spec of what the plugin does and what it doesn't." },
      { title: "WordPress plugins", body: "Custom functionality, admin settings and WooCommerce extensions." },
      { title: "Shopify apps & extensions", body: "Theme app extensions, checkout tweaks and custom apps." },
      { title: "API integrations", body: "Connect your site to payment, shipping, CRM or other services." },
      { title: "Compatibility testing", body: "Tested against your theme, other plugins and recent versions." },
      { title: "Documentation", body: "Install and usage notes so your team isn't dependent on us." },
    ],
    audience:
      "Store owners and agencies who need one specific feature, and product companies that want to publish a plugin of their own.",
    tools: ["WordPress", "WooCommerce", "PHP", "Shopify CLI", "Shopify Polaris", "Liquid", "React", "GitHub"],
    faq: [
      { q: "Can you fix or extend a plugin someone else built?", a: "Often, yes. We review the code first and tell you honestly whether to extend it or rebuild it." },
      { q: "Will it break when WordPress or Shopify updates?", a: "We follow the platforms' standards to keep updates safe, and fixes are covered in the support period." },
      { q: "Can the plugin be sold to others?", a: "Yes. We can build it for public release, and you own it once paid." },
    ],
    finalCta: { headline: "Tell us the feature. We'll build the plugin.", cta: "Describe my feature" },
    related: ["wordpress-development", "shopify-development", "software-development"],
  },
  {
    slug: "crm-systems",
    order: 7,
    name: "CRM Systems",
    shortName: "CRM",
    line: "development",
    market: "international",
    pitch: "CRM setup and customisation so no lead or customer slips through the cracks.",
    sceneId: "automation",
    accent: "#7BE04F",
    meta: {
      title: `CRM Setup, Customisation & Integration | ${A}`,
      description:
        "CRM setup and customisation — pipelines, automations and integrations with your website, WhatsApp and email so every lead is tracked.",
    },
    hero: {
      eyebrow: "CRM Systems",
      headline: "Every lead, every customer, in one place.",
      subhead:
        "We set up and customise your CRM — pipelines, automations and integrations with your website, WhatsApp and inbox — so nothing slips through the cracks.",
      cta: "Set up my CRM",
    },
    problem:
      "Leads live in WhatsApp chats, inboxes and someone's notebook. Follow-ups are forgotten, and nobody knows which deals are close. A CRM fixes that, but only when it's set up around how your team actually sells.",
    included: [
      { title: "CRM selection", body: "Help choosing the right CRM for your team size and budget." },
      { title: "Pipeline setup", body: "Stages, fields and views that match how you sell." },
      { title: "Lead capture", body: "Website forms, chatbots and ads feed straight into the CRM." },
      { title: "Automations", body: "Follow-up reminders, emails and task assignment on autopilot." },
      { title: "Data migration", body: "Contacts and deals moved over from sheets or your old system." },
      { title: "Team training", body: "A short session so everyone actually uses it." },
    ],
    audience:
      "Sales teams, agencies, clinics, schools and service businesses that juggle leads across several channels.",
    tools: ["HubSpot", "Zoho CRM", "Pipedrive", "GoHighLevel", "Airtable", "n8n", "Zapier", "WhatsApp Business"],
    faq: [
      { q: "Which CRM do you recommend?", a: "It depends on your team and budget. We compare options with you and recommend one before setting anything up." },
      { q: "Can you build a custom CRM instead?", a: "Yes, when your process doesn't fit any existing CRM. We'll tell you honestly when an off-the-shelf one is the better choice." },
      { q: "Who pays the CRM subscription?", a: "The subscription is in your name and paid by you, so you own your data." },
    ],
    finalCta: { headline: "Stop losing leads in the chat history.", cta: "Set up my CRM" },
    related: ["ai-automation", "ai-chatbots", "software-development"],
  },

  // ───────────────────── E-commerce ─────────────────────
  {
    slug: "ecommerce-stores",
    order: 8,
    name: "Online Store Setup + Management",
    shortName: "Online Stores",
    line: "ecommerce",
    market: "both",
    flagship: true,
    pitch: "Your online store, designed, stocked and ready to take orders.",
    sceneId: "ecommerce",
    accent: "#FFD23F",
    meta: {
      title: `Online Store Setup & Management in Pakistan | ${A}`,
      description:
        "Complete online store setup — design, product uploads, local and international payments, courier setup — plus ongoing store management.",
    },
    hero: {
      eyebrow: "Online Store Setup + Management",
      headline: "From WhatsApp orders to a real online store.",
      subhead:
        "We design your store, upload your products, connect payments and couriers, and can run the day-to-day orders and stock for you.",
      cta: "Launch my store",
    },
    problem:
      "Selling only through WhatsApp and Instagram DMs means lost orders, endless price questions and no way to grow beyond what you can reply to. A proper store takes orders while you sleep — if it's set up right.",
    included: [
      { title: "Store design", body: "A clean, mobile-first storefront in your brand style." },
      { title: "Product uploads", body: "Products, photos, variants, prices and collections added for you." },
      { title: "Payments", body: "Cards, bank transfer, JazzCash, Easypaisa and cash on delivery." },
      { title: "Shipping & couriers", body: "Delivery zones, rates and courier integrations set up." },
      { title: "Test order", body: "A full order placed end to end before launch." },
      { title: "Store management (optional)", body: "Daily orders, stock updates and new products handled monthly." },
    ],
    audience:
      "Brands selling through Instagram, Facebook or WhatsApp, retailers moving online, and home businesses ready for a proper store.",
    tools: ["Shopify", "WooCommerce", "WordPress", "JazzCash", "Easypaisa", "Stripe", "PayPal", "Local couriers"],
    faq: [
      { q: "Shopify or WordPress?", a: "Shopify is easier to run day to day; WordPress with WooCommerce gives more control and lower monthly fees. We recommend one after hearing about your products." },
      { q: "Can you manage the store after launch?", a: "Yes. Store management is available as a monthly retainer with exactly what's included written down." },
      { q: "Can I take cash on delivery?", a: "Yes, along with cards, bank transfer and mobile wallets." },
    ],
    finalCta: { headline: "Let's open your shop to the whole country.", cta: "Launch my store" },
    related: ["store-management", "meta-ads", "content-creation"],
  },
  {
    slug: "shopify-development",
    order: 9,
    name: "Shopify Development",
    shortName: "Shopify",
    line: "ecommerce",
    market: "both",
    flagship: true,
    pitch: "Shopify stores, themes and customisations that look sharp and sell.",
    sceneId: "ecommerce",
    accent: "#FFD23F",
    meta: {
      title: `Shopify Store Development & Customisation | ${A}`,
      description:
        "Shopify store setup, theme customisation, apps and integrations for brands in Pakistan and worldwide — built to convert and easy to manage.",
    },
    hero: {
      eyebrow: "Shopify Development",
      headline: "Shopify stores that look sharp and sell.",
      subhead:
        "New stores, theme customisation, apps and integrations — built so your products look great and checkout stays smooth on every phone.",
      cta: "Build my Shopify store",
    },
    problem:
      "A default Shopify theme makes you look like every other store, and piling on apps slows it down. The difference between browsing and buying is in the details: speed, trust, product pages and a checkout without friction.",
    included: [
      { title: "Store setup", body: "Settings, payments, taxes, shipping and policies configured." },
      { title: "Theme customisation", body: "Your brand, your layout, without breaking theme updates." },
      { title: "Product pages", body: "Clear photos, variants, reviews and trust signals that help people buy." },
      { title: "Apps & integrations", body: "Only the apps you need, plus custom extensions when none fit." },
      { title: "Migration", body: "Move from WooCommerce, Daraz-only selling or another platform." },
      { title: "Speed & checkout", body: "Fast pages and a smooth checkout, tested end to end." },
    ],
    audience:
      "D2C brands, Shopify store owners who want a better-looking or faster store, and agencies that need a reliable Shopify partner.",
    tools: ["Shopify", "Liquid", "Shopify CLI", "Shopify Apps", "Klaviyo", "Meta catalog", "Google Merchant Center"],
    faq: [
      { q: "Can you improve my existing Shopify store?", a: "Yes. We start with a review and a list of fixes ordered by impact." },
      { q: "Do you build custom Shopify apps?", a: "Yes, when an existing app doesn't do what you need. See our Plugins service." },
      { q: "Do you work with international Shopify clients?", a: "Yes. International projects are quoted in USD as a fixed price or hourly." },
    ],
    finalCta: { headline: "Ready for a store people trust?", cta: "Build my Shopify store" },
    related: ["ecommerce-stores", "plugin-development", "store-management"],
  },
  {
    slug: "wordpress-development",
    order: 10,
    name: "WordPress Development",
    shortName: "WordPress",
    line: "ecommerce",
    market: "both",
    flagship: true,
    pitch: "WordPress and WooCommerce sites that are fast, secure and easy to edit.",
    sceneId: "web",
    accent: "#FFD23F",
    meta: {
      title: `WordPress & WooCommerce Development | ${A}`,
      description:
        "WordPress websites and WooCommerce stores — custom themes, speed and security fixes, and plugins — built to be fast and easy to edit.",
    },
    hero: {
      eyebrow: "WordPress Development",
      headline: "WordPress, done properly.",
      subhead:
        "Custom WordPress sites and WooCommerce stores that load fast, stay secure and are easy for your team to update.",
      cta: "Start my WordPress project",
    },
    problem:
      "WordPress powers a huge share of the web, and a lot of it is slow, bloated and one bad plugin away from breaking. Built carefully, it's one of the best platforms you can own.",
    included: [
      { title: "Custom theme", body: "A lightweight theme built for your design, not a heavy page builder." },
      { title: "WooCommerce stores", body: "Products, payments and shipping for selling online." },
      { title: "Speed optimisation", body: "Caching, image optimisation and fewer plugins for fast pages." },
      { title: "Security hardening", body: "Updates, backups, firewall and safe login settings." },
      { title: "Custom features", body: "Bespoke plugins when no existing one fits." },
      { title: "Easy editing", body: "A clean editor and a short training session for your team." },
    ],
    audience:
      "Businesses already on WordPress that need it faster or fixed, and companies that want a flexible site or store they fully own.",
    tools: ["WordPress", "WooCommerce", "Gutenberg", "Advanced Custom Fields", "PHP", "Cloudflare", "Wordfence"],
    faq: [
      { q: "Can you fix my slow WordPress site?", a: "Usually, yes. We review it, list what's slowing it down, and fix the biggest issues first." },
      { q: "Do you use page builders?", a: "Only if you specifically need one. Custom lightweight themes are faster and easier to maintain." },
      { q: "Can you move my site to a new host?", a: "Yes, with a backup taken first and no downtime for visitors where possible." },
    ],
    finalCta: { headline: "Let's make your WordPress site fast again.", cta: "Start my WordPress project" },
    related: ["website-development", "plugin-development", "ecommerce-stores"],
  },
  {
    slug: "store-management",
    order: 11,
    name: "Total Store Management",
    shortName: "Store Management",
    line: "ecommerce",
    market: "local",
    pitch: "We run the daily store work — orders, stock and listings — so you can focus on selling.",
    sceneId: "ppc",
    accent: "#FFD23F",
    meta: {
      title: `Online Store Management Services | ${A}`,
      description:
        "Monthly online store management: order processing, stock updates, product uploads, discounts and reports, handled by our team.",
    },
    hero: {
      eyebrow: "Total Store Management",
      headline: "Your store, run for you every day.",
      subhead:
        "Orders processed, stock updated, new products uploaded and a monthly report — handled by our team on a clear monthly retainer.",
      cta: "Hand over my store",
    },
    problem:
      "Running a store is a daily job: confirming orders, updating stock, adding products, fixing listings. When it's squeezed in between everything else, orders get delayed and sold-out items stay online.",
    included: [
      { title: "Order processing", body: "Orders confirmed, booked with couriers and tracked." },
      { title: "Stock updates", body: "Inventory kept accurate so you don't sell what you don't have." },
      { title: "Product uploads", body: "New products with photos, descriptions and prices." },
      { title: "Offers & discounts", body: "Sales and discount codes set up for your campaigns." },
      { title: "Store health", body: "Broken links, missing images and app issues fixed." },
      { title: "Monthly report", body: "Sales, top products and what to improve next month." },
    ],
    audience: "Store owners in Pakistan who'd rather spend their time on products and customers than on admin.",
    tools: ["Shopify", "WooCommerce", "Google Sheets", "Courier dashboards", "WhatsApp Business"],
    faq: [
      { q: "What exactly is included each month?", a: "Each retainer lists exactly what's included — for example number of products uploaded and orders handled — so scope stays clear." },
      { q: "Do you need my store login?", a: "We use a staff account with only the access we need. Logins are kept in a password manager, never in chat." },
      { q: "Can I add Meta ads or social media to it?", a: "Yes. Many store clients add Meta ads and social media management as add-ons." },
    ],
    finalCta: { headline: "Get your time back from store admin.", cta: "Hand over my store" },
    related: ["ecommerce-stores", "meta-ads", "social-media-management"],
  },

  // ─────────────────── Growth marketing ───────────────────
  {
    slug: "digital-marketing",
    order: 12,
    name: "Marketing",
    shortName: "Marketing",
    line: "growth",
    market: "local",
    pitch: "A clear marketing plan that brings in customers, measured every month.",
    sceneId: "seo",
    accent: "#FF7AC8",
    meta: {
      title: `Digital Marketing for Businesses in Pakistan | ${A}`,
      description:
        "A practical digital marketing plan — Google, Maps, Facebook, Instagram and WhatsApp — with monthly reports on the results that matter.",
    },
    hero: {
      eyebrow: "Marketing",
      headline: "We get you more customers.",
      subhead:
        "One clear plan across Google, Maps, Facebook, Instagram and WhatsApp — run and reported every month, in plain language.",
      cta: "Grow my business",
    },
    problem:
      "Boosting a post here and there doesn't add up to a plan. Without clear goals and tracking, it's impossible to know what's bringing customers in and what's wasting money.",
    included: [
      { title: "Marketing audit", body: "Where your customers come from today and where you're invisible." },
      { title: "Monthly plan", body: "Channels, budget and goals agreed before anything goes live." },
      { title: "Campaigns", body: "Search, Maps, social and WhatsApp campaigns run together." },
      { title: "Tracking", body: "Calls, messages, forms and sales tracked where possible." },
      { title: "Optimisation", body: "What works gets more budget; what doesn't gets cut." },
      { title: "Monthly report", body: "Results and next steps, in plain language." },
    ],
    audience:
      "Owner-run shops, clinics, restaurants, schools and brands in Pakistan that already have customers and want more of them.",
    tools: ["Google Business Profile", "Meta Ads Manager", "Google Analytics 4", "Google Search Console", "WhatsApp Business", "Canva"],
    faq: [
      { q: "How is marketing billed?", a: "As a monthly retainer. Ad spend is separate and paid directly by you to Meta or Google." },
      { q: "When will I see results?", a: "Ads can bring enquiries in the first weeks; Local SEO usually takes a few months to build. We report progress every month." },
      { q: "Do I need a website first?", a: "It helps a lot, but not always. We can start with Google Business Profile and social while the website is built." },
    ],
    finalCta: { headline: "Let's fill your calendar with customers.", cta: "Grow my business" },
    related: ["local-seo", "google-business-profile", "meta-ads"],
  },
  {
    slug: "local-seo",
    order: 13,
    name: "Local SEO",
    shortName: "Local SEO",
    line: "growth",
    market: "local",
    flagship: true,
    pitch: "Show up first when nearby customers search on Google and Maps.",
    sceneId: "local",
    accent: "#FF7AC8",
    meta: {
      title: `Local SEO Services in Pakistan | ${A}`,
      description:
        "Local SEO audits and fixes that help nearby customers find your business on Google Search and Google Maps. Free local audit available.",
    },
    hero: {
      eyebrow: "Local SEO",
      headline: "Be the first name they find nearby.",
      subhead:
        "When someone near you searches for what you sell, we help your business appear at the top of Google and Maps — with the reviews and details to win the call.",
      cta: "Get my free local audit",
    },
    problem:
      "Local customers are ready to buy today: they call, visit or message straight from Google. If your business is missing, has the wrong details or few reviews, those customers go to the shop down the road.",
    included: [
      { title: "Local SEO audit", body: "Your Google presence, competitors and quick wins, in one report." },
      { title: "Website fixes", body: "Location pages, page titles and contact details tuned for local search." },
      { title: "Listings & citations", body: "Consistent name, address and phone across directories." },
      { title: "Review plan", body: "A simple way to ask happy customers for reviews, and reply to them." },
      { title: "Local content", body: "Pages and posts that match how people in your area search." },
      { title: "Monthly report", body: "Rankings, calls, direction requests and next steps." },
    ],
    audience: "Clinics, restaurants, salons, schools, shops and service businesses that serve customers in a specific city or area.",
    tools: ["Google Business Profile", "Google Search Console", "Google Analytics 4", "BrightLocal", "Local Falcon"],
    faq: [
      { q: "What's in the free audit?", a: "A short report on how you appear on Google and Maps today, how you compare to nearby competitors, and the first fixes to make." },
      { q: "How long does Local SEO take?", a: "Profile and listing fixes can help within weeks; stronger rankings usually build over a few months." },
      { q: "Is this different from Google Business Profile management?", a: "They work together. Local SEO covers your website and listings; GMB management focuses on your Google profile itself." },
    ],
    finalCta: { headline: "See how you show up on Maps — free.", cta: "Get my free local audit" },
    related: ["google-business-profile", "meta-ads", "website-development"],
  },
  {
    slug: "google-business-profile",
    order: 14,
    name: "Google Business Profile (GMB)",
    shortName: "Google Business Profile",
    line: "growth",
    market: "local",
    flagship: true,
    pitch: "A complete, active Google profile that turns searches into calls and visits.",
    sceneId: "local",
    accent: "#FF7AC8",
    meta: {
      title: `Google Business Profile (GMB) Setup & Optimisation | ${A}`,
      description:
        "Google Business Profile setup, verification and optimisation — categories, photos, posts, reviews and Q&A — to win more calls and visits.",
    },
    hero: {
      eyebrow: "Google Business Profile",
      headline: "Your shop window on Google Maps.",
      subhead:
        "We set up, verify and optimise your Google Business Profile — photos, services, posts and reviews — so more nearby searches turn into calls and visits.",
      cta: "Fix my Google profile",
    },
    problem:
      "For many customers, your Google profile is the first thing they see — before your website or social pages. Missing hours, old photos or unanswered reviews quietly send them to a competitor.",
    included: [
      { title: "Setup & verification", body: "New profile created or existing one claimed and verified." },
      { title: "Full optimisation", body: "Categories, services, hours, description and service areas completed." },
      { title: "Photos & posts", body: "Fresh photos and regular posts that keep the profile active." },
      { title: "Reviews", body: "A review request plan and polite replies to every review." },
      { title: "Q&A and messages", body: "Common questions answered on the profile." },
      { title: "Insights report", body: "Calls, direction requests and website clicks, monthly." },
    ],
    audience: "Any business with a location or service area in Pakistan, especially those that get customers from calls and walk-ins.",
    tools: ["Google Business Profile", "Google Maps", "Canva", "Google Analytics 4"],
    faq: [
      { q: "My profile isn't verified. Can you help?", a: "Yes. We guide you through verification, which usually needs a code sent to you by Google." },
      { q: "Can you remove bad reviews?", a: "We can't remove genuine reviews, but we help you reply well and report reviews that break Google's rules." },
      { q: "Is this a one-time setup or monthly?", a: "Both are available: a one-time setup and optimisation, or monthly posts, reviews and reporting." },
    ],
    finalCta: { headline: "Turn Google searches into phone calls.", cta: "Fix my Google profile" },
    related: ["local-seo", "meta-ads", "digital-marketing"],
  },
  {
    slug: "meta-ads",
    order: 15,
    name: "Meta Ads",
    shortName: "Meta Ads",
    line: "growth",
    market: "local",
    flagship: true,
    pitch: "Facebook and Instagram ad campaigns that bring messages, orders and leads.",
    sceneId: "email",
    accent: "#FF7AC8",
    meta: {
      title: `Facebook & Instagram Ads Management | ${A}`,
      description:
        "Meta ads on Facebook and Instagram — targeting, creatives, tracking and monthly optimisation — focused on messages, orders and leads.",
    },
    hero: {
      eyebrow: "Meta Ads",
      headline: "Reach buyers on Facebook and Instagram.",
      subhead:
        "Campaigns built for messages, orders and leads — not just likes — with creatives, targeting and tracking handled by us and a clear monthly report.",
      cta: "Plan my ad campaign",
    },
    problem:
      "Clicking 'Boost post' spends money but rarely builds a business. Without the right objective, audience, creative and tracking, most ad budgets disappear into views that never become customers.",
    included: [
      { title: "Account setup", body: "Business Manager, ad account, pixel and catalogue set up correctly." },
      { title: "Audience targeting", body: "Locations, interests and lookalikes tested to find your buyers." },
      { title: "Ad creatives", body: "Images, short videos and copy made for each campaign." },
      { title: "WhatsApp & lead ads", body: "Campaigns that start chats or collect leads directly." },
      { title: "Tracking", body: "Pixel and conversion events so we know what works." },
      { title: "Monthly optimisation", body: "Budgets moved to what performs, with a plain report." },
    ],
    audience: "Stores, restaurants, clinics, schools, events and service businesses in Pakistan with customers on Facebook and Instagram.",
    tools: ["Meta Ads Manager", "Meta Business Suite", "Meta Pixel", "WhatsApp Business", "Canva", "CapCut"],
    faq: [
      { q: "How much ad budget do I need?", a: "We recommend a starting budget after hearing your goals. Ad spend is paid by you directly to Meta and is separate from our fee." },
      { q: "Who owns the ad account?", a: "You do. We work inside your account so the data stays with you." },
      { q: "Do you make the ad designs?", a: "Yes. Creatives are included, and our content team can produce short videos too." },
    ],
    finalCta: { headline: "Let's turn scrollers into customers.", cta: "Plan my ad campaign" },
    related: ["social-media-management", "content-creation", "local-seo"],
  },

  // ──────────────────── Content & social ────────────────────
  {
    slug: "social-media-management",
    order: 16,
    name: "Social Media Handling",
    shortName: "Social Media",
    line: "content",
    market: "local",
    pitch: "Your pages planned, posted and answered — every week, in your brand style.",
    sceneId: "social",
    accent: "#D9C2FF",
    meta: {
      title: `Social Media Management in Pakistan | ${A}`,
      description:
        "Monthly social media management for Facebook, Instagram and TikTok — content calendar, posting, page management and replies.",
    },
    hero: {
      eyebrow: "Social Media Handling",
      headline: "Pages that look alive, every single week.",
      subhead:
        "We plan your monthly calendar, design and schedule the posts, and reply to comments and messages — so your pages stay active and on-brand.",
      cta: "Hand over my pages",
    },
    problem:
      "An inactive page makes customers wonder if you're still open. Posting regularly, in a consistent style, while also replying to everyone, is a job in itself — and usually the first thing to slip when you're busy.",
    included: [
      { title: "Monthly calendar", body: "Posts, formats and dates planned and approved by you." },
      { title: "Post design", body: "Graphics and captions in your brand colours and fonts." },
      { title: "Short videos", body: "Reels and stories for more reach." },
      { title: "Scheduling", body: "Posts published at the times your audience is active." },
      { title: "Page management", body: "Comments and messages replied to, and enquiries passed to you." },
      { title: "Monthly report", body: "Reach, followers, engagement and what we'll try next." },
    ],
    audience: "Businesses in Pakistan whose customers find them on Facebook, Instagram or TikTok, and who don't have time to run the pages themselves.",
    tools: ["Meta Business Suite", "Instagram", "Facebook", "TikTok", "Canva", "CapCut", "Adobe Express"],
    faq: [
      { q: "How many posts are included?", a: "Each retainer lists the exact number of posts, stories and videos per month, so you always know what you're getting." },
      { q: "Do I approve posts first?", a: "Always. The monthly calendar is approved by you, and nothing is posted without your OK." },
      { q: "Can you reply to messages for me?", a: "Yes. We answer common questions and pass orders and serious enquiries to you straight away." },
    ],
    finalCta: { headline: "Let's bring your pages back to life.", cta: "Hand over my pages" },
    related: ["content-creation", "meta-ads", "store-management"],
  },
  {
    slug: "content-creation",
    order: 17,
    name: "Content Creation",
    shortName: "Content",
    line: "content",
    market: "local",
    pitch: "Graphics, short videos and copy that make people stop scrolling.",
    sceneId: "content",
    accent: "#D9C2FF",
    meta: {
      title: `Content Creation — Graphics, Reels & Copy | ${A}`,
      description:
        "Content creation for brands: social graphics, short videos and reels, product content and website copy, made in your brand style.",
    },
    hero: {
      eyebrow: "Content Creation",
      headline: "Content that makes people stop scrolling.",
      subhead:
        "Graphics, short videos, product content and website copy — made in your brand style and planned around what your customers care about.",
      cta: "Get a content plan",
    },
    problem:
      "Customers judge a business by its posts and product photos before they ever message you. Inconsistent, rushed content makes a good business look small; strong content makes it look like the obvious choice.",
    included: [
      { title: "Social graphics", body: "Posts, carousels and stories in your brand style." },
      { title: "Short videos", body: "Reels and TikToks edited for attention in the first seconds." },
      { title: "Product content", body: "Product visuals and descriptions for your store and catalogue." },
      { title: "Copywriting", body: "Captions, website text and ad copy in a clear, friendly voice." },
      { title: "Brand templates", body: "Reusable templates so everything looks consistent." },
      { title: "Content calendar", body: "A monthly plan so content is never last-minute." },
    ],
    audience: "Brands, stores and service businesses that need a steady flow of good content, in English or Urdu.",
    tools: ["Canva", "Adobe Express", "Figma", "CapCut", "Adobe Premiere", "ChatGPT", "Claude"],
    faq: [
      { q: "Do you create content in Urdu?", a: "Yes, in English, Urdu or a mix — whatever your customers respond to." },
      { q: "Do you do photo or video shoots?", a: "We work with your photos and footage, and can arrange shoots with partner photographers when needed." },
      { q: "How many revisions do I get?", a: "The number of revision rounds is stated in your proposal; extra rounds are quoted separately." },
    ],
    finalCta: { headline: "Let's make your brand look as good as it is.", cta: "Get a content plan" },
    related: ["social-media-management", "meta-ads", "website-development"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getLine = (id: ServiceLineId) => serviceLines.find((l) => l.id === id)!;
export const servicesInLine = (id: ServiceLineId) => services.filter((s) => s.line === id);

/** The four launch offers, two per market (company documentation, section 4). */
export const flagshipOffers = [
  {
    market: "Pakistan",
    title: "Online Store Setup + Management",
    includes: "Shopify or WordPress store, total store management, content creation",
    href: "/services/ecommerce-stores",
    accent: "#FFD23F",
  },
  {
    market: "Pakistan",
    title: "Local SEO + GMB + Meta Ads",
    includes: "Local SEO, Google Business Profile optimisation, Meta ads, marketing",
    href: "/services/local-seo",
    accent: "#FF7AC8",
  },
  {
    market: "International",
    title: "AI Chatbots and Automation",
    includes: "AI chatbots, AI automation, CRM integration",
    href: "/services/ai-chatbots",
    accent: "#A66BFF",
  },
  {
    market: "International",
    title: "Shopify and WordPress Development",
    includes: "Shopify, WordPress, plugins, e-commerce stores",
    href: "/services/shopify-development",
    accent: "#7BE04F",
  },
];

/** Every flagship offer is sold in three tiers. Prices are quoted after a discovery call. */
export const packageTiers = [
  { name: "Starter", for: "Businesses trying a first project", scope: "One core deliverable, one revision round, handover and short training" },
  { name: "Growth", for: "Businesses ready to scale", scope: "Core deliverable plus one add-on service, two revision rounds, 30 days of support" },
  { name: "Premium", for: "Businesses that want a long-term partner", scope: "Full build plus ongoing management, priority support, monthly reporting" },
];
