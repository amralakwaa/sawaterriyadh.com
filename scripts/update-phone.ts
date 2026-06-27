import { db } from "../src/lib/db";

async function main() {
  const updates = {
    phone: "0534926846",
    whatsapp: "966534926846",
  };
  for (const [key, value] of Object.entries(updates)) {
    try {
      const existing = await db.siteSetting.findUnique({ where: { key } });
      if (existing) {
        await db.siteSetting.update({ where: { key }, data: { value } });
        console.log(`  ✓ Updated ${key} = ${value}`);
      } else {
        await db.siteSetting.create({ data: { key, value } });
        console.log(`  ✓ Created ${key} = ${value}`);
      }
    } catch (e) {
      console.error(`  ✗ Failed ${key}:`, e);
    }
  }
  console.log("Done!");
}

main().catch(console.error).finally(() => db.$disconnect());
