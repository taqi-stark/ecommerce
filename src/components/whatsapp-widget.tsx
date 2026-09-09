import { useState } from "react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { FORMATTED_PHONE, STORE_NAME, WHATSAPP_NUMBER } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { X, Send } from "lucide-react";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { count } = useCart();

  const quickPrompts = [
    {
      label: "💼 I want a WhatsApp store for my brand",
      text: `Hello ${STORE_NAME}! I love this demo website and would like a custom WhatsApp e-commerce store built for my business. Can we discuss pricing and timeline?`,
    },
    {
      label: "🛍️ Test order on WhatsApp",
      text: `Hi ${STORE_NAME}! I'm testing your demo ordering flow. Please let me know how quick the checkout process is!`,
    },
    {
      label: "🚚 Shipping & Payment questions",
      text: `Hi ${STORE_NAME}! What payment methods and delivery timelines do you support for e-commerce orders?`,
    },
  ];

  const handleSend = (textToSend?: string) => {
    const finalMsg =
      textToSend ||
      message ||
      `Hello ${STORE_NAME}! I would like more information.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed right-6 z-40 flex flex-col items-end print:hidden transition-all duration-300 ${
        count > 0 ? "bottom-20" : "bottom-6"
      }`}
    >
      {/* Expanded Chat Card */}
      {isOpen && (
        <div className="mb-3 w-84 sm:w-96 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#128C7E] px-4 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative grid size-10 place-items-center rounded-full bg-white/20 text-white">
                  <WhatsAppIcon className="size-5" />
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-[#128C7E]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide">
                    {STORE_NAME} Support
                  </h3>
                  <p className="text-xs text-white/80">
                    Online · Typically replies in 5m
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-2 text-[11px] text-white/90">
              Direct Contact:{" "}
              <span className="font-mono font-medium">{FORMATTED_PHONE}</span>
            </div>
          </div>

          {/* Body */}
          <div className="bg-[#EFEAE2]/60 p-4 space-y-3 max-h-80 overflow-y-auto">
            <div className="rounded-xl bg-white p-3 shadow-xs text-xs text-foreground/90 space-y-1 max-w-[88%]">
              <p className="font-medium text-foreground">
                Welcome to {STORE_NAME}! 👋
              </p>
              <p>
                Experience seamless WhatsApp e-commerce. How can we assist you
                today? Tap a topic below or type your inquiry.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                Instant Inquiries:
              </p>
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(qp.text)}
                  className="block w-full text-left rounded-lg border border-border/70 bg-white/90 px-3 py-2 text-xs text-foreground hover:bg-white hover:border-[#25D366] transition shadow-2xs"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="border-t border-border bg-background p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-[#25D366]"
              />
              <button
                type="submit"
                className="grid size-8 place-items-center rounded-full bg-[#25D366] text-white transition hover:bg-[#128C7E]"
                aria-label="Send WhatsApp message"
              >
                <Send className="size-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#128C7E] focus:outline-hidden"
        aria-label="Open WhatsApp Chat"
      >
        <div className="relative">
          <WhatsAppIcon className="size-5" />
          <span className="absolute -top-1 -right-1 size-2 rounded-full bg-emerald-300 animate-ping" />
        </div>
        <span className="text-xs font-semibold tracking-wide">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}
