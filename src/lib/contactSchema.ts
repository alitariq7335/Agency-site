import { z } from "zod";
import { contact, serviceOptions, budgetOptions, timelineOptions, contactMethodOptions, sourceOptions } from "@/content/contact";

const m = contact.messages;

export const MAX_FILE = 10 * 1024 * 1024;
export const FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

/** One schema, used by the form (client) and re-checked in the Server Action. */
export const contactSchema = z.object({
  services: z.array(z.enum(serviceOptions)).min(1, m.service),
  budget: z.enum(budgetOptions, { error: m.required }),
  timeline: z.enum(timelineOptions).optional(),
  company: z.string().max(120).optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(20, m.tooShort).max(1500),
  name: z.string().trim().min(2, m.required).max(100),
  email: z.email(m.email),
  phone: z
    .string()
    .trim()
    .regex(/^\+\d[\d\s-]{7,18}$/, m.phone),
  method: z.enum(contactMethodOptions).optional(),
  source: z.enum(sourceOptions).optional().or(z.literal("")),
  consent: z.literal(true, { error: m.consent }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const stepFields: (keyof ContactInput)[][] = [
  ["services", "budget", "timeline"],
  ["company", "website", "message"],
  ["name", "email", "phone", "method", "source", "consent"],
];

export type ContactResult = { ok: true; name: string } | { ok: false; error: string; fieldErrors?: Record<string, string> };
