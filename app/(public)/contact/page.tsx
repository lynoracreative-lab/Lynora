import { ContactForm } from "@/components/public/ContactForm";
import { Container } from "@/components/public/Container";
import { FAQ } from "@/components/public/FAQ";
import { JsonLd } from "@/components/public/JsonLd";
import { getPageBySlug, getPublishedFaqs, getSiteSettings, sectionMap } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/structured-data";
import { whatsappLink } from "@/lib/utils";

export async function generateMetadata() {
  const page = await getPageBySlug("contact");
  return buildMetadata({
    title: page?.seoTitle || "Start a Project | Lynora",
    description: page?.seoDescription,
    path: "/contact",
  });
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const [{ intent }, page, settings, faqs] = await Promise.all([
    searchParams,
    getPageBySlug("contact"),
    getSiteSettings(),
    getPublishedFaqs(),
  ]);
  const hero = sectionMap(page?.sections).hero;
  const review = intent === "review";

  return (
    <div className="pt-32 pb-24">
      {faqs.length ? <JsonLd data={faqJsonLd(faqs)} /> : null}
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="section-label">{hero?.subheading || "Start a project"}</p>
          <h1 className="mt-4 font-serif text-5xl text-ivory">
            {review ? "Get a free website review" : hero?.heading || "Tell us where you want the business to go."}
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone">
            {review
              ? "Send us your website and we will share three things we think could improve your online presence. No obligation. No hard sell."
              : hero?.paragraph}
          </p>
          <div className="mt-10 space-y-3 text-sm text-stone">
            <p>
              Email:{" "}
              <a className="text-ivory hover:text-gold" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            </p>
            <p>
              WhatsApp:{" "}
              <a className="text-ivory hover:text-gold" href={whatsappLink(settings.whatsapp)}>
                {settings.whatsapp}
              </a>
            </p>
            <p>Location: {settings.location}</p>
            <p className="pt-4 text-gold/80">Working with clients locally and internationally.</p>
          </div>
        </div>
        <div className="rounded-[28px] border border-gold/15 bg-ink-elevated p-6 md:p-8">
          <ContactForm defaultService={review ? "Website Design & Development" : undefined} />
        </div>
      </Container>
      {faqs.length ? (
        <FAQ heading="Questions, answered plainly." label="FAQ" items={faqs} />
      ) : null}
    </div>
  );
}
