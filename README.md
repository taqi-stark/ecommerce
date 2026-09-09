# StyleConnect — WhatsApp E-Commerce Store Demo

A modern, high-converting demo e-commerce website built for clothing brands, boutiques, and merchants who want **direct WhatsApp order integration**.

## 🚀 Overview

Many customers in fast-growing markets prefer ordering directly via WhatsApp rather than navigating complex multi-step checkout funnels. **StyleConnect** gives e-commerce clients a sleek storefront with:
- **Instant 1-Click WhatsApp Orders** with pre-selected variation details (size, color, price).
- **Multi-Item Cart to WhatsApp Checkout** that generates structured order receipts.
- **Floating WhatsApp Quick-Chat Widget** for live customer support.
- **Interactive Demo Controls** so prospective e-commerce clients can test ordering on their own phone.

## 📱 WhatsApp Configuration

- Default demo contact number: **`+92 344 8280359`** (`923448280359` in `src/lib/products.ts`).
- To change the merchant WhatsApp number, edit `WHATSAPP_NUMBER` in `src/lib/products.ts`.

## 🛠️ Tech Stack

- **Framework**: TanStack Start (React 19)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4, Lucide Icons, Shadcn UI primitives
- **State**: React Context with LocalStorage persistence

## 💻 Local Development

```sh
npm install
npm run dev
```

Visit [http://localhost:8080](http://localhost:8080) to preview the store.
