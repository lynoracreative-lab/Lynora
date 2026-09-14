"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma, Role } from "@prisma/client";
import { createSession, destroySession, hashPassword, requireAdmin, requireUser, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { bool, num, parseJson, text } from "@/lib/admin/forms";
import { canDeleteEnquiry, canEditSettings } from "@/lib/permissions";
import { deleteStoredFile } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { faqSchema, postSchema, projectSchema, serviceSchema, testimonialSchema } from "@/lib/validation/content";
import { loginSchema, userSchema } from "@/lib/validation/auth";
import { sanitizeRichText } from "@/lib/sanitize";

function refresh(paths: string[]) {
  paths.forEach((path) => revalidatePath(path));
}

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: text(formData, "email"),
    password: text(formData, "password"),
  });
  if (!parsed.success) {
    redirect("/admin/login?error=invalid");
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !user.active) {
    redirect("/admin/login?error=invalid");
  }
  const ok = await verifyPassword(parsed.data.password, user.password);
  if (!ok) {
    redirect("/admin/login?error=invalid");
  }

  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  redirect(text(formData, "next") || "/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function updatePageSection(formData: FormData) {
  await requireUser("/admin/pages");
  const id = text(formData, "id");
  let extra: Prisma.InputJsonValue | typeof Prisma.JsonNull | undefined;
  try {
    const parsedExtra = parseJson(text(formData, "extra"));
    extra = parsedExtra === null ? Prisma.JsonNull : (parsedExtra as Prisma.InputJsonValue);
  } catch {
    extra = undefined;
  }

  await prisma.pageSection.update({
    where: { id },
    data: {
      heading: text(formData, "heading"),
      subheading: text(formData, "subheading"),
      paragraph: text(formData, "paragraph"),
      ctaLabel: text(formData, "ctaLabel"),
      ctaUrl: text(formData, "ctaUrl"),
      image: text(formData, "image") || null,
      enabled: bool(formData, "enabled"),
      ...(extra !== undefined ? { extra } : {}),
    },
  });
  refresh(["/", "/admin/pages", "/about", "/services", "/work", "/contact", "/blog"]);
}

export async function updatePageSeo(formData: FormData) {
  await requireUser("/admin/seo");
  await prisma.page.update({
    where: { id: text(formData, "id") },
    data: {
      seoTitle: text(formData, "seoTitle") || null,
      seoDescription: text(formData, "seoDescription") || null,
      ogImage: text(formData, "ogImage") || null,
      canonicalUrl: text(formData, "canonicalUrl") || null,
      noIndex: bool(formData, "noIndex"),
      published: bool(formData, "published"),
    },
  });
  refresh(["/", "/admin/pages", "/admin/seo"]);
}

