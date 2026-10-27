import Image from "next/image";
import { Container } from "@/components/public/Container";
import { getPageBySlug, getPublishedServices, sectionMap } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getPageBySlug("about");
  return buildMetadata({
    title: page?.seoTitle || "About Lynora | Digital Studio",
    description: page?.seoDescription,
    path: "/about",
  });
}

export default async function AboutPage() {
  const [page, services] = await Promise.all([getPageBySlug("about"), getPublishedServices()]);
  const sections = sectionMap(page?.sections);
  const values =
    (sections.values?.extra as { values?: { title: string; text: string }[] } | undefined)?.values || [
      { title: "Curiosity", text: "We start by asking better questions." },
      { title: "Clarity", text: "If a visitor cannot understand the offer quickly, the design is not finished." },
      { title: "Craft", text: "Details are treated as part of the commercial work." },
      { title: "Innovation", text: "We use technology where it makes the work stronger." },
      { title: "Purpose", text: "Every decision should help the business move forward." },
    ];

  return (
    <div className="pt-28 pb-16">
      <Container className="space-y-14">
        <section className="max-w-3xl">
          <p className="section-label">{sections.story?.subheading || "About Lynora"}</p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.1] text-ivory sm:text-6xl">
            {sections.story?.heading || "Built for businesses that want to move forward."}
          </h1>
          <p className="prose-quiet mt-4">{sections.story?.paragraph}</p>
        </section>

        <section className="grid gap-8 rounded-[28px] border border-gold/15 bg-ink-elevated p-8 md:grid-cols-2">
          <div>
            <p className="section-label">{sections.mission?.subheading || "Mission"}</p>
            <h2 className="mt-4 font-serif text-4xl text-ivory">{sections.mission?.heading}</h2>
          </div>
          <p className="prose-quiet">{sections.mission?.paragraph}</p>
        </section>

        <section>
          <p className="section-label">{sections.values?.subheading || "Values"}</p>
          <h2 className="mt-4 font-serif text-4xl text-ivory">{sections.values?.heading || "The way we work."}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {values.map((value) => (
              <div key={value.title} className="rounded-[22px] border border-gold/15 p-5">
                <h3 className="font-serif text-2xl text-gold">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone">{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-gold/15">
            <Image
              src={
                (sections.founder?.extra as { image?: string } | undefined)?.image ||
                "/branding/founder-placeholder.svg"
              }
              alt="Zaghrah Anthony"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="section-label">{sections.founder?.subheading || "Founder"}</p>
            <h2 className="mt-4 font-serif text-5xl text-ivory">{sections.founder?.heading || "Zaghrah Anthony"}</h2>
            <p className="prose-quiet mt-4">{sections.founder?.paragraph}</p>
          </div>
        </section>

        <section>
          <p className="section-label">{sections.capabilities?.subheading || "Capabilities"}</p>
          <h2 className="mt-4 font-serif text-4xl text-ivory">{sections.capabilities?.heading}</h2>
          <p className="prose-quiet mt-4 max-w-2xl">{sections.capabilities?.paragraph}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {services.map((service) => (
              <span key={service.slug} className="rounded-full border border-gold/20 px-4 py-2 text-sm text-stone">
                {service.title}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-gold/20 bg-ink-soft p-8 md:p-12">
          <h2 className="font-serif text-4xl text-ivory">{sections.whyChoose?.heading || "Why choose Lynora"}</h2>
          <p className="prose-quiet mt-4 max-w-3xl">{sections.whyChoose?.paragraph}</p>
        </section>
      </Container>
    </div>
  );
}
