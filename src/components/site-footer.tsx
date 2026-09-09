import { Link } from "@tanstack/react-router";
import { STORE_NAME, FORMATTED_PHONE, WHATSAPP_NUMBER } from "@/lib/products";
import { WhatsAppIcon } from "./whatsapp-icon";
import { ShieldCheck, Truck, RefreshCw, MessageSquare } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      {/* Trust Badges */}
      <div className="border-b border-background/10 py-8 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="size-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-semibold">1-Click WhatsApp</p>
              <p className="text-[11px] text-background/60">Instant direct ordering</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="size-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-semibold">Free Express Shipping</p>
              <p className="text-[11px] text-background/60">Nationwide 2-4 days</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-semibold">Cash on Delivery</p>
              <p className="text-[11px] text-background/60">Pay when you receive</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="size-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-semibold">Easy Size Exchanges</p>
              <p className="text-[11px] text-background/60">14-day hassle-free policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display text-3xl tracking-tight">
              {STORE_NAME}
            </span>
            <p className="max-w-sm text-xs text-background/70 leading-relaxed">
              A bespoke WhatsApp-first boutique demo showcasing how modern e-commerce
              brands boost sales, reduce abandoned carts, and establish direct VIP
              relationships with shoppers.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hello ${STORE_NAME}! I would like to get a WhatsApp store like this for my e-commerce business.`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#128C7E]"
              >
                <WhatsAppIcon className="size-4" />
                <span>Contact via WhatsApp: {FORMATTED_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-background/90">
              Explore Store
            </p>
            <ul className="space-y-2 text-xs text-background/70">
              <li>
                <Link to="/" className="hover:text-background transition">
                  Home &amp; Featured Pieces
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-background transition">
                  Full Collection
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-background transition">
                  How WhatsApp Ordering Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Demo Note */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-background/90">
              For E-Commerce Clients
            </p>
            <p className="text-xs text-background/70 leading-relaxed">
              Want this exact WhatsApp ordering engine integrated into your fashion brand,
              lifestyle shop, or product catalog? We configure custom catalogs, auto-formatting,
              and your business phone number within 24 hours.
            </p>
            <p className="text-xs font-mono text-emerald-300">
              WhatsApp: {FORMATTED_PHONE}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 text-[11px] text-background/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {STORE_NAME}. WhatsApp Commerce Demo.</p>
          <p>Designed for higher conversion &amp; effortless mobile ordering.</p>
        </div>
      </div>
    </footer>
  );
}
