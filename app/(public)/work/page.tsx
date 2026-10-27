import { WorkGrid } from "@/components/public/WorkGrid";
import { Container } from "@/components/public/Container";
import { JsonLd } from "@/components/public/JsonLd";
import { getPageBySlug, getPublishedProjects, sectionMap } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { itemListJsonLd } from "@/lib/structured-data";
import { siteUrl } from "@/lib/utils";

export async function generateMetadata() {
  const page = await getPageBySlug("work");
  return buildMetadata({
    title: page?.seoTitle || "Selected Work | Lynora",
    description: page?.seoDescription,
    path: "/work",
  });
}

export default async function WorkPage() {
  const [page, projects] = await Promise.all([getPageBySlug("work"), getPublishedProjects()]);
  const hero = sectionMap(page?.sections).hero;

  return (
    <div className="pt-28 pb-16">
      <JsonLd
        data={itemListJsonLd(
          projects.map((project) => ({
            name: project.title,
            url: siteUrl(`/work/${project.slug}`),
          })),
        )}
      />
      <Container>
        <p className="section-label">{hero?.subheading || "Portfolio"}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.1] text-ivory sm:text-6xl">
          {hero?.heading || "Selected work"}
        </h1>
        <p className="prose-quiet mt-4 max-w-2xl">{hero?.paragraph}</p>
        <WorkGrid projects={projects} />
      </Container>
    </div>
  );
}
