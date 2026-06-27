import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.project.findMany({ orderBy: { createdAt: "desc" }, include: { service: true } });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, description, image, gallery, location, area, serviceId, completedAt } = body;
    if (!title || !slug) {
      return NextResponse.json({ error: "العنوان والـ slug مطلوبان" }, { status: 400 });
    }
    const item = await db.project.create({
      data: {
        title,
        slug,
        description: description || "",
        image: image || "",
        gallery: JSON.stringify(gallery || []),
        location: location || "",
        area: area || null,
        serviceId: serviceId || null,
        completedAt: completedAt || null,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (e) {
    console.error("Create project error:", e);
    return NextResponse.json({ error: "فشل الإنشاء" }, { status: 500 });
  }
}
