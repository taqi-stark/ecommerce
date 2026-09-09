import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { WhatsAppIcon } from "./whatsapp-icon";

export function CartBar() {
  const { count, subtotal, open, whatsappHref } = useCart();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full bg-primary py-2 pl-5 pr-2 text-primary-foreground ring-1 ring-black/5">
        <span className="text-sm tracking-wide whitespace-nowrap">
          {count} {count === 1 ? "item" : "items"} · {formatPrice(subtotal)}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={open}
            className="rounded-full px-4 py-2 text-sm tracking-wide transition-colors hover:bg-background/10"
          >
            View bag
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp py-2 pl-3 pr-4 text-sm tracking-wide text-whatsapp-foreground"
          >
            <WhatsAppIcon className="size-4" />
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden">Order</span>
          </a>
        </div>
      </div>
    </div>
  );
}