export async function saveService(formData: FormData) {
  await requireUser("/admin/services");
  const id = text(formData, "id");
  const parsed = serviceSchema.safeParse({
    title: text(formData, "title"),
    slug: slugify(text(formData, "slug") || text(formData, "title")),
    shortDescription: text(formData, "shortDescription"),
    fullDescription: text(formData, "fullDescription"),
    icon: text(formData, "icon") || "sparkles",
    coverImage: text(formData, "coverImage"),
    idealClient: text(formData, "idealClient"),
    deliverables: text(formData, "deliverables"),
    outcomes: text(formData, "outcomes"),
    ctaLabel: text(formData, "ctaLabel") || "Start a Project",
    ctaUrl: text(formData, "ctaUrl") || "/contact",
    seoTitle: text(formData, "seoTitle"),
    seoDescription: text(formData, "seoDescription"),
    published: bool(formData, "published"),
    sortOrder: num(formData, "sortOrder"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Check the service form.");
  }
  const data = parsed.data;
  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }
  refresh(["/services", "/admin/services", "/"]);
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireUser("/admin/services");
  await prisma.service.delete({ where: { id } });
  refresh(["/services", "/admin/services", "/"]);
}

export async function reorderService(id: string, direction: "up" | "down") {
  await requireUser("/admin/services");
  const current = await prisma.service.findUnique({ where: { id } });
  if (!current) return;
  const swap = await prisma.service.findFirst({
    where: direction === "up" ? { sortOrder: { lt: current.sortOrder } } : { sortOrder: { gt: current.sortOrder } },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });
  if (!swap) return;
  await prisma.$transaction([
    prisma.service.update({ where: { id: current.id }, data: { sortOrder: swap.sortOrder } }),
    prisma.service.update({ where: { id: swap.id }, data: { sortOrder: current.sortOrder } }),
  ]);
  refresh(["/services", "/admin/services"]);
}

export async function saveProject(formData: FormData) {
  await requireUser("/admin/projects");
  const id = text(formData, "id");
  const parsed = projectSchema.safeParse({
    title: text(formData, "title"),
    slug: slugify(text(formData, "slug") || text(formData, "title")),
    industry: text(formData, "industry"),
    projectType: text(formData, "projectType"),
    status: text(formData, "status"),
    services: text(formData, "services"),
    summary: text(formData, "summary"),
    coverImage: text(formData, "coverImage"),
    problem: text(formData, "problem"),
    solution: text(formData, "solution"),
    results: text(formData, "results"),
    testimonial: text(formData, "testimonial"),
    projectUrl: text(formData, "projectUrl"),
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    seoTitle: text(formData, "seoTitle"),
    seoDescription: text(formData, "seoDescription"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Check the project form.");
  }
  const data = {
    ...parsed.data,
    services: parsed.data.services.split(",").map((item) => item.trim()).filter(Boolean),
    coverImage: parsed.data.coverImage || null,
    testimonial: parsed.data.testimonial || null,
    projectUrl: parsed.data.projectUrl || null,
    seoTitle: parsed.data.seoTitle || null,
    seoDescription: parsed.data.seoDescription || null,
  };
  const project = id
    ? await prisma.project.update({ where: { id }, data })
    : await prisma.project.create({ data });

  const gallery = text(formData, "gallery");
  if (gallery) {
    const urls = gallery.split("\n").map((item) => item.trim()).filter(Boolean);
    await prisma.projectImage.deleteMany({ where: { projectId: project.id } });
    await prisma.projectImage.createMany({
      data: urls.map((url, index) => ({ projectId: project.id, url, sortOrder: index })),
    });
  }

  refresh(["/work", "/admin/projects", "/"]);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireUser("/admin/projects");
  await prisma.project.delete({ where: { id } });
  refresh(["/work", "/admin/projects", "/"]);
}

export async function savePost(formData: FormData) {
  const user = await requireUser("/admin/posts");
  const id = text(formData, "id");
  const parsed = postSchema.safeParse({
    title: text(formData, "title"),
    slug: slugify(text(formData, "slug") || text(formData, "title")),
    excerpt: text(formData, "excerpt"),
    content: formData.get("content") || "",
    featuredImage: text(formData, "featuredImage"),
    status: text(formData, "status"),
    categoryId: text(formData, "categoryId"),
    tags: text(formData, "tags"),
    seoTitle: text(formData, "seoTitle"),
    seoDescription: text(formData, "seoDescription"),
    featured: bool(formData, "featured"),
    publishedAt: text(formData, "publishedAt"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Check the post form.");
  }

  let categoryId = parsed.data.categoryId || null;
  const categoryName = text(formData, "categoryName");
  if (categoryName) {
    const category = await prisma.category.upsert({
      where: { slug: slugify(categoryName) },
      update: { name: categoryName },
      create: { name: categoryName, slug: slugify(categoryName) },
    });
    categoryId = category.id;
  }

  const data = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content: sanitizeRichText(parsed.data.content),
    featuredImage: parsed.data.featuredImage || null,
    status: parsed.data.status,
    featured: parsed.data.featured,
    seoTitle: parsed.data.seoTitle || null,
    seoDescription: parsed.data.seoDescription || null,
    categoryId,
    authorId: user.id,
    publishedAt:
      parsed.data.status === "PUBLISHED"
        ? parsed.data.publishedAt
          ? new Date(parsed.data.publishedAt)
          : new Date()
        : null,
  };

  const post = id
    ? await prisma.post.update({ where: { id }, data })
    : await prisma.post.create({ data });

  await prisma.postTag.deleteMany({ where: { postId: post.id } });
  const tagNames = (parsed.data.tags || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { slug: slugify(name) },
      update: { name },
      create: { name, slug: slugify(name) },
    });
    await prisma.postTag.create({ data: { postId: post.id, tagId: tag.id } });
  }

  refresh(["/blog", "/admin/posts"]);
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireUser("/admin/posts");
  await prisma.post.delete({ where: { id } });
  refresh(["/blog", "/admin/posts"]);
}

export async function duplicatePost(id: string) {
  await requireUser("/admin/posts");
  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: true },
  });
  if (!post) return;
  const copy = await prisma.post.create({
    data: {
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy-${Date.now()}`,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      status: "DRAFT",
      authorId: post.authorId,
      categoryId: post.categoryId,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
    },
  });
  if (post.tags.length) {
    await prisma.postTag.createMany({
      data: post.tags.map((item) => ({ postId: copy.id, tagId: item.tagId })),
    });
  }
  refresh(["/admin/posts"]);
  redirect(`/admin/posts/${copy.id}`);
}

export async function saveTestimonial(formData: FormData) {
  await requireUser("/admin/testimonials");
  const id = text(formData, "id");
  const parsed = testimonialSchema.safeParse({
    clientName: text(formData, "clientName"),
    company: text(formData, "company"),
    role: text(formData, "role"),
    quote: text(formData, "quote"),
    clientImage: text(formData, "clientImage"),
    companyLogo: text(formData, "companyLogo"),
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    sortOrder: num(formData, "sortOrder"),
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);
  const data = {
    ...parsed.data,
    clientImage: parsed.data.clientImage || null,
    companyLogo: parsed.data.companyLogo || null,
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  refresh(["/", "/admin/testimonials"]);
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireUser("/admin/testimonials");
  await prisma.testimonial.delete({ where: { id } });
  refresh(["/", "/admin/testimonials"]);
}

export async function saveFaq(formData: FormData) {
  await requireUser("/admin/faqs");
  const id = text(formData, "id");
  const parsed = faqSchema.safeParse({
    question: text(formData, "question"),
    answer: text(formData, "answer"),
    category: text(formData, "category") || "General",
    published: bool(formData, "published"),
    sortOrder: num(formData, "sortOrder"),
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);
  if (id) await prisma.faq.update({ where: { id }, data: parsed.data });
  else await prisma.faq.create({ data: parsed.data });
  refresh(["/", "/admin/faqs"]);
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  await requireUser("/admin/faqs");
  await prisma.faq.delete({ where: { id } });
  refresh(["/", "/admin/faqs"]);
}

export async function reorderFaq(id: string, direction: "up" | "down") {
  await requireUser("/admin/faqs");
  const current = await prisma.faq.findUnique({ where: { id } });
  if (!current) return;
  const swap = await prisma.faq.findFirst({
    where: direction === "up" ? { sortOrder: { lt: current.sortOrder } } : { sortOrder: { gt: current.sortOrder } },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });
  if (!swap) return;
  await prisma.$transaction([
    prisma.faq.update({ where: { id: current.id }, data: { sortOrder: swap.sortOrder } }),
    prisma.faq.update({ where: { id: swap.id }, data: { sortOrder: current.sortOrder } }),
  ]);
  refresh(["/", "/admin/faqs"]);
}

export async function updateEnquiryStatus(id: string, status: "NEW" | "READ" | "CONTACTED" | "CLOSED") {
  await requireUser("/admin/enquiries");
  await prisma.enquiry.update({ where: { id }, data: { status } });
  refresh(["/admin/enquiries", "/admin"]);
}

export async function deleteEnquiry(id: string) {
  const user = await requireUser("/admin/enquiries");
  if (!canDeleteEnquiry(user)) {
    throw new Error("Only administrators can delete enquiries.");
  }
  await prisma.enquiry.delete({ where: { id } });
  refresh(["/admin/enquiries", "/admin"]);
}

export async function updateSettings(formData: FormData) {
  const user = await requireAdmin("/admin/settings");
  if (!canEditSettings(user)) return;
  const keys = [
    "businessName",
    "tagline",
    "email",
    "whatsapp",
    "phone",
    "location",
    "instagram",
    "facebook",
    "linkedin",
    "tiktok",
    "defaultSeoTitle",
    "defaultSeoDescription",
    "defaultOgImage",
    "footerText",
  ];
  for (const key of keys) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: text(formData, key) },
      create: { key, value: text(formData, key) },
    });
  }
  refresh(["/", "/admin/settings"]);
}

export async function updateMediaMeta(formData: FormData) {
  await requireUser("/admin/media");
  await prisma.media.update({
    where: { id: text(formData, "id") },
    data: {
      title: text(formData, "title"),
      altText: text(formData, "altText"),
    },
  });
  refresh(["/admin/media"]);
}

export async function deleteMedia(id: string) {
  await requireUser("/admin/media");
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return;
  await deleteStoredFile(media.fileUrl);
  await prisma.media.delete({ where: { id } });
  refresh(["/admin/media"]);
}

export async function saveUser(formData: FormData) {
  await requireAdmin("/admin/users");
  const id = text(formData, "id");
  const parsed = userSchema.safeParse({
    name: text(formData, "name"),
    email: text(formData, "email"),
    password: text(formData, "password"),
    role: text(formData, "role"),
    active: bool(formData, "active"),
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);

  if (id) {
    const current = await prisma.user.findUnique({ where: { id } });
    if (current?.role === "ADMIN" && (parsed.data.role !== "ADMIN" || !parsed.data.active)) {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN", active: true } });
      if (adminCount <= 1) {
        throw new Error("You cannot remove the last administrator.");
      }
    }
    await prisma.user.update({
      where: { id },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        role: parsed.data.role as Role,
        active: parsed.data.active,
        ...(parsed.data.password ? { password: await hashPassword(parsed.data.password) } : {}),
      },
    });
  } else {
    if (!parsed.data.password) throw new Error("Password is required for a new user.");
    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        role: parsed.data.role as Role,
        active: parsed.data.active,
        password: await hashPassword(parsed.data.password),
      },
    });
  }
  refresh(["/admin/users"]);
  redirect("/admin/users");
}
