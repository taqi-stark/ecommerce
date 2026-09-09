import oxbloodTrouser from "@/assets/oxblood-trouser.jpg";
import sandBlazer from "@/assets/sand-blazer.jpg";
import creamMidi from "@/assets/cream-midi.jpg";
import strawBrim from "@/assets/straw-brim.jpg";
import clayShirt from "@/assets/clay-shirt.jpg";
import oxbloodBeltBag from "@/assets/oxblood-belt-bag.jpg";

export type ProductCategory =
  | "All"
  | "Outerwear"
  | "Trousers"
  | "Dresses"
  | "Shirts"
  | "Accessories";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  material: string;
  price: number;
  image: string;
  colours: string[];
  sizes: string[];
  description: string;
  badge?: string;
  sku: string;
  inStock: boolean;
};

export const STORE_NAME = "StyleConnect";
export const STORE_TAGLINE = "WhatsApp-First E-Commerce Boutique";

/** Merchant WhatsApp number in international format, digits only. */
export const WHATSAPP_NUMBER = "923448280359";
export const FORMATTED_PHONE = "+92 344 8280359";

export const formatPrice = (amount: number) =>
  `PKR ${amount.toLocaleString("en-PK")}`;

export const products: Product[] = [
  {
    slug: "sand-blazer",
    name: "The Sand Blazer",
    category: "Outerwear",
    material: "Brushed cotton canvas",
    price: 32800,
    image: sandBlazer,
    colours: ["Sand", "Clay"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Boxy through the shoulder with a soft unstructured lapel. Designed to be styled open with pushed-back sleeves for effortless daily elegance.",
    badge: "Best Seller",
    sku: "SC-BLZ-01",
    inStock: true,
  },
  {
    slug: "oxblood-trouser",
    name: "The Oxblood Trouser",
    category: "Trousers",
    material: "Garment-washed wool",
    price: 24500,
    image: oxbloodTrouser,
    colours: ["Oxblood", "Ink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A relaxed wide leg in garment-washed wool, cut long through the rise and tailored with a clean covered waistband.",
    badge: "Seasonal Edit",
    sku: "SC-TRS-02",
    inStock: true,
  },
  {
    slug: "cream-midi",
    name: "The Cream Midi",
    category: "Dresses",
    material: "Fluid draped viscose",
    price: 27200,
    image: creamMidi,
    colours: ["Cream", "Taupe"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A graceful fluid column that falls gently from the shoulder. Deep flattering V-front, bias-cut silhouette, seamless pull-on finish.",
    badge: "Trending",
    sku: "SC-DRS-03",
    inStock: true,
  },
  {
    slug: "clay-shirt",
    name: "The Clay Shirt",
    category: "Shirts",
    material: "Relaxed breathable linen",
    price: 16900,
    image: clayShirt,
    colours: ["Clay", "Cream"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Slubby washed breathable linen with a single chest pocket and mother-of-pearl buttons. Naturally softens with every wash.",
    badge: "Essential",
    sku: "SC-SHT-04",
    inStock: true,
  },
  {
    slug: "oxblood-belt-bag",
    name: "The Oxblood Belt Bag",
    category: "Accessories",
    material: "Vegetable-tanned leather",
    price: 21600,
    image: oxbloodBeltBag,
    colours: ["Oxblood"],
    sizes: ["One size"],
    description:
      "Sculpted, rounded and hand-burnished, featuring an adjustable crossbody strap with solid cast brass hardware.",
    badge: "Handmade",
    sku: "SC-BAG-05",
    inStock: true,
  },
  {
    slug: "straw-brim",
    name: "The Straw Brim",
    category: "Accessories",
    material: "Hand-woven natural palm",
    price: 18400,
    image: strawBrim,
    colours: ["Natural"],
    sizes: ["One size"],
    description:
      "Woven entirely by hand over three days by artisanal craftspeople, finished with a wide flat brim and a fine tonal band.",
    badge: "Limited Run",
    sku: "SC-HAT-06",
    inStock: true,
  },
];

export const categories: ProductCategory[] = [
  "All",
  "Outerwear",
  "Trousers",
  "Dresses",
  "Shirts",
  "Accessories",
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

/**
 * Builds a direct WhatsApp order link for a single product.
 */
export function buildProductWhatsAppLink({
  product,
  size,
  colour,
  quantity = 1,
}: {
  product: Product;
  size?: string;
  colour?: string;
  quantity?: number;
}) {
  const chosenSize = size || product.sizes[0] || "One size";
  const chosenColour = colour || product.colours[0] || "Default";
  const totalPrice = product.price * quantity;

  const text = [
    `🛍️ *ORDER INQUIRY — ${STORE_NAME}*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Hello! I would like to order:`,
    `• *Product:* ${product.name}`,
    `• *SKU:* ${product.sku}`,
    `• *Color:* ${chosenColour}`,
    `• *Size:* ${chosenSize}`,
    `• *Quantity:* ${quantity}`,
    `• *Price:* ${formatPrice(totalPrice)}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Please confirm stock availability and shipping details. Thank you!`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a general WhatsApp inquiry link.
 */
export function buildGeneralWhatsAppLink(topic?: string) {
  const intro = topic
    ? `Hello ${STORE_NAME}! I'm inquiring about: ${topic}.`
    : `Hello ${STORE_NAME}! I'm visiting your demo store and have a question.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(intro)}`;
}
