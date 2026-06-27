"use client";

import { useState } from "react";
import { FloatingActions } from "./floating-actions";
import { CallbackWidget } from "./callback-widget";
import { ChatbotWidget } from "./chatbot-widget";
import { MobileBottomBar } from "./mobile-bottom-bar";

export function FloatingWidgets() {
  // Shared state to control chatbot and callback from the mobile bottom bar
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      {/* Desktop floating actions (self-hides on mobile via hidden sm:flex) */}
      <FloatingActions />
      <CallbackWidget />
      <ChatbotWidget />

      {/* Mobile bottom bar (hidden on desktop via sm:hidden) */}
      <MobileBottomBar
        onOpenChatbot={() => setChatbotOpen(true)}
        onOpenCallback={() => setCallbackOpen(true)}
      />

      {/* Mobile chatbot (controlled mode, shows modal only on mobile) */}
      <div className="sm:hidden">
        <ChatbotWidget
          controlledOpen={chatbotOpen}
          onControlledClose={() => setChatbotOpen(false)}
        />
      </div>

      {/* Mobile callback (controlled mode, shows modal only on mobile) */}
      <div className="sm:hidden">
        <CallbackWidget
          controlledOpen={callbackOpen}
          onControlledClose={() => setCallbackOpen(false)}
        />
      </div>
    </>
  );
}
