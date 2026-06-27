import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Create or get all
export async function GET() {
  const items = await db.service.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, shortDesc, description, icon, image, features, priceFrom, featured, order } = body;
    if (!title || !slug) {
      return NextResponse.json({ error: "العنوان والـ slug مطلوبان" }, { status: 400 });
    }
    const item = await db.service.create({
      data: {
        title,
        slug,
        shortDesc: shortDesc || "",
        description: description || "",
        icon: icon || "shield",
        image: image || "",
        features: JSON.stringify(features || []),
        priceFrom: priceFrom || null,
        featured: featured || false,
        order: order || 0,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (e) {
    console.error("Create service error:", e);
    return NextResponse.json({ error: "فشل الإنشاء" }, { status: 500 });
  }
}
