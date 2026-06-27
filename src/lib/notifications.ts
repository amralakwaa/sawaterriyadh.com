// WhatsApp notification helper
// Sends a WhatsApp notification to the company when a new quote/message is received.
// Uses the WhatsApp click-to-chat API (wa.me) as a fallback - generates a pre-filled link
// that the admin can click. In production, this can be upgraded to the WhatsApp Business API.

import { getSettings } from "./data";

export interface NotificationData {
  type: "quote" | "contact" | "callback";
  name: string;
  phone: string;
  email?: string | null;
  service?: string;
  area?: string;
  message: string;
  budget?: string;
}

function formatMessage(data: NotificationData): string {
  const typeLabel =
    data.type === "quote" ? "طلب تسعير جديد" :
    data.type === "callback" ? "طلب اتصال فوري" :
    "رسالة تواصل جديدة";

  let msg = `🔔 *${typeLabel}*\n\n`;
  msg += `👤 الاسم: ${data.name}\n`;
  msg += `📞 الجوال: ${data.phone}\n`;
  if (data.email) msg += `📧 البريد: ${data.email}\n`;
  if (data.service) msg += `🛠️ الخدمة: ${data.service}\n`;
  if (data.area) msg += `📍 المنطقة: ${data.area}\n`;
  if (data.budget) msg += `💰 الميزانية: ${data.budget}\n`;
  msg += `\n📝 الرسالة:\n${data.message}\n`;
  msg += `\n⏰ الوقت: ${new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(new Date())}`;
  return msg;
}

export async function sendWhatsAppNotification(data: NotificationData): Promise<{
  success: boolean;
  link?: string;
  error?: string;
}> {
  try {
    const settings = await getSettings();
    const message = formatMessage(data);
    const encoded = encodeURIComponent(message);
    const link = `https://wa.me/${settings.whatsapp}?text=${encoded}`;

    // In production, this is where we'd call the WhatsApp Business API:
    // await fetch("https://api.whatsapp.com/v1/messages", { ... })
    //
    // For now, we log the notification and return the pre-filled link
    // so the admin can click to send instantly.

    console.log(`[WhatsApp Notification] New ${data.type} from ${data.name} (${data.phone})`);
    console.log(`Pre-filled link: ${link.substring(0, 100)}...`);

    return { success: true, link };
  } catch (e) {
    console.error("WhatsApp notification error:", e);
    return { success: false, error: String(e) };
  }
}
