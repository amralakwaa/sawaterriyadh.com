import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, content, rating, area } = body;
    if (!name || !content) {
      return NextResponse.json({ error: "الاسم والمحتوى مطلوبان" }, { status: 400 });
    }
    const item = await db.testimonial.create({
      data: {
        name,
        role: role || "",
        content,
        rating: rating || 5,
        area: area || null,
        active: true,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "فشل الإنشاء" }, { status: 500 });
  }
}
