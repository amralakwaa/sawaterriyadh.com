import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "الحقول المطلوبة: الاسم، الهاتف، الرسالة" },
        { status: 400 }
      );
    }

    const record = await db.contactMessage.create({
      data: {
        name: String(name).slice(0, 200),
        phone: String(phone).slice(0, 30),
        email: email ? String(email).slice(0, 200) : null,
        subject: subject ? String(subject).slice(0, 300) : null,
        message: String(message).slice(0, 5000),
      },
    });

    return NextResponse.json({ success: true, id: record.id });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const items = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
