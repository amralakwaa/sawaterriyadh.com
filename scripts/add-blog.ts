import { db } from "../src/lib/db";
import { BLOG_POSTS } from "../src/lib/content";

async function main() {
  const newSlugs = ["mawllat-masabih-riyadh", "hadada-abwab-riyadh", "mawllat-siyarat-shita", "sawatir-aswaq-riyadh"];
  const services = await db.service.findMany();
  const svcMap: Record<string, string> = {};
  services.forEach((s) => { svcMap[s.slug] = s.id; });

  for (const slug of newSlugs) {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) continue;
    const existing = await db.blogPost.findUnique({ where: { slug } });
    if (existing) {
      console.log(`  - ${slug} already exists`);
      continue;
    }
    await db.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        tags: JSON.stringify(post.tags),
        serviceId: post.serviceSlug ? svcMap[post.serviceSlug] : null,
        author: post.author,
        published: true,
      },
    });
    console.log(`  ✓ Added: ${post.title}`);
  }
  console.log("Done!");
}

main().catch(console.error).finally(() => db.$disconnect());
