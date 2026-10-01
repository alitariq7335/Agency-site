"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Paperclip, X } from "lucide-react";
import { contactSchema, stepFields, MAX_FILE, FILE_TYPES, type ContactInput } from "@/lib/contactSchema";
import { contact, serviceOptions, budgetOptions, timelineOptions, contactMethodOptions, sourceOptions } from "@/content/contact";
import { submitContact } from "@/app/contact/actions";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

// Map service page slugs to form options so "/contact?service=seo" pre-selects SEO.
const slugToOption: Record<string, (typeof serviceOptions)[number]> = {
  "web-design-development": "Web Design & Development",
  seo: "SEO",
  "local-seo": "Local SEO",
  "google-ads-ppc": "Google Ads & PPC",
  "social-media-marketing": "Social Media",
  "content-generation": "Content",
  "branding-graphic-design": "Branding & Design",
  "email-marketing": "Email Marketing",
  "ecommerce-solutions": "E-commerce",
  "website-maintenance-support": "Maintenance & Support",
};

function Chip({ selected, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      {...props}
      className={cn(
        "rounded-full border px-4 py-2.5 text-[15px] transition-[background-color,border-color,color] duration-300",
        selected ? "border-transparent bg-bone text-ink" : "border-line text-bone/85 hover:border-bone/35",
      )}
    >
      {children}
    </button>
  );
}

