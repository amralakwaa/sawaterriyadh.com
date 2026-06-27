import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendWhatsAppNotification } from "@/lib/notifications";

function generateTicketId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `TK-${num}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message, category } = body;

    if (!name || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "الحقول المطلوبة: الاسم، الهاتف، الموضوع، الرسالة" },
        { status: 400 }
      );
    }

    // Generate unique ticket ID
    let ticketId = generateTicketId();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await db.supportTicket.findUnique({ where: { ticketId } }).catch(() => null);
      if (!existing) break;
      ticketId = generateTicketId();
      attempts++;
    }

    const record = await db.supportTicket.create({
      data: {
        ticketId,
        name: String(name).slice(0, 200),
        phone: String(phone).slice(0, 30),
        email: email ? String(email).slice(0, 200) : null,
        subject: String(subject).slice(0, 300),
        message: String(message).slice(0, 5000),
        category: category || "general",
      },
    });

    // Send WhatsApp notification
    sendWhatsAppNotification({
      type: "contact",
      name: String(name),
      phone: String(phone),
      email: email || null,
      message: `تذكرة دعم ${ticketId}: ${subject}. ${message}`,
    }).catch((e) => console.error("Notification error:", e));

    return NextResponse.json({ success: true, ticketId: record.ticketId, id: record.id });
  } catch (e) {
    console.error("Ticket API error:", e);
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const items = await db.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
