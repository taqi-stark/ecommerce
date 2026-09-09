import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  STORE_NAME,
  WHATSAPP_NUMBER,
  formatPrice,
  getProduct,
} from "./products";

export type CartLine = {
  id: string;
  slug: string;
  size: string;
  colour: string;
  qty: number;
};

export type CustomerDetails = {
  name: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: "Cash on Delivery" | "Bank Transfer / Raast" | "JazzCash / EasyPaisa";
  notes: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: { slug: string; size: string; colour: string }) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  formattedOrderMessage: string;
  whatsappHref: string;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "styleconnect-demo-cart";
const CUSTOMER_STORAGE_KEY = "styleconnect-demo-customer";

const initialCustomerDetails: CustomerDetails = {
  name: "",
  phone: "",
  city: "",
  address: "",
  paymentMethod: "Cash on Delivery",
  notes: "",
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(
    initialCustomerDetails,
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
      const rawCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (rawCustomer) {
        setCustomerDetails((prev) => ({
          ...prev,
          ...JSON.parse(rawCustomer),
        }));
      }
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota errors */
    }
  }, [lines]);

  useEffect(() => {
    try {
      localStorage.setItem(
        CUSTOMER_STORAGE_KEY,
        JSON.stringify(customerDetails),
      );
    } catch {
      /* ignore quota errors */
    }
  }, [customerDetails]);

  const updateCustomerDetails = useCallback(
    (details: Partial<CustomerDetails>) => {
      setCustomerDetails((prev) => ({ ...prev, ...details }));
    },
    [],
  );

  const add = useCallback(
    ({
      slug,
      size,
      colour,
    }: {
      slug: string;
      size: string;
      colour: string;
    }) => {
      const id = `${slug}__${size}__${colour}`;
      setLines((prev) => {
        const found = prev.find((l) => l.id === id);
        if (found) {
          return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
        }
        return [...prev, { id, slug, size, colour, qty: 1 }];
      });
      setIsOpen(true);
    },
    [],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const subtotal = useMemo(
    () =>
      lines.reduce(
        (sum, l) => sum + (getProduct(l.slug)?.price ?? 0) * l.qty,
        0,
      ),
    [lines],
  );

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines],
  );

  const formattedOrderMessage = useMemo(() => {
    if (lines.length === 0) {
      return `Hello ${STORE_NAME}, I would like to inquire about your collection!`;
    }

    const itemsText = lines
      .map((l, index) => {
        const p = getProduct(l.slug);
        if (!p) return "";
        return `${index + 1}. *${p.name}*\n   • Variation: ${l.colour} | Size: ${l.size}\n   • Qty: ${l.qty} × ${formatPrice(p.price)} = ${formatPrice(p.price * l.qty)}`;
      })
      .filter(Boolean)
      .join("\n\n");

    const parts: string[] = [
      `🛍️ *NEW ORDER — ${STORE_NAME.toUpperCase()}*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ];

    if (
      customerDetails.name ||
      customerDetails.phone ||
      customerDetails.city ||
      customerDetails.address
    ) {
      parts.push(`👤 *Customer Details:*`);
      if (customerDetails.name) parts.push(`• *Name:* ${customerDetails.name}`);
      if (customerDetails.phone)
        parts.push(`• *Phone:* ${customerDetails.phone}`);
      if (customerDetails.city) parts.push(`• *City:* ${customerDetails.city}`);
      if (customerDetails.address)
        parts.push(`• *Address:* ${customerDetails.address}`);
      parts.push(`• *Payment Method:* ${customerDetails.paymentMethod}`);
      parts.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    } else {
      parts.push(`💳 *Payment Preference:* ${customerDetails.paymentMethod}`);
      parts.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    }

    parts.push(`📦 *Order Summary:*`);
    parts.push(itemsText);
    parts.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    parts.push(`• Subtotal: ${formatPrice(subtotal)}`);
    parts.push(`• Shipping: FREE (WhatsApp Special)`);
    parts.push(`*• TOTAL PAYABLE: ${formatPrice(subtotal)}*`);
    parts.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);

    if (customerDetails.notes.trim()) {
      parts.push(`📝 *Note:* ${customerDetails.notes.trim()}`);
      parts.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    }

    parts.push(
      `Please verify stock and confirm delivery timeline. Thank you!`,
    );

    return parts.join("\n");
  }, [lines, subtotal, customerDetails]);

  const whatsappHref = useMemo(() => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedOrderMessage)}`;
  }, [formattedOrderMessage]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear: () => setLines([]),
      customerDetails,
      updateCustomerDetails,
      formattedOrderMessage,
      whatsappHref,
    }),
    [
      lines,
      count,
      subtotal,
      isOpen,
      add,
      setQty,
      remove,
      customerDetails,
      updateCustomerDetails,
      formattedOrderMessage,
      whatsappHref,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
