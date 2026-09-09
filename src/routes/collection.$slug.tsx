import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import {
  formatPrice,
  getProduct,
  products,
  buildProductWhatsAppLink,
  STORE_NAME,
  FORMATTED_PHONE,
  WHATSAPP_NUMBER,
} from "@/lib/products";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ProductCard } from "@/components/product-card";
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/collection/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: `Piece Unavailable — ${STORE_NAME}` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${STORE_NAME}`;
    const description = `${product.description} ${formatPrice(product.price)}. Instant 1-click order via WhatsApp.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const [colour, setColour] = useState(product.colours[0] ?? "Natural");
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const whatsappDirectOrderUrl = buildProductWhatsAppLink({
    product,
    size,
    colour,
    quantity,
  });

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
        <div className="flex items-center justify-between">
          <Link
            to="/collection"
            className="plain-link inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-taupe hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Collection</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-xs text-taupe hover:text-foreground transition"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-600" />
                <span className="text-emerald-600">Link copied</span>
              </>
            ) : (
              <>
                <Share2 className="size-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Product Image */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl bg-sand shadow-sm">
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-background/90 px-3.5 py-1 text-xs font-medium tracking-wide text-foreground shadow-xs backdrop-blur-xs">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                width={1024}
                height={1280}
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </div>

          {/* Product Details & Ordering */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-clay">
                <span>{product.category}</span>
                <span>•</span>
                <span className="font-mono">{product.sku}</span>
              </div>
              <h1 className="font-display mt-2 text-3xl lg:text-4xl leading-tight text-balance">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-taupe">{product.material}</p>
              <p className="mt-4 text-2xl font-semibold tracking-wide text-foreground">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* In stock badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 border border-emerald-200">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>In Stock · Ready to dispatch via WhatsApp</span>
            </div>

            <p className="text-sm leading-relaxed text-foreground/75 text-pretty">
              {product.description}
            </p>

            {/* Colour Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-taupe font-medium">
                  Colour
                </span>
                <span className="text-xs font-medium text-foreground">{colour}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colours.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColour(c)}
                    aria-pressed={colour === c}
                    className={
                      colour === c
                        ? "rounded-full bg-primary px-4 py-2 text-xs font-medium tracking-wide text-primary-foreground shadow-xs"
                        : "rounded-full border border-input px-4 py-2 text-xs font-medium tracking-wide text-foreground transition hover:border-foreground"
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-taupe font-medium">
                  Size
                </span>
                <span className="text-xs font-medium text-foreground">{size}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={
                      size === s
                        ? "rounded-full bg-primary px-4 py-2 text-xs font-medium tracking-wide text-primary-foreground shadow-xs"
                        : "rounded-full border border-input px-4 py-2 text-xs font-medium tracking-wide text-foreground transition hover:border-foreground"
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div>
              <span className="text-xs uppercase tracking-wider text-taupe font-medium block mb-2">
                Quantity
              </span>
              <div className="inline-flex items-center rounded-full border border-input">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid size-8 place-items-center text-sm text-taupe hover:text-foreground transition"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-xs font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="grid size-8 place-items-center text-sm text-taupe hover:text-foreground transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: 1-Click WhatsApp Order & Add to Bag */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href={whatsappDirectOrderUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 px-6 text-sm font-semibold tracking-wide text-white shadow-md transition hover:bg-[#128C7E]"
              >
                <WhatsAppIcon className="size-4.5" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    add({ slug: product.slug, size, colour });
                  }
                }}
                className="flex-1 rounded-full border border-input bg-background py-3.5 px-6 text-sm font-medium tracking-wide text-foreground transition hover:border-foreground hover:bg-sand/30"
              >
                Add to Bag
              </button>
            </div>

            {/* Inquire link */}
            <div className="text-center pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi ${STORE_NAME}, I have a sizing/fabric question about ${product.name} (${product.sku}).`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-taupe hover:text-foreground underline underline-offset-4"
              >
                Have questions about fit or fabric? Ask on WhatsApp
              </a>
            </div>

            {/* Guarantees */}
            <div className="border-t border-border/80 pt-4 space-y-2 text-xs text-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Immediate WhatsApp confirmation with dispatch tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-3.5 text-emerald-600 shrink-0" />
                <span>Complimentary nationwide delivery in 2–4 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                <span>Cash on Delivery (COD) or Direct Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="bg-sand/50 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-2xl lg:text-3xl">Pairs Well With</h2>
            <Link to="/collection" className="text-xs text-taupe hover:text-foreground underline">
              View all pieces
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
