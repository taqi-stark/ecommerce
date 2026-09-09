import { createFileRoute, Link } from "@tanstack/react-router";
import foldingImage from "@/assets/folding.jpg";
import { useCart } from "@/lib/cart";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import {
  STORE_NAME,
  FORMATTED_PHONE,
  WHATSAPP_NUMBER,
} from "@/lib/products";
import {
  CheckCircle2,
  Smartphone,
  MessageSquare,
  Truck,
  HelpCircle,
  Zap,
} from "lucide-react";

const title = `How WhatsApp Ordering Works — ${STORE_NAME}`;
const description =
  "See how easy it is to order via WhatsApp and how e-commerce clients can adopt this high-converting store setup.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HowItWorks,
});

const customerSteps = [
  {
    n: "01",
    heading: "Select your pieces",
    body: "Browse the curated collection, choose your size and color. Tap 'Order on WhatsApp' for instant 1-click checkout, or add multiple items to your bag.",
  },
  {
    n: "02",
    heading: "Instant WhatsApp invoice",
    body: "WhatsApp opens automatically with a cleanly structured message specifying your selected items, quantities, subtotal, and delivery details.",
  },
  {
    n: "03",
    heading: "Real-time verification",
    body: `Our studio team confirms sizing advice, stock availability, and your delivery address at ${FORMATTED_PHONE}.`,
  },
  {
    n: "04",
    heading: "Dispatch & Cash on Delivery",
    body: "Your order is carefully packaged and shipped with express tracking. Pay securely upon delivery or via direct bank transfer.",
  },
];

const merchantFaqs = [
  {
    q: "Can I connect my own WhatsApp Business phone number?",
    a: "Yes! The system simply links to your dedicated WhatsApp Business number. You receive all incoming customer orders directly on your phone or WhatsApp Web without any third-party app middlemen.",
  },
  {
    q: "How do payments work?",
    a: "You have complete flexibility: support Cash on Delivery (COD), instant bank transfer via Raast / IBAN, or JazzCash and EasyPaisa. Customers confirm their preferred payment directly in chat.",
  },
  {
    q: "Why does this convert better than Shopify or WooCommerce?",
    a: "In mobile-first markets, customers dread lengthy checkout forms, passwords, and SMS OTP failures. WhatsApp ordering removes all barriers and gives customers instant reassurance that a real person is handling their order.",
  },
  {
    q: "Can I customize products, images, and brand styles?",
    a: "Absolutely. The catalog, categories, colors, sizes, and brand visuals are completely customizable and can be updated quickly.",
  },
];

function HowItWorks() {
  const { whatsappHref } = useCart();

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.32em] text-clay">
            How It Works
          </p>
          <h1 className="font-display mt-2 text-4xl leading-tight text-balance lg:text-5xl">
            Effortless ordering from catalog to chat.
          </h1>
          <p className="mt-4 text-sm text-foreground/75 leading-relaxed">
            Experience the simplest, highest-converting checkout flow built for
            modern fashion and lifestyle e-commerce brands.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          <div className="lg:col-span-6 space-y-8">
            {customerSteps.map((step) => (
              <div key={step.n} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-xs font-semibold text-clay font-mono">
                  {step.n}
                </span>
                <div>
                  <h2 className="font-display text-xl font-medium text-foreground">
                    {step.heading}
                  </h2>
                  <p className="mt-1.5 text-xs text-foreground/70 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3 px-5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#128C7E]"
              >
                <WhatsAppIcon className="size-4" />
                <span>Message the Studio: {FORMATTED_PHONE}</span>
              </a>
              <Link to="/collection" className="plain-link text-xs font-medium tracking-wide">
                Browse Collection
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl bg-sand shadow-lg">
              <img
                src={foldingImage}
                alt="A wool garment being wrapped in tissue paper"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-4/3 w-full object-cover"
              />
              <div className="p-6 bg-card border-t border-border/60 space-y-2">
                <p className="text-xs uppercase tracking-wider text-clay font-medium">
                  Studio Response Time
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Under 15 minutes during business hours (10 AM – 8 PM PKT)
                </p>
                <p className="text-xs text-taupe">
                  Orders placed after hours are queued and confirmed first thing the next morning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client FAQ Section */}
      <section className="bg-sand/60 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <HelpCircle className="size-3" />
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl lg:text-4xl mt-3">
              Questions from E-Commerce Clients
            </h2>
            <p className="mt-2 text-xs text-taupe">
              Everything you need to know about implementing this WhatsApp ordering system.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {merchantFaqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-background p-6 shadow-2xs space-y-2"
              >
                <h3 className="font-display text-lg font-medium text-foreground">
                  {faq.q}
                </h3>
                <p className="text-xs text-foreground/75 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Bar */}
          <div className="mt-14 rounded-2xl bg-foreground p-8 text-background text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-display text-2xl lg:text-3xl">
              Want this WhatsApp ordering setup for your business?
            </h3>
            <p className="text-xs text-background/70 max-w-md mx-auto">
              We can deploy this website for your brand with your custom catalog,
              pricing, colors, and direct WhatsApp number.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hello! I would like to get a WhatsApp store like this set up for my business.",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-[#128C7E]"
              >
                <WhatsAppIcon className="size-4" />
                <span>Contact via WhatsApp: {FORMATTED_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
