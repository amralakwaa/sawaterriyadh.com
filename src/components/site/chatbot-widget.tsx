"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, Phone } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "ما هي أسعار مظلات السيارات؟",
  "كم مدة التركيب؟",
  "هل تقدمون ضمان؟",
  "ما هي مناطق الخدمة؟",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "مرحباً بك في شركة الظلال الملكية! 👋\n\nأنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن الأسعار، الخدمات، الضمان، أو أي استفسار آخر.",
};

interface ChatbotWidgetProps {
  controlledOpen?: boolean;
  onControlledClose?: () => void;
}

export function ChatbotWidget({ controlledOpen, onControlledClose }: ChatbotWidgetProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Controlled mode (from mobile bottom bar)
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const close = () => {
    if (isControlled) {
      onControlledClose?.();
    } else {
      setInternalOpen(false);
    }
  };

  // Show hint after 15 seconds (only in uncontrolled mode)
  useEffect(() => {
    if (isControlled || open) return;
    const t = setTimeout(() => setShowHint(true), 15000);
    return () => clearTimeout(t);
  }, [open, isControlled]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
    }
  }, [open, messages]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || busy) return;

    const userMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setBusy(true);

    try {
      const history = messages.slice(1); // exclude welcome message
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      const aiMsg: Message = {
        role: "assistant",
        content: data.response || "عذراً، لم أتمكن من الرد. يرجى المحاولة مرة أخرى.",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "عذراً، حدث خطأ. يرجى الاتصال بنا على 0534926846.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
  };

  return (
    <>
      {/* Floating button (only in uncontrolled mode) */}
      {!open && !isControlled && (
        <div className="hidden sm:flex fixed bottom-5 right-5 z-50 flex-col items-end gap-2">
          {showHint && (
            <div className="animate-fade-up rounded-2xl bg-card border border-border shadow-xl p-3 max-w-[220px] relative">
              <button
                onClick={() => setShowHint(false)}
                className="absolute top-1.5 left-1.5 text-muted-foreground hover:text-foreground"
                aria-label="إغلاق"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <p className="text-xs font-bold text-foreground mb-1 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                مساعد ذكي
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                لديك سؤال؟ اسألني عن الأسعار والخدمات!
              </p>
            </div>
          )}
          <button
            onClick={() => {
              setInternalOpen(true);
              setShowHint(false);
            }}
            className="group relative flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-4 pr-2 py-2 shadow-xl hover:scale-105 transition-transform"
            aria-label="المساعد الذكي"
          >
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 group-hover:opacity-0" />
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-bold hidden sm:inline">مساعد ذكي</span>
          </button>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-50 sm:w-[380px] sm:h-[600px] sm:max-h-[80vh] flex flex-col bg-card sm:rounded-3xl rounded-none shadow-2xl border border-border overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-primary" />
              </div>
              <div>
                <p className="font-bold text-sm">المساعد الذكي</p>
                <p className="text-xs opacity-90">يرد عادةً خلال ثواني</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={reset}
                className="rounded-lg p-1.5 hover:bg-background/20 transition-colors text-xs font-bold"
                aria-label="محادثة جديدة"
                title="محادثة جديدة"
              >
                جديد
              </button>
              <button
                onClick={close}
                className="rounded-lg p-1.5 hover:bg-background/20 transition-colors"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-bl-sm"
                      : "bg-card border border-border rounded-br-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {busy && (
              <div className="flex justify-end">
                <div className="bg-card border border-border rounded-2xl rounded-br-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions (only on first message) */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 shrink-0">
              <p className="text-xs text-muted-foreground mb-2">أسئلة مقترحة:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => send(q)}
                    disabled={busy}
                    className="rounded-full bg-secondary border border-border px-3 py-1.5 text-xs font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick CTA (after 2+ messages) */}
          {messages.length >= 3 && (
            <div className="px-4 pb-2 shrink-0">
              <Link
                href="/quote"
                onClick={close}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-accent text-accent-foreground px-3 py-2 text-xs font-bold hover:brightness-110 transition"
              >
                <Phone className="h-3.5 w-3.5" />
                اطلب تسعير مجاني الآن
              </Link>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border bg-card shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="اكتب رسالتك..."
                disabled={busy}
                className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50"
              />
              <button
                onClick={() => send()}
                disabled={busy || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label="إرسال"
              >
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-1.5">
              مدعوم بالذكاء الاصطناعي • للطوارئ اتصل 0534926846
            </p>
          </div>
        </div>
      )}
    </>
  );
}
