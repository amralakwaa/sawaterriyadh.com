import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;
    const valid = ["new", "read", "replied"];
    if (!valid.includes(status)) {
      return NextResponse.json({ error: "حالة غير صالحة" }, { status: 400 });
    }
    const updated = await db.contactMessage.update({ where: { id }, data: { status } });
    return NextResponse.json({ success: true, item: updated });
  } catch (e) {
    console.error("Update message error:", e);
    return NextResponse.json({ error: "فشل التحديث" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete message error:", e);
    return NextResponse.json({ error: "فشل الحذف" }, { status: 500 });
  }
}
