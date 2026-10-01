"use server";

import { headers } from "next/headers";
import { contactSchema, MAX_FILE, FILE_TYPES, type ContactResult } from "@/lib/contactSchema";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

// Best-effort rate limit (per server instance). For strict limits across
// regions, swap for Upstash/Vercel KV.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function verifyTurnstile(token: string | null, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured (local dev)
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const json = (await res.json()) as { success: boolean };
  return json.success;
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Honeypot: real people never fill this hidden field.
  if (formData.get("company_url")) return { ok: true, name: "there" };
  if (limited(ip)) return { ok: false, error: "Too many submissions. Please try again in an hour or email us directly." };
  if (!(await verifyTurnstile(formData.get("cf-turnstile-response") as string | null, ip))) {
    return { ok: false, error: "We couldn't verify you're human. Please refresh and try again." };
  }

  const raw = {
    services: formData.getAll("services"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline") || undefined,
    company: formData.get("company") ?? "",
    website: formData.get("website") ?? "",
    message: formData.get("message"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    method: formData.get("method") || undefined,
    source: formData.get("source") ?? "",
    consent: formData.get("consent") === "true",
  };
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;

  // Optional attachment
  const file = formData.get("file");
  let fileUrl: string | undefined;
  let attachment: { filename: string; content: Buffer } | undefined;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE) return { ok: false, error: contact.messages.fileTooLarge };
    if (!FILE_TYPES.includes(file.type)) return { ok: false, error: contact.messages.fileType };
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const blob = await put(`briefs/${Date.now()}-${file.name}`, file, { access: "public", addRandomSuffix: true });
      fileUrl = blob.url;
    } else {
      attachment = { filename: file.name, content: Buffer.from(await file.arrayBuffer()) };
    }
  }

  const meta = {
    "Page URL": String(formData.get("pageUrl") ?? ""),
    "UTM source": String(formData.get("utm_source") ?? ""),
    "UTM medium": String(formData.get("utm_medium") ?? ""),
    "UTM campaign": String(formData.get("utm_campaign") ?? ""),
    Submitted: new Date().toISOString(),
    IP: ip,
  };

  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const { Resend } = await import("resend");
      const { AutoReplyEmail, LeadNotificationEmail } = await import("@/emails/LeadEmails");
      const resend = new Resend(key);
      const from = process.env.CONTACT_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`;
      const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
      const internal = await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: `New lead: ${data.name} — ${data.services.join(", ")} — ${data.budget}`,
        react: LeadNotificationEmail({ data, meta, fileUrl }),
        attachments: attachment ? [attachment] : undefined,
      });
      if (internal.error) throw new Error(internal.error.message);
      await resend.emails.send({
        from,
        to: data.email,
        replyTo: to,
        subject: `We got your project details, ${data.name.split(" ")[0]} 👋`,
        react: AutoReplyEmail({ data }),
      });
    } catch (err) {
      console.error("contact: email failed", err);
      return { ok: false, error: contact.error };
    }
  } else {
    // Local development without email configured: log the lead instead.
    console.info("contact: new lead (RESEND_API_KEY not set)", { ...data, meta, file: attachment?.filename ?? fileUrl });
  }

  return { ok: true, name: data.name.split(" ")[0] };
}
