import { db } from "../src/lib/db";
import {
  SITE,
  SERVICES,
  AREAS,
  PROJECTS,
  BLOG_POSTS,
  TESTIMONIALS,
  FEATURES,
  STATS,
  PROCESS_STEPS,
  FAQS,
} from "../src/lib/content";

async function main() {
  console.log("🌱 Seeding database...");

  await db.testimonial.deleteMany();
  await db.processStep.deleteMany();
  await db.stat.deleteMany();
  await db.feature.deleteMany();
  await db.fAQ.deleteMany();
  await db.blogPost.deleteMany();
  await db.project.deleteMany();
  await db.serviceArea.deleteMany();
  await db.quoteRequest.deleteMany();
  await db.contactMessage.deleteMany();
  await db.service.deleteMany();
  await db.siteSetting.deleteMany();

  const serviceMap: Record<string, string> = {};
  for (const s of SERVICES) {
    const created = await db.service.create({
      data: {
        slug: s.slug,
        title: s.title,
        shortDesc: s.shortDesc,
        description: s.description,
        icon: s.icon,
        image: s.image,
        features: JSON.stringify(s.features),
        priceFrom: s.priceFrom,
        featured: s.featured,
        order: s.order,
      },
    });
    serviceMap[s.slug] = created.id;
    console.log(`  ✓ Service: ${s.title}`);
  }

  for (const a of AREAS) {
    await db.serviceArea.create({
      data: {
        slug: a.slug,
        name: a.name,
        governorate: a.governorate,
        description: a.description,
        featured: a.featured,
      },
    });
  }
  console.log(`  ✓ ${AREAS.length} areas`);

  for (const p of PROJECTS) {
    await db.project.create({
      data: {
        slug: p.slug,
        title: p.title,
        description: p.description,
        image: p.image,
        gallery: JSON.stringify(p.gallery),
        location: p.location,
        area: p.area,
        serviceId: serviceMap[p.serviceSlug],
        completedAt: p.completedAt,
      },
    });
  }
  console.log(`  ✓ ${PROJECTS.length} projects`);

  for (const b of BLOG_POSTS) {
    await db.blogPost.create({
      data: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        image: b.image,
        tags: JSON.stringify(b.tags),
        serviceId: b.serviceSlug ? serviceMap[b.serviceSlug] : null,
        author: b.author,
        published: true,
      },
    });
  }
  console.log(`  ✓ ${BLOG_POSTS.length} blog posts`);

  for (const t of TESTIMONIALS) {
    await db.testimonial.create({
      data: {
        name: t.name,
        role: t.role,
        content: t.content,
        rating: t.rating,
        area: t.area,
        active: true,
      },
    });
  }
  console.log(`  ✓ ${TESTIMONIALS.length} testimonials`);

  for (const f of FEATURES) {
    await db.feature.create({
      data: { icon: f.icon, title: f.title, description: f.description },
    });
  }

  for (const s of STATS) {
    await db.stat.create({
      data: { icon: s.icon, label: s.label, value: s.value },
    });
  }

  for (const [i, p] of PROCESS_STEPS.entries()) {
    await db.processStep.create({
      data: { icon: p.icon, title: p.title, description: p.description, order: i },
    });
  }

  for (const f of FAQS) {
    await db.fAQ.create({
      data: {
        question: f.question,
        answer: f.answer,
        serviceId: f.serviceSlug ? serviceMap[f.serviceSlug] : null,
      },
    });
  }
  console.log(`  ✓ ${FAQS.length} FAQs`);

  const settings: Record<string, string> = {
    siteName: SITE.name,
    phone: SITE.phone,
    whatsapp: SITE.whatsapp,
    email: SITE.email,
    address: SITE.address,
    addressFull: SITE.addressFull,
    city: SITE.city,
    lat: SITE.lat,
    lng: SITE.lng,
    workingHours: SITE.workingHours,
    workingHoursFriday: SITE.workingHoursFriday,
    yearsExperience: SITE.yearsExperience,
  };
  for (const [k, v] of Object.entries(settings)) {
    await db.siteSetting.create({ data: { key: k, value: v } });
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
