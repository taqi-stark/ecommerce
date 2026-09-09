import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import {
  products,
  categories,
  STORE_NAME,
  type ProductCategory,
} from "@/lib/products";
import { Search } from "lucide-react";

const title = `The Collection — ${STORE_NAME} WhatsApp Store`;
const description =
  `Browse every handcrafted piece in the ${STORE_NAME} edit. Select your size, fabric color, and order immediately on WhatsApp.`;

export const Route = createFileRoute("/collection/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Collection,
});

function Collection() {
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
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-clay">
            Complete Catalog
          </p>
          <h1 className="font-display mt-2 text-4xl leading-tight text-balance lg:text-5xl">
            The Collection
          </h1>
          <p className="mt-3 max-w-[44ch] text-sm text-foreground/75 text-pretty">
            Every piece is tailored in limited runs. Choose your fit, then tap
            "Order on WhatsApp" for instant order processing and size advice.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-taupe" />
          <input
            type="text"
            placeholder="Search all pieces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-input bg-card pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-taupe focus:outline-hidden focus:ring-1 focus:ring-foreground"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={
              selectedCategory === cat
                ? "rounded-full bg-primary px-4 py-2 text-xs font-medium tracking-wide text-primary-foreground shadow-xs"
                : "rounded-full border border-input bg-background px-4 py-2 text-xs font-medium tracking-wide text-foreground/80 transition hover:border-foreground"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="mt-10">
        <div className="mb-6 flex items-center justify-between text-xs text-taupe">
          <span>Showing {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}</span>
          <span>Instant WhatsApp Checkout Enabled</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-sm font-medium">No pieces found matching your criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-3 text-xs text-clay underline"
            >
              Clear filters
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
  );
}
