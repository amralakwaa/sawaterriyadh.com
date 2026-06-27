import { NextRequest, NextResponse } from "next/server";
import { getSettings, getServices } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({
        success: true,
        response: "مرحباً! كيف يمكنني مساعدتك؟ يمكنني الإجابة عن أسئلتك حول خدمات المظلات والسواتر والحدادة في الرياض.",
        fallback: true,
      });
    }

    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "الرسالة مطلوبة" }, { status: 400 });
    }

    // Limit message length
    if (message.length > 500) {
      return NextResponse.json({ error: "الرسالة طويلة جداً (الحد 500 حرف)" }, { status: 400 });
    }

    const [settings, services] = await Promise.all([getSettings(), getServices()]);

    const servicesList = services
      .map((s) => `- ${s.title}: ${s.shortDesc} (السعر يبدأ من ${s.priceFrom})`)
      .join("\n");

    const systemPrompt = `أنت مساعد ذكي لشركة "${settings.name}"، الشركة الرائدة في المظلات والسواتر وأعمال الحدادة في الرياض.

معلومات الشركة:
- الاسم: ${settings.name}
- الهاتف: ${settings.phoneDisplay}
- واتساب: ${settings.whatsapp}
- البريد: ${settings.email}
- العنوان: ${settings.addressFull}
- ساعات العمل: ${settings.workingHours}
- خبرة: ${settings.yearsExperience}+ سنة
- المشاريع المنجزة: +3500

الخدمات التي نقدمها:
${servicesList}

قواعد الرد:
1. أجب بإيجاز ووضوح (لا تتجاوز 3-4 جمل)
2. استخدم اللغة العربية الفصحى المبسطة
3. كن ودوداً ومحترفاً
4. إذا كان السؤال عن الأسعار، أعطِ نطاقاً تقريبياً وادعُ العميل لطلب تسعير مجاني
5. إذا كان السؤال عن شيء خارج نطاق خدماتنا، وجّه العميل للتحدث مع فريق المبيعات
6. ادعُ العميل دائماً لطلب تسعير مجاني أو الاتصال بنا على ${settings.phoneDisplay}
7. لا تختلق معلومات غير موجودة - إذا لم تعرف، قل "سيتواصل معك فريقنا بالتفاصيل"

تذكر: هدفك مساعدة العميل وتشجيعه على طلب تسعير مجاني أو التواصل معنا.`;

    // Dynamically import to avoid issues
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    // Build messages: system + history (last 6) + current message
    const messages = [
      { role: "assistant", content: systemPrompt },
      ...history.slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role === "user" ? "user" : "assistant",
        content: h.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await zai.chat.completions.create({
      messages: messages as any,
      thinking: { type: "disabled" },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("لم يتم استلام رد من المساعد");
    }

    return NextResponse.json({
      success: true,
      response: response.trim(),
    });
  } catch (e: any) {
    console.error("Chat API error:", e);
    // Fallback response
    return NextResponse.json({
      success: true,
      response:
        "عذراً، حدث خطأ مؤقت. يرجى الاتصال بنا على 0501234567 أو طلب تسعير مجاني وسيتواصل معك فريقنا قريباً.",
      fallback: true,
    });
  }
}
