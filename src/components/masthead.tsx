import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { STORE_NAME, FORMATTED_PHONE, WHATSAPP_NUMBER } from "@/lib/products";
import { WhatsAppIcon } from "./whatsapp-icon";
import { ShoppingBag } from "lucide-react";

export function Masthead() {
  const { count, open } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-foreground transition group-hover:opacity-80">
            {STORE_NAME}
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.25em] text-clay sm:inline">
            Studio
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-7 text-xs font-medium uppercase tracking-wider text-foreground/80 sm:flex">
          <Link to="/" className="transition hover:text-foreground">
            Featured
          </Link>
          <Link to="/collection" className="transition hover:text-foreground">
            Collection
          </Link>
          <Link to="/how-it-works" className="transition hover:text-foreground">
            How It Works
          </Link>
        </nav>

        {/* Actions: Direct WhatsApp Contact + Bag */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello! I am viewing the StyleConnect store demo and would like to ask a question.",
            )}`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-whatsapp/40 bg-whatsapp/10 px-3.5 py-1.5 text-xs font-medium text-whatsapp transition hover:bg-whatsapp hover:text-white md:inline-flex"
            title="Chat directly on WhatsApp"
          >
            <WhatsAppIcon className="size-3.5" />
            <span>{FORMATTED_PHONE}</span>
          </a>

          <button
            type="button"
            onClick={open}
            className="flex items-center gap-2 rounded-full border border-input px-3.5 py-1.5 text-xs tracking-wide transition hover:border-foreground"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="size-3.5 text-foreground" />
            <span className="hidden sm:inline">Bag</span>
            <span className="inline-grid size-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
