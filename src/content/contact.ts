import { site } from "./site";

export const serviceOptions = [
  "AI chatbot",
  "AI automation",
  "Custom software",
  "Mobile app",
  "Website",
  "Plugin",
  "CRM",
  "Online store",
  "Shopify",
  "WordPress",
  "Store management",
  "Marketing",
  "Local SEO",
  "Google Business Profile",
  "Meta ads",
  "Social media",
  "Content creation",
  "Not sure yet",
] as const;

export const regionOptions = ["Pakistan", "Outside Pakistan"] as const;

/** Budget ranges shown depend on where the client is based. */
export const budgetOptions = [
  "Under PKR 50,000",
  "PKR 50,000–150,000",
  "PKR 150,000–400,000",
  "PKR 400,000+",
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$7,500",
  "$7,500+",
  "Not sure yet",
] as const;
export const budgetsFor = (region: (typeof regionOptions)[number] | undefined) =>
  region === "Outside Pakistan"
    ? (["Under $1,000", "$1,000–$3,000", "$3,000–$7,500", "$7,500+", "Not sure yet"] as const)
    : (["Under PKR 50,000", "PKR 50,000–150,000", "PKR 150,000–400,000", "PKR 400,000+", "Not sure yet"] as const);

export const timelineOptions = ["ASAP", "Within 1 month", "1–3 months", "Just exploring"] as const;
export const contactMethodOptions = ["Email", "Phone call", "WhatsApp"] as const;
export const sourceOptions = ["Google", "Instagram", "Facebook", "LinkedIn", "WhatsApp", "Upwork / Fiverr", "Referral", "Other"] as const;

export const contact = {
  meta: {
    title: `Contact ${site.name} — Start Your Project`,
    description:
      "Tell us what you want to build or grow. Bengan Studios replies within one working day — websites, apps, AI chatbots, online stores, Local SEO and Meta ads.",
  },
  hero: {
    eyebrow: "Contact",
    headline: "Let's plant your idea.",
    subhead: "Tell us what you want to build or grow. We reply within one working day, and the first call is free.",
  },
  steps: ["What do you need?", "About your project", "How can we reach you?"],
  messages: {
    required: "This one's needed so we can help you.",
    service: "Pick at least one service — or “Not sure yet”.",
    email: "That email doesn't look quite right.",
    phone: "Please include your country code, e.g. +92.",
    tooShort: "Tell us a bit more so we can prepare for the call.",
    fileTooLarge: "Files need to be under 10 MB.",
    fileType: "Upload a PDF, DOCX, PNG or JPG.",
    consent: "Please accept the Privacy Policy to continue.",
  },
  success: {
    title: "Message received.",
    body: (name: string) => `Thanks, ${name}! Your idea is planted. We'll reply within one working day to book a free 20–30 minute discovery call.`,
  },
  error: `Something went wrong on our side. Please try again, or email us directly at ${site.contact.email}.`,
};
