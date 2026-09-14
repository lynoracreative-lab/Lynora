import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Please check the form and try again." },
        { status: 400 },
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name: parsed.data.name,
        businessName: parsed.data.businessName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        website: parsed.data.website || null,
        service: parsed.data.service,
        budget: parsed.data.budget,
        message: parsed.data.message,
        preferredContact: parsed.data.preferredContact,
      },
    });

    console.info("[Lynora enquiry]", {
      id: enquiry.id,
      name: enquiry.name,
      businessName: enquiry.businessName,
      email: enquiry.email,
      service: enquiry.service,
    });

    // CONNECT EMAIL SENDING HERE
    // Option A — Resend:
    //   const resend = new Resend(process.env.RESEND_API_KEY)
    //   await resend.emails.send({ from, to: settings.email, subject, html })
    // Option B — SendGrid / Gmail SMTP / CRM webhook:
    //   POST the enquiry payload to your provider after this database write.
    // Keep this after prisma.enquiry.create so the lead is never lost if email fails.

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Lynora enquiry error]", error);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please email or WhatsApp us instead." },
      { status: 500 },
    );
  }
}
