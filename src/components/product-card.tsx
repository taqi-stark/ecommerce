import { Link } from "@tanstack/react-router";
import { formatPrice, buildProductWhatsAppLink, type Product } from "@/lib/products";
import { WhatsAppIcon } from "./whatsapp-icon";
import { ShoppingBag } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const quickWhatsAppUrl = buildProductWhatsAppLink({ product });

  return (
    <div className="group relative flex flex-col rounded-2xl border border-transparent bg-background transition-all duration-300 hover:border-border/70 hover:shadow-lg">
      <Link
        to="/collection/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden rounded-t-2xl relative"
      >
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium tracking-wide text-foreground shadow-xs backdrop-blur-xs">
            {product.badge}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="aspect-4/5 w-full bg-sand object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <Link
            to="/collection/$slug"
            params={{ slug: product.slug }}
            className="text-sm font-medium tracking-wide text-foreground hover:underline"
          >
            {product.name}
          </Link>
          <span className="text-xs font-semibold whitespace-nowrap text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="mt-1 text-xs text-taupe">{product.material}</p>

        <div className="mt-4 flex items-center gap-2 pt-2 border-t border-border/40">
          <a
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2 px-3 text-xs font-medium text-white shadow-xs transition hover:bg-[#128C7E]"
            title={`Order ${product.name} directly on WhatsApp`}
          >
            <WhatsAppIcon className="size-3.5" />
            <span>Order on WhatsApp</span>
          </a>

          <Link
            to="/collection/$slug"
            params={{ slug: product.slug }}
            className="grid size-8 place-items-center rounded-full border border-input text-taupe transition hover:border-foreground hover:text-foreground"
            title="View product details"
          >
            <ShoppingBag className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
