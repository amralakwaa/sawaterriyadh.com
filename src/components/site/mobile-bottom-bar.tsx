"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, Sparkles, PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  onOpenChatbot: () => void;
  onOpenCallback: () => void;
}

export function MobileBottomBar({ onOpenChatbot, onOpenCallback }: Props) {
  const [settings, setSettings] = useState({ phone: "0534926846", whatsapp: "966534926846" });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d))
      .catch(() => {});
  }, []);

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl">
      {/* Safe area padding for iOS */}
      <div className="pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4 h-16">
          {/* Call */}
          <a
            href={`tel:${settings.phone}`}
            className="flex flex-col items-center justify-center gap-0.5 text-primary active:bg-primary/10 transition-colors"
            aria-label="اتصل بنا"
          >
            <Phone className="h-5 w-5" />
            <span className="text-[10px] font-bold">اتصل</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("مرحباً، أرغب في الاستفسار عن خدماتكم")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 text-[#25D366] active:bg-[#25D366]/10 transition-colors"
            aria-label="واتساب"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-[10px] font-bold">واتساب</span>
          </a>

          {/* Chatbot */}
          <button
            onClick={onOpenChatbot}
            className="flex flex-col items-center justify-center gap-0.5 text-accent active:bg-accent/10 transition-colors"
            aria-label="المساعد الذكي"
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-[10px] font-bold">مساعد</span>
          </button>

          {/* Callback */}
          <button
            onClick={onOpenCallback}
            className="flex flex-col items-center justify-center gap-0.5 text-foreground active:bg-secondary transition-colors"
            aria-label="طلب اتصال"
          >
            <PhoneCall className="h-5 w-5" />
            <span className="text-[10px] font-bold">اتصل بي</span>
          </button>
        </div>
      </div>
    </div>
  );
}
