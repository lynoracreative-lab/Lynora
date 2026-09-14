import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/public/Container";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sanitizeRichText } from "@/lib/sanitize";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getPost(slug: string, preview: boolean) {
  const session = preview ? await getSession() : null;
  return prisma.post.findFirst({
    where: {
      slug,
      ...(session ? {} : { status: "PUBLISHED" }),
    },
    include: { author: true, category: true, tags: { include: { tag: true } } },
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
  const post = await getPost(slug, preview === "1");
  if (!post) return buildMetadata({ path: `/blog/${slug}` });
  return buildMetadata({
    title: post.seoTitle || `${post.title} | Lynora`,
    description: post.seoDescription || post.excerpt,
    ogImage: post.ogImage || post.featuredImage,
    path: `/blog/${slug}`,
    noIndex: post.status !== "PUBLISHED",
  });
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const post = await getPost(slug, preview === "1");
  if (!post) notFound();

  return (
    <article className="pt-32 pb-24">
      <Container className="max-w-3xl">
        {post.status !== "PUBLISHED" ? (
          <p className="mb-4 text-[0.7rem] tracking-[0.18em] uppercase text-gold">Preview — draft</p>
        ) : null}
        <p className="section-label">
          {post.category?.name || "Journal"} · {formatDate(post.publishedAt || post.createdAt)}
        </p>
        <h1 className="mt-4 font-serif text-5xl text-ivory">{post.title}</h1>
        <p className="mt-5 text-lg text-stone">{post.excerpt}</p>
        <p className="mt-4 text-sm text-stone">By {post.author.name}</p>
        {post.featuredImage ? (
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[28px]">
            <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
          </div>
        ) : null}
        <div
          className="rich-content mt-10"
          dangerouslySetInnerHTML={{ __html: sanitizeRichText(post.content) }}
        />
      </Container>
    </article>
  );
}
