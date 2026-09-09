import { useState } from "react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { FORMATTED_PHONE, WHATSAPP_NUMBER } from "@/lib/products";
import { Sparkles, X, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Demo announcement" className="relative z-40 bg-foreground text-background px-4 py-2.5 text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="inline-flex items-center gap-1 rounded-full bg-whatsapp/25 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
            <Sparkles className="size-3 text-emerald-400" />
            Live Client Demo
          </span>
          <p className="truncate text-background/90">
            <span className="font-semibold">WhatsApp Commerce Experience:</span> Test
            1-click orders &amp; real-time bag checkout directly to WhatsApp (
            <span className="font-mono text-emerald-300">{FORMATTED_PHONE}</span>)
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello! I am viewing your StyleConnect WhatsApp E-Commerce Store demo and would like more details.",
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-1 text-[11px] font-medium text-whatsapp-foreground transition hover:opacity-90"
          >
            <WhatsAppIcon className="size-3" />
            <span>Test WhatsApp</span>
            <ArrowUpRight className="size-3 opacity-70" />
          </a>
          <Link
            to="/how-it-works"
            className="hidden text-[11px] text-background/75 underline underline-offset-2 hover:text-background sm:inline"
          >
            How it works
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="rounded p-1 text-background/60 hover:text-background"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
