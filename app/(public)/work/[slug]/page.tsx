import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { ButtonLink } from "@/components/public/ButtonLink";
import { Container } from "@/components/public/Container";
import { JsonLd } from "@/components/public/JsonLd";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

const typeLabel: Record<string, string> = {
  REAL: "Real Project",
  CONCEPT: "Concept Project",
  INTERNAL: "In-house Project",
};

async function getProject(slug: string, preview: boolean) {
  const session = preview ? await getSession() : null;
  return prisma.project.findFirst({
    where: {
      slug,
      ...(session ? {} : { published: true }),
    },
    include: { gallery: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const project = await getProject(slug, preview === "1");
  if (!project) return buildMetadata({ path: `/work/${slug}` });
  return buildMetadata({
    title: project.seoTitle || `${project.title} | Lynora`,
    description: project.seoDescription || project.summary,
    ogImage: project.coverImage,
    path: `/work/${slug}`,
    noIndex: !project.published,
  });
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const project = await getProject(slug, preview === "1");
  if (!project) notFound();

  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: `/work/${project.slug}`, label: project.title },
  ];

  return (
    <div className="pt-28 pb-16">
      {project.published ? <JsonLd data={[breadcrumbJsonLd(crumbs), projectJsonLd(project)]} /> : null}
      <Container className="max-w-4xl">
        <Breadcrumbs items={crumbs} />
        {!project.published ? (
          <p className="mb-4 text-[0.7rem] tracking-[0.18em] uppercase text-gold">Preview — unpublished</p>
        ) : null}
        <p className="section-label">{project.industry}</p>
        <h1 className="mt-3 font-serif text-5xl leading-[1.1] text-ivory">{project.title}</h1>
        <p className="mt-2 text-gold">{typeLabel[project.status]} · {project.projectType}</p>
        <p className="prose-quiet mt-4">{project.summary}</p>
        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[28px] border border-gold/15">
          <Image
            src={project.coverImage || "/portfolio/lynora-identity.svg"}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div>
            <p className="section-label">Problem</p>
            <p className="mt-3 text-sm leading-7 text-stone">{project.problem}</p>
          </div>
          <div>
            <p className="section-label">Solution</p>
            <p className="mt-3 text-sm leading-7 text-stone">{project.solution}</p>
          </div>
          <div>
            <p className="section-label">Results</p>
            <p className="mt-3 text-sm leading-7 text-stone">{project.results}</p>
          </div>
        </div>
        {project.gallery.length ? (
          <div className="mt-12 grid gap-4">
            {project.gallery.map((image) => (
              <div key={image.id} className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
                <Image
                  src={image.url}
                  alt={image.altText || project.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}
        {project.testimonial ? (
          <blockquote className="mt-12 border-l border-gold pl-5 font-serif text-2xl text-ivory">
            {project.testimonial}
          </blockquote>
        ) : null}
        <div className="mt-10">
          <ButtonLink href="/contact">Start a similar project</ButtonLink>
        </div>
      </Container>
    </div>
  );
}
