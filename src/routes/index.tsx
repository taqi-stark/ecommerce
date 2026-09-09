import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import foldingImage from "@/assets/folding.jpg";
import { ProductCard } from "@/components/product-card";
import {
  products,
  categories,
  STORE_NAME,
  STORE_TAGLINE,
  FORMATTED_PHONE,
  WHATSAPP_NUMBER,
  type ProductCategory,
} from "@/lib/products";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import {
  Search,
  Zap,
  TrendingUp,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const title = `${STORE_NAME} — WhatsApp E-Commerce Store Demo`;
const description =
  "A high-converting demo e-commerce store with seamless WhatsApp ordering. Built for clothing brands & boutiques to maximize sales and eliminate cart abandonment.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Home,
});

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20">
          <div className="unfold lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-3.5 py-1.5 text-xs text-whatsapp">
              <Sparkles className="size-3.5" />
              <span className="font-semibold">WhatsApp Commerce Demo</span>
              <span className="text-foreground/40">|</span>
              <span className="font-mono">{FORMATTED_PHONE}</span>
            </div>

            <h1 className="font-display max-w-[17ch] text-5xl leading-[1.12] text-balance lg:text-6xl">
              Effortless elegance. Instant WhatsApp ordering.
            </h1>

            <p className="max-w-[42ch] text-base leading-relaxed text-foreground/75 text-pretty">
              A bespoke apparel edit where customers order directly into your
              WhatsApp in a single tap. Zero friction, zero cart abandonment,
              and 100% verified buyers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#collection-grid"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hello! I am viewing your StyleConnect WhatsApp E-Commerce demo and want to see how it works for my brand.",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-whatsapp bg-whatsapp/10 px-5 py-3.5 text-sm font-medium tracking-wide text-whatsapp transition hover:bg-whatsapp hover:text-white"
              >
                <WhatsAppIcon className="size-4" />
                <span>Test Live WhatsApp Order</span>
              </a>
            </div>

            {/* Quick Metrics Bar for Clients */}
            <div className="grid grid-cols-3 gap-4 border-t border-border/70 pt-6 text-left">
              <div>
                <p className="font-display text-2xl lg:text-3xl text-foreground font-semibold">3.2×</p>
                <p className="text-[11px] text-taupe leading-tight">Higher checkout conversion rate</p>
              </div>
              <div>
                <p className="font-display text-2xl lg:text-3xl text-foreground font-semibold">&lt; 30s</p>
                <p className="text-[11px] text-taupe leading-tight">Average 1-click order time</p>
              </div>
              <div>
                <p className="font-display text-2xl lg:text-3xl text-foreground font-semibold">0%</p>
                <p className="text-[11px] text-taupe leading-tight">Expensive Shopify app fees</p>
              </div>
            </div>
          </div>

          <div className="unfold lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-2xl bg-sand shadow-2xl">
              <img
                src={heroImage}
                alt="Luxury garment being wrapped with care"
                width={1440}
                height={1088}
                className="aspect-4/3 w-full object-cover"
              />

              {/* Floating interactive order preview card */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/95 p-4 backdrop-blur-md shadow-lg border border-border/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-8 place-items-center rounded-full bg-[#25D366] text-white">
                      <WhatsAppIcon className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Pre-Formatted WhatsApp Invoice
                      </p>
                      <p className="text-[11px] text-taupe">
                        Pre-fills items, sizes, address &amp; COD preference
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                    Live Demo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="collection-grid" className="bg-background border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-clay">
                Ready to Ship · Autumn Edit
              </p>
              <h2 className="font-display text-3xl lg:text-4xl mt-2">
                Curated Collection
              </h2>
              <p className="mt-2 text-xs text-taupe">
                Click "Order on WhatsApp" on any piece to test the direct 1-click flow.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-taupe" />
              <input
                type="text"
                placeholder="Search pieces, fabric, color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-input bg-card pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-taupe focus:outline-hidden focus:ring-1 focus:ring-foreground"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? "rounded-full bg-primary px-4 py-2 text-xs font-medium tracking-wide text-primary-foreground transition shadow-xs"
                    : "rounded-full border border-input bg-background px-4 py-2 text-xs font-medium tracking-wide text-foreground/80 transition hover:border-foreground"
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-16 text-center">
              <p className="text-sm font-medium">No pieces match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs text-clay underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY WHATSAPP COMMERCE: Client Pitch & Comparison Section */}
      <section className="bg-sand/60 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/15 px-3 py-1 text-xs font-medium text-clay">
              <Zap className="size-3" />
              Built for E-Commerce Merchants
            </span>
            <h2 className="font-display text-3xl lg:text-5xl leading-tight">
              Why WhatsApp Commerce Outperforms Traditional Stores
            </h2>
            <p className="text-sm text-foreground/70 leading-relaxed">
              70%+ of online shoppers in mobile-first markets drop off at complex
              checkout forms. WhatsApp commerce converts them right in their favorite chat app.
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="mt-14 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Old Way */}
            <div className="rounded-2xl border border-red-200/80 bg-background p-6 lg:p-8 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-destructive">
                  Traditional E-Commerce Checkout
                </span>
                <XCircle className="size-5 text-destructive" />
              </div>

              <ul className="space-y-3.5 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold text-sm">✕</span>
                  <span><strong>High Abandonment:</strong> 72% of carts are abandoned at shipping and card input forms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold text-sm">✕</span>
                  <span><strong>Fake / Unconfirmed Orders:</strong> High Return-To-Origin (RTO) rates on unverified Cash on Delivery orders.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold text-sm">✕</span>
                  <span><strong>Recurring Costs:</strong> Expensive monthly subscriptions for Shopify plugins, OTP verifications, and apps.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold text-sm">✕</span>
                  <span><strong>Impersonal Experience:</strong> Zero direct human touch to answer size, fit, and color questions.</span>
                </li>
              </ul>
            </div>

            {/* The StyleConnect WhatsApp Way */}
            <div className="rounded-2xl border-2 border-emerald-500 bg-background p-6 lg:p-8 shadow-md space-y-5 relative">
              <span className="absolute -top-3 right-6 rounded-full bg-emerald-600 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                Recommended Solution
              </span>

              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-emerald-700">
                  StyleConnect WhatsApp Commerce
                </span>
                <CheckCircle2 className="size-5 text-emerald-600" />
              </div>

              <ul className="space-y-3.5 text-xs text-foreground/90">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-sm">✓</span>
                  <span><strong>Frictionless 1-Click Ordering:</strong> Pre-filled structured invoice opens straight in WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-sm">✓</span>
                  <span><strong>100% Verified Customers:</strong> Chat directly with the buyer's real phone number before shipping to eliminate returns.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-sm">✓</span>
                  <span><strong>Zero Transaction Fee Traps:</strong> Keep 100% of your margins with direct bank transfer, COD, and Raast payments.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-sm">✓</span>
                  <span><strong>Lifelong VIP Customer List:</strong> Easily re-market new collections and broadcast promotions directly on WhatsApp.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Client CTA Banner */}
          <div className="mt-14 rounded-2xl bg-primary p-8 lg:p-12 text-primary-foreground max-w-5xl mx-auto shadow-xl">
            <div className="grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-8 space-y-3">
                <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70">
                  Ready to deploy for your business?
                </p>
                <h3 className="font-display text-2xl lg:text-4xl text-balance">
                  Get this exact WhatsApp ordering website set up for your brand.
                </h3>
                <p className="text-xs text-primary-foreground/80 max-w-xl leading-relaxed">
                  We customize your logo, brand colors, product catalog, and connect
                  your merchant WhatsApp business number in less than 24 hours.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hello! I am interested in having a WhatsApp E-Commerce website like this built for my business. Please share details and pricing.",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-[#128C7E]"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <span className="mt-2 text-[11px] text-primary-foreground/60 font-mono">
                  {FORMATTED_PHONE}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft & Packaging Section */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <img
              src={foldingImage}
              alt="Artisanal apparel being packed into tissue paper"
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-4/3 w-full rounded-2xl bg-sand object-cover shadow-md"
            />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs uppercase tracking-[0.32em] text-taupe">
              The Experience
            </p>
            <h2 className="font-display text-3xl leading-tight text-balance lg:text-4xl">
              Chosen online. Confirmed in chat. Delivered to your door.
            </h2>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Add pieces to your bag and tap checkout. Your order invoice will be
              automatically prepared with your delivery details and sent straight
              to our studio on WhatsApp for instant confirmation.
            </p>
            <div className="pt-2">
              <Link
                to="/how-it-works"
                className="plain-link inline-flex items-center gap-2 text-sm font-medium tracking-wide"
              >
                <span>Read how ordering works</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
