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

    const validStatuses = ["new", "contacted", "quoted", "won", "lost"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "حالة غير صالحة" }, { status: 400 });
    }

    const updated = await db.quoteRequest.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, item: updated });
  } catch (e) {
    console.error("Update quote error:", e);
    return NextResponse.json({ error: "فشل التحديث" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.quoteRequest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete quote error:", e);
    return NextResponse.json({ error: "فشل الحذف" }, { status: 500 });
  }
}
