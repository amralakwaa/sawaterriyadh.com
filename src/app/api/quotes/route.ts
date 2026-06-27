import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendWhatsAppNotification } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, serviceId, area, message, budget } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "الحقول المطلوبة: الاسم، الهاتف، الرسالة" },
        { status: 400 }
      );
    }

    // Resolve service slug -> id and get service title
    let svcId: string | undefined;
    let svcTitle: string | undefined;
    if (serviceId) {
      try {
        const svc = await db.service.findUnique({ where: { slug: serviceId } });
        svcId = svc?.id;
        svcTitle = svc?.title;
      } catch {
        svcId = undefined;
      }
    }

    const record = await db.quoteRequest.create({
      data: {
        name: String(name).slice(0, 200),
        phone: String(phone).slice(0, 30),
        email: email ? String(email).slice(0, 200) : null,
        serviceId: svcId,
        area: area || null,
        message: String(message).slice(0, 5000),
        budget: budget || null,
      },
    });

    // Send WhatsApp notification (non-blocking, fire and forget)
    sendWhatsAppNotification({
      type: message.includes("طلب اتصال فوري") ? "callback" : "quote",
      name: String(name),
      phone: String(phone),
      email: email || null,
      service: svcTitle,
      area: area,
      message: String(message),
      budget: budget,
    }).catch((e) => console.error("Notification send error:", e));

    return NextResponse.json({ success: true, id: record.id });
  } catch (e) {
    console.error("Quote API error:", e);
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const items = await db.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: { service: true },
      take: 100,
    });
    return NextResponse.json({ items });
  } catch (e) {
    console.error("Quote GET error:", e);
    return NextResponse.json({ items: [] });
  }
}
