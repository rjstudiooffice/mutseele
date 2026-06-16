// ─────────────────────────────────────────────────────────────────────────────
// MutSeele · Content-Layer · Öffentliche API
//
// Single Entry Point. UI-Code importiert NUR von hier:
//   import { getWorlds, getProductsByWorld, getRecommendations } from "@/content";
//
// Vorteil: Wenn die Quelle später von TypeScript-Daten auf Sanity wechselt,
// ändern sich nur die Implementierungen hier — kein UI-Code muss angefasst
// werden. Heute synchron; bei CMS-Anbindung können die Getter async werden.
// ─────────────────────────────────────────────────────────────────────────────

export * from "./types";
export * from "./recommend";
export * from "./tentary";

import type {
  Product,
  Category,
  World,
  Bundle,
  ProductFamily,
  LeadMagnet,
  Testimonial,
} from "./types";
import { worlds, categories, families } from "./data/worlds";
import { products } from "./data/products";
import { bundles } from "./data/bundles";
import { leadMagnets } from "./data/leadMagnets";
import { testimonials } from "./data/testimonials";
import { quiz, quizOutcomes } from "./data/quiz";
import { recommendations, bundleRecommendations } from "./data/recommendations";

export { worlds, categories, families, products, bundles, leadMagnets, testimonials, quiz, quizOutcomes };

// ── Indizes (O(1)-Lookups) ───────────────────────────────────────────────────
const productById = new Map(products.map((p) => [p.id, p]));
const worldById = new Map(worlds.map((w) => [w.id, w]));
const categoryById = new Map(categories.map((c) => [c.id, c]));
const bundleById = new Map(bundles.map((b) => [b.id, b]));

// ── Welt-Queries ─────────────────────────────────────────────────────────────
export const getWorlds = (): World[] =>
  [...worlds].sort((a, b) => a.order - b.order);

/** Nur die Haupt-Shopwelten (Pädagogen/standalone ausgeklammert). */
export const getMainWorlds = (): World[] =>
  getWorlds().filter((w) => !w.standalone);

export const getWorld = (id: string): World | undefined => worldById.get(id);

// ── Kategorie-Queries ────────────────────────────────────────────────────────
export const getCategoriesByWorld = (worldId: string): Category[] =>
  categories.filter((c) => c.worldId === worldId).sort((a, b) => a.order - b.order);

export const getCategory = (id: string): Category | undefined => categoryById.get(id);

// ── Produkt-Queries ──────────────────────────────────────────────────────────
export const getProduct = (id: string): Product | undefined => productById.get(id);

export const getProductsByWorld = (worldId: string): Product[] =>
  products.filter((p) => p.worldId === worldId);

export const getProductsByCategory = (categoryId: string): Product[] =>
  products.filter(
    (p) => p.categoryId === categoryId || p.secondaryCategoryIds?.includes(categoryId),
  );

export const getProductsByFamily = (familyId: string): Product[] =>
  products.filter((p) => p.familyId === familyId);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);

export const getFamily = (id: string): ProductFamily | undefined =>
  families.find((f) => f.id === id);

// ── Bundle-Queries ───────────────────────────────────────────────────────────
export const getBundle = (id: string): Bundle | undefined => bundleById.get(id);

export const getBundlesByWorld = (worldId: string): Bundle[] =>
  bundles.filter((b) => b.worldId === worldId);

/** Startseiten-Bundles in Premium-Reihenfolge (homeOrder aufsteigend). */
export const getHomeBundles = (): Bundle[] =>
  bundles
    .filter((b) => b.homeOrder != null)
    .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));

/** Ersparnis eines Bundles ggü. Einzelkauf (für UI-Badge). */
export const bundleSavings = (bundle: Bundle): number => {
  const sum = bundle.productIds.reduce(
    (acc, id) => acc + (productById.get(id)?.price.amount ?? 0),
    0,
  );
  return Math.max(0, sum - bundle.price.amount);
};

// ── Lead-Magnet-Queries ──────────────────────────────────────────────────────
export const getLeadMagnets = (): LeadMagnet[] => leadMagnets;

/** Das hervorgehobene Freebie für den Startseiten-Funnel (Fallback: erstes). */
export const getFeaturedLeadMagnet = (): LeadMagnet =>
  leadMagnets.find((l) => l.featured) ?? leadMagnets[0];

// ── Testimonial-Queries ──────────────────────────────────────────────────────
export const getTestimonials = (): Testimonial[] => testimonials;

export const getTestimonialsByWorld = (worldId: string): Testimonial[] =>
  testimonials.filter((t) => t.worldId === worldId);

export const getTestimonialsByProduct = (productId: string): Testimonial[] =>
  testimonials.filter((t) => t.productId === productId);

