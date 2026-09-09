import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct, FORMATTED_PHONE } from "@/lib/products";
import { WhatsAppIcon } from "./whatsapp-icon";
import {
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  User,
  Phone,
  Truck,
  Sparkles,
} from "lucide-react";

export function CartDrawer() {
  const {
    isOpen,
    close,
    lines,
    subtotal,
    setQty,
    remove,
    clear,
    customerDetails,
    updateCustomerDetails,
    formattedOrderMessage,
    whatsappHref,
  } = useCart();

  const [showDetails, setShowDetails] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <button
        type="button"
        aria-label="Close bag"
        onClick={close}
        className="veil-open absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />
      <aside className="drawer-open absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background text-foreground shadow-2xl ring-1 ring-border">
        {/* Drawer Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl">Your Bag</span>
            <span className="rounded-full bg-sand px-2 py-0.5 text-xs text-foreground/80">
              {lines.reduce((s, l) => s + l.qty, 0)} {lines.reduce((s, l) => s + l.qty, 0) === 1 ? "piece" : "pieces"}
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            className="text-sm tracking-wide text-taupe transition-colors hover:text-foreground"
          >
            Close
          </button>
        </div>

        {/* Scrollable Items & Controls */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <div className="mb-3 grid size-12 place-items-center rounded-full bg-sand text-taupe">
                <WhatsAppIcon className="size-6" />
              </div>
              <p className="font-display text-lg">Your bag is empty</p>
              <p className="mt-1 max-w-xs text-xs text-taupe">
                Explore our collection and add pieces. You'll be able to checkout
                and confirm sizing directly over WhatsApp.
              </p>
            </div>
          ) : (
            <>
              {/* Product Lines */}
              <div className="space-y-4 divide-y divide-border/60">
                {lines.map((line) => {
                  const product = getProduct(line.slug);
                  if (!product) return null;
                  return (
                    <div key={line.id} className="flex gap-4 pt-4 first:pt-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        width={160}
                        height={160}
                        className="size-20 shrink-0 rounded-lg bg-sand object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-sm font-medium tracking-wide">
                            {product.name}
                          </p>
                          <p className="text-sm font-semibold whitespace-nowrap">
                            {formatPrice(product.price * line.qty)}
                          </p>
                        </div>
                        <p className="mt-0.5 text-xs text-taupe">
                          Size: <span className="font-medium text-foreground">{line.size}</span> · Colour:{" "}
                          <span className="font-medium text-foreground">{line.colour}</span>
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-input">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(line.id, line.qty - 1)}
                              className="grid size-7 place-items-center text-sm text-taupe transition hover:text-foreground"
                            >
                              −
                            </button>
                            <span className="min-w-6 text-center text-xs font-semibold">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(line.id, line.qty + 1)}
                              className="grid size-7 place-items-center text-sm text-taupe transition hover:text-foreground"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(line.id)}
                            className="flex items-center gap-1 text-xs text-taupe transition hover:text-destructive"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Free Shipping & Confirmation Note */}
              <div className="flex items-center gap-2.5 rounded-lg bg-sand/60 px-3.5 py-2.5 text-xs text-foreground/80">
                <Truck className="size-4 shrink-0 text-clay" />
                <span>
                  <strong>Complimentary Shipping</strong> nationwide. Order
                  details are sent straight to <strong className="font-mono">{FORMATTED_PHONE}</strong>.
                </span>
              </div>

              {/* Optional Quick Customer Details Toggle */}
              <div className="rounded-xl border border-border bg-card p-4">
                <button
                  type="button"
                  onClick={() => setShowDetails((prev) => !prev)}
                  className="flex w-full items-center justify-between text-left text-xs font-medium tracking-wide"
                >
                  <span className="flex items-center gap-2">
                    <User className="size-3.5 text-clay" />
                    <span>Customer &amp; Delivery Details (Optional)</span>
                  </span>
                  {showDetails ? (
                    <ChevronUp className="size-3.5 text-taupe" />
                  ) : (
                    <ChevronDown className="size-3.5 text-taupe" />
                  )}
                </button>

                {showDetails && (
                  <div className="mt-3 space-y-2.5 border-t border-border pt-3">
                    <p className="text-[11px] text-taupe">
                      Fill these in to automatically include your delivery
                      address in your WhatsApp message.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-taupe block mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ayesha Khan"
                          value={customerDetails.name}
                          onChange={(e) =>
                            updateCustomerDetails({ name: e.target.value })
                          }
                          className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-taupe block mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          placeholder="0300 1234567"
                          value={customerDetails.phone}
                          onChange={(e) =>
                            updateCustomerDetails({ phone: e.target.value })
                          }
                          className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-taupe block mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="Lahore / Karachi / etc."
                          value={customerDetails.city}
                          onChange={(e) =>
                            updateCustomerDetails({ city: e.target.value })
                          }
                          className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-taupe block mb-1">
                          Payment Method
                        </label>
                        <select
                          value={customerDetails.paymentMethod}
                          onChange={(e) =>
                            updateCustomerDetails({
                              paymentMethod: e.target.value as any,
                            })
                          }
                          className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs"
                        >
                          <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                          <option value="Bank Transfer / Raast">Bank Transfer / Raast</option>
                          <option value="JazzCash / EasyPaisa">JazzCash / EasyPaisa</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-taupe block mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        placeholder="House / Street / Area"
                        value={customerDetails.address}
                        onChange={(e) =>
                          updateCustomerDetails({ address: e.target.value })
                        }
                        className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* WhatsApp Message Preview Toggle */}
              <div className="rounded-xl border border-border bg-sand/30 p-3.5">
                <button
                  type="button"
                  onClick={() => setShowPreview((prev) => !prev)}
                  className="flex w-full items-center justify-between text-left text-xs font-medium text-foreground/80"
                >
                  <span className="flex items-center gap-1.5">
                    {showPreview ? (
                      <EyeOff className="size-3.5 text-taupe" />
                    ) : (
                      <Eye className="size-3.5 text-taupe" />
                    )}
                    <span>Preview Generated WhatsApp Message</span>
                  </span>
                  <span className="text-[11px] text-whatsapp font-medium">
                    {showPreview ? "Hide" : "View"}
                  </span>
                </button>

                {showPreview && (
                  <div className="mt-3 rounded-lg bg-[#EFEAE2] p-3 text-[11px] font-mono leading-relaxed text-foreground whitespace-pre-wrap border border-[#dad2c5]">
                    {formattedOrderMessage}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Checkout Footer */}
        {lines.length > 0 && (
          <div className="border-t border-border bg-background px-6 py-5 shadow-lg">
            <div className="mb-2 flex items-baseline justify-between text-xs text-taupe">
              <span>Subtotal</span>
              <span className="text-sm font-semibold text-foreground">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="mb-4 flex items-baseline justify-between text-xs text-taupe">
              <span>Shipping</span>
              <span className="font-medium text-emerald-600">FREE</span>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-sm font-medium tracking-wide text-white shadow-lg transition-all hover:bg-[#128C7E]"
            >
              <WhatsAppIcon className="size-4.5" />
              <span>Checkout via WhatsApp</span>
            </a>

            <div className="mt-3 flex items-center justify-between text-[11px] text-taupe">
              <span>No pre-payment required on web</span>
              <button
                type="button"
                onClick={clear}
                className="underline hover:text-foreground"
              >
                Clear bag
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