function FieldError({ msg, id }: { msg?: string; id: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p id={id} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-sm text-flare">
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const input =
  "w-full rounded-2xl border border-line bg-white/[0.03] px-4 py-3.5 text-bone placeholder:text-haze/60 transition-colors focus:border-violet focus:bg-white/[0.05] focus:outline-none aria-[invalid=true]:border-flare";
const label = "mb-2 block text-[15px] text-bone";

export function ContactForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [serverError, setServerError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const preselected = useMemo(() => {
    const s = params.get("service");
    return s && slugToOption[s] ? [slugToOption[s]] : [];
  }, [params]);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { services: preselected, message: "", name: "", email: "", phone: "+92 ", company: "", website: "", source: "" },
  });

  const [meta, setMeta] = useState<Record<string, string>>({});
  useEffect(() => {
    const u = new URL(window.location.href);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL is only possible after mount
    setMeta({
      pageUrl: u.href,
      utm_source: u.searchParams.get("utm_source") ?? "",
      utm_medium: u.searchParams.get("utm_medium") ?? "",
      utm_campaign: u.searchParams.get("utm_campaign") ?? "",
    });
  }, []);

  const go = async (to: number) => {
    if (to > step) {
      const ok = await trigger(stepFields[step]);
      if (!ok) return;
    }
    setDir(to > step ? 1 : -1);
    setStep(to);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onFile = (f: File | undefined) => {
    setFileError(undefined);
    if (!f) return setFile(null);
    if (f.size > MAX_FILE) return setFileError(contact.messages.fileTooLarge);
    if (!FILE_TYPES.includes(f.type)) return setFileError(contact.messages.fileType);
    setFile(f);
  };

  const onSubmit = handleSubmit((data, e) => {
    const form = (e?.target as HTMLFormElement | undefined) ?? null;
    setServerError(undefined);
    const fd = new FormData();
    data.services.forEach((s) => fd.append("services", s));
    Object.entries(data).forEach(([k, v]) => {
      if (k === "services" || v === undefined) return;
      fd.append(k, String(v));
    });
    Object.entries(meta).forEach(([k, v]) => fd.append(k, v));
    const hp = form?.querySelector<HTMLInputElement>("input[name=company_url]");
    if (hp?.value) fd.append("company_url", hp.value);
    const ts = form?.querySelector<HTMLInputElement>("input[name='cf-turnstile-response']");
    if (ts?.value) fd.append("cf-turnstile-response", ts.value);
    if (file) fd.append("file", file);

    startTransition(async () => {
      const res = await submitContact(fd);
      if (res.ok) {
        const w = window as unknown as { gtag?: (...a: unknown[]) => void };
        w.gtag?.("event", "generate_lead", { services: data.services.join(","), budget: data.budget });
        router.push(`/contact/thank-you?name=${encodeURIComponent(res.name)}`);
      } else {
        setServerError(res.error);
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([k, m]) => setError(k as keyof ContactInput, { message: m }));
          const firstStep = stepFields.findIndex((f) => f.some((k) => res.fieldErrors?.[k]));
          if (firstStep >= 0) setStep(firstStep);
        }
      }
    });
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="glass scroll-mt-28 rounded-[28px] p-6 md:p-10" aria-describedby="form-status">
      {/* progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-haze">
          <span>
            Step {step + 1} of 3 · <span className="text-bone">{contact.steps[step]}</span>
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1 overflow-hidden rounded-full bg-line">
              <motion.div className="h-full bg-gradient-to-r from-violet to-cyan" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.6, ease }} />
            </div>
          ))}
        </div>
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.fieldset
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.45, ease }}
            className="space-y-8"
          >
            <legend className="sr-only">{contact.steps[step]}</legend>

            {step === 0 && (
              <>
                <Controller
                  control={control}
                  name="services"
                  render={({ field }) => (
                    <div role="group" aria-labelledby="l-services" aria-describedby="e-services">
                      <p id="l-services" className={label}>I&apos;m interested in <span className="text-haze">(pick any)</span></p>
                      <div className="flex flex-wrap gap-2">
                        {serviceOptions.map((o) => {
                          const on = field.value?.includes(o);
                          return (
                            <Chip
                              key={o}
                              selected={!!on}
                              onClick={() => field.onChange(on ? field.value.filter((v) => v !== o) : [...(field.value ?? []), o])}
                            >
                              {o}
                            </Chip>
                          );
                        })}
                      </div>
                      <FieldError id="e-services" msg={errors.services?.message} />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="budget"
                  render={({ field }) => (
                    <div role="radiogroup" aria-labelledby="l-budget" aria-describedby="e-budget">
                      <p id="l-budget" className={label}>Monthly / project budget</p>
                      <div className="flex flex-wrap gap-2">
                        {budgetOptions.map((o) => (
                          <Chip key={o} selected={field.value === o} role="radio" aria-checked={field.value === o} onClick={() => field.onChange(o)}>
                            {o}
                          </Chip>
                        ))}
                      </div>
                      <FieldError id="e-budget" msg={errors.budget?.message} />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="timeline"
                  render={({ field }) => (
                    <div role="radiogroup" aria-labelledby="l-timeline">
                      <p id="l-timeline" className={label}>Timeline <span className="text-haze">(optional)</span></p>
                      <div className="flex flex-wrap gap-2">
                        {timelineOptions.map((o) => (
                          <Chip key={o} selected={field.value === o} role="radio" aria-checked={field.value === o} onClick={() => field.onChange(field.value === o ? undefined : o)}>
                            {o}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                />
              </>
            )}

            {step === 1 && (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="company" className={label}>Company name <span className="text-haze">(optional)</span></label>
                    <input id="company" className={input} placeholder="Acme Pvt Ltd" autoComplete="organization" {...register("company")} />
                  </div>
                  <div>
                    <label htmlFor="website" className={label}>Current website <span className="text-haze">(optional)</span></label>
                    <input id="website" type="url" className={input} placeholder="https://yourwebsite.com" autoComplete="url" {...register("website")} />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className={label}>Tell us about your project</label>
                  <textarea
                    id="message"
                    rows={6}
                    maxLength={1500}
                    className={cn(input, "resize-none")}
                    placeholder="What are you trying to achieve? Any deadlines or examples you love?"
                    aria-invalid={!!errors.message}
                    aria-describedby="e-message"
                    {...register("message")}
                  />
                  <FieldError id="e-message" msg={errors.message?.message} />
                </div>
                <div>
                  <p className={label}>Attach a brief <span className="text-haze">(optional · PDF, DOCX, PNG, JPG · max 10 MB)</span></p>
                  {file ? (
                    <div className="flex items-center justify-between rounded-2xl border border-line bg-white/[0.03] px-4 py-3">
                      <span className="flex items-center gap-2 truncate text-[15px]">
                        <Paperclip className="h-4 w-4 shrink-0 text-cyan" /> {file.name}
                      </span>
                      <button type="button" onClick={() => setFile(null)} aria-label="Remove file" className="rounded-full p-1 hover:bg-white/10">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="file"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        onFile(e.dataTransfer.files[0]);
                      }}
                      className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-line px-4 py-7 text-center text-[15px] text-haze transition-colors hover:border-bone/35 hover:text-bone"
                    >
                      <Paperclip className="h-5 w-5" />
                      Drop a file or click to upload
                      <input id="file" type="file" accept=".pdf,.docx,.png,.jpg,.jpeg" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
                    </label>
                  )}
                  <FieldError id="e-file" msg={fileError} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>Full name</label>
                    <input id="name" className={input} placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="e-name" {...register("name")} />
                    <FieldError id="e-name" msg={errors.name?.message} />
                  </div>
                  <div>
                    <label htmlFor="email" className={label}>Email</label>
                    <input id="email" type="email" className={input} placeholder="you@company.com" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="e-email" {...register("email")} />
                    <FieldError id="e-email" msg={errors.email?.message} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Phone / WhatsApp</label>
                    <input id="phone" type="tel" className={input} placeholder="+92 300 1234567" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby="e-phone" {...register("phone")} />
                    <FieldError id="e-phone" msg={errors.phone?.message} />
                  </div>
                  <div>
                    <label htmlFor="source" className={label}>How did you hear about us? <span className="text-haze">(optional)</span></label>
                    <select id="source" className={cn(input, "appearance-none")} {...register("source")}>
                      <option value="">Choose one</option>
                      {sourceOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <Controller
                  control={control}
                  name="method"
                  render={({ field }) => (
                    <div role="radiogroup" aria-labelledby="l-method">
                      <p id="l-method" className={label}>Preferred contact method <span className="text-haze">(optional)</span></p>
                      <div className="flex flex-wrap gap-2">
                        {contactMethodOptions.map((o) => (
                          <Chip key={o} selected={field.value === o} role="radio" aria-checked={field.value === o} onClick={() => field.onChange(o)}>
                            {o}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                />
                <div>
                  <label className="flex items-start gap-3 text-[15px] text-bone/85">
                    <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-violet" aria-invalid={!!errors.consent} aria-describedby="e-consent" {...register("consent")} />
                    <span>
                      I agree to the <a href="/privacy" className="underline underline-offset-4">Privacy Policy</a> and to be contacted about my enquiry.
                    </span>
                  </label>
                  <FieldError id="e-consent" msg={errors.consent?.message} />
                </div>
                {turnstileKey && (
                  <>
                    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
                    <div className="cf-turnstile" data-sitekey={turnstileKey} data-theme="dark" />
                  </>
                )}
              </>
            )}
          </motion.fieldset>
        </AnimatePresence>
      </div>

      <p id="form-status" role="status" aria-live="polite" className="min-h-6 text-[15px] text-flare">
        {serverError}
      </p>

      <div className="mt-4 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[15px] hover:bg-white/5">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button type="button" onClick={() => go(step + 1)} className="inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-[15px] font-medium text-ink hover:bg-white">
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-[15px] font-medium text-ink hover:bg-white disabled:opacity-60">
            {pending ? "Sending…" : "Send my project"} <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
}
