import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, priority, response } = body;

    const data: any = {};
    if (status) data.status = status;
    if (priority) data.priority = priority;
    if (response !== undefined) data.response = response;

    const updated = await db.supportTicket.update({ where: { id }, data });
    return NextResponse.json({ success: true, item: updated });
  } catch (e) {
    console.error("Update ticket error:", e);
    return NextResponse.json({ error: "فشل التحديث" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.supportTicket.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "فشل الحذف" }, { status: 500 });
  }
}
