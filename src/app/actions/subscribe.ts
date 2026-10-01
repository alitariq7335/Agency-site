"use server";

import { z } from "zod";

export type SubscribeState = { status: "idle" | "ok" | "error"; message?: string };

const schema = z.object({ email: z.email() });

/**
 * Newsletter sign-up. Validates the address; when RESEND_API_KEY and
 * RESEND_AUDIENCE_ID are set the contact is added to that Resend audience.
 */
export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { status: "error", message: "That email doesn't look quite right." };

  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (key && audienceId) {
    try {
      const { Resend } = await import("resend");
      await new Resend(key).contacts.create({ email: parsed.data.email, audienceId, unsubscribed: false });
    } catch {
      return { status: "error", message: "Something went wrong. Please try again." };
    }
  }
  return { status: "ok" };
}