// ─────────────────────────────────────────────────────────────────────────────
// INTEGRITÄTS-CHECK (Dev-only)
// Findet kaputte Referenzen, bevor sie im UI auffallen. Im Test/CI aufrufen:
//   import { validateContent } from "@/content";
//   const errors = validateContent(); expect(errors).toEqual([]);
// ─────────────────────────────────────────────────────────────────────────────
export function validateContent(): string[] {
  const errors: string[] = [];
  const worldIds = new Set(worlds.map((w) => w.id));
  const categoryIds = new Set(categories.map((c) => c.id));
  const productIds = new Set(products.map((p) => p.id));
  const familyIds = new Set(families.map((f) => f.id));

  for (const c of categories)
    if (!worldIds.has(c.worldId)) errors.push(`Kategorie ${c.id} → unbekannte Welt ${c.worldId}`);

  for (const p of products) {
    if (!categoryIds.has(p.categoryId)) errors.push(`Produkt ${p.id} → unbekannte Kategorie ${p.categoryId}`);
    if (!worldIds.has(p.worldId)) errors.push(`Produkt ${p.id} → unbekannte Welt ${p.worldId}`);
    if (getCategory(p.categoryId)?.worldId !== p.worldId)
      errors.push(`Produkt ${p.id} → worldId passt nicht zur Kategorie`);
    if (p.familyId && !familyIds.has(p.familyId)) errors.push(`Produkt ${p.id} → unbekannte Familie ${p.familyId}`);
    // Tentary-Struktur muss vollständig sein (Werte dürfen Platzhalter sein).
    if (!p.tentary?.productId || !p.tentary?.checkoutUrl)
      errors.push(`Produkt ${p.id} → Tentary unvollständig (productId/checkoutUrl)`);
  }

  for (const b of bundles) {
    b.productIds.forEach((id) => {
      if (!productIds.has(id)) errors.push(`Bundle ${b.id} → unbekanntes Produkt ${id}`);
    });
    if (!b.tentary?.productId || !b.tentary?.checkoutUrl)
      errors.push(`Bundle ${b.id} → Tentary unvollständig (productId/checkoutUrl)`);
    const brecs = bundleRecommendations[b.id];
    if (!brecs) {
      errors.push(`Bundle ${b.id} → keine Empfehlungen definiert`);
    } else {
      if (brecs.length !== 3) errors.push(`Bundle ${b.id} → genau 3 Empfehlungen erwartet, ${brecs.length} gefunden`);
      brecs.forEach((rid) => {
        if (!productIds.has(rid)) errors.push(`Bundle ${b.id} → unbekanntes Produkt ${rid}`);
        if (b.productIds.includes(rid)) errors.push(`Bundle ${b.id} → empfiehlt enthaltenes Produkt ${rid}`);
      });
    }
  }

  for (const l of leadMagnets) {
    if (l.leadsToWorldId && !worldIds.has(l.leadsToWorldId))
      errors.push(`LeadMagnet ${l.id} → unbekannte Welt ${l.leadsToWorldId}`);
    l.leadsToProductIds?.forEach((id) => {
      if (!productIds.has(id)) errors.push(`LeadMagnet ${l.id} → unbekanntes Produkt ${id}`);
    });
  }
  if (leadMagnets.filter((l) => l.featured).length > 1)
    errors.push("Mehr als ein LeadMagnet ist featured (genau eines erwartet).");

  for (const t of testimonials) {
    if (t.worldId && !worldIds.has(t.worldId)) errors.push(`Testimonial ${t.id} → unbekannte Welt ${t.worldId}`);
    if (t.productId && !productIds.has(t.productId)) errors.push(`Testimonial ${t.id} → unbekanntes Produkt ${t.productId}`);
  }

  for (const [id, recs] of Object.entries(recommendations)) {
    if (!productIds.has(id)) errors.push(`Empfehlungen → unbekanntes Produkt ${id}`);
    if (recs.length !== 3) errors.push(`Empfehlungen ${id} → genau 3 erwartet, ${recs.length} gefunden`);
    recs.forEach((rid) => {
      if (!productIds.has(rid)) errors.push(`Empfehlungen ${id} → unbekanntes Produkt ${rid}`);
      if (rid === id) errors.push(`Empfehlungen ${id} → Selbstempfehlung nicht erlaubt`);
    });
  }

  for (const o of quizOutcomes) {
    if (o.primaryProductId && !productIds.has(o.primaryProductId))
      errors.push(`QuizOutcome ${o.id} → unbekanntes Produkt ${o.primaryProductId}`);
    if (o.worldId && !worldIds.has(o.worldId)) errors.push(`QuizOutcome ${o.id} → unbekannte Welt ${o.worldId}`);
    if (o.leadMagnetId && !leadMagnets.some((l) => l.id === o.leadMagnetId))
      errors.push(`QuizOutcome ${o.id} → unbekanntes Freebie ${o.leadMagnetId}`);
  }

  return errors;
}
