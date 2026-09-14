import { WorkGrid } from "@/components/public/WorkGrid";
import { Container } from "@/components/public/Container";
import { getPageBySlug, getPublishedProjects, sectionMap } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

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
    <div className="pt-32 pb-24">
      <Container>
        <p className="section-label">{hero?.subheading || "Portfolio"}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl text-ivory sm:text-6xl">
          {hero?.heading || "Selected work"}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone">{hero?.paragraph}</p>
        <WorkGrid projects={projects} />
      </Container>
    </div>
  );
}
