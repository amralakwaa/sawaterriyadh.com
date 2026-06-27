import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, image, tags, serviceId, author } = body;
    if (!title || !slug || !content) {
      return NextResponse.json({ error: "العنوان والـ slug والمحتوى مطلوبة" }, { status: 400 });
    }
    const item = await db.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || "",
        content,
        image: image || "",
        tags: JSON.stringify(tags || []),
        serviceId: serviceId || null,
        author: author || "فريق التحرير",
        published: true,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (e) {
    console.error("Create blog error:", e);
    return NextResponse.json({ error: "فشل الإنشاء" }, { status: 500 });
  }
}
