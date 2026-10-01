import { Body, Container, Heading, Html, Link, Preview, Section, Text, Hr } from "@react-email/components";
import { site } from "@/content/site";
import type { ContactInput } from "@/lib/contactSchema";

const wrap = { backgroundColor: "#0a0814", color: "#eeeaf7", fontFamily: "Helvetica, Arial, sans-serif", padding: "32px 0" };
const card = { backgroundColor: "#120f20", borderRadius: "16px", padding: "32px", maxWidth: "560px" };
const muted = { color: "#9a94ae", fontSize: "14px" };

/** Auto-reply to the person who filled in the form. */
export function AutoReplyEmail({ data }: { data: ContactInput }) {
  const first = data.name.split(" ")[0];
  return (
    <Html>
      <Preview>We got your project details, {first}</Preview>
      <Body style={wrap}>
        <Container style={card}>
          <Heading style={{ fontSize: "26px", margin: 0 }}>Hi {first},</Heading>
          <Text>
            Thanks for reaching out to {site.name}. We&apos;ve received your enquiry about {data.services.join(", ")} and a strategist is already looking at it.
          </Text>
          <Text>Here&apos;s what happens next:</Text>
          <Text style={{ margin: "0 0 6px" }}>1. We review your details and website (if you shared one).</Text>
          <Text style={{ margin: "0 0 6px" }}>2. We&apos;ll contact you within one business day to book a free 30-minute strategy call.</Text>
          <Text style={{ margin: "0 0 16px" }}>3. On the call, we&apos;ll share quick wins and a recommended plan — no obligation.</Text>
          <Text>
            Need us sooner? Reply to this email or message us on WhatsApp at{" "}
            <Link href={site.contact.whatsappHref} style={{ color: "#3de3f5" }}>{site.contact.whatsapp}</Link>.
          </Text>
          <Text>
            Talk soon,
            <br />
            The {site.name} team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/** Internal notification with every field. */
export function LeadNotificationEmail({ data, meta, fileUrl }: { data: ContactInput; meta: Record<string, string>; fileUrl?: string }) {
  const rows: [string, string | undefined][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone],
    ["Preferred contact", data.method],
    ["Company", data.company],
    ["Website", data.website],
    ["Services", data.services.join(", ")],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
    ["Heard about us", data.source],
    ["Attachment", fileUrl],
  ];
  const wa = `https://wa.me/${data.phone.replace(/\D/g, "")}`;
  return (
    <Html>
      <Preview>New lead: {data.name}</Preview>
      <Body style={wrap}>
        <Container style={card}>
          <Heading style={{ fontSize: "22px", margin: "0 0 16px" }}>New lead: {data.name}</Heading>
          {rows
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <Text key={k} style={{ margin: "0 0 6px" }}>
                <span style={muted}>{k}: </span>
                {v}
              </Text>
            ))}
          <Hr style={{ borderColor: "#2a2540" }} />
          <Text style={muted}>Message</Text>
          <Text style={{ whiteSpace: "pre-wrap" }}>{data.message}</Text>
          <Hr style={{ borderColor: "#2a2540" }} />
          <Section>
            {Object.entries(meta).map(([k, v]) => (
              <Text key={k} style={{ ...muted, margin: "0 0 4px" }}>
                {k}: {v}
              </Text>
            ))}
          </Section>
          <Link href={wa} style={{ color: "#3de3f5" }}>Reply on WhatsApp</Link>
        </Container>
      </Body>
    </Html>
  );
}
