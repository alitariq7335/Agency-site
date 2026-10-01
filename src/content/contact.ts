import { site } from "./site";

export const serviceOptions = [
  "Web Design & Development",
  "SEO",
  "Local SEO",
  "Google Ads & PPC",
  "Social Media",
  "Content",
  "Branding & Design",
  "Email Marketing",
  "E-commerce",
  "Maintenance & Support",
  "Not sure yet",
] as const;

export const budgetOptions = ["Under $1,000", "$1,000–$3,000", "$3,000–$7,500", "$7,500+", "Not sure yet"] as const;
export const timelineOptions = ["ASAP", "Within 1 month", "1–3 months", "Just exploring"] as const;
export const contactMethodOptions = ["Email", "Phone call", "WhatsApp"] as const;
export const sourceOptions = ["Google", "Instagram", "Facebook", "LinkedIn", "Referral", "Other"] as const;

export const contact = {
  meta: {
    title: `Contact ${site.name} — Start Your Project`,
    description:
      "Tell us about your project and get a free strategy call within one business day. Web design, SEO, ads, social media and more.",
  },
  hero: {
    eyebrow: "Contact",
    headline: "Let's build something people remember.",
    subhead: "Tell us a little about your project. A strategist (not a salesperson) will reply within one business day.",
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
    body: (name: string) => `Thanks, ${name}! A strategist will reach out within one business day.`,
  },
  error: `Something went wrong on our side. Please try again, or email us directly at ${site.contact.email}.`,
};
