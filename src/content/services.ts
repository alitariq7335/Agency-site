import { site } from "./site";
import type { Service, ServiceGroup } from "./types";

const A = site.name;

export const services: Service[] = [
  {
    slug: "web-design-development",
    order: 1,
    name: "Web Design & Development",
    shortName: "Web Design",
    group: "build",
    pitch: "Fast, custom websites built to turn visitors into customers.",
    sceneId: "web",
    accent: "#7C5CFF",
    meta: {
      title: `Web Design & Development Agency in ${site.city} | ${A}`,
      description:
        "Custom, lightning-fast websites designed to convert visitors into customers. Built on modern tech, optimised for SEO, delivered on time.",
    },
    hero: {
      eyebrow: "Web Design & Development",
      headline: "Websites that look incredible and sell even better.",
      subhead:
        "Custom-designed, hand-coded, built to load in under 2 seconds and turn visitors into enquiries. No templates. No page builders slowing you down.",
      cta: "Start your website",
    },
    problem:
      "Your website is your hardest-working salesperson, or it should be. Most business sites are slow, look dated on mobile and leave visitors unsure what to do next. Every second of load time and every confusing page costs you customers you never hear about.",
    included: [
      { title: "Custom UI/UX design", body: "Wireframes and high-fidelity designs built around how your customers decide." },
      { title: "Responsive development", body: "Pixel-perfect on phones, tablets and wide screens." },
      { title: "Performance first", body: "90+ PageSpeed scores, optimised images, Core Web Vitals in the green." },
      { title: "SEO-ready build", body: "Clean structure, schema markup, meta tags and sitemaps from day one." },
      { title: "CMS you can use", body: "Edit text, images and blog posts yourself, no developer needed." },
      { title: "Conversion tools", body: "Forms, WhatsApp chat, booking, analytics and call tracking wired in." },
    ],
    steps: [
      { title: "Discovery", body: "Goals, audience, competitors and the pages you need." },
      { title: "Design", body: "Wireframes, then full designs. Two rounds of revisions included." },
      { title: "Build", body: "Development, content entry and testing on real devices." },
      { title: "Launch & handover", body: "Go live, training session, 30 days of free support." },
    ],
    audience:
      "Startups launching their first site, established businesses whose site no longer reflects who they are, and brands that want an experience competitors can't copy.",
    tools: ["Next.js", "React", "WordPress", "Webflow", "Shopify", "Figma", "Three.js / WebGL", "Vercel"],
    faq: [
      { q: "How long does a website take?", a: "4–8 weeks for most business sites; larger builds are scoped individually." },
      { q: "Will I be able to update it myself?", a: "Yes. Every site comes with an easy CMS and a training session." },
      { q: "Do you write the content?", a: "We can. Our Content Generation team writes SEO-friendly copy, or we polish yours." },
      { q: "Do I own the website?", a: "Fully. Code, design files, domain and hosting are in your name." },
    ],
    finalCta: { headline: "Ready for a website that actually brings in business?", cta: "Get a free quote" },
    related: ["ecommerce-solutions", "branding-graphic-design", "website-maintenance-support"],
  },
  {
    slug: "seo",
    order: 2,
    name: "Search Engine Optimization",
    shortName: "SEO",
    group: "get-found",
    pitch: "Rank on page one for the searches that bring revenue.",
    sceneId: "seo",
    accent: "#3DE3F5",
    meta: {
      title: `SEO Services That Grow Organic Traffic & Leads | ${A}`,
      description:
        "Rank on page one for the keywords that drive revenue. Technical SEO, content and link building with transparent monthly reporting.",
    },
    hero: {
      eyebrow: "Search Engine Optimization",
      headline: "Get found by people who are ready to buy.",
      subhead:
        "We put your business on page one for the searches that bring in revenue, then keep it there. Free traffic, compounding every month.",
      cta: "Get a free SEO audit",
    },
    problem:
      "Most searchers never scroll past page one. If your competitors rank above you, they're getting the customers who were looking for exactly what you sell. Ads stop the day you stop paying; SEO keeps working.",
    included: [
      { title: "Technical SEO audit & fixes", body: "Site speed, crawlability, indexing, Core Web Vitals and schema." },
      { title: "Keyword research & strategy", body: "The terms your buyers search, ranked by intent and opportunity." },
      { title: "On-page optimisation", body: "Titles, headings, internal links and content tuned for each target keyword." },
      { title: "Content that ranks", body: "Blog posts, service pages and guides built to win searches." },
      { title: "Link building", body: "Real, relevant backlinks from trusted sites. No spam, no shortcuts." },
      { title: "Monthly reporting", body: "Rankings, traffic, leads and what we're doing next, in plain English." },
    ],
    steps: [
      { title: "Audit", body: "A full technical and competitor audit of where you stand today." },
      { title: "Strategy", body: "A keyword map and 90-day roadmap tied to your business goals." },
      { title: "Optimise & create", body: "Fixes, on-page work, new content and links, every month." },
      { title: "Measure & refine", body: "Track what moves, double down on what works." },
    ],
    audience:
      "Businesses that want a steady flow of leads without paying for every click: service companies, B2B firms, clinics, e-commerce stores and SaaS.",
    tools: ["Google Search Console", "Google Analytics 4", "Ahrefs", "Semrush", "Screaming Frog", "Surfer SEO", "Looker Studio"],
    faq: [
      { q: "How long does SEO take?", a: "Most clients see movement in 3 months and strong results by 6–12, depending on competition." },
      { q: "Can you guarantee #1 rankings?", a: "No honest agency can; Google controls rankings. We guarantee the work, the transparency and our process." },
      { q: "Do you do international or multi-language SEO?", a: "Yes, including hreflang setup and country-specific keyword strategies." },
      { q: "What do I need to provide?", a: "Access to your site, Search Console and Analytics. We handle the rest." },
    ],
    finalCta: { headline: "Find out why you're not ranking — free.", cta: "Get my SEO audit" },
    related: ["local-seo", "content-generation", "google-ads-ppc"],
  },
  {
    slug: "local-seo",
    order: 3,
    name: "Local SEO",
    shortName: "Local SEO",
    group: "get-found",
    pitch: "Own the map pack when customers search near you.",
    sceneId: "local",
    accent: "#FF5FA2",
    meta: {
      title: `Local SEO Services — Rank in Google Maps | ${A}`,
      description:
        "Get into Google's top-3 map results in your area. Google Business Profile optimisation, local citations and review strategy that drives calls and visits.",
    },
    hero: {
      eyebrow: "Local SEO",
      headline: "Be the first name they see “near me.”",
      subhead:
        "When someone nearby searches for what you do, we make sure your business is in the top 3 on Google Maps — with the reviews to win the click.",
      cta: "Check my local ranking",
    },
    problem:
      "Local searchers are ready to act today: call, visit, book. The top three map results take most of those customers. If you're not in that pack, you're invisible to people standing a few streets away.",
    included: [
      { title: "Google Business Profile optimisation", body: "Categories, services, photos, posts and Q&A set up to rank." },
      { title: "Local citations", body: "Consistent name, address and phone across directories and maps." },
      { title: "Review generation", body: "A simple system to get more 5-star reviews and reply to every one." },
      { title: "Location pages", body: "Dedicated pages for each area or branch you serve." },
      { title: "Local link building", body: "Mentions from local news, associations and partners." },
      { title: "Map-rank tracking", body: "Grid reports showing where you rank, street by street." },
    ],
    steps: [
      { title: "Local audit", body: "Your profile, citations, reviews and map rankings vs. local competitors." },
      { title: "Fix the foundations", body: "Profile optimisation and citation clean-up in the first 30 days." },
      { title: "Build authority", body: "Reviews, posts, location content and local links every month." },
      { title: "Report", body: "Calls, direction requests, website clicks and map rankings, monthly." },
    ],
    audience:
      "Clinics, dentists, restaurants, salons, law firms, real estate agents, contractors, gyms and any business with a location or service area.",
    tools: ["Google Business Profile", "BrightLocal", "Local Falcon", "Whitespark", "Google Search Console"],
    faq: [
      { q: "How is Local SEO different from SEO?", a: "Local SEO targets map results and nearby searchers; regular SEO targets wider organic results. Most local businesses need both." },
      { q: "I have multiple branches. Can you help?", a: "Yes. Each location gets its own optimised profile and landing page." },
      { q: "How fast will I see results?", a: "Profile fixes often show impact in 4–8 weeks." },
      { q: "Can you remove bad reviews?", a: "We can't remove genuine reviews, but we help you respond well and outnumber them with real positive ones. Fake or policy-breaking reviews can be reported." },
    ],
    finalCta: { headline: "See where you rank on the map — free.", cta: "Get my local report" },
    related: ["seo", "google-ads-ppc", "web-design-development"],
  },
  {
    slug: "google-ads-ppc",
    order: 4,
    name: "Google Ads & PPC",
    shortName: "Google Ads",
    group: "get-found",
    pitch: "Paid campaigns that are profitable, not just busy.",
    sceneId: "ppc",
    accent: "#FFB547",
    meta: {
      title: `Google Ads & PPC Management Agency | ${A}`,
      description:
        "Profitable Google Ads, Meta Ads and shopping campaigns. Smarter targeting, lower cost per lead, and reporting tied to real revenue.",
    },
    hero: {
      eyebrow: "Google Ads & PPC",
      headline: "Ads that make money, not just noise.",
      subhead:
        "We build and manage paid campaigns that put you in front of buyers at the exact moment they search — and we optimise for profit, not clicks.",
      cta: "Get a free ads audit",
    },
    problem:
      "Most ad accounts waste a big share of their budget on the wrong keywords, weak ads and landing pages that don't convert. The platform still takes your money. We find the leaks and turn spend into customers.",
    included: [
      { title: "Account audit & strategy", body: "Where your budget is leaking and where the opportunity is." },
      { title: "Search, Display, Shopping, YouTube & Performance Max", body: "The right Google campaign types for your goal." },
      { title: "Meta & LinkedIn Ads", body: "Paid social when your buyers live there." },
      { title: "Ad copy & creative", body: "Headlines and visuals tested against each other, constantly." },
      { title: "Landing pages", body: "Pages built for one job: converting ad traffic." },
      { title: "Conversion tracking", body: "GA4, Tag Manager and call tracking so every lead is counted." },
    ],
    steps: [
      { title: "Audit & research", body: "Keywords, competitors, budget and target cost per lead." },
      { title: "Build", body: "Campaign structure, ads, audiences and tracking." },
      { title: "Launch", body: "Go live with a controlled budget and daily monitoring in the first weeks." },
      { title: "Optimise", body: "Weekly bid, keyword and creative changes; monthly strategy review." },
    ],
    audience:
      "Businesses that need leads or sales now, e-commerce stores scaling revenue, and anyone already running ads who suspects they're overpaying.",
    tools: ["Google Ads", "Google Merchant Center", "Meta Ads Manager", "LinkedIn Campaign Manager", "GA4", "Google Tag Manager", "Looker Studio"],
    faq: [
      { q: "How much should I spend on ads?", a: "It depends on your industry and goals. We recommend a starting budget after the audit, and the management fee is separate." },
      { q: "When will I see results?", a: "Ads can bring leads in the first week; performance usually improves significantly over the first 60–90 days." },
      { q: "Who owns the ad account?", a: "You do. We work inside your account, never ours." },
      { q: "Do you guarantee a return?", a: "We don't promise numbers before seeing your data, but we set clear targets and report against them every month." },
    ],
    finalCta: { headline: "Find out where your ad budget is leaking.", cta: "Get my free ads audit" },
    related: ["seo", "social-media-marketing", "web-design-development"],
  },
  {
    slug: "social-media-marketing",
    order: 5,
    name: "Social Media Marketing",
    shortName: "Social Media",
    group: "engage",
    pitch: "Content and ads that build a following that buys.",
    sceneId: "social",
    accent: "#FF5FA2",
    meta: {
      title: `Social Media Marketing Agency — Content, Ads & Growth | ${A}`,
      description:
        "Scroll-stopping content, community management and paid social on Instagram, Facebook, TikTok and LinkedIn. Grow a following that buys.",
    },
    hero: {
      eyebrow: "Social Media Marketing",
      headline: "Stop posting. Start growing.",
      subhead:
        "Strategy, content and paid social that turn followers into customers — on the platforms your audience actually uses.",
      cta: "Grow my socials",
    },
    problem:
      "Posting “something” three times a week isn't a strategy. Without a clear plan, consistent visuals and the right ads behind your best content, social eats your time and gives back likes instead of sales.",
    included: [
      { title: "Social strategy", body: "Platforms, content pillars, tone and goals defined up front." },
      { title: "Content calendar", body: "A month planned ahead and approved by you before anything goes live." },
      { title: "Content creation", body: "Designed posts, carousels, Reels, short-form video and stories." },
      { title: "Community management", body: "Replies to comments and DMs so no lead goes cold." },
      { title: "Paid social", body: "Meta, TikTok and LinkedIn ads to put your best content in front of buyers." },
      { title: "Monthly analytics", body: "Reach, engagement, followers, clicks and leads, with what we'll change next." },
    ],
    steps: [
      { title: "Brand & audience audit", body: "Your accounts, competitors and what your audience responds to." },
      { title: "Strategy & calendar", body: "Pillars, formats and a 30-day calendar for approval." },
      { title: "Create & publish", body: "Shoot, design, edit, schedule and post." },
      { title: "Engage & optimise", body: "Manage the community, boost winners, refine monthly." },
    ],
    audience:
      "Consumer brands, restaurants and cafés, fashion and beauty, real estate, education, and B2B companies building authority on LinkedIn.",
    tools: ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube Shorts", "X", "Meta Business Suite", "Canva", "Adobe Creative Cloud", "CapCut"],
    faq: [
      { q: "Which platforms should I be on?", a: "The ones your customers use. We recommend 2–3 to start rather than spreading thin." },
      { q: "How many posts a month?", a: "Packages typically range from 12 to 30 posts plus stories and Reels." },
      { q: "Do you shoot photos and videos?", a: "Yes, on-site shoots can be added, or we work with your existing assets." },
      { q: "Do I approve content before it goes live?", a: "Always. Nothing posts without your sign-off." },
    ],
    finalCta: { headline: "Let's turn your feed into a sales channel.", cta: "Book a social strategy call" },
    related: ["content-generation", "branding-graphic-design", "google-ads-ppc"],
  },
  {
    slug: "content-generation",
    order: 6,
    name: "Content Generation",
    shortName: "Content",
    group: "engage",
    pitch: "Words, visuals and video that rank, engage and sell.",
    sceneId: "content",
    accent: "#3DE3F5",
    meta: {
      title: `Content Writing & Content Marketing Services | ${A}`,
      description:
        "SEO blog posts, website copy, social captions, video scripts and visuals. Content that ranks on Google, builds trust and drives sales.",
    },
    hero: {
      eyebrow: "Content Generation",
      headline: "Content that ranks, resonates and sells.",
      subhead:
        "From website copy to blog posts, scripts and visuals — we create content your customers want to read and Google wants to rank.",
      cta: "Get a content plan",
    },
    problem:
      "Generic, rushed content doesn't rank and doesn't convince anyone. Your customers can tell when words are written for a word count instead of for them. Good content answers real questions, earns trust and leads naturally to a sale.",
    included: [
      { title: "Website copywriting", body: "Home, about and service pages written to convert." },
      { title: "SEO blog posts & guides", body: "Researched, keyword-targeted articles that build traffic over time." },
      { title: "Social media content", body: "Captions, carousel copy and hooks written for each platform." },
      { title: "Video scripts", body: "Reels, YouTube and ad scripts with strong openings." },
      { title: "Visual content", body: "Graphics, infographics and short-form video editing." },
      { title: "Content strategy", body: "A topic map and calendar tied to your keywords and sales goals." },
    ],
    steps: [
      { title: "Research", body: "Your audience, keywords, competitors and brand voice." },
      { title: "Plan", body: "A content calendar with topics, formats and target keywords." },
      { title: "Create", body: "Writers, designers and editors produce each piece; you review." },
      { title: "Publish & measure", body: "We publish, promote and track rankings and engagement." },
    ],
    audience:
      "Businesses investing in SEO, brands that need a steady flow of social content, and teams without in-house writers or designers.",
    tools: ["Surfer SEO", "Semrush", "Google Docs", "Grammarly", "Canva", "Adobe Creative Cloud", "CapCut", "WordPress"],
    faq: [
      { q: "Do you use AI to write content?", a: "We use AI for research and drafts where it helps, but every piece is shaped, fact-checked and edited by a human writer for your voice." },
      { q: "Can you write in Urdu or other languages?", a: "Yes, English and Urdu as standard; other languages on request." },
      { q: "How many revisions do I get?", a: "Two rounds per piece are included." },
      { q: "Who owns the content?", a: "You do, fully, once delivered." },
    ],
    finalCta: { headline: "Let's make content your best salesperson.", cta: "Get my content plan" },
    related: ["seo", "social-media-marketing", "email-marketing"],
  },
  {
    slug: "branding-graphic-design",
    order: 7,
    name: "Branding & Graphic Design",
    shortName: "Branding",
    group: "build",
    pitch: "Identities people recognise in a second.",
    sceneId: "branding",
    accent: "#B18CFF",
    meta: {
      title: `Branding Agency — Logo, Identity & Graphic Design | ${A}`,
      description:
        "Logos, brand identities, guidelines and design that make your business instantly recognisable. Look as good as you are.",
    },
    hero: {
      eyebrow: "Branding & Graphic Design",
      headline: "Look as good as you actually are.",
      subhead:
        "Logos, identities and design systems that make your business instantly recognisable — and easy to choose over the competition.",
      cta: "Start my brand",
    },
    problem:
      "People judge a business in seconds. An inconsistent logo, mismatched colours and amateur graphics quietly tell customers you're smaller or less reliable than you are. A strong brand earns trust before you say a word.",
    included: [
      { title: "Brand strategy", body: "Positioning, audience, personality and messaging." },
      { title: "Logo design", body: "Primary logo, variations and icon, with 3 initial concepts." },
      { title: "Visual identity", body: "Colour palette, typography, patterns and imagery style." },
      { title: "Brand guidelines", body: "A clear PDF guide so everyone uses your brand correctly." },
      { title: "Marketing collateral", body: "Business cards, letterheads, brochures, flyers and signage." },
      { title: "Digital assets", body: "Social media templates, ad creatives, presentation decks and packaging." },
    ],
    steps: [
      { title: "Discover", body: "Workshop on your business, values, audience and competitors." },
      { title: "Concept", body: "Three distinct creative directions for you to choose from." },
      { title: "Refine", body: "Develop the chosen direction into a complete identity." },
      { title: "Deliver", body: "Final files in every format, plus brand guidelines." },
    ],
    audience:
      "New businesses launching right, established companies ready for a rebrand, and growing brands whose look no longer matches their ambition.",
    tools: ["Adobe Illustrator", "Photoshop", "InDesign", "After Effects", "Figma"],
    faq: [
      { q: "How long does a brand identity take?", a: "3–5 weeks for a full identity; logo-only projects are faster." },
      { q: "How many revisions are included?", a: "Three rounds on the chosen concept." },
      { q: "What files do I get?", a: "AI, EPS, SVG, PDF, PNG and JPG in colour, black and white variations." },
      { q: "Can you refresh my existing logo instead of replacing it?", a: "Yes, a refresh keeps the recognition you've built while modernising it." },
    ],
    finalCta: { headline: "Ready for a brand people remember?", cta: "Start my brand project" },
    related: ["web-design-development", "social-media-marketing", "content-generation"],
  },
  {
    slug: "email-marketing",
    order: 8,
    name: "Email Marketing",
    shortName: "Email",
    group: "engage",
    pitch: "Automated emails that bring customers back.",
    sceneId: "email",
    accent: "#7C5CFF",
    meta: {
      title: `Email Marketing Services & Automation | ${A}`,
      description:
        "Newsletters, automated flows and campaigns that bring customers back. Strategy, design, copy and deliverability handled end to end.",
    },
    hero: {
      eyebrow: "Email Marketing",
      headline: "Your most profitable channel is already in your inbox.",
      subhead:
        "Automated emails and campaigns that welcome, nurture and bring customers back — earning while you sleep.",
      cta: "Build my email engine",
    },
    problem:
      "You paid to win every customer and subscriber on your list. Without regular, well-designed emails, that list goes cold and those people buy from someone else. Email is the one channel you own outright, with no algorithm in the way.",
    included: [
      { title: "Email strategy", body: "Goals, segments, frequency and a campaign calendar." },
      { title: "Automated flows", body: "Welcome series, abandoned cart, post-purchase, win-back and lead nurture." },
      { title: "Campaigns & newsletters", body: "Promotions, launches and regular updates." },
      { title: "Design & copy", body: "On-brand, mobile-first templates and subject lines that get opened." },
      { title: "List growth", body: "Pop-ups, lead magnets and sign-up forms that build your list." },
      { title: "Deliverability & reporting", body: "SPF/DKIM/DMARC setup, list hygiene, and opens, clicks and revenue tracked." },
    ],
    steps: [
      { title: "Audit", body: "Your list, platform, past performance and deliverability." },
      { title: "Build flows", body: "Set up the automations that earn the most first." },
      { title: "Run campaigns", body: "Regular sends planned, designed, written and tested." },
      { title: "Optimise", body: "A/B test subject lines, timing and content every month." },
    ],
    audience:
      "E-commerce stores, coaches and course creators, SaaS companies, B2B firms with long sales cycles, and any business with a customer list it isn't using.",
    tools: ["Klaviyo", "Mailchimp", "Brevo", "HubSpot", "ActiveCampaign", "Shopify Email"],
    faq: [
      { q: "I don't have a big list. Is it worth it?", a: "Yes. A small engaged list often outperforms a large cold one, and we help you grow it." },
      { q: "How often should I email?", a: "Most brands do well with 2–4 campaigns a month plus automated flows." },
      { q: "Which platform should I use?", a: "We recommend one based on your store, list size and budget, and can migrate you." },
      { q: "Will my emails land in spam?", a: "We set up proper authentication and list hygiene to keep you in the inbox." },
    ],
    finalCta: { headline: "Turn your list into repeat revenue.", cta: "Get an email audit" },
    related: ["ecommerce-solutions", "content-generation", "social-media-marketing"],
  },
  {
    slug: "ecommerce-solutions",
    order: 9,
    name: "E-commerce Solutions",
    shortName: "E-commerce",
    group: "build",
    pitch: "Online stores built to sell from day one.",
    sceneId: "ecommerce",
    accent: "#3DE3F5",
    meta: {
      title: `E-commerce Website Development — Shopify & WooCommerce | ${A}`,
      description:
        "Online stores built to sell: Shopify, WooCommerce and custom e-commerce with local and international payments, fast checkout and growth marketing.",
    },
    hero: {
      eyebrow: "E-commerce Solutions",
      headline: "Online stores built to sell from day one.",
      subhead:
        "Beautiful, fast e-commerce sites with smooth checkout, local and international payments, and the marketing to fill your cart.",
      cta: "Launch my store",
    },
    problem:
      "Most shoppers who add to cart never check out. Slow pages, clunky mobile layouts, missing payment options and a confusing checkout all push buyers away. A store has to be built for buying, not just browsing.",
    included: [
      { title: "Store design & build", body: "Shopify, WooCommerce or fully custom headless stores." },
      { title: "Payments & shipping", body: "Cards, local gateways and wallets (e.g. JazzCash, Easypaisa), cash on delivery, Stripe/PayPal, and courier integrations." },
      { title: "Product setup", body: "Catalogue upload, variants, collections and product photography guidance." },
      { title: "Conversion optimisation", body: "Fast checkout, trust badges, upsells, reviews and abandoned-cart recovery." },
      { title: "Integrations", body: "Inventory, ERP, accounting, marketplaces and WhatsApp ordering." },
      { title: "E-commerce SEO & ads", body: "Product SEO, Google Shopping and Meta catalogue ads." },
    ],
    steps: [
      { title: "Plan", body: "Products, platform, payments, shipping and growth goals." },
      { title: "Design", body: "Store design focused on product discovery and checkout." },
      { title: "Build & integrate", body: "Development, product upload, payments and testing." },
      { title: "Launch & grow", body: "Go live, then marketing and optimisation to drive sales." },
    ],
    audience:
      "Brands moving from Instagram or WhatsApp selling to a proper store, retailers going online, D2C startups and exporters selling internationally.",
    tools: ["Shopify", "WooCommerce", "Next.js Commerce", "Stripe", "PayPal", "Local payment gateways", "Klaviyo", "Google Merchant Center"],
    faq: [
      { q: "Shopify or WooCommerce?", a: "Shopify for ease and speed; WooCommerce for flexibility and lower monthly fees. We recommend based on your products and budget." },
      { q: "Can you migrate my existing store?", a: "Yes, with products, customers and orders, and SEO redirects so you keep your rankings." },
      { q: "Can I sell internationally?", a: "Yes, with multi-currency, international payments and shipping rules." },
      { q: "Will I be able to manage orders myself?", a: "Yes. We train you on the dashboard before launch." },
    ],
    finalCta: { headline: "Let's build a store that sells while you sleep.", cta: "Get my store quote" },
    related: ["email-marketing", "google-ads-ppc", "website-maintenance-support"],
  },
  {
    slug: "website-maintenance-support",
    order: 10,
    name: "Website Maintenance & Support",
    shortName: "Maintenance",
    group: "protect",
    pitch: "Your site, updated, secure and fast, always.",
    sceneId: "maintenance",
    accent: "#5CFFB0",
    meta: {
      title: `Website Maintenance & Support Plans | ${A}`,
      description:
        "Updates, security, backups, speed and content changes handled every month. Keep your website fast, safe and working — without the headaches.",
    },
    hero: {
      eyebrow: "Website Maintenance & Support",
      headline: "Your website, always fast, safe and up to date.",
      subhead:
        "We handle updates, security, backups and changes so you never wake up to a broken or hacked site.",
      cta: "Protect my website",
    },
    problem:
      "Websites don't stay healthy on their own. Outdated plugins get hacked, sites slow down, forms quietly stop working and backups are missing exactly when you need them. One bad day can cost you leads and your Google rankings.",
    included: [
      { title: "Updates", body: "Core, theme and plugin updates, tested before they go live." },
      { title: "Security", body: "Firewall, malware scanning and hack clean-up if anything slips through." },
      { title: "Daily backups", body: "Off-site backups with one-click restore." },
      { title: "Uptime monitoring", body: "24/7 checks; we're alerted the moment your site goes down." },
      { title: "Speed optimisation", body: "Regular performance tuning to keep Core Web Vitals green." },
      { title: "Content changes", body: "Monthly hours for text, image, page and product updates." },
    ],
    steps: [
      { title: "Health check", body: "A full audit of security, speed, backups and plugins." },
      { title: "Stabilise", body: "Fix urgent issues and set up monitoring and backups." },
      { title: "Maintain", body: "Monthly updates, checks and your requested changes." },
      { title: "Report", body: "A monthly report of everything done, uptime and speed." },
    ],
    audience:
      "Any business whose website brings in leads or sales, especially WordPress and Shopify sites, and owners who'd rather run their business than fix plugins.",
    tools: ["WordPress", "Shopify", "Webflow", "Next.js / Vercel", "Cloudflare", "Wordfence", "UptimeRobot", "Google Search Console"],
    faq: [
      { q: "Do you maintain sites you didn't build?", a: "Yes, after an initial health check." },
      { q: "How fast do you respond?", a: "Urgent issues within 4 business hours; standard requests within 2 business days." },
      { q: "What if my site gets hacked?", a: "Clean-up and restoration are included on active plans." },
      { q: "Can unused hours roll over?", a: "Unused content hours roll over for one month." },
    ],
    finalCta: { headline: "Stop worrying about your website.", cta: "Get a free website health check" },
    related: ["web-design-development", "ecommerce-solutions", "seo"],
  },
];

export const serviceGroups: { id: ServiceGroup; title: string; line: string }[] = [
  { id: "build", title: "Build", line: "Get a home online that works as hard as you do." },
  { id: "get-found", title: "Get found", line: "Show up where your customers are already looking." },
  { id: "engage", title: "Engage & convert", line: "Turn attention into customers." },
  { id: "protect", title: "Protect", line: "Keep it all running." },
];

export const bundles = [
  { name: "Launch", includes: "Branding + Website + Local SEO setup", bestFor: "New businesses going online" },
  { name: "Growth", includes: "SEO + Google Ads + Content + Monthly reporting", bestFor: "Businesses ready to scale leads" },
  { name: "Commerce", includes: "E-commerce store + Email automation + Social ads", bestFor: "Online sellers" },
  { name: "Always-On", includes: "Maintenance + Social media + Email", bestFor: "Established brands that need a reliable team" },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
