import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/public/Container";
import { getPageBySlug, getPublishedPosts, sectionMap } from "@/lib/content";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>;
}) {
  const { q, category, tag } = await searchParams;
  const page = await getPageBySlug("blog");
  return buildMetadata({
    title: page?.seoTitle || "Journal | Lynora",
    description: page?.seoDescription,
    path: "/blog",
    noIndex: Boolean(q || category || tag) || page?.noIndex,
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>;
}) {
  const { q, category, tag } = await searchParams;
  const [page, featured, categories, tags] = await Promise.all([
    getPageBySlug("blog"),
    getPublishedPosts({ featured: true, take: 2 }),
    prisma.category.findMany({ orderBy: { name: "asc" } }).catch(() => []),
    prisma.tag.findMany({ orderBy: { name: "asc" } }).catch(() => []),
  ]);
  const hero = sectionMap(page?.sections).hero;

  const posts = await prisma.post
    .findMany({
      where: {
        status: "PUBLISHED",
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { excerpt: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(category ? { category: { slug: category } } : {}),
        ...(tag ? { tags: { some: { tag: { slug: tag } } } } : {}),
      },
      include: { author: true, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
    })
    .catch(() => []);

  return (
    <div className="pt-32 pb-24">
      <Container>
        <p className="section-label">{hero?.subheading || "Journal"}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl text-ivory">{hero?.heading}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone">{hero?.paragraph}</p>

        <form className="mt-10 flex flex-col gap-3 sm:flex-row" action="/blog">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search posts"
            className="flex-1 rounded-full border border-gold/20 bg-ink-elevated px-5 py-3 text-sm text-ivory outline-none"
          />
          <button className="rounded-full bg-gold px-5 py-3 text-[0.7rem] tracking-[0.18em] uppercase text-ink">
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-3 text-[0.68rem] tracking-[0.16em] uppercase text-stone">
          {categories.map((item) => (
            <Link key={item.id} href={`/blog?category=${item.slug}`} className="hover:text-gold">
              {item.name}
            </Link>
          ))}
          {tags.map((item) => (
            <Link key={item.id} href={`/blog?tag=${item.slug}`} className="hover:text-gold">
              #{item.name}
            </Link>
          ))}
        </div>

        {featured.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featured.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="overflow-hidden rounded-[26px] border border-gold/15">
                <div className="relative aspect-[16/10] bg-ink-soft">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="section-label">Featured</p>
                  <h2 className="mt-3 font-serif text-3xl text-ivory">{post.title}</h2>
                  <p className="mt-3 text-sm text-stone">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-12 space-y-5">
          <h2 className="font-serif text-3xl text-ivory">Latest posts</h2>
          {posts.length ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block rounded-[22px] border border-gold/15 p-5 hover:border-gold/40"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-gold">
                  {post.category?.name || "Journal"} · {formatDate(post.publishedAt)}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-ivory">{post.title}</h3>
                <p className="mt-2 text-sm text-stone">{post.excerpt}</p>
              </Link>
            ))
          ) : (
            <p className="text-stone">No published posts yet. Create the first one from the admin journal.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
