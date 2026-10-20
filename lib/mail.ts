type EnquiryMail = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website?: string | null;
  service: string;
  budget: string;
  message: string;
  preferredContact: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 16px 8px 0;color:#9a968d;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#1a1a1a;">${escapeHtml(value)}</td></tr>`;
}

export async function sendEnquiryEmail(enquiry: EnquiryMail, to: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Lynora enquiry] Saved, but no email was sent because RESEND_API_KEY is not set.");
    return { sent: false as const };
  }

  const from = process.env.EMAIL_FROM || "Lynora <onboarding@resend.dev>";
  const text = [
    `New project enquiry from ${enquiry.name}`,
    "",
    `Name: ${enquiry.name}`,
    `Business: ${enquiry.businessName}`,
    `Email: ${enquiry.email}`,
    `Phone / WhatsApp: ${enquiry.phone}`,
    `Website: ${enquiry.website || "—"}`,
    `Service: ${enquiry.service}`,
    `Budget: ${enquiry.budget}`,
    `Preferred contact: ${enquiry.preferredContact}`,
    "",
    enquiry.message,
  ].join("\n");

  const html = `
    <div style="font-family:Georgia,serif;color:#1a1a1a;">
      <p style="letter-spacing:0.16em;text-transform:uppercase;font-size:12px;color:#c9a55c;">Lynora enquiry</p>
      <h1 style="font-weight:normal;font-size:28px;">${escapeHtml(enquiry.name)}</h1>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
        ${row("Business", enquiry.businessName)}
        ${row("Email", enquiry.email)}
        ${row("Phone / WhatsApp", enquiry.phone)}
        ${row("Website", enquiry.website || "—")}
        ${row("Service", enquiry.service)}
        ${row("Budget", enquiry.budget)}
        ${row("Preferred contact", enquiry.preferredContact)}
      </table>
      <p style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;">${escapeHtml(enquiry.message)}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: `New project enquiry from ${enquiry.name}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Email provider responded with ${response.status}`);
  }

  return { sent: true as const };
}
