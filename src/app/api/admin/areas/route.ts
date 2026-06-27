import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, governorate, description, featured } = body;
    if (!name || !slug) {
      return NextResponse.json({ error: "الاسم والـ slug مطلوبان" }, { status: 400 });
    }
    const item = await db.serviceArea.create({
      data: {
        name,
        slug,
        governorate: governorate || "الرياض",
        description: description || "",
        featured: featured || false,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "فشل الإنشاء" }, { status: 500 });
  }
}
