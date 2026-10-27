import { ButtonLink } from "@/components/public/ButtonLink";
import { Container } from "@/components/public/Container";
import type { SiteSettings } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export function ServicesQuoteCta({ settings }: { settings: SiteSettings }) {
  return (
    <section className="pb-16 pt-6">
      <Container>
        <div className="overflow-hidden rounded-[30px] border border-gold/20 bg-[linear-gradient(135deg,rgba(201,165,92,0.12),rgba(8,8,8,0.9))] px-6 py-12 text-center md:px-14">
          <p className="section-label">Custom recommendation</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl leading-[1.12] text-ivory sm:text-5xl">
            Not sure where to start?
          </h2>
          <p className="prose-quiet mx-auto mt-4 max-w-xl">
            You don’t need every digital service. You need the right combination for where your
            business is right now. Tell us about your goals and we’ll recommend the best place to
            start.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact">Get a Custom Quote</ButtonLink>
            <ButtonLink href={whatsappLink(settings.whatsapp || "079 240 4930")} variant="gold-outline">
              WhatsApp Lynora
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-stone">
            <a className="hover:text-ivory" href={`mailto:${settings.email}`}>
              {settings.email}
            </a>
            {" · "}
            <a className="hover:text-ivory" href={whatsappLink(settings.whatsapp || "079 240 4930")}>
              {settings.whatsapp}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
