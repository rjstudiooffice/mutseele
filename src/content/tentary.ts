import type { TentaryRef } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// TENTARY-ANBINDUNG (nur Checkout / Zahlung / Auslieferung)
//
// Eine zentrale Stelle für alle Tentary-Verknüpfungen. Heute Platzhalter —
// beim Go-Live hier (bzw. in den Daten) die echten Tentary-Produkt-IDs und
// finalen Checkout-URLs eintragen. Shop-Domain: shop.mutseele.at.
//
// Struktur vollständig vorbereitet:
//   • productCheckout(slug)        → Einzelprodukt-Checkout  (/p/:slug)
//   • bundleCheckout(slug)         → Bundle-Checkout         (/b/:slug)
//   • bundleCheckoutUrl(slug)      → reine URL (für Verlinkung ohne TentaryRef)
// ─────────────────────────────────────────────────────────────────────────────

/** Basis-URL des Tentary-Shops. Bei Bedarf zentral hier ändern. */
export const TENTARY_BASE = "https://shop.mutseele.at";

const tentaryId = (prefix: string, slug: string): string =>
  `TENTARY_${prefix}${slug.toUpperCase().replace(/-/g, "_")}`;

/** Checkout-URL eines Einzelprodukts. */
export const productCheckoutUrl = (slug: string): string => `${TENTARY_BASE}/p/${slug}`;

/** Checkout-URL eines Bundles. */
export const bundleCheckoutUrl = (slug: string): string => `${TENTARY_BASE}/b/${slug}`;

/** Vollständige Tentary-Referenz für ein Einzelprodukt. */
export const productCheckout = (slug: string): TentaryRef => ({
  productId: tentaryId("", slug),
  checkoutUrl: productCheckoutUrl(slug),
});

/** Vollständige Tentary-Referenz für ein Bundle. */
export const bundleCheckout = (slug: string): TentaryRef => ({
  productId: tentaryId("BUNDLE_", slug),
  checkoutUrl: bundleCheckoutUrl(slug),
});
