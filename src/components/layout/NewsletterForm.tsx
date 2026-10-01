"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<SubscribeState, FormData>(subscribe, { status: "idle" });
  if (state.status === "ok") {
    return <p className="text-[15px] text-cyan">Subscribed. See you in your inbox.</p>;
  }
  return (
    <form action={action} className="flex max-w-sm items-center gap-2 rounded-full border border-line p-1.5 focus-within:border-bone/40">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input
        id="nl-email"
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        className="min-w-0 flex-1 bg-transparent px-3 text-[15px] placeholder:text-haze/70 focus:outline-none"
      />
      <button type="submit" disabled={pending} className="rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink disabled:opacity-60">
        {pending ? "Subscribing…" : "Subscribe"}
      </button>
      {state.status === "error" && <span role="alert" className="sr-only">{state.message}</span>}
    </form>
  );
}
